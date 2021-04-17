gsap.registerPlugin(ScrollTrigger);

gsap.to(":root", { scrollTrigger: ".snap-2", "--bg": "#e4e4d4" });
gsap.to([":root"], { scrollTrigger: ".snap-2", "--fg": "#1b1b2a" });
gsap.to(".profile_img", { scrollTrigger: { trigger: ".snap-2", scrub: true }, transform: "scale(1.5) translateX(150%) translateY(100%) rotateY(18deg) rotateX(35deg) rotate(-6deg)" });

disableScroll();

$(document).ready(function() {
    gsap.to(".nav_logo", { left: "11vw", duration: 0.5, delay: 0.6, ease: "back.out(1.5)" });
    let typed = new Typed(".description", {
        strings: ['synthetic visuals<br/>^300artificial design', 'synthetic visuals<br/>artificial ^300mind^500', ''],
        startDelay: 1000,
        typeSpeed: 25,
        backSpeed: 10,
        smartBackspace: true,
        showCursor: false,
        onComplete: (self) => {
            $(".logo_mask").remove();
            $(".social").css("visibility", "visible");
            gsap.to(".background", { left: "15%", duration: 1.2, ease: "power3.inOut" });
            gsap.to(".nav_logo", { left: "2vw", duration: 1.2, ease: "expo.inOut" });
            gsap.to(".social", { left: "96.5%", duration: 1.2, ease: "expo.inOut" });
            gsap.to(".profile_img", { left: "-2vw", duration: 1.2, ease: "expo.inOut" });
            enableScroll();
        }
    });
});


function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function() {};
}