export default function(cb,groupInd){
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
        const currentDataSourceRef = {
            "dataSourceId": sqlState.dataSource.value,
            "sql": sqlState.sql,
            conditions,
            leave:groupInd
        }
        const item = {
            cate:'fromDb',
            sql:sqlState.sql,
            currentDataSourceRef,
            // dataSourceRef:[currentDataSourceRef],
            sqlState,
            leave:groupInd
        }
        cb(item)
        global.reduxStore.dispatch({type:'sql/renew'})
        activeSave()

        //如果是新添加
        //选择到这个节点sqlData然后 得到leave
        // const parallel = global.reduxStore.getState().parallel
        // const selectedRepo = parallel.repo.filter(el=>el.id == parallel.id)[0]
        // let leave = 0
        // while( selectedRepo.sqlData.some(el=>el.leave == leave) ){
        //     leave += 1
        // }

        //如果不是新添加，那么就使用已经获得的leave
        // leave = old_leave
        // leave就用 group index就可以了

        
        // global.reduxStore.dispatch({type:'approve/clearPool'})
        // 校验
        // 还原
        // global.reduxStore.dispatch({type:'getBackToDefaultDp1'})
    }
}
