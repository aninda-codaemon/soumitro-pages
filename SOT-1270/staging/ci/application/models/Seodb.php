<?php
class SeoDB extends CI_Model {

	function __construct() {
		// Call the Model constructor
		parent::__construct();
	}

	function getRootBuckets ($location) {
		$sql = "SELECT `lowid`, `lowlast`, `lowfirst`, `lowmiddle`, `highid`, `highlast`, `highfirst`, `highmiddle`, `x` FROM `buckets` WHERE `location`=? AND `x` IS NOT NULL AND `y` IS NULL";
		$query = $this->db->query($sql, array($location));
		$data["buckets"] = $query->result_array();
		$data["lowfirst"] = $data["buckets"][0]["lowfirst"];
		$data["lowlast"] = $data["buckets"][0]["lowlast"];
		$data["highfirst"] = $data["buckets"][(count($data["buckets"])-1)]["highfirst"];
		$data["highlast"] = $data["buckets"][((count($data["buckets"])-1))]["highlast"];
		return $data;
	}

	function getXBuckets ($location, $x) {
		$sql = "SELECT `lowid`, `lowlast`, `lowfirst`, `lowmiddle`, `highid`, `highlast`, `highfirst`, `highmiddle`, `x`, `y` FROM `buckets` WHERE `location`=? AND `x` = ? AND `y` IS NOT NULL";
		$query = $this->db->query($sql, array($location, $x));
		$data["buckets"] = $query->result_array();
		$data["lowfirst"] = $data["buckets"][0]["lowfirst"];
		$data["lowlast"] = $data["buckets"][0]["lowlast"];
		$data["highfirst"] = $data["buckets"][(count($data["buckets"])-1)]["highfirst"];
		$data["highlast"] = $data["buckets"][((count($data["buckets"])-1))]["highlast"];
		return $data;
	}

	function getXYNames ($location, $x, $y) {
		$sql = "SELECT `name`.`last`, `name`.`first`, `name`.`middle` FROM `name_location` LEFT JOIN `name` ON `name`.`id` = `name_location`.`name` WHERE `location`=? AND `name_location`.`name` >= (SELECT lowid FROM `buckets` WHERE `location`=? AND `x`=? AND `y`=?) AND `name_location`.`name` <= (SELECT highid FROM `buckets` WHERE `location`=? AND `x`=? AND `y`=?) AND `name_location`.`parent`=0";
		$query = $this->db->query($sql, array($location, $location, $x, $y, $location, $x, $y));
		$data["buckets"] = $query->result_array();
		$data["lowfirst"] = $data["buckets"][0]["first"];
		$data["lowlast"] = $data["buckets"][0]["last"];
		$data["highfirst"] = $data["buckets"][(count($data["buckets"])-1)]["first"];
		$data["highlast"] = $data["buckets"][((count($data["buckets"])-1))]["last"];
		return $data;
	}

	function getNameCount ($fn, $ln, $mn, $location) {
		$fn = str_replace("_", " ", $fn);
		$mn = str_replace("_", " ", $mn);
		$ln = str_replace("_", " ", $ln);

		$sql = "select personcount from name_location left join name on name_location.name=name.id where name.first=? and name.last=? and name.middle=? and name_location.location=?";
		$query = $this->db->query($sql, array($fn, $ln, $mn, $location));
		$personCountResult = $query->row_array();
		return $personCountResult["personcount"];
	}

	function getXNames ($location, $x) {
		$sql = "SELECT `name`.`last`, `name`.`first`, `name`.`middle` FROM `name_location` LEFT JOIN `name` ON `name`.`id` = `name_location`.`name` WHERE `location`=? AND `name_location`.`name` >= (SELECT lowid FROM `buckets` WHERE `location`=? AND `x`=? AND `y` IS NULL) AND `name_location`.`name` <= (SELECT highid FROM `buckets` WHERE `location`=? AND `x`=? AND `y` IS NULL) AND `name_location`.`parent`=0";
		$query = $this->db->query($sql, array($location, $location, $x, $location, $x));
		$data["buckets"] = $query->result_array();
		$data["lowfirst"] = $data["buckets"][0]["first"];
		$data["lowlast"] = $data["buckets"][0]["last"];
		$data["highfirst"] = $data["buckets"][(count($data["buckets"])-1)]["first"];
		$data["highlast"] = $data["buckets"][((count($data["buckets"])-1))]["last"];
		return $data;
	}

