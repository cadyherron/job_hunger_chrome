// receive info from the DOM and send it to the popup when it's opened

var title, company;

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.method == 'setTitle') {
      title = message.data.title;
      company = message.data.company;
    } else if (message.method == 'getTitle') {
      sendResponse([title, company])
    }
  }
);
