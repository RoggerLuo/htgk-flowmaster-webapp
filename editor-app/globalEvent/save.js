window.globalEvent =  window.globalEvent || {}

const saveHandlerBranch = (canvas) => {
    /* 这个data是一个多层数组*/
    window.reduxStore.getState().branch.dataRepo.forEach((el,index)=>{ 
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if(el.id && !currentElement){
            return ;
        }
        let returnString = ''
        if(el.radio){
            returnString = el.text
        }else{
            returnString = '${'
            el.conditions.forEach((condition,i)=>{
                let conditionArray  = []        
                condition.forEach((el,index)=>{
                    switch(el.entry1.index){
                        case 0:
                            returnString += ' f.'
                        break
                        case 1:
                            returnString += ' u.'
                        break
                        case 2:
                            returnString += ' e.'
                        break
                    }
                    returnString += el.entry2.value
                    returnString += ' '
                    returnString += el.entry3.value
                    returnString += ' '
                    returnString += el.input

                    if(index < (condition.length-1)){
                        returnString += ' && '                
                    }
                })

                if(i < (el.conditions.length-1)){
                    returnString += ' || '                
                }
            })
            returnString += '}'
        }
        currentElement.setProperty('conditionsequenceflow',returnString)
        currentElement.setProperty('reduxdata',el)
    })
}

const saveHandlerParallel = (canvas) => {
    window.reduxStore.getState().parallel.repo.forEach((el)=>{
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if(el.id && !currentElement){
            return ;
        }

        let jsonArray = []
        el.data.forEach((group)=>{
            let innerArray  = []
            group.forEach((el,index)=>{
                switch(el.cate){
                    case "boss":
                        innerArray.push({"value":"boss" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value}) 
                        break
                    case "role":
                        innerArray.push({"value":"role" + "("+ el.value2 +":"+ el.value +")",cate:el.cate,text:el.text,id:el.value,value2:el.value2}) 
                        break
                    case "EMPLOYEE":
                        innerArray.push({"value":"user" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value}) 
                        break
                    case "ORG":
                    case "DEPT":
                        innerArray.push({"value":"org" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value}) 
                        break
                }
            })
            jsonArray.push(innerArray)
        })

        currentElement.setProperty('multiinstance_parties',jsonArray)
        currentElement.setProperty('multiinstance_type',"parallel")
        currentElement.setProperty('multiinstance_variable',"per")
        currentElement.setProperty('usertaskassignment',{"assignment": {"candidateOwners": "${per}"}})
    })
}

const saveHandlerApprove = (canvas) => {
    window.reduxStore.getState().approve.approveListRepo.forEach((el)=>{
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if(el.id && !currentElement){
            return ;
        }

        let jsonArray = []
        el.data.forEach((el,index)=>{
            switch(el.cate){
               case "boss":
                   jsonArray.push({"value": "boss" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
                   break
               case "role":
                   jsonArray.push({"value": "role" + "("+ el.value2 +":"+ el.value +")",cate:el.cate,text:el.text,id:el.value,value2:el.value2})
                   break
               case "EMPLOYEE":
                   jsonArray.push({"value": "user" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
                   break
               case "ORG":
               case "DEPT":
                   jsonArray.push({"value": "org" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
                   break
            }
        })
        let value = {
            "assignment": {
                "candidateOwners": jsonArray
            }
        }
        currentElement.setProperty('usertaskassignment',value)
    })
}

const saveHandlerEndPoint = (canvas) => {
    window.reduxStore.getState().endpoint.approveListRepo.forEach((el)=>{
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if(el.id && !currentElement){
            return ;
        }

        let jsonArray = []
        el.data.forEach((el,index)=>{
            switch(el.cate){
               case "boss":
                   jsonArray.push({"value": "boss" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
                   break
               case "role":
                   jsonArray.push({"value": "role" + "("+ el.value2 +":"+ el.value +")",cate:el.cate,text:el.text,id:el.value,value2:el.value2})
                   break
               case "EMPLOYEE":
                   jsonArray.push({"value": "user" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
                   break
               case "ORG":
               case "DEPT":
                   jsonArray.push({"value": "org" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
                   break
            }
        })
        currentElement.setProperty('deliverToUsers',jsonArray)
    })
}

window.globalEvent.save = function($scope,$http){
    return function (callback) {
        window.reduxStore.dispatch({type:'saveDeactive'})
        
        /* 提前把redux转换成oryx数据 */
        const canvas = $scope.editor.getCanvas()
        saveHandlerApprove(canvas)
        saveHandlerParallel(canvas)
        saveHandlerEndPoint(canvas)
        saveHandlerBranch(canvas)
        
        /* 为空的限制条件 */
        if(window.globalEvent.checkEmpty($scope)){
            return ;
        }

        /* 等待动画 */
        window.reduxStore.dispatch({type:'callSpin'})


        var json = $scope.editor.getJSON();
        json.properties.process_id = window.getQueryString("pid")
        json = JSON.stringify(json);
        
        var selection = $scope.editor.getSelection();
        $scope.editor.setSelection([]);
        
        // Get the serialized svg image source
        var svgClone = $scope.editor.getCanvas().getSVGRepresentation(true);
        $scope.editor.setSelection(selection);
        if ($scope.editor.getCanvas().properties["oryx-showstripableelements"] === false) {
            var stripOutArray = jQuery(svgClone).find(".stripable-element");
            for (var i = stripOutArray.length - 1; i >= 0; i--) {
                stripOutArray[i].remove();
            }
        }

        // Remove all forced stripable elements
        var stripOutArray = jQuery(svgClone).find(".stripable-element-force");
        for (var i = stripOutArray.length - 1; i >= 0; i--) {
            stripOutArray[i].remove();
        }

        // Parse dom to string
        var svgDOM = DataManager.serialize(svgClone);

        var params = {
            json_xml: json,
            svg_xml: svgDOM,
            name: window.pidName,
            description: 'flowMaster'
        };
        const transformRequest = function (obj) {
            var str = [];
            for (var p in obj) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        }
        var saveEvent = {
            type: KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED,
            model: params,
            modelId: window.getQueryString("pid"),
            eventType: 'update-model'
        };

        $http({    
            method: 'PUT',
            data: params,
            ignoreErrors: true,
            headers: {
                // 'Accept': 'application/json',
                // "Authorization": "Bearer acf49858556241e89b7c4e9d3f0a9b84",
                // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            url: 'http://'+window.globalHost+'/repository/process-definitions/'+ window.getQueryString("pid") +'/design?processType=Normal'
        })

        .success(function (data, status, headers, config) {
            
            window.reduxStore.dispatch({type:'closeSpin'})
            
            window.showAlert('保存成功')

            // Fire event to all who is listening
            $scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_SAVED 
            });

            KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED, saveEvent);
            callback()
            
            // console.log(transformRequest(params))
            // console.log($scope.editor.getJSON())
            console.log(json)
            window.reduxStore.dispatch({type:'saveDeactive'})

        })
        .error(function (data, status, headers, config) {

            $scope.error = {};
            console.log('Something went wrong when updating the process model:' + JSON.stringify(data));
            window.reduxStore.dispatch({type:'saveActive'})

        });
    };

}

