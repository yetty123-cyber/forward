const SITE = "https://vip.wwgz.cn:5200";
const PLAYER_SITE = "https://api.nmvod.me:520";

const UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.1 Mobile/15E148 Safari/604.1";

const PLAY_API = PLAYER_SITE + "/player/?url=";

const PLAY_HEADERS = {
  "User-Agent": UA,
  "Referer": PLAYER_SITE + "/"
};
const CACHE_TTL = 5 * 60 * 1000;

var __cache = {};

var WidgetMetadata = {
  id: "nmvod_resource_direct_ddys_style",
  title: "农民影视播放源",
  description: "农民影视搜索与播放源返回，低调影视同款单源模式。注意：该站通常需要国内网络。",
  version: "1.2.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      id: "loadResource",
      title: "农民影视播放源",
      description: "农民影视搜索与播放源返回",
      functionName: "loadResource",
      type: "stream",
      cacheDuration: 0,
      params: []
    }
  ]
};

function toInt(v, d) {
  const n = parseInt(v, 10);
  return isNaN(n) ? d || 0 : n;
}

function nowMs() {
  return typeof Date.now === "function" ? Date.now() : new Date().getTime();
}

function makeCacheKey(parts) {
  return parts.map(p => String(p || "")).join("||");
}

function cacheGet(key) {
  const item = __cache[key];
  if (!item) return undefined;
  if (nowMs() - item.time > CACHE_TTL) {
    delete __cache[key];
    return undefined;
  }
  return item.value;
}

function cacheSet(key, value) {
  __cache[key] = { time: nowMs(), value: value };
  return value;
}

function pad2(n) {
  n = parseInt(n, 10);
  if (isNaN(n)) return "";
  return n < 10 ? "0" + n : String(n);
}

function buildHeaders(extra) {
  return Object.assign(
    {
      "User-Agent": UA,
      "Referer": SITE + "/"
    },
    extra || {}
  );
}

