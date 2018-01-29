## 分支条件 的下拉选项，判断如果是表单组件
则根据value(field_xxxxx) 循环更新 展示的text  
二级联动 最后的 输入控件都会更新

## shapeUpdate/fm.madClick
防抽
thresholder 会影响使用的点击效果，  
设置太小了，有些函数会失效，快速切换组件的时候react组件也会加载不过来，   
设置太大的话，切换点击就会很卡

## rolesFrame and conf组件
每个审批节点中的 Role frame conf组件的作用是  
	
	使用这个节点的 reduce/repo里的data, 
	用dispatch拼出add、del、clear，
	传递给公共的role frame generator组件，
	
	拼出一个有特殊样式 和 特殊功能的 审批人设置组件


##  save/isSfsUnnamed
是用来校验 连线是否命名
## isNodesValid/sf
用来校验 连线业务状态
## 这些节点的前面，连线状态是否显示
**在rout里面**    
人工分支	不显示	fm.manual.is.sf  条件分支	不显示	fm.branch.is  会签分支	不显示	fm.multi.is.sf  传阅	不显示	fm.next.is("Circulation    
**在sf react 组件里面**    并行汇聚内	不显示	fm.isCurrentShapeInGates  

Fri 26 Jan 3:00 PM
## fm.isCurrentShapeInGates
`/editor-app/flowmaster/selectEvent/index.js`  
是每一次select判断当前的shape是否在gate里面	  
其实可以延迟判断的  
这里还没 抽象分离出来
## shapeInGates
不是在路由里面判断，是在select的时候判断，然后不显示property的组件    
保存的时候 再判断一次 如果inGates 则不校验  

    就算换模版也可以的
    但是，换了模版，点击了就会init，校验的地方需要修改
    需要校验所有的sf,  
    因为不知道这个是不是init过
    

## sequence flow系列问题
1.template混乱，  
2.机制混乱，通过不初始化来不显示业务状态,隐式的方法，不够明显  
应该通过template来不调用angular controller进而不调用react组件

可以抽象出来的“校验环节”，  
需不需要检查 1命名 以及 2业务状态

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