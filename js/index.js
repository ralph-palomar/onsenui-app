$(document).ready(function () {
	console.log("Ready")
});

function login() {
  var email = $('#index_email').val();
  var password = $('#index_password').val();

  if (!email || !password) {
	ons.notification.toast('Please enter username/password', { timeout: 2000 });
  } else {
	  var settings = {
		"url": "http://localhost:5000/user-management/api/v1/users",
		"method": "GET",
		"timeout": 60000,
		"headers": {
		  "email": email,
		  "password": password,
		}
	  };
	  callApi(settings, (data) => {
		home();
	  }, 'login');
  }
}

function register() {
  var navigator = document.querySelector('#navigator');
  navigator.pushPage('register.html')
}

function createAccount() {
  var email = $('#register_email').val();
  var firstname = $('#register_firstname').val();
  var lastname = $('#register_lastname').val();
  var passwd = $('#register_password').val();
  var cpasswd = $('#register_cpassword').val();
  
  if (validateRegistrationForm(email, firstname, lastname, passwd, cpasswd)) {
    var payload = {
		"email": email,
		"password": passwd,
		"firstname": firstname,
		"lastname": lastname,
		"type": "user",
		"enabled": true
	};
	var settings = {
		"url": "http://localhost:5000/user-management/api/v1/users",
		"method": "POST",
		"timeout": 60000,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": JSON.stringify(payload)
	};
	callApi(settings, (data) => {
		back();
	}, 'register');
  }
}

function back() {
  var navigator = document.querySelector('#navigator');
  navigator.popPage();
}

function home() {
  var navigator = document.querySelector('#navigator');
  navigator.resetToPage('home.html', { pop: true });
}

function logout() {
  var navigator = document.querySelector('#navigator');
  navigator.resetToPage('login.html', { pop: true });
}


/////// HELPER FUNCTIONS ///////

function validateRegistrationForm(email, firstname, lastname, passwd, cpasswd) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
	  ons.notification.toast('Invalid Email Address', { timeout: 2000 });
  } else if (firstname.length == 0) {
	  ons.notification.toast('First Name is blank', { timeout: 2000 });
  } else if (lastname.length == 0) {
	  ons.notification.toast('Last Name is blank', { timeout: 2000 });
  } else if (passwd.length == 0) {
	  ons.notification.toast('Password is blank', { timeout: 2000 });
  } else if (cpasswd.length == 0) {
	  ons.notification.toast('Confirm Password is blank', { timeout: 2000 });
  } else if (passwd.length < 8) {
	  ons.notification.toast('Password must be at least 8 characters', { timeout: 2000 });
  } else if (passwd != cpasswd) {
	  ons.notification.toast('Passwords don\'t match', { timeout: 2000 });
  } else {
	  return true;
  }
  return false;
}

function callApi(settings, successCallback, caller) {
	$('#'+caller+'_pb').show();
	$.ajax(settings)
		.done(function (data) {
			if (!data.error) {
				successCallback(data);
			} else {
				ons.notification.toast(data.error, { timeout: 2000 });
			}
			$('#'+caller+'_pb').hide();
		})
		.fail(function (data) {
			ons.notification.toast('Connection failed', { timeout: 2000 });
			$('#'+caller+'_pb').hide();
		});
}
