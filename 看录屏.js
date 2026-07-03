// ==UserScript==
// @name         lubosp 直播录屏
// @namespace    https://lubosp.com
// @version      1.0.0
// @description  lubosp.com 直播录屏 Widget，封面 vod.jpg -> 同目录 index.m3u8 直链播放
// @author       Marvis
// @match        https://lubosp.com/*
// @grant        none
// ==/UserScript==

var WidgetMetadata = {
    id: "lubosp",
    title: "看录屏",
    version: "1.1.0",
    description: "lubosp.com 看录屏。封面 vod.jpg 同目录 index.m3u8 直链，无需登录即可播放。",
    modules: [
        {
            id: "dyks",
            title: "抖音快手",
            type: "media_list",
            functionName: "lubosp_load",
            params: [
                { name: "key", type: "constant", defaultValue: "抖音快手" },
                { name: "page", label: "页码", type: "page" }
            ]
        },
        {
            id: "mianfei",
            title: "免费视频",
            type: "media_list",
            functionName: "lubosp_load",
            params: [
                { name: "key", type: "constant", defaultValue: "免费视频" },
                { name: "page", label: "页码", type: "page" }
            ]
        },
        {
            id: "toupai",
            title: "偷拍视频",
            type: "media_list",
            functionName: "lubosp_load",
            params: [
                { name: "key", type: "constant", defaultValue: "偷拍视频" },
                { name: "page", label: "页码", type: "page" }
            ]
        },
        {
            id: "huiyi",
            title: "会议私播",
            type: "media_list",
            functionName: "lubosp_load",
            params: [
                { name: "key", type: "constant", defaultValue: "会议私播" },
                { name: "page", label: "页码", type: "page" }
            ]
        }
    ]
};

var SITE = "https://lubosp.com";

var CATEGORIES = {
    "抖音快手": { path: "/type01/", pages: 20 },
    "免费视频": { path: "/mianfei/", pages: 15 },
    "偷拍视频": { path: "/toupai/", pages: 3 },
    "会议私播": { path: "/huiyi/", pages: 5 }
};

function parseVideos(html) {
    var doc = Widget.dom.parse(html);
    var items = Widget.dom.select(doc, "li.mb15");
    if (!items || items.length === 0) return [];

    var results = [];

    for (var i = 0; i < items.length; i++) {
        var li = items[i];

        // 跳过子分类入口（没有 img-box-bg 的是子分类导航）
        var coverLink = Widget.dom.select(li, "a.img-box-bg")[0];
        if (!coverLink) continue;

        // 封面图
        var imgs = Widget.dom.select(coverLink, "img");
        var coverUrl = imgs.length > 0 ? Widget.dom.attr(imgs[0], "src") : "";

        // 标题
        var h2 = Widget.dom.select(li, "h2.rows-2 a")[0];
        if (!h2) continue;
        var title = Widget.dom.text(h2);

        if (!title) continue;

        // 从封面 URL 推导 m3u8：vod.jpg -> index.m3u8
        var m3u8Url = "";
        if (coverUrl && coverUrl.indexOf("vod.jpg") > -1) {
            m3u8Url = coverUrl.replace(/vod\.jpg$/i, "index.m3u8");
        }

        results.push({
            id: "lubosp_" + i + "_" + Date.now(),
            title: title.trim(),
            posterUrl: coverUrl,
            videoUrl: m3u8Url
        });
    }

    return results;
}

async function lubosp_load(params) {
    var catName = params.key || "抖音快手";
    var page = parseInt(params.page) || 1;

    var cat = CATEGORIES[catName];
    if (!cat) return [];

    var url;
    if (page <= 1) {
        url = SITE + cat.path;
    } else {
        url = SITE + cat.path + "index_" + page + ".php";
    }

    var resp = await Widget.http.get(url);
    if (!resp.ok) {
        console.error("lubosp: HTTP " + resp.status + " - " + url);
        return [];
    }

    var html = resp.data;
    if (typeof html !== "string") {
        console.error("lubosp: unexpected response type");
        return [];
    }

    return parseVideos(html);
}
