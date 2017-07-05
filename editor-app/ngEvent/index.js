'use strict';
import './save'
import './checkEmpty'
import './router'
const checkConnect = ($scope) => {
    const json = window.getRawJson()
    return !json.childShapes.some((el,index)=>{
        if(el.outgoing.length == 0){
            if(el.stencil.id != 'EndNoneEvent' && el.stencil.id != 'EndErrorEvent'){
                //window.showAlert('请连接上所有的节点')
                // isOK = false
                return true
            }
        }
        switch(el.stencil.id){
            case 'StartNoneEvent':
                if(el.outgoing.length == 0){
                    // isOK = false
                    // window.showAlert('请连接上开始节点')
                    // returnValue = true
                    return true
                }
            break
        }
        return false
    })
}

window.activeSave = ()=>{
    /*
        saveHandler也会调用activeSave
        这会导致，最外层的逻辑还没跑完，全局变量showAlertDisable就回归false了
        这是全局变量混乱的地方
        增加一个逻辑判断,如果发现 全局变量showAlertDisable 已经被使用了，那这一轮逻辑就不要动它
    */
    // if(window.showAlertDisable){
    //     const canvas = window.windowCanvas
    //     saveHandlerApprove(canvas)
    //     saveHandlerParallel(canvas)
    //     saveHandlerEndPoint(canvas)
    //     if(!saveHandlerBranch(canvas)){}
    //     saveHandlerBranchNode(canvas)
    //     if(checkConnect()){
    //         window.reduxStore.dispatch({ type: 'saveActive'})
    //     }else{
    //         window.reduxStore.dispatch({ type: 'saveDeactive'})
    //     }
    //     window.localDesignData.save(window.getQueryString("pid"),window.getRawJson())
    //     return ;
    // }
    // window.showAlertDisable = true
    // /* 提前把redux转换成oryx数据 */
    // const canvas = window.windowCanvas
    // saveHandlerApprove(canvas)
    // saveHandlerParallel(canvas)
    // saveHandlerEndPoint(canvas)
    // if(!saveHandlerBranch(canvas)){}
    // saveHandlerBranchNode(canvas)
    // if(checkConnect()){
    //     window.reduxStore.dispatch({ type: 'saveActive'})
    // }else{
    //     window.reduxStore.dispatch({ type: 'saveDeactive'})
    // }
    // window.localDesignData.save(window.getQueryString("pid"),window.getRawJson())
    // window.showAlertDisable = false

    window.reduxStore.dispatch({ type: 'saveActive'})
}

window.lastSelectedShape = false
window.canvasFlag = false
window.lastSelectedItem = false
// window.globalHost = 'localhost:9001'
window.pidName = 'pidName'

/*
     每次move都压入 localstorage
     保存 清空key
    
    读取的时候 判断key是否存在，存在就读取localstorage     
*/
window.localDesignData={}
window.localDesignData.read=(pid)=>{
    if(localStorage.getItem(pid) !== "undefined"){
        return JSON.parse(localStorage.getItem(pid))
    }
    return ''
}
window.localDesignData.save=(pid,obj)=>{
    localStorage.setItem(pid,JSON.stringify(obj))
}
window.localDesignData.clear=(pid)=>{
    localStorage.removeItem(pid)
}

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


