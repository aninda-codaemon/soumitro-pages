<?php
// h1
$info["h1"] = "Browse Profiles from " . p($people[0]["firstname1"]) . " " . p($people[0]["middlename1"]) . " " . p($people[0]["lastname1"]);
if ((!empty($people[0]["firstname1"]) or !empty($people[0]["middlename1"]) or !empty($people[0]["lastname1"])) and (!empty($people[0]["streetaddress1"]) or !empty($people[0]["city1"]) or !empty($people[0]["state1"]))) {
    $info["h1"] .= ", of ";
}
$info["h1"] .= p($people[0]["streetaddress1"]);
if (!empty($people[0]["streetaddress1"]) and (!empty($people[0]["city1"]) or !empty($people[0]["state1"]))) {
    $info["h1"] .= ", ";
}
$info["h1"] .= ul($people[0]["city1"]);
if (!empty($people[0]["city1"]) and !empty($people[0]["state1"])) {
    $info["h1"] .= ", ";
}
$info["h1"] .= $people[0]["state1"] . " to " . p($people[(count($people)-1)]["firstname1"] . " " . $people[(count($people)-1)]["middlename1"] . " " . $people[(count($people)-1)]["lastname1"]);
if ((!empty($people[(count($people)-1)]["firstname1"]) or !empty($people[(count($people)-1)]["middlename1"]) or !empty($people[(count($people)-1)]["lastname1"])) and (!empty($people[(count($people)-1)]["streetaddress1"]) or !empty($people[(count($people)-1)]["city1"]) or !empty($people[(count($people)-1)]["state1"]))) {
    $info["h1"] .= ", of ";
}
$info["h1"] .= p($people[(count($people)-1)]["streetaddress1"]);
if (!empty($people[(count($people)-1)]["streetaddress1"]) and (!empty($people[(count($people)-1)]["city1"]) or !empty($people[(count($people)-1)]["state1"]))) {
    $info["h1"] .= ", ";
}
$info["h1"] .= p($people[(count($people)-1)]["city1"]);
if (!empty($people[(count($people)-1)]["city1"]) and !empty($people[(count($people)-1)]["state1"])) {
    $info["h1"] .= ", ";
}
$info["h1"] .= $people[(count($people)-1)]["state1"];

// h1 (city)
if (!empty($city) and !empty($state)) {
    $info["h1"] = "Browse " . p($people[0]["firstname1"] . " " . $people[0]["lastname1"]) . " Profiles in " . ul($city) . ", " . spc(ul($state)) . " from " . p($people[0]["firstname1"] . " " . $people[0]["middlename1"] . " " . $people[0]["lastname1"]);
    if ((!empty($people[0]["firstname1"]) or !empty($people[0]["middlename1"]) or !empty($people[0]["lastname1"])) and !empty($people[0]["streetaddress1"])) {
        $info["h1"] .= ", of ";
    }
    $info["h1"] .= p($people[0]["streetaddress1"]) . " to " . p($people[(count($people)-1)]["firstname1"] . " " . $people[(count($people)-1)]["middlename1"] . " " . $people[(count($people)-1)]["lastname1"]);
    if ((!empty($people[(count($people)-1)]["firstname1"]) or !empty($people[(count($people)-1)]["middlename1"]) or !empty($people[(count($people)-1)]["lastname1"])) and !empty($people[(count($people)-1)]["streetaddress1"])) {
        $info["h1"] .= ", of ";
    }
    $info["h1"] .= p($people[(count($people)-1)]["streetaddress1"]);
}

