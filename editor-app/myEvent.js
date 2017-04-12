//currentSelectedShape 
window.activeSave = ()=>{
    window.reduxStore.dispatch({ type: 'saveActive'})
}
window.lastSelectedShape = false
window.canvasFlag = false
window.lastSelectedItem = false
window.globalHost = '172.16.1.178:9001'
window.pidName = 'pidName'
window.getQueryString = (name)=> { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 

/* 判断是否重名 直接循环所有的 */
const isRepeated = (name) => {
    const json = window.getRawJson()        
    return json.childShapes.some((el,index)=>{
        return el.properties.name==name
    })            
}

/* 自动命名 */
const giveName = (cate) => {
    const mapArr={
        "Start event":"StartNoneEvent",
        "End event":"EndNoneEvent",
        "Sequence flow":"SequenceFlow",
        "User task":"UserTask",
        "Exclusive gateway":"ExclusiveGateway",
        "End error event":"EndErrorEvent",
        "Multi user task":"MultiUserTask"
    }
    const mapArrCN={
        "Start event":"开始",
        "End event":"结束",
        "Sequence flow":"连线",
        "User task":"审批",
        "Exclusive gateway":"分支",
        "End error event":"异常结束",
        "Multi user task":"会签"
    }
    // cate  = mapArr[cate]
    const json = window.getRawJson()        

    /* 计算此类有多少个 */
    // let num = json.childShapes.filter((el2,index2)=>{
    //     return el2.stencil.id==cate
    // }).length
    let num = 1
    let name = mapArrCN[cate] + num
    while(isRepeated(name)){
        num = num + 1 
        name = mapArrCN[cate] + num
    }
    return name
}

var myEvent = function($scope,$http){

    window.getJson = ()=>{
        var json = $scope.editor.getJSON();
        json = JSON.stringify(json);
        return json
    }

    window.getRawJson = ()=>{
        var json = $scope.editor.getJSON();
        return json
    }
    

    $scope.lastSelectedUserTaskId = false
    $scope.propertyTpl = './editor-app/property-tpl/canvas.html';

    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, function(event) {
        window.activeSave()        
    })
    
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {

    })



    /*
        在redux里切换当前的元素id
    */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
        var selectedShape = event.elements.first()
        if(!selectedShape){return false}
        
        var prevId = $scope.lastSelectedUserTaskId
        var nextId = selectedShape.resourceId


        window.currentSelectedShape = selectedShape
        window.reduxStore.dispatch({ type: 'switchElement', prevId, nextId })
        
        if (selectedShape.incoming[0]){
            let incomming = selectedShape.incoming[0]._stencil._jsonStencil.title
            if( incomming == 'Exclusive gateway'){
                window.reduxStore.dispatch({ type: 'initCondition' })
            }
        }
        let name = selectedShape._stencil._jsonStencil.title
        if( name == 'Multi user task'){
            window.reduxStore.dispatch({ type: 'parallelInit' })
        }
    })


    /* ----UI color change ----*/
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
        
        /* 箭头 变回黑色 */
        (function(){
            if(window.lastSelectedShape){
                if (lastSelectedShape && (lastSelectedShape._stencil._jsonStencil.title == 'Sequence flow' )){
                    lastSelectedShape.node.children[0].children[0].children[0].children[0].style.stroke = 'black'
                    var elementId = lastSelectedShape.node.children[0].children[0].children[0].children[0].getAttribute('marker-end')
                    var jqueryId = elementId.substr(4,elementId.length -5)
                    if(jQuery(jqueryId)[0]){
                        var marker = jQuery(jqueryId)[0].children[0]
                        marker.style.fill = 'black'
                        marker.style.color = 'black'
                        marker.style.stroke = 'black'
                    }
                }
            }
        })()

        // 这段代码的目的是把userTask的边框颜色变回来
        if ($scope.lastSelectedUserTaskId ) {
            if(jQuery('#' + $scope.lastSelectedUserTaskId)[0]){
               jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[1].style.stroke = 'black'//'rgb(187, 187, 187)'
               jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[0] &&  (jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[0].style.fill= 'black')
               jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[3].children[0].style.fill = 'black' 
               $scope.lastSelectedUserTaskId = false
            }
        }

        /* 放在后面，canvas是没有elements的，所以会一直触发false */
        var selectedShape = event.elements.first()
        if(!selectedShape){
            return false
        }
        window.lastSelectedShape = selectedShape

        /* 改变 正要选中 边框颜色的代码部分 */   
        if (selectedShape && (selectedShape._stencil._jsonStencil.title == 'User task' 
            || selectedShape._stencil._jsonStencil.title == 'Multi user task'
            )) {
            //控制边框颜色的办法
            jQuery('#' + selectedShape.id)[0].children[3].children[0].style.fill = '#00b0ff' 
            jQuery('#' + selectedShape.id)[0].children[1].style.stroke = '#00b0ff' //'rgb(0,176,255)'
            jQuery('#' + selectedShape.id)[0].children[2].children[0] && (jQuery('#' + selectedShape.id)[0].children[2].children[0].style.fill= '#00b0ff')
            $scope.lastSelectedUserTaskId = selectedShape.id
        }

        /* 箭头 变蓝色 */
        if (selectedShape && (selectedShape._stencil._jsonStencil.title == 'Sequence flow' )){
            selectedShape.node.children[0].children[0].children[0].children[0].style.stroke = '#00b0ff'

            /* 箭头是一个叫marker的元素，需要从一个属性中获取id */
            var elementId = selectedShape.node.children[0].children[0].children[0].children[0].getAttribute('marker-end')
            var jqueryId = elementId.substr(4,elementId.length -5)
            var marker = jQuery(jqueryId)[0].children[0]
            marker.style.fill = '#00b0ff'
            marker.style.color = '#00b0ff'
            marker.style.stroke = '#00b0ff'
        }
    })

    /*
        为了 sequence flow 能显示 下一个节点
    */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
        var selectedShape = event.elements.first()
        if(!selectedShape){return false}
        if (selectedShape._stencil._jsonStencil.title != 'Sequence flow') {
            return false;
        }
        if (selectedShape.incoming[0] && selectedShape.incoming[0]._stencil._jsonStencil.title){
            if(!selectedShape.outgoing[0]){return false}
                window.nextElementIs = selectedShape.outgoing[0].properties['oryx-name']//+' (审批节点)';
                // switch(selectedShape.outgoing[0]._stencil._jsonStencil.title){
                //     case 'User task':
                //         window.nextElementIs = selectedShape.outgoing[0].properties['oryx-name']//+' (审批节点)';
                //         break;
                //     case 'Exclusive gateway':
                //         window.nextElementIs = selectedShape.outgoing[0].properties['oryx-name']//+' (分支节点)';
                //         break;
                //     case '':
                //     break;
                // }
        }
    })

   
    /* 
        mini router 
    */
    const miniRouter = ($scope,event)=>{
        var selectedShape = event.elements.first()
        if (!selectedShape) {
            $scope.propertyTpl = './editor-app/property-tpl/canvas.html';
            window.isThisCanvas = true        
            return;/*罪魁祸首 。。。如果选中的是canvas我就把后面的事件全部屏蔽掉了 */
        }
        window.isThisCanvas = false     
        
        if(selectedShape.properties["oryx-name"]==''){
            $scope.updatePropertyInModel({ key: 'oryx-name', value: giveName(selectedShape._stencil._jsonStencil.title)})
            window.activeSave()
        }

        if (selectedShape.incoming[0] && selectedShape.incoming[0]._stencil._jsonStencil.title == 'Exclusive gateway') {
            $scope.propertyTpl = './editor-app/property-tpl/branchSequenceFlow.html';
        } else {

            switch (selectedShape._stencil._jsonStencil.title) {
                case 'User task':
                    $scope.propertyTpl = './editor-app/property-tpl/approve.html';
                    break;
                case 'Multi user task':
                    $scope.propertyTpl = './editor-app/property-tpl/parallelApprove.html';
                    break;
                case 'Sequence flow':
                    $scope.propertyTpl = './editor-app/property-tpl/sequenceFlow.html';
                    break;
                case 'End error event':
                    $scope.propertyTpl = './editor-app/property-tpl/errorNotify.html';
                    break;
                case 'End event':
                    $scope.propertyTpl = './editor-app/property-tpl/notify.html';
                    break;
                case 'Start event':
                    $scope.propertyTpl = './editor-app/property-tpl/start.html';
                    break;
                case 'Exclusive gateway':
                    $scope.propertyTpl = './editor-app/property-tpl/exclusive.html';
                    break;
                default:
                    $scope.propertyTpl = './editor-app/property-tpl/canvas.html';
                    break;
            }
        }
    }
    window.afterElementSelected = ($scope,event)=>{
        
        miniRouter($scope,event)
            
        if(saveButton.flag){ //必须在页面tpl加载之后才加载
            saveButton.render()
            saveButton.flag = false
        }
        console.log('window.isThisCanvas:'+window.isThisCanvas)
        if(!window.isThisCanvas){
            window.inputBlurred && window.inputBlurred('canvas')            
        }else{
            window.inputBlurred && window.inputBlurred()    
        }
    }

    const checkEmpty = () => {
        let returnValue = false
        var json = $scope.editor.getJSON();
        json.childShapes.forEach((el,index)=>{
            switch(el.stencil.id){
                case 'UserTask':
                    if(!el.properties.usertaskassignment){
                        window.showAlert('审批节点内容不能为空')
                        returnValue = true
                        return ;
                    }

                    if(el.properties.usertaskassignment && el.properties.usertaskassignment.assignment && (el.properties.usertaskassignment.assignment.candidateOwners.length == 0)){
                        window.showAlert('审批节点内容不能为空')
                        returnValue = true
                    }

                break

                case 'MultiUserTask':
                    if(!el.properties.multiinstance_participants){
                        window.showAlert('会签节点内容不能为空')
                        returnValue = true
                        return ;
                    }

                    if(el.properties.multiinstance_participants.length == 0){
                        window.showAlert('会签节点内容不能为空')
                        returnValue = true
                    }

                    if((el.properties.multiinstance_participants.length == 1)&&(el.properties.multiinstance_participants[0] == 0)){
                        window.showAlert('会签节点内容不能为空')
                        returnValue = true
                    }

                break
            }
        })
        return returnValue
    }

    window.saveModel = function (callback) {
        
        /* 提前把redux转换成oryx数据 */
        window.saveHandlerApprove()
        window.saveHandlerEndPoint()
        window.saveHandlerParallel()
        window.saveHandlerBranch()
        
        /* 为空的限制条件 */
        if(checkEmpty()){
            return ;
        }

        /* 等待动画 */
        window.reduxStore.dispatch({type:'callSpin'})


        var json = $scope.editor.getJSON();
        json.properties.process_id = window.getQueryString("pid")
        // debugger
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
            // console.log(transformRequest(params))
            // console.log($scope.editor.getJSON())
            console.log(json)
            callback()
        })
        .error(function (data, status, headers, config) {
            $scope.error = {};
            console.log('Something went wrong when updating the process model:' + JSON.stringify(data));
        });
    };

}

