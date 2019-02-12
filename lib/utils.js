function is_chinese(s) {
    s = s || String(this);
	return /^[\u4E00-\u9FA5]*$/.test(s);
};

function select_text() {
    var selectionText = "";
    if (document.getSelection) {
        selectionText = document.getSelection().toString();
    } else if (document.selection) {
        selectionText = document.selection.createRange().text;
    }
    selectionText = selectionText.trim();
    return selectionText;
}

var _parser = function(data) {

    data = JSON.parse(data);
    //console.log(data.searchResults);

    $('#chrome_extension_chinese_dictionary').addClass('open');

    if ( !data.searchResults || !data.searchResults.searchResultsOrder || !data.searchResults.searchResultsOrder.length ) {

        let ret = `
            <div> 검색 결과가 없습니다. </div>
        `;
        $('#chrome_extension_chinese_dictionary .content').html(ret);

        //_closeChineseDictionaryWindow();
        return;
    }

    // 최근 검색 단어장에 추가하기
    let retobj = {
        query : data.query,
        results : data.searchResults.searchResultsOrder,
    };
    chrome_extension_chinese_dictionary_proxy.snd.put(retobj);


    // 보여주기
    let ret = `
        <ul class="words">
    `;

    data.searchResults.searchResultsOrder.forEach(async function (list) {
        //console.log(list);

        // 예문이 아닌경우
        if ( list.alias === '' ) {
            // 단어
            if ( list.destinationLink && list.destinationLink !== '' ) {
                ret += `<li><p><a href="` + list.destinationLink + `" target="_blank">` + list.entryName + `</a></p>`;
            } else {
                ret += `<li><p>` + list.entryName + `</p>`;
            }
            // 핑잉
            if ( list.pinyin ) {
                ret += `<span>[` + list.pinyin + `]</span>`;
            }

            // 뜻 목록
            ret += `<ul class="means">`;
            list.meanList.forEach(async function(mean, k) {

                ret += `<li>` + ( k + 1) + `.&nbsp;`;

                // 품사
                if ( mean.partsLabel ) {
                    ret += `<span class="parts">` + mean.partsLabel + `</span>`;
                }
                // 뜻
                if ( mean.mean ) {
                ret += `<span class="mean">` + mean.mean + `</span>`;
                }

                // 비슷한 단어
                if ( mean.relatedMeanInfos && mean.relatedMeanInfos.length ) {
                    ret += `
                    <span class="destEntry">
                        <span class="relatedMark">
                            ` + mean.relatedMeanInfos[0].relatedMark + `
                        </span>
                        <span class="word">
                            ` + mean.relatedMeanInfos[0].destEntryName + `
                        </span>
                    `;
                    if ( mean.relatedMeanInfos[0].destEntryPinyin && mean.relatedMeanInfos[0].destEntryPinyin !== 'null' ) {
                        ret += `<span class="pinyin">
                                    [` + mean.relatedMeanInfos[0].destEntryPinyin + `]
                                </span>`;
                    }
                    ret += `</span>`;
                }

                ret += `</li>`;
            });

            // 출처
            if ( list.source ) {
                ret += `<li class="source">출처:&nbsp;` + list.source + `</li>`;
            }

            ret += `</ul>`;

            ret += `</li>`;

        } else { // 예문인 경우

            if ( !list.example ) return;

            ret += `<li class="example"><p class="example"> 예문 </p>`;
            ret += `
                <span class="example">` + list.example + `</span>
                <span class="examplePinyin">[` + list.pinyin + `]</span>
                <span class="exampleFanyi">` + list.translatedExample + `</span>
            `;
            ret += `</li>`;
        }
    });


    ret += `</ul>`;

    $('#chrome_extension_chinese_dictionary .content').html(ret);
}

var _gotoParsing = function (word) {

    _createChineseDictionaryDiv();

    chrome_extension_chinese_dictionary_proxy.xhr.get('https://zh.dict.naver.com/cndictApi/search/all?sLn=ko&q=' + encodeURIComponent(word) + '&mode=pc&pageNo=1&format=json&hid=153989713248236640')
        .onSuccess(_parser)
        .onFailure(function () {
            return;
        });
    
}

// 창닫기
var _closeChineseDictionaryWindow = function() {
    if ( $('#chrome_extension_chinese_dictionary').hasClass('open') ) {
        $('#chrome_extension_chinese_dictionary').removeClass('open');
    }
}

// 부모 페이지 찾아가기
var _gotoParentFrame = function (e) {

    // 다른 스크립트에서도 쓸수있기때문에..
    if ( !e.data || !( e.data.chinese_dictionary_window || e.data.chinese_dictionary_word ) ) {
        return;
    }

    // 창 닫으라는 메세지면
    if ( e.data && e.data.chinese_dictionary_window ) {
        if ( isInIframe ) {
            window.parent.postMessage({ 'chinese_dictionary_window': 1 }, '*');
        }else{
            _closeChineseDictionaryWindow();
        }
        return;
    }

    e = e.data.chinese_dictionary_word;
    if ( typeof e === 'undefined' ) return;

    // 아직도 부모가 있으면
    if ( isInIframe ) { // or $('#chrome_extension_chinese_dictionary').length 
        window.parent.postMessage({ 'chinese_dictionary_word': e }, '*');
        return;
    }

    _gotoParsing(e);

}

var _createChineseDictionaryDiv = function () {

    if ( !$('html').length ) return;

    if ( $('#chrome_extension_chinese_dictionary').length ) return;
    if ( isInIframe ) return;

    $('html').append(`
        <div id="chrome_extension_chinese_dictionary">
            <div class="title">
                <h1>
                    네이버 중국어사전
                    <span>(비공식)<span>
                </h1>
            </div>
            <div class="content">
            <div>
        </div>
    `);
}