// h1 (state)
if (!empty($state) and is_null($city)) {
    $info["h1"] = "Browse " . p($people[0]["firstname1"] . " " . $people[0]["lastname1"]) . " Profiles in " . spc(ul($state)) . " from " . p($people[0]["firstname1"] . " " . $people[0]["middlename1"] . " " . $people[0]["lastname1"]);
    if ((!empty($people[0]["firstname1"]) or !empty($people[0]["middlename1"]) or !empty($people[0]["lastname1"])) and (!empty($people[0]["streetaddress1"]) or !empty($people[0]["city1"]))) {
        $info["h1"] .= ", of ";
    }
    $info["h1"] .= p($people[0]["streetaddress1"]);
    if (!empty($people[0]["streetaddress1"]) and !empty($people[0]["city1"])) {
        $info["h1"] .= ", ";
    }
    $info["h1"] .= ul($people[0]["city1"]) . " to " . p($people[(count($people)-1)]["firstname1"] . " " . $people[(count($people)-1)]["middlename1"] . " " . $people[(count($people)-1)]["lastname1"]);
    if ((!empty($people[(count($people)-1)]["firstname1"]) or !empty($people[(count($people)-1)]["middlename1"]) or !empty($people[(count($people)-1)]["lastname1"])) and (!empty($people[(count($people)-1)]["streetaddress1"]) or !empty($people[(count($people)-1)]["city1"]))) {
        $info["h1"] .= ", of ";
    }
    $info["h1"] .= p($people[(count($people)-1)]["streetaddress1"]);
    if (!empty($people[(count($people)-1)]["streetaddress1"]) and !empty($people[(count($people)-1)]["city1"])) {
        $info["h1"] .= ", ";
    }
    $info["h1"] .= ul($people[(count($people)-1)]["city1"]);
}

// title
$info["title"] = p($people[0]["firstname1"] . " " . $people[0]["middlename1"] . " " . $people[0]["lastname1"]);
if ((!empty($people[0]["firstname1"]) or !empty($people[0]["middlename1"]) or !empty($people[0]["lastname1"])) and (!empty($people[0]["streetaddress1"]) or !empty($people[0]["city1"]) or !empty($people[0]["state1"]))) {
    $info["title"] .= ", ";
}
$info["title"] .= p($people[0]["streetaddress1"]);
if (!empty($people[0]["streetaddress1"]) and (!empty($people[0]["city1"]) or !empty($people[0]["city1"]) or !empty($people[0]["state1"]))) {
    $info["title"] .= ", ";
}
$info["title"] .= ul($people[0]["city1"]);
if (!empty($people[0]["city1"]) and !empty($people[0]["state1"])) {
    $info["title"] .= ", ";
}
$info["title"] .=$people[0]["state1"] . " to " . p($people[(count($people)-1)]["firstname1"] . " " . $people[(count($people)-1)]["middlename1"] . " " . $people[(count($people)-1)]["lastname1"]);
if ((!empty($people[(count($people)-1)]["firstname1"]) or !empty($people[(count($people)-1)]["middlename1"]) or !empty($people[(count($people)-1)]["lastname1"])) and (!empty($people[(count($people)-1)]["streetaddress1"]) or !empty($people[(count($people)-1)]["city1"]) or !empty($people[(count($people)-1)]["state1"]))) {
    $info["title"] .= ", ";
}
$info["title"] .= p($people[(count($people)-1)]["streetaddress1"]);
if (!empty($people[(count($people)-1)]["streetaddress1"]) and (!empty($people[(count($people)-1)]["city1"]) or !empty($people[(count($people)-1)]["state1"]))) {
    $info["title"] .= ", ";
}
$info["title"] .= ul($people[(count($people)-1)]["city1"]);
if (!empty($people[(count($people)-1)]["city1"]) and !empty($people[(count($people)-1)]["state1"])) {
    $info["title"] .= ", ";
}
$info["title"] .= $people[(count($people)-1)]["state1"] . " at BeenVerified.com ";


