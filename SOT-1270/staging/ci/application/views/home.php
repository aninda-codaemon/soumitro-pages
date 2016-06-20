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
                <a href="/people/meredith-berger-10540690/">Meredith Berger</a>
                  <p>66 Years Old</p>
                  <p>Florham Park, NJ</p>
              </li>
            <li>
                <a href="/people/david-l-ruzicka-113028513/">David L Ruzicka</a>
                  <p>46 Years Old</p>
                  <p>Humboldt, IA</p>
              </li>
            <li>
                <a href="/people/kimberly-eads/">Kimberly C Eads</a>
                  <p>43 Years Old</p>
                  <p>Kansas City, MO</p>
              </li>
            <li>
                <a href="/people/carma-taylor-davis-32245129/">Carma Taylor Davis</a>
                  <p>60 Years Old</p>
                  <p>Denver, CO</p>
              </li>
            <li>
                <a href="/people/joanne-mcnulty-87415616/">Joanne McNulty</a>
                  <p>64 Years Old</p>
                  <p>Maple Shade, NJ</p>
              </li>
            <li>
                <a href="/people/craig-weinstein/">Craig A Weinstein</a>
                  <p>45 Years Old</p>
                  <p>Maple Valley, WA</p>
              </li>
            <li>
                <a href="/people/lisa-dimarco/">Lisa Lynn Dimarco</a>
                  <p>57 Years Old</p>
                  <p>North Windham, CT</p>
              </li>
            <li>
                <a href="/people/barry-field/">Barry E Field</a>
                  <p>70 Years Old</p>
                  <p>Bronx, NY</p>
              </li>
          </ul>
          <a class="view-more" href="/people/">View More Profiles</a>
      </div>
</section>
<!-- End Profiles -->

<?php
$this->load->view('parts/footer');
?>
