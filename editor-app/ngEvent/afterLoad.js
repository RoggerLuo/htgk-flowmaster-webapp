export default function($scope){
    $scope.editor.registerOnEvent(ORYX.CONFIG.EVENT_LOADED, function(event) {
        




        /* 画布加载以后，把sequenceflow设置为true */
        rdx.getState().branchNode.repo.forEach((el) => {
            let currentElement = window.windowCanvas.getChildShapeByResourceId(el.choosed.value)
            window.setPropertyAdvance({ key: 'defaultflow', value: 'true' }, currentElement)
        })
        /* 保存事件deactive，自动保存一次 */
        const saveEvent = {
            type: KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED,
            model: '',
            modelId: window.getQueryString("pid"),
            eventType: 'update-model'
        }
        KISBPM.eventBus.dispatch(KISBPM.eventBus.EVENT_TYPE_MODEL_SAVED, saveEvent)
        rdx.dispatch({ type: 'saveDeactive' })





    })    
}
