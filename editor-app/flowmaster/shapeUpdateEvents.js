import router from './router'

fm.before_selection_change = ($scope, event) => { 
    fm.titleRename && fm.titleRename() //这是什么

    const shape = event.elements.first()
    router($scope, shape)
    fm.nameManager.autoNaming(shape)
} 

fm.after_selection_change = ($scope,event) => {}
