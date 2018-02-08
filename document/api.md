
#function / api / variable

## fm.currentSelectedShape & item  
**fm.currentSelectedShape**  
切换selected shape的时候，保存的切换之后的shape, 或者说node  
**fm.currentSelectedShapeItem**
同上，但不是node，是一个item，有title属性  
定义在stencilController

Wed 17 Jan 5:40 2018

## global.updatePropertyInModel(k,v)
用(k,v)更新$scope.selectedShape的property  
不会刷新视图展示
#### `window.setPropertyAdvance(property, shape)`
#### `fm.setProperty_and_updateView(property, shape)`
都是指定shape更新，并且会刷新节点的视图展示  
Wed 17 Jan 5:40 2018  

## shapeUpdate/fm.madClick
防抽
thresholder 会影响使用的点击效果，  
设置太小了，有些函数会失效，快速切换组件的时候react组件也会加载不过来，   
设置太大的话，切换点击就会很卡

## 定位 并选中 某个shape
在isSfsUnnamed里面  

/* 定位的关键代码 */                    
                    fm.editor.setSelection([fm.getShapeById(el.resourceId)])                   
fm.editor.updateSelection()


## stencilController/palette修改
在scope上增加了flowMasterGroups属性，

在resource的stencilset里删除了My Object Group,  
把一些components的Group改成了flowMaster
