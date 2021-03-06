(function(){
	'use strict';
	var userID,
	userToken,
	nextUrl,
	likeProcessing,
	likeInterval;
	var igLoggedIn = hello('instagram').getAuthResponse();
	var selectedImages =[];

	hello.init({
		'instagram' : 'ba466f6c17c64ff99b229085129f7cd9'
	});

	function loadProfile(){
		var igLoggedIn = hello('instagram').getAuthResponse();
		// get profile
		hello('instagram').api('me', function(data){
			if(data.meta.code === 200){
				console.log('User Profile: ');
				console.log(data);
				userID = data.id;
				userToken = igLoggedIn.access_token;
				console.log('User ID: '+userID);
				$('.loggedInUser').html('Logged in as @'+data.data.username);
        $('.loggedInFollowers').html('Followers: '+data.data.counts.followed_by);
			}
		});
	}

  function searchHash(hashText){
  	// empty current results
  	$('.search-results').empty();
  	$('.searched-hash').html('#'+hashText);
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
    			 	'<li class="results-item" data-id="'+mediaId+'"><img src="'+imagePath+'" /></li>'
    			 );
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
    			 	'<li class="results-item" data-id="'+mediaId+'"><img src="'+imagePath+'" /></li>'
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

  function startLiking(){
  	var delaySelected = $('#likeDelay').val()*1000;
  	var likeDelay = $('#likeDelay').val()*delaySelected;
  	var photosSelected = $('.results-item.active').length;
  	var photosToLike = [];
  	var currentPhoto = 0;
  	console.log(likeDelay);
  	// put all selected photos into an array
  	$.each($('.results-item.active'), function(i,v){
  		var mediaId = $(v).attr('data-id');
  		photosToLike.push(mediaId);
  	});
  	//console.log(photosToLike);
  	likeInterval = setInterval(function(){
  		if(photosSelected > 0){
  			$('.interaction-blocker').show();
  			$('.results-item').css({'opacity':'.6'});
		  	console.log(photosToLike[currentPhoto]);
		  	likePhoto(photosToLike[currentPhoto]);
		  	currentPhoto++;
		  	photosSelected--;
  		} else {
  			$('.interaction-blocker').hide();
  			$('.results-item').css({'opacity':'1'});
  			clearInterval(likeInterval);
  		}
  	},likeDelay);
  }

  function likePhoto(photoId){
  	hello('instagram').api('me/like', 'post', { id : photoId }).then( function(r){
  			console.log(r);
  			if(r.meta.code === 200){
  				console.log('photo liked');
  			}
  	});
  }

  function likeSelected(){
  	startLiking();
  }

  function likeAll(){
  	var allPhotos = $('.results-item');
  	$('.results-item').addClass('active');
  	startLiking();
  }

	$('button.login').on('click',function(){
		hello('instagram').login({scope : 'likes'});
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
	});

	$('button.logout').on('click',function(){
		hello.logout('instagram',function(){
			console.log('logged out');
			userID = null;
			userToken = null;
		});
		$('.loggedInUser').empty();
		$('.login').show();
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

	$(document).ready(function(){
		var instagram = hello( 'instagram' );
		//instagram.api('me').then(loadProfile);
		hello.on('auth.login', function(auth){
			loadProfile();
			$('.login').hide();
		});
	});

})();