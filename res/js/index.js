import Cursor from "./cursor.js";

gsap.defaults({
    ease: "Power3.inOut",
    duration: ".6s"
})

/* ---------- Declaring Vars ------------------------------------------ */

const names = ["Bahamas", "Skull", "Bvlgari", "Sword", "Dagger", "Discord", "Hoodie", "House", "Assets", "Keyboard", "Room", "Signature"];
const subs = ["School Project", "Personal", "School Project", "Personal", "Personal", "Open-Source Theme", "School Project", "Personal", "Everything used", "All functional", "Planning", "Currently in use"];
const dates = ["~ 2019", "~ 2018", "~ 2018", "~ 2017", "~ 2017", "~ 2021", "~ 2019", "~ 2020", "", "~ 2020", "~ 2020", "~ 2021"];

const docStyle = getComputedStyle(document.documentElement);
let bg, fg, bg_hc, fg_hc, contrast; //, id, muted = false, isPaused = false;
let shouldScale = true;

/* const player = document.getElementById("player");
const p = $("#player");
player.volume = .2; */

/* --------------------- Main Function -------------------------------- */
$(document).ready(function() {
    bg = getProp("--bg"); fg = getProp("--fg"); bg_hc = getProp("--bg_hc"); fg_hc = getProp("--fg_hc"); contrast = getProp("--contrast");

    let element = $(".art");
    let i = 0;
    let tls;

    initPage()

    /*
    $(".mute")
        .on("click", function() {
            p.stop()
            if (isPaused) {
                playMusic()
            } else {
                pauseMusic()
            }
        })
     */

    $(".load")
        .on("mouseenter mouseleave", function() { tl.reversed(!tl.reversed()) })
        .on("click", morphPage)

    const tl = gsap.timeline({}); tl
        .to(document.querySelector(".load").children[0], 0.4, {attr: {width:160}, opacity: 1, ease: "Power4.inOut" })
        .to(".load text", 0.6, { x: "+=160", y: "+=10", ease: "back.inOut(1)" }, 0)
        .reversed(true)



/* ----------- Functions called from $(document).ready() -------------- */
function initPage() {
    gsap.to(".nav_link", { opacity: 1, duration: 1, delay: .1 })
    gsap.to(".nav_link", { top: "30%", width: "480px", height: "480px", duration: 1.2, delay: 1.1 , onComplete: function() { cursor() }})
/*  gsap.to(".sound_up", { y: "-=20", opacity: 1, duration: 1, delay: 2})
    gsap.to(".sound_info", { y: "-=20", opacity: 1, duration: 1, delay: 2.3 })  */
    gsap.to(".load_button", { y: "-=20", opacity: 1, duration: 1, delay: 2.6 })

    $(".number p").text("01");
    $(".info .name p").text(names[0]);
    $(".next_info .name").text(names[1]);
    $(".sub p").text(subs[0]);
    $(".date p").text(dates[0]);
    let els = element.length;
    for  (let i = 0; i < els; i++) {
        $(".timeline").append($("<div/>", { "class": "tl_item" }));
    }
    $(".tl_item").eq(0).addClass("active");
    tls = document.querySelectorAll(".tl_item");

/*    Visibility.change(function(e, state) {
        if (state === 'hidden') {
            isPaused = true
            p.stop()
            p.animate({volume: 0}, 1000, function() {player.pause()})
        } else if (state === 'visible' && !muted) {
            isPaused = false
            p.stop()
            player.play()
            p.animate({volume: .2}, 1000)
        }
    })*/
}

function morphPage() {
   /* player.play();*/
    cursorScaleHide()

    gsap.to(".nav_link", { top: "20%", width: "320px", height: "320px", duration: .6 })
    gsap.to(".loader", { opacity: 0, duration: .8, ease: "Expo.in" })
    /*gsap.to(".sound_info", { "letter-spacing": ".6em", "font-size": "24px", duration: .8, ease: "Expo.in" })
    gsap.to(".sound_up", { y: "-=35", transform: "scale(2)", duration: .8, ease: "Expo.in" })*/
    gsap.to(".load", { y: "+=35",width: 320, height: 100, duration: .8, ease: "Expo.in" })
    gsap.to(".load_button", { opacity: 0, duration: .8, ease: "Expo.in", onComplete: function() {
        gsap.set(".loader", { display: "none" })

        let typed = new Typed(".description", {
            strings: ['synthetic visuals<br/>^300artificial design', 'synthetic visuals<br/>artificial ^300mind^500', ''],
            typeSpeed: 60,
            backSpeed: 8,
            smartBackspace: true,
            showCursor: false,
            startDelay: 500,
            onCharAppended: (self) => {
                /*typeSound();*/
            },
            onComplete: (self) => {
                $(".logo_mask").remove();
                $(".social").css("visibility", "visible");
                $(".nav_link").addClass("active")
                let time = gsap.timeline({ onComplete: function() { shouldScale = true; cursorScaleSmall(); cursor(); }});
                time.to(".nav_link", { width: "0px", height: "0px", opacity: 0, duration: .6, ease: "Power3.in" })
                    .to(".background", {width: "15%", duration: 1.2 })
                    .to(".background-right", {width: "5%", duration: 1.2 }, "<" )
                    .to(".social", {left: "96.5%", duration: 1.2 }, "<" )
                    .set(".nav_link", { width: "10vw", height: "10vw", top: "50%", left: "-5%", opacity: 1 }, "<" )
                    .set(".nav_logo", { fill: "var(--bg)" }, "<" )
                    /*.set(".mute", { display: "block" }, "<")
                    .to(".mute", { opacity: 1, duration: .6 }, "<")*/
                    .to(".nav_link", { left: "7.5%", duration: .6, ease: "Power3.out" }, "1.2" )
                showContent();
            }
        })
    }})
}

function cursor() {
    let cursor = new Cursor(document.querySelector('.cursor')), follow = new Cursor(document.querySelector('.follow'))

    $(".nav_link.active")
        .on("mouseenter", function() {
            if (shouldScale) {
                cursorScaleBig()
            }
            gsap.fromTo(".nav_logo", {fill: bg, duration: 0, ease: "none" }, { fill: bg_hc, duration: .3});
            gsap.to([".underline", ".overline"], { width: "10vw", backgroundColor: bg_hc, duration: .3, ease: "Power3.out" });
        })
        .on("mouseleave", function() {
            if (shouldScale) {
                cursorScaleSmall()
            }
            gsap.to(".nav_logo", {fill: bg, duration: .3});
            gsap.to([".underline", ".overline"], { width: "0", backgroundColor: "#000", duration: .3, ease: "Power3.in" });
        })

    $(".social-entry, .load, .mute, .next_button")
        .on("mouseenter", function() {
            if (shouldScale) {
                cursorScaleBigAlt()
            }
        })
        .on("mouseleave", function() {
            if (shouldScale) {
                cursorScaleSmall()
            }
        })

    $(".social-icon")
        .on("mouseenter", function() {
            gsap.to(this, { filter: "invert(14%) sepia(25%)", duration: .3 })
            gsap.to([this.nextSibling.nextSibling, this.nextSibling.nextSibling.nextSibling.nextSibling], { width: "2vw", duration: .3, ease: "Power3.out" });
        })
        .on("mouseleave", function() {
            gsap.to(".social-icon", { filter: "invert(7%) sepia(17%)", duration: .3 })
            gsap.to([".underline-social", ".overline-social"], { width: "0", duration: .3, ease: "Power3.in" });
        })
}

function showContent() {
    let tl = gsap.timeline({ delay: "1.6" }); tl
        .to(".tl_item", .6, { height: "5vh" })
    reveal();
}


/* ----------------- Functions called when needed --------------------- */

function slide(r) {
    if (r) {
        if (i > 0) {
            gsap.to(element[i], .6, { opacity: 0 });
            gsap.to(tls[i], .3, { backgroundColor: fg });
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { opacity: 0, onComplete: function() {
                    $(".number p").text("0" + (i + 1));
                    $(".info .name p").text(names[i]);
                    $(".next_info .name").text(names[i + 1]);
                    $(".sub p").text(subs[i]);
                    $(".date p").text(dates[i]);
                }});
            i--;
            gsap.to(tls[i], .3, { backgroundColor: contrast });
            gsap.to(element[i], .6, { opacity: 1 });
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { delay: .3, opacity: 1});
        } else {
            gsap.to(element[i], .6, { opacity: 0 });
            gsap.to(tls[i], .3, { backgroundColor: fg });
            i = element.length - 1;
            gsap.to(tls[i], .3, { backgroundColor: contrast });
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { opacity: 0, onComplete: function() {
                    $(".number p").text("0" + (i + 1));
                    $(".info .name p").text(names[i]);
                    $(".next_info .name").text(names[0]);
                    $(".sub p").text(subs[i]);
                    $(".date p").text(dates[i]);
                }});
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { delay: .3, opacity: 1});
            gsap.to(element[i], .6, { opacity: 1 });
        }
    } else if (!r) {
        if (i < element.length - 1) {
            gsap.to(element[i], .6, { opacity: 0 });
            gsap.to(tls[i], .3, { backgroundColor: fg });
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { opacity: 0, onComplete: function() {
                    $(".number p").text("0" + (i + 1));
                    $(".info .name p").text(names[i]);
                    $(".next_info .name").text(names[i + 1]);
                    $(".sub p").text(subs[i]);
                    $(".date p").text(dates[i]);
                }});
            i++;
            gsap.to(tls[i], .3, { backgroundColor: contrast });
            gsap.to(element[i], .6, { opacity: 1 });
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { delay: .3, opacity: 1});
        } else {
            gsap.to(element[i], .6, { opacity: 0 });
            gsap.to(tls[i], .3, { backgroundColor: fg });
            i = 0;
            gsap.to(tls[i], .3, { backgroundColor: contrast });
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { opacity: 0, onComplete: function() {
                    $(".number p").text("0" + (i + 1));
                    $(".info .name p").text(names[i]);
                    $(".next_info .name").text(names[i + 1]);
                    $(".sub p").text(subs[i]);
                    $(".date p").text(dates[i]);
                }});
            gsap.to(".number p, .info .name p, .next_info .name, .sub p, .date p", .3, { delay: .3, opacity: 1});
            gsap.to(element[i], .6, { opacity: 1 });
        }
    }
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

