<?php

$info["h1"] = "About Public Records";
$info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "About | Public Records";
$info["description"] = "Public Records's people finder has contact information and public records for more than 90% US adults.";
$info["breadcrumbs"] = $breadcrumbs;
$info["canonical"] = current_url() . "/";

$docWebPage = (object)array(
  "@context" => "http://schema.org",
  "@type" => "WebPage",
  "specialty" => "Public Records"
);

$breadcrumbListItems = array();
$profileBreadcrumbs = array_slice($breadcrumbs, -1);

foreach ($profileBreadcrumbs[0] as $key=>$level) {
  $url = "";
  if (!empty($level["url"])) {
    $url = base_url().preg_replace('/^\//', '', $level["url"]);
  }

  array_push($breadcrumbListItems, (object)array(
      "@type" => "ListItem",
      "position" => $key + 1,
      "item" => (object)array(
        "@id" => $url,
        "name" => $level["title"]
      )
    )
  );
}

$docBreadcrumbs = (object)array(
  "@context" => "http://schema.org",
  "@type" => "BreadcrumbList",
  "itemListElement" => $breadcrumbListItems
);

$context = "http://schema.org";

$jsonld = array();
$jsonld[0] = jsonld_compact($docWebPage, $context, array(  'documentLoader' => 'cache_load'));
$jsonld[1] = jsonld_compact($docBreadcrumbs, $context, array(  'documentLoader' => 'cache_load'));

$info["jsonld"] = json_encode($jsonld, JSON_PRETTY_PRINT);

//$SEO_FILE_NAME = 'seo-people-door.txt';
//$SEO_FILE_URL = 'https://www.beenverified.com/seo/seo-people-door-copy/';
//$SEO_FILE = get_content(__DIR__.'/temp/'.$SEO_FILE_NAME,$SEO_FILE_URL,3,'format_seotext',array('file'=>$SEO_FILE_NAME));

$this->load->view("parts/header", $info);
// $this->load->view("parts/breadcrumbs", $info);
?>

      <section class="more-detail">
        <div class="container">
          <div class="row text-center">
            <div class="col-xs-12">
              <h2>Looking for someone?</h2>
              <p>
                Public-Records.net is a free online resource for finding information about people. By compiling records from dozens of databases, its easier than ever to access public records. Find someone in our people directory to see their name, age, phone numbers, addresses and more. Are you trying to contact a distant friend? Wondering what records exist about yourself? Uncertain about someone's persona details? Public-Records.net is an easy and free way to get started!
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
