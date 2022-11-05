const width = window.innerWidth;
const height = window.innerWidth;

async function main() {
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');

  context.font = '16px "Roboto Mono"';
  while (true) {
    if (document.fonts.check(context.font)) {
      break;
    }
    await new Promise(requestAnimationFrame);
  }

  const textMetrics = context.measureText(' ');
  const fontWidth = textMetrics.width;
  const fontHeight = textMetrics.fontBoundingBoxAscent * 1.2;


  function drawText(text, row, column) {
    context.fillText(text, column * fontWidth, (row + 1) * fontHeight);
  }

  context.fillStyle = '#fed';
  drawText('async function main() {', 0, 0);
  drawText('doStuff();', 1, 2);
  drawText('}', 2, 0);
  drawText('main();', 4, 0);

  context.strokeStyle = '#fff3';
  // while (true) {
    const time = await new Promise(requestAnimationFrame);
    for (let row = 0; row < 50; ++row) {
      for (let column = 0; column < 50; ++column) {
        const x = fontWidth * column;
        const y = fontHeight * row;
        context.strokeRect(x, y, fontWidth, fontHeight);
      }
    }
  // }
}

main();