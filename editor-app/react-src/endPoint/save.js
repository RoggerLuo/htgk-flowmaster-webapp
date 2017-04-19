import store from '../../redux/configureStore.js'

const saveHandler = () => {

    let choosedElement = store.getState().endpoint.approveListRepo.filter((el,index)=>{
        return el.id == store.getState().endpoint.id
    })

    let data = []
    if(choosedElement[0]){
        data = choosedElement[0].data
    }
    
    let string = ''
       let jsonArray = []
       data && data.forEach((el,index)=>{
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
    window.updatePropertyInModel({key:'deliverToUsers',value:jsonArray})
}

window.saveHandlerEndPoint = saveHandler

export default saveHandler