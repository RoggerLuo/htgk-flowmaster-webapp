export default function(cb,groupInd){
    return function(){
        const sqlState = rdx.getState().sql
        const conditions = sqlState.conditions.map(el=>{
            return {
                columnName:el.columnName, //不要加value因为这是字符串，这是 input text
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
        rdx.dispatch({type:'sql/renew'})
        rdx.save()
    }
}
