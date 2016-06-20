<?php
$info["h1"] = "Browse Names in ".ul($state)." from ".p($lowfirst)." ".p($lowlast)." to ".p($highfirst)." ".p($highlast)."";
$info["title"] = "Names in ".ul($state)." from ".p($lowfirst)." ".p($lowlast)." to ".p($highfirst)." ".p($highlast)." at BeenVerified.com";
$info["description"] = "Browse ".ul($state)." profiles from ".p($lowfirst)." ".p($lowlast)." to ".p($highfirst)." ".p($highlast)." at BeenVerified.com, your people search and background check answer.";
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
<section id="info-body">
    <div id="info-body-person" class="container no-bottom">
        <div class="row">
            <div class="col-sm-6 col-md-8">
                <div class="dir-wrap">
                    <p class=""><strong>Browse Profiles in <?php echo ul($state); ?> From <?php echo p($lowlast) . ", " . p($lowfirst) . " to " . p($highlast) . ", " . p($highfirst); ?></strong></p>
                    <div>
                        <ul class="row">
                            <!-- begin include -->
                            <?php
                            foreach ($buckets as $bucket) {
                            ?>
                                <li class="col-md-6"><a href="<?php echo "/" . $state . "/" . $bucket["x"] . "/". $bucket["y"]; ?>"><?php echo p($bucket["lowlast"]) . ", " . p($bucket["lowfirst"]) . " - " . p($bucket["highlast"]) . ", " . p($bucket["highfirst"]); ?></a></li>
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
<?php
$this->load->view("parts/footer");
?>
