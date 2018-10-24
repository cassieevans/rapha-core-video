'use strict';

/**
 * Run the animation functions.
 */
Banner.prototype.start = function() {
    this.banner = document.querySelector('.banner');

    this.bannerWidth = this.banner.offsetWidth;
    this.bannerHeight = this.banner.offsetHeight;

    // Image array for preloading
    this.images = [
        'images/img1.jpg'
    ];

    var _this = this;
    this.preloadImages(this.images, function() {
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
Banner.prototype.createElements = function() {

};

/**
 * Setup initial element states.
 */
Banner.prototype.setup = function() {

};

/**
 * Hide the preloader.
 */
Banner.prototype.hidePreloader = function() {
    TweenLite.to('.preloader', 1, { autoAlpha: 0 });
};

/**
 * Animation timeline.
 */
Banner.prototype.animate = function() {



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
    //     .add(TweenMax.from(img1, 1, { opacity: 0, ease: Expo.ease }, ))
    //     .add(TweenMax.from(img1, 8, { scale: 1.1, ease: Expo.ease, delay: -1 }, ))

    var textTimeline = new TimelineMax({})
        .add(TweenMax.set(".banner", { autoAlpha: 1 }))
        .add(TweenMax.from("#txt1", 1, { opacity: 0, ease: Expo.ease, delay: 0.5 }, ))
        .add(TweenMax.to("#txt1", 1, { opacity: 0, ease: Expo.easeOut, delay: 2.5 }))
        .add(TweenMax.from("#txt2", 1, { opacity: 0, ease: Expo.ease, delay: 0.5 }, ))
        .add(TweenMax.to("#txt2", 1, { opacity: 0, ease: Expo.easeOut, delay: 2.5 }))
        .add(TweenMax.from(logo, 1, { opacity: 0, ease: Expo.ease, delay: -.5 }, ))
        .add(TweenMax.to("#exploreMask", 1.5, { attr: { x: 0 }, ease: Expo.ease }, ))
        .add(TweenMax.from(cta, 1, { opacity: 0, ease: Expo.ease }, ))
        .call(function() {

            if (loops === maxLoops) {
                this.timeline.pause();
            }
            loops++;

        }.bind(_this))
        .add(TweenMax.to([cta, "#logocont", ], 1, { opacity: 0, ease: Expo.easeOut, delay: 1 }))


    this.timeline = new TimelineMax({ repeat: maxLoops })
        .timeScale(1)
        .addLabel('start', 0)
        .add(textTimeline, 0)


};