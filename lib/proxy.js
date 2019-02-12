const chrome_extension_chinese_dictionary_proxy = {};
chrome_extension_chinese_dictionary_proxy.xhr = {};
chrome_extension_chinese_dictionary_proxy.snd = {};

chrome_extension_chinese_dictionary_proxy.xhr.get = function (url) {
  var port     = chrome.extension.connect({ name: 'Proxy_XHR' });
  var settings = {
    method : 'GET',
    url    : url
  };
  var onSuccess;
  var onFailure;
  var self = {
    onSuccess: function (callback) {
      onSuccess = callback;
      return self;
    },
    onFailure: function (callback) {
      onFailure = callback;
      return self;
    }
  };
  port.onMessage.addListener(function (msg) {
    if (msg.status === 200 && typeof onSuccess === 'function') {
      onSuccess(msg.data, msg.xhr);
    } else if (typeof onFailure === 'function') {
      onFailure(msg.data, msg.xhr);
    }
  });
  port.postMessage(settings);
  return self;
};

chrome_extension_chinese_dictionary_proxy.snd.put = function (object) {
  var port     = chrome.extension.connect({ name: 'Proxy_recentlyWord' });
  port.postMessage(object);
  return true;
}