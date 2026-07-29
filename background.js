import { ApiService } from './services/api.service.js';
import { StorageUtil } from './utils/storage.js';
import { CONSTANTS } from './utils/constants.js';
import { Helpers } from './utils/helpers.js';

const MODULE = 'Background';

// Listener for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  Helpers.log(MODULE, 'Received message', request);

  if (request.type === 'NEW_SUBMISSION') {
    handleNewSubmission(request.data)
      .then(result => sendResponse({ success: true, result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    
    return true; // Keep message channel open for async response
  }
});

async function handleNewSubmission(submissionData) {
  try {
    Helpers.log(MODULE, 'Processing new submission', submissionData);
    
    // Update status to syncing
    await StorageUtil.set(CONSTANTS.STORAGE_KEYS.SYNC_STATUS, 'syncing');
    
    const response = await ApiService.postSubmission(submissionData);
    
    // Update status and last sync time on success
    await StorageUtil.set(CONSTANTS.STORAGE_KEYS.SYNC_STATUS, 'success');
    await StorageUtil.set(CONSTANTS.STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    
    Helpers.log(MODULE, 'Successfully processed submission', response);
    return response;
  } catch (error) {
    Helpers.error(MODULE, 'Failed to process submission', error);
    
    // Update status to failed
    await StorageUtil.set(CONSTANTS.STORAGE_KEYS.SYNC_STATUS, 'error');
    throw error;
  }
}
