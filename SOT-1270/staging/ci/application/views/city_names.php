<?php
$info["h1"] = "Browse All Profiles In ".ul($city).", ".ul($state)."";
$info["title"] = "All Profiles In ".ul($city).", ".ul($state)."";
$info["description"] = "Browse all profiles in ".ul($city).", ".ul($state)." at BeenVerified.com, your people search and background check answer.";
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
                    <p class=""><strong>Browse <?php echo $min . " to " . $max; ?> Profiles in <?php echo ul($city); ?>, <?php echo p($state); ?> From <?php echo p($lowfirst) . " " . p($lowlast) . " to " . p($highfirst) . " " . p($highlast); ?></strong></p>
                    <div>
                        <ul class="row">
                            <!-- begin include -->
                            <?php
                            foreach ($buckets as $bucket) {
                            ?>
                            <li class="col-md-6"><a href="<?php echo "/" . $state . "/" . $city . "/" . $bucket["first"] . "-". $bucket["last"]; ?>"><?php echo p($bucket["first"]) . " " . p($bucket["last"]); ?></a></li>
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
        <div class="row">
            <div class="col-md-12">
                <ul class="pagination">
                    <!-- begin include pagination -->
                    <?php
                    if ($pages > 1) {
                    ?>
                    
                      <li<?php if ($page == 1) {?> class="active"<?php } ?>><a href="<?php echo "/" . $state . "/" . $city . "/profiles"; ?>">1</a></li>

                    <?php
                        for ($pageNo = 2; $pageNo <= $pages; $pageNo++) {
                    ?>
                            <li<?php if ($page == $pageNo) {?> class="active"<?php } ?>><a href="<?php echo "/" . $state . "/" . $city . "/" . $pageNo; ?>"><?php echo $pageNo; ?></a></li>
                    <?php
                        }
                    }
                    ?>
                    <!-- end include pagination -->
                </ul>
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
