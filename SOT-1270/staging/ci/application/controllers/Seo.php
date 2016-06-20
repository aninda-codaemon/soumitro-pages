<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Seo extends CI_Controller {

	function __construct() {
		parent::__construct();
		include APPPATH . 'libraries/jsonld.php';
		include APPPATH . 'libraries/sitemap.php';

	}

	public function _404(){
    $this->load->view("error");
	}

	public function index()
	{
		$this->benchmark->mark('begin');
		$this->load->model("SeoDB", "", TRUE);

		// If URI not lowercase, redirect to lowercase version
		if (preg_match("/\p{Lu}/u", $this->uri->uri_string())) {
			$this->load->helper('url');
			$uri = $this->uri->uri_string();
			$uriLower = strtolower("/" . substr($uri, strpos($uri, "index.php")) . "/");
			redirect($uriLower, "redirect", 301);
		}

		// Get Location
		$states = array(3 => "alaska", 2 => "alabama", 4 => "arkansas", 5 => "arizona", 6 => "california", 7 => "colorado", 8 => "connecticut", 9 => "district-of-columbia", 10 => "delaware", 11 => "florida", 12 => "georgia", 13 => "hawaii", 14 => "iowa", 15 => "idaho", 16 => "illinois", 17 => "indiana", 18 => "kansas", 19 => "kentucky", 20 => "louisiana", 21 => "massachusetts", 22 => "maryland", 23 => "maine", 24 => "michigan", 25 => "minnesota", 26 => "missouri", 27 => "mississippi", 28 => "montana", 29 => "north-carolina", 30 => "north-dakota", 31 => "nebraska", 32 => "new-hampshire", 33 => "new-jersey", 34 => "new-mexico", 35 => "nevada", 36 => "new-york", 37 => "ohio", 38 => "oklahoma", 39 => "oregon", 40 => "pennsylvania", 41 => "rhode-island", 42 => "south-carolina", 43 => "south-dakota", 44 => "tennessee", 45 => "texas", 46 => "utah", 47 => "virginia", 48 => "vermont", 49 => "washington", 50 => "wisconsin", 51 => "west-virginia", 52 => "wyoming");

		if (!$this->uri->total_segments()) {
			$data = $this->SeoDB->getRootBuckets(1);
			$this->load->view("home");
		} else if ($this->uri->total_segments() == 1 && $this->uri->segment(1) == "error") {
			$this->load->view("error");
		} else if ($this->uri->total_segments() == 1 && $this->uri->segment(1) == "contact") {
			$this->load->view("contact");
		} else if ($this->uri->total_segments() == 1 && $this->uri->segment(1) == "contact-success") {
			$this->load->view("contact-success");
		} else if ($this->uri->total_segments() == 1 && $this->uri->segment(1) == "about") {
			$this->load->view("about");
		} else if ($this->uri->total_segments() == 1 && $this->uri->segment(1) == "faqs") {
			$this->load->view("faqs");
		} else if ($this->uri->total_segments() == 1 && $this->uri->segment(1) == "terms") {
			$this->load->view("terms");
		} else if ($this->uri->total_segments() == 1 && $this->uri->segment(1) == "privacy") {
			$this->load->view("privacy");
		/*
		} else if ($this->uri->segment(1) == "p") {
			$this->load->helper('url');
			if ($this->uri->total_segments() == 2) {
				// p name
				$url = "/" . str_replace("%%", "-", str_replace("-", "+", str_replace("+", "%%", $this->uri->segment(2))));
				redirect($url, "redirect", 301);
			} else if ($this->uri->total_segments() == 3) {
				// p state name
				$postalCodes = array("ak" => "alaska", "al" => "alabama", "ar" => "arkansas", "az" => "arizona", "ca" => "california", "co" => "colorado", "ct" => "connecticut", "dc" => "district-of-columbia", "de" => "delaware", "fl" => "florida", "ga" => "georgia", "hi" => "hawaii", "ia" => "iowa", "id" => "idaho", "il" => "illinois", "in" => "indiana", "ks" => "kansas", "ky" => "kentucky", "la" => "louisiana", "ma" => "massachusetts", "md" => "maryland", "me" => "maine", "mi" => "michigan", "mn" => "minnesota", "mo" => "missouri", "ms" => "mississippi", "mt" => "montana", "nc" => "north-carolina", "nd" => "north-dakota", "ne" => "nebraska", "nh" => "new-hampshire", "nj" => "new-jersey", "nm" => "new-mexico", "nv" => "nevada", "ny" => "new-york", "oh" => "ohio", "ok" => "oklahoma", "or" => "oregon", "pa" => "pennsylvania", "ri" => "rhode-island", "sc" => "south-carolina", "sd" => "south-dakota", "tn" => "tennessee", "tx" => "texas", "ut" => "utah", "va" => "virginia", "vt" => "vermont", "wa" => "washington", "wi" => "wisconsin", "wv" => "west-virginia", "wy" => "wyoming");
				if (array_key_exists($this->uri->segment(2), $postalCodes)) {
					$url = "/" . $postalCodes[($this->uri->segment(2))] . "/" . str_replace("%%", "-", str_replace("-", "+", str_replace("+", "%%", $this->uri->segment(3))));
					redirect($url, "redirect", 301);
				} else {
					show_404();
				}
			} else {
				show_404();
			}
		*/
		} else if ($this->uri->segment(1) == "people") {
			if ($this->uri->total_segments() == 1) {
				// people
				$data = $this->SeoDB->getRootBuckets(1);
				$data["states"] = $states;
				$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs(null, null, 1, null, null);
				if (empty($data["buckets"])) show_404();
				$this->load->view("abc_cube_1", $data);
			} else if ($this->uri->total_segments() == 2 && (string)$this->uri->segment(2) === "generatesitemap") {
				// trigger full sitemap generation
				$data["root"] = $this->SeoDB->getRootBuckets(1);
				$data["allnames"] = $this->SeoDB->getNames(1);
				$data["allpeople"] = $this->SeoDB->getPeople(1);
				$this->load->view("sitemap_index", $data);
			} else if ($this->uri->total_segments() == 2 && (string)$this->uri->segment(2) === "sitemap-index.xml") {
				//passthru to generated XML sitemap files
				$this->output->set_content_type('application/xml');
				$this->load->file(APPPATH . "views/sitemaps/sitemap-index.xml");
			} else if ($this->uri->total_segments() == 2 && (string)$this->uri->segment(2) === "sitemap.xml") {
				//passthru to generated XML sitemap files
				$this->output->set_content_type('application/xml');
				$this->load->file(APPPATH . "views/sitemaps/sitemap.xml");
			} else if ($this->uri->total_segments() == 2 && (strpos((string)$this->uri->segment(2), "sitemap-")) !== false) {
				//passthru to generated XML sitemap files
				$smindex = substr($this->uri->segment(2), strpos($this->uri->segment(2), "-") + 1, -4);
				if (is_numeric($smindex)) {
					$this->output->set_content_type('application/xml');
					$this->load->file(APPPATH . "views/sitemaps/sitemap-" . $smindex . ".xml");
				}
			} else if ($this->uri->total_segments() == 2 && (string)$this->uri->segment(2) === "timed") {
				// people
				$data = $this->SeoDB->getRootBuckets(1);
				$data["states"] = $states;
				$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs(null, null, 1, null, null);
				if (empty($data["buckets"])) show_404();
				$this->load->view("timed_abc_cube_1", $data);
			} else if ($this->uri->total_segments() == 2 && is_numeric($this->uri->segment(2))) {
				// people/X
				$hasChildren = $this->SeoDB->getXHasChildren(1, (int)$this->uri->segment(2));
				if ($hasChildren == 1) {
					$data = $this->SeoDB->getXBuckets(1, (int)$this->uri->segment(2));
					$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(2), null, 1, null, null);
					if (empty($data["buckets"])) show_404();
					$this->load->view("abc_cube_2", $data);
				} else {
					$data = $this->SeoDB->getXNames(1, (int)$this->uri->segment(2));
					$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(2), null, 1, null, null);
					if (empty($data["buckets"])) show_404();
					$this->load->view("abc_cube_3", $data);
				}
			} else if ($this->uri->total_segments() == 3 && is_numeric($this->uri->segment(2)) && is_numeric($this->uri->segment(3))) {
				// people/X/Y
				$data = $this->SeoDB->getXYNames(1, (int)$this->uri->segment(2), (int)$this->uri->segment(3));
				$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(2), (int)$this->uri->segment(3), 1, null, null);
				if (empty($data["buckets"])) show_404();
				$this->load->view("abc_cube_3", $data);
			} else if (strstr($this->uri->segment(2), "-")) {
				// people/name
				$name = $this->SeoDB->getNameParts($this->uri->segment(2));
				if (empty($name)) {
					echo "no name";
					show_404();
				} else if ($this->uri->total_segments() == 2 && !empty($name["id"])) {
					$data["profile"] = $this->SeoDB->getProfile($name["fn"], $name["mn"], $name["ln"], $name["id"]);

					if (empty($data["profile"])) {
						echo "no profile";
						show_404();
					}

					if (!empty($data["profile"]["redirect"])) {
						$this->load->helper('url');
						redirect($data["profile"]["redirect"], "redirect", 301);
					}

					$data["next"] = $this->SeoDB->getNextProfile($name["fn"], $name["mn"], $name["ln"], $name["id"], 1);
					$data["prev"] = $this->SeoDB->getPrevProfile($name["fn"], $name["mn"], $name["ln"], $name["id"], 1);
					$data["breadcrumbs"] = $this->SeoDB->getProfileBreadcrumbs($name, $data["profile"]);
					if (empty($data["profile"])) show_404();
					$this->load->view("profile", $data);
				} else if ($this->uri->total_segments() == 3 && is_numeric($this->uri->segment(3))) {
					// NAME/X
					$data["people"] = $this->SeoDB->getXNameBuckets(1, $this->uri->segment(2), $name["fn"], $name["mn"], $name["ln"]);
					$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, 1, null, null, $this->uri->segment(2));
					if (empty($data["people"])) show_404();
					$this->load->view("name_bucket", $data);
				} else if ($this->uri->total_segments() == 2) {
					$personCount = $this->SeoDB->getNameCount($name["fn"], $name["ln"], $name["mn"], 1);

					if ($personCount == 0) {
						show_404();
					} else if ($personCount == 1) {
						$data["profile"] = $this->SeoDB->getProfile($name["fn"], $name["mn"], $name["ln"], "");
						if (!empty($data["profile"]["redirect"])) {
							$this->load->helper('url');
							redirect($data["profile"]["redirect"], "redirect", 301);
						}
						$data["breadcrumbs"] = $this->SeoDB->getProfileBreadcrumbs($name, $data["profile"]);
						$this->load->view("profile", $data);
					} else {
						// print('hello');
						$data["name"] = $name;
						$data["people"] = $this->SeoDB->get100People($name["fn"], $name["mn"], $name["ln"], 1);

						// $peeps = $this->SeoDB->get100People($name["fn"], $name["mn"], $name["ln"], 1);
						$prom = array_shift($data["people"]);
						// $data["prominent"] = $prom;
						if (!empty($prom["id"])) {
							$data["profile"] = $this->SeoDB->getProfile($prom["firstname1"], $prom["middlename1"], $prom["lastname1"], $prom["id"]);
						} else {

						}

						$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, 1, null, null);
						if ($personCount > 100) {
							$data["buckets"] = $this->SeoDB->getNameBuckets($name["fn"], $name["mn"], $name["ln"], 1);
							if (empty($name["mn"])) {
								$data["states"] = $this->SeoDB->getNameStates($name["fn"], $name["ln"], $states);
								$data["middles"] = $this->SeoDB->get20MiddleNames($name["fn"], $name["ln"], 1);
								$this->load->view("people_gt100_wmas", $data);
							} else {
								$this->load->view("people_gt100", $data);
							}
						} else {
							$this->load->view("people", $data);
						}
					}
				} else {
					show_404();
				}
			} else {
				show_404();
			}
		}	else {
			show_404();
		}
		/* else if (in_array($this->uri->segment(1), $states)) {
			if ($this->uri->total_segments() == 1) {
				// STATE
				$data["state"] = $this->uri->segment(1);
				$state = array_search($this->uri->segment(1), $states);
				$data["breadcrumbs"] = $this->SeoDB->getLocationBreadcrumbs($data["state"], null, null);
				$data["topcities"] = $this->SeoDB->getTopCities($state);
				$data["topnames"] = $this->SeoDB->getTopnames($state);

				$this->load->view("state", $data);
			} else if ($this->uri->total_segments() > 1) {
				$location = array_search($this->uri->segment(1), $states);
				$data["state"] = $this->uri->segment(1);
				$cityLocation = $this->SeoDB->getLocation($location, $this->uri->segment(2));

				if (!empty($cityLocation)) {
					$location = $cityLocation;
					$data["city"] = $this->uri->segment(2);
				}

				if ($this->uri->total_segments() == 2 AND $this->uri->segment(2) == "profiles") {
					// STATE/PROFILES
					$data = array_merge($data, $this->SeoDB->getRootBuckets($location));
					$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs(null, null, $location, $data["state"], null);
					if (empty($data["buckets"])) show_404();
					$this->load->view("state_cube_1", $data);
				} else if ($this->uri->total_segments() == 2 AND $this->uri->segment(2) == "cities") {
					// STATE/CITIES
					$data["cities"] = $this->SeoDB->getCities($location);
					$data["breadcrumbs"] = $this->SeoDB->getLocationBreadcrumbs($data["state"], null, "Cities");
					if (empty($data["cities"])) show_404();
					$this->load->view("state_cities", $data);
				} else if ($this->uri->total_segments() == 2 AND is_numeric($this->uri->segment(2))) {
					// STATE/X
					$data = array_merge($data, $this->SeoDB->getXBuckets($location, (int)$this->uri->segment(2)));
					$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(2), null, $location, $data["state"], null);
					if (empty($data["buckets"])) show_404();
					$this->load->view("state_cube_2", $data);
				} else if ($this->uri->total_segments() == 2 AND empty($data["city"])) {
					// STATE/NAME
					$name = $this->SeoDB->getNameParts($this->uri->segment(2));
					if (empty($name)) {
						show_404();
					} else {
						$data["name"] = $name;
						$personCount = $this->SeoDB->getNameCount($name["fn"], $name["ln"], $name["mn"], $location);
						if ($personCount == 0) {
							show_404();
						} else if ($personCount <= 100) {
							$data["people"] = $this->SeoDB->get100People($name["fn"], $name["mn"], $name["ln"], $location);
							$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, $location, $data["state"], null);
							$this->load->view("people", $data);
						} else {
							$data["people"] = $this->SeoDB->get100People($name["fn"], $name["mn"], $name["ln"], $location);
							$data["buckets"] = $this->SeoDB->getNameBuckets($name["fn"], $name["mn"], $name["ln"], $location);
							$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, $location, $data["state"], null);
							$this->load->view("people_gt100", $data);
						}
					}
				} else if ($this->uri->total_segments() == 2 AND !empty($data["city"])) {
					// STATE/CITY
					$data["topnames"] = $this->SeoDB->getTopnames($location);
					$data["breadcrumbs"] = $this->SeoDB->getLocationBreadcrumbs($data["state"], $data["city"], null);
					$this->load->view("city", $data);
				} else if ($this->uri->total_segments() == 3 && is_numeric($this->uri->segment(2)) && is_numeric($this->uri->segment(3))) {
					// STATE/X/Y
					$data = array_merge($data, $this->SeoDB->getXYNames($location, (int)$this->uri->segment(2), (int)$this->uri->segment(3)));
					$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(2), (int)$this->uri->segment(3), $location, $data["state"], null);
					if (empty($data["buckets"])) show_404();
					$this->load->view("state_cube_3", $data);
				} else if ($this->uri->total_segments() == 3 && empty($data["city"]) && is_numeric($this->uri->segment(3))) {
					// STATE/NAME/X
					$name = $this->SeoDB->getNameParts($this->uri->segment(2));
					$data["people"] = $this->SeoDB->getXNameBuckets($location, $this->uri->segment(3), $name["fn"], $name["mn"], $name["ln"]);
					$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, $location, $data["state"], null, $this->uri->segment(3));
					if (empty($data["people"])) show_404();
					$this->load->view("name_bucket", $data);
				} else if ($this->uri->total_segments() == 3 && !empty($data["city"]) && ($this->uri->segment(3) == "profiles" || is_numeric($this->uri->segment(3)))) {
					$hasChildren = $this->SeoDB->getRootHasChildren($location);
					if ($hasChildren == 0) {
						// STATE/CITY/PROFILES
						$perPage = 100;
						if ($this->uri->segment(3) == "profiles") {
							$page = 1;
						} else {
							$page = $this->uri->segment(3);
						}
						$totalCount = $this->SeoDB->getMaxNameOrder($location);
						$data["total"] = $totalCount;
						$data["min"] = (($page-1)*100)+1;
						$data["max"] = $page*100;
						$data["pages"] = ceil($totalCount/$perPage);
						$data["page"] = $page;
						$data = array_merge($data, $this->SeoDB->getPagedNames($location, ($page-1)*100, $page*100));
						$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(3), null, $location, $data["state"], $data["city"]);
						if (empty($data["buckets"])) show_404();
						$this->load->view("city_names", $data);
					} else {
						if ($this->uri->segment(3) == "profiles") {
							// STATE/CITY/PROFILES
							$data = array_merge($data, $this->SeoDB->getRootBuckets($location));
							$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs(null, null, $location, $data["state"], $data["city"]);
							if (empty($data["buckets"])) show_404();
							$this->load->view("city_cube_1", $data);
						} else if (is_numeric($this->uri->segment(3))) {
							// STATE/CITY/X
							$hasChildren = $this->SeoDB->getRootHasChildren($location, (int)$this->uri->segment(3));
							if ($hasChildren == 1) {
								$data = array_merge($data, $this->SeoDB->getXBuckets($location, (int)$this->uri->segment(3)));
								$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(3), null, $location, $data["state"], $data["city"]);
								if (empty($data["buckets"])) show_404();
								$this->load->view("city_cube_2", $data);
							} else {
								$data = array_merge($this->SeoDB->getXNames($location, (int)$this->uri->segment(3)));
								$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(3), null, $location, $data["state"], $data["city"]);
								if (empty($data["buckets"])) show_404();
								$this->load->view("city_cube_3", $data);
							}
						}
					}
				} else if ($this->uri->total_segments() == 3 && !empty($data["city"])) {
					// STATE/CITY/NAME
					$name = $this->SeoDB->getNameParts($this->uri->segment(3));
					if (empty($name)) {
						show_404();
					} else {
						$data["name"] = $name;
						$personCount = $this->SeoDB->getNameCount($name["fn"], $name["ln"], $name["mn"], $location);
						if ($personCount == 0) {
							show_404();
						} else if ($personCount <= 100) {
							$data["people"] = $this->SeoDB->get100People($name["fn"], $name["mn"], $name["ln"], $location);
							$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, $location, $data["state"], $data["city"]);
							$this->load->view("people", $data);
						} else {
							$data["people"] = $this->SeoDB->get100People($name["fn"], $name["mn"], $name["ln"], $location);
							$data["buckets"] = $this->SeoDB->getNameBuckets($name["fn"], $name["mn"], $name["ln"], $location);
							$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, $location, $data["state"], $data["city"]);
							$this->load->view("people_gt100", $data);
						}
					}
				} else if ($this->uri->total_segments() == 4 && !empty($data["city"]) && is_numeric($this->uri->segment(3)) && is_numeric($this->uri->segment(4))) {
					// STATE/CITY/X/Y
					$data = array_merge($data, $this->SeoDB->getXYNames($location, (int)$this->uri->segment(3), (int)$this->uri->segment(4)));
					$data["breadcrumbs"] = $this->SeoDB->getBucketBreadcrumbs((int)$this->uri->segment(3), (int)$this->uri->segment(4), $location, $data["state"], $data["city"]);
					if (empty($data["buckets"])) show_404();
					$this->load->view("city_cube_3", $data);
				} else if ($this->uri->total_segments() == 4 && !empty($data["city"]) && is_numeric($this->uri->segment(4))) {
					// STATE/CITY/NAME/X
					$name = $this->SeoDB->getNameParts($this->uri->segment(3));
					$data["people"] = $this->SeoDB->getXNameBuckets($location, $this->uri->segment(4), $name["fn"], $name["mn"], $name["ln"]);
					$data["breadcrumbs"] = $this->SeoDB->getPeopleBreadcrumbs($name, $location, $data["state"], $data["city"], $this->uri->segment(4));
					if (empty($data["people"])) show_404();
					$this->load->view("name_bucket", $data);
				} else {
					show_404();
				}
			}
		} */
		$this->benchmark->mark('end');
	}
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