window.myEvent = function($scope,$http){
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
        /* 画布加载以后，把sequenceflow设置为true */
        window.reduxStore.getState().branchNode.repo.forEach((el)=>{
            let currentElement = window.windowCanvas.getChildShapeByResourceId(el.choosed.value)
            window.setPropertyAdvance({key:'defaultflow',value:'true'},currentElement)
        })

        /* 保存事件deactive */
        const saveEvent = {
            type: KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED,
            model: '',
            modelId: window.getQueryString("pid"),
            eventType: 'update-model'
        }
        KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED, saveEvent)
        window.reduxStore.dispatch({type:'saveDeactive'})   
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
                if(el.outgoing[0]){
                    return {
                        branchResourceId:el.resourceId,
                        name: el.outgoing[0].properties['oryx-name']||"未命名分支"
                    }                    
                }else{
                    return false
                }
            }).filter((el)=>!!el)
            branchObj.unshift({branchResourceId:selectedShape.resourceId,name:'请选择'}) //这里的select是为了后面的黑魔法做准备的，如果 text为“请选择”则读取value来获取exclusiveGate
            
            const reduxObj = {
                resourceId:selectedShape.resourceId,
                data:branchObj,
            }
            
            if(reduxObj.data.length){
                /* 要放在switchElement后面，不然会顺序会出问题，元素id还没更新 */
                window.reduxStore.dispatch({ type: 'branchNodeOptionDataUpdate',data:reduxObj})
            }
        }
        
        /* 判断:如果当前选择项的sequenceflow不存在则改成请选择 */
        let theRepo = window.reduxStore.getState().branchNode.repo.filter((el)=>el.resourceId == selectedShape.resourceId)
        theRepo = theRepo[0] || false
        if(theRepo){
            if(theRepo.choosed.value){
                let sequenceflow = window.windowCanvas.getChildShapeByResourceId(theRepo.choosed.value)
                if(sequenceflow === undefined){

                    /* 为什么控制台没有输出这个redux action事件，调试了好久...这 */
                    window.reduxStore.dispatch({ type: 'branchNodeDropdownChoose',item:{text:'请选择',value:'请选择'}})
                }
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
            if(jQuery('#' + $scope.lastSelectedUserTaskId)[0] && jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[1] && jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[3]){

                // console.log(jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[1])
                // console.log(jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[0])
                // console.log(jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[3].children[0])

               jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[1].style.stroke = 'black'//'rgb(187, 187, 187)'
               jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[0] &&  (jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[0].style.fill= 'black')
               if(jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[1] ){
                    jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[1].style.fill= 'black'
               }
               if(jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[2] ){
                    jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[2].style.fill= 'black'
               }
               jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[3].children[0].style.fill = 'black' 
               $scope.lastSelectedUserTaskId = false
            }

            if(jQuery('#' + $scope.lastSelectedUserTaskId)[0] && jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[0]){
                jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[0].style.stroke = 'black'
                // jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[0].style.strokeWidth = 2                
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
            || selectedShape._stencil._jsonStencil.title == 'Exclusive gateway'
            )) {
            //控制边框颜色的办法
            // jQuery('#' + selectedShape.id)[0].children[3].children[0].style.fill = '#00b0ff' 
            jQuery('#' + selectedShape.id)[0].children[1].style.stroke = '#00b0ff' 
            // jQuery('#' + selectedShape.id)[0].children[2].children[0] && (jQuery('#' + selectedShape.id)[0].children[2].children[0].style.fill= '#00b0ff')
            
            // if(jQuery('#' + selectedShape.id)[0].children[2].children[1]){
            //     jQuery('#' + selectedShape.id)[0].children[2].children[1].style.fill= '#00b0ff'
            // }
            // if(jQuery('#' + selectedShape.id)[0].children[2].children[2]){
            //     jQuery('#' + selectedShape.id)[0].children[2].children[2].style.fill= '#00b0ff'
            // }
            $scope.lastSelectedUserTaskId = selectedShape.id
        }
        if (selectedShape && (selectedShape._stencil._jsonStencil.title == 'Exclusive gateway')){
            jQuery('#' + selectedShape.id)[0].children[0].style.stroke = '#00b0ff'
            // jQuery('#' + selectedShape.id)[0].children[0].style.strokeWidth = 2
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
            window.reduxStore.dispatch({type:'nextElOfSF',name:selectedShape.outgoing[0] && selectedShape.outgoing[0].properties['oryx-name']||"暂无"})

            if(!selectedShape.outgoing[0]){
                return false
            }
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
