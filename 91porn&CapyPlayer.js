var SITE_BASE = "https://91porn.com";
var AUTH_COOKIE = "ga=mEC62%5Ed9e67bzosHP2pcO7VeB-xHFm5E2SojdnHXEkODVjRa-EYMsaGhIyaA; CLIPSHARE=9f373ca3802b03fc5ef6287f2242dafd; 91username=c1083lCsj0rTnRWOEYtu9ehDDXEXEtC2UvbZW19Wfh8737oJmA; DUID=1120a1faMYEAAd9R6llJ2-po4UQ8SU95fYVy4k_9so2PrBCayg; SUID=79c2m5gjGVIRCyQQS5P3-etd15aMEh8krMxYQZgswPsq_OnBiw; USERNAME=8b8et_cLKqE1g9xajXtIxzgro_94ofpS9bC1teYcH-Ge_LevJQ; EMAILVERIFIED=no; school=f4d7SbNpuSHgbzhfcCnjCKPNgTvyW9SJ6nS3g1s; level=4e61nN7UADfxiPB_Ew_6K0OuJUmUQPgwPsQ5aLmX; LOGIN_DEVICE_TOKEN=e40fLGF5G0ZuXttp3J25LgowCu9-4Q7qaieUJUz9qLZn_8nD4R-OOvs0u0NBWJIUsNbx5tT2rk3cN12HBQ; country_bean=6c850AomyYFqJpPeJ_3wPjgPPkw8MZ4lZb9z30ZS";  //填入自己cookie

var WidgetMetadata = {
  id: "91porn.video",
  title: "91Porn",
  description: "91Porn&CapyPlayer",
  author: "Codex&CapyPlayer",
  version: "1.0.0",
  site: SITE_BASE + "/v.php",
  icon: SITE_BASE + "/favicon.ico",
  modules: [
    {
      id: "current_hot",
      title: "当前最热",
      type: "media_list",
      functionName: "getCurrentHot",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "original_91",
      title: "91原创",
      type: "media_list",
      functionName: "getOriginal91",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "hd",
      title: "高清",
      type: "media_list",
      functionName: "getHdVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "top_this_month",
      title: "本月最热",
      type: "media_list",
      functionName: "getTopThisMonth",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "top_last_month",
      title: "每月最热",
      type: "media_list",
      functionName: "getTopLastMonth",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "recent_featured",
      title: "最近加精",
      type: "media_list",
      functionName: "getRecentFeatured",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "favorites_this_month",
      title: "本月收藏",
      type: "media_list",
      functionName: "getFavoritesThisMonth",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "discussed_this_month",
      title: "本月讨论",
      type: "media_list",
      functionName: "getDiscussedThisMonth",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "most_favorited",
      title: "收藏最多",
      type: "media_list",
      functionName: "getMostFavorited",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "latest",
      title: "最新视频",
      type: "media_list",
      functionName: "getLatestVideos",
      cacheDuration: 900,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [{ name: "page", label: "页码", type: "page" }]
    },
    {
      id: "search",
      title: "搜索",
      type: "media_list",
      functionName: "getSearchVideos",
      cacheDuration: 600,
      timeoutSeconds: 30,
      retryCount: 1,
      params: [
        { name: "keyword", label: "关键词", type: "string", required: true },
        { name: "page", label: "页码", type: "page" }
      ]
    }
  ]
};

async function getCurrentHot(params) {
  var page = normalizePage(params && params.page);

  if (page > 3) {
    return [];
  }

  var html = await requestHtml(buildCurrentHotUrl(page), SITE_BASE + "/v.php?category=hot&viewtype=basic");
  return parseCurrentHotList(html, page);
}

async function getOriginal91(params) {
  var page = normalizePage(params && params.page);

  if (page > 641) {
    return [];
  }

  var html = await requestHtml(buildOriginal91Url(page), SITE_BASE + "/v.php?category=ori&viewtype=basic");
  return parseOriginal91List(html, page);
}

async function getHdVideos(params) {
  var page = normalizePage(params && params.page);

  if (page > 3961) {
    return [];
  }

  var html = await requestHtml(buildHdVideosUrl(page), SITE_BASE + "/v.php?category=hd&viewtype=basic");
  return parseHdVideosList(html, page);
}

