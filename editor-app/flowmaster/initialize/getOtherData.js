'use strict'
const getBusinessStatus = (modelProcessType, $http) => {
    $http({
        method: 'GET',
        url: window.globalHost + `/repository/process-status/businessStatus/list/${modelProcessType}`
    }).success(function(data) {
        window.processStatus = data.data
    })
}




export const getModel = (callback, $http, pid) => {
    let url = window.globalHost + '/repository/process-definitions/' + pid + '/design?processType=Normal'
    if (fm.isSpecificVersionEditMode) { 
        url = window.globalHost + '/repository/process-definitions/' + pid + `/design?processType=Normal&version=${fm.version}`
    }
    if(window.getQueryString("option") === 'repair') {
        url = window.globalHost + `/repository/process-definitions/${pid}/designSingle/${window.getQueryString('instanceId')}?processType=Normal&version=${fm.version}`
    }

    $http({
            method: 'GET',
            // url: window.globalHost+'/resources/model/test.model.json', //本地调试
            url,
        })
        .success(function(data) {
            const modelProcessType = data.modelProcessType
            getBusinessStatus(modelProcessType, $http)
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
        url: window.globalHost + `/repository/process-definitions?orgId=${window.getQueryString("orgId")}&start=0&size=9999`
    }).success(function(data) {
        // debugger
        window.processList = data.data
    })
    $http({
        method: 'GET',
        url: window.globalHost + `/repository/process-categories`
    }).success(function(data) {
        // debugger
        window.processCategory = data.children
    })
}

export const formLimits = ($http) => {
    fm.fetchFormLimits = (pid,versionId,cb) => {

        $http({
            method: 'GET',
            url: window.globalHost + `/repository/form-limits/${pid}/settings?versionId=${versionId}`
        }).success(function(data) {
            cb(data.nodes)
        })

    }
}


