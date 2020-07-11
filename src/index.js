import { select } from "d3";
import init from "./game/init";

const WORKSPACE_ID = 'game';

const body = select("body")
  .style("margin", 0).style("height", '100vh').style("overflow", 'hidden').style('position', 'relative');

const button = body.append('button')
  .style('top', '50%').style('left', '50%').style('transform', 'translate(-50%, -50%)').style('position', 'absolute')
  .text('Начать игру').on('click', () => {
    button.remove();
    body.node().requestFullscreen();
    setTimeout(() => {
      body.append('svg').style("width", "100%").style("height", "100%").style('background-color', '#61adfc').attr('id', WORKSPACE_ID);
      body.append('p')
        .style('position', 'absolute').style("top", "10px").style("left", "30px").style("color", "white").style("font-size", "24px")
        .text('Счет: 0').attr('id', 'score');

      init(WORKSPACE_ID);
    }, 300);
  });
