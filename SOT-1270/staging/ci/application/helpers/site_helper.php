<?php

if (!function_exists('asset_url()')) {
	function asset_url() {
	  return '/people/assets/';
	}
}

if (!function_exists("nameize")) {
	function nameize($string) {
		$word_splitters = array(' ', '-', "O'", "L'", "D'", 'St.', 'Mc', 'Mac');
		$lowercase_exceptions = array('the', 'van', 'den', 'von', 'und', 'der', 'de', 'da', 'of', 'and', "l'", "d'");
		$uppercase_exceptions = array('III', 'IV', 'VI', 'VII', 'VIII', 'IX');
		$mac_names_orig = array('adie','affer','alonie','anroy','ara','arthur','askill','askin','aughtrie','aulay','bain','bean','beth','bethock','brayne','cabe','cadie','caffer','caffie','caig','cain','callum','calman','cann','carthy','cartney','cavity','cheyne','clintock','clumpha','clung','clure','codrum','coll','comb','combie','conie','connell','corkindale','cork','cormick','corquodale','coshin','coskrie','cowan','cracken','crain','creadie','crindle','cririe','crone','crossan','cuaig','cuidh','cuish','culloch','curdy','curley','dermid','diarmid','dialmid','donald','duff','dui','duthy','eachen','eachern','elfrish','ewan','ewen','fadyen','fadzean','fall','farlane','fater','fetridge','figan','gavin','geachen','george','gilchrist','gill','gillivray','gillonie','gillony','gilp','gowan','gurk','haffie','hugh','ichan','ildonich','ilherran','ilvain','ilwaine','inally','indoe','inroy','isaac','iver','kay','kean','kechnie','keegan','kellaig','kellar','kelvie','kenna','kenzie','kerral','kerron','kerrow','kessock','kettrick','killigan','killop','kim','kinnie','kinnon','kirdie','kirdy','knockater','krycul','lachlan','lafferty','lagan','laren','larty','latchie','lauchlan','laurin','laverty','lean','learnan','leay','lellan','lennan','leod','lergan','letchie','lintock','liver','luckie','lullich','lumpha','lung','lure','lurg','mann','martin','master','meeken','millan','minn','morran','morrow','mullen','murchie','murchy','murdo','murray','nair','nally','naughton','nee','neil','neilage','neill','neillie','neish','nevin','nichol','nicol','nider','nish','niven','nucator','partland','phail','pharlane','phater','phedran','pherson','queen','quien','quilken','raild','ranald','ritchie','robb','robbie','rory','rostie','rury','ryrie','shane','sherry','sorley','sporran','swan','sween','taggart','tavish','tear','turk','usbaig','vannan','varish','vean','veigh','vey','vicar','vitie','vurich','walter','wattie','whannell','whillan','whinnie','william');
		foreach(array_values($mac_names_orig) as $val)
			$mac_names[$val] = 1;

		$string = strtolower($string);
		foreach ($word_splitters as $delimiter) {
			$words = explode($delimiter, $string);
			$newwords = array();
			foreach ($words as $word) {
				if (in_array(strtoupper($word), $uppercase_exceptions))
					$word = strtoupper($word);
				else
				if ($delimiter != 'Mac' && !in_array($word, $lowercase_exceptions))
					$word = ucfirst($word);
				else
				if ($delimiter == 'Mac' && isset($mac_names[$word]))
					$word = ucfirst($word);

				$newwords[] = $word;
			}

			if (in_array(strtolower($delimiter), $lowercase_exceptions))
				$delimiter = strtolower($delimiter);

			$string = join($delimiter, $newwords);
		}
		return $string;
	}
}

if (!function_exists("format_seotext")) {
	function cache_load($url) {
		global $jsonld_default_load_document;
		$dir = FCPATH . "application/jsonld_cache/";
		$file = $dir . base64_encode($url);

		if (file_exists($file)) {
			return unserialize(file_get_contents($file));
		}

		// use default loader
		$doc = call_user_func($jsonld_default_load_document, $url);
		file_put_contents($file, serialize($doc));
		return $doc;
	}
}

if (!function_exists("format_seotext")) {
	function format_seotext($content,$args) {
		return $content;
	}
}

if (!function_exists("p")) {
	function p ($text) {
		return nameize(ucwords(strtolower(preg_replace('!\s+!', ' ', $text))));
		//return implode('-', array_map('ucfirst', explode('-', ucwords(strtolower(preg_replace('!\s+!', ' ', $text))))));
		//return ucwords(strtolower(preg_replace('!\s+!', ' ', $text)));
		//return implode('-', array_map('ucfirst', explode('-', $text)));
	}
}

if (!function_exists("l")) {
	function l ($text) {
		return strtolower(str_replace("-", "+", str_replace(" ", "_", $text)));
	}
}

if (!function_exists("ul")) {
	function ul ($text) {
		return ucwords(strtolower(str_replace("+", "-", str_replace("-", " ", $text))));
	}
}

