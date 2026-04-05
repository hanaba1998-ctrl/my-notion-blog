// 把下面引号里的链接换成你的 Notion 公开页面链接
const NOTION_PAGE_URL = "https://hammerhead-basketball-8b2.notion.site/111-3396e67dc2ea80fc95e4c98db5dcfc55";

export default async function handler(req, res) {
  // 禁止搜索引擎收录
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  
  try {
    const response = await fetch(NOTION_PAGE_URL);
    let html = await response.text();
    
    // 加入禁止索引的标签
    html = html.replace('</head>', '<meta name="robots" content="noindex, nofollow">\n</head>');
    
    // 替换链接，让页面内的跳转也走你的 Vercel 网址
    html = html.replace(/https:\/\/www\.notion\.so\/[a-zA-Z0-9]+/g, '');
    
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('加载失败，请稍后再试。错误：' + error.message);
  }
}