'use strict';
fm.ui = {}
fm.ui.lastShape = false
export default function(shape,$scope){
    /* 箭头 变回黑色 */
    (function(){
        if(fm.ui.lastShape){
            if (fm.ui.lastShape && (fm.getTitle(fm.ui.lastShape) === 'Sequence flow' )){
                fm.ui.lastShape.node.children[0].children[0].children[0].children[0].style.stroke = 'black'
                var elementId = fm.ui.lastShape.node.children[0].children[0].children[0].children[0].getAttribute('marker-end')
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
    if(!shape){
        return false
    }
    fm.ui.lastShape = shape

    /* 改变 正要选中 边框颜色的代码部分 */   
    const title = fm.getTitle(shape)
    if  (
        title == 'User task' ||
        title == 'Multi user task'||
        title == 'Exclusive gateway' ||
        title == 'Manual task'
    ){
        //控制边框颜色的办法
        // jQuery('#' + shape.id)[0].children[1].style.stroke = '#00b0ff' 
        $scope.lastSelectedUserTaskId = shape.id
    }
    if (title === 'Exclusive gateway'){
        // jQuery('#' + shape.id)[0].children[0].style.stroke = '#00b0ff'
    }


    /* 箭头 变蓝色 */
    if (title === 'Sequence flow' ){
        shape.node.children[0].children[0].children[0].children[0].style.stroke = '#00b0ff'

        /* 箭头是一个叫marker的元素，需要从一个属性中获取id */
        var elementId = shape.node.children[0].children[0].children[0].children[0].getAttribute('marker-end')
        var jqueryId = elementId.substr(4,elementId.length -5)
        var marker = jQuery(jqueryId)[0].children[0]
        marker.style.fill = '#00b0ff'
        marker.style.color = '#00b0ff'
        marker.style.stroke = '#00b0ff'
    }
}
