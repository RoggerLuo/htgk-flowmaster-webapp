function giveName_ifNotSf_and_ifNoName(shape){
    if (shape.title == '') { 
        if (shape.jsonStencilTitle != 'Sequence flow') {
            shape.title = giveName(shape.jsonStencilTitle)
            global.updatePropertyInModel({ key: 'oryx-name', value: shape.title })
            rdx.save()
        }
    }        
}

fm.namePropertyCtrl = function($scope, $timeout) {
    //controller 启用的时候，初始化的时候
    const shape = $scope.selectedItem
    giveName_ifNotSf_and_ifNoName(shape)

    const blurImplementation = (enter) => {
        //如果没有初始化,那么切换到时候就不要保存,不然会保存成空白
        if (!fm.namePropertyClicked) return

        fm.namePropertyClicked = false //重新上锁

        const mySelectedItem = window.lastSelectedItem
        if (!mySelectedItem) return

        if (mySelectedItem.title == '') {
            window.showAlert('节点名称不能为空')
            mySelectedItem.title = window.currentSelectedShape.properties['oryx-name']
            return
        }

        if (window.currentSelectedShape.properties['oryx-name'] != mySelectedItem.title) {
            
            /* 如果节点名称变更，才判断是否重复   因为不变更肯定与当前自己的名称重复 */
            
            /*if (isRepeated(mySelectedItem.title)) {
                window.showAlert('节点名称已重复，请重新修改再保存。')
                mySelectedItem.title = window.currentSelectedShape.properties['oryx-name']
                return
            }*/

        }

        if (mySelectedItem.title) {
            mySelectedItem.title = mySelectedItem.title.replace(/(<([^>]+)>)/ig, "");
        }
        if (window.currentSelectedShape.properties['oryx-name'] != mySelectedItem.title) {
            $scope.updatePropertyInModel({ key: 'oryx-name', value: mySelectedItem.title })
            window.activeSave()
        }
    }
    $scope.onchangeEqualClick = () => {
        fm.namePropertyClicked = true
        // if(!window.inputBlurred){
        //     window.inputBlurred = blurImplementation
        // }
    }
    window.inputBlurred = blurImplementation
    $scope.inputBlurred = blurImplementation

    $scope.namePropertyClicked = function() {
        
        fm.namePropertyClicked = true
        $scope.shapeId = $scope.selectedShape.id
        // $scope.valueFlushed = false;

        /* 如果是直接切换item 则是每次都是空字符，这时候不能保存，如果保存则会用null string覆盖本来的名字 */
        /* 所以要分开时切换item的情况 和 不是切换的情况 */

        // $scope.inputBlurred = blurImplementation
        // function(enter) {//enter为true则是切换，空字串不保存

        // }
        /* 一定是要先编辑了，鼠标点了，才能blur */
        // window.inputBlurred = $scope.inputBlurred


        $scope.$on('$destroy', function controllerDestroyed() {
            // if (!$scope.valueFlushed) {
            //     if (shape.title) {
            //         shape.title = shape.title.replace(/(<([^>]+)>)/ig, "");
            //     }
            //     $scope.updatePropertyInModel({ key: 'oryx-name', value: shape.title }, $scope.shapeId);
            // }
        });
    }

    $scope.enterPressed = function(keyEvent) {
        window.activeSave()
        if (keyEvent && keyEvent.which === 13) {
            keyEvent.preventDefault();
            // keyEvent.target.blur();
            $scope.inputBlurred(); // we want to do the same as if the user would blur the input field
        }
        // else{
        fm.namePropertyClicked = true
        // }
    };
}