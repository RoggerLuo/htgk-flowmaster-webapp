'use strict'

export const getModel = (callback, $http, pid) => {
    $http({
            method: 'GET',
            // url: window.globalHost+'/resources/model/test.model.json', //本地调试
            url: window.globalHost + '/repository/process-definitions/' + pid + '/design?processType=Normal',
        })
        .success(function(data) {

            $http({
                method: 'GET',
                url: window.globalHost + `/repository/process-status/businessStatus/list/${data.model.modelProcessType}`
            }).success(function(data) {
                window.processStatus = data.data
                window.processStatus = [{
                        "id": "440002",
                        "processTypeId": "437502",
                        "name": "项目经理",
                        "createDate": 1512489600000,
                        "tenantId": "9d194a44-e02b-4cfc-bc4c-dbe26cc04353,atwork",
                        "disabled": "ENABLE"
                    },
                    {
                        "id": "440003",
                        "processTypeId": "437502",
                        "name": "项目经理审批",
                        "createDate": 1512489600000,
                        "tenantId": "9d194a44-e02b-4cfc-bc4c-dbe26cc04353,atwork",
                        "disabled": "DISABLED"
                    },
                    {
                        "id": "445001",
                        "processTypeId": "437502",
                        "name": "CEO审批",
                        "createDate": 1512489600000,
                        "tenantId": "9d194a44-e02b-4cfc-bc4c-dbe26cc04353,atwork",
                        "disabled": "DISABLED"
                    }
                ]
            })
            

            callback(data)
        })
        .error(function(data, status, headers, config) {
            console.log('Something went wrong when updating the process model:' + JSON.stringify(data));
        })
}
export const getPid = ($http) => {
    $http({
        method: 'GET',
        url: window.globalHost + '/repository/process-definitions/' + window.getQueryString("pid") + '?processType=Normal'
    }).success(function(data) {
        window.pidName = data.name
        window.pidDescription = data.description
    })
}

export const getProList = ($http) => {
    $http({
        method: 'GET',
        url: window.globalHost + '/repository/process-definitions'
    }).success(function(data) {
        window.processList = data.data
    })
}

// export const processStatus = ($http) => {
//     $http({    
//         method: 'GET',
//         url: window.globalHost+'/repository/process-status/processType/list' ///{processTypeId}}
//     }).success(function (data) {
//         debugger
//         window.processStatus = data.data
//     })
// }