async function getTopThisMonth(params) {
  var page = normalizePage(params && params.page);

  if (page > 37) {
    return [];
  }

  var html = await requestHtml(buildTopThisMonthUrl(page), SITE_BASE + "/v.php?category=top&viewtype=basic");
  return parseTopThisMonthList(html, page);
}

async function getTopLastMonth(params) {
  var page = normalizePage(params && params.page);

  if (page > 37) {
    return [];
  }

  var html = await requestHtml(buildTopLastMonthUrl(page), SITE_BASE + "/v.php?category=top&m=-1&viewtype=basic");
  return parseTopLastMonthList(html, page);
}

async function getRecentFeatured(params) {
  var page = normalizePage(params && params.page);
  var html = await requestHtml(buildRecentFeaturedUrl(page), SITE_BASE + "/v.php?category=rf&viewtype=basic");
  return parseRecentFeaturedList(html, page);
}

async function getFavoritesThisMonth(params) {
  var page = normalizePage(params && params.page);

  if (page > 240) {
    return [];
  }

  var html = await requestHtml(buildFavoritesThisMonthUrl(page), SITE_BASE + "/v.php?category=tf&viewtype=basic");
  return parseFavoritesThisMonthList(html, page);
}

async function getDiscussedThisMonth(params) {
  var page = normalizePage(params && params.page);

  if (page > 240) {
    return [];
  }

  var html = await requestHtml(buildDiscussedThisMonthUrl(page), SITE_BASE + "/v.php?category=md&viewtype=basic");
  return parseDiscussedThisMonthList(html, page);
}

async function getMostFavorited(params) {
  var page = normalizePage(params && params.page);
  var html = await requestHtml(buildMostFavoritedUrl(page), SITE_BASE + "/v.php?category=mf&viewtype=basic");
  return parseMostFavoritedList(html, page);
}

async function getLatestVideos(params) {
  var page = normalizePage(params && params.page);
  var html = await requestHtml(buildLatestVideosUrl(page), SITE_BASE + "/v.php?viewtype=basic");
  return parseLatestVideosList(html, page);
}

async function getSearchVideos(params) {
  var keyword = normalizeKeyword(params && (params.keyword || params.search_id || params.query));

  if (!keyword) {
    return [];
  }

  var page = normalizePage(params && params.page);
  var html = await requestHtml(buildSearchVideosUrl(keyword, page), SITE_BASE + "/search_result.php");
  return parseSearchVideosList(html, page);
}

async function loadDetail(link) {
  var detailUrl = absoluteUrl(link);
  var html = await requestHtml(detailUrl);
  var title = parseDetailTitle(html);
  var posterUrl = parseVideoPoster(html);
  var videoUrl = parseVideoUrl(html);

  if (!videoUrl) {
    throw new Error("未找到视频播放地址");
  }

  return {
    id: extractViewKey(detailUrl) || detailUrl,
    title: title,
    mediaType: "movie",
    posterUrl: posterUrl,
    videoUrl: videoUrl,
    link: detailUrl
  };
}

function buildCurrentHotUrl(page) {
  return SITE_BASE + "/v.php?category=hot&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildOriginal91Url(page) {
  return SITE_BASE + "/v.php?category=ori&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildHdVideosUrl(page) {
  return SITE_BASE + "/v.php?category=hd&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildTopThisMonthUrl(page) {
  return SITE_BASE + "/v.php?category=top&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildTopLastMonthUrl(page) {
  return SITE_BASE + "/v.php?category=top&m=-1&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildRecentFeaturedUrl(page) {
  return SITE_BASE + "/v.php?category=rf&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildFavoritesThisMonthUrl(page) {
  return SITE_BASE + "/v.php?category=tf&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildDiscussedThisMonthUrl(page) {
  return SITE_BASE + "/v.php?category=md&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildMostFavoritedUrl(page) {
  return SITE_BASE + "/v.php?category=mf&viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildLatestVideosUrl(page) {
  return SITE_BASE + "/v.php?viewtype=basic&page=" + encodeURIComponent(String(page));
}

function buildSearchVideosUrl(keyword, page) {
  return SITE_BASE +
    "/search_result.php?search_id=" + encodeURIComponent(keyword) +
    "&search_type=search_videos&min_duration=&page=" + encodeURIComponent(String(page));
}

function parseCurrentHotList(html, page) {
  return parseResolvedVideoList(html, "current_hot", page);
}