function getProp(value) {
    return docStyle.getPropertyValue(value);
}

function cursorScaleBig() {
    gsap.to(".cursor .before", {
        transform: "scale(0)", duration: .3
    });
    gsap.to(".follow .before", {
        transform: "scale(2)", mask: "radial-gradient(transparent 0px, #000 0px)", "-webkit-mask": "-webkit-radial-gradient(transparent 0px, #000 0px)", duration: .3
    });
}

function cursorScaleBigAlt() {
    gsap.to(".follow .before", {
        transform: "scale(2)", mask: "radial-gradient(transparent 20px, #000 21px)", "-webkit-mask": "-webkit-radial-gradient(transparent 20px, #000 21px)", duration: .3
    });
}

function cursorScaleSmall() {
    gsap.to(".cursor .before", {
        transform: "scale(.2)", duration: .3
    });
    gsap.to(".follow .before", {
        transform: "scale(.9)", mask: "radial-gradient(transparent 17px, #000 18px)", "-webkit-mask": "-webkit-radial-gradient(transparent 17px, #000 18px)", duration: .3
    });
}

function cursorScaleHide() {
    gsap.to(".cursor .before", {
        transform: "scale(0)", duration: .3
    });
    gsap.to(".follow .before", {
        transform: "scale(0)", mask: "radial-gradient(transparent 0px, #000 0px)", "-webkit-mask": "-webkit-radial-gradient(transparent 0px, #000 0px)", duration: .3
    });
    shouldScale = false;
}

