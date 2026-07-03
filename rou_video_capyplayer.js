function rouOption(title, value) {
  return { title: title, value: value || title };
}

var ROU_SORT_OPTIONS = [
  rouOption("最新发布", "createdAt"),
  rouOption("最多播放", "viewCount"),
  rouOption("最多点赞", "likeCount"),
  rouOption("最长时长", "duration"),
  rouOption("最近更新", "updatedAt")
];

var ROU_CNAV_OPTIONS = [
  rouOption("全部 国产AV", "國產AV"),
  rouOption("糖心Vlog"),
  rouOption("蜜桃影像傳媒"),
  rouOption("香蕉視頻傳媒"),
  rouOption("星空無限傳媒"),
  rouOption("天美傳媒"),
  rouOption("精東影業"),
  rouOption("杏吧傳媒"),
  rouOption("91製片廠"),
  rouOption("皇家華人"),
  rouOption("起點傳媒"),
  rouOption("大象傳媒"),
  rouOption("果凍傳媒"),
  rouOption("蘿莉社"),
  rouOption("ED Mosaic"),
  rouOption("兔子先生"),
  rouOption("扣扣傳媒"),
  rouOption("SA國際傳媒"),
  rouOption("愛神傳媒"),
  rouOption("性視界傳媒"),
  rouOption("PsychopornTW"),
  rouOption("拍攝花絮"),
  rouOption("抖陰"),
  rouOption("91茄子"),
  rouOption("絕對領域傳媒"),
  rouOption("烏托邦傳媒"),
  rouOption("紅斯燈影像"),
  rouOption("草莓視頻"),
  rouOption("渡邊傳媒"),
  rouOption("葫蘆影業"),
  rouOption("樂播傳媒"),
  rouOption("Pussy Hunter"),
  rouOption("麻麻傳媒"),
  rouOption("三只狼傳媒"),
  rouOption("萝莉原创"),
  rouOption("辣椒原創"),
  rouOption("MisAV"),
  rouOption("SWAG@daisybaby"),
  rouOption("冠希傳媒"),
  rouOption("微密圈傳媒"),
  rouOption("愛妃傳媒"),
  rouOption("天美影院"),
  rouOption("西瓜影視"),
  rouOption("肉肉傳媒"),
  rouOption("烏鴉傳媒"),
  rouOption("日出文化"),
  rouOption("鯨魚傳媒"),
  rouOption("國產AV劇情"),
  rouOption("SWAG@cartiernn"),
  rouOption("TWAV"),
  rouOption("Mini傳媒"),
  rouOption("桃花源"),
  rouOption("叮叮映畫"),
  rouOption("蜜桃視頻"),
  rouOption("O-STAR"),
  rouOption("開心鬼傳媒"),
  rouOption("葵心娛樂"),
  rouOption("愛污傳媒")
];

var ROU_MADOU_OPTIONS = [
  rouOption("全部 麻豆传媒", "麻豆傳媒"),
  rouOption("愛豆傳媒"),
  rouOption("MD"),
  rouOption("MDX"),
  rouOption("麻豆US"),
  rouOption("MSD"),
  rouOption("MCY"),
  rouOption("MKY"),
  rouOption("MPG"),
  rouOption("FLIXKO"),
  rouOption("貓爪影像"),
  rouOption("國產麻豆AV節目"),
  rouOption("麻豆女神微愛視頻"),
  rouOption("麻豆番外"),
  rouOption("麻豆三十天特別企劃"),
  rouOption("麻豆導演系列"),
  rouOption("情趣K歌房"),
  rouOption("MDWP"),
  rouOption("突襲女優家"),
  rouOption("麻豆女優"),
  rouOption("麻豆達人秀"),
  rouOption("澀會"),
  rouOption("MDS"),
  rouOption("MDSR"),
  rouOption("麻豆女神微愛影片"),
  rouOption("MDL"),
  rouOption("MAN"),
  rouOption("MSM"),
  rouOption("MDHT"),
  rouOption("MDAG"),
  rouOption("MS"),
  rouOption("MSG"),
  rouOption("MDJ"),
  rouOption("MDM"),
  rouOption("MXJ"),
  rouOption("MDD"),
  rouOption("MLT")
];