// description
$info["description"] = "Browse " . p($people[0]["firstname1"] . " " . $people[0]["lastname1"] . " profiles from " . $people[0]["firstname1"] . " " . $people[0]["middlename1"] . " " . $people[0]["lastname1"]);
if ((!empty($people[0]["firstname1"]) or !empty($people[0]["middlename1"]) or !empty($people[0]["lastname1"])) and (!empty($people[0]["streetaddress1"]) or !empty($people[0]["city1"]) or !empty($people[0]["state1"])))  {
    $info["description"] .= ", ";
}
$info["description"] .= p($people[0]["streetaddress1"]);
if (!empty($people[0]["streetaddress1"]) and (!empty($people[0]["city1"]) or !empty($people[0]["state1"]))) {
    $info["description"] .= ", ";
}
$info["description"] .= $people[0]["state1"] . " to " . p($people[(count($people)-1)]["firstname1"]) . " " . p($people[(count($people)-1)]["middlename1"]) . " " . p($people[(count($people)-1)]["lastname1"]);
if ((!empty($people[(count($people)-1)]["firstname1"]) or !empty($people[(count($people)-1)]["middlename1"]) or !empty($people[(count($people)-1)]["lastname1"])) and (!empty($people[0]["state1"]) or !empty($people[(count($people)-1)]["streetaddress1"]) or !empty($people[(count($people)-1)]["city1"]))) {
    $info["description"] .= ", ";
}
$info["description"] .= p($people[(count($people)-1)]["streetaddress1"]);
if (!empty($people[(count($people)-1)]["streetaddress1"]) and (!empty($people[(count($people)-1)]["city1"]) or !empty($people[(count($people)-1)]["state1"]))) {
    $info["description"] .= ", ";
}
$info["description"] .= p($people[(count($people)-1)]["city1"]);
if (!empty($people[(count($people)-1)]["city1"]) and !empty($people[(count($people)-1)]["state1"])) {
    $info["description"] .= ", ";
}
$info["description"] .= $people[(count($people)-1)]["state1"] . " at BeenVerified.com, your people search and background check answer.";

// description (city)
if (!empty($state) and !empty($city)) {
    $info["description"] = "Browse " . p($people[0]["firstname1"] . " " . $people[0]["lastname1"]) . " profiles in " . ul($city) . ", " . spc(ul($state)) . " from " . p($people[0]["firstname1"] . " " . $people[0]["middlename1"] . " " . $people[0]["lastname1"]);
    if ((!empty($people[0]["firstname1"]) or !empty($people[0]["middlename1"]) or !empty($people[0]["lastname1"])) and !empty($people[0]["streetaddress1"])) {
        $info["description"] .= ", ";
    }
    $info["description"] .= p($people[0]["streetaddress1"]) . " to " . p($people[(count($people)-1)]["firstname1"] . " " . $people[(count($people)-1)]["middlename1"] . " " . $people[(count($people)-1)]["lastname1"]);
    if ((!empty($people[(count($people)-1)]["firstname1"]) or !empty($people[(count($people)-1)]["middlename1"]) or !empty($people[(count($people)-1)]["lastname1"])) and !empty($people[(count($people)-1)]["streetaddress1"])) {
        $info["description"] .= ", ";
    }
    $info["description"] .= p($people[(count($people)-1)]["streetaddress1"]) . " at BeenVerified.com, your people search and background check answer.";
}

// description (state)
if (!empty($state) and is_null($city)) {
    $info["description"] = "Browse " . p($people[0]["firstname1"] . " " . $people[0]["lastname1"]) . " profiles in " . ul($state) . " from " . p($people[0]["firstname1"] . " " . $people[0]["middlename1"] . " " . $people[0]["lastname1"]);
    if ((!empty($people[0]["firstname1"]) or !empty($people[0]["middlename1"]) or !empty($people[0]["lastname1"])) and (!empty($people[0]["streetaddress1"]) or !empty($people[0]["city1"]))) {
        $info["description"] .= ", ";
    }
    $info["description"] .= p($people[0]["streetaddress1"]);
    if (!empty($people[0]["streetaddress1"]) and !empty($people[0]["city1"])) {
        $info["description"] .= ", ";
    }
    $info["description"] .= ul($people[0]["city1"]) . " to " . p($people[(count($people)-1)]["firstname1"] . " " . $people[(count($people)-1)]["middlename1"] . " " . $people[(count($people)-1)]["lastname1"]);
    if ((!empty($people[(count($people)-1)]["firstname1"]) or !empty($people[(count($people)-1)]["middlename1"]) or !empty($people[(count($people)-1)]["lastname1"])) and (!empty($people[(count($people)-1)]["streetaddress1"]) or !empty($people[(count($people)-1)]["city1"]))) {
        $info["description"] .= ", ";
    }
    $info["description"] .= p($people[(count($people)-1)]["streetaddress1"]);
    if (!empty($people[(count($people)-1)]["streetaddress1"]) and !empty($people[(count($people)-1)]["city1"])) {
        $info["description"] .= ", ";
    }
    $info["description"] .= ul($people[(count($people)-1)]["city1"]) . " at BeenVerified.com, your people search and background check answer.";
}


