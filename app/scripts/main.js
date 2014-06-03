(function(){
	'use strict';
	var userID,
	userToken;
	var igLoggedIn = hello('instagram').getAuthResponse();

	hello.init({
		'instagram' : 'ba466f6c17c64ff99b229085129f7cd9'
	});

	// check if user is already logged in
	if(igLoggedIn != null) {
		console.log('already logged in');
		loadProfile();
	}

	function loadProfile(){
		// Get Profile
		hello('instagram').api('me', function(data){
			console.log('User Profile: ');
			console.log(data);
			userID = data.id;
			userToken = igLoggedIn.access_token;
			console.log(userID);
			$('.loggedInUser').html('Logged in as @'+data.data.username);
		});
	}

	function loadInstagram(){
		if(userToken != null){
			console.log(userToken);
			$.ajax({
	      type:'GET',
	        dataType:'jsonp',
	        cache: false,
	        url: 'https://api.instagram.com/v1/users/'+userID+'/media/recent/?access_token='+userToken,
	        success: function(data) {
	        	console.log(data);
	      	}
	    });
		}
  }

	$('button.login').on('click',function(){
		hello().login('instagram',{
			redirect_uri:'http://127.0.0.1:9000'
		}, function(){
			console.log('logged in');
			var response = this.getAuthResponse();
			userToken = response.access_token;
			loadProfile();
		});
	});

	$('.load').on('click',function(){
		loadInstagram();
	});

	$('button.logout').on('click',function(){
		hello.logout('instagram',function(){
			console.log('logged out');
			userID = null;
			userToken = null;
		});
	});

})();