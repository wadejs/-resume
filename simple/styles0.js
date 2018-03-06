var style0 = `/**
*
* Hello,你好! 我的名字是邱煌. 是一名前端工程师
* 这个网页是根据网上大神的源码修改而来的,just for fun.
*
*
* 它可以动态加载样式哦！
*/

/**
* 让我们开始吧！先来点基础样式！
*/

* {
 -webkit-transition: all 1s;
}

/**
* 好像没有变化是吗?马上就变
*
* 白底黑字略显单调,
* 就从它开始改变吧.
*/

html {
 background: rgb(40,44,52);
}

/***
* 还有...
*/

pre, a {
 color: white;
}

/**
* 好一些了,但还是有点辣眼睛.
*
* 在整个页面里写样式太空旷了.
*
* 我准备把它放到一个区域里.
*/

pre:not(:empty) {
 overflow: auto;
 background: rgb(48, 48, 48);
 border: 1px solid #ccc;
 max-height: 44.6%;
 width: 49%;
 font-size: 14px;
 font-family: monospace;
 padding: 10px 10px 20px;
 box-shadow: -4px 4px 2px 0 rgba(0,0,0,0.3);
 white-space: pre-wrap;
 outline: 0;
}

/**
* 好了,准备开始多增加点样式.
* 先把样式框网右边挪挪.
* 走你！
*/

#style-text {
 -webkit-transform: translateX(95%);
 position: absolute;
}

/**
* 哈哈哈,现在代码都是白的!
* 再给代码加上点颜色吧.
*/

.comment       { color: #857F6B; font-style: italic; }
.selector      { color: #E69F0F; }
.selector .key { color: #64D5EA; }
.key           { color: #64D5EA; }
.value         { color: #BE84F2; }
.value.px      { color: #F92772; }

/**
* 又好一些了.
* 再来点透视效果吧.
*/

body {
 -webkit-perspective: 1000px;
}

#style-text {
 -webkit-transform: translateX(98.5%) rotateY(-10deg);
 -webkit-transform-origin: right;
 max-height: 94.5%;
}

/**
* 啊!对了,这是个简历页面
* 那就开始写简历吧.
*/

pre:not(#style-text) {
 -webkit-transform: rotateY(10deg);
 -webkit-transform-origin: left;
}
`