# 几百年没有更新readme了...
just let it go


## reduce 的通用wrap
固定了id 和 stencilTitle的结构  
以及当前选中ind


20 Sep
## buttonContainer重构
选择人员时，删掉了判断是否重复的逻辑，如果有重复直接覆盖
19 Sep 
## palette修改
在scope上增加了flowMasterGroups属性，

在resource的stencilset里删除了My Object Group,  
把一些components的Group改成了flowMaster

---
流程大师一期 
##更新测试环境
scp -r design/* root@172.16.1.27:/root/volumes/nginx/bpm/design/

密码 workplus

##键盘事件
键盘事件无法使用，因为iframe的关系  
每次直接点击canvas无法激活iframe窗口的document的监听事件  
必须点击其他的iframe的html部分  

一旦点击iframe外部html，键盘事件又会失效

## canvas输入框
`css/style.css`中间把这个textarea设置为display:none