var ROU_ONLYFANS_OPTIONS = [
  rouOption("全部 OnlyFans", "OnlyFans"),
  rouOption("fansly"),
  rouOption("tangbo_hu"),
  rouOption("HongKongDoll"),
  rouOption("BunnyMiffy"),
  rouOption("Nana_Taipei"),
  rouOption("qiobnxingcai"),
  rouOption("suchanghub"),
  rouOption("ssrpeach"),
  rouOption("nicolove.cc"),
  rouOption("Miuzxc"),
  rouOption("kitty2002102"),
  rouOption("kittyxkum"),
  rouOption("yui_xin_tw"),
  rouOption("juneliu"),
  rouOption("YuZuKitty"),
  rouOption("jeenzen"),
  rouOption("monmon_tw"),
  rouOption("applecptv"),
  rouOption("andmlove"),
  rouOption("Loliiiiipop99"),
  rouOption("daintywilder"),
  rouOption("ZZZ666"),
  rouOption("aixiaixi"),
  rouOption("ChiChibae"),
  rouOption("blazeconjure3"),
  rouOption("moremore618"),
  rouOption("bdollairi"),
  rouOption("olive_emmm"),
  rouOption("chocoletmilkk"),
  rouOption("SLRabbit"),
  rouOption("Xreindeers"),
  rouOption("Carla Grace")
];

var ROU_TANHUA_OPTIONS = [
  rouOption("全部 探花", "探花"),
  rouOption("91沈先生"),
  rouOption("探花精選400"),
  rouOption("小寶尋花"),
  rouOption("91lisa"),
  rouOption("調教小景甜"),
  rouOption("午夜尋花"),
  rouOption("91鳳鳴鳥唱"),
  rouOption("大神精選"),
  rouOption("AVOVE直播"),
  rouOption("91貓先生"),
  rouOption("千人斬探花"),
  rouOption("全國探花"),
  rouOption("91Fans"),
  rouOption("七天探花"),
  rouOption("9總全國探花"),
  rouOption("91大神@LovELolita7"),
  rouOption("18歲母狗無限高潮"),
  rouOption("鴨哥探花"),
  rouOption("錘子探花"),
  rouOption("探花合集"),
  rouOption("91不見星空"),
  rouOption("早期東莞ISO桑拿系列"),
  rouOption("91康先生"),
  rouOption("肉オナホ"),
  rouOption("91大神唐伯虎"),
  rouOption("韋小寶"),
  rouOption("91風流哥全集"),
  rouOption("91蜜桃的合集"),
  rouOption("換妻探花"),
  rouOption("小陳頭星選"),
  rouOption("91大神括約肌大叔"),
  rouOption("情侶自拍"),
  rouOption("探花精選"),
  rouOption("91呆哥"),
  rouOption("mmmn753"),
  rouOption("楊導撩妹"),
  rouOption("歌廳探花陳先生"),
  rouOption("91美女涵菱"),
  rouOption("太子探花"),
  rouOption("小馬尋花"),
  rouOption("91唐哥"),
  rouOption("jimmybiiig"),
  rouOption("91天堂原創"),
  rouOption("小飛探花"),
  rouOption("王子哥專啪學生妹"),
  rouOption("文軒探花"),
  rouOption("偉哥尋歡"),
  rouOption("大草莓寶貝"),
  rouOption("探花女下海直播"),
  rouOption("91天堂系列"),
  rouOption("91大神胖Kyo"),
  rouOption("攝影師果哥出品"),
  rouOption("莞式選妃"),
  rouOption("catman"),
  rouOption("90w粉"),
  rouOption("探花大神"),
  rouOption("91原創達人@多乙丶"),
  rouOption("91大黃鴨"),
  rouOption("小東全國尋妹"),
  rouOption("91Dr哥"),
  rouOption("大熊探花"),
  rouOption("91約妹達人"),
  rouOption("91大神揚風"),
  rouOption("91愛絲小仙女思妍"),
  rouOption("探花郎李尋歡"),
  rouOption("91新晉大神sweattt"),
  rouOption("91新人GD超模（現改名69DD）"),
  rouOption("91大神jinx"),
  rouOption("91sex哥"),
  rouOption("175車模"),
  rouOption("東莞探花"),
  rouOption("嫖嫖sex探花"),
  rouOption("秀人網模特")
];

