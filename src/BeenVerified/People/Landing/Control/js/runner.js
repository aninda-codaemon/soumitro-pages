import { initializeBVGO } from 'utils/bvgo';
import * as localStorage from 'utils/localStorage';
import amplify from 'utils/amplifyStore';
import 'utils/counter';
import 'utils/anim';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import '../css/styles.css';

const queryArgs = getQueryArgs();
const validQueryArgs = isValidPeopleQuery(queryArgs);
const bvid = getBVId(queryArgs);
const recordCounts = {
  LANDING: 'RecordCount UponLanding',
  RESEARCH: 'RecordCount Re-Searching',
  QUERY: 'RecordCount QueryArgs',
};

(() => {
  // const REQUEST_DELAY = 300; // ms
  // Testimonial people icon selector
  $('.testimonial-photo').on('click', () => {
    $('.testimonial-photo').removeClass('active');
    $(this).addClass('active');
  });

  //Testimonial press icon selector
  $('.testi-press').on('click', () => {
    $('.testi-press').removeClass('active');
    $(this).addClass('active');
  });

  const scrollAnimation = () => {
    let animateShimmer = () => {
      let $s1 = $('#home-search-carousel.search-form');
      let $b1 = $('.carousel-inner .item .btn-search');

      /* beautify preserve:start */
      let sequence = [
        { e: $s1, p: {backgroundPositionX: 0}, o: {delay: 600, duration: 3600, easing: "easeInCubic"} }
      ];
      /* beautify preserve:end */

      $.Velocity.RunSequence(sequence);

      _.delay(() => {
        $b1.velocity({
          backgroundColor: '#72c23f'
        }, {
          duration: 800,
          loop: true
        });
      }, 3300);
    };

    const shimmerWaypoint = $('.home-search .trigger').waypoint((direction) => {
      animateShimmer();
      this.destroy();
    }, {
      offset: '60%'
    });

    $('#background-checks .screenshot').velocity({
      scale: 0.9
    }, {
      duration: 0
    });

    const animateBullets = () => {
      let $screenshot = $('#background-checks .screenshot');
      let $b1 = $('#background-checks .bullet-one');
      let $b2 = $('#background-checks .bullet-two');
      let $b3 = $('#background-checks .bullet-three');
      let $b4 = $('#background-checks .bullet-four');
      let $button = $('#background-checks .box-button a.btn');


      $screenshot.velocity({
        scale: 1,
        top: 15
      }, {
        duration: 1200
      });

      /* beautify preserve:start */
      const sequence = [

        { e: $b1, p: {left: 0}, o: {duration: 600, easing: "easeInOutQuad"} },
        { e: $b2, p: {left: 0}, o: {duration: 600, easing: "easeInOutQuad"} },
        { e: $b3, p: {left: 0}, o: {duration: 600, easing: "easeInOutQuad"} },
        { e: $b4, p: {left: 0}, o: {duration: 600, easing: "easeInOutQuad"} },

        { e: $button, p: {scaleX: 0.9, scaleY: 0.9}, o: {duration: 300} },
        { e: $button, p: {scaleX: 1, scaleY: 1}, o: {duration: 300} }
      ];
      /* beautify preserve:end */

      $.Velocity.RunSequence(sequence);
    };

    const bulletsWaypoint = $('#background-checks .trigger').waypoint( (direction) => {
      animateBullets();
      this.destroy();
    }, {
      offset: '60%'
    });

    const animateApps = function () {
      let $b1 = $('#app .app-one');
      let $b2 = $('#app .app-two');
      let $b3 = $('#app .app-three');
      let $b4 = $('#app .app-four');
      let $s1 = $('#app .star-one');
      let $s2 = $('#app .star-two');
      let $s3 = $('#app .star-three');
      let $s4 = $('#app .star-four');
      let $s5 = $('#app .star-five');

      /* beautify preserve:start */
      const sequence = [
        { e: $b1, p: {top: 0}, o: {duration: 800} },
        { e: $b2, p: {top: 0}, o: {duration: 800, delay: 100, sequenceQueue: false} },
        { e: $b3, p: {top: 0}, o: {duration: 800, delay: 200, sequenceQueue: false} },
        { e: $b4, p: {top: 0}, o: {duration: 800, delay: 300, sequenceQueue: false} },
        { e: $s1, p: {opacity: 1}, o: {duration: 300, sequenceQueue: false} },
        { e: $s2, p: {opacity: 1}, o: {duration: 300} },
        { e: $s3, p: {opacity: 1}, o: {duration: 300} },
        { e: $s4, p: {opacity: 1}, o: {duration: 300} },
        { e: $s5, p: {opacity: 1}, o: {duration: 300} }
      ];
      /* beautify preserve:end */

      $.Velocity.RunSequence(sequence);
    };

    const appsWaypoint = $('#app .trigger').waypoint(function (direction) {
      animateApps();
      this.destroy();
    }, {
      offset: 'bottom-in-view'
    });

    const animateVideo = function () {
      var $videoBtn = $('#video .video-play-btn');

      $videoBtn.velocity({
        scale: 1.2
      }, {
        duration: 1000,
        loop: true
      });

    };

    const videoWaypoint = $('#video .trigger').waypoint(function (direction) {
      animateVideo();
    }, {
      offset: '50%'
    });

    const animateTimeline = function () {
      let $b1img = $('#timeline .bullet-one img');
      let $b1span = $('#timeline .bullet-one span');
      let $b2img = $('#timeline .bullet-two img');
      let $b2span = $('#timeline .bullet-two span');
      let $b3img = $('#timeline .bullet-three img');
      let $b3span = $('#timeline .bullet-three span');
      let $b4img = $('#timeline .bullet-four img');
      let $b4span = $('#timeline .bullet-four span');

      /* beautify preserve:start */
      const sequence = [
        { e: $b1img, p: {opacity: 1}, o: {duration: 100} },
        { e: $b1img, p: {scaleX: 1.3, scaleY: 1.3}, o: {duration: 200, easing: "easeInExpo"} },
        { e: $b1img, p: {scaleX: 1, scaleY: 1}, o: {duration: 300} },
        { e: $b1span, p: {opacity: 1, }, o: {sequenceQueue: false, duration: 300} },
        { e: $b2img, p: {opacity: 1}, o: {duration: 100} },
        { e: $b2img, p: {scaleX: 1.3, scaleY: 1.3}, o: {duration: 200, easing: "easeInExpo"} },
        { e: $b2img, p: {scaleX: 1, scaleY: 1}, o: {duration: 300} },
        { e: $b2span, p: {opacity: 1}, o: {sequenceQueue: false, duration: 300} },
        { e: $b3img, p: {opacity: 1}, o: {duration: 100} },
        { e: $b3img, p: {scaleX: 1.3, scaleY: 1.3}, o: {duration: 200, easing: "easeInExpo"} },
        { e: $b3img, p: {scaleX: 1, scaleY: 1}, o: {duration: 300} },
        { e: $b3span, p: {opacity: 1}, o: {sequenceQueue: false, duration: 300} },
        { e: $b4img, p: {opacity: 1}, o: {duration: 100} },
        { e: $b4img, p: {scaleX: 1.3, scaleY: 1.3}, o: {duration: 200, easing: "easeInExpo"} },
        { e: $b4img, p: {scaleX: 1, scaleY: 1}, o: {duration: 300} },
        { e: $b4span, p: {opacity: 1}, o: {sequenceQueue: false, duration: 300} }
      ];
      /* beautify preserve:end */

      $.Velocity.RunSequence(sequence);
    };

    const timelineWaypoint = $('#timeline .trigger').waypoint(function (direction) {
      animateTimeline();
      this.destroy();
    }, {
      offset: '50%'
    });

    const animateFooter = function () {
      let $s1 = $('#footer .star-one');
      let $s2 = $('#footer .star-two');
      let $s3 = $('#footer .star-three');
      let $s4 = $('#footer .star-four');
      let $s5 = $('#footer .star-five');

      /* beautify preserve:start */
      const sequence = [
        { e: $s1, p: {opacity: 1}, o: {duration: 300, sequenceQueue: false} },
        { e: $s2, p: {opacity: 1}, o: {duration: 300} },
        { e: $s3, p: {opacity: 1}, o: {duration: 300} },
        { e: $s4, p: {opacity: 1}, o: {duration: 300} },
        { e: $s5, p: {opacity: 1}, o: {duration: 300} }
      ];
      /* beautify preserve:end */

      $.Velocity.RunSequence(sequence);
    };


    const animateCarla = function () {
      let $c1 = $('.carla-hand');

      /* beautify preserve:start */
      let sequence = [
        { e: $c1, p: {bottom: "-10px", rotateZ: "80deg", rotateY: "0deg"}, o: {duration: 800} },
        { e: $c1, p: {rotateZ: "55deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "80deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "55deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "80deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "55deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "80deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "55deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "80deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "55deg"}, o: {duration: 200} },
        { e: $c1, p: {rotateZ: "0deg", rotateY: "90deg"}, o: {duration: 600} }
      ];
      /* beautify preserve:end */

      $.Velocity.RunSequence(sequence);
    };

    const footerWaypoint = $('#footer .trigger').waypoint(function (direction) {
      animateFooter();

      let goCarla = _.debounce(animateCarla, 1500, {
        leading: true,
        trailing: false
      });

      $('.carla-box').on('click', goCarla);

      _.delay(goCarla, 1500);

      this.destroy();
    }, {
      offset: 'bottom-in-view'
    });

  };
}(jQuery, _));
