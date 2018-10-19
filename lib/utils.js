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
    return selectionText;
}