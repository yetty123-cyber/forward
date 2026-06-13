var WidgetMetadata = {
  id: "xhamster_capyplayer",
  title: "xHamster",
  description: "xHamster CapyPlayer 规范版，支持最新、热门、搜索与播放解析。",
  author: "Minis",
  site: "https://zh.xhamster.com",
  version: "2.1.0",
  modules: [
    {
      id: "latest",
      title: "最新更新",
      type: "media_list",
      functionName: "loadLatest",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "popular",
      title: "热门视频",
      type: "media_list",
      functionName: "loadPopular",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "search_module",
      title: "网站搜索",
      type: "media_list",
      functionName: "searchVideos",
      cacheDuration: 300,
      timeoutSeconds: 30,
      params: [
        { name: "keyword", title: "搜索关键词", type: "string", value: "" },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    }
  ],
  search: {
    title: "搜索视频",
    functionName: "searchVideos",
    params: [
      { name: "keyword", title: "搜索关键词", type: "string", value: "" },
      { name: "page", title: "页码", type: "page", value: "1" }
    ]
  }
};

var DEFAULT_BASE_URL = "https://zh.xhamster.com";
var REQUEST_TIMEOUT = 15000;
var DEFAULT_HEADERS = {
  "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
  "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
  "Referer": DEFAULT_BASE_URL + "/"
};

function ensureArray(v) { return Array.isArray(v) ? v : []; }
function normalizeUrl(url) {
  if (!url) return "";
  if (url.indexOf("//") === 0) return "https:" + url;
  if (url.indexOf("/") === 0) return DEFAULT_BASE_URL + url;
  return url;
}
function cleanText(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}
function pageNum(value) {
  var n = parseInt(value || "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}
function searchSlug(keyword) {
  return cleanText(keyword).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "search";
}
function sourceLabel(source) {
  var text = cleanText(source.label || source.quality || source.url);
  var hls = /m3u8/i.test(source.url || text);
  var m = text.match(/(2160|1440|1080|720|540|480|360|240)\s*p/i);
  if (m) return m[1] + "p";
  return hls ? "HLS 自适应" : "视频源";
}
function sourceScore(source) {
  var label = sourceLabel(source);
  var map = { "2160p":2160, "1440p":1440, "1080p":1080, "720p":720, "540p":540, "480p":480, "360p":360, "240p":240 };
  return map[label] || (/m3u8/i.test(source.url || "") ? 900 : 0);
}
function sortSourcesByQuality(list) {
  return ensureArray(list).slice().sort(function(a, b) { return sourceScore(b) - sourceScore(a); });
}

async function apiGet(url) {
  var resp = await Widget.http.get(url, { headers: DEFAULT_HEADERS, timeout: REQUEST_TIMEOUT });
  return String(resp.data || "");
}
async function getHtmlDoc(url) {
  return Widget.html.load(await apiGet(url));
}
function buildSearchUrl(keyword, page) {
  return DEFAULT_BASE_URL + "/search/" + searchSlug(keyword) + "?page=" + page;
}
function mapListItem(raw) {
  return {
    id: String(raw.id || raw.link || raw.title),
    title: cleanText(raw.title || ""),
    posterUrl: normalizeUrl(raw.poster || ""),
    backdropUrl: normalizeUrl(raw.poster || ""),
    description: [raw.views || "", raw.duration || ""].filter(Boolean).join(" | "),
    mediaType: "movie",
    link: normalizeUrl(raw.link || "")
  };
}
async function parseListPage(url) {
  var $ = await getHtmlDoc(url);
  var items = [];
  var seen = {};
  $("div.mobile-video-thumb, article, .thumb-list__item, .video-thumb").each(function(_, el) {
    var card = $(el);
    var linkNode = card.find("a.thumb-image-container, a.mobile-video-thumb__name, a[href*='/videos/'], a[href*='/videos2/']").first();
    var href = normalizeUrl(linkNode.attr("href") || "");
    if (!href || !/\/videos/.test(href) || seen[href]) return;
    var img = card.find("img").first();
    var title = cleanText(card.find("a.mobile-video-thumb__name").first().text() || linkNode.attr("title") || img.attr("alt") || "");
    var poster = normalizeUrl(img.attr("src") || img.attr("data-src") || img.attr("data-preview") || "");
    var duration = cleanText(card.find("time, .thumb-image-container__duration").first().text());
    var views = cleanText(card.find(".video-thumb-views, .views").first().text());
    if (!title) return;
    seen[href] = true;
    items.push(mapListItem({
      id: href,
      title: title,
      poster: poster,
      duration: duration,
      views: views,
      link: href
    }));
  });
  return items;
}
async function searchVideos(params) {
  params = params || {};
  var keyword = cleanText(params.keyword || params.query || "");
  if (!keyword) return [];
  return parseListPage(buildSearchUrl(keyword, pageNum(params.page)));
}
async function loadLatest(params) {
  params = params || {};
  return parseListPage(DEFAULT_BASE_URL + "/newest/" + pageNum(params.page));
}
async function loadPopular(params) {
  params = params || {};
  return parseListPage(DEFAULT_BASE_URL + "/best/" + pageNum(params.page));
}
function collectSources(html) {
  var urls = [];
  var re1 = /https:[^"'\s]+\.m3u8[^"'\s]*/gi;
  var re2 = /https:[^"'\s]+\.mp4[^"'\s]*/gi;
  var match;
  while ((match = re1.exec(String(html || "")))) {
    urls.push(match[0].split('\\/').join('/').replace(/&amp;/g, '&'));
  }
  while ((match = re2.exec(String(html || "")))) {
    urls.push(match[0].split('\\/').join('/').replace(/&amp;/g, '&'));
  }
  var seen = {};
  var results = [];
  for (var i = 0; i < urls.length; i++) {
    if (seen[urls[i]]) continue;
    seen[urls[i]] = true;
    results.push({ url: urls[i], label: sourceLabel({ url: urls[i] }) });
  }
  return results;
}
async function loadDetail(link) {
  try {
    var html = await apiGet(link);
    var titleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i);
    var title = titleMatch && titleMatch[1] ? cleanText(titleMatch[1]) : "标题未知";
    if (!title) {
      var titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      title = titleTag && titleTag[1] ? cleanText(titleTag[1]) : "标题未知";
    }

    var coverMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    var cover = normalizeUrl(coverMatch && coverMatch[1] ? coverMatch[1] : "");

    var descMatch = html.match(/<meta[^>]+(?:name=["']description["']|property=["']og:description["'])[^>]+content=["']([^"']+)["']/i);
    var desc = descMatch && descMatch[1] ? cleanText(descMatch[1]) : "";

    var sources = sortSourcesByQuality(collectSources(html));
    if (!sources.length) {
      return { title: "未找到可播放的视频地址" };
    }

    return {
      title: title,
      posterUrl: cover,
      backdropUrl: cover,
      description: desc,
      videoUrl: String(sources[0].url || "")
    };
  } catch (error) {
    return { title: "加载失败", description: error.message || String(error) };
  }
}
