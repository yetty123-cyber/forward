var WidgetMetadata = {
  id: "one_porn_capyplayer",
  title: "1Porn.tv",
  description: "1Porn.tv CapyPlayer 规范版，支持首页、详细分类、网站搜索与播放解析。",
  author: "Minis",
  version: "2.0.0",
  site: "https://www.1porn.tv",
  modules: [
    {
      id: "home",
      title: "首页封面",
      type: "media_list",
      functionName: "loadHome",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "category",
      title: "详细分类",
      type: "media_list",
      functionName: "loadCategoryVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        {
          name: "category",
          title: "分类",
          type: "string",
          value: "all",
          placeholders: [
            { title: "全部分类", value: "all" },
            { title: "18 Years Old", value: "18-years-old" },
            { title: "Amateur", value: "amateur" },
            { title: "Anal", value: "anal" },
            { title: "Asian", value: "asian" },
            { title: "Babe", value: "babe" },
            { title: "BBW", value: "bbw" },
            { title: "Big Ass", value: "big-ass" },
            { title: "Big Cock", value: "big-cock" },
            { title: "Big Tits", value: "big-tits" },
            { title: "Blonde", value: "blonde" },
            { title: "Blowjob", value: "blowjob" },
            { title: "Brunette", value: "brunette" },
            { title: "Creampie", value: "creampie" },
            { title: "Cumshot", value: "cumshot" },
            { title: "Doggystyle", value: "doggystyle" },
            { title: "Ebony", value: "ebony" },
            { title: "Facial", value: "facial" },
            { title: "Fetish", value: "fetish" },
            { title: "Hardcore", value: "hardcore" },
            { title: "Latina", value: "latina" },
            { title: "Lesbian", value: "lesbian" },
            { title: "MILF", value: "milf" },
            { title: "POV", value: "pov" },
            { title: "Teen", value: "teen" },
            { title: "Threesome", value: "threesome" }
          ]
        },
        {
          name: "sort",
          title: "排序",
          type: "enum",
          value: "latest-updates",
          enumOptions: [
            { title: "最新视频", value: "latest-updates" },
            { title: "最佳视频", value: "top-rated" },
            { title: "热门影片", value: "most-popular" }
          ]
        },
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
        { name: "keyword", title: "关键词", type: "string", value: "" },
        {
          name: "sort",
          title: "排序",
          type: "enum",
          value: "latest-updates",
          enumOptions: [
            { title: "最新视频", value: "latest-updates" },
            { title: "最佳视频", value: "top-rated" },
            { title: "热门影片", value: "most-popular" }
          ]
        },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    }
  ],
  search: {
    title: "搜索",
    functionName: "searchVideos",
    params: [
      { name: "keyword", title: "关键词", type: "string", value: "" },
      { name: "page", title: "页码", type: "page", value: "1" }
    ]
  }
};

var BASE_URL = 'https://www.1porn.tv';
var COMMON_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Referer': BASE_URL + '/',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9'
};

function ensureArray(v) { return Array.isArray(v) ? v : []; }
function absoluteUrl(url) {
  if (!url) return '';
  if (url.indexOf('//') === 0) return 'https:' + url;
  if (url.indexOf('http') === 0) return url;
  return new URL(url, BASE_URL).toString();
}
function decodeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}
function stripTags(html) {
  return decodeHtml(String(html || '').replace(/<[^>]+>/g, ' '));
}
function getAttribute(html, name) {
  var pattern = new RegExp(name + '=["\']([^"\']+)["\']', 'i');
  var m = String(html || '').match(pattern);
  return decodeHtml(m && m[1] ? m[1] : '');
}
function durationToSeconds(text) {
  var parts = String(text || '').replace(/Full Video/gi, '').trim().split(':').map(function(part) { return Number(part); });
  if (parts.some(function(part) { return Number.isNaN(part); })) return undefined;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return undefined;
}
function parseIsoDuration(value) {
  var match = String(value || '').match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/i);
  if (!match) return undefined;
  var hours = Number(match[1] || 0);
  var minutes = Number(match[2] || 0);
  var seconds = Number(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}
