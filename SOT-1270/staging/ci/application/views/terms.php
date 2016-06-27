<?php

$info["h1"] = "Terms of Use";
$info["tagline"] = "See public records, phone numbers, addresses and more!";
$info["title"] = "Terms of Use | Public Records";
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

<div class="breadcrumb">
  <div class="container">
    <a href="/" class="logo">
      <img class="img-responsive" src="/people/assets/img/Logo.png" alt="Public Records" />
    </a>
  </div>
</div>

      <section class="more-detail">
        <div class="container">
          <div class="row text-center">
            <div class="col-xs-12">
              <div id="terms_pp">
    <h4 id="updated_at">
      These Terms and Conditions were last updated on 3/24/2015
    </h4>
    <h3>
      TERMS AND CONDITIONS
    </h3>
    <p>
      Thank you for visiting the website located at <a href="https://public-records.net">public-records.net</a>, for downloading the BeenVerified Background Check App, or for visiting another BeenVerified website or downloading another BeenVerified mobile application that links to and utilizes this <a href="/privacy/">Privacy Policy</a> (all platforms collectively referred to as the “Site”). The Site is a web-based property of BeenVerified, Inc. (“BeenVerified,” “we,” “our,” or “us”) that makes available services that allow users to search for information as permitted by these Terms and Conditions, such as to learn what information is in their own public records, to reconnect with long-lost friends or relatives, or to learn about the backgrounds of potential roommates, online dates, kid’s coaches, or online buyers or sellers.
    </p>
    <p>
      BEENVERIFIED DOES NOT PROVIDE PRIVATE INVESTIGATOR SERVICES, AND IS NOT A CONSUMER REPORTING AGENCY AS DEFINED BY THE FAIR CREDIT REPORTING ACT (“FCRA”) BECAUSE THE INFORMATION PROVIDED BY BEENVERIFIED IS NOT COLLECTED OR PROVIDED, IN WHOLE OR IN PART, FOR THE PURPOSE OF SERVING AS A FACTOR IN ESTABLISHING A PERSON’S ELIGIBILITY FOR (a) CREDIT OR INSURANCE TO BE USED PRIMARILY FOR PERSONAL, FAMILY, OR HOUSEHOLD PURPOSES; (b) EMPLOYMENT PURPOSES; OR (c) IN CONNECTION WITH A BUSINESS TRANSACTION INITIATED BY AN INDIVIDUAL CONSUMER FOR PERSONAL, FAMILY, OR HOUSEHOLD PURPOSES. BEENVERIFIED DOES NOT MAKE ANY REPRESENTATION OR WARRANTY AS TO THE CREDIT WORTHINESS, CREDIT STANDING, CREDIT CAPACITY, CHARACTER, GENERAL REPUTATION, PERSONAL CHARACTERISTICS, OR MODE OF LIVING OF ANY PERSON. AS SUCH, THE ADDITIONAL PROTECTIONS AFFORDED TO CONSUMERS AND OBLIGATIONS PLACED UPON CONSUMER REPORTING AGENCIES UNDER THE FCRA ARE NOT CONTEMPLATED BY, NOR CONTAINED WITHIN, THESE TERMS AND CONDITIONS.
    </p>
    <p>
      THIS AGREEMENT CONTAINS A MANDATORY ARBITRATION OF DISPUTES PROVISION THAT GENERALLY REQUIRES THE USE OF ARBITRATION ON AN INDIVIDUAL BASIS TO RESOLVE DISPUTES, RATHER THAN JURY TRIALS OR CLASS ACTIONS, AND ALSO LIMITS THE REMEDIES AVAILABLE TO YOU IN THE EVENT OF A DISPUTE.
    </p>
    <h3>
      Scope
    </h3>
    <p>
      These Terms and Conditions apply to you when you: (a) access, view, download, or otherwise use any page on the Site other than the home page located at <a href="https://public-records.net">public-records.net</a>; and/or (b) submit an online application to become a BeenVerified member (“Member”), which enables you to utilize a host of services made available to Members by and through the Site (“Member Services”). By engaging in either of these actions, you acknowledge and agree that you (a) have read, understand, and agree to be bound by these Terms and Conditions in their entirety; (b) consent to the use of electronic signatures, contracts, orders, and other records, and to the electronic delivery of notices, policies, and records of transactions initiated or completed through the site or through any other interactions with BeenVerified; and (c) waive any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which require (i) an original signature, (ii) delivery or retention of non-electronic records, or (iii) payments or the granting of credits in ways other than through electronic means. The Site and Member Services are available only to individuals that are at least eighteen (18) years of age and that can enter into legally binding contracts under applicable law. If you are under eighteen (18) years of age or do not agree to these Terms and Conditions in their entirety, do not access, view, download, or otherwise use any page on the Site other than the home page located at <a href="https://public-records.net">public-records.net</a> and do not submit an online application to become a Member.
    </p>
    <p>
      The BeenVerified Privacy Policy (“Privacy Policy”) is part of these Terms and Conditions and is incorporated herein by this reference. By accepting these Terms and Conditions you agree to the collection and use of your information by the Site as described in the Privacy Policy. Any requests to remove your information from BeenVerified’s People Search results will be governed by the procedures described in the Privacy Policy. <a href="/privacy/">Click here</a> to view the Privacy Policy.
    </p>
    <h3>
      Modifications to These Terms and Conditions
    </h3>
    <p>
      BeenVerified may modify these Terms and Conditions, in whole or in part, from time to time in its sole discretion, effective immediately upon posting modified Terms and Conditions to the Site and, if you are a Member, by directly communicating them to you when you log in to the Site; provided, however, that: (i) any modification to the Dispute Resolution section shall not apply to any disputes initiated prior to the applicable modification; and (ii) any modification to the Fees and Billing section shall not apply to any charges incurred prior to the applicable modification. By not terminating your Member Services account (“Account”) within seven (7) days after receiving a notice of modifications to the Terms and Conditions as described above or by continuing to use or access the Site or any Member Services after modified Terms and Conditions are posted to the Site, you agree to comply with, and be bound by, such modifications. Unless explicitly stated otherwise, any future offer(s) made available to you on the Site that augment(s) or otherwise enhance(s) the current features of the Site shall be subject to these Terms and Conditions.
    </p>
    <p>
      If, prior to the effective date of these Terms and Conditions, you entered into a Membership Agreement with BeenVerified governing your use of Member Services, your continued use Member Services is now subject to these Terms and Conditions, which supersede the Membership Agreement subject to the limitations described in the preceding paragraph.
    </p>
    <h3>
      Restrictions on Your Use of the Site and Information Obtained from BeenVerified
    </h3>
    <p>
      BeenVerified is a database of publicly available sources of information aggregated for your convenience. Through BeenVerified, end-user visitors to the Site (“Visitors”) can view or execute certain media, text, data, images, graphics, user interfaces, audio, video, photographs, trademarks, logos, artwork, designs, magnetic translations, digital conversions, software, and other materials posted to or made available through the Site (collectively, “Content”) as compiled, distributed, and displayed by BeenVerified and other third-party content providers (“Third-Party Providers”) including, but not limited to, third-party websites or services that provide information about individuals (each, a “Search Subject”) that can be searched for and accessed through the Site (“BeenVerified Checks”). You are granted a non-exclusive, non-transferable, revocable, and limited license to access and use the Site, Content, BeenVerified Checks, and, if you are a Member, Member Services, in accordance with these Terms and Conditions (“BeenVerified License”). BeenVerified may terminate this license at any time for any reason.
    </p>
    <p>
      As a condition to access the Site, including Member Services, and without limiting the generality of the foregoing, you agree that, unless otherwise expressly authorized by these Terms and Conditions or in writing by BeenVerified, you will not:
    </p>
    <p>
      1. Conduct any BeenVerified Checks or otherwise obtain or use any Content or other information obtained from or through the Site about a Search Subject for purposes prohibited under the FCRA;
    </p>
    <p>
      Because BeenVerified is not a Consumer Reporting Agency, you are prohibited under the FCRA from using any information obtained from the Site about a Search Subject including, but not limited to, information obtained through BeenVerified Checks, as a factor in determining the Search Subject’s eligibility for:
    </p>
    <ul>
      <li>Employment. Including, but not limited to, when evaluating a Search Subject for initial employment, reassignment, promotion, or retention (including, but not limited to, household workers such as babysitters, cleaning personnel, nannies, contractors, and domestic workers).
      </li>
      <li>Tenancy. Including, but not limited to, deciding whether to lease a residential or commercial space to a Search Subject.
      </li>
      <li>Educational Admission or Benefits. Including, but not limited to, assessing a Search Subject’s qualifications for an educational program or scholarship.
      </li>
      <li>Personal Credit, Loans, or Insurance. Including, but not limited to, assessing the risk associated with providing credit, a loan, or insurance based on a Search Subject’s existing debt obligations.
      </li>
      <li>Business Transactions Initiated by an Individual Consumer. Including, but not limited to, determining whether a Search Subject continues to meet the terms of a personal customer account.
      </li>
    </ul>
    <p>
      Using information about a Search Subject obtained from BeenVerified in these ways violates both these Terms and Conditions and the law, and can lead to possible criminal penalties. We take this very seriously, and reserve the right to terminate user access, terminate Accounts, and report violators to law enforcement as appropriate. If you are not sure whether your desired use of information obtained from BeenVerified complies with these restrictions, please contact us at <a href="mailto:support@public-records.net?subject=Public-Records.net Support">support@public-records.net</a> before conducting any BeenVerified Checks or otherwise obtaining information about a Search Subject from BeenVerified.
    </p>
    <p>
      2. Use the Site, Member Services, or Content, including, but not limited to, BeenVerified Checks: (a) in violation of any applicable foreign or domestic laws, statutes, rules, regulations, or judicial decrees; (b) in a manner that does or is intended to cause emotional or physical harm to, discriminate against, or “stalk” or otherwise harass any other person; (c) to seek information about or harm minors in any way; (d) to seek information about celebrities or public figures; (e) to produce or distribute any libelous, obscene, or indecent material; or (f) to infringe upon the legal or proprietary rights of any third parties (including, but not limited to, copyright, patent, trademark, trade secret, and other intellectual property rights; publicity rights; and privacy rights);
    </p>
    <p>
      3. Distribute, transmit in any way to any other computer, website, or other medium, or otherwise provide any Member Services, or other material posted to or made available by or through the Site, including, but not limited to, Content and results of BeenVerified Checks, in any way to any third party. You must treat such material as confidential information, and take all reasonable steps to ensure that such material is stored in a secure manner;
    </p>
    <p>
      4. Provide or submit any information or data to BeenVerified or conduct any BeenVerified Checks concerning Search Subjects that you are not authorized to provide, submit, or conduct;
    </p>
    <p>
      5. Directly or indirectly reproduce, create, compile, or incorporate any part of the Site including, but not limited to, Content, BeenVerified Checks, and Member Services, into any database, collection, compilation, directory, or information retrieval system, electronic or otherwise;
    </p>
    <p>
      6. Use, copy, reproduce, record, retransmit, emulate, clone, sell, rent, lease, decompile, disassemble, reverse engineer, broadcast, distribute, publish, upload, post, publicly display, perform, digitize, compile, or translate any part of the Site, Content, BeenVerified Checks, Member Services, or other material posted to or made available by or through the Site for any commercial purpose or for any purpose that is competitive, in BeenVerified’s sole discretion, to BeenVerified;
    </p>
    <p>
      7. Access the Site through any automated or manual process for the purpose of monitoring the Site’s performance, functionality, or availability for any commercial purpose;
    </p>
    <p>
      8. Access, retrieve any data from, or otherwise perform any other activities on or through the Site using any type of software or other automated process (e.g., scripts, robots, scrapers, crawlers, or spiders);
    </p>
    <p>
      9. Create any "derivative works" by altering any aspect of the Site, Content, BeenVerified Checks, or Member Services;
    </p>
    <p>
      10. Use the Site, Content, BeenVerified Checks, or Member Services in conjunction with any other third-party content;
    </p>
    <p>
      11. Use any device, software, or routine to interfere or attempt to interfere with the proper working of the Site, or to bypass, disable, or block any portion of the Site, associated software, or any BeenVerified server or computer system;
    </p>
    <p>
      12. Take any action that, as determined in BeenVerified’s sole discretion, imposes an unreasonable or disproportionately large load on the Site infrastructure;
    </p>
    <p>
      13. Forge any instructions coming from your computer or otherwise obfuscate the name or location of your computer or IP address in order to disguise the origin of any communication you transmit to or through the Site;
    </p>
    <p>
      14. Publish a link to a BeenVerified web page other than BeenVerified’s home page (known as “deep-linking”;
    </p>
    <p>
      15. Cover or otherwise obfuscate any advertisement located on BeenVerified; or
    </p>
    <p>
      16. Simulate the appearance or function of BeenVerified on another website, such as through “framing” or “mirroring.”
    </p>
    <h3>
      Our Obligations
    </h3>
    <p>
      We allow you to access the Site as it may be available at any given time and have no other obligations, except as expressly stated in these Terms and Conditions. You are solely responsible for your use of the Site and any information you obtain from the Site. BeenVerified reserves the right, but undertakes no obligation, to:
    </p>
    <p>
      1. Monitor, review, or otherwise police your or others’ use of the Site, BeenVerified Checks, Member Services, or the associated information made available by Members during the application process (“Registration Data”);
    </p>
    <p>
      2. Moderate any dispute between you and any other third party, including, but not limited to, disputes with other Visitors, Members, or Search Subjects;
    </p>
    <p>
      3. Verify the identity of any person using the Site, including any Visitor who applies to be a Member, as well as the purpose(s) for which any Visitor or Member is using the Site.
    </p>
    <h3>
      Proprietary Rights
    </h3>
    <p>
      The proprietary rights to all Content, including, without limitation, the BeenVerified Checks, and any rights in the design, selection, arrangement, compilation, and coordination of such Content, are owned by or licensed to BeenVerified and are protected under applicable laws (including, but not limited to, copyright, trademark, and other intellectual property laws). Except as expressly provided in these Terms and Conditions or with BeenVerified’s express written consent, you are not granted any rights or licenses to use any patents, copyrights, trade secrets, rights of publicity, or trademarks of BeenVerified or with respect to any of the Content. The “BeenVerified” name and logo are trademarks of BeenVerified. All custom graphics, icons and service names are trademarks of BeenVerified. All other trademarks are the property of their respective owners.
    </p>
    <p>
      BeenVerified reserves any and all rights not explicitly granted in these Terms and Conditions. By using the Site, you do not acquire any ownership rights to the Site, Member Services, Content, or any other information obtained from the Site.
    </p>
    <h3>
      Your Grant of License
    </h3>
    <p>
      You grant to BeenVerified, subject to the Privacy Policy, an irrevocable, perpetual, royalty-free, worldwide, unlimited, assignable, sublicenseable, fully-paid-up license to copy, distribute, publish, prepare derivative works of, commercialize, retain, analyze, and otherwise use, in any way now known or in the future discovered and without any obligation to notify, identify, or compensate you or anyone else, any information, ideas, concepts, comments, feedback, Content, Registration Data, and other materials that you submit, directly or indirectly, to BeenVerified through the Site, including, but not limited to, any information associated with Search Subjects and any ideas or suggestions regarding the Site or the Member Services. By submitting such information or materials to us, you represent and warrant that your submission and BeenVerified’s use of your submission do not and will not breach any agreement, violate any law, or infringe any right of any third party (including, but not limited to, privacy and intellectual property rights), and that the information you submit is accurate. BeenVerified does not solicit ideas, concepts, or other materials from you regarding improvement of the Site or services provided through the Site and you acknowledge that you are responsible for, and bear all risk as to the use or distribution of, any such ideas, concepts, or materials.
    </p>
    <h3>
      Membership Requirements and Conditions
    </h3>
    <p>
      By submitting a complete and accurate online application to become a Member (the “Application”), agreeing to these Terms and Conditions, and receiving approval from BeenVerified, Visitors can, for a fee, obtain an Account. Among other Member Services, Members are able to, subject to the restrictions contained in these Terms and Conditions and for the applicable fees, conduct BeenVerified Checks.
    </p>
    <p>
      The following provisions apply to you only to the extent that you submit an Application and, if your Application is granted and you become a Member, your use of Member Services:
    </p>
    <h4>
      1. Registration
    </h4>
    <p>
      To join the Site as a Member, you must be at least eighteen (18) years of age with the requisite equipment and Internet connection to access the Member Services. BeenVerified will evaluate your Application and notify you of your Application’s acceptance or rejection. If at any time any of the information you supply as part of your Application changes, you must immediately inform BeenVerified of these changes. BeenVerified may reject your Application and/or terminate your Account at any time and for any reason, in BeenVerified’s sole discretion. If you elect to submit an Application, you acknowledge that you have independently evaluated the desirability of obtaining the Member Services and that you have not relied on any representation or warranty about the Member Services other than those set forth in these Terms and Conditions.
    </p>
    <h4>
      2. Account Username and Password
    </h4>
    <p>
      You may be required to register for a username or obtain a password prior to obtaining access to Member Services. You acknowledge and agree that (a) you are responsible for maintaining the security and confidentiality of your username and password, (b) you will not use any other Member’s username and password to access that Member’s Account, (c) you will not permit others to access your Account, and (d) you will not sell, trade, or otherwise share your username and password with any other person. If you violate any of these provisions, you agree that you are responsible for any actions that occur through your Account, whether or not taken by you.
    </p>
    <h4>
      3. Term and Termination
    </h4>
    <p>
      BeenVerified reserves the right, in its sole discretion, to restrict, suspend, or terminate your Account, with or without cause. You may, in your sole discretion, terminate your Account upon forty-eight (48) business hours’ prior written notice to BeenVerified.
    </p>
    <p>
      Upon any expiration, termination, restriction, or suspension of your Account or your participation in the Member Services:
    </p>
    <ul>
      <li>Any and all licenses and rights granted to you in connection with these Terms and Conditions shall immediately cease and terminate;
      </li>
      <li>Any and all confidential or proprietary information of BeenVerified that is in your possession or control must be immediately returned or destroyed. If requested by BeenVerified, you or an authorized agent will certify in a signed writing that all such confidential and proprietary information has been returned or destroyed; and
      </li>
      <li>You shall remit payment on any and all fees then due and owed to BeenVerified within five (5) days of any such expiration or termination.
      </li>
    </ul>
    <p>
      Obligations that, by their nature, would survive any termination or expiration of the Account shall survive any termination or expiration of the Account.
    </p>
    <h4>
      4. Fees and Billing
    </h4>
    <p>
      If you wish to use the Member Services or otherwise purchase any product or service through the Site, you will be presented with the applicable fees and billing arrangement prior to your purchase, which may include the charging of fees to a payment card on a recurring basis.. In addition to those fees, you shall be responsible for paying any and all applicable sales or use tax due to any and all taxing authorities arising from, or in connection with, your use of the Member Services. BY SUBMITTING PAYMENT, YOU REPRESENT AND WARRANT THAT YOU (A) ARE EIGHTEEN (18) YEARS OF AGE OR OLDER AND (B) HAVE THE LEGAL RIGHT TO USE THE PAYMENT MEANS SELECTED BY YOU. By supplying payment card information, you authorize our use of such information in accordance with our Privacy Policy, including, but not limited to, our provision of such information to third parties for the purposes of payment processing. You also understand and acknowledge that BeenVerified uses a third-party payment processor to process credit card payments on our behalf, and when you supply payment information in connection with a purchase you agree that BeenVerified is not responsible for the security of such information when it is in the control of the third-party payment processor.
    </p>
    <p>
      Failure to use the Member Services does not constitute a basis for refusing to pay any of the associated fees. Upon prior written notice to you (with e-mail constituting sufficient written notice), BeenVerified reserves the right in its sole discretion to change its pricing or billing practices. By not terminating your Account within seven (7) days after receiving such notice, you agree to comply with, and be bound by, the new pricing or billing practices. If you do terminate your account, you will remain responsible for timely payment of any and all fees that you have already incurred (including any applicable late fees).
    </p>
    <p>
      If you fail to make any scheduled payment for accrued fees, such overdue amounts may be subject to interest charges in the amount of the lesser of one and one half percent (1.5%) per month, compounded monthly, or the maximum amount permitted by law. Your Account may be deactivated, and access to the Site denied, for non-payment.
    </p>
    <h3>
      Indemnification
    </h3>
    <p>
      You agree to indemnify and hold BeenVerified, its parents, subsidiaries, affiliates, joint ventures, and third-party service providers, and each of their respective members, officers, directors, employees, agents, shareholders, co-branders, content licensors, suppliers, contractors, attorneys, and other partners, harmless from and against any and all liabilities, claims, expenses (including reasonable attorneys’ fees), damages, suits, costs, demands, and judgments made by any third party, including, but not limited to, by any Search Subject, arising from or related to: (a) your use of the Site or any Content you obtain through the Site, including, but not limited to, information obtained through BeenVerified Checks and other information about Search Subjects; (b) your failure to comply with these Terms and Conditions including, but not limited to, your violation of any laws or any rights of another individual or entity; or (c) any claim that BeenVerified is obligated to pay any taxes in connection with your use of the Site, Member Services, or otherwise. The provisions of this paragraph are for the benefit of BeenVerified, its parents, subsidiaries, affiliates, joint ventures, and third-party service providers, and each of their respective officers, directors, members, employees, agents, shareholders, co-branders, licensors, suppliers, contractors, attorneys, and other partners. Each of these individuals and entities shall have the right to assert and enforce these provisions directly against you on his, her, or its own behalf.
    </p>
    <h3>
      Disclaimer of Warranties
    </h3>
    <p>
      THE SITE, ANY INFORMATION CONTAINED THEREIN, THE CONTENT, BEENVERIFIED CHECKS, MEMBER SERVICES, AND ANY OTHER BEENVERIFIED PRODUCTS OR SERVICES, ARE PROVIDED TO YOU ON AN “AS IS” AND “AS AVAILABLE” BASIS AND ALL WARRANTIES, EXPRESS AND IMPLIED, ARE DISCLAIMED TO THE FULLEST EXTENT PERMISSIBLE PURSUANT TO APPLICABLE LAW (INCLUDING, BUT NOT LIMITED TO, THE DISCLAIMER OF ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT OF INTELLECTUAL PROPERTY, AND FITNESS FOR A PARTICULAR PURPOSE). DO NOT RELY ON THE SITE, ANY INFORMATION PROVIDED THEREIN, OR ITS CONTINUATION. IN PARTICULAR, BUT NOT AS A LIMITATION THEREOF, BEENVERIFIED AND ITS PARENTS, SUBSIDIARIES AND AFFILIATES MAKE NO REPRESENTATION OR WARRANTY THAT THE SITE, ANY INFORMATION CONTAINED THEREIN, THE CONTENT, BEENVERIFIED CHECKS, MEMBER SERVICES, OR ANY OTHER BEENVERIFIED PRODUCTS OR SERVICES: (a) WILL ACHIEVE ANY PURPOSE FOR WHICH YOU INTENDED TO USE BEENVERIFIED; (b) WILL BE UNINTERRUPTED, TIMELY, SECURE, AND ERROR-FREE (INCLUDING, BUT NOT LIMITED TO, DUE TO SYSTEM OR NETWORK FAILURES, UPDATES, DISTURBANCES RELATED TO INTERNET SERVICE PROVIDERS, MAINTENANCE, OR MALICIOUS ATTACKS), OR THAT DEFECTS OR ERRORS WILL BE CORRECTED; (c) WILL BE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; (d) WILL EMPLOY SECURITY METHODS THAT GUARANTEE THAT YOU WILL NOT EXPERIENCE INTERFERENCE WITH YOUR USE OR ENJOYMENT OF THE SITE, OR THAT GUARANTEE THAT YOUR RIGHTS WILL NOT BE INFRINGED; OR (e) WILL BE 100% ACCURATE, COMPLETE, AND UP-TO-DATE. THE SITE, ANY INFORMATION CONTAINED THEREIN, THE CONTENT, BEENVERIFIED CHECKS, MEMBER SERVICES AND ANY OTHER BEENVERIFIED PRODUCTS OR SERVICES MAY CONTAIN BUGS, ERRORS, PROBLEMS, OR OTHER LIMITATIONS. BEENVERIFIED AND ITS PARENTS, SUBSIDIARIES AND AFFILIATES WILL NOT BE LIABLE FOR THE AVAILABILITY OF THE UNDERLYING INTERNET CONNECTION YOU USE TO ACCESS THE SITE. NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM BEENVERIFIED, ANY MEMBERS, THIRD-PARTY PROVIDERS, OR OTHERWISE THROUGH OR FROM THE SITE, SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS AND CONDITIONS. YOUR USE OF THE SITE IS AT YOUR SOLE RISK, AND BEENVERIFIED DOES NOT REPRESENT OR WARRANT THAT YOUR USE OF THE SITE WILL NOT INFRINGE THE RIGHTS OF THIRD PARTIES.
    </p>
    <h3>
      Limitation of Liability
    </h3>
    <p>
      YOU EXPRESSLY UNDERSTAND AND AGREE THAT BEENVERIFIED AND ITS PARENTS, SUBSIDIARIES, AFFILIATES, JOINT VENTURES, AND THIRD-PARTY SERVICE PROVIDERS, AND EACH OF THEIR RESPECTIVE MEMBERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SHAREHOLDERS, CO-BRANDERS, CONTENT LICENSORS, SUPPLIERS, CONTRACTORS, ATTORNEYS, AND OTHER PARTNERS, SHALL NOT BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES INCLUDING, BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES (EVEN IF BEENVERIFIED HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), TO THE FULLEST EXTENT PERMITTED BY LAW, ARISING FROM OR RELATED TO: (a) THE USE OF OR THE INABILITY TO USE THE SITE, ANY INFORMATION CONTAINED THEREIN, THE CONTENT, BEENVERIFIED CHECKS, MEMBER SERVICES, OR ANY OTHER BEENVERIFIED PRODUCTS OR SERVICES; (b) THE COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES RESULTING FROM YOUR PURCHASE OF OR OBTAINING ANY BEENVERIFIED PRODUCTS, SERVICES, CONTENT, OR OTHER DATA THROUGH THE SITE; (c) THE UNAUTHORIZED ACCESS TO, OR ALTERATION OF, YOUR REGISTRATION DATA OR ANY OTHER INFORMATION ABOUT YOU MAINTAINED BY BEENVERIFIED; AND (d) ANY OTHER DISPUTE RELATING TO THE SITE, ANY INFORMATION CONTAINED THEREIN, OR ANY OTHER BEENVERIFIED PRODUCTS OR SERVICES. THIS LIMITATION APPLIES TO ALL STATUTORY AND COMMON-LAW CAUSES OF ACTION INCLUDING, BUT NOT LIMITED TO, BREACH OF CONTRACT, BREACH OF WARRANTY, NEGLIGENCE, STRICT LIABILITY, MISREPRESENTATION, AND ANY AND ALL OTHER TORTS.
    </p>
    <p>
      YOU HEREBY RELEASE BEENVERIFIED AND ITS PARENTS, SUBSIDIARIES, AFFILIATES, JOINT VENTURES, AND THIRD-PARTY SERVICE PROVIDERS, AND EACH OF THEIR RESPECTIVE MEMBERS, OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, SHAREHOLDERS, CO-BRANDERS, CONTENT LICENSORS, SUPPLIERS, CONTRACTORS, ATTORNEYS, AND OTHER PARTNERS, FROM ANY AND ALL OBLIGATIONS, LIABILITIES, AND CLAIMS IN EXCESS OF THE LIMITATIONS STATED HEREIN. IF APPLICABLE LAW DOES NOT PERMIT SUCH LIMITATION, THE MAXIMUM LIABILITY TO YOU UNDER ANY AND ALL CIRCUMSTANCES WILL BE FIVE HUNDRED DOLLARS ($500.00). NO ACTION, REGARDLESS OF FORM, ARISING OUT OF YOUR USE OF THE SITE, ANY INFORMATION CONTAINED THEREIN, THE CONTENT, BEENVERIFIED CHECKS, MEMBER SERVICES, OR ANY OTHER BEENVERIFIED PRODUCT OR SERVICE MAY BE BROUGHT BY YOU OR BEENVERIFIED MORE THAN ONE (1) YEAR FOLLOWING THE EVENT WHICH GAVE RISE TO THE CAUSE OF ACTION. THE LIMITATION OF LIABILITY SET FORTH IN THIS SECTION IS A FUNDAMENTAL ELEMENT OF THE BASIS OF THE BARGAIN BETWEEN YOU AND BEENVERIFIED. ACCESS TO THE SITE WOULD NOT BE PROVIDED TO YOU WITHOUT SUCH LIMITATION. IN THE EVENT SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF DAMAGES TO THE EXTENT INDICATED ABOVE, OUR LIABILITY IN SUCH JURISDICTIONS SHALL BE LIMITED TO THE EXTENT PERMITTED BY LAW.
    </p>
    <h3>
      Links to Third Party Websites and Advertisers
    </h3>
    <p>
      The Site contains links to other websites on the Internet that are owned and operated by third parties. In some instances, these websites are co-branded and the third parties are entitled to use BeenVerified’s name and logo on their websites. BeenVerified does not control the information, products, or services available on or through these third party websites. The inclusion on the Site of a third-party link does not imply endorsement by BeenVerified of the applicable website or any association with the website’s operators. Because BeenVerified has no control over such websites, you agree that BeenVerified is not responsible or liable for the availability or the operation of such websites, for any material located on or available through such websites, or for the data practices of such websites, which shall be subject to those websites’ policies and terms. If you click on any third-party advertisements on the Site, participate in any promotions offered by such advertisers, or purchase any goods or services from such advertisers, any terms, conditions, warranties, or representations associated with such dealings or promotions are solely between you and the applicable advertiser or other third party, and you agree that BeenVerified shall not be responsible or liable, directly or indirectly, for any loss or damage you suffer through your dealings with or based on your reliance on any material made available by such advertisers.
    </p>
  <h3>
    Arbitration and Dispute Resolution
  </h3>
    <p>
    These Terms and Conditions shall be treated as though they were executed and performed in New York City, NY and shall be governed by and construed in accordance with the laws of the State of New York (without regard to conflict of law principles).
    </p>
    <p>
    At BeenVerified, we expect that our customer service team will be able to resolve most complaints you may have regarding our provision or your use of the Member Services or BeenVerified Checks. If you have such a complaint, you can contact our customer service team as described in the “How to Contact Us” section below. In the unlikely event that your complaint remains unresolved, we prefer to specify now what each of us should expect in order to avoid any confusion later. Accordingly, you and BeenVerified agree to the following resolution process for all disputes and claims that you or BeenVerified have arising from our provision or your use of the Member Services or BeenVerified Checks (each a “Service Claim”).
    </p>
    <p>
    In an attempt to find the quickest and most efficient resolution of any Service Claim, you and BeenVerified agree to first discuss the Service Claim informally for at least 30 days. To do that, the party who brings the Service Claim must first send to the other party a notice that must include (1) a description of the Service Claim and (2) a proposed resolution (together, the “Claim Notice”).  If you want to raise a Service Claim, you must send your Claim Notice by certified mail to us at: BeenVerified, Attn: Legal Department, 307 5th Avenue - 16th Floor, New York, NY 10016. If we would like to subsequently discuss your Service Claim with you, we will contact you using the e-mail address or mailing address you provide in your letter to us.  If BeenVerified wants to raise a Service Claim, we will send our Claim Notice to you at the e-mail address that we have on file for you.  If we do not have an e-mail address for you on file, BeenVerified will send our Service Claim to you through a means that complies with the service of process rules of the State of New York.
    </p>
    <p>
    IF YOU AND BEENVERIFIED DO NOT REACH AN AGREED UPON RESOLUTION WITHIN 30 DAYS OF RECEIPT OF THE SERVICE CLAIM, YOU AND BEENVERIFIED AGREE THAT THE SERVICE CLAIM MUST BE RESOLVED THROUGH BINDING INDIVIDUAL ARBITRATION BEFORE THE AMERICAN ARBITRATION ASSOCIATION USING ITS CONSUMER ARBITRATION RULES, AVAILABLE HERE.
    </p>
    <p>
    AS AN EXCEPTION TO THIS ARBITRATION REQUIREMENT, EITHER PARTY HAS THE RIGHT TO (1) PURSUE A SERVICE CLAIM IN SMALL CLAIMS COURT OF APPROPRIATE JURISDICTION, OR (2) PURSUE AN INTELLECTUAL PROPERTY CLAIM OR CLAIM RELATING TO UNAUTHORIZED ACCESS TO DATA THROUGH THE SITE (INCLUDING, BUT NOT LIMITED TO, CLAIMS RELATING TO PATENT, COPYRIGHT, TRADEMARK, AND TRADE SECRETS, AND CLAIMS RELATING TO THE ACCESS OR RETRIEVAL OF DATA THROUGH THE SITE USING AN AUTOMATED PROCESS SUCH AS SCRAPING) IN STATE OR FEDERAL COURTS LOCATED IN NEW YORK, NY. BOTH BEENVERIFIED AND YOU AGREE TO SUBMIT TO THE PERSONAL JURISDICTION OF THOSE COURTS FOR THESE CLAIMS.
    </p>
    <p>
    NOTHING HEREIN SHALL BE CONSTRUED TO PRECLUDE ANY PARTY FROM SEEKING INJUNCTIVE RELIEF IN THE STATE OR FEDERAL COURTS LOCATED IN NEW YORK, NY IN ORDER TO PROTECT ITS RIGHTS PENDING AN OUTCOME IN ARBITRATION.
    </p>
    <p>
    TO HELP RESOLVE ANY ISSUES BETWEEN US PROMPTLY AND DIRECTLY, YOU AND BEENVERIFIED AGREE TO BEGIN ANY ARBITRATION OR COURT PROCEEDINGS ALLOWED UNDER THIS SECTION WITHIN ONE YEAR AFTER A CLAIM ARISES; OTHERWISE, THE CLAIM IS WAIVED.
    </p>
    <p>
    YOU AND BEENVERIFIED ALSO AGREE TO ARBITRATE IN EACH OF OUR INDIVIDUAL CAPACITIES ONLY, NOT AS A REPRESENTATIVE OR MEMBER OF A CLASS, AND EACH OF US EXPRESSLY WAIVES ANY RIGHT TO FILE A CLASS ACTION OR SEEK RELIEF ON A CLASS BASIS.
    </p>
    <p>
    Rather than force everyone to visit us in New York, if you can demonstrate to us that arbitration in New York would create an undue burden to you, we will allow you to initiate the arbitration in your home state. Otherwise, the arbitration hearings will be held in New York, NY.  Any disagreements regarding the forum for arbitration will be settled by the arbitrator.
    </p>
    <p>
    When the 30-day period described above has elapsed, you may initiate the arbitration through the process described in the AAA’s Consumer Rules. If you initiate the arbitration, your arbitration fees will be limited to the filing fee set forth in the AAA's Consumer Rules. Regardless of who initiates the arbitration, BeenVerified will pay any other arbitration fees, including your share of arbitrator compensation.
    </p>
    <p>
    IT IS IMPORTANT THAT YOU UNDERSTAND THAT BY ENTERING INTO THIS AGREEMENT, BOTH YOU AND BEENVERIFIED ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION AGAINST THE OTHER PARTY FOR SERVICE CLAIMS THAT ARE COVERED BY THIS “ARBITRATION AND DISPUTE RESOLUTION” SECTION.  THE ARBITRATOR'S DECISION WILL BE CONCLUSIVE AND BINDING AND MAY BE ENTERED AS A JUDGMENT IN ANY COURT OF COMPETENT JURISDICTION.
    </p>
    <p>
    If the arbitrator rules against BeenVerified, in addition to accepting whatever responsibility is ordered by the arbitrator, we think it’s fair that BeenVerified reimburse your reasonable attorneys’ fees and costs, regardless of who initiated the arbitration.  In addition, if the arbitrator rules in BeenVerified’s favor, we will not seek reimbursement of our attorneys’ fees and costs, regardless of who initiated the arbitration.
    </p>
    <p>
    If you're not sure what all of this means, of course please feel free to ask an attorney.
    </p>

    <h3>
      Equitable Relief
    </h3>
    <p>
      You agree that any breach or threatened breach of these Terms and Conditions or any unauthorized or unlawful use of the Member Services or BeenVerified Checks would result in irreparable injury to BeenVerified for which monetary damages would be inadequate. In such event, BeenVerified shall have the right, in addition to other remedies available to it at law and in equity, to immediate injunctive relief without the need to post a bond. Nothing contained in these Terms and Conditions shall be construed to limit any legal or equitable remedies available to BeenVerified.
    </p>
    <h3>
      Entire Agreement
    </h3>
    <p>
      These Terms and Conditions, the Privacy Policy, and all other applicable operating rules, policies, price schedules, and other supplemental terms and conditions or documents that may be published or agreed upon by you from time to time, which are expressly incorporated herein by reference, shall constitute the entire and only agreement between you and BeenVerified with respect to your use of the Site. This agreement supersedes all prior or contemporaneous agreements, representations, warranties, and understandings with respect to your use of the Site and the content contained therein.
    </p>
    <p>
      To the extent that any information or material that appears on or is posted to the Site, or otherwise is made available by BeenVerified, contains any representation, term, or condition that is in conflict or inconsistent with these Terms and Conditions, these Terms and Conditions shall take precedence unless the new representation, term, or condition is contained in a signed writing by a duly appointed officer of BeenVerified.
    </p>
    <h3>
      Force Majeure
    </h3>
    <p>
      Other than for payment obligations, neither party will be liable for, or be considered to be in breach of, these Terms and Conditions on account of either party’s delay or failure to perform as required under these Terms and Conditions as a result of any causes or conditions that (a) are beyond the party’s reasonable control (including, but not limited to, acts of God, including storms and other natural occurrences; fires; explosions; telecommunications, Internet, or other network failures; results of vandalism or computer hacking; national emergencies, insurrections, acts of terrorism, riots, wars, strikes, or other labor difficulties; and (b) the party is unable to overcome through the exercise of commercially reasonable diligence (a “Force Majeure Event”). If any such Force Majeure Event occurs, the affected party will give the other party notice and will use commercially reasonable efforts to minimize the impact of any such event.
    </p>
    <h3>
      Severability
    </h3>
    <p>
      If any provision of these Terms and Conditions is held invalid or unenforceable by any applicable court decision, that provision shall be changed and interpreted so as to best accomplish the objectives of the invalid or unenforceable provision within the limits of applicable law or the applicable court decision, and the remaining provisions of these Terms and Conditions shall remain in full force and effect.
    </p>
    <h3>
      Waiver
    </h3>
    <p>
      BeenVerified’s failure to enforce a breach of or insist upon strict adherence to any provision of these Terms and Conditions shall not operate as or be construed to be a waiver of BeenVerified’s right to enforce breaches of or insist upon strict adherence to such provision or any other provision of these Terms and Conditions. Any waiver of a provision of these Terms and Conditions must be contained in a signed writing by a duly appointed officer of BeenVerified.
    </p>
    <h3>
      Misconduct
    </h3>
    <p>
      BeenVerified reserves the right to restrict, suspend, or terminate your Account or access to the Site if we determine, in our sole and absolute discretion, that you have violated these Terms and Conditions.
    </p>
    <h3>
      Transferability
    </h3>
    <p>
      These Terms and Conditions will be binding on, inure to the benefit of and be enforceable by BeenVerified’s successors and assigns. You are not permitted to transfer, assign, or delgate any rights or obligations pursuant to these Terms and Conditions unless contained in a signed writing by a duly appointed officer of BeenVerified, and BeenVerified reserves the right to immediately terminate your use of the Site and Member Services if you attempt to do so.
    </p>
    <h3>
      Your Relationship with BeenVerified
    </h3>
    <p>
      Nothing in these Terms and Conditions creates any partnership, joint venture, agency, franchise, sales representative, or employment relationship between BeenVerified and you or any other party. You have no authority to make or accept any offers or representations on behalf of BeenVerified.
    </p>
    <h3>
      Notices
    </h3>
    <p>
      BeenVerified may provide legal and other notices to you, in BeenVerified’s sole discretion, by (a) posting such notices or links to such notices on the Site, or (b) sending a notice by e-mail, postal mail, overnight courier, or facsimile to any contact address or number that you have provided to BeenVerified. If you wish to provide notice to BeenVerified, you shall send such notice, postage prepaid by U.S. registered or certified mail or by international or domestic overnight courier, to: 307 5th Avenue, New York, NY 10016. Notices you send by e-mail or facsimile, with or without electronic confirmation, will not be deemed to be valid unless actual receipt is confirmed in a signed writing by a duly appointed officer of BeenVerified.
    </p>
    <h3>
      How to Contact Us
    </h3>
    <p>
      Our “Contact Us” page contains information that allows you to contact us directly with any questions or comments that you may have. We endeavor to review and reply promptly to each comment sent to us. If you have any questions about these Terms and Conditions or the practices of BeenVerified, or if you would like to register a complaint, notify BeenVerified of a dispute, notify BeenVerified of inaccurate or misleading information, or notify us of improper use of the BeenVerified Checks, please feel free to contact us at 1-234-978-2542, at <a href="mailto:support@public-records.net?subject=Public-Records.net Support">support@public-records.net</a>, or at:
    </p>
    <p>
      BeenVerified<br>
      307 5th Avenue - 16th Floor<br>
      New York, NY 10016<br>
    </p>
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