	function getNames ($location) {
		$sql = "SELECT `name`.`last`, `name`.`first`, `name`.`middle` FROM `name_location` LEFT JOIN `name` ON `name`.`id` = `name_location`.`name` WHERE `location`=? AND `name_location`.`parent`=0";
		$query = $this->db->query($sql, array($location));
		$data["buckets"] = $query->result_array();
		$data["lowfirst"] = $data["buckets"][0]["first"];
		$data["lowlast"] = $data["buckets"][0]["last"];
		$data["highfirst"] = $data["buckets"][(count($data["buckets"])-1)]["first"];
		$data["highlast"] = $data["buckets"][((count($data["buckets"])-1))]["last"];
		return $data;
	}

	function getPagedNames ($location, $low, $high) {
		$sql = "SELECT `name`.`last`, `name`.`first`, `name`.`middle` FROM `name_location` LEFT JOIN `name` ON `name`.`id` = `name_location`.`name` WHERE `location`=? AND `name_location`.`nameorder` > ? AND `name_location`.`nameorder` <= ? AND `name_location`.`parent`=0";
		$query = $this->db->query($sql, array($location, $low, $high));
		$data["buckets"] = $query->result_array();
		$data["lowfirst"] = $data["buckets"][0]["first"];
		$data["lowlast"] = $data["buckets"][0]["last"];
		$data["highfirst"] = $data["buckets"][(count($data["buckets"])-1)]["first"];
		$data["highlast"] = $data["buckets"][((count($data["buckets"])-1))]["last"];
		return $data;
	}

	function getRootHasChildren ($location) {
		$sql = "SELECT `haschildren` FROM `buckets` WHERE `location`=? AND `x` IS NULL AND `y` IS NULL";
		echo $sql . $location;
		exit;
		$query = $this->db->query($sql, array($location));
		$hasChildrenResult = $query->row_array();
		return $hasChildrenResult["haschildren"];
	}

	function getXHasChildren ($location, $x) {
		$sql = "SELECT `haschildren` FROM `buckets` WHERE `location`=? AND `x` = ? AND `y` IS NULL";
		$query = $this->db->query($sql, array($location, $x));
		$hasChildrenResult = $query->row_array();
		return $hasChildrenResult["haschildren"];
	}

	function getMaxNameOrder ($location) {
		$sql = "SELECT max(nameorder) as totalCount FROM name_location WHERE location=? and parent=0";
		$query = $this->db->query($sql, array($location));
		$totalCountResult = $query->row_array();
		return $totalCountResult["totalCount"];
	}

	function getCities ($location) {
		$sql = "SELECT `city`, `personcount` FROM `location` WHERE `parent`=? AND `personcount` > 0 ORDER BY `city` ASC";
		$query = $this->db->query($sql, array($location));
		return $query->result_array();
	}

	function getTopCities ($location) {
		$sql = "SELECT `id`, `city`, `personcount` FROM `location` WHERE `parent`=? ORDER BY `personcount` DESC LIMIT 10";
		$query = $this->db->query($sql, array($location));
		$data = $query->result_array();
		return $data;
	}

	function getTopNames ($location) {
		$sql = "SELECT `name`.`last`, `name`.`first`, `name`.`middle`, `name_location`.`personcount` FROM `name_location` LEFT JOIN `name` ON `name_location`.`name`=`name`.`id` WHERE `location`=? AND `name_location`.`parent`=0 ORDER BY `personcount` DESC LIMIT 50";
		$query = $this->db->query($sql, array($location));
		$data = $query->result_array();
		return $data;
	}

	function getLocation ($state, $city) {
		$sql = "SELECT `id` FROM `location` WHERE `city`=? AND `parent`=?";
		$city = str_replace("-", " ", $city);
		$query = $this->db->query($sql, array($city, $state));
		$locationResult = $query->row_array();
		return $locationResult["id"];
	}

