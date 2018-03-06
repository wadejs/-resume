let styleBuffer = '';
const fullTextStorage = {};

function writeChar(el, char, style){
  // Grab text. We buffer it in storage so we don't have to read from the DOM every iteration.
  let fullText = fullTextStorage[el.id];
  if (!fullText) fullText = fullTextStorage[el.id] = el.innerHTML;

  fullText = handleChar(fullText, char);
  // But we still write to the DOM every iteration, which can be pretty slow.
  el.innerHTML = fullTextStorage[el.id] = fullText;

  // Buffer writes to the <style> element so we don't have to paint quite so much.
  // char文件里每一个单一的字符
  styleBuffer += char;
  if (char === ';') {
    style.textContent += styleBuffer;
    styleBuffer = '';
  }
};

function writeSimpleChar(el, char) {
  el.innerHTML += char;
};

let openComment = false;
const commentRegex = /(\/\*(?:[^](?!\/\*))*\*)$/; // 匹配注释的正则
const keyRegex = /([a-zA-Z- ^\n]*)$/; // 匹配样式里key的正则
const valueRegex = /([^:]*)$/; // 匹配样式里value的正则
const selectorRegex = /(.*)$/; // 匹配选择器的正则
const pxRegex = /\dp/;
const pxRegex2 = /p$/; // 匹配px的正则

function handleChar(fullText, char) {
  if (openComment && char !== '/') {
    // Short-circuit during a comment so we don't highlight inside it.
    fullText += char;
  } else if (char === '/' && openComment === false) {
    openComment = true;
    fullText += char;
  } else if (char === '/' && fullText.slice(-1) === '*' && openComment === true) {
    openComment = false;
    // Unfortunately we can't just open a span and close it, because the browser will helpfully
    // 'fix' it for us, and we'll end up with a single-character span and an empty closing tag.
    fullText = fullText.replace(commentRegex, '<span class="comment">$1/</span>');
  } else if (char === ':') {
    fullText = fullText.replace(keyRegex, '<span class="key">$1</span>:');
  } else if (char === ';') {
    fullText = fullText.replace(valueRegex, '<span class="value">$1</span>;');
  } else if (char === '{') {
    fullText = fullText.replace(selectorRegex, '<span class="selector">$1</span>{');
  } else if (char === 'x' && pxRegex.test(fullText.slice(-2))) {
    fullText = fullText.replace(pxRegex2, '<span class="value px">px</span>');
  } else {
    fullText += char;
  }
  return fullText;
}