$info["breadcrumbs"] = $breadcrumbs;

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
<section id="info-body" itemscope itemtype="http://schema.org/Person">
    <div id="info-body-person" class="container no-bottom">
        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-default">
                    <table class="person-list table table-bordered table-striped table-hover">
                        <thead>
                            <tr class="row-invert">
                                <th class="col-sm-4">Name</th>
                                <th class="col-sm-5">Known Location(s)</th>
                                <th class="col-sm-2">View</th>
                            </tr>
                        </thead>
                        <tbody>
                        	<!-- begin indlude -->
                        	<?php
							foreach ($people as $person) {
							?>
							<tr class="person-single">
                                <td>
                                    <a href="<?php echo "/" . $person["url"]; ?>" class="full-name"><?php echo p($person["firstname1"]) . " " . p($person["middlename1"]) . " " . p($person["lastname1"]); ?></a>
                                    <p>
                                        <?php
                                            if (!empty($person["age"]))  {
                                                echo "<strong>Age: </strong>" . $person["age"];
                                            }
                                        ?>
                                    </p>
                                </td>
                                <td>
                                    <ul class="known-loc">
                                    	<?php
					                    if (isset($person["streetaddress1"]) or isset($person["city1"]) or isset($person["state1"]))  {
					                    ?>
                                            <li>
                                                <?php
                                                    echo p($person["streetaddress1"]);
                                                    if (!empty($person["streetaddress1"]) and (!empty($person["city1"]) or !empty($person["state1"]))) {
                                                        echo ", ";
                                                    }
                                                    echo p($person["city1"]);
                                                    if (!empty($person["city1"]) and !empty($person["state1"])) {
                                                        echo ", ";
                                                    }
                                                    echo $person["state1"];
                                                ?>
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
                                                    echo $person["state1"];
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
                                </td>
                                <td>
                                    <a href="<?php echo "/" . $person["url"]; ?>" class="btn btn-success btn-success-pop btn-block tr-btn"><span class="hidden-xs">Get Record </span><span class="visible-xs glyphicon glyphicon-arrow-right"></span></a>
                                </td>
                            </tr>
							<?php
							}
							?>
							<!-- end include -->
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-md-6 hidden-xs hidden-sm">
                <div class="row">
                    <div class="col-md-12">
                        <iframe id="iframe-goes-here-full" class="margin-bottom-20" src="//www.beenverified.com/search-results-simple?fn=John&ln=Doe">
                        </iframe>
                    </div>
                </div>
                <div id="signup-form">
                    <p class="lead text-center">Create an Account to Save Your <span class="no-wrap">People Searches</span></p>
                    <form role="form">
                        <div class="form-group">
                            <label for="useremail" class="sr-only">Email:</label>
                            <input name="lead[email]" type="email" id="email" class="form-control" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label for="userfn" class="sr-only">First Name:</label>
                            <input name="lead[first_name]" type="text" id="userfn" class="form-control" placeholder="First Name">
                        </div>
                        <div class="form-group">
                            <label for="userfn" class="sr-only">Last Name:</label>
                            <input name="lead[last_name]" type="text" id="userln" class="form-control" placeholder="Last Name">
                        </div>
                        <div class="row">
                            <div class="col-sm-8 col-sm-offset-2">
                                <button type="submit" class="btn btn-block btn-success btn-success-pop">
                                Sign Up Now
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
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
<?php
$this->load->view("parts/footer");
?>

<!-- 
<ul>
<?php
foreach ($people as $person) {
?>
<li><a href="<?php echo "/" . $person["url"]; ?>"><?php echo $person["url"]; ?></a> - <?php var_dump($person); ?></li>
<?php
}
?>
</ul>
-->


