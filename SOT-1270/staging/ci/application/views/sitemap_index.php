<?php
echo "Start of View: " . (microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']);

// set php timezone since it's not set in php.ini
date_default_timezone_set('America/New_York');
// set sitemap base
$sitemap = new Sitemap('https://public-records.net/people');
// set output path for XML files
$sitemap->setPath(APPPATH . 'views/sitemaps/');

$lastMod = "2016-01-20";
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Sitemap Generator</title>
  </head>
  <body>

    <ul>
      <?php
      //foreach ($root["buckets"] as $bucket) {
        //$sitemap->addItem('/' . $bucket["x"] . "/", null, 'monthly', $lastMod);
      ?>

      <?php
      //}
      ?>
    </ul>

    <ul>

      <?php
      $name_count = 0;
      foreach ($allpeople as $person) {

        if ($person["prominent"] == 1) {
          $sitemap->addItem('/' . strtolower($person["firstname1"]) . '-' . strtolower($person["lastname1"]) . '/', null, 'monthly', $person["updated_at"]);
        } else  {
          $sitemap->addItem('/' . $person["url"] . '/', null, 'monthly', $person["updated_at"]);
        }

        $name_count++;
      ?>

      <?php
      }
      ?>

      <li>
        Names: <?php echo $name_count ?>
      </li>
    </ul>

  </body>
</html>

<?php
  // output the sitemaps
  $sitemap->createSitemapIndex('https://public-records.net/people/', $lastMod);

  echo "End of XML Sitemaps: " . (microtime(true) - $_SERVER['REQUEST_TIME_FLOAT']);
?>
