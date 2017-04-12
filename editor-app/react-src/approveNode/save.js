import store from '../../redux/configureStore.js'

const saveHandler = () => {
    let choosedElement = store.getState().approve.approveListRepo.filter((el,index)=>{
        return el.id == store.getState().approve.id
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
               jsonArray.push({"value": "boss" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
               break
           case "role":
               jsonArray.push({"value": "role" + "("+ el.value2 +":"+ el.value +")",cate:el.cate,text:el.text,id:el.value,value2:el.value2})
               break
           case "EMPLOYEE":
               jsonArray.push({"value": "user" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
               break
           case "ORG":
           case "DEPT":
               jsonArray.push({"value": "org" + "("+ el.value +")",cate:el.cate,text:el.text,id:el.value})
               break
        }
    })

    let value = {
        "assignment": {
            "candidateOwners": jsonArray
        }
    }

    window.updatePropertyInModel({key:'usertaskassignment',value:value})
}
window.saveHandlerApprove = saveHandler
export default saveHandler