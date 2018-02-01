export default function(el,index,modelData){
    
    // let theData = []
    // if(!el.properties.multiinstance_parties) return 
    // theData = el.properties.multiinstance_parties.map((el2)=>{
    //     return el2.map((el3)=>{ 
    //         if(el3.cate == "fromDb"){
                
    //             return el3   
    //         }
    //         let obj = {cate:el3.cate,value:el3.id,text:el3.text}
    //         if(el3.value2) obj.value2 = el3.value2                
    //         return  obj
    //     })
    // })  
    // window.reduxStore.dispatch({type:'parallel/init',data:{data:theData,id:el.resourceId}})
    if(modelData.childShapes[index].properties.reduxData){
        rdx.dispatch({type:'parallel/init',data: modelData.childShapes[index].properties.reduxData })        
    }
    
    delete modelData.childShapes[index].properties.reduxData
    delete modelData.childShapes[index].properties.multiinstance_parties
    delete modelData.childShapes[index].properties.multiinstance_type
    delete modelData.childShapes[index].properties.multiinstance_cardinality
    delete modelData.childShapes[index].properties.multiinstance_variable
    delete modelData.childShapes[index].properties.usertaskassignment
}
