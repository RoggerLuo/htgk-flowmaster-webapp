'use strict';
window.globalEvent =  window.globalEvent || {}
function LTrim(str){ 
  var i; 
  for(i=0;i<str.length;i++){
    if(str.charAt(i)!=" ") 
      break; 
  } 
  str = str.substring(i,str.length); 
  return str; 
}

function RTrim(str){ 
  var i; 
  for(i=str.length-1;i>=0;i--){ 
    if(str.charAt(i)!=" ") 
      break; 
  } 
  str = str.substring(0,i+1); 
  return str; 
}

function Trim(str){ 
   return LTrim(RTrim(str)); 
}                    

const saveHandlerBranchNode = (canvas) => {
    canvas.children.forEach((el)=>{
        if(el._stencil._jsonStencil.title == 'Sequence flow'){
            el.setProperty('defaultflow',"false")
        }
    })
    window.reduxStore.getState().branchNode.repo.forEach((el)=>{
        let currentElement = canvas.getChildShapeByResourceId(el.choosed.value)
        if(el.resourceId && !currentElement){
            return ;
        }
        currentElement.setProperty('defaultflow',"true")
        currentElement.setProperty('conditionsequenceflow','')
        currentElement.setProperty('reduxdata','')
    })
}

const saveHandlerBranch = (canvas) => {
    let canSave = true
    window.reduxStore.getState().branch.dataRepo.forEach((el,index)=>{ 
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if(el.id && !currentElement){
            return ;
        }
        let name = ''
        let returnString = ''
        if(el.radio){
            returnString = '${' + el.text + '}'
            window.setPropertyAdvance({key:'oryx-name',value: el.text},currentElement)

        }else{
            returnString = '${'
            if(el.conditions.some((condition,i)=>{
                return condition.data.some((el,index)=>{
                    if((el.entry1.value == 'initial')||
                    (el.entry2.value == 'initial')||
                    (el.entry3.value == 'initial')){
                        return true
                    }
                })
            })){
                /* 如果有一个为为空值，整个条件都为空 */
                if(currentElement.properties.defaultflow != 'true'){
                    window.showAlert('保存失败，分支条件和规则不能为空') 
                    window.setPropertyAdvance({key:'oryx-name',value:''},currentElement)
                    canSave = false
                    return                    
                }
                // currentElement.setProperty('conditionsequenceflow','')
                // return
            }

            el.conditions.forEach((condition,i)=>{
                let conditionArray  = []        
                condition.data.forEach((el,index)=>{
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

                    el.input = Trim(el.input)
                    if(!isNaN(el.input)){
                        returnString += el.input
                    }else{
                        /* 如果是yyyy-mm-dd，转换成时间戳 */
                        const re = new RegExp(/\d{4}(\-|\/|\.)\d{1,2}\1\d{1,2}/)
                        if(re.test(el.input)){
                            returnString +=  Date.parse(new Date(el.input)) //+ new Date().getTimezoneOffset()*60*1000
                        }else{
                            returnString += '"'+ el.input +'"'
                        }
                    }
                    name += el.entry2.text
                    name += ' '
                    name += el.entry3.text
                    name += ' '
                    if(!isNaN(el.input)){
                        name += el.input
                    }else{
                        name += '"'+el.input+'"'
                    }

                    if(index < (condition.data.length-1)){
                        returnString += ' && '                
                        name += ' && '                
                    }
                })

                if(i < (el.conditions.length-1)){
                    returnString += ' || '                
                    name += ' || '               
                }
            })
            returnString += '}'
        }
        
        const reduxdataConditions = el.conditions.map((originEl)=>{
            originEl.ruleMode = 'normal'
            return originEl
        })

        el.conditions = reduxdataConditions
        currentElement.setProperty('conditionsequenceflow',returnString)
        currentElement.setProperty('reduxdata',el)

        if(currentElement.properties.defaultflow != 'true'){
            window.setPropertyAdvance({key:'oryx-name',value:name},currentElement)
        }
    })

    /* 遍历所有exclusiveGate 然后再遍历他们的sequenceflow */
    window.windowCanvas.getChildNodes().filter((el)=>{
        return el._stencil._jsonStencil.title == "Exclusive gateway"   
    })// theExclusiveGate  
    .forEach((el)=>{
        /*  update 空值不能提交 */
        /*  目前取消空值提交，空着也能提交 */
        el.outgoing.forEach((el2)=>{
            if(!el2.properties.defaultflow){ //不存在
                if(!el2.properties.conditionsequenceflow){ //也不存在
                    window.showAlert('保存失败，分支条件和规则不能为空')
                    canSave = false
                }
            }
        })
    })
    return canSave
}

window.updateBranch = () => {
    let canvas = window.windowCanvas
    /* 这个data是一个多层数组*/
    window.reduxStore.getState().branch.dataRepo.forEach((el,index)=>{ 
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        if(el.id && !currentElement){
            return ;
        }
        let name = ''
        if(el.radio){
            window.setPropertyAdvance({key:'oryx-name',value: el.text},currentElement)
        }else{
            el.conditions.forEach((condition,i)=>{
                let conditionArray  = []        
                condition.data.forEach((el,index)=>{
                    if(el.entry2.value != 'initial'){
                        name += el.entry2.text||''
                        name += ' '
                    }
                    if(el.entry3.value != 'initial'){
                        name += el.entry3.text||''
                        name += ' '                        
                    }

                    if(!isNaN(el.input)){
                        name += el.input
                    }else{
                        name += '"'+el.input+'"'
                    }

                    if(index < (condition.data.length-1)){
                        name += ' && '                
                    }
                })

                if(i < (el.conditions.length-1)){
                    name += ' || '               
                }
            })
        }
        if(currentElement.properties.defaultflow != 'true'){
            window.setPropertyAdvance({key:'oryx-name',value:name},currentElement)
        }
        // window.setPropertyAdvance({key:'oryx-name',value:name},currentElement)
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
        currentElement.setProperty('usertaskassignment',{"assignment": {"candidateOwners": [{"value":"${per}"}]}})
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
        if(!saveHandlerBranch(canvas)){
            activeSave()
            return 
        }
        saveHandlerBranchNode(canvas)
        
        /* 为空的限制条件 */
        if(window.globalEvent.checkEmpty($scope)){
            window.reduxStore.dispatch({type:'saveActive'})
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
            name: window.pidName
            // descriptionPrivate: 'flowMaster'
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
            headers: ACTIVITI.CONFIG.httpSaveHeaders,
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