function parseOriginal91List(html, page) {
  return parseResolvedVideoList(html, "original_91", page);
}

function parseHdVideosList(html, page) {
  return parseResolvedVideoList(html, "hd", page);
}

function parseTopThisMonthList(html, page) {
  return parseResolvedVideoList(html, "top_this_month", page);
}

function parseTopLastMonthList(html, page) {
  return parseResolvedVideoList(html, "top_last_month", page);
}

function parseRecentFeaturedList(html, page) {
  return parseResolvedVideoList(html, "recent_featured", page);
}

function parseFavoritesThisMonthList(html, page) {
  return parseResolvedVideoList(html, "favorites_this_month", page);
}

function parseDiscussedThisMonthList(html, page) {
  return parseResolvedVideoList(html, "discussed_this_month", page);
}

function parseMostFavoritedList(html, page) {
  return parseResolvedVideoList(html, "most_favorited", page);
}

function parseLatestVideosList(html, page) {
  return parseResolvedVideoList(html, "latest", page);
}

function parseSearchVideosList(html, page) {
  return parseResolvedVideoList(html, "search", page);
}

async function requestHtml(url, referer) {
  var resp = await Widget.http.get(url, {
    headers: buildRequestHeaders(referer, true)
  });

  if (!resp || !resp.ok) {
    throw new Error("HTTP " + (resp && resp.status ? resp.status : "ERR") + " - " + url);
  }

  if (isCaptchaPage(resp.data)) {
    resp = await Widget.http.get(url, {
      headers: buildRequestHeaders(referer, false)
    });

    if (!resp || !resp.ok) {
      throw new Error("HTTP " + (resp && resp.status ? resp.status : "ERR") + " - " + url);
    }
  }

  return String(resp.data || "");
}

function buildRequestHeaders(referer, useCookie) {
  var headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
    Referer: referer || SITE_BASE + "/v.php",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124 Safari/537.36"
  };

  if (useCookie) {
    headers.Cookie = AUTH_COOKIE;
  }

  return headers;
}

