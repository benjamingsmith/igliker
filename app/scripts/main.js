(function(){
	'use strict';
	var userID,
	userToken,
	nextUrl;
	var igLoggedIn = hello('instagram').getAuthResponse();
	var selectedImages =[];

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
  	// empty current results
  	$('.search-results').empty();
  	$.ajax({
  		type:'GET',
  		dataType:'jsonp',
  		cache:false,
  		url: 'https://api.instagram.com/v1/tags/'+hashText+'/media/recent?access_token='+userToken,
      success: function(data) {
      	nextUrl = data.pagination.next_url;
      	console.log(data);
      	console.log(nextUrl);
      	$.each(data.data, function(index, value){
      		var imagePath = value.images.thumbnail.url;
      		var mediaId = value.id;
    			 $('.search-results').append(
    			 	'<li class="results-item" id="'+mediaId+'"><img src="'+imagePath+'" /></li>'
    			 );
      		console.log(value);
    		});
    	}
  	});
  	$('.next-page').css({'display':'inline'});
  }

  function nextResults(){
  	// empty current results
  	$('.search-results').empty();
  	$.ajax({
  		type:'GET',
  		dataType:'jsonp',
  		cache:false,
  		url: nextUrl,
  		success: function(data) {
      	nextUrl = data.pagination.next_url;
      	console.log(data);
      	console.log(nextUrl);
      	$.each(data.data, function(index, value){
      		var imagePath = value.images.thumbnail.url;
      		var mediaId = value.id;
    			 $('.search-results').append(
    			 	'<li class="results-item" id="'+mediaId+'"><img src="'+imagePath+'" /></li>'
    			 );
      		console.log(value);
    		});
    	}
    });
  }

  function activateItem(selection){
  	if(selection.hasClass('active')){
  		selection.removeClass('active');
  	} else {
  		selection.addClass('active');
  	}
  }

  function likeSelected(){
  	var selectedPhotos = $('.results-item.active');
  	$.each(selectedPhotos,function(index, value){
  		var mediaId = $(value).attr('id');
  		console.log(mediaId);
  		$.ajax({
          url:'like.php',
          type: 'POST',
          data: ({
          	'user_token' : userToken,
          	'media_id' : mediaId
          })
      });
  	});
  }

  function likeAll(){
  	var allPhotos = $('.results-item');
  	$.each(allPhotos,function(){
  		console.log(this);
  	});
  }

	$('button.login').on('click',function(){

		hello('instagram').login({
			scope : 'likes',
		});
	});

	$('.load').on('click',function(){
		loadInstagram();
	});

	$('.next-page').on('click',function(){
		nextResults();
	});

	$('.like-selected').on('click',function(){
		likeSelected();
	});

	$('.like-all').on('click',function(){
		likeAll();
	});

	$('.search-results').on('click', '.results-item', function() {
		activateItem($(this));
		console.log('active');
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