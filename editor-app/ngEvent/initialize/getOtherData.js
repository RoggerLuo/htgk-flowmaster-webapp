'use strict'

export const getModel = (callback,$http)=>{
    $http({    
        method: 'GET',
        // url: window.globalHost+'/resources/model/test.model.json', //本地调试
        url: window.globalHost+'/repository/process-definitions/'+window.getQueryString("pid")+'/design?processType=Normal',
    })
    .success(callback)
    .error(function (data, status, headers, config) {
        console.log('Something went wrong when updating the process model:' + JSON.stringify(data));
    })
}

export const getPid = ($http) => {
    $http({    
        method: 'GET',
        url: window.globalHost+'/repository/process-definitions/'+window.getQueryString("pid")+'?processType=Normal'
    }).success(function (data) {
        window.pidName = data.name
        window.pidDescription = data.description
    })
}

export const getProList = ($http) => {
    $http({    
        method: 'GET',
        url: window.globalHost+'/repository/process-definitions'
    }).success(function (data) {
        window.processList = data.data
    })
}


