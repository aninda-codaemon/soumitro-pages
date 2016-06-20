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

<section class="profiles">
    <div class="container">
        <h3>Recently Updated Profiles</h3>
          <ul>
            <li>
                <a href="#">Amber B Taylor</a>
                  <p>62 Years Old</p>
                  <p>Middle Town, AR</p>
              </li>
            <li>
                <a href="#">David L Ruzicka</a>
                  <p>62 Years Old</p>
                  <p>Humboldt, IA</p>
              </li>
            <li>
                <a href="#">Kimberly C Eads</a>
                  <p>62 Years Old</p>
                  <p>Kansas City, MO</p>
              </li>
            <li>
                <a href="#">Carma Taylor Davis</a>
                  <p>62 Years Old</p>
                  <p>Middle Town, AR</p>
              </li>
            <li>
                <a href="#">Amber B Taylor</a>
                  <p>62 Years Old</p>
                  <p>Middle Town, AR</p>
              </li>
            <li>
                <a href="#">Amber B Taylor</a>
                  <p>62 Years Old</p>
                  <p>Middle Town, AR</p>
              </li>
            <li>
                <a href="#">Amber B Taylor</a>
                  <p>62 Years Old</p>
                  <p>Middle Town, AR</p>
              </li>
            <li>
                <a href="#">Amber B Taylor</a>
                  <p>62 Years Old</p>
                  <p>Middle Town, AR</p>
              </li>
          </ul>
          <a class="view-more">View More Profiles</a>
      </div>
</section>
<!-- End Profiles -->

<?php
$this->load->view('parts/footer');
?>
