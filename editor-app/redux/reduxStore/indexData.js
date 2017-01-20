import fetch from 'isomorphic-fetch'
import {domainName} from '../constantConfig.js'
import {fromJS,List, Map} from 'immutable';

const initData = {chartData:{}}

function fetchCustomerList() {
    return fetch( domainName +`/webbase5/api/user/appUserSetting/list?userId=1&type=1`)
        .then(response => response.json())
        .then(json => {
            initData.customerList = json
        })
}
function infoList() {
    return fetch(domainName + `/webbase5/api/user/appUserSetting/list?userId=1&type=2`)
        .then(response => response.json())
        .then(json => {
            initData.commonInfo = json
        })
}
function allCommonInfo() {
    return fetch(domainName + `/webbase5/api/user/appUserSetting/moreFocus?userId=1`)
        .then(response => response.json())
        .then(json => {
            initData.setCommonInfo = json
            
        })
}
function wholeCorpList() {
    return fetch(domainName + `/webbase5/api/user/appUserSetting/moreFollowList?userId=1`)
        .then(response => response.json())
        .then(json => {
            initData.wholeCorpList = json
        })
}
export default Promise.all([fetchCustomerList(), infoList(),allCommonInfo(),wholeCorpList()]).then(() => {
    return initData
})
