'use strict';

/**
 * Run the animation functions.
 */
Banner.prototype.start = function () {
    this.banner = document.querySelector('.banner');

    this.bannerWidth = this.banner.offsetWidth;
    this.bannerHeight = this.banner.offsetHeight;

    // Image array for preloading
    this.images = [
        'images/image.jpg',
    ];

    var _this = this;
    this.preloadImages(this.images, function () {
        _this.createElements();
        _this.setup();
        _this.hidePreloader();
        _this.animate();
        _this.bindEvents();
    });
};

/**
 * Create dom elements.
 */
Banner.prototype.createElements = function () {
    this.video = this.smartObject({
        parent: this.banner,
        id: 'video',
        type: 'video',
        autoplay: false, // If not set video will not autoplay
        loop: true, // Default is no loop
        controls: false, //Â If you set to true, the browser will offer controls buttons for the video
        muted: true, // If not set the audio will be played with the video
        poster: 'images/image.jpg', // Shows an image instead of first frame while the video is downloading, or until the user hits the play button.
        preload: 'auto', // Possible values: none, metadata, auto.Â The preload attribute is ignored if you use autoplay.
        playsinline: true, // Set to true if you want to use muted autoplay on mobile. It keeps a video inline because by default videos on iOS will play full screen.
        //src: 'videos/core.mp4', // Place your videos in the separate "videos" folder to follow Bannertime structure.
        sources: [{
            url: Enabler.getUrl('videos/core.mp4'),
            type: 'video/mp4'
        },
        {
            url: Enabler.getUrl('videos/core.webm'),
            type: 'video/webm'
        }
        ], // It'sÂ always recommended to use multiple sources. For support across all major browsersÂ use MP4 and either WebM or Ogg.
        width: "102%",
        height: "102%",
        top: "-1%",
        left: "-1%"

    });

    var _this = this;
    Enabler.loadModule(studio.module.ModuleId.VIDEO, function () {
        studio.video.Reporter.attach('video_1', _this.video);
    });

};

/**
 * Setup initial element states.
 */
Banner.prototype.setup = function () {
    var _this = this;

    this.video.addEventListener('canplaythrough', function () {
        _this.timeline.play();
    });
};

/**
 * Hide the preloader.
 */
Banner.prototype.hidePreloader = function () {

};

/**
 * Animation timeline.
 */
Banner.prototype.animate = function () {

    var _this = this;

    function loop() {
        _this.timeline.gotoAndPlay('start');
    }
    var loops = 0;
    var maxLoops = 2;

    var video = document.getElementById("video");



    this.timeline = new TimelineMax({ paused: true, repeat: maxLoops })
        .addLabel('start', 0)
        .call(function () {
            video.currentTime = 0;
            video.play();
        }.bind(_this))
        .set([".banner"], { autoAlpha: 1 })
        .from("#img1", 0.2, { opacity: 0, ease: Expo.ease, delay: 0.2 }, )
        .to("#img1", 0.2, { opacity: 0, ease: Expo.easeOut, delay: 1 })
        .from("#img2", 0.2, { opacity: 0, ease: Expo.ease, }, )
        .to("#img2", 0.2, { opacity: 0, ease: Expo.easeOut, delay: 3 })
        .from("#img3", 0.2, { opacity: 0, ease: Expo.ease, delay: 2 }, )
        .call(function () {

            if (loops === maxLoops) {
                this.timeline.pause();

                setTimeout(function () { video.pause(); }, 1000);

            }
            loops++;

        }.bind(_this), )
        .to("#img3", 0.2, { opacity: 0, ease: Expo.easeOut, delay: 2 });
};