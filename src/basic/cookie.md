# Cookie 封装

## 新增

```js
function setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
  if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
    return false;
  }
  let sExpires = "";
  if (vEnd) {
    switch (vEnd.constructor) {
      case Number:
        sExpires =
          vEnd === Infinity
            ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT"
            : "; max-age=" + vEnd;
        break;
      case String:
        sExpires = "; expires=" + vEnd;
        break;
      case Date:
        sExpires = "; expires=" + vEnd.toUTCString();
        break;
    }
  }
  document.cookie =
    encodeURIComponent(sKey) +
    "=" +
    encodeURIComponent(sValue) +
    sExpires +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "") +
    (bSecure ? "; secure" : "");
  return true;
}
```

## 判断 cookie 是否存在

```js
function hasItem(sKey) {
  return new RegExp(
    "(?:^|;\\s*)" +
      encodeURIComponent(sKey).replace(/[-.+*]/g, "\\$&") +
      "\\s*\\="
  ).test(document.cookie);
}
```

## 删除

```js
function removeItem(sKey, sPath, sDomain) {
  if (!sKey || !this.hasItem(sKey)) {
    return false;
  }
  document.cookie =
    encodeURIComponent(sKey) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (sDomain ? "; domain=" + sDomain : "") +
    (sPath ? "; path=" + sPath : "");
  return true;
}
```

## 获取 cookie 的 key 的集合

```js
function keys() {
  let aKeys = document.cookie
    .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "")
    .split(/\s*(?:\=[^;]*)?;\s*/);
  for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
    aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
  }
  return aKeys;
}
```

> cookie 相关的函数来源于 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie#%E4%B8%80%E4%B8%AA%E5%B0%8F%E6%A1%86%E6%9E%B6%EF%BC%9A%E4%B8%80%E4%B8%AA%E5%AE%8C%E6%95%B4%E6%94%AF%E6%8C%81unicode%E7%9A%84cookie%E8%AF%BB%E5%8F%96%E5%86%99%E5%85%A5%E5%99%A8)

<!-- <script>
import cookies from '../../.vuepress/public/js/cookies.js'
export default {
    data(){
        return {
            formItem: {
                key: '',
                value: ''
            }
        }
    },
    mounted(){
        console.log(cookies.keys(), '123')
    },
}
</script> -->
