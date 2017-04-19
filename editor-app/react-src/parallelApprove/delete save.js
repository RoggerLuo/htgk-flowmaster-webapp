import store from '../../redux/configureStore.js'

const saveHandler = () => {
    /* 这个data是一个多层数组*/
    let choosedElement = store.getState().parallel.repo.filter((el,index)=>{ 
        return el.id == store.getState().parallel.id
    })

    let data = []
    if(choosedElement[0]){
        data = choosedElement[0].data
    }
    
    let jsonArray = []
    data.forEach((group)=>{
        let innerArray  = []
        group.forEach((el,index)=>{
            switch(el.cate){
                case "boss":
                    innerArray.push({"value":["boss" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value}) 
                    break
                case "role":
                    innerArray.push({"value":["role" + "("+ el.value2 +":"+ el.value +")"],cate:el.cate,text:el.text,id:el.value,value2:el.value2}) 
                    break
                case "EMPLOYEE":
                    innerArray.push({"value":["user" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value}) 
                    break
                case "ORG":
                case "DEPT":
                    innerArray.push({"value":["org" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value}) 
                    break
            }
        })
        jsonArray.push(innerArray)
    })
    window.updatePropertyInModel({key:"multiinstance_parties",value:jsonArray})
    window.updatePropertyInModel({key:"multiinstance_type",value:"parallel"})
    // window.updatePropertyInModel({key:"multiinstance_cardinality",value:"1"})
    window.updatePropertyInModel({key:"multiinstance_variable",value:"per"})
    window.updatePropertyInModel({key:"usertaskassignment",value:{
            "assignment": {
               "candidateOwners": "${per}"
            }
        }
    })
}

window.saveHandlerParallel = saveHandler

export default saveHandler