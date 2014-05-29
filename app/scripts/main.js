(function(){
	'use strict';
	hello.init({
		instagram : 'ba466f6c17c64ff99b229085129f7cd9'
	});
	$('button.ig').on('click',function(){
		hello("instagram").login( function(){
			//alert("You are signed in to IG");
		});
	});

})();