	function getNameBuckets ($fn, $mn, $ln, $location) {
		$sql = "SELECT * FROM name_buckets WHERE name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) AND location=?";
		$query = $this->db->query($sql, array($fn, $mn, $ln, $location));
		$buckets = $query->result_array();
		$this->load->helper('url');
		for ($xx = 0; $xx < count($buckets); $xx++) {
			$buckets[$xx]["url"] = current_url() . "/" . $buckets[$xx]["x"];
		}
		return $buckets;
	}

	function getXNameBuckets ($location, $x, $fn, $mn, $ln) {
		$sql = "SELECT * FROM people WHERE id IN (SELECT id FROM id_name_location WHERE location=? AND name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) AND id >= (SELECT lowid FROM name_buckets WHERE location=? AND name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) AND x=?) AND id <= (SELECT highid FROM name_buckets WHERE location=? AND name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) AND x=?)) AND active=1";
		$query = $this->db->query($sql, array($location, $fn, $mn, $ln, $location, $fn, $mn, $ln, $x, $location, $fn, $mn, $ln, $x));
		$people = $query->result_array();
		for ($xx = 0; $xx < count($people); $xx++) {
			$people[$xx]["age"] = $this->getAge($people[$xx]["dateofbirth"]);
			$people[$xx]["url"] = $this->getProfileURL($people[$xx]["firstname1"], $people[$xx]["middlename1"], $people[$xx]["lastname1"], $people[$xx]["id"], $people[$xx]["firstlastcount"], $people[$xx]["firstmiddlelastcount"]);
		}
		return $people;
	}

	function get20MiddleNames ($fn, $ln) {
		$middles = array();
		$sql = "SELECT name.middle FROM name LEFT JOIN name_location ON name.id=name_location.name WHERE location=1 AND name_location.parent=(SELECT id FROM name WHERE first=? AND middle='' AND last=?) ORDER BY personcount DESC LIMIT 20";
		$query = $this->db->query($sql, array($fn, $ln));
		$activeMiddleNames = $query->result_array();
		foreach ($activeMiddleNames as $mn) {
			$url = "/" . $fn . "-" . $mn["middle"] . "-" . $ln;
			$name = $fn . " " . $mn["middle"] . " " . $ln;
			$middles[] = array("url" => $url, "name" => $name);
		}
		return $middles;
	}

	function getNameStates ($fn, $ln, $stateNames) {
		$states = array();
		$sql = "SELECT location FROM name_location WHERE location BETWEEN 2 AND 52 AND name=(SELECT id FROM name WHERE first=? AND middle='' AND last=?)";
		$query = $this->db->query($sql, array($fn, $ln));
		$activeStates = $query->result_array();
		foreach ($activeStates as $state) {
			$url = "/" . $stateNames[($state["location"])] . "/" . $fn . "-" . $ln;
			$name = ucwords(str_replace("-", " ", $stateNames[($state["location"])]));
			$states[] = array("url" => $url, "name" => $name);
		}
		return $states;
	}

	function get100People ($fn, $mn, $ln, $location) {
		$sql = "SELECT * FROM people WHERE ID IN (select id_name_location.id FROM id_name_location left join name on name.id=id_name_location.name where name.first=? and name.last=? and name.middle=? and id_name_location.location=? and id_name_location.nameorder <= 100) and active=1 order by prominent DESC";
		$query = $this->db->query($sql, array($fn, $ln, $mn, $location));
		$people = $query->result_array();
		for ($xx = 0; $xx < count($people); $xx++) {

			$people[$xx]["age"] = $this->getAge($people[$xx]["dateofbirth"]);
			$people[$xx]["url"] = $this->getProfileURL($people[$xx]["firstname1"], $people[$xx]["middlename1"], $people[$xx]["lastname1"], $people[$xx]["id"], $people[$xx]["firstlastcount"], $people[$xx]["firstmiddlelastcount"]);
		}
		return $people;
	}