var ROU_SELFIE_OPTIONS = [
  rouOption("全部 自拍流出", "自拍流出"),
  rouOption("中國"),
  rouOption("台灣"),
  rouOption("twitter"),
  rouOption("主播"),
  rouOption("韓國"),
  rouOption("絲襪"),
  rouOption("多P"),
  rouOption("素人"),
  rouOption("偷拍"),
  rouOption("情侶自拍"),
  rouOption("91Fans"),
  rouOption("91天堂原創"),
  rouOption("大神精選"),
  rouOption("糖心Vlog")
];

var WidgetMetadata = {
  id: "rou_video",
  title: "肉视频",
  description: "rou.video 分类、排序、搜索与播放解析组件",
  author: "Evil",
  version: "1.0.0",
  site: "https://rou.video",
  icon: "https://rou.video/favicon.ico",
  modules: [
    // {
    //   id: "search",
    //   title: "站内搜索",
    //   type: "media_list",
    //   functionName: "searchVideos",
    //   cacheDuration: 300,
    //   timeoutSeconds: 30,
    //   params: [
    //     {
    //       name: "keyword",
    //       title: "搜索关键词",
    //       type: "input",
    //       description: "输入搜索关键词（标题、标签、演员/创作者等）",
    //       value: ""
    //     },
    //     { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
    //   ]
    // },
    {
      id: "home_sections",
      title: "首页精选",
      type: "media_list",
      functionName: "loadSectionVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        {
          name: "section",
          title: "分区",
          type: "enum",
          value: "latestVideos",
          enumOptions: [
            { title: "最新更新", value: "latestVideos" },
            { title: "热门 91", value: "hot91" },
            { title: "热门 自拍流出", value: "hotSelfie" },
            { title: "热门 国产AV视频", value: "hotCNAV" },
            { title: "日榜 91", value: "dailyHot91" },
            { title: "日榜 自拍流出", value: "dailyHotSelfie" },
            { title: "日榜 国产AV视频", value: "dailyHotCNAV" },
            { title: "日榜 OnlyFans", value: "dailyOnlyFans" },
            { title: "日榜 日本区", value: "dailyJV" }
          ]
        }
      ]
    },
    {
      id: "cnav",
      title: "国产AV",
      type: "media_list",
      functionName: "loadTagVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "tag", title: "子模块", type: "enum", value: "國產AV", enumOptions: ROU_CNAV_OPTIONS },
        { name: "order", title: "排序", type: "enum", value: "createdAt", enumOptions: ROU_SORT_OPTIONS },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "madou",
      title: "麻豆传媒",
      type: "media_list",
      functionName: "loadTagVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "tag", title: "子模块", type: "enum", value: "麻豆傳媒", enumOptions: ROU_MADOU_OPTIONS },
        { name: "order", title: "排序", type: "enum", value: "createdAt", enumOptions: ROU_SORT_OPTIONS },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "onlyfans",
      title: "OnlyFans",
      type: "media_list",
      functionName: "loadTagVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "tag", title: "子模块", type: "enum", value: "OnlyFans", enumOptions: ROU_ONLYFANS_OPTIONS },
        { name: "order", title: "排序", type: "enum", value: "createdAt", enumOptions: ROU_SORT_OPTIONS },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "tanhua",
      title: "探花",
      type: "media_list",
      functionName: "loadTagVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "tag", title: "子模块", type: "enum", value: "探花", enumOptions: ROU_TANHUA_OPTIONS },
        { name: "order", title: "排序", type: "enum", value: "createdAt", enumOptions: ROU_SORT_OPTIONS },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    },
    {
      id: "selfie",
      title: "自拍流出",
      type: "media_list",
      functionName: "loadTagVideos",
      cacheDuration: 1800,
      timeoutSeconds: 30,
      params: [
        { name: "tag", title: "子模块", type: "enum", value: "自拍流出", enumOptions: ROU_SELFIE_OPTIONS },
        { name: "order", title: "排序", type: "enum", value: "createdAt", enumOptions: ROU_SORT_OPTIONS },
        { name: "page", title: "页码", type: "page", value: "1" }
      ]
    }
  ],
  search: {
    title: "搜索",
    functionName: "searchVideos",
    params: [
      {
        name: "keyword",
        title: "搜索关键词",
        type: "input",
        description: "输入搜索关键词（标题、标签、演员/创作者等）",
        value: ""
      },
      { name: "page", title: "页码", type: "page", description: "页码", value: "1" }
    ]
  }
};

