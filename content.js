// content.js runs in the context of the LeetCode web page.

console.log("CodeNudge Content Script Loaded");
const MODULE = 'ContentScript';

function log(message, data = null) {
  const prefix = `[CodeNudge ${new Date().toISOString()}] [${MODULE}]`;
  if (data) {
    console.log(`${prefix} ${message}`, data);
  } else {
    console.log(`${prefix} ${message}`);
  }
}

let submissionInProgress = false;
let submissionObserver = null;

function extractSubmissionData() {
  try {
    const titleElement = document.querySelector('div[data-cy="question-title"]') || document.querySelector('a.text-label-1');
    const title = titleElement ? titleElement.textContent.trim() : 'Unknown Title';
    
    const urlParts = window.location.pathname.split('/');
    const titleSlug = urlParts.includes('problems') ? urlParts[urlParts.indexOf('problems') + 1] : 'unknown-slug';
    
    const difficultyElement = document.querySelector('div[diff]') || document.querySelector('.text-difficulty-easy, .text-difficulty-medium, .text-difficulty-hard');
    let difficulty = 'Unknown';
    if (difficultyElement) {
        difficulty = difficultyElement.getAttribute('diff') || difficultyElement.textContent.trim();
    }
    
    const submittedAt = new Date().toISOString();

    return {
      platform: "leetcode",
      title,
      titleSlug,
      difficulty,
      submittedAt
    };
  } catch (error) {
    console.error(`[CodeNudge] Failed to extract submission data`, error);
    return null;
  }
}

function stopObserver() {
  if (submissionObserver) {
    submissionObserver.disconnect();
    submissionObserver = null;
  }
}

function handleAcceptedSubmission() {
  if (!submissionInProgress) return;
  
  submissionInProgress = false; // Prevent duplicate syncs
  stopObserver();
  
  const submissionData = extractSubmissionData();
  if (submissionData) {
    log('Detected Accepted submission', submissionData);
    
    chrome.runtime.sendMessage({
      type: 'NEW_SUBMISSION',
      data: submissionData
    }, (response) => {
      log('Response from background', response);
    });
  }
}

function handleFailedSubmission() {
  if (!submissionInProgress) return;
  
  submissionInProgress = false; // Prevent duplicate triggers
  stopObserver();
  log('Submission verdict was not Accepted. No synchronization performed.');
}

function getResultContainer() {
  // LeetCode's DOM changes, try a few common selectors for the workspace or main app container
  const selectors = [
    '[data-layout-path]', // Typical for new dynamic layouts
    '#qd-content',
    '#app',
    '#__next'
  ];
  
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) return el;
  }
  
  // As a last resort, avoid observing the literal document.body if possible, but use its first child
  return document.body.firstElementChild || document.body;
}

function checkVerdict(text) {
  if (text.includes('Accepted')) {
    handleAcceptedSubmission();
    return true;
  } else if (
    text.includes('Wrong Answer') || 
    text.includes('Time Limit Exceeded') || 
    text.includes('Memory Limit Exceeded') || 
    text.includes('Compile Error') || 
    text.includes('Runtime Error') || 
    text.includes('Output Limit Exceeded')
  ) {
    handleFailedSubmission();
    return true;
  }
  return false;
}

function startSubmissionObserver() {
  stopObserver(); // Ensure no previous observer is running
  
  const resultContainer = getResultContainer();
  
  submissionObserver = new MutationObserver((mutations) => {
    if (!submissionInProgress) return;
    
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Fast fail if the added node text doesn't even contain common verdict letters
            const textContent = node.textContent ? node.textContent.trim() : '';
            if (!textContent.includes('Accepted') && !textContent.includes('Error') && !textContent.includes('Exceeded') && !textContent.includes('Wrong')) {
              continue;
            }

            // Check if this node or any child matches our verdict criteria
            const elementsToCheck = [node, ...node.querySelectorAll('*')];
            for (const el of elementsToCheck) {
               // We just check the textContent permissively now
               const elText = el.textContent ? el.textContent.trim() : '';
               if (checkVerdict(elText)) return;
            }
          }
        }
      } else if (mutation.type === 'characterData') {
        const text = mutation.target.textContent ? mutation.target.textContent.trim() : '';
        if (checkVerdict(text)) return;
      }
    }
  });
  
  // Observe changes strictly in the selected container
  submissionObserver.observe(resultContainer, { childList: true, subtree: true, characterData: true });

  // Add a fallback timeout to prevent getting permanently stuck
  setTimeout(() => {
    if (submissionInProgress) {
      log('Timeout: No verdict detected after 30 seconds. Resetting state.');
      submissionInProgress = false;
      stopObserver();
    }
  }, 30000);
}

document.addEventListener('click', (e) => {
  // Identify if a "Submit" button was clicked
  let isSubmit = false;
  const button = e.target.closest('button');
  
  if (button) {
    const text = button.textContent ? button.textContent.trim().toLowerCase() : '';
    const dataLocator = button.getAttribute('data-e2e-locator');
    
    // LeetCode submit buttons typically have "Submit" as text or specific data attributes
    if (text === 'submit' || dataLocator === 'console-submit-button') {
      isSubmit = true;
    }
  }
  
  if (isSubmit) {
    if (submissionInProgress) {
      log('Submission already in progress, ignoring click.');
      return;
    }
    
    log('Submit button clicked. Waiting for verdict...');
    submissionInProgress = true;
    startSubmissionObserver();
  }
}, true); // Use capture phase to ensure it is intercepted

log('Content script initialized. Waiting for submit button clicks.');
