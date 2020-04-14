function login() {
  var email = document.querySelector('#index_email').value;
  var password = document.querySelector('#index_password').value;

  if (!email || !password) {
	ons.notification.toast('Please enter username/password', { timeout: 2000 });
  } else {
	  var config = {
		"url": "http://localhost:5000/user-management/api/v1/users",
		"method": "GET",
		"timeout": 60000,
		"headers": {
		  "email": email,
		  "password": password,
		}
	  };
	  callApi(config, (data) => {
		home();
	  }, 'login');
  }
}

function register() {
  var navigator = document.querySelector('#navigator');
  navigator.pushPage('register.html')
}

function createAccount() {
  var email = document.querySelector('#register_email').value;
  var firstname = document.querySelector('#register_firstname').value;
  var lastname = document.querySelector('#register_lastname').value;
  var passwd = document.querySelector('#register_password').value;
  var cpasswd = document.querySelector('#register_cpassword').value;
  
  if (validateRegistrationForm(email, firstname, lastname, passwd, cpasswd)) {
    var payload = {
		"email": email,
		"password": passwd,
		"firstname": firstname,
		"lastname": lastname,
		"type": "user",
		"enabled": true
	};
	var config = {
		"url": "http://localhost:5000/user-management/api/v1/users",
		"method": "POST",
		"timeout": 60000,
		"headers": {
			"Content-Type": "application/json"
		},
		"data": payload
	};
	callApi(config, (data) => {
		showAlert("Account successfully created")
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
	  showAlert('Invalid Email Address');
  } else if (firstname.length == 0) {
	  showAlert('First Name is blank');
  } else if (lastname.length == 0) {
	  showAlert('Last Name is blank');
  } else if (passwd.length == 0) {
	  showAlert('Password is blank');
  } else if (cpasswd.length == 0) {
	  showAlert('Confirm Password is blank');
  } else if (passwd.length < 8) {
	  showAlert('Password must be at least 8 characters');
  } else if (passwd != cpasswd) {
	  showAlert('Passwords don\'t match');
  } else {
	  return true;
  }
  return false;
}

function callApi(config, successCallback, caller) {
	document.querySelector('#'+caller+'_pb').style.display = 'block';
	axios(config)
		.then((response) => {
			if (!response.data.error) {
				successCallback(response.data);
			} else {
				showAlert(response.data.error);
			}
			document.querySelector('#'+caller+'_pb').style.display = 'none';
		})
		.catch((error) => {
			console.log(error);
			showAlert('Connection failed');
			document.querySelector('#'+caller+'_pb').style.display = 'none';
		});
}

function showAlert(msg) {
	ons.notification.toast(msg, { timeout: 2000 });
}
