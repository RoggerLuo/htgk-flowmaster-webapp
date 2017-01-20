import { domainName } from '../constantConfig.js'
import store from '../reduxStore/configureStore.js'

export default function ajax() {
    fetchCustomerList()
    wholeCorpList()
    function fetchCustomerList() {
        return fetch( domainName +`/webbase5/api/user/appUserSetting/list?userId=1&type=1`)
            .then(response => response.json())
            .then(json => {
                store.dispatch({type:'refreshAfterChangeCustomer',data:json})
            })
    }

    function wholeCorpList() {
        return fetch(domainName + `/webbase5/api/user/appUserSetting/moreFollowList?userId=1`)
            .then(response => response.json())
            .then(json => {
                store.dispatch({type:'refreshAfterChangeAllList',data:json})
            })
    }

}