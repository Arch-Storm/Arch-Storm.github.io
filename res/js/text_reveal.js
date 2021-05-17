export default function reveal() {
    const random = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    let crossBarGlitchTexts = document.querySelectorAll(".test");
    crossBarGlitchTexts.forEach(text => {
        let content = text.textContent;
        text.textContent = "";
        // Glitch Text
        let slice = text.dataset.slice;
        let glitchText = document.createElement("div");
        glitchText.className = "glitch_bars";
        glitchText.style.setProperty("--slice-count", slice);
        for (let i = 0; i <= Number(slice); i++) {
            let span = document.createElement("span");
            span.textContent = content;
            span.style.setProperty("--i", `${i + 1}`);
            if (i !== Number(slice)) {
                span.style.animationDelay = `${800 + random(100, 300)}ms`;
            }
            glitchText.append(span);
        }
        text.appendChild(glitchText);
    });
}