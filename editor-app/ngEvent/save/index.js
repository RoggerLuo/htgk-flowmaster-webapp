'use strict'
import saveHandlerApprove from './approve'
import saveHandlerEndPoint from './endPoint'
import saveHandlerBranch from './branch'
import saveHandlerBranchNode from './branchNode'
import saveHandlerParallel from './parallel'
import checkEmpty from './checkEmpty'

export default function($scope, $http) {
    return function(callback) {
        window.reduxStore.dispatch({ type: 'saveDeactive' })

        /* 提前把redux转换成oryx数据 */
        const canvas = $scope.editor.getCanvas()
        saveHandlerApprove(canvas)
        saveHandlerParallel(canvas)
        saveHandlerEndPoint(canvas)
        if (!saveHandlerBranch(canvas)) {
            activeSave()
            return
        }
        saveHandlerBranchNode(canvas)

        /* 为空的限制条件 */
        if (checkEmpty($scope)) {
            window.reduxStore.dispatch({ type: 'saveActive' })
            return
        }

        /* 等待动画 */
        window.reduxStore.dispatch({ type: 'callSpin' })


        /* 接下来是 activiti ng original的代码 */
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
        const transformRequest = function(obj) {
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
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            },
            url: window.globalHost + '/repository/process-definitions/' + window.getQueryString("pid") + '/design?processType=Normal'
        })

        .success(function(data, status, headers, config) {
            window.reduxStore.dispatch({ type: 'closeSpin' })
            window.showAlert('保存成功', 'good')

            // Fire event to all who is listening
            $scope.editor.handleEvents({
                type: ORYX.CONFIG.EVENT_SAVED
            });

            KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED, saveEvent);
            callback()

            console.log(json)
            window.reduxStore.dispatch({ type: 'saveDeactive' })
            // window.localDesignData.clear(window.getQueryString("pid"))
        })
        .error(function(data, status, headers, config) {
            $scope.error = {};
            console.log('Something went wrong when updating the process model:' + JSON.stringify(data));
            window.reduxStore.dispatch({ type: 'saveActive' })
        })
    }
}