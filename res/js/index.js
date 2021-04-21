import Cursor from "./cursor.js";

gsap.registerPlugin(CSSRulePlugin);
gsap.defaults({
    ease: "Power3.inOut"
})

// gsap.to(".profile_img", { scrollTrigger: { trigger: ".snap-2", scrub: true }, transform: "scale(2) translateX(300%) translateY(150%) rotateY(18deg) rotateX(35deg) rotate(-6deg)" });

$(document).ready(function() {
    const cursor = new Cursor(document.querySelector('.cursor')), follow = new Cursor(document.querySelector('.follow'))
    const cursorBefore = CSSRulePlugin.getRule(".cursor:before"), followBefore = CSSRulePlugin.getRule(".follow:before");

    $("a")
    .on("mouseenter", function() {
        gsap.to(cursorBefore, {
            transform: "scale(0)", duration: .3
        });
        gsap.to(followBefore, {
            opacity: 1, transform: "scale(2)", mask: "radial-gradient(transparent 21px, #000 22px)", duration: .3
        });
    })
    .on("mouseleave", function() {
        gsap.to(cursorBefore, {
            opacity: 1, transform: "scale(.2)", duration: .3
        });
        gsap.to(followBefore, {
            opacity: .5, transform: "scale(.9)", mask: "radial-gradient(transparent 17px, #000 18px)", duration: .3
        });
    });

    let bg = getProp("--bg"), fg = getProp("--fg"), bg_hc = getProp("--bg_hc"), fg_hc = getProp("--fg_hc");

    $(".nav_link")
    .on("mouseenter", function() {
        gsap.fromTo(".nav_logo", {fill: bg, duration: 0, ease: "none" }, { fill: bg_hc, duration: .3});
        gsap.to([".underline", ".overline"], { width: "10vw", duration: .3, ease: "Power3.out" });
    })
    .on("mouseleave", function() {
        gsap.to(".nav_logo", {fill: bg, duration: .3});
        gsap.to([".underline", ".overline"], { width: "0", duration: .3, ease: "Power3.in" });
    })


    gsap.to(".nav_link", { opacity: 1, duration: 1, delay: .1 });
    gsap.to(".nav_link", { top: "20%", width: "320px", height: "320px", duration: 1.2, delay: 1.1 , onComplete: function() { morphPage(); } });
});

function morphPage() {
    let typed = new Typed(".description", {
        strings: ['synthetic visuals<br/>^300artificial design', 'synthetic visuals<br/>artificial ^300mind^500', ''],
        typeSpeed: 60,
        backSpeed: 8,
        smartBackspace: true,
        showCursor: false,
        onCharAppended: (self) => {
            typeSound();
        },
        onComplete: (self) => {
            $(".logo_mask").remove();
            $(".social").css("visibility", "visible");
            gsap.to(".nav_link", { width: "0px", height: "0px", opacity: 0, duration: .6, ease: "Power3.in" });
            gsap.to(".background", {width: "15%", duration: 1.2, delay: .6 });
            gsap.to(".background-right", {width: "5%", duration: 1.2, delay: .6 });
            gsap.to(".social", {left: "96.5%", duration: 1.2, delay: .6 });
            gsap.to(".profile_img", {
                left: "0",
                transform: "scale(1.5) translateX(30%) translateY(10%) rotateY(10deg) rotateX(55deg) rotate(-8deg)",
                duration: 1.2, delay: .6,
            });
            gsap.set(".nav_link", { width: "10vw", height: "10vw", top: "50%", left: "-5%", opacity: 1, delay: .6 });
            gsap.set(".nav_logo", { fill: "var(--bg)", delay: .6 });
            gsap.to(".nav_link", { left: "7.5%", duration: .6, delay: 1.2, ease: "Power3.out" });
        }
    });
}

function typeSound() {
    const selector = (Math.floor(Math.random() * 5) + 1).toString();
    const soundSelected = new Audio("res/audio/typed" + selector + ".mp3");
    soundSelected.volume = (Math.floor(Math.random() * 20) + 1) / 100;
    playSound(soundSelected);
}

function playSound(sound) {
    sound.play();
}

const docStyle = getComputedStyle(document.documentElement);

function getProp(value) {
    return docStyle.getPropertyValue(value);
}