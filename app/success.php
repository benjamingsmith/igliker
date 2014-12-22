<?php

// receive OAuth code parameter
$code = $_GET['code'];

// check whether the user has granted access
if (isset($code)) {

  // receive OAuth token object
  $data = $instagram->getOAuthToken($code);
  $username = $username = $data->user->username;
  
  // store user access token
  $instagram->setAccessToken($data);

  // now you have access to all authenticated user methods
  $result = $instagram->getUserMedia();

} else {

  // check whether an error occurred
  if (isset($_GET['error'])) {
    echo 'An error occurred: ' . $_GET['error_description'];
  }

}

?>

<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <title>igliker</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
        <link rel="shortcut icon" href="/favicon.ico">
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <!-- bower:css -->
        <!-- endbower -->
        <!-- endbuild -->
        <!-- build:css(.tmp) css/main.css -->
        <link rel="stylesheet" href="css/main.css">
        <!-- endbuild -->
    </head>
    <body>
        <!--[if lt IE 10]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div class="container">
            <button class="login" ><a href="<? echo $loginUrl ?>">Login</a></button>
            <button class="logout">Log Out</button>
            <!-- <button class="load">Load</button> -->
            <p class="loggedInUser"></p>

            <div class="search">
                <form id="hashSearch">
                    <input type="text" id="hashInput" value=""><button class="search_hash">Submit</button>
                </form>
            </div>
            <p class="searched-hash"></p>
            <div class="next-page">Next</div>
            <div class="like-selected">Like Selected</div>
            <div class="like-all">Like All</div>
            <ul class="search-results">
                <!--<li class="results-item"><img src="" /></li>-->
            </ul>
        </div>


        <!-- build:js scripts/vendor.js -->
        <!-- bower:js -->
        <script src="bower_components/jquery/dist/jquery.js"></script>
        <!-- endbower -->
        <!-- endbuild -->

        <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>

        <!-- build:js({app,.tmp}) scripts/main.js -->
        <script src="scripts/main.js"></script>
        <!-- endbuild -->
</body>
</html>
