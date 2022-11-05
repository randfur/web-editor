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
  const fontHeight = textMetrics.fontBoundingBoxAscent + textMetrics.fontBoundingBoxDescent;
  const fontBaseline = textMetrics.fontBoundingBoxDescent;


  function drawText(text, row, column) {
    context.fillText(text, column * fontWidth, (row + 1) * fontHeight - fontBaseline);
  }

  let cursor = {
    row: 0,
    column: 0,
    timeDelta: 0,
  };
  window.addEventListener('keydown', event => {
    cursor.timeDelta = performance.now();
    switch (event.key || event.code) {
      case 'ArrowLeft':
      case 'h':
        --cursor.column;
        break;
      case 'ArrowRight':
      case 'l':
        ++cursor.column;
        break;
      case 'ArrowUp':
      case 'k':
        --cursor.row;
        break;
      case 'ArrowDown':
      case 'j':
        ++cursor.row;
        break;
    }
    if (cursor.row < 0) {
      cursor.row = 0;
    }
    if (cursor.column < 0) {
      cursor.column = 0;
    }
  });

  while (true) {
    const time = await new Promise(requestAnimationFrame);

    context.clearRect(0, 0, width, height);

    context.fillStyle = '#fed';
    drawText('async function main() {', 0, 0);
    drawText('doStuff();', 1, 2);
    drawText('}', 2, 0);
    drawText('main();', 4, 0);

    context.fillStyle = '#fff';
    const x = cursor.column * fontWidth;
    const y = cursor.row * fontHeight;
    context.fillRect(x, y, 1, fontHeight);
    context.fillStyle = `rgba(255, 255, 255, ${100 * (Math.cos((time - cursor.timeDelta) / 300) + 1) / 2}%)`;
    context.fillRect(x, y, fontWidth, fontHeight);
  }
}

main();
