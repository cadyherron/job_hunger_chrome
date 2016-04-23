var title, company;

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    // alert("hi from the listener")

    if (message.method == 'setTitle') {
      // alert('setTitle')
      // alert(message.title);
      title = message.data.title;
      company = message.data.company;
    } else if (message.method == 'getTitle') {
      // alert('getTitle');
      // alert(title)
      // sendResponse(title);
      sendResponse([title, company])
    }
  }
);


// Listen to messages from the payload.js script and write to popout.html
// chrome.runtime.onMessage.addListener(function (message) {
//   document.getElementById('pagetitle').innerHTML = message;
// });