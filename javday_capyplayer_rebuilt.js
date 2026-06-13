var WidgetMetadata = {
  id: "javday_capyplayer",
  title: "JAVDay",
  description: "JAVDay CapyPlayer 规范版，支持搜索、最新更新、人气系列、新作、有码/无码/流出、厂商和播放解析。",
  author: "Minis",
  version: "2.0.0",
  site: "https://javday.app",
  modules: [
    {
      id: "search_module",
      title: "搜索视频",
      type: "media_list",
      functionName: "search",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "keyword", title: "女優/番號/關鍵字", type: "string", value: "" },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "latest",
      title: "最新更新",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/label/new/" },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "hot",
      title: "人气系列",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/label/hot/" },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "new_release",
      title: "新作上市",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/category/new-release/" },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "new",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "censored",
      title: "有码视频",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/category/censored/" },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "popular",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "uncensored",
      title: "无码视频",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/category/uncensored/" },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "new",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "leaked",
      title: "无码流出",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/category/uncensored-leaked/" },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "new",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "sex8",
      title: "杏吧视频",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/category/sex8/" },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "popular",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "hongkongdoll",
      title: "玩偶姐姐",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/category/hongkongdoll/" },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "popular",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "chinese_av",
      title: "国产 AV",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "url", title: "列表地址", type: "constant", value: "https://javday.app/category/chinese-av/" },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "popular",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "category",
      title: "国产厂商",
      type: "media_list",
      functionName: "loadPage",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        {
          name: "url",
          title: "厂商",
          type: "enum",
          value: "https://javday.app/category/madou/",
          enumOptions: [
            { title: "麻豆传媒", value: "https://javday.app/category/madou/" },
            { title: "果冻传媒", value: "https://javday.app/category/91zhipianchang/" },
            { title: "天美传媒", value: "https://javday.app/category/timi/" },
            { title: "星空无限", value: "https://javday.app/category/xingkong/" },
            { title: "皇家华人", value: "https://javday.app/category/royalasianstudio/" },
            { title: "蜜桃影像", value: "https://javday.app/category/mtgw/" },
            { title: "精东影业", value: "https://javday.app/category/jdav/" },
            { title: "台湾 AV", value: "https://javday.app/category/twav/" },
            { title: "JVID", value: "https://javday.app/category/jvid/" },
            { title: "萝莉社", value: "https://javday.app/category/luolisheus/" },
            { title: "糖心VLOG", value: "https://javday.app/category/txvlog/" },
            { title: "Psychoporn TW", value: "https://javday.app/category/psychoporn-tw/" }
          ]
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enum",
          value: "new",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人气最高", value: "popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    }
  ]
};

var JAVDAY_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36";

function ensureArray(v) { return Array.isArray(v) ? v : []; }

function buildPageUrl(baseUrl, sortBy, page) {
  var categoryId = "";
  var m = baseUrl.match(/\/([^/]+)\/?$/);
  if (m && m[1]) categoryId = m[1];
  if (!categoryId) categoryId = 'unknown';

  var path;
  if (sortBy === "popular") {
    path = "/fiter/by/hits/id/" + categoryId;
  } else {
    path = baseUrl.indexOf('label/') >= 0 ? baseUrl : "/category/" + categoryId;
  }
  var p = Number(page || 1);
  if (p > 1) return path + "/page/" + p + "/";
  return path + "/";
}

function getFullUrl(path) {
  if (path.indexOf("http") === 0) return path;
  return "https://javday.app" + path;
}

function getCoverImgSrc($item) {
  var coverElement = $item.find(".videoBox-cover");
  var styleAttr = coverElement.attr("style") || "";
  var m = styleAttr.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
  if (m && m[1]) {
    var url = m[1];
    if (url.indexOf("//") === 0) return "https:" + url;
    if (url.indexOf("http") === 0) return url;
    return "https://javday.app" + (url.indexOf("/") === 0 ? "" : "/") + url;
  }
  var img = $item.find("img").first();
  return (img && img.attr && (img.attr("src") || img.attr("data-src") || "")) || "";
}

function mapJavdayItem(raw) {
  return {
    id: String(raw.id || raw.link || raw.title),
    title: String(raw.title || "").trim(),
    posterUrl: raw.poster || "",
    backdropUrl: raw.poster || "",
    description: raw.desc || "",
    mediaType: "movie",
    link: raw.link || ""
  };
}

