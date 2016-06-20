<?php

$info['h1'] = "Find Who You're Looking For";
$info['tagline'] = "See public records, phone numbers, addresses and more!";
$info['title'] = "Public Records";
$info['description'] = "Public Records's people finder has contact information and public records for more than 90% US adults.";
$info['breadcrumbs'] = $breadcrumbs;
$info['canonical'] = current_url() . "/";

$info['jsonld'] = '{
  "@context" : "http://schema.org",
  "@type" : "Organization",
   "name" : “Public Records”,
   "url" : "https://public-records.net“,
   "logo" : "https://public-records.net/people/assets/img/images/logo.png",
   "contactPoint" : [
      { "@type" : "ContactPoint",
        "telephone" : "+1-234-978-2542",
        "contactType" : "customer service",
        "areaServed" : "US" }
    ],
}';

$this->load->view('parts/header', $info);
?>

<section class="main-section">
  <div class="container">

    <div class="row">
      <div class="col-xs-12 col-sm-8 col-md-8">
        <h3>Recently Updated Profiles:</h3>
        <ul class="recent-update list-unstyled">
          <li class="col-xs-6 col-md-4">
            <a href="/people/meredith-berger-10540690/">Meredith Berger</a><br>
            <span>Florham Park, NJ</span>
          </li>
          <li class="col-xs-6 col-md-4">
            <a href="/people/david-l-ruzicka-113028513/">David L Ruzicka</a><br>
            <span>Humboldt, IA</span>
          </li>
          <li class="col-xs-6 col-md-4">
            <a href="/people/kimberly-eads/">Kimberly C Eads</a><br>
            <span>Kansas City, MO</span>
          </li>
          <li class="col-xs-6 col-md-4">
            <a href="/people/carma-taylor-davis-32245129/">Carma Taylor Davis</a><br>
            <span>Denver, CO</span>
          </li>
          <li class="col-xs-6 col-md-4">
            <a href="/people/joanne-mcnulty-87415616/">Joanne McNulty</a><br>
            <span>Maple Shade, NJ</span>
          </li>
          <li class="col-xs-6 col-md-4">
            <a href="/people/craig-weinstein/">Craig A Weinstein</a><br>
            <span>Maple Valley, WA</span>
          </li>
        </ul>
        <a class="btn btn-default" href="/people/">View More Profiles</a><br>
      </div>

      <div class="col-xs-12 col-sm-4 col-md-4 info-btn">
        <div class="detail-section text-center">
          <img src="/people/assets/img/images/icon-db.png"><br>
          <h4>Public Records Directory</h4>
          <p class="top-p">Looking for someone?  We're the easy and free way to look people up.  Connect with people and learn more about them.</p>
          <!-- <a class="btn btn-lg btn-success" href="/people/">Browse Our Database</a> -->
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
          We aggregate public records that could otherwise take you weeks or months to collect.  Find friends, relatives, neighbors or even yourself.  Our People Search Reports may contain:
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
                <img src="/people/assets/img/images/icon-birthdate.png">
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
        <div class="col-xs-12 col-sm-9 col-md-9">Public Record Data For The United States...</div>
        <div class="col-xs-12 col-sm-3 col-md-3"><a class="btn btn-lg btn-success" href="/people/">Browse Database Now</a></div>
      </div>
  </div>
</section>

<?php
$this->load->view('parts/footer');
?>
