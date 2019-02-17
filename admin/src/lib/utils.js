export const drawHtml = (data) => {

    let ret = data.map(function(obj) {
        return {
            id: obj.id,
            key: obj.id,
            meanList: obj.results.items[0].meanList,
            //word: `${obj.query} [${obj.results.items[0].pinyin}]`,
            query: obj.query,
            pinyin: obj.results.items[0].pinyin,
            url: obj.url,
            urlTitle: obj.title,
            created: obj.created,
            searchUrl: `https://zh.dict.naver.com/#/search?query=${obj.query}`
        }
    });

    return ret;
}