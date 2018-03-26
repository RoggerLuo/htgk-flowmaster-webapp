fm.onCmdExecuted = () => {
    if (fm.undoFlag === true) {
        fm.undo()
        fm.undoFlag = false
    }
    if (fm.isSpecificVersionEditMode) fm.undo()

    if (!fm.parallelGate.isCorrectlyLinked()) fm.undo()
    fm.restrict.after_executed()
    fm.multi.branch.naming_after_excecuted()
    clear_lost_sf()
}

function clear_lost_sf() {
    fm.getJson().childShapes
        .filter(shape => fm.getTitle(fm.getShapeById(shape.resourceId)) == "Sequence flow")
        .forEach(shape => {
            const _shape = fm.getShapeById(shape.resourceId)
            if(_shape.incoming.length === 0){
                fm.setProperty_and_updateView({ key: 'oryx-name', value: '' }, _shape)
                fm.setProperty_and_updateView({ key: "conditionsequenceflow", value: "" }, _shape)
                fm.setProperty_and_updateView({ key: "businessStatusId", value: "" }, _shape)
            }
        })
}