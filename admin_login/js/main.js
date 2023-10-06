import { auth, provider } from "../../firebase";

function signIn() {
	const your_name = document.getElementById('your_name').value;
	const your_pass = document.getElementById('your_pass').value;
  
	// Sign in with email and password
	auth.signInWithEmailAndPassword(your_name, your_pass)
	  .then((userCredential) => {
		// User signed in successfully
		const user = userCredential.user;
		console.log("User signed in:", user);
	  })
	  .catch((error) => {
		// Handle errors
		console.error("Error signing in:", error);
	  });
  }

  document.getElementById('signin').addEventListener('click', signIn);

$(function() {
	'use strict';

	
  $('.form-control').on('input', function() {
	  var $field = $(this).closest('.form-group');
	  if (this.value) {
	    $field.addClass('field--not-empty');
	  } else {
	    $field.removeClass('field--not-empty');
	  }
	});

});