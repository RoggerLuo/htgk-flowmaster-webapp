import store from '../../redux/configureStore.js'

const saveHandler = (canvas) => {
    // let choosedElement = store.getState().approve.approveListRepo.filter((el,index)=>{
    //     return el.id == store.getState().approve.id
    // })
    // let data = []
    // if(choosedElement[0]){
    //     data = choosedElement[0].data
    // }
    
    // let string = ''
    // let jsonArray = []
    // data && data.forEach((el,index)=>{
    //     switch(el.cate){
    //        case "boss":
    //            jsonArray.push({"value": ["boss" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value})
    //            break
    //        case "role":
    //            jsonArray.push({"value": ["role" + "("+ el.value2 +":"+ el.value +")"],cate:el.cate,text:el.text,id:el.value,value2:el.value2})
    //            break
    //        case "EMPLOYEE":
    //            jsonArray.push({"value": ["user" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value})
    //            break
    //        case "ORG":
    //        case "DEPT":
    //            jsonArray.push({"value": ["org" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value})
    //            break
    //     }
    // })

    // let value = {
    //     "assignment": {
    //         "candidateOwners": jsonArray
    //     }
    // }
    store.getState().approve.approveListRepo.forEach((el)=>{
        let currentElement = canvas.getChildShapeByResourceId(el.id)
        let jsonArray = []

        el.data.forEach((el,index)=>{
            switch(el.cate){
               case "boss":
                   jsonArray.push({"value": ["boss" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value})
                   break
               case "role":
                   jsonArray.push({"value": ["role" + "("+ el.value2 +":"+ el.value +")"],cate:el.cate,text:el.text,id:el.value,value2:el.value2})
                   break
               case "EMPLOYEE":
                   jsonArray.push({"value": ["user" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value})
                   break
               case "ORG":
               case "DEPT":
                   jsonArray.push({"value": ["org" + "("+ el.value +")"],cate:el.cate,text:el.text,id:el.value})
                   break
            }
        })
        let value = {
            "assignment": {
                "candidateOwners": jsonArray
            }
        }
        currentElement.setProperty('usertaskassignment',value)
    })


    // canvas.getChildShapeByResourceId("sid-AE5123FA-D6CE-467A-AA3E-D121B6FA4455")
    // window.updatePropertyInModel({key:'usertaskassignment',value:value})
    // debugger
}
window.saveHandlerApprove = saveHandler
export default saveHandler