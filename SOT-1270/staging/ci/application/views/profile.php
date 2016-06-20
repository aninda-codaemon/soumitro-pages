<?php
$info["canonical"] = current_url() . "/";

$fullName = p($profile["name"][0]["fn"] . " " . $profile["name"][0]["mn"] . " " . $profile["name"][0]["ln"]);

//H1
$info["h1"] = "We found " . p($profile["name"][0]["fn"] . " " . $profile["name"][0]["ln"]);
// if (!empty($profile["address"][0]["city"])) {
//     $info["h1"] .= " of " . p($profile["address"][0]["city"]) . ", " . $profile["address"][0]["state"];
// }
// $info["h1"] = "Find Who You're Looking For";
$info["tagline"] = "See public records, phone numbers, addresses and more!";


// Title
$info["title"] = p($profile["name"][0]["fn"] . " " . $profile["name"][0]["ln"]);
$info["title"] .= " in " . p($profile["address"][0]["city"]) . ", " . $profile["address"][0]["state"] . " | Public Records";

// Description
$info["description"] = "We have Public Records data for " . p($profile["name"][0]["fn"] . " " . $profile["name"][0]["ln"]) . ", including phone numbers, current address, relatives, date of birth and more!";

$relativesList = array();
if (count($profile["relatives"]) > 0) {
  foreach ($profile["relatives"] as $key => $value) {
    array_push($relativesList, (object)array(
      "@type" => "Person",
      "name" => p($value["firstname1"]) . " " . p($value["lastname1"]),
      "givenName" => p($value["firstname1"]),
      "familyName" => p($value["lastname1"])
    ));
  }
}

$docPerson = (object)array(
    "@context" => "http://schema.org",
    "@type" => "Person",
    "name" => preg_replace('/\s+/', ' ', $fullName),
    "givenName" => p($profile["name"][0]["fn"]),
    "additionalName" => p($profile["name"][0]["mn"]),
    "familyName" => p($profile["name"][0]["ln"]),
    "address" => (object)array(
      "@type" => "PostalAddress",
      "streetAddress" => p($profile["address"][0]["street"]),
      "addressLocality" => p($profile["address"][0]["city"]),
      "addressRegion" => pcs($profile["address"][0]["state"]),
      "postalCode" => p($profile["address"][0]["zip"])
    ),
    "birthDate" => $profile["dateofbirth"][0],
    "telephone" => $profile["phone"][0],
    "relatedTo" => $relativesList
);

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

  if ($level === end($profileBreadcrumbs[0])) {
    array_push($breadcrumbListItems,
      (object)array(
        "@type" => "ListItem",
        "position" => $key + 2,
        "item" => (object)array(
          "@id" => current_url() . "/",
          "name" => $fullName
        )
      )
    );
  }
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
$jsonld[2] = jsonld_compact($docPerson, $context, array(  'documentLoader' => 'cache_load'));

$info["jsonld"] = json_encode($jsonld, JSON_PRETTY_PRINT);

$info["breadcrumbs"] = $profileBreadcrumbs;

$p = "p";

$this->load->view("parts/header", $info);
$this->load->view("parts/breadcrumbs_profile", $info);

?>