function normalizePoster(url) {
  var resolved = absoluteUrl(url);
  if (!resolved) return '';
  return resolved.replace('/medium/', '/medium@2x/');
}
function makePageUrl(baseUrl, page) {
  var pageNumber = Math.max(Number(page || 1), 1);
  var normalized = baseUrl.endsWith('/') ? baseUrl : (baseUrl + '/');
  if (pageNumber <= 1) return normalized;
  return normalized + pageNumber + '/';
}
async function fetchHtml(url) {
  var response = await Widget.http.get(url, { headers: COMMON_HEADERS, timeout: 30000 });
  return String(response.data || '');
}
function mapListItem(raw) {
  return {
    id: String(raw.id || raw.link || raw.title),
    title: raw.title || '',
    posterUrl: raw.posterPath || '',
    backdropUrl: raw.posterPath || '',
    description: raw.durationText || '',
    mediaType: 'movie',
    link: raw.link || ''
  };
}
function parseVideoList(html) {
  var results = [];
  var seen = {};
  var itemPattern = /<div\s+class=["']item["'][\s\S]*?(?=<div\s+class=["']item["']|<div\s+class=["']pagination|<\/main>|$)/gi;
  var blocks = String(html || '').match(itemPattern) || [];
  for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];
    var link = absoluteUrl((block.match(/<a[^>]+href=["']([^"']*\/videos\/[^"']+)["']/i) || [])[1] || '');
    if (!link || seen[link]) continue;
    var title = decodeHtml(((block.match(/<strong[^>]*class=["'][^"']*title[^"']*["'][^>]*>([\s\S]*?)<\/strong>/i) || [])[1]) || getAttribute(block, 'title') || getAttribute(block, 'alt'));
    if (!title) continue;
    var id = (link.split('/videos/')[1] || link).replace(/\/$/, '');
    var posterPath = normalizePoster(((block.match(/<img[^>]+(?:data-src|src)=["']([^"']+)["'][^>]*>/i) || [])[1]) || '');
    var durationText = decodeHtml(((block.match(/<span[^>]*class=["'][^"']*duration[^"']*["'][^>]*>([\s\S]*?)<\/span>/i) || [])[1]) || '');
    seen[link] = true;
    results.push(mapListItem({
      id: id,
      title: title,
      link: link,
      posterPath: posterPath,
      durationText: durationText
    }));
  }
  return results;
}
function parseJsonLd(html) {
  var jsonLd = (String(html || '').match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i) || [])[1];
  if (!jsonLd) return {};
  try { return JSON.parse(String(jsonLd).trim()); } catch (_) { return {}; }
}
function parseSources(html) {
  var sources = [];
  var pattern = /<source[^>]+src=["']([^"']+)["'][^>]*(?:label=["']([^"']+)["'])?[^>]*>/gi;
  var match;
  while ((match = pattern.exec(String(html || '')))) {
    var url = absoluteUrl(decodeHtml(match[1] || ''));
    if (!url || url.indexOf('.mp4') < 0) continue;
    var label = match[2] || ((url.match(/_(\d+m)\.mp4/i) || [])[1]) || '';
    sources.push({ url: url, label: label });
  }
  return sources.sort(function(a, b) {
    var qa = Number((String(a.label || '').match(/\d+/) || [0])[0] || 0);
    var qb = Number((String(b.label || '').match(/\d+/) || [0])[0] || 0);
    return qb - qa;
  });
}
function parseDetailCategories(html) {
  var categories = [];
  var block = (String(html || '').match(/<span>Categories:<\/span>([\s\S]*?)<\/div>/i) || [])[1] || '';
  var pattern = /<a[^>]+class=["'][^"']*btn_tag[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
  var match;
  while ((match = pattern.exec(block))) {
    var title = stripTags(match[1]);
    if (title && title !== '+') categories.push(title);
  }
  return categories.join(', ');
}
async function loadHome(params) {
  params = params || {};
  var url = makePageUrl(BASE_URL + '/latest-updates/', params.page);
  var html = await fetchHtml(url);
  return ensureArray(parseVideoList(html));
}
async function loadCategoryVideos(params) {
  params = params || {};
  var category = params.category || 'all';
  if (category === 'all') return loadHome(params);
  var sort = params.sort || 'latest-updates';
  var url = makePageUrl(BASE_URL + '/categories/' + encodeURIComponent(category) + '/' + sort + '/', params.page);
  var html = await fetchHtml(url);
  return ensureArray(parseVideoList(html));
}
async function searchVideos(params) {
  params = params || {};
  var keyword = String(params.keyword || params.query || '').trim();
  if (!keyword) return [];
  var path = encodeURIComponent(keyword).replace(/%20/g, '-');
  var sort = params.sort || 'latest-updates';
  var url = makePageUrl(BASE_URL + '/search/' + path + '/' + sort + '/', params.page);
  var html = await fetchHtml(url);
  return ensureArray(parseVideoList(html));
}
async function loadDetail(link) {
  var html = await fetchHtml(absoluteUrl(link));
  var sources = parseSources(html);
  if (!sources.length) {
    return { title: '未找到可播放的视频地址' };
  }
  var jsonLd = parseJsonLd(html);
  var title = stripTags(((String(html || '').match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1]) || jsonLd.name || ((String(html || '').match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]) || '').replace(/\s*\|\s*Free Porn.*$/i, '');
  var posterUrl = normalizePoster(jsonLd.thumbnailUrl || ((String(html || '').match(/poster=["']([^"']+)["']/i) || [])[1]) || ((String(html || '').match(/property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || [])[1]) || '');
  var description = decodeHtml(((String(html || '').match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i) || [])[1]) || jsonLd.description || '');
  var releaseDate = String(jsonLd.uploadDate || '').split('T')[0] || undefined;
  var duration = parseIsoDuration(String(jsonLd.duration || ''));
  var durationText = ((String(html || '').match(/vjs-duration-display'\)\.html\(['"]([^'"]+)['"]\)/i) || [])[1]) || undefined;
  var genreTitle = parseDetailCategories(html);
  return {
    title: title || '1Porn.tv',
    posterUrl: posterUrl,
    backdropUrl: posterUrl,
    description: description,
    releaseDate: releaseDate,
    duration: duration,
    durationText: durationText,
    genreTitle: genreTitle,
    videoUrl: String(sources[0].url || '')
  };
}
