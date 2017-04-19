//currentSelectedShape 
window.activeSave = ()=>{
    window.reduxStore.dispatch({ type: 'saveActive'})
}
window.lastSelectedShape = false
window.canvasFlag = false
window.lastSelectedItem = false
// window.globalHost = 'localhost:9001'
window.globalHost = '172.16.1.178:9001'
window.pidName = 'pidName'
window.getQueryString = (name)=> { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); return null; 
} 


/* 构造#的pat */
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

    window.afterElementSelected = ($scope,event)=>{
        
        window.globalEvent.router($scope,event)
            
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
}

