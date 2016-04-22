$(document).ready(function () {


  // fill in the url with current url
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function (tabs) {
    var tab = tabs[0];
    $('#url').val(tab.url);
  });



  // if the user is logged in, hide login form and show job form
  if (localStorage.length > 0) {
    $('#showSignIn').addClass('invisible');
    $('#jobForm').removeClass('invisible')
  }



  // submit the sign in form
  $('#login').click(function(event) {
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/auth/sign_in?password=" + password + "&email=" + email,
      // url: "http://localhost:3000/auth/sign_in?password=password&email=test@test.com",
      // url: "http://mysterious-shelf-41013.herokuapp.com/auth/sign_in?password=" + password + "&email=" + email,
      dataType: "json",
      success: function(data, status, xhr) {
        localStorage.setItem('accessToken', xhr.getResponseHeader('access-token'));
        localStorage.setItem('expiry', xhr.getResponseHeader('expiry'));
        localStorage.setItem('tokenType', xhr.getResponseHeader('token-type'));
        localStorage.setItem('uid', xhr.getResponseHeader('uid'));
        localStorage.setItem('client', xhr.getResponseHeader('client'));

        $('#showSignIn').fadeOut('slow', function() {
          $('#showSignIn').addClass('invisible');
          $('#jobForm').fadeIn('medium');
          $('#jobForm').removeClass('invisible');
          $('#email').val("");
          $('#password').val("");
        });
      },
      error: function(data) {
        $('.error').fadeIn(300).delay(1500).fadeOut(400);
      }
    });
    event.stopPropagation();
  });




  // submit the job form
  $('#createJob').click(function(event) {
    event.preventDefault();
    data = {title: $('#title').val(), company_name: $('#company').val(), notes: $('#notes').val()};

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/create_from_chrome.json",
      // url: "http://mysterious-shelf-41013.herokuapp.com/create_from_chrome.json",
      dataType: "json",
      data: JSON.stringify(data),
      beforeSend: function(xhr) {
        xhr.setRequestHeader("access-token", localStorage.accessToken);
        xhr.setRequestHeader("accessToken", localStorage.accessToken);
        xhr.setRequestHeader("expiry", localStorage.expiry);
        xhr.setRequestHeader('token-type', localStorage.tokenType);
        xhr.setRequestHeader('tokenType', localStorage.tokenType);
        xhr.setRequestHeader("uid", localStorage.uid);
        xhr.setRequestHeader("client", localStorage.client);
        xhr.setRequestHeader("Content-Type", "application/json");
      },
      success: function() {
        $('.success').fadeIn(300).delay(1500).fadeOut(400);
        $('#title').val("");
        $('#company').val("");
        $('#notes').val("");
      },
      error: function(data) {
        $('.failure').fadeIn(300).delay(1500).fadeOut(400);
      }
    });
    event.stopPropagation();
  });



  // log out: hide job form and show sign in form
  $('#logout').click(function(event) {
    event.preventDefault();
    localStorage.clear();
    $('#jobForm').fadeOut('slow', function() {
      $('#jobForm').addClass('invisible');
      $('#showSignIn').fadeIn('medium');
      $('#showSignIn').removeClass('invisible')
    });
  });



});