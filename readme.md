## subflow	
在点击要添加子流程的时候，	

发送了http请求，获取了`form components`的数据，未经过处理的，  
直接放到redux里面: `currentRepo.leftFields`，  
这个对象中，类型是用`type`类型来表示  
	
	所以，在使用"子流程"的表单字段的时候，用type
  

然而，在mainForm组件里，使用的`formPropertiesTotal`是经过处理的，  

	使用本表单字段的时候，类型储存在`subform_type`中
## popup / popupContent样式
增加overflow-y:auto  
而固定住x

## 定位 并选中 某个shape
在isSfsUnnamed里面  

/* 定位的关键代码 */                    
                    fm.editor.setSelection([fm.getShapeById(el.resourceId)])                   
fm.editor.updateSelection()

## 点击收起下拉选项 - 分支的dropdown
放弃使用cover来 折叠dropdown  
把setState事件 通过fm.closeCurrDpdw传递到全局  
然后每次 toggle dropdown 的时候，就更新fm.closeCurrDpdw的引用  
然后点击空白处 就触发这个绑定到全局的事件  
使用stopPropagation  
以及每次toggle前 都执行前一个close事件，就不会有多个dpdw同时打开  
效果更好  
Thu 18 Jan 5:48

## global.updatePropertyInModel(k,v)
用(k,v)更新$scope.selectedShape的property  
不会刷新视图展示
#### `window.setPropertyAdvance(property, shape)`
#### `fm.setProperty_and_updateView(property, shape)`
都是指定shape更新，并且会刷新节点的视图展示  
Wed 17 Jan 5:40 2018  



## fm.currentSelectedShape & item  
**fm.currentSelectedShape**  
切换selected shape的时候，保存的切换之后的shape, 或者说node  
**fm.currentSelectedShapeItem**
同上，但不是node，是一个item，有title属性  
定义在stencilController

Wed 17 Jan 5:40 2018



## reduce 的通用wrap
固定了id 和 stencilTitle的结构,以及当前选中ind


20 Sep 2017

## stencilController/palette修改
在scope上增加了flowMasterGroups属性，

在resource的stencilset里删除了My Object Group,  
把一些components的Group改成了flowMaster

---
---
#流程大师一期 
---
---

##键盘事件
键盘事件无法使用，因为iframe的关系  
每次直接点击canvas无法激活iframe窗口的document的监听事件  
必须点击其他的iframe的html部分  

一旦点击iframe外部html，键盘事件又会失效


## canvas中输入框样式
`css/style.css`中间把这个textarea设置为display:none  
直接取消了在canvas中的输入框， 不允许出现