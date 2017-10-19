export default function(cb){
    return function(){
        const sqlState = global.reduxStore.getState().sql
        const conditions = sqlState.conditions.map(el=>{
            return {
                columnName:el.columnName.value,
                columnType:el.columnType.value,
                expression:el.expression.value,
                variableName:el.variableName.value,
                variableType:el.variableType.value
            }
        })
        const dataSourceRef = {
            "dataSourceId": sqlState.dataSource.value,
            "sql": sqlState.sql,
            conditions
        }
        const item = {
            cate:'fromDb',
            dataSourceRef,
            dataSourceSTDdata:sqlState
        }
        cb(item)
        // 校验
        // 还原
        // global.reduxStore.dispatch({type:'getBackToDefaultDp1'})
    }
}