function reveal() {
    let tl = gsap.timeline({ delay: "2.2" }); tl
        .to(".info p", .6, { top: "0" })
        .to(".info, .next_button", .6, { opacity: 1 }, "<")
        .to(".art.first", .6, { opacity: 1 })
    let indicator = new WheelIndicator({
        callback: function(e) {
            if (e.direction === 'down') {
                slide(false);
            } else if (e.direction === 'up') {
                slide(true);
            }
        }
    });
    indicator.getOption("preventMouse");
}

/*
function pauseMusic() {
    isPaused = true
    id = window.setTimeout(function() { player.pause(); muted = true}, 1500)

    gsap.killTweensOf("#player, .v1, .v2, .v3")

    gsap.to("#player", { volume: 0, duration: 1.5 })
    gsap.to(".v1", { transform: "scale(0) translateX(-600px)", duration: .3 })
    gsap.to(".v2", { transform: "scale(0) translateX(-600px)", duration: .3, delay: .1 })
    gsap.to(".v3", { transform: "scale(0) translateX(-600px)", duration: .3, delay: .2 })
}

function playMusic() {
    isPaused = false
    player.play()
    muted = false

    window.clearTimeout(id)
    gsap.killTweensOf("#player, .v1, .v2, .v3")

    gsap.to("#player", { volume: .2, duration: 1.5 })
    gsap.to(".v3", { transform: "scale(1) translateX(0)", duration: .3 })
    gsap.to(".v2", { transform: "scale(1) translateX(0)", duration: .3, delay: .1 })
    gsap.to(".v1", { transform: "scale(1) translateX(0)", duration: .3, delay: .2 })
}*/

});

