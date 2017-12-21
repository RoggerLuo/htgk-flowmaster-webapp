'use strict'
import loadServerData from './loadServerData'
import requestUserData from './requestUserData'
import requestFormData from './requestFormData'
import { getModel, getPid, getProList } from './getOtherData'

export function fetchModelWrap($http, $rootScope) {
    // global.getModelByPid = (pid,cb) => {
    //     getModel(cb, $http,pid)
    // }

    const angularInit = (data) => {
        $rootScope.editor = new ORYX.Editor(data) //initialised   10866 12431 10060
        $rootScope.modelData = angular.fromJson(data)
        $rootScope.editorFactory.resolve()
    }
    const dataInit = modelId => {
        return (data) => {
            // data.model = data //本地断网调试



            //circulation 和service 转换回来
            data.model.childShapes && data.model.childShapes.forEach((el)=>{
                if(el.stencil.id == 'ServiceTask'){
                    if(el.properties.classify == "Circulation"){
                        el.stencil.id = 'CirculationTask'                        
                    }
                }
                if(el.stencil.id == 'UserTask'){
                    if(el.properties.classify == "manual"){
                        el.stencil.id = 'ManualTask'                        
                    }
                }
                // console.log(el.stencil.id)
            })





            if (!data.model.childShapes) { //第一次使用本地的配置
                var modelUrl = KISBPM.URL.getModel(modelId)
                // debugger
                // $http({ method: 'GET', url: '/resources/model/test.model.json' }).success(angularInit)
                $http({ method: 'GET', url: modelUrl }).success(angularInit)
            } else {
                loadServerData(data.model)
                angularInit(data.model)
            }
        }
    }
    return function(modelId) {
        requestUserData($http)
        requestFormData($http,window.getQueryString("pid"))
        getPid($http)
        getModel(dataInit(modelId), $http,window.getQueryString("pid"))
        getProList($http)

        $http({    
            method: 'GET',
            url: window.globalHost + '/identity/organizations/customrole-assignments'
        }).success(function (data) {
            window.customRoles = data.data
        })

        $http({    
            method: 'GET',
            url: window.globalHost + '/source/dataSources?orgId='+window.getQueryString("orgId")
        }).success(function (data) {
            window.dataSources = data.data.map(el=>{
                el.text = el.name
                el.value = el.id
                return el
            })
        })

    }
}

// var modelUrl = KISBPM.URL.getModel(modelId);
// $http({method: 'GET', url: modelUrl}).success(function (data, status, headers, config) {
//     $rootScope.editor = new ORYX.Editor(data);  //initialised   10866 12431 10060
//     $rootScope.modelData = angular.fromJson(data);            
//     $rootScope.editorFactory.resolve();
// })