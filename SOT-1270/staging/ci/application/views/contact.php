<?php

$info["h1"] = "Contact Public Records";
$info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "Contact | Public Records";
$info["description"] = "Public Records's people finder has contact information and public records for more than 90% US adults.";
$info["canonical"] = current_url() . "/";





$this->load->view("parts/header", $info);
// $this->load->view("parts/breadcrumbs", $info);
?>

      <section class="more-detail">
        <div class="container">
          <div class="row text-center">
            <div class="col-sm-12">
              <h2>Contact Form</h2>
              <p>
                Phone: 1-234-9-PUBLIC (1-234-978-2542)<br>
                Email: <a href="mailto:support@public-records.net?subject=Public-Records.net Support">support@public-records.net</a>
              </p>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-offset-2 col-sm-8">

              <form class="form-horizontal" action="https://www.bluehost.com/bluemail" enctype="multipart/form-data" method="POST">

                <div class="form-group">
                    <label for="name" class="col-sm-2 control-label">Name: </label>
                    <div class="col-sm-10">
                      <input class="form-control" type="text" name="Name">
                    </div>
                </div>

                <div class="form-group">
                    <label for="mailfrom" class="col-sm-2 control-label">Email: </label>
                    <div class="col-sm-10">
                      <input class="form-control" type="text" name="mailfrom">
                    </div>
                </div>

                <div class="form-group">
                    <label for="message" class="col-sm-2 control-label">Message: </label>
                    <div class="col-sm-10">
                      <textarea class="form-control" name="message"></textarea>
                    </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <input type="hidden" name="sendtoemail" value="support@public-records.net">
                    <input type="hidden" name="redirect" value="https://public-records.net/contact-success/">
                    <input type="hidden" name="subject" value="Public-Records.net Contact Form">
                  	<input class="btn btn-primary" type="submit" value="Send Message">
                  </div>
                </div>

              </form>

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
