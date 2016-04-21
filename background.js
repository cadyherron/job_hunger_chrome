// background script that has access to Chrome API
// focuses on the active tab 
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    var url = activeTab.url;
    chrome.tabs.sendMessage(url)
  })
})