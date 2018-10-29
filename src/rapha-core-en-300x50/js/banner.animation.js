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
        'images/img1.jpg'
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

};

/**
 * Setup initial element states.
 */
Banner.prototype.setup = function () {

};

/**
 * Hide the preloader.
 */
Banner.prototype.hidePreloader = function () {
    TweenLite.to('.preloader', 1, { autoAlpha: 0 });
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
    var maxLoops = 1;

    var banner = document.querySelector('.banner')
    var CTA = document.querySelector(".cta");

    // // pauses ad and changes CTA hover effect on mouseover
    // banner.onmouseover = function() {
    //     this.timeline.pause();
    //     CTA.classList.add("hoverCTA");
    // }.bind(_this)
    // banner.onmouseleave = function() {
    //     if (loops < maxLoops) {
    //         this.timeline.play();
    //     }
    //     CTA.classList.remove("hoverCTA");
    // }.bind(_this)

    // var imageTimeline = new TimelineMax({})
    //     .add(TweenMax.to("#img1", 0.1, { opacity: 0, ease: Expo.easeOut, delay: 3 }))
    //     .add(TweenMax.from("#img2", 0.1, { opacity: 0, ease: Expo.ease, delay: -0.2 }, ))
    //     .add(TweenMax.to("#img2", 0.1, { opacity: 0, ease: Expo.easeOut, delay: 3 }))
    //     .add(TweenMax.from("#img3", 0.1, { opacity: 0, ease: Expo.ease, delay: -0.2 }, ))


    this.timeline = new TimelineMax({ repeat: maxLoops })
        .add(TweenMax.set(".banner", { autoAlpha: 1 }))
        .add(TweenMax.from("#txt1", 0.3, { opacity: 0, ease: Expo.easeOut, delay: 0.5 }))
        .add(TweenMax.to(["#img1", "#txt1"], 0.3, { opacity: 0, ease: Expo.easeOut, delay: 2 }))
        .add(TweenMax.staggerFrom(["#img2", "#txt2"], 0.3, { opacity: 0, ease: Expo.easeOut, delay: -0.4 }, 0.6))
        .add(TweenMax.to(["#img2", "#txt2"], 0.3, { opacity: 0, ease: Expo.easeOut, delay: 3 }))
        .add(TweenMax.staggerFrom(["#img3", "#txt3"], 0.3, { opacity: 0, ease: Expo.easeOut, delay: -0.3 }, 0.6))
        .call(function () {

            if (loops === maxLoops) {
                this.timeline.pause();
            }
            loops++;

        }.bind(_this))
        .add(TweenMax.to("#txt3", 0.3, { opacity: 0, ease: Expo.easeOut, delay: 3 }))
};