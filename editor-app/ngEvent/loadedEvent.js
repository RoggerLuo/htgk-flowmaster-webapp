export default function(){
    /* 画布加载以后，把sequenceflow设置为true */
    window.reduxStore.getState().branchNode.repo.forEach((el) => {
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
    window.reduxStore.dispatch({ type: 'saveDeactive' })
}
