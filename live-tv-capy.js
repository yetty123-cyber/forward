// @name 电视直播
// @description 聚合多路 M3U 源，分组浏览，多线路支持（修复 URL 提取错误）
// @version 1.0.6
// @author baiPlay

var WidgetMetadata = {
  id: "live-tv-capy",
  title: "电视直播",
  description: "聚合多路直播源，分组浏览，点击播放，支持备用线路。",
  version: "1.0.6",
  author: "baiPlay",
  icon: "https://i.miji.bid/2025/05/17/c4a0703b68a4d2313a27937d82b72b6a.png",
  globalParams: {
    group_filter: "",
    name_filter: "",
    subscriptions: "[]"
  },
  modules: [
    {
      id: "categories",
      title: "频道分类",
      type: "category",
      functionName: "getCategories",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "group_filter", type: "string", label: "分组过滤", defaultValue: "" },
        { name: "name_filter", type: "string", label: "频道名过滤", defaultValue: "" },
        { name: "subscriptions", type: "string", label: "订阅列表", defaultValue: "[]" }
      ]
    },
    {
      id: "channels",
      title: "频道列表",
      type: "media_list",
      functionName: "getChannels",
      cacheDuration: 3600,
      timeoutSeconds: 30,
      params: [
        { name: "group", type: "string", label: "分组", defaultValue: "" },
        { name: "keyword", type: "string", label: "搜索", defaultValue: "" },
        { name: "page", type: "page", label: "页码" },
        { name: "group_filter", type: "string", defaultValue: "" },
        { name: "name_filter", type: "string", defaultValue: "" },
        { name: "subscriptions", type: "string", defaultValue: "[]" }
      ]
    }
  ]
};

// ========== 常量 ==========
var USER_AGENT = "CapyPlayer/1.0.2";
var FALLBACK_LOGO = "https://i.miji.bid/2025/05/17/343e3416757775e312197588340fc0d3.png";
var CACHE_TTL = 6 * 60 * 60 * 1000;
var _cache = {};
var _channelMap = {};

// ========== 内置源（精选稳定源） ==========
var BUILT_IN_SOURCES = [
  { id: "fanmingming-ipv6", title: "范明明 IPv6", url: "https://live.fanmingming.com/tv/m3u/ipv6.m3u" },
  { id: "fanmingming-ipv4", title: "范明明 IPv4", url: "https://live.fanmingming.com/tv/m3u/ipv4.m3u" },
  { id: "guovin", title: "Guovin IPTV", url: "https://cdn.jsdelivr.net/gh/Guovin/iptv-api@gd/output/result.m3u" },
  { id: "ibert", title: "iBert M3U", url: "https://m3u.ibert.me/tv.m3u" },
  { id: "yang-gather", title: "YanG Gather", url: "https://cdn.jsdelivr.net/gh/YanG-1989/m3u@main/Gather.m3u" },
  { id: "kimentanm", title: "Kimentanm APTV", url: "https://cdn.jsdelivr.net/gh/Kimentanm/aptv@master/m3u/iptv.m3u" }
];

// ========== 工具 ==========
function safeString(v) { return (v !== null && v !== undefined) ? String(v) : ""; }

function parseSubscriptions(raw) {
  try { var parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed : []; } catch (_) { return []; }
}

function buildRegex(pattern) {
  if (!pattern) return null;
  try { return new RegExp(pattern, "i"); } catch (_) { return null; }
}

