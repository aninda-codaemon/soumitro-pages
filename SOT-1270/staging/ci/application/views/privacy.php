<?php

$info["h1"] = "Privacy Policy";
$info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "Privacy Policy | Public Records";
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

//$SEO_FILE_NAME = 'seo-people-door.txt';
//$SEO_FILE_URL = 'https://www.beenverified.com/seo/seo-people-door-copy/';
//$SEO_FILE = get_content(__DIR__.'/temp/'.$SEO_FILE_NAME,$SEO_FILE_URL,3,'format_seotext',array('file'=>$SEO_FILE_NAME));

$this->load->view("parts/header", $info);
// $this->load->view("parts/breadcrumbs", $info);
?>

      <section class="more-detail">
        <div class="container">
          <div class="row text-center">
            <div class="col-xs-12">
              <div id="terms_pp">
<h4 id="updated_at">
      This Privacy Policy was last updated on 08/04/2015
    </h4>
    <h3>
      Privacy Policy
    </h3>
    <p>
      Thank you for visiting the website located at <a href="https://public-records.net">public-records.net</a>, for downloading the BeenVerified Background Check App, or for visiting another BeenVerified website or downloading another BeenVerified mobile application that links to and utilizes this Privacy Policy (all platforms collectively referred to as the "Site"). The Site is a web-based property of BeenVerified, Inc. ("BeenVerified," "we," “our,” or "us") that enables end-user visitors to the Site (“Visitors”) to conduct searches of our databases of publicly available sources of information about individuals. This Privacy Policy describes the ways in which BeenVerified collects, uses, and discloses information about you when you access the Site. By accessing, viewing, downloading, or otherwise using the Site, you consent to the collection, use, and disclosure of your information as set forth in this Privacy Policy, now and as amended or modified by us.
    </p>
    <p>
      BeenVerified also provides a quick and easy process to allow individuals to remove their information from our People Search results, whether or not they are a user of the Site. If you would like to opt out of our People Search results, <a href="/contact/">contact our customer service</a>.
    </p>
    <h3>
      Information Collected by BeenVerified
    </h3>
    <p>
      BeenVerified is a database of publicly available sources of information aggregated for your convenience. Through BeenVerified, Visitors can access certain materials posted to or made available through the Site as compiled, distributed, and displayed by BeenVerified and other third-party content providers (“Third-Party Providers”) including, but not limited to, third-party websites or services that provide information about individuals (each, a “Search Subject”) that can be searched for and accessed through the Site (“BeenVerified Checks”).
    </p>
    <p>
      BeenVerified gathers three types of information: information that you submit to us, information that is collected automatically about your usage of the Site, and information about Search Subjects.
    </p>
    <h3>
      Information You Submit to BeenVerified
    </h3>
    <p>
      We collect information that you provide when you use the Site, including, but not limited to, when you submit an online application to become a BeenVerified member (“Member”), which enables you to utilize a host of services made available to Members by and through the Site (“Member Services”); when you submit a request to opt out of BeenVerified’s People Search results; when you conduct a BeenVerified Check; or when you contact us with a question, comment, or request. This can include, but is not limited to, your: (a) e-mail address; (b) full name; (c) company name; (d) date of birth; (e) password; (f) mailing address; (g) credit card information; and (h) information associated with a Search Subject (such as a name, age, or address) that you use to conduct a BeenVerified Check.
    </p>
    <h3>
      Information Collected Automatically About Your Usage of the Site
    </h3>
    <p>
     As is true of most web sites, we gather certain information automatically and store it in log files.  This information may include internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, operating system, date/time stamp, and/or clickstream data. We may combine this automatically collected log information with other information we collect about you. We do this [to improve services we offer you, to improve marketing, analytics, or site functionality. </p>
   <p>
      When you visit the Site, we or our third-party service providers may use a "Cookie" – a small, text-only file that we save to your hard drive – or similar technologies to automatically collect and store non-personally-identifiable information about your usage of the Site such as your IP address, your browser type, the links and items you click on, ad impressions on your web browser, and the web pages you visit. Cookies enhance your experience at the Site, and are in many instances necessary for the provision of Member Services. For example, we use Cookies to store your password so you don’t have to enter it more than once, and to recognize you if you return to the Site using the same web browser.
    </p>
    <p>
      If you do not want the Site to collect this information through Cookies, you may set your web browser to reject Cookies from the Site, or to inform you when a Cookie has been sent to your computer and provide you with the opportunity to refuse that Cookie. Each web browser is different, so please check your browser’s “Help” menu to learn how to change your Cookie preferences. Please be advised that where you disable or reject Cookies, you may not be able to use the Member Services or experience the full functionality of the Site.
    </p>
    <p>
      Technologies such as: cookies, beacons, tags and scripts are used by BeenVerified and our partners (such as marketing partners, data partners, analytics, financial, testing, optimization, and others), affiliates, or analytics or service providers (such as data providers, customer support, marketing, analytics, business development, affiliate, and other). These technologies are used in analyzing trends, administering the site, tracking users’ movements around the site and to gather demographic information about our user base as a whole. We may receive reports based on the use of these technologies by these companies on an individual as well as aggregated basis. </p>
    <p>
      When you download and use the BeenVerified Background Check App, we also may collect your mobile device’s unique identification number. We will not collect any precise geolocation information from you or your mobile device unless you expressly consent to such collection.
    </p>
    <p>
      Third parties with whom we partner to provide certain features on our site or to display advertising based upon your Web browsing activity use LSOs such as HTML 5 or Flash to collect and store information. Various browsers may offer their own management tools for removing HTML5 LSOs. To manage Flash LSOs please <a href="http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html">click here</a>.
    </p>
    <h3>Behavioral Targeting / Re-Targeting </h3>
    <p>
      We partner with a third party ad network to either display advertising on our Web site or to manage our advertising on other sites.  Our ad network partner uses cookies and Web beacons to collect non-personal information about your activities on this and other Web sites to provide you targeted advertising based upon your interests.  If you wish to not have this information used for the purpose of serving you targeted ads, you may opt-out by clicking <a href="http://www.networkadvertising.org/managing/opt_out.asp">here</a>.  Please note this does not opt you out of being served advertising.  You will continue to receive generic ads.
    </p>
    <h3>
      Information About Search Subjects
    </h3>
    <p>
      In connection with providing the BeenVerified Checks, we collect information about Search Subjects from our third-party data providers.
    </p>
    <h3>
      Use of Information Collected by BeenVerified
    </h3>
    <p>
      We use the information that we collect from you for a number of purposes, including:
    </p>
    <ul>
      <li>to provide you with products, services, or information you request, such as BeenVerified Checks and other Member Services;
      </li>
      <li>to process, or in connection with, any payments or transactions that you authorize;
      </li>
      <li>to verify that any credit card you submit is valid and active by charging, and thereafter immediately crediting, a small sum to the card upon registration;
      </li>
      <li>to send you service-related communications to verify and manage your Member account, about the Site, about the services you request, or containing required notices (where you have indicated a preference, we will only communicate with you via the medium you select, such as by e-mail or telephone);
      </li>
      <li>to process your requests to opt out of BeenVerified’s People Search results and, if you choose to do so, to create and manage your BeenVerified Opt-Out account;
      </li>
      <li>to respond to your inquiries;
      </li>
      <li>to deliver marketing communications or promotional materials that may be of interest to you, subject to other terms of this Privacy Policy;
      </li>
      <li>to generate and analyze statistics about your use of the Site (e.g., to determine the demographics of our Visitors);
      </li>
      <li>for internal business purposes (e.g., to analyze and manage our business, to allow us to better tailor the Site to our Visitors’ needs);
      </li>
      <li>to customize your experience on the Site; and
      </li>
      <li>to detect and protect against fraud, infringement, or other violations of our Terms of Service.
      </li>
    </ul>
    <p>
      We also may aggregate, anonymize, or merge any of the information we collect through the Site or elsewhere for these purposes, except as expressly stated otherwise in this Privacy Policy. This may include linking your Member account information with information collect through Cookies for purposes such as identifying what areas of the Site are most relevant to you and allowing us to better tailor the Site and our communications to your interests.
    </p>
    <p>
      When you submit a request to opt out of BeenVerified’s People Search results, we require that you provide an email address. BeenVerified only uses this email address to (i) send you an email to verify your request to opt out, (ii) communicate with you about questions you may ask concerning your opt-out status, and (iii) if you choose, to create a BeenVerified Opt-Out account to review the record(s) you have opted out on an ongoing basis. We will not sell the email address that you provide as part of the opt-out process, or use it for any other purpose, without your prior consent.
    </p>
    <p>
      BeenVerified uses data about Search Subjects to provide responses to BeenVerified Checks performed through the Site.
    </p>
    <h3>
      Sharing of Information Collected by the Site
    </h3>
    <p>
      We may share the information we collect from you with third parties for the following purposes:
    </p>
    <ul>
      <li>with affiliates and service providers who work on our behalf including, but not limited to: credit card processing companies to process your payments for goods and services and to verify that your credit card account is valid and active; e-mail service providers to send out e-mails on our behalf; sales partners to sell you our services; data partners to process data on our behalf (e.g., by removing duplicate information from user lists, by analyzing data); and marketing partners who may market our products to you on our behalf and provide analysis of such marketing efforts. These affiliates and service providers will have access to your information as needed to perform their functions on our behalf but we do not permit them to use your information for other purposes. In addition, apart from the circumstances described above, we will not share your credit card information with any third parties without your prior informed consent, although notwithstanding the foregoing, we reserve the right to share with third parties the fact that we have credit card information about you on file;
      </li>
      <li>in connection with providing the BeenVerified Checks, with certain third-party companies (such as data partners) for the sole and exclusive purpose of verifying information applicable to the particular Search Subject. These third-party companies shall be subject to an obligation of confidentiality regarding such information, and shall not themselves store, save, or transfer such information other than as necessary to perform the applicable verification services. We will not share the information of the Search Subjects for any other purpose;
      </li>
      <li>other than Sensitive Information (defined as a credit card number, financial account number, Social Security number, driver’s license number, or credit score), with any third party to send you selected marketing offers. These businesses and third parties may include, but are not limited to: (a) providers of direct marketing services and applications, including lookup and reference, data enhancement, suppression, and validation vendors; (b) e-mail marketers; (c) telemarketers (where permitted by applicable law); (d) text-message-based marketers (where permitted by applicable law); (e) direct marketers; and (f) online advertising networks. While BeenVerified strongly encourages these third parties to adopt responsible approaches to online marketing, BeenVerified is not responsible for their information practices, which are governed by their respective privacy policies, which may differ from this Privacy Policy;
      </li>
      <li>to any acquiring entity in connection with any sale, merger, consolidation, change in control, transfer of substantial assets, reorganization, or liquidation of BeenVerified;
      </li>
      <li>to respond to a subpoena, court order, or legal process served on us or otherwise to comply with the law;
      </li>
      <li>when we believe that disclosure is necessary to protect the rights of BeenVerified, its parents, subsidiaries, affiliates, joint ventures, or third-party service providers, and each of their respective members, officers, directors, employees, agents, shareholders, co-branders, content licensors, suppliers, contractors, attorneys, and other partners, such as to enforce or apply this Privacy Policy, the Terms and Conditions, and other applicable BeenVerified agreements and policies; and
      </li>
      <li>to protect the rights, property, or safety of you or others (e.g., by exchanging information with other companies and organizations for fraud protection purposes, by providing information to law enforcement where we believe the Site is being or has been used to commit unlawful acts).
      </li>
    </ul>
    <p>
      We do not share precise geolocation information (such as collected from your mobile device) with third parties unless you expressly consent to such sharing.
    </p>
    <p>
      In addition, we may share aggregate reports comprised of the demographic, usage, and/or other characteristics of our Visitors as a group, which will never identify you personally, with third parties.
    </p>
    <h3>
      Correcting, Updating, or Removing Member Information
    </h3>
    <p>
      If the information you submit to us changes, or if you no longer desire our services, you may correct, update, or request deletion of this information by making the change on your member information page or by contacting us at the contact information listed below.
    </p>
    <h3>
      Data Retention
    </h3>
    <p>
      We will retain the information that we have collected about you until you have requested deletion of the information. If you wish to cancel your Member account or BeenVerified Opt-Out account or request that we no longer use your information to provide you with services, please contact us at <a href="mailto:privacy@public-records.net?subject=Public-Records.net Support">privacy@public-records.net</a>. However, we may retain some or all of your information after you request deletion or cancelation, as necessary, to comply with our legal obligations, resolve disputes, and enforce our agreements.
    </p>
    <h3>
      Changes to Our Privacy Policy
    </h3>
    <p>
      BeenVerified may amend or modify this Privacy Policy, in whole or in part, from time to time in its sole discretion, effective immediately upon prominently posting a link to those changes on our Site's homepage or directly communicating them to you. If we make material changes to this Privacy Policy, we will notify you here, at the e-mail address associated with your Member or BeenVerified Opt-Out account, or by means of a notice on our home page prior to the change becoming effective. Your continued use of or access to the Site or any Member Services after any posted amendment or modification to this Privacy Policy or receipt of a Privacy Policy change notification e-mail constitutes an affirmative acknowledgment and acceptance by you of the amended or modified Privacy Policy.
    </p>
    <h3>
      Security
    </h3>
    <p>
      We endeavor to keep all information that we collect from or about you protected both online and off-line. Unfortunately, no data security system or transmission over the Internet is guaranteed to be 100% secure. As a result, while we strive to protect your personal information, we cannot ensure or warrant the security of any information that you transmit to us, and you do so at your own risk.
    </p>
    <h3>
      Marketing Opt-out
    </h3>
    <p>
      Where you receive marketing e-mails sent by us or one of our third-party advertisers, you may unsubscribe from receiving such marketing e-mails at any time by following the instructions contained at the end of the e-mail. We may maintain separate e-mail lists for different purposes, so you may need to unsubscribe from multiple lists. However, even where you unsubscribe from all of our and our third-party advertisers’ lists, you may receive marketing e-mails in the future if you opt in to a different e-mail marketing program, although you can always unsubscribe from such programs as well by following the instructions contained at the end of the any e-mail you receive.
    </p>
    <p>
      Information sent on behalf of third-party advertisers is prepared several days in advance, so you may continue to receive e-mail from us or our third-party advertisers for up to ten (10) days after submitting an unsubscribe request as detailed above.
    </p>
    <h3>
      Links
    </h3>
    <p>
      The Site contains links to other websites on the Internet that are owned and operated by third parties. In some instances, these websites are co-branded and the third parties are entitled to use BeenVerified’s name and logo on their websites. Please be aware that BeenVerified is not responsible for the data practices of such websites, which shall be subject to those websites’ privacy policies. We encourage you to be aware when you leave the Site and to read the privacy policy of each and every website that you link to from the Site. This Privacy Policy applies solely to information collected by the Site.
    </p>
    <h3>
      Blog
    </h3>
    <p>
      Our Site offers publicly accessible blogs. You should be aware that any information you provide in these areas may be read, collected, and used by others who access them. In order to post comments within the blog area of our Site you must be a member of our service provider’s site. Our service provider will then allow us to view the comments before they are posted. To request removal of your personal information from our blog, contact us at <a href="mailto:privacy@public-records.net?subject=Public-Records.net Support">privacy@public-records.net</a>. In some cases, we may not be able to remove your personal information, in which case we will let you know if we are unable to do so and why.
    </p>
  <h3>Social Media Widgets </h3>
  <p>
    Our Web site includes Social Media Widgets, such as the Share this button or interactive mini-programs that run on our site. These Features may collect your IP address, which page you are visiting on our site, and may set a cookie to enable the Feature to function properly. Social Media Features and Widgets are either hosted by a third party or hosted directly on our Site. Your interactions with these Features are governed by the privacy policy of the company providing it.
</p>
    <h3>
      Children's Privacy
    </h3>
    <p>
      BeenVerified is very sensitive to the issue of children's privacy. The Site, as well as its products and services, are not developed for or directed at children. Visitors under eighteen (18) years of age are not eligible to use the Site and we do not knowingly solicit or collect personal information from any Visitor that we actually know is under the age of eighteen (18). BeenVerified encourages parents and guardians to spend time online with their children and to participate and monitor the interactive activities of their children. If you believe that your child has provided BeenVerified with any personal information without your consent, please e-mail us at <a href="mailto:privacy@public-records.net?subject=Public-Records.net Support">privacy@public-records.net</a>.
    </p>
    <h3>
      Contacting the Site
    </h3>
    <p>
      If you have any questions about this Privacy Policy, the data practices of the Site, or your dealings with the Site, please feel free to contact us at 1-234-978-2542, at <a href="mailto:privacy@public-records.net?subject=Public-Records.net Support">privacy@public-records.net</a>, or at:
    </p>
    <p>
      BeenVerified.com<br>
      307 5th Avenue - 16th Floor<br>
      New York, NY 10016<br>
    </p>
  <p>All communications with us or our authorized agents may be monitored or recorded.</p>
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