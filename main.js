var selectedText = '';
var isInIframe = top !== self;

var _parser = function(data) {
    //$('body').html(data);
    data = JSON.parse(data);
    console.log(data.searchResults);

    $('#chrome_extension_chinese_dictionary').addClass('open');

    if ( !data.searchResults.searchResultsOrder || !data.searchResults.searchResultsOrder.length ) {
        _closeChineseDictionaryWindow();
        return;
    }

    let ret = `
        <ul class="words">
    `;
    // 단어 목록
    for (var i = 0; i < data.searchResults.searchResultsOrder.length; i++ ) {

        if ( !data.searchResults.searchResultsOrder[i].meanList ) continue;

        // 단어
        ret += `<li><p>` + data.searchResults.searchResultsOrder[i].entryName + `</p>`;

        // 핑잉
        if ( data.searchResults.searchResultsOrder[i].pinyin ) {
            ret += `<span>(` + data.searchResults.searchResultsOrder[i].pinyin + `)<span>`;
        }

        // 뜻 목록
        ret += `<ul class="means">`;
        for ( var k = 0; k < data.searchResults.searchResultsOrder[i].meanList.length; k++ ) {
            ret += `<li>` + ( k + 1) + `.&nbsp;`;
            if ( data.searchResults.searchResultsOrder[i].meanList[k].partsLabel ) {
                ret += `<span class="parts">` + data.searchResults.searchResultsOrder[i].meanList[k].partsLabel + `</span>`;
            }
            ret += `<span>` + data.searchResults.searchResultsOrder[i].meanList[k].mean + `<span>`;
            ret += `</li>`;
        }

        // 출처
        if ( data.searchResults.searchResultsOrder[i].source ) {
            ret += `<li class="source">출처:&nbsp;` + data.searchResults.searchResultsOrder[i].source + `</li>`
        }
        
        ret += `</ul>`;

        ret += `</li>`;

    }

    ret += `</ul>`;

    $('#chrome_extension_chinese_dictionary .content').html(ret);
}

var _gotoParsing = function (word) {

    proxyXHR.get('https://zh.dict.naver.com/cndictApi/search/all?sLn=ko&q=' + encodeURIComponent(word) + '&mode=pc&pageNo=1&format=json&hid=153989713248236640')
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
    if ( 
        !e.data && 
        !( e.data.chinese_dictionary_window || e.data.chinese_dictionary_word )
        ) {
        return;
    }

    // 창 닫으라는 메세지면
    if ( e.data && e.data.chinese_dictionary_window ) {
        if ( isInIframe ) {
            window.parent.postMessage({ 'chinese_dictionary_window': 1 }, '*');
            return;
        }else{
            _closeChineseDictionaryWindow();
            return;
        }
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

var __initChineseDictionary = function () {
    
    if ( !$('body').length ) return;

    if ( !isInIframe ) {
        $('body').append(`
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

    window.addEventListener('message', _gotoParentFrame);

    $(document).mouseup(function(e) {

        // 뷰어 안에서는 작동 안하게
        if ( 
            $(e.target).is('#chrome_extension_chinese_dictionary') ||
            $(e.target).parents().is('#chrome_extension_chinese_dictionary')
        ) {
            return;
        }

        // 이미 열려있는 뷰어 닫기
        window.parent.postMessage({ 'chinese_dictionary_window': 1 }, '*');

        // select된 부분 구하기
        var s = select_text();
        if ( !s ) return;
        if ( selectedText === s ) return; // 저장된거랑 같으면
        if ( !is_chinese(s) ) return;
        selectedText = s;

        _gotoParentFrame({ 'data' : { 'chinese_dictionary_word' : s }});
    });
}

$(document).ready(function() {    
    __initChineseDictionary();
});