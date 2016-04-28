// grab the info we need from the DOM and send it background.js

$(document).ready(function() {

  var url = window.location.href;
  var data = {};


  // get job title and company name from some popular websites
  if (url.indexOf("dice.com") > -1) {
    data.title = $('#jt').text();
    data.company = $('.employer a').text();
  } 
  else if (url.indexOf("indeed.com") > -1) {
    data.title = $('b.jobtitle').text();
    data.company = $('#job_header span.company').text();
  } 


  chrome.runtime.sendMessage({method: "setTitle", data: data}, function() {
      data = {}; // reset the form from page to page
  });


});




