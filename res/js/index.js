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
            $(".scroll-container").css("overflow-y", "scroll");
            $(".logo_mask").remove();
            $(".social").css("visibility", "visible");
            gsap.to(".background", { left: "15%", duration: 1.2, ease: "power3.inOut" });
            gsap.to(".nav_logo", { left: "2vw", duration: 1.2, ease: "expo.inOut" });
            gsap.to(".social", { left: "96.5%", duration: 1.2, ease: "expo.inOut" });
        }
    });
});