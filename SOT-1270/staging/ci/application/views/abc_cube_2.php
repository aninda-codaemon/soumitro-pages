<?php
$info["robots"] = "noindex";
$info["h1"] = "Find people from ".p($lowlast)." to ".p($highlast)."";
$info["title"] = "".p($lowlast)." to ".p($highlast)." | BeenVerified";
$info["description"] = "";
$info["breadcrumbs"] = $breadcrumbs;
$info["canonical"] = current_url() . "/";

$docWebPage = (object)array(
  "@context" => "http://schema.org",
  "@type" => "WebPage",
  "specialty" => "Background Checks"
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
$jsonld[0] = jsonld_compact($docWebPage, $context);
$jsonld[1] = jsonld_compact($docBreadcrumbs, $context);

$info["jsonld"] = json_encode($jsonld, JSON_PRETTY_PRINT);

/*////////////////////////////////////////////////
//                                              //
//                   header                     //
//                                              //
////////////////////////////////////////////////*/
$this->load->view("parts/header", $info);

/*////////////////////////////////////////////////
//                                              //
//                 breadcrumb                   //
//                                              //
////////////////////////////////////////////////*/
$this->load->view("parts/breadcrumbs", $info);
?>

<!--
//////////////////////////////////////////////////
//                                              //
//                main content                  //
//                                              //
//////////////////////////////////////////////////
-->
<section id="info-body">
    <div id="info-body-person" class="container no-bottom">
        <div class="row">
            <div class="col-sm-6 col-md-8">
                <div class="dir-wrap">
                    <p class=""><strong>abc_cube_2 Browse Name From <?php echo p($lowfirst . " " . $lowlast) . " to " . p($highfirst . " " . $highlast); ?></strong></p>
                    <div>
                        <ul class="row">
                            <!-- begin include -->
                            <?php
							foreach ($buckets as $bucket) {
							?>
							    <li class="col-md-6"><a href="/people/<?php echo $bucket["x"] . "/". $bucket["y"]; ?>/"><?php echo p($bucket["lowfirst"] . " " . $bucket["lowlast"]) . " to " . p($bucket["highfirst"] . " " . $bucket["highlast"]); ?></a></li>
							<?php
							}
							?>
                            <!-- end include -->
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-md-4">
                <!-- begin signup include -->
                <?php
                $this->load->view("parts/signup");
                ?>
                <!-- end signup include -->
            </div>
        </div>
    </div>
</section>

<!--
//////////////////////////////////////////////////
//                                              //
//                   footer                     //
//                                              //
//////////////////////////////////////////////////
-->
<!-- abc_cube_2 -->
<?php
$this->load->view("parts/footer");
?>