	function getPeople ($location) {
		$sql = "SELECT * FROM people WHERE ID IN (select id_name_location.id FROM id_name_location where id_name_location.location=?) and active=1";
		// $sql2 = "SELECT * FROM people WHERE ID IN (select id_name_location.id FROM id_name_location left join name on name.id=id_name_location.name where name.first=? and name.last=? and name.middle=? and id_name_location.location=? and id_name_location.nameorder <= 100) and active=1";
		$query = $this->db->query($sql, $location);
		$people = $query->result_array();
		for ($xx = 0; $xx < count($people); $xx++) {

			$people[$xx]["age"] = $this->getAge($people[$xx]["dateofbirth"]);
			$people[$xx]["url"] = $this->getProfileURL($people[$xx]["firstname1"], $people[$xx]["middlename1"], $people[$xx]["lastname1"], $people[$xx]["id"], $people[$xx]["firstlastcount"], $people[$xx]["firstmiddlelastcount"]);
		}
		return $people;

		// $data["buckets"] = $query->result_array();
		// $data["lowfirst"] = $data["buckets"][0]["first"];
		// $data["lowlast"] = $data["buckets"][0]["last"];
		// $data["highfirst"] = $data["buckets"][(count($data["buckets"])-1)]["first"];
		// $data["highlast"] = $data["buckets"][((count($data["buckets"])-1))]["last"];
		// return $data;
	}

	function getProfile ($first, $middle, $last, $id) {
		// $first = str_replace("_", " ", $first);
		// $middle = str_replace("_", " ", $middle);
		// $last = str_replace("_", " ", $last);

		$profile = array();

		if (empty($id)) {
			$sql = "SELECT * FROM people WHERE ID IN (select id_name_location.id FROM id_name_location left join name on name.id=id_name_location.name where name.first=? and name.last=? and name.middle=? and id_name_location.location=?) and active=1";
			$query = $this->db->query($sql, array($first, $last, $middle, 1));
		} else {
			$sql = "SELECT * FROM people WHERE id=? AND firstname1=? and middlename1=? and lastname1=? and active=1";
			$query = $this->db->query($sql, array($id, $first, $middle, $last));
		}

		if ($query->num_rows() <> 1) {
			return;
		} else {
			$personArray = $query->row_array();

			$sql = "SELECT * FROM people WHERE ID IN (SELECT relative FROM id_relative WHERE ID=? ORDER BY position)";
			$query = $this->db->query($sql, array($personArray["id"]));
			$relativeArray = $query->result_array();

			for ($xx = 0; $xx < count($relativeArray); $xx++) {
				$relativeArray[$xx]["url"] = $this->getProfileURL($relativeArray[$xx]["firstname1"], $relativeArray[$xx]["middlename1"], $relativeArray[$xx]["lastname1"], $relativeArray[$xx]["id"], $relativeArray[$xx]["firstlastcount"], $relativeArray[$xx]["firstmiddlelastcount"]);
			}

			if (!empty($id) && $personArray["firstlastcount"] == 1) $profile["redirect"] = "/" . $personArray["firstname1"] . "-" . $personArray["lastname1"];
			if (!empty($id) && $personArray["firstmiddlelastcount"] == 1 && !empty($personArray["middlename1"])) $profile["redirect"] = "/" . $personArray["firstname1"] . "-" . $personArray["middlename1"] . "-" . $personArray["lastname1"];

			$profile["id"] = $personArray["id"];
			$profile["name"][0]["fn"] = $personArray["firstname1"];
			$profile["name"][0]["mn"] = $personArray["middlename1"];
			$profile["name"][0]["ln"] = $personArray["lastname1"];
			$profile["name"][1]["fn"] = $personArray["firstname2"];
			$profile["name"][1]["mn"] = $personArray["middlename2"];
			$profile["name"][1]["ln"] = $personArray["lastname2"];
			$profile["name"][2]["fn"] = $personArray["firstname3"];
			$profile["name"][2]["mn"] = $personArray["middlename3"];
			$profile["name"][2]["ln"] = $personArray["lastname3"];
			$profile["dateofbirth"][0] = $personArray["dateofbirth"];
			$profile["age"][0] = $this->getAge($personArray["dateofbirth"]);
			$profile["phone"][0] = $personArray["phone1"];
			$profile["phone"][1] = $personArray["phone2"];
			$profile["phone"][2] = $personArray["phone3"];
			$profile["address"][0]["street"] = $personArray["streetaddress1"];
			$profile["address"][0]["city"] = $personArray["city1"];
			$profile["address"][0]["state"] = $personArray["state1"];
			$profile["address"][0]["zip"] = sprintf("%05d", $personArray["zip1"]);
			$profile["address"][0]["zip4"] = sprintf("%04d",$personArray["zip41"]);
			$profile["address"][1]["street"] = $personArray["streetaddress2"];
			$profile["address"][1]["city"] = $personArray["city2"];
			$profile["address"][1]["state"] = $personArray["state2"];
			$profile["address"][1]["zip"] = sprintf("%05d",$personArray["zip2"]);
			$profile["address"][1]["zip4"] = sprintf("%04d",$personArray["zip42"]);
			$profile["address"][2]["street"] = $personArray["streetaddress3"];
			$profile["address"][2]["city"] = $personArray["city3"];
			$profile["address"][2]["state"] = $personArray["state3"];
			$profile["address"][2]["zip"] = sprintf("%05d",$personArray["zip3"]);
			$profile["address"][2]["zip4"] = sprintf("%04d",$personArray["zip43"]);
			$profile["cityst"][0]["city"] = $personArray["ucity1"];
			$profile["cityst"][0]["state"] = $personArray["ustate1"];
			$profile["cityst"][1]["city"] = $personArray["ucity2"];
			$profile["cityst"][1]["state"] = $personArray["ustate2"];
			$profile["cityst"][2]["city"] = $personArray["ucity3"];
			$profile["cityst"][2]["state"] = $personArray["ustate3"];
			$profile["relatives"] = $relativeArray;
			$profile["prominent"] = $personArray["prominent"];
			return $profile;
		}
	}

