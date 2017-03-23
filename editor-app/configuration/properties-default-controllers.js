/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
 * String controller
 */

 // /* 判断是否重名 直接循环所有的 */
 // const isRepeated = (name) => {
 //     const json = window.getRawJson()        
 //     return json.childShapes.some((el,index)=>{
 //         return el.properties.name==name
 //     })            
 // }

 // /* 自动命名 */
 // const giveName = (cate) => {
 //     const mapArr={
 //         "Start event":"StartNoneEvent",
 //         "End event":"EndNoneEvent",
 //         "Sequence flow":"SequenceFlow",
 //         "User task":"UserTask",
 //         "Exclusive gateway":"ExclusiveGateway",
 //         "End error event":"EndErrorEvent",
 //         "Mule task":"MuleTask"
 //     }
 //     const mapArrCN={
 //         "Start event":"开始",
 //         "End event":"结束",
 //         "Sequence flow":"连线",
 //         "User task":"审批",
 //         "Exclusive gateway":"分支",
 //         "End error event":"异常结束",
 //         "Mule task":"会签"
 //     }
 //     // cate  = mapArr[cate]
 //     const json = window.getRawJson()        

 //     /* 计算此类有多少个 */
 //     // let num = json.childShapes.filter((el2,index2)=>{
 //     //     return el2.stencil.id==cate
 //     // }).length
 //     let num = 1
 //     let name = mapArrCN[cate] + num
 //     while(isRepeated(name)){
 //         num = num + 1 
 //         name = mapArrCN[cate] + num
 //     }
 //     return name
 // }

 

var sequenceFlowPropertyCtrl = ['$scope', function($scope) {
    //这里可以抓到id，嵌入react
    // parallelApproveComponent.render()

}];
var branchSequenceFlowPropertyCtrl = ['$scope', function($scope) {
    //这里可以抓到id，嵌入react
    branchSequenceFlowComponent.render()
}];

var parallelApprovePropertyCtrl = ['$scope', function($scope) {
    //这里可以抓到id，嵌入react
    parallelApproveComponent.render()
        // $scope.testAddUser = function() {
        //     $scope.updatePropertyInModel({ key: 'parallelApprove', value: ['测试添加审批人1','测试添加审批人2'] });
        //     console.log('updatePropertyInModel,parallelApprove person');
        // }
}];

var approvePropertyCtrl = ['$scope', function($scope) {
    //这里可以抓到id，嵌入react
    approveComponent.render()
        // $scope.testAddUser = function() {
        //     $scope.updatePropertyInModel({ key: 'approve', value: ['测试添加审批人1','测试添加审批人2'] });
        //     console.log('updatePropertyInModel,approve person');
        // }
}];

var canvasPropertyCtrl = ['$scope', function($scope) {
    $scope.testAddUser = function() {
        $scope.updatePropertyInModel({ key: 'approve', value: '测试添加审批人' });
        console.log('updatePropertyInModel,approve person');
    }
}];

