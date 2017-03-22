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
    // $scope.selectedShape
    if($scope.selectedItem.title==''){
        /* 自动命名 */
        const giveName = (cate) => {
            const mapArr={
                "Start event":"StartNoneEvent",
                "End event":"EndNoneEvent",
                "Sequence flow":"SequenceFlow",
                "User task":"UserTask",
                "Exclusive gateway":"ExclusiveGateway",
                "End error event":"EndErrorEvent",
                "Mule task":"MuleTask"
            }
            cate  = mapArr[cate]
            const json = window.getRawJson()        

            /* 计算此类有多少个 */
            let num = json.childShapes.filter((el2,index2)=>{
                return el2.stencil.id==cate
            }).length
            return cate + num
        }
        $scope.selectedItem.title = giveName($scope.selectedItem.jsonStencilTitle)
        $scope.updatePropertyInModel({ key: 'oryx-name', value: $scope.selectedItem.title })
        window.activeSave()
        console.log($scope.selectedItem.title)
        // debugger
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

            /* 如果是新建 怎么办 */

            if($scope.selectedItem.title == '') { //
                // window.reduxStore.dispatch({type:'callAlert',alertContent:'节点名称不能为空'})
                // window.reduxStore.dispatch({type:'hideAlertAnimation'})
                // setTimeout(function(){
                //     window.reduxStore.dispatch({type:'hideAlert'})
                // },1000)
                window.showAlert()
                $scope.selectedItem.title = window.currentSelectedShape.properties['oryx-name']
                return ;
            }
            if ($scope.selectedItem.title) {
                $scope.selectedItem.title = $scope.selectedItem.title.replace(/(<([^>]+)>)/ig, "");
            }
            if (window.currentSelectedShape.properties['oryx-name'] != $scope.selectedItem.title) {
                $scope.updatePropertyInModel({ key: 'oryx-name', value: $scope.selectedItem.title })
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
