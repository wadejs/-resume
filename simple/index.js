let speed =16;
let endOfSentence = /[\.\?\!]\s$/; // 以 .或?或！加一个空格结尾
let comma = /\D[\,]\s$/; // 任意非数字打头，跟一个 , 再加一个任意空白字符
let endOfBlock = /[\/]\n\n$/; // 以‘/’打头后面跟两个回车结尾

// 当文档元素加载完成后开始执行代码.
document.addEventListener("DOMContentLoaded", function() {
    getEls();
    startAnimation();
  });

  async function startAnimation() {
    await writeTo(styleEl, style0, 0, speed, true, 1);
    await writeTo(workEl, workText, 0, speed, false, 1);
    await writeTo(styleEl, style1, 0, speed, true, 1);
    createWorkBox();
    await Promise.delay(1000);
    await writeTo(styleEl, style2, 0, speed, true, 1);
    await writeTo(styleEl, style3, 0, speed, true, 1);
  }

async function writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval){ // 获取文本，写入函数
    // 从message里取出字符串，逐个截取字符串
    let chars = message.slice(index, index + charsPerInterval);
    index += charsPerInterval; // 截取的初始位递增
    // 为了保证窗口始终显示最新文字出现的位置（该窗口底部）
    el.scrollTop = el.scrollHeight;
    // 判断mirrorToStyle，来确定是写入到style标签里还是简历标签里
    if (mirrorToStyle) {
      writeChar(el, chars, style); // 把message里的样式写入到style标签里
    } else {
      writeSimpleChar(el, chars); // 把message里的内容写入到简历框里
    }
    // 如果没有写到message的结尾，则继续调用writeTo方法
    if (index < message.length) {
      let thisInterval = interval;
      let thisSlice = message.slice(index - 2, index + 1);
      if (comma.test(thisSlice)) thisInterval = interval * 30; // 匹配逗号，如果遇上逗号，则停顿时间加长
      if (endOfBlock.test(thisSlice)) thisInterval = interval * 50; // 匹配注释部分结束
      if (endOfSentence.test(thisSlice)) thisInterval = interval * 70; // 匹配语言的停顿，如逗号句号感叹号
  
      await Promise.delay(thisInterval); // 使文字一个字一个字的呈现
  
      return writeTo(el, message, index, interval, mirrorToStyle, charsPerInterval);
    }
  }
// 取得需要用到的元素对象
function getEls() {
    // 设置基础样式
    let preStyleEl = document.createElement('style');
    preStyleEl.textContent = preStyles;
    document.head.insertBefore(preStyleEl, document.getElementsByTagName('style')[0]); // 把preStyles插入到head中
    // 取得需要用到的元素对象
    style = document.getElementById('style-tag'); // style标签
    styleEl = document.getElementById('style-text'); // 用来放样式的元素
    workEl = document.getElementById('work-text'); // 用来放简历的元素
  }

// 翻转workEl并且把workEl里的markdown转化成html
function createWorkBox() {
    if (workEl.classList.contains('flipped')) return;
    // 把workEl里的markdown转化成html
    workEl.innerHTML = '<div class="md">' + marked(workText) + '<div>';
    // 把workEl翻转
    workEl.classList.add('flipped');
    workEl.scrollTop = 9999; // 因为颠倒了，所有手动把他滚动到“顶部”
  
  }