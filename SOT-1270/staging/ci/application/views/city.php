<?php
$info["h1"] = "".ul($city).", ".ul($state)." People Search | BeenVerified.com";
$info["title"] = "".ul($city).", ".ul($state)." People Search | BeenVerified.com";
$info["description"] = "Find people in ".ul($city).", StateAbbrev at BeenVerified.com, your people search and background check answer.";
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
                    <p><strong>Find People in <?php echo ul($city) . ", " . ul($state); ?></strong></p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius vehicula quam in tincidunt. Praesent sodales dui vitae odio vestibulum, sit amet pulvinar sapien facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque et porta nulla, eget rhoncus mi. Etiam at porttitor mi, eu scelerisque sapien. Mauris ultricies diam at est eleifend, id laoreet nibh dignissim. Donec vel quam commodo, bibendum nunc quis, sollicitudin lectus. Pellentesque sodales libero magna, ac sodales purus fermentum euismod. Morbi sed auctor sem. In hac habitasse platea dictumst. Phasellus et erat dictum, posuere elit vel, pharetra purus. Duis vitae neque neque. Ut eu quam a orci pellentesque eleifend vel cursus metus. Phasellus mollis luctus rhoncus.</p>
                </div>
                <div class="dir-wrap">
                    <p class=""><strong>Most Popular Names in <?php echo ul($city) . ", " . ul($state); ?></strong> <a href="<?php echo "/" . $state . "/" . $city . "/"; ?>profiles">Browse All Profiles in <?php echo ul($city); ?>, <?php echo ul($state); ?></a></p>
                    <div>
                        <ul class="row">
                            <!-- begin include -->
                            <?php
                            foreach ($topnames as $topname) {
                            ?>
                            <li class="col-md-4"><a href="<?php echo "/" . $state . "/" . $city . "/" . $topname["first"] . "-" . $topname["last"]; ?>"><?php echo p($topname["first"]) . " " . p($topname["last"]) . " - " . p($topname["personcount"]); ?></a></li>
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
                <div class="dir-wrap">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius vehicula quam in tincidunt. Praesent sodales dui vitae odio vestibulum, sit amet pulvinar sapien facilisis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque et porta nulla, eget rhoncus mi. Etiam at porttitor mi, eu scelerisque sapien. Mauris ultricies diam at est eleifend, id laoreet nibh dignissim. Donec vel quam commodo, bibendum nunc quis, sollicitudin lectus. Pellentesque sodales libero magna, ac sodales purus fermentum euismod. Morbi sed auctor sem. In hac habitasse platea dictumst. Phasellus et erat dictum, posuere elit vel, pharetra purus. Duis vitae neque neque. Ut eu quam a orci pellentesque eleifend vel cursus metus. Phasellus mollis luctus rhoncus.</p>
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
