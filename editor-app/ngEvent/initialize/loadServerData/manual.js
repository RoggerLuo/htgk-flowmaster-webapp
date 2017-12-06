export default function(el,index,modelData){
    let approveData = []
    
    if(!el.properties.usertaskassignment) return

    if(typeof(el.properties.usertaskassignment.assignment.candidateOwners) !='object'){
        delete modelData.childShapes[index].properties.usertaskassignment
        return                                     
    }
    
    approveData = el.properties.usertaskassignment.assignment.candidateOwners.map((el2)=>{ //会签组12345
        let obj = {cate:el2.cate,value:el2.id,text:el2.text}
        if(el2.value2) obj.value2 = el2.value2            
        return  obj
    })  

    global.reduxStore.dispatch({
        type:'manual/init',
        data:{
            data:approveData,
            id:el.resourceId,
            previousNodeSpecified:el.properties.previousNodeSpecified||false
        }
    })

    delete modelData.childShapes[index].properties.usertaskassignment
    delete modelData.childShapes[index].properties.dataSourceRef
    delete modelData.childShapes[index].properties.dataSourceSTDdata
    delete modelData.childShapes[index].properties.previousNodeSpecified
}