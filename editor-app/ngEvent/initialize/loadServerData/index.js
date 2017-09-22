import loadUserTask from './UserTask'
import loadEndEvent from './loadEndEvent'

export default function(modelData){
    /* 对服务器上的数据进行 解析 然后加载进redux */
    modelData.childShapes && modelData.childShapes.forEach((el,index)=>{
        
        switch(el.stencil.id){
            case 'SequenceFlow':
                let sf = []
                if(!el.properties.reduxdata){
                    // return;
                }else{
                    window.reduxStore.dispatch({type:'sequenceDataInit',data:el.properties.reduxdata})                                    
                }
                /* exclusive gate的内容 */
                if(el.properties.defaultflow== "true" ){
                    /*  
                        寻找sequenceflow的上一个节点（分支）
                        循环所有的节点，找他们的outgoing里面是不是有这个sequenceflow的resourceId
                    */
                    const theExclusiveGate = modelData.childShapes.filter((everyChild)=>{ 
                        return everyChild.outgoing.some((outgoingEl)=>{
                            return outgoingEl.resourceId == el.resourceId
                        })
                    })[0]

                    let elName =  modelData.childShapes.filter((eachChild)=>eachChild.resourceId == el.outgoing[0].resourceId)[0].properties.name
                    const branchObj = theExclusiveGate.outgoing.map((elOfEx)=>{
                        let currentElement = modelData.childShapes.filter((eachChild)=>eachChild.resourceId == elOfEx.resourceId)[0]
                        let name = modelData.childShapes.filter((eachChild)=>eachChild.resourceId == currentElement.outgoing[0].resourceId)[0].properties['oryx-name']
                        return {branchResourceId:elOfEx.resourceId,name,defaultflow:'df',choosed:'false'}
                    })


                    const reduxObj = {resourceId:theExclusiveGate.resourceId,data:branchObj,choosed:{text:elName,value:el.resourceId}}
                    if(reduxObj.data.length){
                        /* 要放在switchElement后面，不然会顺序会出问题，元素id还没更新 */
                        window.reduxStore.dispatch({ type: 'branchNodeInit',data:reduxObj})
                    }
                }

                // delete modelData.childShapes[index].properties.name
                delete modelData.childShapes[index].properties.reduxdata
                delete modelData.childShapes[index].properties.defaultflow
                delete modelData.childShapes[index].properties.conditionsequenceflow
                break

            case 'EndNoneEvent':
                loadEndEvent(el,index,modelData)
                break
            case 'EndErrorEvent':
                loadEndEvent(el,index,modelData)
                break

            case 'UserTask':
                loadUserTask(el,index,modelData)
                break

            case 'MultiUserTask':
                let theData = []
                if(!el.properties.multiinstance_parties){return;}
                theData = el.properties.multiinstance_parties.map((el2)=>{ //会签组12345
                    
                    return el2.map((el3)=>{ 
                        let obj = {cate:el3.cate,value:el3.id,text:el3.text}
                        if(el3.value2){
                            obj.value2 = el3.value2
                        }
                        return  obj
                    })
                })  
                window.reduxStore.dispatch({type:'parallelDataInit',data:{data:theData,id:el.resourceId}})
                delete modelData.childShapes[index].properties.multiinstance_parties
                delete modelData.childShapes[index].properties.multiinstance_type
                delete modelData.childShapes[index].properties.multiinstance_cardinality
                delete modelData.childShapes[index].properties.multiinstance_variable
                delete modelData.childShapes[index].properties.usertaskassignment
            break
        }
    })    
}
