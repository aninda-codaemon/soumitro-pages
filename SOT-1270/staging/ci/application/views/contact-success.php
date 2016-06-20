<?php

$info["h1"] = "Email Sent Successfully";
// $info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "Contact Success | Public Records";
$info["description"] = "Public Records's people finder has contact information and public records for more than 90% US adults.";
$info["canonical"] = current_url() . "/";





$this->load->view("parts/header", $info);
// $this->load->view("parts/breadcrumbs", $info);
?>

      <section class="more-detail">
        <div class="container">
          <div class="row text-center">
            <div class="col-sm-12">
              <h2>Thank you for your email</h2>
              <p>
                One our customer support specialists will contact you within 72 hours.
              </p>
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

      <?php
      $this->load->view("parts/footer");
      ?>