async function httpGet(url, extra) {
  let lastErr;

  for (let t = 0; t < 3; t++) {
    try {
      return await Widget.http.get(url, {
        headers: buildHeaders(extra)
      });
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr || new Error("http get fail: " + url);
}

async function httpPost(url, body, extra) {
  let lastErr;

  for (let t = 0; t < 3; t++) {
    try {
      return await Widget.http.post(url, body, {
        headers: buildHeaders(
          Object.assign(
            {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            extra || {}
          )
        )
      });
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr || new Error("http post fail: " + url);
}

function isBadHref(url) {
  url = String(url || "").trim();

  if (!url) return true;
  if (url === "#") return true;
  if (/^javascript:/i.test(url)) return true;
  if (/^void/i.test(url)) return true;

  return false;
}

function absoluteUrl(url) {
  url = String(url || "").trim();

  if (isBadHref(url)) return "";
  if (/^https?:\/\//i.test(url)) return url;

  if (!url.startsWith("/")) url = "/" + url;

  return SITE + url;
}

function htmlDecode(text) {
  return String(text || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#34;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function stripTags(text) {
  return String(text || "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeName(text) {
  return String(text || "")
    .replace(/\s+/g, "")
    .replace(/[：:·・,，.。!！?？\-—_'’"“”()（）\[\]【】]/g, "")
    .toLowerCase();
}

function stripTitleMeta(text) {
  return String(text || "")
    .replace(/[\(（][^\)）]*[\)）]/g, "")
    .replace(/第[0-9一二两三四五六七八九十百零〇]+季/g, "")
    .replace(/season\s*\d+/ig, "")
    .replace(/\bs\d{1,2}\b/ig, "")
    .trim();
}

const CN_NUM_MAP = {
  "零": 0,
  "〇": 0,
  "一": 1,
  "二": 2,
  "两": 2,
  "三": 3,
  "四": 4,
  "五": 5,
  "六": 6,
  "七": 7,
  "八": 8,
  "九": 9
};

function cnToNum(s) {
  s = String(s || "").trim();

  if (!s) return 0;
  if (/^\d+$/.test(s)) return parseInt(s, 10);

  if (s === "十") return 10;

  let total = 0;
  s = s.replace(/^[零〇]+/, "");
  if (!s) return total;

  if (s.indexOf("百") >= 0) {
    const arr = s.split("百");
    const h = CN_NUM_MAP[arr[0]] || 1;
    total += h * 100;
    s = (arr[1] || "").replace(/^[零〇]+/, "");
  }

  if (s.indexOf("十") >= 0) {
    const arr = s.split("十");
    const t = arr[0] ? CN_NUM_MAP[arr[0]] || 0 : 1;
    const u = arr[1] ? CN_NUM_MAP[arr[1]] || 0 : 0;
    total += t * 10 + u;
    return total;
  }

  if (s && CN_NUM_MAP[s] != null) return total + CN_NUM_MAP[s];

  return total;
}

function extractEpisodeNumber(text) {
  const s = String(text || "");

  let m = s.match(/第\s*([0-9一二两三四五六七八九十百零〇]+)\s*[集话期]/);
  if (m) return cnToNum(m[1]);

  m = s.match(/(?:EP|E|episode)\s*0*(\d{1,4})/i);
  if (m) return parseInt(m[1], 10);

  m = s.match(/(?:^|[^\d])0*(\d{1,4})(?:$|[^\d])/);
  if (m) return parseInt(m[1], 10);

  return 0;
}

function getWantedEpisode(params) {
  params = params || {};

  let n = 0;

  // 最优先：明确集数字段
  n =
    toInt(params.episode, 0) ||
    toInt(params.episodeNumber, 0) ||
    toInt(params.episodeNo, 0) ||
    toInt(params.episodeNum, 0) ||
    toInt(params.ep, 0) ||
    toInt(params.epNumber, 0) ||
    toInt(params.number, 0) ||
    toInt(params.currentEpisode, 0);

  if (n > 0) return n;

  // episodeIndex 通常是 0 基：第 5 集 = 4
  if (params.episodeIndex !== undefined && params.episodeIndex !== null) {
    const idx = toInt(params.episodeIndex, -1);
    if (idx >= 0) return idx + 1;
  }

  if (params.epIndex !== undefined && params.epIndex !== null) {
    const idx = toInt(params.epIndex, -1);
    if (idx >= 0) return idx + 1;
  }

  // 从文字字段提取
  n =
    extractEpisodeNumber(params.episodeName) ||
    extractEpisodeNumber(params.episodeTitle) ||
    extractEpisodeNumber(params.name) ||
    extractEpisodeNumber(params.subtitle);

  if (n > 0) return n;

  return 0;
}

function parseSearchResults(html) {
  html = String(html || "");

  const out = [];
  const liReg = /<li[\s\S]*?<\/li>/gi;
  let li;

  while ((li = liReg.exec(html))) {
    const item = li[0];

    let href = "";
    let title = "";
    let cover = "";
    let remark = "";

    let m;

    m = item.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/i);
    if (m) href = htmlDecode(m[1]);

    m = item.match(/<[^>]+class=["'][^"']*sTit[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/i);
    if (m) title = stripTags(htmlDecode(m[1]));

    if (!title) {
      m = item.match(/title=["']([^"']+)["']/i);
      if (m) title = htmlDecode(m[1]).trim();
    }

    if (!title) {
      m = item.match(/alt=["']([^"']+)["']/i);
      if (m) title = htmlDecode(m[1]).trim();
    }

    m = item.match(/data-src=["']([^"']+)["']/i);
    if (!m) m = item.match(/src=["']([^"']+)["']/i);
    if (m) cover = htmlDecode(m[1]);

    m = item.match(/<[^>]+class=["'][^"']*sStyle[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/i);
    if (!m) m = item.match(/<[^>]+class=["'][^"']*sDes[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/i);
    if (m) remark = stripTags(htmlDecode(m[1]));

    const abs = absoluteUrl(href);

    if (abs && title) {
      out.push({
        url: abs,
        rawTitle: title,
        cover: absoluteUrl(cover),
        remark: remark
      });
    }
  }

  if (!out.length) {
    const re = /<a[^>]+href=["']([^"']+)["'][^>]*title=["']([^"']+)["'][^>]*>/ig;
    let m;

    while ((m = re.exec(html))) {
      const href = htmlDecode(m[1]);
      const title = htmlDecode(m[2]).trim();
      const abs = absoluteUrl(href);

      if (abs && title && /vod|detail/i.test(abs)) {
        out.push({
          url: abs,
          rawTitle: title,
          cover: "",
          remark: ""
        });
      }
    }
  }

  return out;
}

async function searchSite(keyword) {
  const cacheKey = makeCacheKey(["search", keyword]);
  const cached = cacheGet(cacheKey);
  if (cached !== undefined) return cached;

  const url = SITE + "/index.php?m=vod-search";
  const body = "wd=" + encodeURIComponent(keyword);

  const res = await httpPost(url, body);
  const html = (res && res.data) || "";

  return cacheSet(cacheKey, parseSearchResults(html));
}

function scoreResult(item, wantBaseNorm) {
  const rawBase = stripTitleMeta(item.rawTitle);
  const baseNorm = normalizeName(rawBase);

  if (!baseNorm || !wantBaseNorm) return -1;

  if (baseNorm === wantBaseNorm) return 320;
  if (baseNorm.indexOf(wantBaseNorm) >= 0) return 180;
  if (wantBaseNorm.indexOf(baseNorm) >= 0) return 150;

  return -1;
}

function pickBestResult(results, wantBaseNorm) {
  let best = null;
  let bestScore = -Infinity;

  for (const item of results) {
    const sc = scoreResult(item, wantBaseNorm);

    if (sc > bestScore) {
      bestScore = sc;
      best = item;
    }
  }

  return bestScore >= 0 ? best : null;
}

function parsePlayPageUrls(html) {
  html = String(html || "");

  const urls = [];
  const re = /<a[^>]+href=["']([^"']+)["'][^>]*>/ig;
  let m;

  while ((m = re.exec(html))) {
    const href = htmlDecode(m[1]).trim();

    if (isBadHref(href)) continue;
    if (!/vod[-_]?play|play/i.test(href)) continue;

    const abs = absoluteUrl(href);

    if (abs && urls.indexOf(abs) < 0) {
      urls.push(abs);
    }
  }

  return urls;
}

function parseMacVars(html) {
  const text = String(html || "");

  const fromMatch =
    text.match(/mac_from\s*=\s*'([^']*)'/) ||
    text.match(/mac_from\s*=\s*"([^"]*)"/);

  const urlMatch =
    text.match(/mac_url\s*=\s*'([^']+)'/) ||
    text.match(/mac_url\s*=\s*"([^"]+)"/);

  if (!fromMatch || !urlMatch) return [];

  const fromList = fromMatch[1].split("$$$");
  const urlList = urlMatch[1].split("$$$");

  const groups = [];

  for (let i = 0; i < fromList.length; i++) {
    const sourceName = fromList[i] || "默认线路";
    const eps = String(urlList[i] || "").split("#").filter(Boolean);

    const tracks = [];

    for (let j = 0; j < eps.length; j++) {
      const parts = eps[j].split("$");
      const name = htmlDecode(parts[0] || "第" + (j + 1) + "集");
      const rawUrl = htmlDecode(parts[1] || "");

      if (!rawUrl || isBadHref(rawUrl)) continue;

      const ep = extractEpisodeNumber(name) || j + 1;

      tracks.push({
        name: name,
        episode: ep,
        index: j + 1,
        source: sourceName,
        url: rawUrl
      });
    }

    if (tracks.length) {
      groups.push({
        title: sourceName,
        tracks: tracks
      });
    }
  }

  return groups;
}

async function loadPlaylist(detailUrl) {
  const cacheKey = makeCacheKey(["playlist", detailUrl]);
  const cached = cacheGet(cacheKey);
  if (cached !== undefined) return cached;

  const detailRes = await httpGet(detailUrl);
  const detailHtml = (detailRes && detailRes.data) || "";

  let groups = parseMacVars(detailHtml);
  if (groups && groups.length) return cacheSet(cacheKey, groups);

  const playUrls = parsePlayPageUrls(detailHtml);

  if (!playUrls.length) return [];

  const maxTry = Math.min(playUrls.length, 5);

  for (let i = 0; i < maxTry; i++) {
    try {
      const epRes = await httpGet(playUrls[i]);
      const epHtml = (epRes && epRes.data) || "";

      groups = parseMacVars(epHtml);

      if (groups && groups.length) {
        return cacheSet(cacheKey, groups);
      }
    } catch (e) {}
  }

  return [];
}

function pickBestGroup(groups) {
  if (!groups || !groups.length) return null;

  let best = groups[0];
  let bestCount = best.tracks ? best.tracks.length : 0;

  for (let i = 1; i < groups.length; i++) {
    const count = groups[i].tracks ? groups[i].tracks.length : 0;

    if (count > bestCount) {
      best = groups[i];
      bestCount = count;
    }
  }

  return best;
}

function pickTrack(group, wantEpisode, isMovie) {
  if (!group || !group.tracks || !group.tracks.length) return null;

  const tracks = group.tracks;

  if (isMovie) return tracks[0];

  if (wantEpisode > 0) {
    let tr = tracks.find(t => toInt(t.episode, -1) === wantEpisode);
    if (tr) return tr;

    tr = tracks.find(t => toInt(t.index, -1) === wantEpisode);
    if (tr) return tr;

    tr = tracks.find(t => extractEpisodeNumber(t.name) === wantEpisode);
    if (tr) return tr;
  }

  return tracks[0];
}

function normalizePlayUrl(url) {
  url = String(url || "").trim();

  if (!url) return "";

  url = htmlDecode(url)
    .replace(/\\\//g, "/")
    .replace(/\\\\/g, "\\");

  try {
    if (/^https?%3A%2F%2F/i.test(url)) {
      url = decodeURIComponent(url);
    }
  } catch (e) {}

  if (url.startsWith("//")) {
    url = "https:" + url;
  }

  if (!/^https?:\/\//i.test(url)) {
    return "";
  }

  if (isBadHref(url)) return "";

  return url;
}

function parsePlayerUrl(html) {
  const text = String(html || "");

  let m;

  m = text.match(/var\s+config\s*=\s*(\{[\s\S]*?\})\s*[,;]?/);

  if (m && m[1]) {
    const configString = m[1];

    const urlMatch =
      configString.match(/["']url["']\s*:\s*["']([^"']+)["']/) ||
      configString.match(/url\s*:\s*["']([^"']+)["']/);

    if (urlMatch && urlMatch[1]) {
      const u = normalizePlayUrl(urlMatch[1]);
      if (u) return u;
    }
  }

  m = text.match(/https?:\\?\/\\?\/[^"'<>]+?\.m3u8[^"'<>]*/i);

  if (m && m[0]) {
    const u = normalizePlayUrl(m[0]);
    if (u) return u;
  }

  m =
    text.match(/["']url["']\s*:\s*["']([^"']+)["']/) ||
    text.match(/url\s*:\s*["']([^"']+)["']/);

  if (m && m[1]) {
    const u = normalizePlayUrl(m[1]);
    if (u) return u;
  }

  return "";
}

async function resolveDirectUrl(rawUrl) {
  rawUrl = String(rawUrl || "").trim();

  if (!rawUrl || isBadHref(rawUrl)) return "";

  const cacheKey = makeCacheKey(["direct", rawUrl]);
  const cached = cacheGet(cacheKey);
  if (cached !== undefined) return cached;

  const playerUrl = PLAY_API + encodeURIComponent(rawUrl);

  const res = await httpGet(playerUrl, {
    "User-Agent": UA,
    "Referer": SITE + "/",
    "sec-fetch-site": "cross-site",
    "sec-fetch-mode": "navigate",
    "sec-fetch-dest": "iframe"
  });

  const html = (res && res.data) || "";
  const directUrl = parsePlayerUrl(html);

  return directUrl ? cacheSet(cacheKey, directUrl) : "";
}

async function loadResource(params) {
  params = params || {};
  const rawSeries = String(params.seriesName || params.title || "").trim();
  const rawEpisodeName = String(params.episodeName || params.name || "").trim();
  const isMovie = String(params.type || "").toLowerCase() === "movie";

  const baseTitle = stripTitleMeta(rawSeries) || rawSeries || rawEpisodeName;

  if (!baseTitle) return [];

  const wantBaseNorm = normalizeName(baseTitle);
  const wantEpisode = getWantedEpisode(params);

  // 1. 搜索
  let results = await searchSite(baseTitle);

  if (!results.length && rawSeries && rawSeries !== baseTitle) {
    results = await searchSite(rawSeries);
  }

  if (!results.length) return [];

  // 2. 选剧
  const best = pickBestResult(results, wantBaseNorm);

  if (!best || !best.url) return [];

  // 3. 播放列表
  const playlist = await loadPlaylist(best.url);

  if (!playlist || !playlist.length) return [];

  // 4. 选播放线路：优先集数最多的线路
  const group = pickBestGroup(playlist);

  if (!group || !group.tracks || !group.tracks.length) return [];

  // 5. 定位当前集
  const track = pickTrack(group, wantEpisode, isMovie);

  if (!track || !track.url) return [];

  // 6. 解析最终 m3u8
  const directUrl = await resolveDirectUrl(track.url);

  if (!directUrl) return [];

  const ep = track.episode || track.index || wantEpisode || 1;
  const epLabel = "E" + pad2(ep);

  // 7. 低调影视同款返回：只返回一个源
  return [
    {
      name: "农民影视 " + epLabel,
      description: [
        best.rawTitle,
        "线路：" + (track.source || group.title || "默认线路"),
        "集数：" + (track.name || epLabel),
        wantEpisode > 0 ? "定位：" + epLabel : "",
        "注意：该站通常需要国内网络"
      ].filter(Boolean).join("\n"),
      url: directUrl,
      customHeaders: PLAY_HEADERS,
      headers: PLAY_HEADERS
    }
  ];
}
