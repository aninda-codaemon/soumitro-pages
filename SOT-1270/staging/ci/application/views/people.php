<?php
$info["canonical"] = current_url() . "/";

$fullName = p($profile["name"][0]["fn"] . " " . $profile["name"][0]["mn"] . " " . $profile["name"][0]["ln"]);

// h1
// $info["h1"] = p($name["fn"] . " " . $name["ln"]);
$info["h1"] = "We found " . p($profile["name"][0]["fn"] . " " . $profile["name"][0]["ln"]);
// $info["h1"] = "We found " . p($profile["name"][0]["fn"] . " " . $profile["name"][0]["ln"]);
$info["tagline"] = "See public records, phone numbers, addresses and more!";

// if (!empty($profile["address"][0]["city"])) {
//     $info["h1"] .= " of " . ul($city) . ", " . $state;
// }
/*
$info["h1"] = "Find " . p($name["fn"] . " " . $name["mn"] . " " . $name["ln"]);
if ((!empty($name["fn"]) or !empty($name["mn"]) or !empty($name["ln"])) and (!empty($city) or !empty($state))) {
    $info["h1"] .= ", ";
}
$info["h1"] .= ul($city);
if (!empty($city) and !empty($state)) {
    $info["h1"] .= ", ";
}
$info["h1"] .= spc(ul($state));
*/

// Title
$info["title"] = p($name["fn"] . " " . $name["ln"]) . " | Public Records";

// $info["title"] = p($name["fn"] . " " . $name["ln"]);
// $info["title"] .= "'s Phone, Address, Email & More | BeenVerified";
/*
$info["title"] = p($name["fn"] . " " . $name["mn"] . " " . $name["ln"]);
if ((!empty($name["fn"]) or !empty($name["mn"]) or !empty($name["ln"])) and (!empty($city) or !empty($state))) {
    $info["title"] .= ", ";
}
$info["title"] .= ul($city);
if (!empty($city) and !empty($state)) {
    $info["title"] .= ", ";
}
$info["title"] .= spc(ul($state));
*/

// Description
$info["description"] = "We have Public Records data for " . p($name["fn"] . " " . $name["ln"]) . ", including phone numbers, current address, relatives, date of birth and more!";

// description
// $info["description"] = "We found " . p($name["fn"] . " " . $name["ln"]) . "! See " . p($name["fn"] . " " . $name["ln"]) . "'s 1) Phone, 2) Address, 3) Age and more on BeenVerified. Search for free!";
/*
$info["description"] = "Find ". p($name["fn"] . " " . $name["mn"] . " " . $name["ln"]);
if ((!empty($name["fn"]) or !empty($name["mn"]) or !empty($name["ln"])) and (!empty($city) or !empty($state))) {
    $info["description"] .= ", ";
}
$info["description"] .= ul($city);
if (!empty($city) and !empty($state)) {
    $info["description"] .= ", ";
}
$info["description"] .= spc(ul($city)) . " at BeenVerified.com, your people search and background check answer.";
*/

//$fullname = $stripped = preg_replace(array('/\s{2,}/', '/[\t\n]/'), ' ', p($person["firstname1"] . " " . $person["middlename1"] . " " . $person["lastname1"]);

// $docPerson = (object)array(
//     "@context" => "http://schema.org",
//     "@type" => "Person",
//     "givenName" => p($name["fn"]),
//     "additionalName" => p($name["mn"]),
//     "familyName" => p($name["ln"]),
//     "address" => (object)array(
//       "@type" => "PostalAddress",
//       "streetAddress" => ul($street),
//       "addressLocality" => ul($city),
//       "addressRegion" => pcs($state),
//       "postalCode" => $zip
//     ),
//     "birthDate" => $profile["dateofbirth"][0],
//     "telephone" => $profile["phone"][0]
// );

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
$profileBreadcrumbs = $breadcrumbs;

