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
        const leave = 1
        const currentDataSourceRef = {
            "dataSourceId": sqlState.dataSource.value,
            "sql": sqlState.sql,
            conditions,
            leave
        }
        
        if(!sqlState.dataSourceRef.some(el=>el.leave==leave)){
            global.reduxStore.dispatch({
                type:"saveDataSourceRef",
                dataSourceRef:sqlState.dataSourceRef.slice().push(currentDataSourceRef)
            })
        }

        const item = {
            cate:'fromDb',
            dataSourceRef,
            dataSourceSTDdata:sqlState
        }
        // global.reduxStore.dispatch({type:'approve/clearPool'})
        cb(item)
        // 校验
        // 还原
        // global.reduxStore.dispatch({type:'getBackToDefaultDp1'})
    }
}
