<div class="breadcrumb">
<?php foreach ($breadcrumbs as $breadcrumb) { ?>
  <div class="container">
    <?php foreach ($breadcrumb as $level) { ?>
      <?php if (!empty($level['url'])) { ?>
        <a href="<?php echo $level['url']; ?>">
      <?php } ?>
      <?php echo $level['title']; ?>
      <?php if (!empty($level['url'])) { ?>
        </a>
      <?php } ?>
      <?php if ($level !== end($breadcrumb)) { ?>

      <?php } else { ?>

      <?php } ?>
    <?php } ?>
  </div>
<?php } ?>
</div>
<!--
<?php //print_r($breadcrumbs); ?>
-->
