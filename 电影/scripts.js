// 获取 id 为 root 的元素
const app = document.getElementById('root');

// 创建一个 img 元素并设置其 src 属性为 logo.png
const logo = document.createElement('img');


// 创建一个 div 元素并设置其 class 属性为 container
const container = document.createElement('div');
container.setAttribute('class', 'container');

// 将 logo 和 container 元素添加到 app 元素中
app.appendChild(logo);
app.appendChild(container);

// 创建一个 XMLHttpRequest 对象
var request = new XMLHttpRequest();

// 打开一个 GET 请求，请求地址为 https://api.pingcc.cn/fiction/search/author/耳根
request.open('GET', 'https://api.pingcc.cn/video/search/region/美国/1/20', true);

// 请求成功后执行的函数
request.onload = function () {

  // 将响应数据解析为 JSON 格式
  var data = JSON.parse(this.response);

  // 如果请求成功
  if (request.status >= 200 && request.status < 400) {

    // 遍历每个小说
    data.data.forEach(novel => {

      // 创建一个 div 元素并设置其 class 属性为 card
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      // 创建一个 h1 元素并设置其文本内容为小说的标题
      const h1 = document.createElement('h1');
      h1.textContent = novel.title;

      // 创建一个 p 元素并设置其文本内容为小说的描述（截取前 300 个字符）
      const p = document.createElement('p');
      novel.descs = novel.descs.substring(0, 400);
      p.textContent = `${novel.descs}...`;

      // 创建一个 img 元素并设置其 src 属性为小说的封面图片
      const cover = document.createElement('img');
      cover.src = novel.cover;

      // 创建一个 p 元素并设置其文本内容为小说的作者和类型
      const authorType = document.createElement('p');
      authorType.textContent = `作者：${novel.author} | 类型：${novel.fictionType}`;

      // 创建一个 p 元素并设置其文本内容为小说的更新时间
      const updateTime = document.createElement('p');
      updateTime.textContent = `更新时间：${novel.updateTime}`;

      // 将 card 元素添加到 container 元素中
      container.appendChild(card);

      // 将 h1、p、cover、authorType 和 updateTime 元素添加到 card 元素中
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(cover);
      card.appendChild(authorType);
      card.appendChild(updateTime);
    });
  } else {

    // 如果请求失败，创建一个 marquee 元素并设置其文本内容为 "Gah, it's not working!"
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;

    // 将 errorMessage 元素添加到 app 元素中
    app.appendChild(errorMessage);
  }
}

// 发送请求
request.send();