import gsap from "gsap";
import { select } from "d3";
import initClouds from "./initClouds";

const BLOCK_WIDTH = 160;
const BLOCK_HEIGHT = 160;

let towerHeight = 20;
let deltaHeight = -BLOCK_HEIGHT;
let towerGroup;

let lastLeft = window.innerWidth / 2;
let crashDelta = 0;

const randomColor = () => `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

const initControls = (s, createdBlock) => {
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && select('#createdBlock').style('display') !== 'none') {
      const position = createdBlock.node.getBoundingClientRect();
      const clone = createdBlock.clone().attr({
        x: position.x,
        y: position.y,
      });
      s.append(clone);
      select(clone.node).style('transform-origin', `${BLOCK_WIDTH / 2}px ${BLOCK_WIDTH / 2}px`);
      let angel = 90 - Math.atan(
        (position.y + BLOCK_WIDTH / 2 + window.innerHeight / 4) / (window.innerWidth / 2 - position.x - BLOCK_HEIGHT / 2)
      ) * 180 / Math.PI;
      if (angel > 90) angel = angel - 180;
      gsap.fromTo(clone.node, {
        rotation: angel
      }, {duration: 1, rotation: 0});
      const tween = gsap.to(clone.node, {
        duration: 5,
        y: window.innerHeight + BLOCK_HEIGHT,
        onUpdate() {
          const position = clone.node.getBoundingClientRect();
          if (window.innerHeight - position.top - BLOCK_HEIGHT <= towerHeight && Math.abs(position.x + BLOCK_WIDTH / 2 - lastLeft) < BLOCK_WIDTH / 2) {
            tween.kill();
            towerHeight += BLOCK_HEIGHT;
            towerGroup.append(clone);
            deltaHeight += BLOCK_HEIGHT;
            if (Math.abs(position.x + BLOCK_WIDTH / 2 - lastLeft) < BLOCK_WIDTH / 10) clone.attr({x: lastLeft - BLOCK_WIDTH / 2});
            else {
              crashDelta += Math.abs(position.x + BLOCK_WIDTH / 2 - lastLeft);
              lastLeft = position.x + BLOCK_WIDTH / 2;
            }
            if (towerHeight + BLOCK_HEIGHT >= window.innerHeight / 2) {
              gsap.set(clone.node, {rotation: 0});
              clone.attr({
                y: `-=${deltaHeight - BLOCK_HEIGHT}`
              });
              gsap.to('#tower', {duration: 3, y: deltaHeight});
              towerHeight -= BLOCK_HEIGHT;
            }
            select('#score').text(`Счет: ${deltaHeight / BLOCK_HEIGHT + 1}`)
          }
        }
      });
      select('#createdBlock').style('display', 'none');
      setTimeout(() => {
        select('#createdBlock').style('display', 'block');
        createdBlock.attr('fill', randomColor())
      }, 1000);
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Escape') location.reload();
  });
};

const initMachine = (s) => {
  const MACHINE_TIMER = 4;
  const createdBlock = s.rect(window.innerWidth / 2 - BLOCK_WIDTH / 2, window.innerHeight / 4, BLOCK_WIDTH, BLOCK_HEIGHT).attr({
    fill: randomColor()
  }).attr('id', 'createdBlock');
  s.group(
    s.rect(window.innerWidth / 2 - 10, window.innerHeight / -4, 20, window.innerHeight / 2).attr('fill', 'gray'),
    createdBlock
  ).attr('id', 'machine');
  select('#machine').style('transform-origin', `${BLOCK_WIDTH / 2}px 0`);

  gsap.fromTo("#machine", {rotation: -45}, {duration: MACHINE_TIMER, rotation: 45, ease: "slow(0, 0, true)"});
  setTimeout(() => {
    gsap.fromTo("#machine", {rotation: 45}, {duration: MACHINE_TIMER, rotation: -45, ease: "slow(0, 0, true)"});
  }, MACHINE_TIMER * 1000);
  setInterval(() => {
    gsap.fromTo("#machine", {rotation: -45}, {duration: MACHINE_TIMER, rotation: 45, ease: "slow(0, 0, true)"});
    setTimeout(() => {
      gsap.fromTo("#machine", {rotation: 45}, {duration: MACHINE_TIMER, rotation: -45, ease: "slow(0, 0, true)"});
    }, MACHINE_TIMER * 1000);
  }, MACHINE_TIMER * 2000);
  return createdBlock;
};

export default (id) => {
  const s = Snap(`#${id}`);

  initClouds(s);
  const createdBlock = initMachine(s);
  initControls(s, createdBlock);

  towerGroup = s.group(s.rect(0, window.innerHeight - 20, window.innerWidth, 20).attr({
    fill: 'black'
  }), s.rect(window.innerWidth / 2 - BLOCK_WIDTH / 2, window.innerHeight - 20, BLOCK_WIDTH, 20).attr({
    fill: 'white'
  })).attr('id', 'tower');
};
