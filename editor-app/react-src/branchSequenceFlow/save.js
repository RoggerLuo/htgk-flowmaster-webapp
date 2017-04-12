import store from '../../redux/configureStore.js'

const saveHandler = () => {
    /* 这个data是一个多层数组*/
    let choosedElement = store.getState().branch.dataRepo.filter((el,index)=>{ 
        return el.id == store.getState().branch.id
    })

    let data = []
    if(choosedElement[0]){
        data = choosedElement[0].data
    }
    
    let jsonArray = []
    data.conditions.forEach((condition)=>{
        
        let innerArray  = []
        
        condition.forEach((el,index)=>{
            switch(el.cate){
                case "boss":
                    innerArray.push({"value":"boss" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value}) 
                    break
                case "role":
                    innerArray.push({"value":"role" + "("+ el.value2 +":"+ el.value +")",cate:el.cate,text:el.text,id:el.value,value2:el.value2}) 
                    break
                case "EMPLOYEE":
                    innerArray.push({"value":"user" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value}) 
                    break
                case "ORG":
                case "DEPT":
                    innerArray.push({"value":"org" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value}) 
                    break
            }
        })
        jsonArray.push(innerArray)
    })

    window.updatePropertyInModel({key:"multiinstance_participants",value:jsonArray})

}

window.saveHandlerParallel = saveHandler

export default saveHandler