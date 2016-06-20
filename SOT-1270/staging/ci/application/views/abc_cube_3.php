<?php
$info["robots"] = "noindex";
$info["h1"] = "Search People from ".p($lowlast)." to ".p($highlast)."";
$info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "".p($lowlast)." to ".p($highlast)." | Public Records";
$info["description"] = "Public Records";
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


$this->load->view("parts/header", $info);
$this->load->view("parts/breadcrumbs", $info);
?>

<div class="container results">
    <div class="row">
        <div class="col-sm-12 col-md-12">
            <div class="dir-wrap">
                <p class=""><strong>Browse Names from <?php echo p($lowfirst) . " " . p($lowlast) . " to " . p($highfirst) . " " . p($highlast); ?></strong></p>
                <div>
                    <ul class="row">
                        <?php
      							foreach ($buckets as $bucket) {
      							?>
      							    <li><a href="/people/<?php echo l($bucket["first"]) . "-" . l($bucket["last"]); ?>/"><?php echo p($bucket["first"]) . " " . p($bucket["last"]); ?></a></li>
      							<?php
      							}
      							?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<?php
$this->load->view("parts/footer");
?>
