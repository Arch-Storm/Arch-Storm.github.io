// Gets the mouse position
const getMousePos = e => {
    return {
        x : e.clientX,
        y : e.clientY
    };
};// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

//Grab mouse position and set it to mouse state
let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', (ev) => (mouse = getMousePos(ev)));

let _amt = 0;

export default class Cursor {
    constructor(el) {
        this.Cursor = el;
        this.Cursor.style.opacity = 0;

        if (this.Cursor.classList.contains("cursor")) {
            _amt = .5;
        } else if (this.Cursor.classList.contains("follow")) {
            _amt = .15;
        }

        this.cursorConfigs = {
            x: {previous: 0, current: 0, amt: _amt},
            y: {previous: 0, current: 0, amt: _amt}
        };

        this.onMouseMoveEv = () => {
            this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
            this.cursorConfigs.y.previous = this.cursorConfigs.y.current = mouse.y;

            // Set cursor opacity to 1 when hovered on the screen
            gsap.to(this.Cursor, {
                duration: 1, ease: 'Power3.easeInOut',
                opacity: 1,
            })

            //    requestAnimationFrame
            requestAnimationFrame(() => this.render())

            //    Cleanup function (Removing after one cycle complete)
            window.removeEventListener('mousemove', this.onMouseMoveEv)
        }
        //    Assign the mouse function
        window.addEventListener('mousemove', this.onMouseMoveEv)
    }

    render() {
        this.cursorConfigs.x.current = mouse.x;
        this.cursorConfigs.y.current = mouse.y;
        for (const key in this.cursorConfigs) {
            this.cursorConfigs[key].previous = lerp(
                this.cursorConfigs[key].previous,
                this.cursorConfigs[key].current,
                this.cursorConfigs[key].amt
            )

        }
        //    setting the cursor x and y to our cursor html element
        this.Cursor.style.transform = `
        translateX(${this.cursorConfigs.x.previous}px) 
        translateY(${this.cursorConfigs.y.previous}px)
        `;

        requestAnimationFrame(() => this.render())

    }
}