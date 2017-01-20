import { domainName } from '../constantConfig.js'

export function addCommonInfo(id) {
    return (dispatch, getState) => { //这个dispatch来自于thunk,返回一个函数
        return fetch(domainName + '/webbase5/api/user/appUserSetting/save?id=' + id + '&userId=1&type=2')
            .then(response => response.json())
            .then(json => {

                if (json[0].result == '1') {
                    dispatch({ type: 'addCommonInfo', id: id })
                }else{
                    alert(json[0].msg)
                }

            })
    }
}

export function cancelCommonInfo(id) {
    return (dispatch, getState) => { //这个dispatch来自于thunk,返回一个函数
        return fetch(domainName + '/webbase5/api/user/appUserSetting/delete?id=' + id + '&userId=1&type=2')
            .then(response => response.json())
            .then(json => {
                if (json[0].result == '1') {
                    dispatch({ type: 'cancelCommonInfo', id: id })
                    getState()
                }else{
                    alert(json[0].msg)
                }
            })
    }
}
