chrome.extension.onConnect.addListener(function(port) {
    if (port.name != 'XHRProxy_')
      return;
    port.onMessage.addListener(function(xhrOptions) {
      var xhr = new XMLHttpRequest();
      xhr.open(xhrOptions.method || "GET", xhrOptions.url, true);
      xhr.setRequestHeader('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
      xhr.setRequestHeader('accept-encoding', 'gzip, deflate, br');
      xhr.setRequestHeader('accept-language', 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5');
      xhr.setRequestHeader('upgrade-insecure-requests', '1');
      xhr.setRequestHeader('cache-control', 'max-age=0');
      xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
      xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
          port.postMessage({
            status : this.status,
            data   : this.responseText,
            xhr    : this
          });
        }
      }
      xhr.send();
    });
  });