foreach ($profileBreadcrumbs[0] as $key=>$level) {
  $url = "";
  if (!empty($level["url"])) {
    $url = $level["url"];
  }

  array_push($breadcrumbListItems, (object)array(
      "@type" => "ListItem",
      "position" => $key + 1,
      "item" => (object)array(
        "@id" => $url,
        "name" => ucwords(strtolower($level["title"])),
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
$jsonld[2] = jsonld_compact($docPerson, $context, array(  'documentLoader' => 'cache_load'));

$info["jsonld"] = json_encode($jsonld, JSON_PRETTY_PRINT);

$info["breadcrumbs"] = $breadcrumbs;

$this->load->view("parts/header", $info);
$this->load->view("parts/breadcrumbs", $info);

//$prominent = array_shift($people);
// $data["profile"] = $this->SeoDB->getProfile($prominent["firstname1"]), $prominent["middlename1"]), $prominent["lastname1"], $prominent["id"]);
// print_r($prominent_raw);
// print_r($profile);
?>

<div class="container results">

  <?php
  // foreach ($prominent as $person) {
  ?>
    <div class="row">

      <div class="col-xs-12 col-sm-8">
        <h2 class="name"><?php echo $fullName; ?><?php if (!empty($profile["age"][0]) && $profile["age"][0] > 0) { ?><p>Age:  <?php echo $profile["age"][0]; ?> years</p><?php } ?>
        </h2>
          <ul class="info">
            <?php if (!empty($profile["age"][0]) && $profile["age"][0] > 0) { ?><li class="dob"><strong>Date Of Birth:</strong><?php echo pbd($profile["dateofbirth"][0]); ?></li><?php } ?>
            <?php if (!empty($profile["address"][0]["street"])) { ?><li class="add"><strong>Present Address:</strong><?php echo p($profile["address"][0]["street"]); ?>, <?php echo p($profile["address"][0]["city"]); ?>, <?php echo $profile["address"][0]["state"]; ?> <?php echo p($profile["address"][0]["zip"]); ?></li><?php } ?>
            <?php if (!empty($profile["phone"][0]) && strlen($profile["phone"][0]) == 10) { ?><li class="phone"><strong>Current Phone #:</strong><?php echo t($profile["phone"][0]); ?></li><?php } ?>
            <?php if (false) { ?><li class="email"><strong>Email Address:</strong>XXXX.XXXXXX@gmail.com</li><?php } ?>
          </ul>
      </div>


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
          <a href="#others" class="btn btn-lg btn-default">Not the <?php echo p($name["fn"] . " " . $name["ln"]); ?> you were looking for? See more! <span class="glyphicon glyphicon-triangle-bottom"></span></a>
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
    <?php
    // }
    ?>
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
          foreach (array_slice($profile["address"],1) as $address) {
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

<?php if ($people) { ?>
<div id="others" class="container results">
    <div class="row">
      <div class="col-xs-12 col-sm-8">
        <h2>
          Other People Named <?php echo p($name["fn"]) . " " . p($name["mn"]) . " " . p($name["ln"]); ?>
        </h2>
      </div>
      <div class="col-xs-12 col-sm-4 text-right">
        <div class="sort btn-group">
          <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sort <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li><a class="sort-name">Name</a></li>
            <li><a class="sort-age">Age</a></li>
            <li><a class="sort-city">City</a></li>
            <li><a class="sort-state">State</a></li>
          </ul>
        </div>
      </div>
    </div>

    <?php
    foreach ($people as $person) {
      //print_r($person);
    ?>

    <div class="row result">
      <div class="col-xs-12 col-sm-8">
        <h3 class="name-list"><a href="<?php echo "/people/" . $person["url"] . "/"; ?>"><?php echo p($person["firstname1"]) . " " . p($person["middlename1"]) . " " . p($person["lastname1"]); ?></a> <?php if (!empty($person["age"]) && $person["age"] > 0) { ?><p class="age">Age:  <?php echo $person["age"] ?> years</p><?php } ?>
        </h2>
          <ul class="info">
              <?php
              if (isset($person["streetaddress1"]) or isset($person["city1"]) or isset($person["state1"]))  {
              ?>
                  <li>
                      <span class="address-street">
                      <?php
                          echo p($person["streetaddress1"]);
                          if (!empty($person["streetaddress1"]) and (!empty($person["city1"]) or !empty($person["state1"]))) {
                              echo ", ";
                          }
                      ?>
                      </span>
                      <span class="address-city">
                      <?php
                          echo p($person["city1"]);
                          if (!empty($person["city1"]) and !empty($person["state1"])) {
                              echo ", ";
                          }
                      ?>
                      </span>
                      <span class="address-state">
                      <?php
                          echo $person["state1"];
                      ?>
                      </span>
                  </li>
              <?php
              }
              ?>

              <?php
              if (isset($person["streetaddress2"]) or isset($person["city2"]) or isset($person["state2"]))  {
              ?>
                  <li>
                      <?php
                          echo p($person["streetaddress2"]);
                          if (!empty($person["streetaddress2"]) and (!empty($person["city2"]) or !empty($person["state2"]))) {
                              echo ", ";
                          }
                          echo p($person["city2"]);
                          if (!empty($person["city2"]) and !empty($person["state2"])) {
                              echo ", ";
                          }
                          echo $person["state2"];
                      ?>
                  </li>
              <?php
              }
              ?>

              <?php
              if (isset($person["streetaddress3"]) or isset($person["city3"]) or isset($person["state3"]))  {
              ?>
                  <li>
                      <?php
                          echo p($person["streetaddress3"]);
                          if (!empty($person["streetaddress3"]) and (!empty($person["city3"]) or !empty($person["state3"]))) {
                              echo ", ";
                          }
                          echo p($person["city3"]);
                          if (!empty($person["city3"]) and !empty($person["state3"])) {
                              echo ", ";
                          }
                          echo $person["state3"];
                      ?>
                  </li>
              <?php
              }
              ?>
          </ul>

      </div>
      <div class="col-xs-12 col-sm-4">
        <div class="record-cta text-center">
          <a href="<?php echo "/people/" . $person["url"] . "/"; ?>" class="btn btn-lg btn-success">See Record <span class="glyphicon glyphicon-triangle-right"></span></a>
        </div>

      </div>

    </div>

    <?php
    }
    ?>
</div>
<?php } ?>

<?php
$this->load->view("parts/footer");
?>
