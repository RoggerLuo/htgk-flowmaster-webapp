
# deprecated here

## 初始化
### load event
初始化 分支节点的时候 是在sf中，  
如果有某个sf的`defaultflow`设置为true，说明 使用了分支节点，  
不然就不需要初始化

### 为什么一定要单独初始化，而不是在执行的时候顺便初始化
考虑的到通用性原因，  
用reduceWrap方法会自动去拿index,   
第一次dispatch 拿不到repo的index,`"not exist"`，  
所以需要把 初始化 和 dispatch 分开  

5 Feb 2018  
20 Sep 2017




## reduce 的通用wrap
`selectEvent/informRedux_the_ElementSwitchEvent`  
放在了一起

reducerName 和 stencilTitle 概念搞混了  
reducerName是自己取的，有很多自定义的用途，比如all  
stencilTitle来自于oryx



## 审批人设置
### SQL审批人 需要index 参数
call popup  
在action.confirm这一层的时候  
需要多传一个参数  index group


## 节点、表单数据同步
### 特定审批人 同步节点名称的修改
	1.在 RolesFrameGeneratorNotForParallel/defaultContainer/index 里
	加载的时候根据 resourceId 来取值
	
	2.下拉框的同步修改
		在每次 click button 的时候 重新计算当前画布上的节点，
		把数据保存到temp reduce里面
		直接从reduce.temp中读取dpdw的数据
		就可以保持同步更新了
	
### 同步表单修改 - 分支条件下拉选项值若修改了
判断如果是表单组件  
则根据value(field_xxxxx) 循环更新 展示的text  
二级联动 最后的 输入控件都会更新

## 并行汇聚
### 判断并行分支的边界算法
	
先算出 collections, 

	从parallelGateway出发找outgoing，也就是child，然后直到找到inclusive为止，  
	这中间的都算 collections

在判断是不是和外部支流有连结

	向上检测 和 向下检测， 判断并行中的节点 是不是和外部支流有连结，不能有连结
	
	
最后检测 并行里的支流之间会不会有连结，不能连结

	只有incoming>1的节点才需要检测

Wed 31 Jan 
### fm.isCurrentShapeInGates
`/editor-app/flowmaster/selectEvent/index.js`  
是每一次select判断当前的shape是否在gate里面	  
其实可以延迟判断的  
这里还没 抽象分离出来
### shapeInGates
不是在路由里面判断，是在select的时候判断，然后不显示property的组件    
保存的时候 再判断一次 如果inGates 则不校验  

    就算换模版也可以的
    但是，换了模版，点击了就会init，校验的地方需要修改
    需要校验所有的sf,  
    因为不知道这个是不是init过



## 更新右侧栏视图
### 每次afterupdate 都touch
每次移动之后，就可以实时更新右边属性栏的视图  
比如 显示或者不显示 “退回上一节点”

## 节点自动命名 
原生的oryx在删除以后，不能马上在getNodes里实时更新节点结构，  
导致命名的时候，会有跳过某个序号的情况

解决办法，新建一个数组，保存所有的命名情况，  
在新建、删除节点，修改节点名称的时候，都要维护这个数组

保存在canvas的properties中

Mon 29 Jan 





## 连线命名、连线状态、分支连线
**连线命名在route里面通过template控制**    
只管名称的显示，状态默认都显示  
**在 react 组件 sf 里面**    控制 状态
Fri 26 Jan 3:00 PM
    


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





## stencilController/palette修改
在scope上增加了flowMasterGroups属性，

在resource的stencilset里删除了My Object Group,  
把一些components的Group改成了flowMaster

---

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




---

##键盘事件
键盘事件无法使用，因为iframe的关系  
每次直接点击canvas无法激活iframe窗口的document的监听事件  
必须点击其他的iframe的html部分  

一旦点击iframe外部html，键盘事件又会失效


## canvas中输入框样式
`css/style.css`中间把这个textarea设置为display:none  
直接取消了在canvas中的输入框， 不允许出现