<?php

// $info["h1"] = "Public Records";
$info["h1"] = "Find Who You're Looking For";
$info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "People Directory | Public Records";
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
$this->load->view("parts/breadcrumbs", $info);
?>

<div class="container results">
    <div class="row">
        <div class="col-sm-12 col-md-12">
                <div>
                  <h2>Search or Browse by Name</h2>
                  <p>It's easier than ever to find public records about people!
                  With Public-Records.net, you can look up friends, relatives, neighbors or even yourself. You can browse our people white pages directory to see their names, birthdays, phone numbers, relatives, addresses and more. The directory includes free public records on selected individuals:</p>
                </div>
                <p class=""><strong>Browse Names from <?php echo p($lowlast) . " to " . p($highlast); ?></strong></p>
                <div>
                    <ul class="row">
                        <?php
                        foreach ($buckets as $bucket) {
                        ?>
                        <li><a href="/people/<?php echo $bucket["x"]; ?>/"><?php echo p($bucket["lowlast"]) . " to " . p($bucket["highlast"]); ?></a></li>
                        <?php
                        }
                        ?>
                    </ul>
                </div>
        </div>
    </div>
</div>

<?php
$this->load->view("parts/footer");
?>