	function getProfileURL ($fn, $mn, $ln, $id, $flc, $fmlc) {
		if ($flc== 1) {
			$url = $fn . "-" . $ln;
		} else if ($fmlc == 1 && !empty($mn)) {
			$url = $fn . "-" . $mn . "-" . $ln;
		} else if (empty($mn)) {
			$url = $fn . "-" . $ln . "-" . $id;
		} else {
			$url = $fn . "-" . $mn . "-" . $ln . "-" . $id;
		}
		return strtolower($url);
	}

	function getNextProfile ($fn, $mn, $ln, $id, $location) {
		$sql = "select * from people where id in (select id from id_name_location where name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) and location=? and nameorder=(SELECT nameorder FROM id_name_location WHERE id=? AND name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) AND location=?)+1)";
		$query = $this->db->query($sql, array($fn, $mn, $ln, $location, $id, $fn, $mn, $ln, $location));
		$profile = $query->row_array();
		if (empty($profile["id"])) return;
		$profile["age"] = $this->getAge($profile["dateofbirth"]);
		$profile["url"] = $this->getProfileURL($profile["firstname1"], $profile["middlename1"], $profile["lastname1"], $profile["id"], $profile["firstlastcount"], $profile["firstmiddlelastcount"]);
		return $profile;
	}

	function getPrevProfile ($fn, $mn, $ln, $id, $location) {
		$sql = "select * from people where id in (select id from id_name_location where name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) and location=? and nameorder=(SELECT nameorder FROM id_name_location WHERE id=? AND name=(SELECT id FROM name WHERE first=? AND middle=? AND last=?) AND location=?)-1)";
		$query = $this->db->query($sql, array($fn, $mn, $ln, $location, $id, $fn, $mn, $ln, $location));
		$profile = $query->row_array();
		if (empty($profile["id"])) return;
		$profile["age"] = $this->getAge($profile["dateofbirth"]);
		$profile["url"] = $this->getProfileURL($profile["firstname1"], $profile["middlename1"], $profile["lastname1"], $profile["id"], $profile["firstlastcount"], $profile["firstmiddlelastcount"]);
		return $profile;
	}

	function getAge ($date) {
		if (strlen($date) == 8) {
			$year = substr($date, 0 ,4);
			$month = substr($date, 4, 2);
			$day = substr($date, 6, 2);
			$age = (date("md", date("U", mktime(0, 0, 0, $month, $day, $year))) > date("md") ? ((date("Y") - $year) - 1) : (date("Y") - $year));
			return $age;
		} else {
			return;
		}
	}

