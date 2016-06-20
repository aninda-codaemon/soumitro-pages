<?php

$info["h1"] = "Frequently Asked Questions";
$info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "FAQs | Public Records";
$info["description"] = "Public Records's people finder has contact information and public records for more than 90% US adults.";
$info["breadcrumbs"] = $breadcrumbs;
$info["canonical"] = current_url() . "/";

$docWebPage = (object)array(
  "@context" => "http://schema.org",
  "@type" => "WebPage",
  "specialty" => "Public Records"
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

$info["jsonld"] = json_encode($jsonld, JSON_PRETTY_PRINT);

$this->load->view("parts/header", $info);
// $this->load->view("parts/breadcrumbs", $info);
?>

      <section class="more-detail">
        <div class="container">
          <div class="row text-center">
            <div class="col-xs-12">
              <div>
                <p>
                <br>
                A privacy-friendly public record search engine doesn't need to be an oxymoron. Whether you&#39;re concerned about the information you provide to BeenVerifeid or searches you conduct, or you&#39;re curious about what public information on yourself might turn up, BeenVerified always respects your privacy. BeenVerified&#39;s full privacy practices are contained in our <a href="/privacy/">privacy policy</a>, but this FAQ will give you an idea of how we treat your information.  If this FAQ does not answer all of your questions, please feel free to contact us at <a href="mailto:privacy@public-records.net?subject=Public-Records.net Support">privacy@public-records.net.</a>
                </p>
              </div>
              <div class="content-single content-second">
                <p class="h4"><strong>How Does BeenVerified Use Information it Collects When I Sign Up?</strong></p>
                <p>BeenVerified uses the information you submit during the registration process to manage your relationship with BeenVerified. For example, we use your email address to provide you with information about your BeenVerified account, product updates, and general information about BeenVerified. We do not, under any circumstances, use your account information as part of our search results nor do we sell your information to third party providers of public record information.</p>

                <br>
                <p class="h4"><strong>What Can I Use BeenVerified For?</strong></p>
                <p>There are countless ways you can use BeenVerified. This includes checking out people you meet on online dating websites, trying to locate old friends, and learning more about those in you or your family members' lives. You can also use BeenVerified to see what information is out there on yourself. You can use BeenVerified to find out who called your phone, to research property, or find a person&#39;s public social networking profiles.</p>
                <p>What you can&#39;t do is use BeenVerified to determine a person&#39;s eligibility or suitability for employment, insurance, credit, loans, education, housing, or other similar purposes.  Using BeenVerified information in these ways violates both our <a href="/terms/">Terms of Use</a> and the law, and can lead to possible criminal penalties.  We take this very seriously, and reserve the right to terminate user accounts and/or report violators to law enforcement as appropriate.</p>
                <p>We encourage you to review our complete <a href="/terms/">Terms of Use</a>, which provide the final say on how you can use information from BeenVerified, or to contact us at <a href="mailto:privacy@public-records.net?subject=Public-Records.net Support">privacy@public-records.net</a>.</p>

                <br>
                <p class="h4"><strong>Need to Opt-Out? We Make it Easy</strong></p>
                <p>If you see your information in our people search results, and don&#39;t want it to show up any more, no problem.  BeenVerified offers you the ability to remove this information from our people search results by contacting our <a href="/contact/">customer support</a>. Sometimes, however, different information about you might appear because it can&#39;t conclusively be associated with the information you previously opted out &ndash; you can opt out this information too.</p>

                <br>
                <p class="h4"><strong>Can I Search People from Other Countries?</strong></p>
                <p>At this time BeenVerified does not offer the ability to search records pertaining to the international community. Our services only provide information on US-based people.</p>

                <br>
                <p class="h4"><strong>Is Anyone Notified I Am Searching for Them?</strong></p>
                <p>All of BeenVerified reports are confidential. The person you are searching for is not notified.</p>

                <br>
                <p class="h4"><strong>How do I cancel my account?</strong></p>
                <p>BeenVerified provides hassle-free cancellation. Simply call our customer service line anytime at 1-234-978-2542 and have your 9-digit membership ID handy.  If you need additional assistance, our support team is available on weekdays from 8:00AM to 9:00PM Eastern Time, and 12:00PM to 8:00 PM Eastern Time on weekends. If you are unable to reach us by phone, you can also email us with your 9-digit membership ID at <a href="mailto:support@public-records.net?subject=Public-Records.net Support">support@public-records.net</a>. You can find the membership ID in your Welcome New Member email, or in the Account Details section of your BeenVerified account.</p>

                <br>
                <p class="h4"><strong>Have Additional Questions?</strong></p>
                <p>Our support teams in NYC and Miami handle all email inquiries and would be happy to help you further. Email <a href="mailto:support@public-records.net?subject=Public-Records.net Support">support@public-records.net</a> or call <span class="text-primary">1-234-978-2542</span> during normal working hours. <a href="/contact/">Contact us.</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section class="want-more">
        <div class="container">
          <div class="row">
              <div class="col-xs-12 col-sm-9 col-md-9">We Have Info On The Entire United States...</div>
              <div class="col-xs-12 col-sm-3 col-md-3"><a class="btn btn-lg btn-success" href="/people/">Browse Database Now</a></div>
            </div>
        </div>
      </section>

      <?php
      $this->load->view("parts/footer");
      ?>
