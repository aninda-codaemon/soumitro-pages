<!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <?php if (isset($robots)) { ?>
        <meta name="robots" content="<?php echo $robots ?>">
        <?php } ?>

        <?php $this->load->view("parts/pixels", $info); ?>

        <title><?php echo $title; ?></title>
        <meta name="description" content="<?php echo $description; ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, minimal-ui">
        <?php if (isset($canonical)) { ?>
        <link rel="canonical" href="<?php echo $canonical; ?>" />
        <?php } ?>
        <link rel="stylesheet" type="text/css" href="https://cdn1.beenverified.com/srg/seo-redux/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="https://cdn1.beenverified.com/srg/seo-redux/css/seo-main.css">

        <!--[if lt IE 9]>
          <script src="https://cdn1.beenverified.com/srg/seo-redux/js/respond.min.js"></script>
          <script src="https://cdn1.beenverified.com/srg/seo-redux/js/html5shiv.min.js"></script>
        <![endif]-->

<script type="application/ld+json">
<?php echo $jsonld; ?>

</script>

    </head>
    <body>
        <!-- Google Tag Manager -->
        <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-HV76"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-HV76');</script>
        <!-- End Google Tag Manager -->


        <header class="container">
            <div class="row">
                <a href="//www.beenverified.com" id="logo-header" class="pull-left" title="BeenVerified"></a>
                <div class="visible-xs pull-right">
                    <a id="menu-dropdown" class="btn btn-default"><span class="glyphicon glyphicon-menu-hamburger"></span></a>
                </div>
                <div id="link-wrap" class="pull-right">
                    <a href="//www.beenverified.com/login" class="btn btn-default btn-round btn-login">Login</a><span class="hidden-xs">or</span>
                    <a href="//www.beenverified.com/subscribe" class="btn btn-round btn-success">Subscribe</a>
                    <p class="call-us"><strong>Questions? </strong>Call <span class="no-wrap">1-888-579-5910</span></p>
                </div>
            </div>
        </header>
        <section id="top-banner">
            <div  class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <h1 class="text-center">
                            <?php echo $h1; ?>
                        </h1>
                        <!-- <p class="subheader lead text-center">Another Relevant Tagline Goes Here</p> -->
                    </div>
                </div>
                <div id="btn-search-dropdown" class="row visible-xs visible-sm">
                    <div class="col-md-12">
                        <button class="btn btn-primary btn-block btn-primary-pop">
                            <span class="glyphicon glyphicon-search"></span>
                            Try New Search
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10 col-md-offset-1">
                        <form action="https://www.beenverified.com/lp/4b6122/1/loading" id="header-search" class="header-search row" role="form" method="get" name="record_search_form">
                            <div class="col-md-4">
                                <label for="fn" class="input-title"><strong>First Name:</strong></label>
                                <br>
                                <input type="text" class="focus-me form-control" id="fn" placeholder="First Name" name="fn">
                            </div>
                            <div class="col-md-4">
                                <label for="ln" class="input-title"><strong>Last Name:</strong></label>
                                <br>
                                <input type="text" class="form-control" id="ln" placeholder="Last Name" name="ln">
                            </div>
                            <div class="col-md-2">
                                <label for="state" class="input-title"><strong>State:</strong></label>
                                <br>
                                <select class="form-control">
                                    <option value="All">All States</option>
                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
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
                            </div>
                            <div class="col-md-2">
                                <label>&nbsp;</label>
                                <br>
                                <button type="submit" class="btn btn-block btn-success btn-success-pop">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="row hidden-xs hidden-sm">
                    <div class="as-seen-on-wrapper col-md-10 col-lg-8 col-md-offset-1 col-lg-offset-2">
                        <div class="row">
                            <div class="as-seen-on col-md-3">
                                <p class="text-right">As Seen On:</p>
                            </div>
                            <div class="col-md-2">
                                <img src="//cdn1.beenverified.com/srg/seo-redux/img/press/inc-logo.png" class="img-center img-responsive">
                            </div>
                            <div class="col-md-1">
                                <img src="//cdn1.beenverified.com/srg/seo-redux/img/press/cnet-logo.png" class="img-center img-responsive">
                            </div>
                            <div class="col-md-2">
                                <img src="//cdn1.beenverified.com/srg/seo-redux/img/press/tc-logo.png" class="img-center img-responsive">
                            </div>
                            <div class="col-md-3">
                                <img src="//cdn1.beenverified.com/srg/seo-redux/img/press/nyt-logo.png" class="img-center img-responsive">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
