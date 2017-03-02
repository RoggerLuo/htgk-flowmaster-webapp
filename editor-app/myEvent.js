//currentSelectedShape 
window.activeSave = ()=>{
    window.reduxStore.dispatch({ type: 'saveActive'})
}
window.lastSelectedShape = false

var myEvent = function($scope){
    window.getJson = ()=>{
        var json = $scope.editor.getJSON();
        json = JSON.stringify(json);
        return json
    }
    
    $scope.lastSelectedUserTaskId = false
    $scope.propertyTpl = './editor-app/property-tpl/canvas.html';

    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_EXECUTE_COMMANDS, function(event) {
        window.activeSave()        
    })

    /*
        在redux里切换当前的元素id
    */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
        var selectedShape = event.elements.first()
        if(!selectedShape){return false}
        var prevId = $scope.lastSelectedUserTaskId
        var nextId = selectedShape.id

        window.currentSelectedShape = selectedShape
        window.reduxStore.dispatch({ type: 'switchElement', prevId, nextId })
        
        if (selectedShape.incoming[0]){
            let incomming = selectedShape.incoming[0]._stencil._jsonStencil.title
            if( incomming == 'Exclusive gateway'){
                window.reduxStore.dispatch({ type: 'initCondition' })
            }
        }
        let name = selectedShape._stencil._jsonStencil.title
        if( name == 'Mule task'){
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
                    var marker = jQuery(jqueryId)[0].children[0]
                    marker.style.fill = 'black'
                    marker.style.color = 'black'
                    marker.style.stroke = 'black'
                }
            }
        })()

        // 这段代码的目的是把userTask的边框颜色变回来
        if ($scope.lastSelectedUserTaskId ) {
            if(!jQuery('#' + $scope.lastSelectedUserTaskId)[0]){return false}
            jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[1].style.stroke = 'black'//'rgb(187, 187, 187)'
            jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[0] &&  (jQuery('#' + $scope.lastSelectedUserTaskId)[0].children[2].children[0].style.fill= 'black')
            $scope.lastSelectedUserTaskId = false
        }

        /* 放在后面，canvas是没有elements的，所以会一直触发false */
        var selectedShape = event.elements.first()
        if(!selectedShape){return false}
        window.lastSelectedShape = selectedShape

        /* 改变 正要选中 边框颜色的代码部分 */                
        if (selectedShape && (selectedShape._stencil._jsonStencil.title == 'User task' 
            || selectedShape._stencil._jsonStencil.title == 'Mule task'
            )) {
            //控制边框颜色的办法
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
            switch(selectedShape.outgoing[0]._stencil._jsonStencil.title){
                case 'User task':
                    window.nextElementIs = selectedShape.outgoing[0].properties['oryx-name']//+' (审批节点)';
                    break;
                case 'Exclusive gateway':
                    window.nextElementIs = selectedShape.outgoing[0].properties['oryx-name']//+' (分支节点)';
                    break;
                case '':
                break;
            }
        }
    })


    /* 
        mini router 
    */
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_SELECTION_CHANGED, function(event) {
        var selectedShape = event.elements.first()
        // if(!selectedShape){return false} // 后面判断了，不需要多此一举
        if (!selectedShape) {
            $scope.propertyTpl = './editor-app/property-tpl/canvas.html';
            return;/*罪魁祸首 。。。如果选中的是canvas我就把后面的事件全部屏蔽掉了 */
        }
        if (selectedShape.incoming[0] && selectedShape.incoming[0]._stencil._jsonStencil.title == 'Exclusive gateway') {
            $scope.propertyTpl = './editor-app/property-tpl/branchSequenceFlow.html';
        } else {
            switch (selectedShape._stencil._jsonStencil.title) {
                case 'User task':
                    $scope.propertyTpl = './editor-app/property-tpl/approve.html';
                    break;
                case 'Mule task':
                    $scope.propertyTpl = './editor-app/property-tpl/parallelApprove.html';
                    break;
                case 'Sequence flow':
                    $scope.propertyTpl = './editor-app/property-tpl/sequenceFlow.html';
                    break;
                default:
                    $scope.propertyTpl = './editor-app/property-tpl/canvas.html';
                    break;
            }
        }
        if(saveButton.flag){ //必须在页面tpl加载之后才加载
            saveButton.render()
            saveButton.flag = false
        }
    })
}

