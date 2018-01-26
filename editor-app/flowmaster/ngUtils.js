global.fm = global.fm || {}

fm.getUrlQueryParam = (name) => { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//dep
window.getQueryString = fm.getUrlQueryParam

const version = fm.getUrlQueryParam("version")
if (version != 'undefined') {
    fm.versionModel = true
    fm.version = version
}
fm.versionId = fm.getUrlQueryParam("versionId")

