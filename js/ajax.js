$(document).ready(function () {  

  // fill in the url with current url
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {   
    var tab = tabs[0]
    $('#url').val(tab.url);  
  }) 


  // click listener for sign in form
  $('#login').click(function(event) {
    event.preventDefault();

    var email = $('#email').val();
    var password = $('#password').val()

    $.ajax({
      method: "POST",
      // url: "http://localhost:3000/auth/sign_in?password=" + password + "&email=" + email,
      url: "http://localhost:3000/auth/sign_in?password=password&email=test@test.com",
      // url: "http://mysterious-shelf-41013.herokuapp.com/jobs.json",
      dataType: "json",
      // data: data, 
      success: function(data, status, xhr) {
        console.log("successfully logged in!!!!")

        localStorage.setItem('accessToken', xhr.getResponseHeader('access-token'));
        localStorage.setItem('expiry', xhr.getResponseHeader('expiry'));
        localStorage.setItem('tokenType', xhr.getResponseHeader('token-type'));
        localStorage.setItem('uid', xhr.getResponseHeader('uid'));
        localStorage.setItem('client', xhr.getResponseHeader('client'));
      }, 
      error: function(data) {
        console.log(data)
      }
    })
    event.stopPropagation();    
  })


  // click listener for submitting the job form
  $('#createJob').click(function(event) {
    event.preventDefault();

    data = {title: $('#title').val(), company_name: $('#company').val()};

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/create_from_chrome.json",
      // url: "http://mysterious-shelf-41013.herokuapp.com/jobs.json",
      dataType: "json",
      data: JSON.stringify(data), 
      beforeSend: function(xhr) {
        xhr.setRequestHeader("access-token", localStorage.accessToken)
        xhr.setRequestHeader("accessToken", localStorage.accessToken)
        xhr.setRequestHeader("expiry", localStorage.expiry)
        xhr.setRequestHeader('token-type', localStorage.tokenType)
        xhr.setRequestHeader('tokenType', localStorage.tokenType)
        xhr.setRequestHeader("uid", localStorage.uid)
        xhr.setRequestHeader("client", localStorage.client)
        xhr.setRequestHeader("Content-Type", "application/json")
      },
      success: function() {
        console.log("success!")
      }, 
      error: function(data) {
      console.log(data)
      }
    })
    event.stopPropagation();

  })
});