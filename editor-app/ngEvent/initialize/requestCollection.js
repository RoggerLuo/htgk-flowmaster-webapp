'use strict'
export const getModel = (callback,$http)=>{
    $http({    
        method: 'GET',
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
    }).success(function (data2) {
        window.pidName = data2.name
        window.pidDescription = data2.description
    })
}
