// alert(title)
$(document).ready(function () {

  var url = $(location).attr('href');
  var data = {};

  if (url.indexOf("dice.com") > -1) {
    data.title = $('#jt').text();
    data.company = $('.employer a').text();
    console.log(data)
  }


  chrome.runtime.sendMessage({method: "setTitle", data: data}, function() {
     // clear the things here?
  });


});

// http://stackoverflow.com/questions/11617379/google-chrome-extension-messages-call-to-function-between-popup-page-and-cont/11617742#11617742

// http://stackoverflow.com/questions/16322830/chrome-extension-from-the-dom-to-popup-js-message-passing