<div class="container results">
    <?php /* <h4>People Results For <?php echo $fullName; ?>:</h4> */ ?>

    <div class="row">
      <?php if (false) { ?>
      <div class="col-xs-12 col-sm-3 col-md-2 user-img"><img src="<?php echo asset_url();?>img/images/img.jpg" alt="" /></div>
      <?php } ?>
      <div class="col-xs-12 col-sm-9 col-md-8">
        <h2 class="name"><?php echo $fullName; ?><?php if (!empty($profile["age"][0]) && $profile["age"][0] > 0) { ?><p>Age:  <?php echo $profile["age"][0]; ?> years</p><?php } ?>
        </h2>
          <ul class="info">
            <?php if (!empty($profile["age"][0]) && $profile["age"][0] > 0) { ?><li class="dob"><strong>Date Of Birth:</strong><?php echo pbd($profile["dateofbirth"][0]); ?></li><?php } ?>
            <?php if (!empty($profile["address"][0]["street"])) { ?><li class="add"><strong>Present Address:</strong><?php echo p($profile["address"][0]["street"]); ?>, <?php echo p($profile["address"][0]["city"]); ?>, <?php echo $profile["address"][0]["state"]; ?> <?php echo p($profile["address"][0]["zip"]); ?></li><?php } ?>
            <?php if (!empty($profile["phone"][0]) && strlen($profile["phone"][0]) == 10) { ?><li class="phone"><strong>Current Phone #:</strong><?php echo t($profile["phone"][0]); ?></li><?php } ?>
            <?php if (false) { ?><li class="email"><strong>Email Address:</strong>XXXX.XXXXXX@gmail.com</li><?php } ?>
          </ul>
      </div>
      <?php /*
      <div class="col-xs-12 col-sm-3 col-md-4 info-btn"><a class="btn btn-lg btn-success" href="#">View Full Report</a></div>
      */ ?>
    </div>

    <div class="row">
      <div class="short-detail"></div>
      <div class="col-xs-12 col-sm-6 col-md-7">
        <div class="summary">Short Summary:</div>
          <p>
            <?php
            if (!empty($profile["age"][0]) && $profile["age"][0] > 0) {
            ?>
            <?php echo $fullName; ?> is <strong><?php echo $profile["age"][0]; ?> years old</strong> and was born on <strong><?php echo bd($profile["dateofbirth"][0]); ?></strong>.
            <?php
            }
            if (!empty($profile["address"][0]["street"]) || (!empty($profile["phone"][0]) && strlen($profile["phone"][0]) == 10)) {
              if (!empty($profile["address"][0]["street"])) {
            ?>
                <?php echo p($profile["name"][0]["fn"]); ?>'s current address is <strong><?php echo p($profile["address"][0]["street"]); ?>, <?php echo p($profile["address"][0]["city"]); ?>, <?php echo pcs($profile["address"][0]["state"]); ?> <?php echo p($profile["address"][0]["zip"]); ?></strong><?php }
              if (!empty($profile["address"][0]["street"]) && (!empty($profile["phone"][0]) && strlen($profile["phone"][0]) == 10)) { ?>, and
              <?php }
              if (!empty($profile["phone"][0]) && strlen($profile["phone"][0]) == 10) { ?>
                <?php echo p($profile["name"][0]["fn"]); ?>'s current phone number is <strong class="no-wrap"><?php echo t($profile["phone"][0]); ?></strong>.
              <?php } ?>
            <?php
            }
            if (!empty($profile["cityst"][1]["city"])) {
            ?>
              <?php echo p($profile["name"][0]["fn"]); ?>'s past location was in <strong><?php echo p($profile["cityst"][1]["city"]); ?>, <?php echo pcs($profile["cityst"][1]["state"]); ?></strong>.
              <?php
              if (!empty($profile["cityst"][2]["city"])) {
              ?>
                Before that, <?php echo p($profile["name"][0]["fn"]); ?> lived in <strong><?php echo p($profile["cityst"][2]["city"]); ?>, <?php echo pcs($profile["cityst"][2]["state"]); ?></strong>.
              <?php
              }
            }
            ?>
          </p>
      </div>
      <div class="col-xs-12 col-sm-6 col-md-5">
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 relatives">
                <img src="<?php echo asset_url();?>img/images/user-icon.png" alt="" />
                  <div class="numbers">
                    <div><?php echo sprintf("%02d", count($profile["relatives"])); ?></div>
                      <p>Relatives</p>
                  </div>
              </div>
            <div class="col-xs-6 col-sm-6 col-md-6 locations">
                <img src="<?php echo asset_url();?>img/images/pin-icon.png" alt="" />
                  <div class="numbers">
                    <div><?php echo sprintf("%02d", count(array_slice($profile["address"],1))); ?></div>
                      <p>Past Locations</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
</div>

<section class="more-detail">
  <div class="container">
    <h2>More Details About <?php echo p($profile["name"][0]["fn"]); ?>:</h2>

    <div class="row">

      <?php if (1==0) { ?>
      <div class="col-xs-12 col-sm-6 col-md-6">
        <div class="detail-section">
          <strong class="heading green-heading">Email Addresses:</strong>
          <div>mcmark@comcast.net</div>
          <div>markt-dgta@gmail.com</div>
          <div>markdgaeta345@gmail.com</div>
        </div>
      </div>
      <?php } ?>

      <?php
      if (count($profile["relatives"]) > 0) {
      ?>
      <div class="col-xs-12 col-sm-6 col-md-6">
        <div class="detail-section">
          <strong class="heading relatives-heading">Known Relatives:</strong>
          <?php
          $i = 0;
          foreach($profile["relatives"] as $relative) {
          ?>
          <div><?php echo p($relative["firstname1"]) . " " . p($relative["lastname1"]); ?></div>
          <?php
            //if(++$i > 3) break;
          }
          ?>
        </div>
      </div>
      <?php
      }
      ?>

      <?php
      if (count($profile["address"]) > 1) {
      ?>
      <div class="col-xs-12 col-sm-6 col-md-6">
        <div class="detail-section">
          <strong class="heading pastlocations-heading">Past Locations:</strong>
          <?php
          foreach (array_slice($profile["address"], 1) as $address) {
          ?>
          <div><?php
                  echo p($address["street"]);
                  if (!empty($address["street"]) and (!empty($address["city"]) or !empty($address["state"]))) {
                      echo ", ";
                  }
                  echo ul($address["city"]);
                  if (!empty($address["city"]) and (!empty($address["state"]) or !empty($address["zip"]))) {
                      echo ", ";
                  }
                  echo $address["state"];
                  if (!empty($address["state"]) and !empty($address["zip"])) {
                      echo ", ";
                  }
                  echo $address["zip"];
                  ?></div>
          <?php
          }
          ?>
        </div>
      </div>
      <?php
      }
      ?>

      <?php
      if (count($profile["phone"]) > 0) {
      ?>
      <div class="col-xs-12 col-sm-6 col-md-6">
        <div class="detail-section">
          <strong class="heading phone-heading">Phone Numbers:</strong>
          <?php
          //$i = 0;
          foreach($profile["phone"] as $tel) {
          ?>
            <?php if (strlen($tel) == 10) { ?>
            <div><?php echo t($tel); ?></div>
            <?php } ?>
          <?php
            //if(++$i > 3) break;
          }
          ?>
        </div>
      </div>
      <?php
      }
      ?>

    </div>
  </div>
</section>

<?php if (!empty($profile["address"][0]["street"])) { ?>
<div class="map-wrapper">
  <div id="map" title="Map of <?php echo p($profile['address'][0]['street']); ?> <?php echo p($profile['address'][0]['city']); ?> <?php echo $profile['address'][0]['state']; ?> <?php echo p($profile['address'][0]['zip']); ?>" style="background-image: url('//maps.googleapis.com/maps/api/staticmap?center=<?php echo urlencode(p($profile["address"][0]["street"]) . ',' . $profile['address'][0]['city'] . ',' . $profile['address'][0]['state']); ?>&format=jpg&maptype=terrain&zoom=13&markers=size:small%7Ccolor:red%7C<?php echo urlencode(p($profile["address"][0]["street"]) . ',' . $profile['address'][0]['city'] . ',' . $profile['address'][0]['state']); ?>&size=640x320&scale=2&sensor=false&markers=size:mid%7Ccolor:red')"> </div>
  <!-- <div id='map'></div> -->
  <div class="container">
      <div class="map-location">
        <h3>Current Address of <?php echo p($profile["name"][0]["fn"]); ?>:</h3>
          <p><?php echo p($profile["address"][0]["street"]); ?><br><?php echo p($profile["address"][0]["city"]); ?>, <?php echo $profile["address"][0]["state"]; ?> <?php echo p($profile["address"][0]["zip"]); ?></p>
      </div>
  </div>
</div>
<?php } ?>

<?php /*
<section class="want-more">
  <div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-8 col-md-7">Want To Know More About <?php echo p($profile["name"][0]["fn"]); ?>?</div>
        <div class="col-xs-12 col-sm-4 col-md-5"><a class="btn btn-lg btn-success" href="#">View Full Report</a></div>
      </div>
  </div>
</section>
*/ ?>

<?php
$this->load->view("parts/footer");
?>
