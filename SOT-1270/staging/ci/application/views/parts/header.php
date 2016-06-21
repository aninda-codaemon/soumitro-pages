<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="google-site-verification" content="fq4rHI0z1pmyYBQ0jNj5VFzggf6yyQzEXlpgJ3oFq8w" />
    <meta name="google-site-verification" content="e_H7hrNcLVUwhuF5e5VIdwR_2Qaha00sdt2f88aTYAE" />
    <meta name="msvalidate.01" content="3F6324439D47B6C292A16E5991554EC8" />
    <?php if (isset($robots)) { ?>
    <meta name="robots" content="<?php echo $robots ?>">
    <?php } ?>
    <?php  if (1==0) { $this->load->view("parts/pixels", $info); } ?>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $title; ?></title>
    <meta name="description" content="<?php echo $description; ?>">
    <?php if (isset($canonical)) { ?>
    <link rel="canonical" href="<?php echo $canonical; ?>" />
    <?php } ?>

    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo asset_url();?>css/style.css">
    <!--[if lt IE 9]>
      <script src="<?php echo asset_url();?>js/respond.min.js"></script>
      <script src="<?php echo asset_url();?>js/html5shiv.min.js"></script>
    <![endif]-->
    <script src='https://www.google.com/recaptcha/api.js'></script>

    <?php //if (1==0) { ?>
    <script type="application/ld+json">
    <?php echo $jsonld; ?>
    </script>
    <?php //} ?>

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
    <!-- Piwik -->
    <script type="text/javascript">
      var _paq = _paq || [];
      _paq.push(['trackPageView']);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="//public-records.net/p/";
        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId', 1]);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
      })();
    </script>
    <noscript><p><img src="//public-records.net/p/piwik.php?idsite=1" style="border:0;" alt="" /></p></noscript>
    <!-- End Piwik Code -->

    <!-- Google Tag Manager -->
    <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-M72ZWB"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M72ZWB');</script>
    <!-- End Google Tag Manager -->

    <div class="wrapper">
         <div class="container">
              <section class="search">
                  <div class="logo"><img class="img-responsive" src="/people/assets/img/Logo.png" alt="Public Records" /></div>
                  <h1>Lookup Public Records</h1>

                  <form class="search-form" id="searchForm" action="http://jumptracker.com/aff_c?offer_id=61&aff_id=2203" method="POST">
                      <input type="text" name="fn" id="fn" placeholder="Name" />
                      <input type="text" name="ln" id="ln" placeholder="Last Name" />
                      <select name="state" id="state">
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
                      <input type="submit" name="search" id="submitSearch" value="&nbsp;" />
                  </form>
              </section>
              <!-- End Search Section -->

              <div class="text-section-wrapper">
                  <section class="text-section">
                      <div class="row">
                          <div class="col-xs-12 col-sm-12 col-md-7">
                              <div class="left-column">
                                  <h3>Access Premium Public Records</h3>
                                  <div class="hidden-xs">Quickly search public records that could otherwise take you week or months to collect.
                                  Find friends relatives, neighbors or even yourself. Comprehensive people search reports may contain:</div>
                                  <ul>
                                      <li>Name</li>
                                      <li>Phone Number</li>
                                      <li>Relatives</li>
                                      <li>Crimnal Records</li>
                                      <li>Addresses</li>
                                      <li>Email Addresses</li>
                                      <li>Date of Birth</li>
                                      <li>Court Records</li>
                                      <li>Much More!</li>
                                  </ul>
                              </div>
                          </div><!-- End left block -->

                          <div class="col-xs-12 col-sm-12 col-md-5">
                              <div class="right-column">
                                  <h3>The New Way to <br class="hidden-sm hidden-xs">Find People</h3>
                                  <div>More than a regular search engine</div>
                                  <p>Its the easy and quick way to look people up.
                                  Do a deep public record search to uncover the important information you're looking for.
                                  Now you'll never have to search someone on google again.</p>
                              </div>
                          </div><!-- End right block -->
                      </div><!-- End row -->
                  </section><!-- End section -->
              </div><!-- End text section wrapper -->
              <p class="credit">Image by Pierce, C.C., 1910</p>
          </div><!-- End container -->
      </div><!-- End wrapper -->
