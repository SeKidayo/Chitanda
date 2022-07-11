# Canvas

> [本文教程](https://www.runoob.com/w3cnote/html5-canvas-intro.html)

## canvas简介

## canvas基本使用

### `<canvas>`元素

1. `width`、`height`属性可选,，若不设置时，默认`width`为300，`height`为150，单位`px`
2. 可以使用`css`属性来设置宽高，但是如果宽高和初始比例不一致，他会出现扭曲；所以还是不推荐使用`css`属性来设置`<canvas>`的宽高
3. 某些较老的浏览器或者浏览器不支持`<canvas>`时，会渲染`<canvas>`下的内容。支持`canvas`的浏览器只会渲染`<canvas>`标签，而忽略其中的替代内容。

```html
<canvas id="XXX" width="300" height="150" >
	你的浏览器不支持canvas,请升级你的浏览器。
</canvas>
```



### 渲染上下文

`<canvas>`会创建一个固定大小的画布，会公开一个或多个**渲染上下文**(画笔)，使用**渲染上下文**来绘制和处理要展示的内容。

此处重点研究2D渲染上下文。

```js
const canvas = document.getElementById("tutorial");
// 获得2D上下文对象
const ctx = canvas.getContext("2d");
// 获得3D上下文对象(WebGL)
const ctx3d = cavans.getContext("webgl");
```



### 绘制形状

#### 栅格和坐标空间

`canvas`元素默认被网格所覆盖。通常来说网格中的一个单元相当于`canvas`元素中的**1像素**。栅格的起点为**左上角**，坐标为**(0, 0)**。所有元素的位置都相对于起点来定位。



#### 绘制矩形

`<canvas>`只支持一种原生的图形绘制：**矩形**。所有其他图形都至少需要生成一种路径(path)。不过我们拥有众多路径生成的方法让复杂图形的绘制成为了可能。

`<canvas>`提供了三种方法**绘制矩形**

1. `fillRect(x, y, width, height)`：绘制一个**填充的矩形**
2. `strokeRect(x, y, width, height)`：绘制一个矩形的边框
3. `clearRect(x, y, width, height)`：清除指定的矩形区域，然后这块区域会变的完全透明

注：这3个方法具有相同的参数

- **x，y**：指的是矩形的左上角的坐标（相对于`canvas`的坐标原点）
- **width，height**：指的是绘制的矩形的宽和高



当然，也可以先**创建**矩形，再绘制

`rect(x, y, width, height)`：创建矩形







### 绘制路径（path）

图形的基本元素是路径。

路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。

一个路径，甚至一个子路径，都是闭合的。

使用**路径绘制图形**的步骤：

1. 创建路径起始点
2. 调用绘制方法去绘制出路径
3. 封闭路径
4. 一旦路径生成，通过描边或填充路径区域来渲染图形。

路径相关方法：

1. `beginPath()`：新建一条路径，路径一旦创建成功，图形绘制命令被指向到路径上生成路径
2. `moveTo(x,y)`：把画笔移动到指定的坐标(x,y)，相当于设置路径的起始点坐标
3. `lineTo(x,y)`：绘制一条从当前位置(比如`moveTo`指定的位置)到指定坐标(x,y)的直线
4. `closePath()`：闭合路径，图形绘制命令又重新指向到上下文中
5. `stroke()`：通过线条来绘制图形轮廓
6. `fill()`：通过填充路径的内容区域生成实心的图形



#### 绘制线段

```js
function draw() {
    const canvas = document.getElementById("XXX");
    if(!canvas.getContext) return;
    
    const ctx = canvas.getContext("2d");
    ctx.beginPath(); // 新建一条path
    ctx.moveTo(50, 50); // 移动画笔到指定的坐标
    ctx.lineTo(200, 50); // 绘制一条从当前位置到指定坐标(200, 50)的直线
    ctx.closePath(); // 闭合路径(连接最后一点和起始点)
    ctx.stroke(); // 描边。
}
draw();
```

#### 绘制三角形边框

```js
function draw() {
    const canvas = document.getElementById("XXX");
    if(!canvas.getContext) return;
    
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);
    ctx.closePath(); // 闭合路径
    
    ctx.stroke(); // 描边。stroke不会自动closePath()
}
draw();
```

#### 填充三角形

```js
function draw() {
    const canvas = document.getElementById("XXX");
    if(!canvas.getContext) return;
    
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(200, 50);
    ctx.lineTo(200, 200);
   
    ctx.fill(); //填充闭合区域。如果path没有闭合，则fill()会自动闭合路径。
}
draw();
```

#### 绘制圆弧*

有两种方法可以绘制圆弧：

1. **`arc(x, y, r, startAngle, endAngle, anticlockwise)`**：以(x,y)为**圆心**，以r为**半径**，**从startAngle弧度开始到endAngle弧度结束**。anticlockwise是布尔值，表明以何**方向**绘制；true表示逆时针，**false表示顺时针（默认是顺时针）**

   **注意：**

   - 0弧度指 x轴正方向

   - 弧度的**正值**为**顺时针**方向

   - 角度、弧度转换公式

     ```js
     radians = (Math.PI / 180) * degrees // degrees - 角度;  radians - 弧度
     ```

2. `arcTo(x1, y1, x2, y2, r)`：根据给定的**两个控制点**和**半径**画一段圆弧，最后再以直线连接两个控制点。

   **说明：**

   - `arcTo`方法需要有一个起始点(?)
   - `arcTo`方法理解：绘制的弧形是由两条切线所决定
   - 切线1：起始点和控制点1（即(x1,y1)）决定的线段
   - 切线2：控制点1和控制点2决定的线段
   - **绘制的圆弧就是与这两条线段相切的圆弧**



#### 绘制贝塞尔曲线

贝塞尔曲线，是应用于二维图形应用程序的数学曲线。

绘制二次贝塞尔曲线：

```js
quadraticCurveTo(cp1x, cp1y, x, y); // (cp1x, cp1y) 控制点坐标 (x, y) 结束点坐标
```

绘制三次贝塞尔曲线：

```js
bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```



### 添加样式和颜色

#### 颜色

在前面的绘制中，只用到了默认的线条和颜色。

如果想要给图形上色，有两个重要的属性可以做到。

1. `fillStyle = color`：设置图形的填充颜色
2. `strokeStyle = color`：设置图形轮廓的颜色

备注：

1. color可以是表示css颜色值的字符串、渐变对象或者图案对象。
2. 默认情况下，线条和填充颜色都是黑色
3. 一旦设置了`fillStyle`或`strokeStyle`的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，需要重新设置`fillStyle`或`strokeStyle`的值



#### Transparency(透明度)

```js
// 该属性影响到canvas中所有图形的透明度，有效的值范围是 0.0(完全透明)  到   1.0(完全不透明)
// 默认是 1.0
// globalAlpha属性在需要绘制大量拥有相同透明度的图形时候相当高效。
// 但对于单独的透明度设置使用rgba()更好
globalAlpha = transparecyValue
```



#### lineWidth

线宽。只能是正值，默认是 1.0

起始点和终点的连线为中心，上下各占线宽的一半



#### lineCap

线条末端样式。值如下：

1. `butt`：线段末端以**方形**结束	（默认）
2. `round`：线段末端以**圆形**结束，在原有线段的基础上增加的半圆区域
3. `square`：线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线宽一半的矩形区域



#### lineJoin

同一个path内，设定线条与线条间**接合处的样式**。值如下：

1. `round`：通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。圆角的半径是线段的宽度。
2. `bevel`：在相连部分的末端填充一个额外的以三角形为底的区域，每个部分都有各自独立的矩形拐角。
3. `miter`(默认)：通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。



#### 虚线

用`setLineDash`方法和`lineDashOffset`属性来制定虚线样式。

`setLineDash`方法接受一个**数组**，来指定交替的实线长度与间隙长度

`lineDashOffset`属性设置起始偏移量



### 绘制文本

`canvas`中渲染文本的两种方法：

1. `fillText(text, x, y [, maxWidth])`：在指定的`(x, y)`位置填充指定的文本`text`，绘制的最大宽度可选
2. `strokeText(text, x, y [, maxWidth])`：在指定的`(x, y)`位置绘制文本边框，绘制的最大宽度可选



#### 文本样式

1. `font`：文本样式。此属性和`CSS font`是相同的语法；默认值：`10px sans-serif`

2. `textAlign`：文本对齐选项。可选的值：`start` `end` `left` `right` `center` ，默认值是 `start`

   1. `start` | `left`：文本位于`fillText`或`strokeText`指定的`y`轴位置**右侧**
   2. `end` | `right`：文本位于`fillText`或`strokeText`指定的`y`轴位置**左侧**
   3. `center`：文本关于`fillText`或`strokeText`指定的`y`轴位置**对称**

3. `textBaseline`：基线对齐方向，可选值如下：

   1. `top`
   2. `hanging`
   3. `middle`
   4. `alphabetic`(默认值)
   5. `ideographic`
   6. `bottom`

   ![img_textbaseline](canvas.assets/img_textbaseline.gif)

4. `direction`：文本绘制方向，可选值如下：

   1. `ltr`：文本从左向右绘制，即在起始`y`轴右侧
   2. `rtl`：文本从右往左绘制，即在起始`y`轴左侧
   3. `inherit`(默认值)：继承`<canvas>`元素或 `document`元素，（它们默认也是`ltr`）



### 绘制图片

#### 创建图片

```js
// img - 图像实例对象
// x,y - 图像在canvas中的坐标
// width,height - 宽高
ctx.drawImage(img, x, y, width, height);

// tips
// img来源有两种:
// 1. new Image()
const img = new Image();   // 创建img元素
img.onload = function(){
    ctx.drawImage(img, 0, 0)
}
img.src = 'myImage.png'; // 设置图片源地址
// 2. 页面中的<img />标签
<img src="./xxx.jpg" alt="" width="300" />
<canvas id="tutorial" width="600" height="400"></canvas>
<script>
  function draw(){
      var canvas = document.getElementById('tutorial');
      if (!canvas.getContext) return;
      var ctx = canvas.getContext("2d");
      var img = document.querySelector("img");
      ctx.drawImage(img, 0, 0);
  }
  document.querySelector("img").onclick = function (){
      draw();
  }
</script>
```



#### 切片

```js
// image - 图像实例对象
// (sx, sy, sWidth, sHeight) -> 图像源的切片位置和宽高
// (dx, dy, dWidth, dHeight) -> 切片的目标显示位置和宽高
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```



### 状态的保存和恢复

saving and restoring state 是绘制复杂图形时必不可少的操作。

**`save()`**：保存**`canvas`状态**，没有参数。

**`cnavas`状态**存储在栈中，每当`save()`方法被调用后，当前的状态就被推送到栈中保存。

`canvas`状态包括：

1. 当前应用的变形（即移动、旋转和缩放）
2. `strokeStyle`, `fillStyle`, `globalAlpha`, `lineWidth`, `lineCap`, `lineJoin`, `miterLimit`, `shadowOffsetX`, `shadowOffsetY`, `shadowBlur`, `shadowColor`, `globalCompositeOperation `的值
3. 当前的裁切路径 `clipping path`

可以调用任意多次`save`方法（类似数组的`push`）



**`restore()`**：每一次调用`restore()`方法，上一个保存的状态就从栈中弹出，所有设定都恢复（类似数组的`pop`）



### 变形

> 注意：在做变形之前先保存状态是一个良好的习惯。

#### translate

`translate(x, y)`：用来移动`canvas`的**原点**到指定的位置



#### rotate

`rotate(angle)`：旋转坐标系；`angle` -- 旋转的弧度，顺时针方向



#### scale

`scale(x, y)`：对形状、位图进行缩小或者放大；

x，y分别是横轴和纵轴的缩放因子，它们必须是正值。值比1.0小表示缩小，比1.0大表示放大



#### transform（变换矩阵）

```js
transform(a, b, c, d, e, f);
```

$$
\left[
\begin{matrix}
a & c & e \\
b & d & f \\
0 & 0 & 1
\end{matrix}
\right]
$$

参数含义：

- a：水平缩放
- b：水平偏斜
- c：垂直偏斜
- d：垂直缩放
- e：水平移动
- f ：垂直移动



### 合成

当绘制的多个图形有重叠时，默认是将后绘制的图形覆盖在旧图形之上，但这样是远远不够的。

于是引入`globalCompositeOperation`属性来改变这种状况

```js
globalCompositeOperation = type
```

type的取值是下面13种字符串之一：

1. `source-over`(默认值)：新图像 覆盖在 原有图像之上

2. `source-in`：显示新图像与原有图像**重叠**的部分，其他区域变为透明。（重叠部分为**新图像**样式）

3. `source-out`：显示**新图像没有重叠**的部分，其他区域全部透明。

4. `source-atop`：显示**原有图像没有重叠部分 + 重叠部分** （重叠部分为**新图像**样式）

5. `destination-over`：原有图像 覆盖在 新图像之上

6. `destination-in`：显示新图像与原有图像**重叠**的部分，其他区域变为透明（重叠部分为**原有图像**样式）

7. `destination-out`：显示**原有图像没有重叠**的部分，其他区域全部透明。

8. `destination-atop`：显示**新图像没有重叠部分 + 重叠部分**（重叠部分为**原有图像**样式）

9. `lighter`：重叠部分 颜色做 **加 处理**（eg：红色 + 蓝色 -> 粉色），其他部分正常显示

10. `darken`：重叠部分 保留最黑的像素（每个颜色位进行比较，得到最小值）

    eg：blue：#0000ff      red：#ff0000

    重叠部分颜色：#000000

11. `lighten`：重叠部分 保留最亮的像素（每个颜色位进行比较，得到最大值）

12. `xor`：重叠部分会变成透明

13. `copy`：只有新图像会被保留



### 裁剪路径

`clip()`：把**已经创建的路径**转换成**裁剪路径**。

裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。

注意：`clip()`只能遮罩在这个方法**调用之后**绘制的图像，如果是`clip()`方法调用之前绘制的图像，则无法实现遮罩。



### 动画

#### 动画的基本步骤

1. **清空canvas**；在绘制每一帧动画之前，需要清空所有。清空所有最简单的做法就是`clearRect()`方法。
2. **保存cnavas状态**；如果在绘制的过程中会更改`canvas`的状态(颜色，移动了坐标原点等)，又在绘制每一帧时都是原始状态的话，则最好保存下`canvas`的状态。
3. **绘制动画图形**；绘制动画帧
4. **恢复`canvas`状态**；如果绘制动画的过程中保存了`cnavas`状态，则应该在绘制完成一帧之后恢复`canvas`状态



#### 控制动画

正常情况下，我们能看到绘制的结果是在脚本执行结束之后。例如，我们**不可能**在一个for循环内部完成动画

所以，为了执行动画，我们需要一些可以定时执行重绘的方法。

一般会用到下面三个方法：

1. `setInterval()`
2. `setTimeout()`
3. `requestAnimationFrame()`