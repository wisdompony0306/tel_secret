/**
 * Created by tanghaibo on 2017/8/29.
 */

function getSearchParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r != null){
        return r[2];
    }else{
        return null;
    };
}

function getCookie(objname) {
    var result = '';
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
        var temp = arrstr[i].split("=");
        if (temp[0] == objname) {
            result = decodeURIComponent(temp[1]);
        }
    }
    if (result) {
        return result;
    } else {
        return null;
    }
}

export {
    getSearchParam,
    getCookie
};