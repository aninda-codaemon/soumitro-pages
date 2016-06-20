
<script type="text/javascript" charset="utf-8">
  function createGuid(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
  if(!document.cookie.match(/bv_sess/)){
    document.cookie='bv_sess='+createGuid()+'; path=/; domain=.beenverified.com';
  }
  if(!document.cookie.match(/bv_ref/)){
    document.cookie='bv_ref='+document.referrer+'; path=/; domain=.beenverified.com';
    document.cookie='bv_ent='+window.location+'; path=/;  domain=.beenverified.com';
  }
  if(!document.cookie.match(/bv_dat/)){
    var now = new Date();
    document.cookie='bv_dat='+ now.getTime()/1000.0 +'; path=/;  domain=.beenverified.com';
  }
</script>

<script>
;(function (w, d) {
  w.bv_test_data = w.bv_test_data || {};
  var getCookie = function (name) {
    var re = new RegExp(name + "=([^;]+)"),
      v = re.exec(d.cookie);
    return (v != null) ? unescape(v[1]) : null;
  };
  w.bv_test_data.visitor_id = getCookie('bv_sess');
  w.bv_test_data.save = function (p, d) {
    w.bv_test_data.platform = p;
    w.bv_test_data.running = !0;
    w.bv_test_data.experiment = d;
  };
}(window, document));
</script>

<script id="nlmt">
(function (w, d) {
  w.nolimit = w.nolimit || [];
  var t = d.getElementById("nlmt"),
      s = d.createElement('script');
  s.async = !0;
  s.src = "//v.beenverified.com/js/track.js";
  t.parentNode.insertBefore(s, t);
  w.nolimit.track = function (k, v) {
    w.nolimit.push({k: k, v: v});
  };
}(window, document));
</script>
