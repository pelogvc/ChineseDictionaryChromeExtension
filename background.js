chrome.extension.onConnect.addListener(function(port) {
    if (port.name === 'Proxy_XHR') {
      port.onMessage.addListener(function(xhrOptions) {
        var xhr = new XMLHttpRequest();
        xhr.open(xhrOptions.method || "GET", xhrOptions.url, true);
        xhr.setRequestHeader('accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8');
        //xhr.setRequestHeader('accept-encoding', 'gzip, deflate, br');
        xhr.setRequestHeader('accept-language', 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6,zh;q=0.5');
        xhr.setRequestHeader('upgrade-insecure-requests', '1');
        xhr.setRequestHeader('cache-control', 'max-age=0');
        //xhr.setRequestHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36");
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
  }
  if (port.name === 'Proxy_recentlyWord') {

    port.onMessage.addListener(function(data) {
      
      let idb;
      const request = window.indexedDB.open('dictionary', 2);
      // IndexedDB has only open() method. (2nd parameter is `version`. Only integer number.)
      // This method open database or create database if not exist.
      // If success to open database, It returns IDBOpenDBRequest.
      
      request.onerror = function (event) {
        // Do something
      };
      
      request.onsuccess = function (event) {
        idb = request.result;
        var transaction = idb.transaction(["recentlyWords"], "readwrite");
        var objectStore = transaction.objectStore("recentlyWords");
        // Do something
        objectStore.add(Object.assign(data, {
          created: new Date(),
        }));
      };
      
      request.onupgradeneeded = function (event) {
        const idb = event.target.result;
      
        const objectStore = idb.createObjectStore('recentlyWords', { keyPath: "id", autoIncrement:true });
        objectStore.createIndex('created', 'created', { unique: false,  });
        objectStore.createIndex('query', 'query', { unique: false,  });
      };

    });
  } 
  return;
});