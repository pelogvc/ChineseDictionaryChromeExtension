$(document).ready(function() {   
    var _doPopupSearch = function () {
        let text = $('#chrome_extension_chinese_tab input[type="text"]').val();

        if ( !text ) return;

        _gotoParsing(text);
    }

    $('#chrome_extension_chinese_tab input[type="submit"]').on('click', function() {
        _doPopupSearch();
    });

    $('#chrome_extension_chinese_tab input[type="text"]').keyup(function(e) {
        if(e.keyCode == 13) { //enter
            _doPopupSearch();
        }
    });

});