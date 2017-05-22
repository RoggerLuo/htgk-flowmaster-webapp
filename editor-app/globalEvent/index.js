'use strict';

//currentSelectedShape 
window.activeSave = ()=>{
    window.reduxStore.dispatch({ type: 'saveActive'})
}
window.lastSelectedShape = false
window.canvasFlag = false
window.lastSelectedItem = false
// window.globalHost = 'localhost:9001'
window.pidName = 'pidName'



/* 和vue部分的阴影遮罩一致 */
const shadowCallback = (e) => {
    window.removeEventListener("message",shadowCallback, false)
}
window.callShadow = () => {
    window.addEventListener('message',shadowCallback,false)
    let message = {type:"openShadow"}
    window.parent.postMessage(message,'*')
}


/* 和vue部分的阴影遮罩一致 */
const hideShadowCallback = (e) => {
    window.removeEventListener("message",hideShadowCallback, false)
}
window.hideShadow = () => {
    window.addEventListener('message',hideShadowCallback,false)
    let message = {type:"closeShadow"}
    window.parent.postMessage(message,'*')
}





window.getQueryString = (name)=> { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 

const checkIfModified=(e)=>{
    if(e.data.type == 'checkIfModified'){
        const isActive = window.reduxStore.getState().common.active //true就是修改了，false就是没修改
        const message = {type:"checkIfModified",value:isActive}
        window.parent.postMessage(message,'*')   
    }
    // window.removeEventListener("message",checkIfModified, false)
}
window.addEventListener('message',checkIfModified,false)



/* 构造#的pattern */
const regFactor = (options,color) => {
    color = color || 'red'
    let pattern1 = ''
    let odd = ''
    let even = ''
    options.forEach((el,index)=>{
        if(index>0){
            pattern1 += '|([^>])('+ el + ")"
        }else{
            pattern1 += '([^>])('+ el + ")"
        }
    })
    let number = options.length*2
    for (var i = 1; i <= number; i++) {
        if(i%2 =='0'){
            even += '$'+i
        }else{
            odd += '$'+i
        }
    }
    const replace = odd+"&nbsp;<span style='color:"+color+";'>"+even+"</span>&nbsp;"
    const regular = new RegExp(pattern1,"gi"); //注意，反斜杠需要转义
    return {replace,regular}
}
const moveCursorToEnd = (obj)=>{
    var sel = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(obj);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}




var myEvent = function($scope,$http){
    window.windowCanvas = $scope.editor.getCanvas() //拿到canvas

    window.globalEvent =  window.globalEvent || {}
    window.saveModel = window.globalEvent.save($scope,$http)


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

    /* 每次改变都激活保存 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, function(event) {
        window.activeSave()        
    })




    /* 画布加载完成以后的事件 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, function(event) {

        /* 画布加载以后 */

        window.reduxStore.getState().branchNode.repo.forEach((el)=>{
            let currentElement = window.windowCanvas.getChildShapeByResourceId(el.choosed.value)
            window.setPropertyAdvance({key:'defaultflow',value:'true'},currentElement)

        })
       
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



    /* branchNode的angular逻辑内容 */
    /* 每次点击branchNode重新计算 */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
        
        var selectedShape = event.elements.first()
        if(!selectedShape){return false}
        let name = selectedShape._stencil._jsonStencil.title
        
        const canvas = $scope.editor.getCanvas() //拿到canvas
        if( name == 'Exclusive gateway'){
            let branchObj = selectedShape.outgoing.map((el)=>{
                return {
                    branchResourceId:el.resourceId,
                    name:el.outgoing[0].properties['oryx-name']||"未命名分支"
                }
            })
            branchObj.unshift({branchResourceId:selectedShape.resourceId,name:'请选择'})
            
            const reduxObj = {
                resourceId:selectedShape.resourceId,
                data:branchObj,
                choosed:{text:'请选择',value:false}
            }
            
            if(reduxObj.data.length){
                /* 要放在switchElement后面，不然会顺序会出问题，元素id还没更新 */
                window.reduxStore.dispatch({ type: 'branchNodeDataUpdate',data:reduxObj})
            }
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
        }
    })
    window.beforeShapeUpdate = ($scope,event)=>{
        if(saveButton.flag){ //必须在页面tpl加载之后才加载
            saveButton.render()
            saveButton.flag = false
        }
        window.inputBlurred && window.inputBlurred()            
    }
    window.afterShapeUpdate = ($scope,event)=>{
        window.globalEvent.router($scope,event)       
    }
}


/*

*/
