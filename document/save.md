# 保存
约定所有的函数都是通过返回true，不通过返回false

## integrityValidate
检查是否完整连接上了

## preliminaryValidate
给节点打上相关业务标识  
自动命名  
检查sf的命名，nameStrategy，不需要inRepo或notInRepo两次判断，一次就可

## inRepoValidate
**初始化了的节点**  
有审批设置的节点的人员设置校验  
sf 业务状态校验  
分支连线 取消删除状态
## notInRepoValidate
**未初始化的节点**  
sf 业务状态校验  
## roundFinal