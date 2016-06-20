<?php

// h1
$info["h1"] = "".p($name["fn"])." ".p($name["ln"]).", ".spc(ul($state))."";
if (is_null($state)) {
    $info["h1"] = "Find ".p($name["fn"] ." ". $name["mn"] ." ". $name["ln"])."";
}
if (isset($city)) {
    $info["h1"] = p($name["fn"] ." ". $name["ln"]) . ", " . ul($city) . ", " . spc(ul($state));
}

// title
$info["title"] = "".p($name["fn"])." ".p($name["ln"])." in ".ul($state)."";
if (is_null($state)) {
    $info["title"] = p($name["fn"]." ".$name["mn"]." ".$name["ln"]);
}
if (isset($city)) {
    $info["title"] = p($name["fn"]." ".$name["ln"])." in ".ul($city).", ".spc(ul($state));
}

// description
$info["description"] = "Find ".p($name["fn"])." ".p($name["ln"])." in ".ul($state)." at BeenVerified.com, your people search and background check answer.";
if (is_null($state)) {
    $info["description"] = "Find ".p($name["fn"]." ".$name["mn"]." ".$name["ln"])." at BeenVerified.com, your people search and background check answer.";
}
if (isset($city)) {
    $info["description"] = "Find ".p($name["fn"]." ".$name["ln"])." in ".ul($city).", ".spc(ul($state)). " at BeenVerified.com, your people search and background check answer.";
}

$info["breadcrumbs"] = $breadcrumbs;

/*////////////////////////////////////////////////
//                                              //
//                   header                     //
//                                              //
////////////////////////////////////////////////*/
$this->load->view("parts/header", $info);
$this->load->view("parts/breadcrumbs", $info);
?>

<!--
//////////////////////////////////////////////////
//                                              //
//                 breadcrumb                   //
//                                              //
//////////////////////////////////////////////////
-->

<!--
//////////////////////////////////////////////////
//                                              //
//                main content                  //
//                                              //
//////////////////////////////////////////////////
-->
<section id="info-body" itemscope itemtype="http://schema.org/Person">
    <div id="info-body-person" class="container no-bottom">
      <p>
        <strong>Find 
			<span itemprop="name">
				<strong>
					<span itemprop="givenName">
					<!-- begin include -->
					<?php 
					echo p($name["fn"]);
					?>
					<!-- end include -->
					</span>
					<span itemprop="familyName">
					<!-- begin include -->
					<?php 
					echo p($name["ln"]);
					?>
					<!-- end include -->
					</span>
				</strong>
				in 
			</span>
			<span>
			<!-- begin include -->
			<?php 
			echo ul($state);
			?>
			<!-- end include -->
			</span>
        </strong>
      </p>
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
                        	<!-- begin include -->
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
                                                    if (isset($person["streetaddress1"]) and (isset($person["city1"]) or isset($person["state1"]))) {
                                                        echo ", ";
                                                    }
                                                    echo p($person["city1"]);
                                                    if (isset($person["city1"]) and isset($person["state1"])) {
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
                                                    if (isset($person["streetaddress2"]) and (isset($person["city2"]) or isset($person["state2"]))) {
                                                        echo ", ";
                                                    }
                                                    echo p($person["city2"]);
                                                    if (isset($person["city2"]) and isset($person["state2"])) {
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
                                                    if (isset($person["streetaddress3"]) and (isset($person["city3"]) or isset($person["state3"]))) {
                                                        echo ", ";
                                                    }
                                                    echo p($person["city3"]);
                                                    if (isset($person["city3"]) and isset($person["state3"])) {
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
                        <!--<iframe id="iframe-goes-here" src="//www.beenverified.com/search-results-simple?fn=John&ln=Doe">
                        </iframe>-->
                    </div>
                </div>
                <div id="signup-form" class="margin-bottom-20">
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
                <div class="row">
                    <div class="col-md-12">
                        <p>
                            <strong>Browse All 
                            <span><?php echo p($state); ?></span>
                            <span itemprop="name">
                                <strong>
                                <span itemprop="givenName">
                                	<!-- begin include -->
                                	<?php 
                                	echo p($name["fn"]);
                                	?>
                                	<!-- end include -->
                                </span>
                                <span itemprop="familyName">
                                	<!-- begin include -->
                                	<?php 
                                	echo p($name["ln"]);
                                	?>
                                	<!-- end include -->
                                </span>
                                </strong>
                            </span>
                            <span>Profiles</span>
                            </strong>
                        </p>
                        <ul>
	                        <!-- begin include -->
							<?php
							foreach ($buckets as $bucket) {
							?>
							<li>
                                <a href="<?php echo $bucket["url"]; ?>">
                                    <?php 
                                    echo p($bucket["lowfirst"]) . " " . p($bucket["lowmiddle"]) . " " . p($bucket["lowlast"]);
                                    if ((!empty($bucket["lowfirst"]) or !empty($bucket["lowmiddle"]) or !empty($bucket["lowlast"])) and (!empty($bucket["lowstreet"]) or !empty($bucket["lowstcity"]) or !empty($bucket["lowstate"]))) {
                                        echo ", ";
                                    }
                                    echo p($bucket["lowstreet"]);
                                    if (!empty($bucket["lowstreet"]) and (!empty($bucket["lowstate"]) or !empty($bucket["lowstate"]))) {
                                        echo ", ";
                                    }
                                    echo p($bucket["lowcity"]);
                                    if (!empty($bucket["lowcity"]) and !empty($bucket["lowstate"])) {
                                        echo ", ";
                                    }
                                    echo $bucket["lowstate"] . " - " . p($bucket["highfirst"]) . " " . p($bucket["highmiddle"]). " " . p($bucket["highlast"]);
                                    if ((!empty($bucket["highfirst"]) or !empty($bucket["highmiddle"]) or !empty($bucket["highlast"])) and (!empty($bucket["highstreet"]) or !empty($bucket["highstcity"]) or !empty($bucket["highstate"]))) {
                                        echo ", ";
                                    }
                                    echo p($bucket["highstreet"]);
                                    if (!empty($bucket["highstreet"]) and (!empty($bucket["highstate"]) or !empty($bucket["highstate"]))) {
                                        echo  ", ";
                                    }
                                    echo p($bucket["highcity"]);
                                    if (!empty($bucket["highcity"]) and !empty($bucket["highstate"])) {
                                        echo ", ";
                                    }
                                    echo $bucket["highstate"]; 
                                    ?>
                                </a>
                            </li>
							<?php
							}
							?>
							<!-- end include -->
						</ul>
                    </div>
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

<ul>
<?php
foreach ($buckets as $bucket) {
?>
<li><a href="<?php echo $bucket["url"]; ?>"><?php echo $bucket["lowid"] . " - " . $bucket["highid"] . " " . $bucket["firstname1"]; ?></a> - <?php var_dump($bucket); ?></li>
<?php
}
?>
</ul>  
-->
