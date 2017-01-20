import fetch from 'isomorphic-fetch'
import {domainName} from '../constantConfig.js'
const initialData = {chartData:{}}
let store = {}

function companyStats1() {
    return fetch( domainName +`/webbase5/api/company/companyStats/list?user_id=1&type=1`)
        .then(response => response.json())
        .then(json => {
            initialData.chartData.companyStats1 = json
            // console.log("companyStats1接口测试")
            // console.log(json)
        })
}
function companyStats2() {
    return fetch( domainName +`/webbase5/api/company/companyStats/list?user_id=1&type=2`)
        .then(response => response.json())
        .then(json => {
            initialData.chartData.companyStats2 = json
            // console.log("companyStats2接口测试")
            // console.log(json)
        })
}
function companyStats3() {
    return fetch( domainName +`/webbase5/api/company/companyStats/list?user_id=1&type=3`)
        .then(response => response.json())
        .then(json => {
            initialData.chartData.companyStats3 = json
            // console.log("companyStats3接口测试")
            // console.log(json)
        })
}

export default Promise.all([companyStats1(),companyStats2(),companyStats3()]).then(() => {
    // console.log('all is done')
    return initialData
})
