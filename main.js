var selectedText = '';
var isInIframe = top !== self;

var __initChineseDictionary = function () {

    _createChineseDictionaryDiv();

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
        //if ( selectedText === s ) return; // 저장된거랑 같으면
        if ( !is_chinese(s) ) return;
        selectedText = s;

        _gotoParentFrame({ 'data' : { 'chinese_dictionary_word' : s }});
    });
}

$(document).ready(function() {    
    __initChineseDictionary();
});