function isCaptchaPage(html) {
  return /captcha_input|captcha\.php|name=(["'])captcha_input\1/i.test(String(html || ""));
}

function parseResolvedVideoList(html, sourceId, page) {
  var rawCards = parseRawVideoCards(html);
  var channelSet = buildChannelSet(rawCards);
  var normalByTitle = buildNormalCardMap(rawCards, channelSet);
  var items = [];
  var seen = {
    title: {},
    link: {},
    poster: {}
  };

  for (var i = 0; i < rawCards.length; i++) {
    var card = rawCards[i];
    var resolvedCard = card;

    if (isMismatchedCard(card, channelSet)) {
      resolvedCard = normalByTitle[normalizeTitleKey(card.title)];

      if (!resolvedCard) {
        continue;
      }
    }

    var link = resolvedCard.link;
    var id = resolvedCard.viewKey || sourceId + "_" + page + "_" + items.length;
    var titleKey = normalizeTitleKey(card.title);
    var linkKey = normalizeLinkKey(link);
    var posterKey = normalizePosterKey(card.posterUrl);

    if (isDuplicateResolvedItem(seen, titleKey, linkKey, posterKey)) {
      continue;
    }

    markResolvedItemSeen(seen, titleKey, linkKey, posterKey);

    var meta = parseListMeta(card.html);
    var title = card.title;
    var duration = card.duration;
    var posterUrl = card.posterUrl;
    var descriptionParts = [];

    if (duration) {
      descriptionParts.push("时长 " + duration);
    }

    if (meta.added) {
      descriptionParts.push("添加 " + meta.added);
    }

    if (meta.author) {
      descriptionParts.push("作者 " + meta.author);
    }

    if (meta.views) {
      descriptionParts.push("播放 " + meta.views);
    }

    if (meta.favorites) {
      descriptionParts.push("收藏 " + meta.favorites);
    }

    if (meta.comments) {
      descriptionParts.push("评论 " + meta.comments);
    }

    items.push({
      id: "91porn_" + sourceId + "_" + id,
      title: title || "未命名视频",
      mediaType: "movie",
      posterUrl: posterUrl,
      backdropUrl: posterUrl,
      description: descriptionParts.join(" / "),
      duration: duration,
      link: link
    });
  }

  return items;
}

function isDuplicateResolvedItem(seen, titleKey, linkKey, posterKey) {
  return !!(
    titleKey && seen.title[titleKey] ||
    linkKey && seen.link[linkKey] ||
    posterKey && seen.poster[posterKey]
  );
}

function markResolvedItemSeen(seen, titleKey, linkKey, posterKey) {
  if (titleKey) {
    seen.title[titleKey] = true;
  }

  if (linkKey) {
    seen.link[linkKey] = true;
  }

  if (posterKey) {
    seen.poster[posterKey] = true;
  }
}

function parseRawVideoCards(html) {
  var cardHtmlList = splitVideoCards(html);
  var cards = [];

  for (var i = 0; i < cardHtmlList.length; i++) {
    var htmlCard = cardHtmlList[i];
    var hrefMatch = /<a\s+href=(["'])([^"']*view_video(?:_hd)?\.php[^"']*)\1/i.exec(htmlCard);
    var imageMatch = /<img[^>]+src=(["'])([^"']+)\1/i.exec(htmlCard);
    var durationMatch = /<span\s+class=(["'])[^"']*\bduration\b[^"']*\1[^>]*>([\s\S]*?)<\/span>/i.exec(htmlCard);
    var titleMatch = /<span\s+class=(["'])[^"']*\bvideo-title\b[^"']*\1[^>]*>([\s\S]*?)<\/span>/i.exec(htmlCard);

    if (!hrefMatch || !imageMatch || !titleMatch) {
      continue;
    }

    var link = absoluteUrl(htmlDecode(hrefMatch[2]));

    cards.push({
      html: htmlCard,
      link: link,
      channel: extractChannel(link),
      viewKey: extractViewKey(link),
      title: cleanText(titleMatch[2]),
      duration: durationMatch ? cleanText(durationMatch[2]) : "",
      posterUrl: absoluteUrl(htmlDecode(imageMatch[2]))
    });
  }

  return cards;
}

function buildChannelSet(cards) {
  var set = {};

  for (var i = 0; i < cards.length; i++) {
    if (cards[i].channel) {
      set[cards[i].channel] = true;
    }
  }

  return set;
}

function buildNormalCardMap(cards, channelSet) {
  var map = {};

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];

    if (!isMismatchedCard(card, channelSet)) {
      map[normalizeTitleKey(card.title)] = card;
    }
  }

  return map;
}

function splitVideoCards(html) {
  var parts = String(html || "").split(/<div\s+class=(["'])well\s+well-sm(?:\s+videos-text-align)?\1\s*>/i);
  var cards = [];

  for (var i = 2; i < parts.length; i += 2) {
    cards.push(parts[i]);
  }

  return cards;
}

function isMismatchedListLink(link) {
  return isMismatchedChannel(extractChannel(link), null);
}

function isMismatchedCard(card, channelSet) {
  return isMismatchedChannel(card && card.channel, channelSet);
}

function isMismatchedChannel(channel, channelSet) {
  var value = String(channel || "");

  if (!value) {
    return false;
  }

  if (value.charAt(0).toLowerCase() === "a") {
    var normalChannel = value.slice(1);

    if (!channelSet || channelSet[normalChannel]) {
      return true;
    }
  }

  return false;
}

function extractChannel(url) {
  var match = /[?&]c=([^&#]+)/i.exec(url || "");
  return match ? safeDecodeURIComponent(match[1]) : "";
}

function normalizeTitleKey(title) {
  return cleanText(title)
    .toLowerCase()
    .replace(/\[original\]/g, "")
    .replace(/\boriginal\b/g, "")
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "");
}

function normalizeLinkKey(link) {
  return extractViewKey(link) || String(link || "").split("#")[0];
}

function normalizePosterKey(posterUrl) {
  var match = /\/thumb\/([^/?#]+)\.jpg/i.exec(posterUrl || "");
  return match ? match[1] : String(posterUrl || "").split("?")[0];
}

function parseListMeta(fragment) {
  return {
    added: extractInfoValue(fragment, "Added"),
    author: extractAuthor(fragment),
    views: extractInfoValue(fragment, "Views"),
    favorites: extractInfoValue(fragment, "Favorites"),
    comments: extractInfoValue(fragment, "Comments")
  };
}

function extractInfoValue(fragment, label) {
  var pattern = new RegExp("<span\\s+class=(['\"])[^'\"]*\\binfo\\b[^'\"]*\\1[^>]*>\\s*" + label + "\\s*:\\s*</span>([\\s\\S]*?)(?:<br\\s*/?>|<span\\s+class=(['\"])[^'\"]*\\binfo\\b|$)", "i");
  var match = pattern.exec(fragment || "");

  if (!match) {
    return "";
  }

  return cleanText(match[2]).replace(/\s+/g, " ");
}

function extractAuthor(fragment) {
  var pattern = /<span\s+class=(["'])[^"']*\binfo\b[^"']*\1[^>]*>\s*From\s*:\s*<\/span>([\s\S]*?)(?:<br\s*\/?>|<span\s+class=(["'])[^"']*\binfo\b|$)/i;
  var match = pattern.exec(fragment || "");

  if (!match) {
    return "";
  }

  return cleanText(match[2]).replace(/\s+/g, " ");
}

function parseDetailTitle(html) {
  var headerMatch = /<h4\s+class=(["'])[^"']*\blogin_register_header\b[^"']*\1[^>]*>([\s\S]*?)<\/h4>/i.exec(html || "");

  if (headerMatch) {
    return cleanText(headerMatch[2]);
  }

  var titleMatch = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html || "");

  if (titleMatch) {
    return cleanText(titleMatch[1]).replace(/\s*-\s*91porn\s*$/i, "");
  }

  return "";
}

function parseVideoPoster(html) {
  var match = /<video\b[^>]*\bposter=(["'])([^"']+)\1/i.exec(html || "");
  return match ? absoluteUrl(htmlDecode(match[2])) : "";
}

function parseVideoUrl(html) {
  var videoBlock = extractVideoBlock(html);
  var videoUrl = parseSourceUrl(videoBlock);

  if (videoUrl) {
    return videoUrl;
  }

  videoUrl = parseEncodedSourceUrl(html);

  if (videoUrl) {
    return videoUrl;
  }

  return parseSourceUrl(html);
}

function extractVideoBlock(html) {
  var match = /<video\b[\s\S]*?<\/video>/i.exec(html || "");
  return match ? match[0] : "";
}

function parseSourceUrl(fragment) {
  var sourceFragment = removeHtmlComments(fragment);
  var pattern = /<source\b[^>]*\bsrc=(["'])([^"']+)\1[^>]*>/gi;
  var match;

  while ((match = pattern.exec(sourceFragment)) !== null) {
    var url = absoluteUrl(htmlDecode(match[2]));

    if (/\.(mp4|m3u8)(?:[?#].*)?$/i.test(url) || /\.(mp4|m3u8)[?#]/i.test(url)) {
      return url;
    }
  }

  return "";
}

function parseEncodedSourceUrl(html) {
  var pattern = /strencode2?\(\s*(["'])(.*?)\1\s*\)/gi;
  var match;

  while ((match = pattern.exec(html || "")) !== null) {
    var decoded = safeDecodeURIComponent(match[2]);
    var videoUrl = parseSourceUrl(decoded);

    if (videoUrl) {
      return videoUrl;
    }
  }

  return "";
}

function normalizePage(value) {
  var page = parseInt(value, 10);

  if (!isFinite(page) || page < 1) {
    return 1;
  }

  return page;
}

function normalizeKeyword(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function extractViewKey(url) {
  var match = /[?&]viewkey=([^&#]+)/i.exec(url || "");
  return match ? safeDecodeURIComponent(match[1]) : "";
}

function absoluteUrl(url) {
  var value = String(url || "").trim();

  if (!value) {
    return "";
  }

  value = htmlDecode(value);

  if (/^\/\//.test(value)) {
    return "https:" + value;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (value.charAt(0) === "/") {
    return SITE_BASE + value;
  }

  return SITE_BASE + "/" + value.replace(/^\.?\//, "");
}

function cleanText(value) {
  return htmlDecode(stripTags(value)).replace(/\s+/g, " ").trim();
}

function stripTags(value) {
  return String(value || "").replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ");
}

function removeHtmlComments(value) {
  return String(value || "").replace(/<!--[\s\S]*?-->/g, "");
}

function htmlDecode(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#x([0-9a-f]+);/gi, function(_, hex) {
      return String.fromCharCode(parseInt(hex, 16));
    })
    .replace(/&#(\d+);/g, function(_, num) {
      return String.fromCharCode(parseInt(num, 10));
    });
}

function safeDecodeURIComponent(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch (_) {
    return String(value || "");
  }
}