var ROU_SITE = "https://rou.video";
var ROU_HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
  "Referer": ROU_SITE + "/"
};

function ensureArray(v) {
  return Array.isArray(v) ? v : [];
}

function text(v) {
  return String(v == null ? "" : v).replace(/\s+/g, " ").trim();
}

function absoluteUrl(url) {
  url = text(url);
  if (!url) return "";
  if (url.indexOf("//") === 0) return "https:" + url;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.charAt(0) === "/") return ROU_SITE + url;
  return ROU_SITE + "/" + url;
}

function formatDuration(seconds) {
  seconds = Number(seconds || 0);
  if (!isFinite(seconds) || seconds <= 0) return "";
  seconds = Math.round(seconds);
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = seconds % 60;
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  return h > 0 ? (h + ":" + pad(m) + ":" + pad(s)) : (pad(m) + ":" + pad(s));
}

function formatCount(value) {
  var n = Number(value || 0);
  if (!isFinite(n) || n <= 0) return "";
  if (n >= 100000000) return (n / 100000000).toFixed(1).replace(/\.0$/, "") + "亿";
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, "") + "万";
  return String(Math.round(n));
}

function createPlaceholderItem(message) {
  return {
    id: "placeholder",
    type: "placeholder",
    title: "提示",
    description: text(message || "暂无内容"),
    posterPath: "",
    backdropPath: "",
    mediaType: "movie",
    duration: 0,
    durationText: "",
    previewUrl: "",
    videoUrl: "",
    url: "",
    playUrl: "",
    link: "",
    playerType: "none"
  };
}

function base64ToBytes(input) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var clean = String(input || "").replace(/[^A-Za-z0-9+/=]/g, "");
  var bytes = [];
  var buffer = 0;
  var bits = 0;

  for (var i = 0; i < clean.length; i++) {
    var c = clean.charAt(i);
    if (c === "=") break;
    var value = chars.indexOf(c);
    if (value < 0) continue;
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 255);
    }
  }

  return bytes;
}

function decodeRouVideoPayload(ev) {
  if (!ev || !ev.d) return {};
  var key = Number(ev.k || 0);
  var bytes = base64ToBytes(ev.d);
  var text = "";

  for (var i = 0; i < bytes.length; i++) {
    text += String.fromCharCode((bytes[i] - key + 256) & 255);
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return {};
  }
}

function extractNextData(html) {
  var match = String(html || "").match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/i);
  if (!match) return {};
  try {
    var raw = JSON.parse(match[1]);
    return (raw && raw.props && raw.props.pageProps) ? raw.props.pageProps : {};
  } catch (e) {
    return {};
  }
}

function fetchHtml(url) {
  return Widget.http.get(url, {
    headers: ROU_HEADERS,
    allow_redirects: true,
    timeout: 30000
  }).then(function (resp) {
    return text(resp && resp.data);
  });
}

function getPlayHeaders(referer) {
  return {
    "User-Agent": ROU_HEADERS["User-Agent"],
    "Accept": "application/vnd.apple.mpegurl,application/x-mpegURL,video/*,*/*",
    "Referer": referer || ROU_SITE + "/",
    "Origin": ROU_SITE
  };
}