if (!function_exists("sid")) {
	function sid ($state) {
		$states = array(3 => "alaska", 2 => "alabama", 4 => "arkansas", 5 => "arizona", 6 => "california", 7 => "colorado", 8 => "connecticut", 9 => "district-of-columbia", 10 => "delaware", 11 => "florida", 12 => "georgia", 13 => "hawaii", 14 => "iowa", 15 => "idaho", 16 => "illinois", 17 => "indiana", 18 => "kansas", 19 => "kentucky", 20 => "louisiana", 21 => "massachusetts", 22 => "maryland", 23 => "maine", 24 => "michigan", 25 => "minnesota", 26 => "missouri", 27 => "mississippi", 28 => "montana", 29 => "north-carolina", 30 => "north-dakota", 31 => "nebraska", 32 => "new-hampshire", 33 => "new-jersey", 34 => "new-mexico", 35 => "nevada", 36 => "new-york", 37 => "ohio", 38 => "oklahoma", 39 => "oregon", 40 => "pennsylvania", 41 => "rhode-island", 42 => "south-carolina", 43 => "south-dakota", 44 => "tennessee", 45 => "texas", 46 => "utah", 47 => "virginia", 48 => "vermont", 49 => "washington", 50 => "wisconsin", 51 => "west-virginia", 52 => "wyoming");
		return array_search(strtolower($state), $states);
	}
}

if (!function_exists("spc")) {
	function spc ($state) {
		$states = array("Alabama" => "AL", "Alaska" => "AK", "Arizona" => "AZ", "Arkansas" => "AR", "California" => "CA", "Colorado" => "CO", "Connecticut" => "CT", "Delaware" => "DE", "Florida" => "FL", "Georgia" => "GA", "Hawaii" => "HI", "Idaho" => "ID", "Illinois" => "IL", "Indiana" => "IN", "Iowa" => "IA", "Kansas" => "KS", "Kentucky" => "KY", "Louisiana" => "LA", "Maine" => "ME", "Maryland" => "MD", "Massachusetts" => "MA", "Michigan" => "MI", "Minnesota" => "MN", "Mississippi" => "MS", "Missouri" => "MO", "Montana" => "MT", "Nebraska" => "NE", "Nevada" => "NV", "New Hampshire" => "NH", "New Jersey" => "NJ", "New Mexico" => "NM", "New York" => "NY", "North Carolina" => "NC", "North Dakota" => "ND", "Ohio" => "OH", "Oklahoma" => "OK", "Oregon" => "OR", "Pennsylvania" => "PA", "Rhode Island" => "RI", "South Carolina" => "SC", "South Dakota" => "SD", "Tennessee" => "TN", "Texas" => "TX", "Utah" => "UT", "Vermont" => "VT", "Virginia" => "VA", "Washington" => "WA", "West Virginia" => "WV", "Wisconsin" => "WI", "Wyoming" => "WY");
		return $states[($state)];
	}
}

if (!function_exists("pcs")) {
	function pcs ($state) {
		$states = array("AL" => "Alabama", "AK" => "Alaska", "AZ" => "Arizona", "AR" => "Arkansas", "CA" => "California", "CO" => "Colorado", "CT" => "Connecticut", "DE" => "Delaware", "DC" => "District of Columbia", "FL" => "Florida", "GA" => "Georgia", "HI" => "Hawaii", "ID" => "Idaho", "IL" => "Illinois", "IN" => "Indiana", "IA" => "Iowa", "KS" => "Kansas", "KY" => "Kentucky", "LA" => "Louisiana", "ME" => "Maine", "MD" => "Maryland", "MA" => "Massachusetts", "MI" => "Michigan", "MN" => "Minnesota", "MS" => "Mississippi", "MO" => "Missouri", "MT" => "Montana", "NE" => "Nebraska", "NV" => "Nevada", "NH" => "New Hampshire", "NJ" => "New Jersey", "NM" => "New Mexico", "NY" => "New York", "NC" => "North Carolina", "ND" => "North Dakota", "OH" => "Ohio", "OK" => "Oklahoma", "OR" => "Oregon", "PA" => "Pennsylvania", "RI" => "Rhode Island", "SC" => "South Carolina", "SD" => "South Dakota", "TN" => "Tennessee", "TX" => "Texas", "UT" => "Utah", "VT" => "Vermont", "VA" => "Virginia", "WA" => "Washington", "WV" => "West Virginia", "WI" => "Wisconsin", "WY" => "Wyoming");
		return $states[($state)];
	}
}

if (!function_exists("t")) {
	function t ($telephone) {
		if (strlen($telephone) == 10) {
			return substr($telephone, 0, 3) . "-" . substr($telephone, 3, 3) . "-" . substr($telephone, 6, 4);
		} else {
			return;
		}
	}
}

if (!function_exists("bd")) {
	function bd ($birthday) {
		if (strlen($birthday) == 8) {
			return ltrim(substr($birthday, 4, 2), "0") . "/" . ltrim(substr($birthday, 6, 2), "0") . "/" . substr($birthday, 0, 4);
		} else {
			return;
		}
	}
}

if (!function_exists("pbd")) {
function pbd ($birthday) {
return date('F j, Y', strtotime(bd($birthday)));
}
}

if (!function_exists("acf")) {
	function acf ($tc, $r, $ts) {
		$t = min ($tc, $ts);
		if ($r == $t) {
			//return ".";
		} else if ($r == $t -1) {
			return " and ";
		} else if ($r > $t) {
			return;
		} else {
			return ", ";
		}
	}
}

?>
