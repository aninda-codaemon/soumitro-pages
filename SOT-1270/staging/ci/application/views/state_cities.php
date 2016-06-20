<?php
$info["h1"] = "Browse All Cities in ".ul($state)."";
$info["title"] = "All Cities in ".ul($state)."";
$info["description"] = " Browse all cities in ".ul($state)." at BeenVerified.com, your people search and background check answer.";
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
                    <p class=""><strong>Browse All Cities in <?php echo ul($state); ?></strong></p>
                    <div>
                        <ul class="row">
                            <!-- begin include -->
                            <?php
							foreach ($cities as $city) {
								$city["url"] = str_replace(" ", "-", str_replace("+", "-", $city["city"]));
							?>
							    <li class="col-md-3"><a href="<?php echo "/" . $state . "/" . $city["url"]; ?>"><?php echo p($city["city"]); ?></a></li>
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
