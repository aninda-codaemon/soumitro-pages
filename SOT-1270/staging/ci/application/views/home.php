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
                              <div class="hidden-xs">Quickly search public records that could otherwise take you weeks or months to collect.
                              Find friends, relatives, neighbors or even yourself. Comprehensive people search reports may contain:</div>
                              <ul>
                                  <li>Names</li>
                                  <li>Phone Numbers</li>
                                  <li>Relatives</li>
                                  <li>Criminal Records</li>
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