function parseJavdayList(htmlContent) {
  var results = [];
  var seen = {};
  var raw = String(htmlContent || "");

  var docId = Widget.dom.parse(raw);
  try {
    var boxes = Widget.dom.select(docId, "a.videoBox");
    for (var i = 0; i < boxes.length; i++) {
      var boxHtml = String(boxes[i].outerHtml || "");

      var linkMatch = boxHtml.match(/href="([^"]+)"/);
      var href = linkMatch ? linkMatch[1] : "";
      if (!href) continue;
      if (href.indexOf("http") !== 0) {
        href = href.indexOf("//") === 0 ? "https:" + href : "https://javday.app" + (href.indexOf("/") === 0 ? "" : "/") + href;
      }
      if (seen[href]) continue;
      seen[href] = true;

      var bgMatch = boxHtml.match(/background(?:-image)?:\s*url\((.+?)\)/);
      var poster = bgMatch ? bgMatch[1] : "";
      poster = poster.replace(/&quot;/g, "").replace(/['"]/g, "");
      if (poster.indexOf("//") === 0) poster = "https:" + poster;
      else if (poster.indexOf("http") !== 0) poster = "https://javday.app" + (poster.indexOf("/") === 0 ? "" : "/") + poster;

      var title = "";
      var tMatch = boxHtml.match(/<span\s+class="title"[^>]*>([^<]+)<\/span>/);
      if (tMatch) title = String(tMatch[1]).trim();
      if (!title) {
        var tMatch2 = boxHtml.match(/class="title"[^>]*>([^<]+)</);
        if (tMatch2) title = String(tMatch2[1]).trim();
      }
      if (!title) continue;

      results.push(mapJavdayItem({
        id: href,
        title: title,
        link: href,
        poster: poster
      }));
    }
    return results;
  } finally {
    Widget.dom.remove(docId);
  }
}

async function loadPage(params) {
  params = params || {};
  var baseUrl = String(params.url || "");
  if (!baseUrl) return [];
  var sortBy = params.sort_by || "new";
  var page = Number(params.page || 1);
  var path = buildPageUrl(baseUrl, sortBy, page);
  var targetUrl = getFullUrl(path);

  try {
    var response = await Widget.http.get(targetUrl, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        "Referer": "https://javday.app/"
      },
      timeout: 30000
    });
    var html = String(response.data || "");
    return ensureArray(parseJavdayList(html));
  } catch (e) {
    console.error("javday loadPage error", e && e.message ? e.message : e);
    return [];
  }
}

async function search(params) {
  params = params || {};
  var keyword = String(params.keyword || "").trim();
  if (!keyword) return [];
  var page = Number(params.page || 1);
  var searchUrl = page === 1
    ? "https://javday.app/search/?wd=" + encodeURIComponent(keyword)
    : "https://javday.app/search/page/" + page + "/wd/" + encodeURIComponent(keyword) + "/";

  try {
    var response = await Widget.http.get(searchUrl, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        "Referer": "https://javday.app/"
      },
      timeout: 30000
    });
    var html = String(response.data || "");
    return ensureArray(parseJavdayList(html));
  } catch (e) {
    console.error("javday search error", e && e.message ? e.message : e);
    return [];
  }
}

async function loadDetail(link) {
  try {
    var response = await Widget.http.get(link, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        "Referer": "https://javday.app/"
      },
      timeout: 30000
    });
    var html = String(response.data || "");
    var title = "";
    var poster = "";
    var videoUrl = "";

    var docId = Widget.dom.parse(html);
    try {
      var metaTitle = Widget.dom.select(docId, 'meta[property="og:title"]')[0];
      if (metaTitle && metaTitle.attributes && metaTitle.attributes.content) title = metaTitle.attributes.content;
      var metaImage = Widget.dom.select(docId, 'meta[property="og:image"]')[0];
      if (metaImage && metaImage.attributes && metaImage.attributes.content) poster = metaImage.attributes.content;
    } finally {
      Widget.dom.remove(docId);
    }

    var urlMatch = html.match(/url:\s*['"]([^'"]+\.m3u8[^'"]*)['"]/);
    if (urlMatch && urlMatch[1]) videoUrl = urlMatch[1].split('\\/').join('/');
    if (!videoUrl) {
      var m3u8Match = html.match(/https?:\/\/[^"'\s\\<>]+\.m3u8[^"'\s\\<>]*/);
      if (m3u8Match && m3u8Match[0]) videoUrl = m3u8Match[0];
    }
    if (!videoUrl) {
      var sourceMatch = html.match(/src=["']([^"']+\.m3u8[^"']*)["']/);
      if (sourceMatch && sourceMatch[1]) videoUrl = sourceMatch[1];
    }
    if (!videoUrl) {
      return { title: title || "无法获取视频地址" };
    }

    return {
      title: title || "JAVDay",
      posterUrl: poster,
      backdropUrl: poster,
      videoUrl: videoUrl,
      playerType: "system",
      headers: {
        "Referer": "https://javday.app/",
        "Origin": "https://javday.app",
        "User-Agent": JAVDAY_USER_AGENT
      },
      customHeaders: {
        "Referer": "https://javday.app/",
        "Origin": "https://javday.app",
        "User-Agent": JAVDAY_USER_AGENT
      }
    };
  } catch (e) {
    return { title: "请求错误" };
  }
}
