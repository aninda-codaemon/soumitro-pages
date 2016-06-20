<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Public Records</title>
    <meta name="description" content="<?php echo $description; ?>">

    <link rel="canonical" href="https://public-records.net/" />

    <link rel="stylesheet" type="text/css" href="/people/assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/people/assets/css/style.css">
    <!--[if lt IE 9]>
      <script src="/people/assets/js/respond.min.js"></script>
      <script src="/people/assets/js/html5shiv.min.js"></script>
    <![endif]-->


    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194">
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="/manifest.json">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="theme-color" content="#ffffff">
  </head>
  <body>


      <header>
      	<div class="container-fluid">
        	<div class="row">
            	<div class="col-xs-12 col-sm-3 col-md-3 logo"><img class="" src="/people/assets/img/images/logo.png" alt="" /></div>
            	<div class="col-xs-12 col-sm-9 col-md-9">
                    <nav class="navbar-default" role ="navigation">

                       <div class="navbar-header">
                          <button type = "button" class = "navbar-toggle"
                             data-toggle = "collapse" data-target = "#pelissolo">
                             <span class = "sr-only">Toggle navigation</span>
                             <span class = "icon-bar"></span>
                             <span class = "icon-bar"></span>
                             <span class = "icon-bar"></span>
                          </button>
                       </div>

                       <div class="collapse navbar-collapse" id="pelissolo">
                            <ul class="nav navbar-nav">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Directory</a></li>
                                <li><a href="#">FAQs</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <?php /*
                                <a class="btn btn-default" href="#">Login</a>
                                <a class="btn btn-success" href="#">Sign Up</a>
                                */ ?>
                            </ul>
                       </div>
                    </nav>

                </div>
            </div>
        </div>
      </header>
      <!-- End header -->



      <section class="hero">
      	<div class="container">
        	<h1>Find Who You're Looking For</h1>
            <p>Search public records, criminal records, phone numbers and more!</p>
            <?php /*
            <div class="search">
            	<form action="https://www.beenverified.com/lp/4b6122/1/loading" role="form" method="get" name="record_search_form">
                	<input class="form-control" type="text" name="fn" placeholder="First Name" />
                	<input class="form-control" type="text" name="ln" placeholder="Last Name" />
                	<input class="form-control" type="text" name="city" placeholder="City Name" />
                  <select class="form-control" name="state">
                      <option value="All">Any State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">Washington DC</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                  </select>
                	<input type="submit" name="submit" value="Search" />
                </form>
                <div class="clearfix"></div>
            </div>
            */ ?>
        </div>
      </section>
      <!-- End hero section -->




      <section class="main-section">
        <div class="container">

          <div class="row">
            <div class="col-xs-12 col-sm-8 col-md-8">
              <h3>Recently Updated Profiles:</h3>
              <ul class="recent-update list-unstyled">
                <li class="col-xs-6 col-md-4">
                  <a href="/people/ruthalene-huff/">Ruthalene Huff</a><br>
                  <span>Wichita, KS</span>
                </li>
                <li class="col-xs-6 col-md-4">
                  <a href="/people/john-kaletski/">John Kaletski</a><br>
                  <span>Eastham, MA</span>
                </li>
                <li class="col-xs-6 col-md-4">
                  <a href="/people/reem-zahra/">Reem Zahra</a><br>
                  <span>Oak Lawn, IL</span>
                </li>
                <li class="col-xs-6 col-md-4">
                  <a href="/people/bretton-wolff">Bretton Wolff</a><br>
                  <span>Herndon, VA</span>
                </li>
                <li class="col-xs-6 col-md-4">
                  <a href="/people/robert-bolanowski/">Robert Bolanowski</a><br>
                  <span>Calumet City, IL</span>
                </li>
                <li class="col-xs-6 col-md-4">
                  <a href="/people/pamela-milling/">Pamela Milling</a><br>
                  <span>Chattanooga, TN</span>
                </li>
              </ul>
              <a class="btn btn-default" href="/people/">View More Profiles</a><br>
            </div>

            <div class="col-xs-12 col-sm-4 col-md-4 info-btn">
              <div class="detail-section text-center">
                <img src="/people/assets/img/images/icon-db.png"><br>
                <h4>We Have Info On The Entire United States</h4>
                <a class="btn btn-lg btn-success" href="/people/">Browse Our Database</a>
              </div>
            </div>

          </div>

        </div>
      </section>

      <section class="more-detail">
        <div class="container">
          <div class="row text-center">
            <div class="col-xs-12">
              <h2>Access Premium Public Records</h2>
              <p>
                Over 2 Billion Records and counting. We aggregate billions of public records and provide data that could otherwise take you weeks or months to collect.
              </p>
            </div>
          </div>

          <div class="row">

            <div class="col-xs-12 col-sm-12 col-md-12">
              <div class="records-section">
                <ul class="list-unstyled">
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                      <img src="/people/assets/img/images/icon-user.png">
                    </div>
                    <p>
                      Name
                    </p>
                  </li>
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                      <img src="/people/assets/img/images/icon-calendar.png">
                    </div>
                    <p>
                      Age
                    </p>
                  </li>
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                      <img src="/people/assets/img/images/icon-cake.png">
                    </div>
                    <p>
                      Date of Birth
                    </p>
                  </li>
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                    <img src="/people/assets/img/images/icon-phone.png">
                    </div>
                    <p>
                      Phone Numbers
                    </p>
                  </li>
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                    <img src="/people/assets/img/images/icon-home.png">
                    </div>
                    <p>
                      Current Address
                    </p>
                  </li>
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                    <img src="/people/assets/img/images/icon-home2.png">
                    </div>
                    <p>
                      Past Addresses
                    </p>
                  </li>
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                    <img src="/people/assets/img/images/icon-relatives.png">
                    </div>
                    <p>
                      Relatives
                    </p>
                  </li>
                  <li class="col-sm-3 text-center">
                    <div class="icon-wrapper">
                    <img src="/people/assets/img/images/icon-pin.png">
                    </div>
                    <p>
                      Map Location
                    </p>
                  </li>
                </ul>

              </div>
            </div>

          </div>
        </div>
      </section>


      <section class="want-more">
        <div class="container">
          <div class="row">
              <div class="col-xs-12 col-sm-9 col-md-9">We Have Info On The Entire United States...</div>
              <div class="col-xs-12 col-sm-3 col-md-3"><a class="btn btn-lg btn-success" href="/people/">Browse Database Now</a></div>
            </div>
        </div>
      </section>

      <footer>
        <div class="container">
          <div class="row">
              <div class="col-sm-12 col-md-5">
                  <div class="footer-logo"><img src="/people/assets/img/images/logo.png" alt="" /></div>
                    <p>Public-Records.net helps you find people and learn more about them.</p>
                    <?php /*
                    <ul class="social-icons">
                      <li class="icon-twitter"><a href="#"></a></li>
                      <li class="icon-fb"><a href="#"></a></li>
                      <li class="icon-google"><a href="#"></a></li>
                      <li class="icon-in"><a href="#"></a></li>
                      <li class="icon-yt"><a href="#"></a></li>
                    </ul>
                    */ ?>
                </div>

                <div class="col-sm-12 col-md-7">
                  <div class="row">
                      <div class="col-xs-6 col-sm-4 col-md-4">
                          <div class="footer-heading">About Us</div>
                          <ul>
                              <li><a href="/">Home</a></li>
                              <li><a href="#">About Public-Records</a></li>
                              <li><a href="#">People White Pages</a></li>
                              <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                      <div class="col-xs-6 col-sm-4 col-md-4">
                          <div class="footer-heading">Directories</div>
                          <ul>
                              <li><a href="#">People Directory</a></li>
                              <li><a href="#">Name Directory</a></li>
                            </ul>
                        </div>
                      <div class="col-xs-12 col-sm-4 col-md-4">
                          <div class="footer-heading">Help</div>
                          <ul>
                              <li><a href="#">Terms Of Use</a></li>
                              <li><a href="#">Privacy Policy</a></li>
                              <li><a href="#">FAQs</a></li>
                            </ul>
                        </div>
                    </div><!-- End row -->
                </div><!-- End col-md-7 -->

            </div><!-- End row -->
        </div><!-- End container -->

        <div class="footer-bottom">
          <div class="container">
            <p>Disclaimer: Public-Records.net gives people easy and affordable access to public record information. Public-Records.net does not provide private investigator services, and is not a consumer reporting agency as defined by the Fair Credit Report Act because the information provided by Public-Records.net is not collected or provided, in whole or in part, for the purpose of furnishing consumer reports about those search subjects. For more information governing the permitted and prohibited uses of Public-Records.net, please review our “Do’s & Don’ts” and our Terms & Conditions.</p>
            <p>&copy; <?php echo date("Y") ?> <a href="https://public-records.net">Public-Records.net</a>. All Rights Reserved.</p>
          </div>
        </div><!-- End footer bottom -->
      </footer>




      <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
      <script src="/people/assets/js/bootstrap.min.js"></script>
      <?php /*
      <script src='https://maps.googleapis.com/maps/api/js?key=&sensor=false&extension=.js'></script>
      <script src='/people/assets/js/map.js'></script>
      */ ?>


      </body>
      </html>
