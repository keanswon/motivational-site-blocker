// popup.js
document.addEventListener('DOMContentLoaded', () => {
  // Take elements from popup.html
  const siteInput = document.getElementById('siteInput');
  const addSiteButton = document.getElementById('addSite');
  const siteList = document.getElementById('siteList');
  const statusBox = document.getElementById('status');

  statusBox.value = "Nothing to display";

  // Load blocked sites from storage and update the UI
  chrome.storage.local.get(['blockedSites'], (result) => {
    const blockedSites = result.blockedSites || [];
    updateSiteList(blockedSites);
  });

  // Add a new site when the button is clicked
  addSiteButton.addEventListener('click', () => {
    const newSite = siteInput.value.trim();
    if (!newSite) return;
    chrome.storage.local.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites || [];
      // Avoid duplicates
      if (blockedSites.indexOf(newSite) === -1) {
        blockedSites.push(newSite);
        chrome.storage.local.set({ blockedSites }, () => {
          updateSiteList(blockedSites);
          updateDynamicRules(blockedSites);
          siteInput.value = "";
          updateStatus("Site added");
        });
      }
    });
  });

  // Update the UI list of sites
  function updateSiteList(sites) {
    siteList.innerHTML = "";
    sites.forEach((site, index) => {
      const li = document.createElement('li');
      li.textContent = site;
      const removeButton = document.createElement('button');
      removeButton.classList.add('submitbutton');
      removeButton.textContent = "Remove";
      removeButton.addEventListener('click', () => {
        removeSite(index);
      });
      li.appendChild(removeButton);
      siteList.appendChild(li);
    });
  }

  // Remove a site and update storage and dynamic rules
  function removeSite(index) {
    chrome.storage.local.get(['blockedSites'], (result) => {
      const blockedSites = result.blockedSites || [];
      blockedSites.splice(index, 1);
      chrome.storage.local.set({ blockedSites }, () => {
        updateSiteList(blockedSites);
        updateDynamicRules(blockedSites);
        updateStatus("Site removed");
      });
    });
  }

  // Update the dynamic rules based on the current list of blocked sites
  function updateDynamicRules(blockedSites) {
    // Create a rule for each blocked site.
    const rules = blockedSites.map((site, idx) => ({
      id: 1000 + idx,  // Unique id for each rule 
      priority: 1,
      action: {
        type: "redirect",
        redirect: { url: chrome.runtime.getURL("templates/goals.html") }
      },
      condition: {
        regexFilter: "^(.*" + escapeRegExp(site) + ".*)$",
        resourceTypes: ["main_frame"]
      }
    }));

    // Get all dynamic rules currently active
    chrome.declarativeNetRequest.getDynamicRules((currentRules) => {
      const currentRuleIds = currentRules.map(rule => rule.id);

      // Update the rules: remove current ones and add the new set
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: currentRuleIds,
        addRules: rules
      }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error updating dynamic rules:", chrome.runtime.lastError);
        } else {
          console.log("Dynamic rules updated successfully.");
        }
      });
    });
  }

  const motivationalMessage = document.getElementById("motivationalMessage");
  const saveMessage = document.getElementById("saveMessage");

  // Save user's motivational message to chrome storage to use with goals.html
  saveMessage.addEventListener('click', () => {
    const message = motivationalMessage.value.trim();

    if (!message) return;
    chrome.storage.local.set({ motivationalMessage: message }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving message:", chrome.runtime.lastError);
      } else {
        console.log("Message saved:", message);
        motivationalMessage.value = "";
        updateStatus("Message saved");
      }
    });
  })

  const clearMessage = document.getElementById("clearMessage");

  clearMessage.addEventListener('click', () => {
    chrome.storage.local.set({ motivationalMessage: "" }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error saving message:", chrome.runtime.lastError);
      } else {
        updateStatus("Message cleared");
      } 
    });
  })

  function updateStatus(message, duration = 3000) {
    statusBox.textContent = message;
    setTimeout(() => {
      statusBox.textContent = "Nothing to display";
    }, duration);
  }
});

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}