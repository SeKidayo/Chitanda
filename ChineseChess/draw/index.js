/**
 * 绘图方法, 通过script标签引入时,此处定义的方法均会挂载在window上
 */

/**
 * 绘制连续线段
 * @param {CanvasRenderingContext2D} ctx 渲染上下文
 * @param {Record<string,any>[]} lineArray 线段关键点坐标数组
 * @param {Number} lineArray[].x x坐标
 * @param {Number} lineArray[].y y坐标
 * @param {Record<string, any>} options 线段绘制描述对象
 * @param {Boolean} options.isClosed 是否闭合, 默认为false
 * @param {Boolean} options.isFill 是否填充, 默认为 false
 * @param {Record<string, any>} options.style 线段样式对象
 */
function utils_drawLine(
  ctx,
  lineArray,
  options = { isClosed: false, isFill: false, style: {} }
) {
  if (!(lineArray instanceof Array)) {
    throw new Error("lineArray must be a array!");
  }

  if (lineArray.length < 2) {
    throw new Error("lineArray'length more than two");
  }

  const { isClosed, isFill, style } = options;

  ctx.beginPath();
  // 线段样式
  for (let k in style) {
    ctx[k] = style[k];
  }

  // 起始点
  ctx.moveTo(lineArray[0].x, lineArray[0].y);

  // 中途点
  for (let i = 1, len = lineArray.length; i < len; i++) {
    const { x, y } = lineArray[i];

    ctx.lineTo(x, y);
  }

  isClosed && ctx.closePath();

  isFill ? ctx.fill() : ctx.stroke();
}

/**
 * ****************************************
 * ****************************************
 */

/**
 * 绘制入口方法
 * @param {CanvasRenderingContext2D} ctx 渲染上下文
 */
function draw(ctx) {
  console.log(ctx);
  // 1.绘制出棋盘
  draw_chessboard(ctx);
}

/**
 * 绘制棋盘
 * @param {CanvasRenderingContext2D} ctx
 */
function draw_chessboard(ctx) {
  // 1)棋盘 九行八列
  // 2)九宫 中军帐
  // 3)河界 楚河汉界
  // 4)砲 炮 兵 卒 初始点十字
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 8; col++) {
      ctx.strokeRect(col * 50 + 50, row * 50 + 50, 50, 50);
    }
  }

  // ! 但是好蠢, 待抽离固定数值

  // 2)九宫 中军帐
  utils_drawLine(ctx, [
    { x: 200, y: 50 },
    { x: 300, y: 150 },
  ]);
  utils_drawLine(ctx, [
    { x: 300, y: 50 },
    { x: 200, y: 150 },
  ]);
  utils_drawLine(ctx, [
    { x: 200, y: 500 },
    { x: 300, y: 400 },
  ]);
  utils_drawLine(ctx, [
    { x: 300, y: 500 },
    { x: 200, y: 400 },
  ]);

  // 3)河界
  ctx.clearRect(50, 250, 400, 50);
  // 绘制文本
  ctx.font = "24px KaiTi";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("楚 河", 150, 275);
  ctx.fillText("汉 界", 350, 275);
  // ? 汉界 二字反转
  // ctx.save();
  // ctx.rotate(Math.PI);
  // ctx.fillText("汉 界", -350, -275);
  // ctx.restore();

  // 4)砲 炮 兵 卒 初始点十字
  draw_crosspoint(ctx, { x: 100, y: 150 });
  draw_crosspoint(ctx, { x: 400, y: 150 });
  draw_crosspoint(ctx, { x: 50, y: 200 }, [true, false, false, true]);
  draw_crosspoint(ctx, { x: 150, y: 200 });
  draw_crosspoint(ctx, { x: 250, y: 200 });
  draw_crosspoint(ctx, { x: 350, y: 200 });
  draw_crosspoint(ctx, { x: 450, y: 200 }, [false, true, true, false]);

  draw_crosspoint(ctx, { x: 100, y: 400 });
  draw_crosspoint(ctx, { x: 400, y: 400 });
  draw_crosspoint(ctx, { x: 50, y: 350 }, [true, false, false, true]);
  draw_crosspoint(ctx, { x: 150, y: 350 });
  draw_crosspoint(ctx, { x: 250, y: 350 });
  draw_crosspoint(ctx, { x: 350, y: 350 });
  draw_crosspoint(ctx, { x: 450, y: 350 }, [false, true, true, false]);
}

/**
 * 绘制砲 炮 兵 卒 初始点十字
 * @param {CanvasRenderingContext2D} ctx 渲染上下文
 * @param {Record<string,any>} origin 十字点中心坐标
 * @param {Number} origin.x
 * @param {Number} origin.y
 * @param {Boolean[]} quadrantArray 四角区域线段是否存在; 0 - 右上 | 1 - 左上 | 2 - 左下 | 3 - 左下
 */
function draw_crosspoint(
  ctx,
  origin,
  quadrantArray = [true, true, true, true]
) {
  quadrantArray[0] &&
    utils_drawLine(ctx, [
      { x: origin.x + 5, y: origin.y - 5 - 10 },
      { x: origin.x + 5, y: origin.y - 5 },
      { x: origin.x + 5 + 10, y: origin.y - 5 },
    ]);
  quadrantArray[1] &&
    utils_drawLine(ctx, [
      { x: origin.x - 5, y: origin.y - 5 - 10 },
      { x: origin.x - 5, y: origin.y - 5 },
      { x: origin.x - 5 - 10, y: origin.y - 5 },
    ]);
  quadrantArray[2] &&
    utils_drawLine(ctx, [
      { x: origin.x - 5, y: origin.y + 5 + 10 },
      { x: origin.x - 5, y: origin.y + 5 },
      { x: origin.x - 5 - 10, y: origin.y + 5 },
    ]);
  quadrantArray[3] &&
    utils_drawLine(ctx, [
      { x: origin.x + 5, y: origin.y + 5 + 10 },
      { x: origin.x + 5, y: origin.y + 5 },
      { x: origin.x + 5 + 10, y: origin.y + 5 },
    ]);
}

console.log("绘图方法已挂载");
