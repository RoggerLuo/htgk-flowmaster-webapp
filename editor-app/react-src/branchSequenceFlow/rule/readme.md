###每次selection 都branchNodeDataUpdate
在globalEvent(angular环境下)的index
每次切换组件，执行"branchNodeDataUpdate" action,
把每个分支节点的内容 update并保存到redux

再通过id从redux仓库里去取得正确的 分支数据



# 没有选项时不能选择
如果要告诉用户没有可用的选项，就是只显示 “请选择”这一项，
那么保存时判断为空的条件需要调整
reduce里保存选项的方式也要改变，不能再用index

# dropdown默认值
dropdown的默认值是在reduce的 init里面设置的

以及在popup里面的dropdown 默认值都是在init或者 数据加载时、update时同时加载default值的
    
