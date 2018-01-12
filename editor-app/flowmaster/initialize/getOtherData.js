'use strict'

export const getModel = (callback, $http, pid) => {
    // const version = window.getQueryString("version")
    let url = window.globalHost + '/repository/process-definitions/' + pid + '/design?processType=Normal'
    if (fm.versionModel){ //version != 'undefined'
        url = window.globalHost + '/repository/process-definitions/' + pid + `/design?processType=Normal&version=${fm.version}`
        // fm.versionModel = true
    }
    
    $http({
            method: 'GET',
            // url: window.globalHost+'/resources/model/test.model.json', //本地调试
            url,
        })
        .success(function(data) {
            





            $http({
                method: 'GET',
                url: window.globalHost + `/repository/process-status/businessStatus/list/${data.modelProcessType}`
            }).success(function(data) {
                window.processStatus = data.data
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