	function getNameParts ($nameField) {
		$nameArray = explode("-", $nameField);
		$name = array();
		if (count($nameArray) == 2) {
			$name["fn"] = $nameArray[0];
			$name["ln"] = $nameArray[1];
			$name["mn"] = "";
			$name["id"] = null;
		} else if (count($nameArray) == 4 && is_numeric($nameArray[3])) {
			$name["fn"] = $nameArray[0];
			$name["mn"] = $nameArray[1];
			$name["ln"] = $nameArray[2];
			$name["id"] = $nameArray[3];
		} else if (count($nameArray) == 3 && is_numeric($nameArray[2])) {
			$name["fn"] = $nameArray[0];
			$name["ln"] = $nameArray[1];
			$name["mn"] = "";
			$name["id"] = $nameArray[2];
		} else if (count($nameArray) == 3) {
			$name["fn"] = $nameArray[0];
			$name["mn"] = $nameArray[1];
			$name["ln"] = $nameArray[2];
			$name["id"] = null;
		} else {
			$name = null;
		}
		return str_replace("+", "-", $name);
	}

	function getNameXY ($fn, $ln, $location) {
		//$sql = "select x,y,lowfirst,lowmiddle,lowlast,highfirst,highmiddle,highlast from buckets where location=? and (select id from name where first=? and middle='' and last=?) >= lowid and (select id from name where first=? and middle='' and last=?) <= highid order by x, y";
		//$query = $this->db->query($sql, array($location, $fn, $ln, $fn, $ln));
		$sql = "select x,y,lowfirst,lowmiddle,lowlast,highfirst,highmiddle,highlast from buckets, (select id from name where first=? and middle='' and last=?) n1 where location=? and lowid <= n1.id and highid >= n1.id order by x, y";
		$query = $this->db->query($sql, array($fn, $ln, $location));
		if ($query->num_rows() == 0) {
			$sql = "select nameorder from name_location where location=? and name=(select id from name where first=? and middle='' and last=?)";
			$query = $this->db->query($sql, array($location, $fn, $ln));
			$nameorder = $query->row_array();
			$x = floor (($nameorder["nameorder"] - 0.5)/100);
			$xBucket = array ("title" => $x, $url => $x);
			$yBucket = null;
		} else {
			$xArray = $query->row_array(0);
			//$xBucket = array ("title" => $xArray["lowlast"] . ", " . $xArray["lowfirst"] . " - " . $xArray["highlast"] . ", " . $xArray["highfirst"], "url" => $xArray["x"]);
			//$xBucket = array ("title" => p($xArray["lowfirst"] . " " . $xArray["lowlast"]) . " to " . p($xArray["highfirst"] . " " . $xArray["highlast"]), "url" => $xArray["x"]);
			$xBucket = array ("title" => p($xArray["lowlast"]) . " to " . p($xArray["highlast"]), "url" => $xArray["x"]);
			if ($query->num_rows() == 2) {
				$yArray = $query->row_array(1);
				//$yBucket = array ("title" => $yArray["lowlast"] . ", " . $yArray["lowfirst"] . " - " . $yArray["highlast"] . ", " . $yArray["highfirst"], "url" => $yArray["x"] . "/" . $yArray["y"]);
				// $yBucket = array ("title" => p($yArray["lowfirst"] . " " . $yArray["lowlast"]) . " to " . p($yArray["highfirst"] . " " . $yArray["highlast"]), "url" => $yArray["x"] . "/" . $yArray["y"]);
				$yBucket = array ("title" => p($yArray["lowlast"]) . " to " . p($yArray["highlast"]), "url" => $yArray["x"] . "/" . $yArray["y"]);
			} else {
				$yBucket = null;
			}
		}
		return array($xBucket, $yBucket);
	}

	function getBucketName ($location, $x, $y) {
		$sql = "select lowfirst,lowmiddle,lowlast,highfirst,highmiddle,highlast from buckets where location=? and x=?";
		if (empty($y)) {
			$sql .= " and y is null";
			$query = $this->db->query($sql, array($location, $x));
		} else {
			$sql .= " and y=?";
			$query = $this->db->query($sql, array($location, $x, $y));
		}
		$result = $query->row_array();
		//return p($result["lowlast"] . ", " . $result["lowfirst"] . " - " . $result["highlast"] . ", " . $result["highfirst"]);
		// return p($result["lowfirst"] . " " . $result["lowlast"]) . " to " . p($result["highfirst"] . " " . $result["highlast"]);
		return p($result["lowlast"]) . " to " . p($result["highlast"]);
	}