// ========== 核心：M3U 解析器（修复版） ==========
function parseM3U(content) {
  var lines = content.split(/\r?\n/);
  var channels = [];
  var current = null;
  // URL 匹配必须严格，且排除常见的元数据关键字
  var urlRegex = /^(https?:\/\/|rtsp:\/\/|rtmp:\/\/|http:\/\/)/i;
  // 跳过这些开头的行（元数据）
  var skipPrefixes = ['#EXT', '#KODI', '#EXTVLC', '#PLAYLIST', '#PREF'];

  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line) continue;

    // 跳过元数据行（除了 #EXTINF）
    var isMeta = false;
    for (var s = 0; s < skipPrefixes.length; s++) {
      if (line.toUpperCase().indexOf(skipPrefixes[s]) === 0 && line.indexOf('#EXTINF:') !== 0) {
        isMeta = true;
        break;
      }
    }
    if (isMeta) continue;

    // 处理 #EXTINF 行
    if (line.indexOf('#EXTINF:') === 0) {
      var match = line.match(/^#EXTINF:(-?\d+)\s*(?:tvg-logo="([^"]*)"\s*)?(?:tvg-name="([^"]*)"\s*)?(?:group-title="([^"]*)"\s*)?\s*,\s*(.+)$/);
      if (match) {
        current = {
          duration: parseInt(match[1], 10) || -1,
          logo: match[2] || "",
          tvgName: match[3] || "",
          group: (match[4] || "未分组").trim(),
          title: (match[5] || "未知频道").trim(),
          url: null
        };
      } else {
        // 更宽松的 fallback
        var parts = line.split(",");
        var titlePart = parts.length > 1 ? parts.slice(1).join(",").trim() : "未知频道";
        var groupMatch = line.match(/group-title="([^"]*)"/);
        var logoMatch = line.match(/tvg-logo="([^"]*)"/);
        current = {
          duration: -1,
          logo: logoMatch ? logoMatch[1] : "",
          tvgName: "",
          group: groupMatch ? groupMatch[1].trim() : "未分组",
          title: titlePart,
          url: null
        };
      }
      continue; // 不处理其他
    }

    // 如果当前有 #EXTINF 且当前行是有效的 URL（且不是元数据）
    if (current && urlRegex.test(line) && !line.match(/^#/)) {
      current.url = line;
      channels.push(current);
      current = null; // 重置，防止重复
    }
    // 如果单独遇到 URL 且不在 #EXTINF 上下文，忽略（或可创建匿名频道，但为避免错误，跳过）
  }
  return channels;
}

// ========== 数据获取 ==========
async function fetchSource(url) {
  var cached = _cache[url];
  if (cached && Date.now() - cached.time < CACHE_TTL) return cached.data;
  try {
    var resp = await Widget.http.get(url, {
      headers: { "User-Agent": USER_AGENT, "Referer": "https://capyplayer.feifeiduck.com/" },
      timeout: 15000
    });
    if (!resp.ok) return null;
    var text = typeof resp.data === "string" ? resp.data : String(resp.data);
    _cache[url] = { data: text, time: Date.now() };
    return text;
  } catch (e) {
    console.warn("[LiveTV] 获取失败:", url, e.message);
    return null;
  }
}

// ========== 加载所有频道 ==========
async function loadAllChannels(subscriptions, groupFilter, nameFilter) {
  var sources = subscriptions.concat(BUILT_IN_SOURCES);
  var allChannels = [];

  for (var i = 0; i < sources.length; i++) {
    var src = sources[i];
    var content = await fetchSource(src.url);
    if (!content) continue;
    var parsed = parseM3U(content);
    for (var j = 0; j < parsed.length; j++) {
      parsed[j]._source = src.id;
    }
    allChannels = allChannels.concat(parsed);
  }

  // 硬编码备选测试频道（仅当所有源都失败时）
  if (allChannels.length === 0) {
    allChannels = [
      { title: "CCTV-1 综合", group: "央视", logo: FALLBACK_LOGO, url: "http://[2409:8087:1e03:21::12]:80/PLTV/88888888/224/3221225500/index.m3u8", _source: "test" },
      { title: "CCTV-2 财经", group: "央视", logo: FALLBACK_LOGO, url: "http://[2409:8087:1e03:21::12]:80/PLTV/88888888/224/3221225501/index.m3u8", _source: "test" }
    ];
  }

  // 去重合并
  var map = {};
  for (var k = 0; k < allChannels.length; k++) {
    var ch = allChannels[k];
    // 确保有 URL
    if (!ch.url) continue;
    var key = ch.title + "|" + ch.group;
    if (map[key]) {
      var existing = map[key];
      if (ch.logo && !existing.logo) existing.logo = ch.logo;
      if (ch.url && existing.url !== ch.url) {
        if (!existing.alternates) existing.alternates = [];
        if (existing.alternates.indexOf(ch.url) === -1) existing.alternates.push(ch.url);
      }
    } else {
      map[key] = { title: ch.title, group: ch.group, logo: ch.logo || "", url: ch.url, alternates: [], _source: ch._source };
    }
  }

  var result = [];
  for (var key in map) { if (map.hasOwnProperty(key)) result.push(map[key]); }

  // 过滤
  var groupRegex = buildRegex(groupFilter);
  if (groupRegex) result = result.filter(function(ch) { return groupRegex.test(ch.group); });
  var nameRegex = buildRegex(nameFilter);
  if (nameRegex) result = result.filter(function(ch) { return nameRegex.test(ch.title); });

  result.sort(function(a, b) {
    var g = a.group.localeCompare(b.group);
    return g !== 0 ? g : a.title.localeCompare(b.title);
  });
  return result;
}