function normalizeRouVideoUrl(url) {
  url = text(url);
  if (!url) return "";
  return url.replace(/\/index\.jpg(?=([?#]|$))/i, "/index.m3u8");
}

function buildVideoItem(item) {
  item = item || {};
  var id = text(item.id || item.vid || item.nameZh || item.name);
  var title = text(item.nameZh || item.name || item.title || id);
  var cover = absoluteUrl(item.coverImageUrl || "");
  var tags = ensureArray(item.tagsZh && item.tagsZh.length ? item.tagsZh : item.tags);
  var durationText = formatDuration(item.duration);
  var detailUrl = item.id ? (ROU_SITE + "/v/" + encodeURIComponent(item.id)) : absoluteUrl(item.ref || "");
  var desc = [];

  if (item.vid) desc.push("编号: " + text(item.vid));
  if (durationText) desc.push("时长: " + durationText);
  if (item.viewCount != null) desc.push("播放: " + formatCount(item.viewCount));
  if (tags.length) desc.push("标签: " + tags.slice(0, 4).join(" / "));
  if (item.ref) desc.push("来源: " + text(item.ref));

  return {
    id: id || detailUrl || title,
    type: "movie",
    title: title || id || "肉视频",
    description: desc.join("\n"),
    posterPath: cover,
    backdropPath: cover,
    mediaType: "movie",
    duration: Math.round(Number(item.duration || 0)) || 0,
    durationText: durationText,
    previewUrl: "",
    videoUrl: "",
    url: "",
    playUrl: "",
    link: detailUrl,
    detailUrl: detailUrl,
    playerType: "none"
  };
}

function mapList(items) {
  return ensureArray(items).map(buildVideoItem);
}

async function loadHomeData() {
  var html = await fetchHtml(ROU_SITE + "/home");
  return extractNextData(html);
}

async function loadSectionVideos(params) {
  params = params || {};
  var section = text(params.section || "latestVideos");
  var data = await loadHomeData();
  var list = ensureArray(data[section]);

  if (!list.length) {
    return [createPlaceholderItem("未找到该分区内容")];
  }

  return mapList(list);
}

function buildTagUrl(tag, order, page) {
  tag = text(tag || "自拍流出");
  order = text(order || "createdAt");
  page = parseInt(page, 10) || 1;
  var url = ROU_SITE + "/t/" + encodeURIComponent(tag) + "?order=" + encodeURIComponent(order);
  url += "&page=" + encodeURIComponent(page);
  return url;
}

async function loadTagVideos(params) {
  params = params || {};
  var tag = text(params.tag || params.category || "自拍流出");
  var order = text(params.order || params.sort || "createdAt");
  var page = parseInt(params.page, 10) || 1;
  var html = await fetchHtml(buildTagUrl(tag, order, page));
  var data = extractNextData(html);
  var list = ensureArray(data.videos);

  if (!list.length) {
    return [createPlaceholderItem("未找到「" + tag + "」相关内容")];
  }

  return mapList(list);
}

async function searchVideos(params) {
  params = params || {};
  var keyword = text(params.keyword || params.query || params.q || "");
  var page = parseInt(params.page, 10) || 1;
  if (!keyword) return [createPlaceholderItem("请输入搜索关键词")];

  var url = ROU_SITE + "/search?q=" + encodeURIComponent(keyword) + "&t=&sort=&page=" + encodeURIComponent(page);

  var html = await fetchHtml(url);
  var data = extractNextData(html);
  var list = ensureArray(data.videos);

  if (!list.length) {
    return [createPlaceholderItem("未找到与「" + keyword + "」相关的内容")];
  }

  return mapList(list);
}

async function loadDetail(link) {
  try {
    var detailLink = link;
    if (detailLink && typeof detailLink === "object") {
      detailLink = detailLink.detailUrl || detailLink.link || detailLink.id || "";
    }
    detailLink = text(detailLink);
    if (!detailLink) return createPlaceholderItem("缺少详情链接");

    var html = await fetchHtml(detailLink);
    var data = extractNextData(html);
    var video = data.video || {};
    var item = buildVideoItem(video);
    var payload = decodeRouVideoPayload(data.ev);
    var videoUrl = normalizeRouVideoUrl(payload.videoUrl || "");
    var playHeaders = videoUrl ? getPlayHeaders(detailLink) : undefined;

    return {
      id: item.id,
      type: "detail",
      title: item.title,
      description: item.description || "暂无简介",
      posterPath: item.posterPath,
      backdropPath: item.backdropPath,
      mediaType: "movie",
      duration: item.duration,
      durationText: item.durationText,
      previewUrl: text(payload.thumbVTTUrl || ""),
      videoUrl: videoUrl,
      url: videoUrl,
      playUrl: videoUrl,
      link: detailLink,
      playerType: videoUrl ? "system" : "none",
      customHeaders: playHeaders,
      headers: playHeaders
    };
  } catch (e) {
    return {
      id: text(link) || "detail",
      type: "detail",
      title: "肉视频",
      description: "详情页解析失败",
      posterPath: "",
      backdropPath: "",
      mediaType: "movie",
      duration: 0,
      durationText: "",
      previewUrl: "",
      videoUrl: "",
      url: "",
      playUrl: "",
      link: text(link) || "",
      playerType: "none"
    };
  }
}
