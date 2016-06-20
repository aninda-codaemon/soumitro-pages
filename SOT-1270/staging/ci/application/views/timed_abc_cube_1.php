<?php

echo "Start of View: " . (microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']);

$info["h1"] = "People White Pages";
$info["title"] = "People White Pages | BeenVerified.com";
$info["description"] = "BeenVerified's people white pages directory has contact information and public records for more than 90% US adults.";
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

echo "Start of JSON LD: " . (microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']);
$jsonld = array();
$jsonld[0] = jsonld_compact($docWebPage, $context);
$jsonld[1] = jsonld_compact($docBreadcrumbs, $context);

$info["jsonld"] = json_pretty(json_encode($jsonld), JSON_FORCE_OBJECT);

echo "End of JSON LD: " . (microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']);

//$SEO_FILE_NAME = 'seo-people-door.txt';
//$SEO_FILE_URL = 'https://www.beenverified.com/seo/seo-people-door-copy/';
//$SEO_FILE = get_content(__DIR__.'/temp/'.$SEO_FILE_NAME,$SEO_FILE_URL,3,'format_seotext',array('file'=>$SEO_FILE_NAME));

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
                    <div>
                        <?php $this->load->view("parts/dynamic/door", $info); ?>
                    </div>
                    <p class=""><strong>Browse Name From <?php echo p($lowfirst . " " . $lowlast) . " to " . p($highfirst . " " . $highlast); ?></strong></p>
                    <div>
                        <ul class="row">
                            <!-- begin include -->
                            <?php
                            foreach ($buckets as $bucket) {
                            ?>
                            <li class="col-md-6"><a href="/people/<?php echo $bucket["x"]; ?>/"><?php echo p($bucket["lowfirst"] . " " . $bucket["lowlast"]) . " - " . p($bucket["highfirst"] . " " . $bucket["highlast"]); ?></a></li>
                            <?php
                            }
                            ?>
                            <!-- end include -->
                        </ul>
                    </div>
                </div>
                <?php /*
                <div class="dir-wrap">
                    <p><strong>Browse People By State</strong></p>
                    <div>
                        <ul class="row">
                            <!-- begin include -->
                            <?php
                            foreach ($states as $state) {
                            ?>
                            <li class="col-md-3"><a href="/<?php echo $state; ?>/"><?php echo ul($state); ?></a></li>
                            <?php
                            }
                            ?>
                            <!-- edn include -->
                        </ul>
                    </div>
                </div>
                */ ?>
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
<!-- abc_cube_1 -->
<?php
$this->load->view("parts/footer");
echo "End of View: " . (microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']);
?>
