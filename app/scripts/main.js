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
		var igLoggedIn = hello('instagram').getAuthResponse();
		// Get Profile
		hello('instagram').api('me', function(data){
			console.log('User Profile: ');
			console.log(data);
			userID = data.id;
			userToken = igLoggedIn.access_token;
			console.log('User ID: '+userID);
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

  function searchHash(hashText){
  	$.ajax({
  		type:'GET',
  		dataType:'jsonp',
  		cache:false,
  		url: 'https://api.instagram.com/v1/tags/'+hashText+'/media/recent?access_token='+userToken,
	        success: function(data) {
	        	console.log(data);
	        	$.each(data.data, function(index, value){
	        		var imagePath = value.images.thumbnail.url;
        			 $('.search-results').append(
        			 	'<li class="results-item"><img src="'+imagePath+'" /></li>'
        			 );
	        		console.log(value);
        		});
	      	}
  	});
  }

	$('button.login').on('click',function(){
		hello().login('instagram',{
			redirect_uri:'http://igliker.com/'
			//redirect_uri:'http://127.0.0.1:9000'
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
		$('.loggedInUser').empty();
	});

	$('#hashSearch').on('submit', function(e){
		e.preventDefault();
		var hashInput = $('#hashInput').val();
		searchHash(hashInput);
		console.log('searching for '+hashInput);
	}).on({
		keydown: function(e) {
		  if (e.which === 32)
		    return false;
		}
	});

})();