var namePropertyCtrl = ['$scope', '$timeout', function($scope, $timeout) {
    if($scope.selectedItem.title==''){
        $scope.selectedItem.title = giveName($scope.selectedItem.jsonStencilTitle)
        $scope.updatePropertyInModel({ key: 'oryx-name', value: $scope.selectedItem.title })
        window.activeSave()
    }
    $scope.namePropertyClicked = function() {
        window.namePropertyClicked = true
        $scope.shapeId = $scope.selectedShape.id;
        $scope.valueFlushed = false;
        /** Handler called when input field is blurred */
        /* 如果是直接切换item 则是每次都是空字符，这时候不能保存，如果保存则会用null string覆盖本来的名字 */
        /* 所以要分开时切换item的情况 和 不是切换的情况 */
        
        $scope.inputBlurred = function(enter) {//enter为true则是切换，空字串不保存
            if(!window.namePropertyClicked){
                return ;
            }
            window.namePropertyClicked = false

            $scope.valueFlushed = true;
            if(enter == 'canvas') {
                return ;
            }

            const mySelectedItem = window.lastSelectedItem
            if(!mySelectedItem){return ;}

            if(mySelectedItem.title == '') { //
                window.showAlert('节点名称不能为空')
                mySelectedItem.title = window.currentSelectedShape.properties['oryx-name']
                return ;
            }
            

            if (window.currentSelectedShape.properties['oryx-name'] != mySelectedItem.title) {
                /* 如果节点名称变更，才判断是否重复   因为不变更肯定与当前自己的名称重复 */
                if(isRepeated(mySelectedItem.title)){
                    window.showAlert('节点名称重复')
                    mySelectedItem.title = window.currentSelectedShape.properties['oryx-name']
                    return ;
                }                
            }

            if (mySelectedItem.title) {
                mySelectedItem.title = mySelectedItem.title.replace(/(<([^>]+)>)/ig, "");
            }
            if (window.currentSelectedShape.properties['oryx-name'] != mySelectedItem.title) {
                $scope.updatePropertyInModel({ key: 'oryx-name', value: mySelectedItem.title })
                window.activeSave()
            }
        }
        /* 一定是要先编辑了，鼠标点了，才能blur */
        window.inputBlurred = $scope.inputBlurred
        $scope.enterPressed = function(keyEvent) {

            if (keyEvent && keyEvent.which === 13) {
                keyEvent.preventDefault();
                // keyEvent.target.blur();
                $scope.inputBlurred(); // we want to do the same as if the user would blur the input field
            }
            // else{
                window.namePropertyClicked = true
            // }
        };

        $scope.$on('$destroy', function controllerDestroyed() {
            if (!$scope.valueFlushed) {
                if ($scope.selectedItem.title) {
                    $scope.selectedItem.title = $scope.selectedItem.title.replace(/(<([^>]+)>)/ig, "");
                }
                $scope.updatePropertyInModel({ key: 'oryx-name', value: $scope.selectedItem.title }, $scope.shapeId);
            }
        });
    }
}];

var KisBpmStringPropertyCtrl = ['$scope', function($scope) {
    $scope.shapeId = $scope.selectedShape.id;
    $scope.valueFlushed = false;
    /** Handler called when input field is blurred */
    $scope.inputBlurred = function() {
        $scope.valueFlushed = true;
        if ($scope.property.value) {
            $scope.property.value = $scope.property.value.replace(/(<([^>]+)>)/ig, "");
        }

        $scope.updatePropertyInModel($scope.property);
    };

    $scope.enterPressed = function(keyEvent) {
        if (keyEvent && keyEvent.which === 13) {
            keyEvent.preventDefault();
            $scope.inputBlurred(); // we want to do the same as if the user would blur the input field
        }
    };

    $scope.$on('$destroy', function controllerDestroyed() {
        if (!$scope.valueFlushed) {
            if ($scope.property.value) {
                $scope.property.value = $scope.property.value.replace(/(<([^>]+)>)/ig, "");
            }
            $scope.updatePropertyInModel($scope.property, $scope.shapeId);
        }
    });
}];

/*
 * Boolean controller
 */

var KisBpmBooleanPropertyCtrl = ['$scope', function($scope) {

    $scope.changeValue = function() {
        if ($scope.property.key === 'oryx-defaultflow' && $scope.property.value) {
            var selectedShape = $scope.selectedShape;
            if (selectedShape) {
                var incomingNodes = selectedShape.getIncomingShapes();
                if (incomingNodes && incomingNodes.length > 0) {
                    // get first node, since there can be only one for a sequence flow
                    var rootNode = incomingNodes[0];
                    var flows = rootNode.getOutgoingShapes();
                    if (flows && flows.length > 1) {
                        // in case there are more flows, check if another flow is already defined as default
                        for (var i = 0; i < flows.length; i++) {
                            if (flows[i].resourceId != selectedShape.resourceId) {
                                var defaultFlowProp = flows[i].properties['oryx-defaultflow'];
                                if (defaultFlowProp) {
                                    flows[i].setProperty('oryx-defaultflow', false, true);
                                }
                            }
                        }
                    }
                }
            }
        }
        $scope.updatePropertyInModel($scope.property);
    };

}];

/*
 * Text controller
 */

var KisBpmTextPropertyCtrl = ['$scope', '$modal', function($scope, $modal) {

    var opts = {
        template: 'editor-app/configuration/properties/text-popup.html?version=' + Date.now(),
        scope: $scope
    };

    // Open the dialog
    $modal(opts);
}];

var KisBpmTextPropertyPopupCtrl = ['$scope', function($scope) {

    $scope.save = function() {
        $scope.updatePropertyInModel($scope.property);
        $scope.close();
    };

    $scope.close = function() {
        $scope.property.mode = 'read';
        $scope.$hide();
    };
}];