	function getPeopleBreadcrumbs ($name, $location, $state, $city, $x) {
		$homeTitle = "Public Records";
		$doorTitle = "People";
		$profilesTitle = "Profiles";
		$breadcrumbs[] = array();
		$xy = $this->getNameXY($name["fn"], $name["ln"], $location);
		$baseUrl = "/";
		array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
		array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
		if ($location == 1) {
			$subBucketUrl = "people";
			$subUrl = "";
		} else if (empty($city)) {
			$subBucketUrl = $state;
			$subUrl = $subBucketUrl . "/";
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => $baseUrl . $state . "/profiles"));
		} else {
			$subBucketUrl = $state . "/" . $city;
			$subUrl = $subBucketUrl . "/";
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => ul($city), "url" => $baseUrl . $state . "/" . $city));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => $baseUrl . $state . "/" . $city . "/profiles"));
		}

		// X Bucket
		if (!empty($xy[0])) {
			if (!is_numeric($xy[0]["title"]) || $xy[0]["title"] > 1) {
				array_push($breadcrumbs[0], array("title" => $xy[0]["title"], "url" => $baseUrl . $subBucketUrl . "/" . $xy[0]["url"] . "/"));
			}
		}

		// Y Bucket
		if (!empty($xy[1])) {
			array_push($breadcrumbs[0], array("title" => $xy[1]["title"], "url" => $baseUrl . $subBucketUrl . "/" . $xy[1]["url"] . "/"));
		}

		// removed first and middle names from bc except profile level
		if (empty($name["mn"]) && empty($x)) {
			array_push($breadcrumbs[0], array("title" => p($name["fn"] . " " . $name["ln"]), "url" => $baseUrl . $subBucketUrl . "/" . $name["fn"] . "-" . $name["ln"] . "/"));
		} else {
			array_push($breadcrumbs[0], array("title" => p($name["fn"] . " " . $name["ln"]), "url" => $baseUrl . $subUrl . $name["fn"] . "-" . $name["ln"] . "/"));
			if (!empty($name["mn"])) {
				if (empty($x)) {
					array_push($breadcrumbs[0], array("title" => p($name["fn"] . " " . $name["mn"] . " " . $name["ln"]), "url" => ""));
				} else {
					array_push($breadcrumbs[0], array("title" => p($name["fn"] . " " . $name["mn"] . " " . $name["ln"]), "url" => $baseUrl . $subUrl . $name["fn"] . "-" . $name["mn"] . "-" . $name["ln"] . "/"));
				}
			}

			if (!empty($x)) {
				array_push($breadcrumbs[0], array("title" => "Page " . $x, "url" => ""));
			}
		}

		/*
		if (empty($name["mn"]) && empty($x)) {
			array_push($breadcrumbs[0], array("title" => $name["fn"] . " " . $name["ln"], "url" => ""));
		} else {
			array_push($breadcrumbs[0], array("title" => $name["fn"] . " " . $name["ln"], "url" => $baseUrl . $subUrl . $name["fn"] . "-" . $name["ln"]));
			if (!empty($name["mn"])) {
				if (empty($x)) {
					array_push($breadcrumbs[0], array("title" => $name["fn"] . " " . $name["mn"] . " " . $name["ln"], "url" => ""));
				} else {
					array_push($breadcrumbs[0], array("title" => $name["fn"] . " " . $name["mn"] . " " . $name["ln"], "url" => $baseUrl . $subUrl . $name["fn"] . "-" . $name["mn"] . "-" . $name["ln"]));
				}
			}

			if (!empty($x)) {
				array_push($breadcrumbs[0], array("title" => "Page " . $x, "url" => ""));
			}
		}
		*/

		return $breadcrumbs;
	}

	function getBucketBreadcrumbs ($x, $y, $location, $state, $city) {
		$homeTitle = "Public Records";
		$doorTitle = "People";
		$profilesTitle = "Profiles";
		$baseUrl = "/";
		$breadcrumbs[] = array();
		if (empty($city) && empty($state) && empty($x) && empty($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
		} else if (empty($city) && empty($state) && isset($x) && empty($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, null), "url" => $baseUrl . "people/" . $x . "/"));
		} else if (empty($city) && empty($state) && isset($x) && isset($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, null), "url" => $baseUrl . "people/" . $x . "/"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, $y), "url" => $baseUrl . "people/" . $x . "/" . $y . "/"));
		} else if (empty($city) && isset($state) && empty($x) && empty($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => ""));
		} else if (empty($city) && isset($state) && isset($x) && empty($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => $baseUrl . $state . "/profiles"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, null), "url" => ""));
		} else if (empty($city) && isset($state) && isset($x) && isset($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => $baseUrl . $state . "/profiles"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, null), "url" => $baseUrl . "people/" . $x . "/"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, $y), "url" => ""));
		} else if (isset($city) && isset($state) && empty($x) && empty($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => ul($city), "url" => $baseUrl . $state . "/" . $city));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => ""));
		} else if (isset($city) && isset($state) && isset($x) && empty($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => ul($city), "url" => $baseUrl . $state . "/" . $city));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => $baseUrl . $state . "/" . $city . "/profiles"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, null), "url" => $baseUrl . "people/" . $x . "/"));
		} else if (isset($city) && isset($state) && isset($x) && isset($y)) {
			array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
			array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => ul($city), "url" => $baseUrl . $state . "/" . $city));
			array_push($breadcrumbs[0], array("title" => $profilesTitle, "url" => $baseUrl . $state . "/" . $city . "/profiles"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, null), "url" => $baseUrl . $state . "/" . $city . "/" . $x . "/"));
			array_push($breadcrumbs[0], array("title" => $this->getBucketName($location, $x, $y), "url" => $baseUrl . "people/" . $x . "/" . $y . "/"));
		}
		return $breadcrumbs;
	}

	function getLocationBreadcrumbs ($state, $city, $extra) {
		$homeTitle = "Public Records";
		$doorTitle = "People";
		$breadcrumbs[] = array();
		$baseUrl = "/";
		array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
		array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
		if (empty($city) && empty($extra)) {
			$subUrl = $state;
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => ""));
		} else if (empty($city)) {
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => $extra, "url" => ""));
		} else if (empty($extra)) {
			$subUrl = $state . "/" . $city;
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => ul($city), "url" => ""));
		} else {
			array_push($breadcrumbs[0], array("title" => ul($state), "url" => $baseUrl . $state));
			array_push($breadcrumbs[0], array("title" => ul($city), "url" => $baseUrl . $state . "/" . $city));
			array_push($breadcrumbs[0], array("title" => $extra, "url" => ""));
		}
		return $breadcrumbs;
	}

	function getProfileBreadcrumbs ($name, $profile) {
		$homeTitle = "Public Records";
		$doorTitle = "People";
		//$breadcrumbs[0] = array();
		//$breadcrumbs[1] = array();
		$breadcrumbs[] = array();
		$baseUrl = "/";

		$sid = sid(pcs($profile["address"][0]["state"]));
		$state = pcs($profile["address"][0]["state"]);
		$city = $this->getLocation($sid, $profile["address"][0]["city"]);

		$temp = $this->getPeopleBreadcrumbs($name, $city, strtolower(pcs($profile["address"][0]["state"])), $profile["address"][0]["city"]);
		//$breadcrumbs[0] = $temp[0];
		array_push($breadcrumbs[0], array("title" => $homeTitle, "url" => $baseUrl));
		//array_push($breadcrumbs[1], array("title" => $homeTitle, "url" => $baseUrl));
		//array_push($breadcrumbs[2], array("title" => $homeTitle, "url" => $baseUrl));
		array_push($breadcrumbs[0], array("title" => $doorTitle, "url" => $baseUrl . "people/"));
		$xy = $this->getNameXY($name["fn"], $name["ln"], 1);

		// X Bucket
		if (!empty($xy[0])) {
			if (!is_numeric($xy[0]["title"]) || $xy[0]["title"] > 1) {
				array_push($breadcrumbs[0], array("title" => $xy[0]["title"], "url" => $baseUrl . "people/" . $xy[0]["url"] . "/"));
			}
		}

		// Y Bucket
		if (!empty($xy[1])) {
			array_push($breadcrumbs[0], array("title" => $xy[1]["title"], "url" => $baseUrl . "people/" . $xy[1]["url"] . "/"));
		}

		return $breadcrumbs;
	}
}
?>
