import { StorageUtil } from '../utils/storage.js';
import { CONSTANTS } from '../utils/constants.js';
import { Helpers } from '../utils/helpers.js';
import { ApiService } from '../services/api.service.js';

document.addEventListener('DOMContentLoaded', async () => {
  // UI Elements
  const statusIndicator = document.getElementById('statusIndicator');
  const loggedInStatus = document.getElementById('loggedInStatus');
  const lastSyncTime = document.getElementById('lastSyncTime');
  const tokenInput = document.getElementById('tokenInput');
  const tokenGroup = document.getElementById('tokenGroup');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const testBtn = document.getElementById('testBtn');
  const messageBox = document.getElementById('messageBox');
  const backendUrl = document.getElementById('backendUrl');

  backendUrl.textContent = CONSTANTS.API_BASE_URL;

  // Initialize UI state
  await updateUI();

  // Event Listeners
  loginBtn.addEventListener('click', async () => {
    const token = tokenInput.value.trim();
    if (token) {
      await StorageUtil.set(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN, token);
      tokenInput.value = '';
      showMessage('Logged in successfully', 'success');
      await updateUI();
    } else {
      showMessage('Please enter a valid token', 'error');
    }
  });

  logoutBtn.addEventListener('click', async () => {
    await StorageUtil.remove(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    showMessage('Logged out successfully', 'success');
    await updateUI();
  });

  testBtn.addEventListener('click', async () => {
    try {
      showMessage('Testing connection...', '');
      await ApiService.testBackendConnection();
      showMessage('Backend connection successful!', 'success');
    } catch (err) {
      showMessage(`Connection failed: ${err.message}`, 'error');
    }
  });

  async function updateUI() {
    const token = await StorageUtil.get(CONSTANTS.STORAGE_KEYS.ACCESS_TOKEN);
    const lastSync = await StorageUtil.get(CONSTANTS.STORAGE_KEYS.LAST_SYNC);
    const syncStatus = await StorageUtil.get(CONSTANTS.STORAGE_KEYS.SYNC_STATUS);

    if (token) {
      loggedInStatus.textContent = 'Yes';
      loggedInStatus.style.color = 'green';
      tokenGroup.classList.add('hidden');
      loginBtn.classList.add('hidden');
      logoutBtn.classList.remove('hidden');
      statusIndicator.className = 'status online';
    } else {
      loggedInStatus.textContent = 'No';
      loggedInStatus.style.color = 'red';
      tokenGroup.classList.remove('hidden');
      loginBtn.classList.remove('hidden');
      logoutBtn.classList.add('hidden');
      statusIndicator.className = 'status offline';
    }

    lastSyncTime.textContent = Helpers.formatDate(lastSync);
    
    if (syncStatus === 'syncing') {
      statusIndicator.className = 'status syncing';
    }
  }

  function showMessage(msg, type) {
    messageBox.textContent = msg;
    messageBox.className = `message ${type}`;
    messageBox.classList.remove('hidden');
    setTimeout(() => {
      messageBox.classList.add('hidden');
    }, 3000);
  }
  
  // Listen for storage changes to update UI in real-time
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'local') {
      updateUI();
    }
  });
});
