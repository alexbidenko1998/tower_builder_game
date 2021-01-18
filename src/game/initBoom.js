import gsap from "gsap";
import {randomColor} from "./utils";
import {BLOCK_HEIGHT, CIRCLE_RADIUS} from "./consts";

export default (s, towerGroup, x, y) => {
  const dots = Array.from({ length: 20 }, (_, i) => s.circle(x - CIRCLE_RADIUS / 2, y + BLOCK_HEIGHT, CIRCLE_RADIUS).attr({
    fill: randomColor(),
    strokeWidth: 1,
    stroke: 'black'
  }).attr('id', 'createdDot_' + i));
  dots.forEach((el, i) => {
    towerGroup.append(el);
    const direction = Math.random() > 0.5 ? 1 : -1;
    gsap.to('#createdDot_' + i, {
      motionPath: {
        path: [
          {x:0, y:0},
          {x: 100 * direction, y:-250 + Math.random() * 100},
          {x:400 * direction, y: -250 + Math.random() * 100},
          {x:400 * direction + 100 * Math.random(), y: -1 * Math.random() * 200}
        ],
        type: "cubic"
      },
      duration: 3,
      ease: "power1.inOut",
      onComplete() {
        el.remove();
      }
    });
  });
};
