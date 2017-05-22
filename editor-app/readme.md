## 默认分支不能设置条件
在路由里面  
如果defaultflow为 true则显示普通节点

##注意事项
频繁更新文件  
- `dist`  
- `globalEvent`  
- `globalEvent/save` http header Content-Type 要取消注释  
- `app.js`的 defaults.headers的注释要取消  


其次  
- configuration/default-controller  
- 模版类，property-tpl, editor.html,  
- css, `./css`,`editor/css`  

资源类  
- `./stencilsets`文件夹  
- `./images`  
- `../resources`  

容易忘记的  
- `i18n`

 
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