// ========== getCategories ==========
async function getCategories(params) {
  params = params || {};
  var subscriptions = parseSubscriptions(params.subscriptions || "[]");
  var groupFilter = params.group_filter || "";
  var nameFilter = params.name_filter || "";

  var channels = await loadAllChannels(subscriptions, groupFilter, nameFilter);
  var groupMap = {};
  for (var i = 0; i < channels.length; i++) {
    var g = channels[i].group || "未分组";
    if (!groupMap[g]) groupMap[g] = true;
  }
  var groups = Object.keys(groupMap).sort();
  var result = [];
  for (var j = 0; j < groups.length; j++) {
    var g = groups[j];
    result.push({
      id: "g_" + g.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_"),
      name: g,
      params: { group: g }
    });
  }
  result.unshift({ id: "g_all", name: "全部频道", params: { group: "" } });
  return result;
}

// ========== getChannels ==========
async function getChannels(params) {
  params = params || {};
  var subscriptions = parseSubscriptions(params.subscriptions || "[]");
  var groupFilter = params.group_filter || "";
  var nameFilter = params.name_filter || "";
  var group = safeString(params.group).trim();
  var keyword = safeString(params.keyword).trim();
  var page = parseInt(params.page, 10) || 1;
  var limit = 50;

  var channels = await loadAllChannels(subscriptions, groupFilter, nameFilter);

  if (group) {
    var filtered = channels.filter(function(ch) {
      return ch.group.trim().toLowerCase() === group.toLowerCase();
    });
    if (filtered.length > 0) channels = filtered;
  }

  if (keyword) {
    var kw = keyword.toLowerCase();
    channels = channels.filter(function(ch) {
      return ch.title.toLowerCase().indexOf(kw) !== -1 ||
             ch.group.toLowerCase().indexOf(kw) !== -1;
    });
  }

  // 过滤无效URL
  channels = channels.filter(function(ch) {
    var url = ch.url || (ch.alternates && ch.alternates[0]) || "";
    return url.match(/^(https?|rtmp):\/\//i);
  });

  var total = channels.length;
  var start = (page - 1) * limit;
  var paged = channels.slice(start, start + limit);

  var result = [];
  for (var i = 0; i < paged.length; i++) {
    var ch = paged[i];
    var primaryUrl = ch.url || (ch.alternates && ch.alternates[0]) || "";
    if (!primaryUrl.match(/^(https?|rtmp):\/\//i)) continue;

    var itemId = "ch_" + (ch.title + ch.group).replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, "_") + "_" + i;
    var allUrls = [primaryUrl];
    if (ch.alternates && ch.alternates.length > 0) {
      for (var a = 0; a < ch.alternates.length; a++) {
        var alt = ch.alternates[a];
        if (alt.match(/^(https?|rtmp):\/\//i) && allUrls.indexOf(alt) === -1) {
          allUrls.push(alt);
        }
      }
    }
    _channelMap[itemId] = allUrls;

    result.push({
      id: itemId,
      link: itemId,
      title: ch.title,
      subtitle: ch.group,
      posterUrl: ch.logo || FALLBACK_LOGO,
      videoUrl: primaryUrl,
      description: "来源: " + (ch._source || "未知") + (allUrls.length > 1 ? " (多线路)" : "")
    });
  }

  // 空结果时注入测试频道
  if (result.length === 0) {
    var testItems = [
      { title: "CCTV-1 综合", group: "测试", logo: FALLBACK_LOGO, url: "http://[2409:8087:1e03:21::12]:80/PLTV/88888888/224/3221225500/index.m3u8" },
      { title: "湖南卫视", group: "测试", logo: FALLBACK_LOGO, url: "http://[2409:8087:1e03:21::12]:80/PLTV/88888888/224/3221225502/index.m3u8" }
    ];
    for (var t = 0; t < testItems.length; t++) {
      var testCh = testItems[t];
      var testId = "test_" + t;
      _channelMap[testId] = [testCh.url];
      result.push({
        id: testId,
        link: testId,
        title: testCh.title,
        subtitle: testCh.group,
        posterUrl: testCh.logo || FALLBACK_LOGO,
        videoUrl: testCh.url,
        description: "测试频道 (IPv6)"
      });
    }
  }

  result._total = total;
  result._page = page;
  result._limit = limit;
  return result;
}

// ========== loadDetail（多线路） ==========
async function loadDetail(link) {
  if (!link) return null;
  var urls = _channelMap[link] || [];
  if (urls.length === 0) return null;
  var detail = {
    videoUrls: urls.map(function(url, index) { return { url: url, name: "线路 " + (index + 1) }; })
  };
  return detail;
}