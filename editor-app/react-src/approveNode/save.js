import store from '../../redux/configureStore.js'

const saveHandler = () => {
    let data = store.getState().approve.approveListRepo.filter((el,index)=>{
        return el.id == store.getState().approve.id
    })[0].data
    let string = ''
    let jsonArray = []
    data && data.forEach((el,index)=>{
        switch(el.cate){
           case 'boss':
               jsonArray.push('boss' + '('+ el.value +')')
               break
           case 'role':
               jsonArray.push('role' + '('+ el.value2 +':'+ el.value +')')
               break
           case "EMPLOYEE":
               jsonArray.push('user' + '('+ el.value +')')
               break
           case 'ORG':
           case 'DEPT':
               jsonArray.push('org' + '('+ el.value +')')
               break
        }
    })

    let value = {
        "items" : 
            [ 
                {
                    "assignment_type" : "candidate",
                    "resourceassignmentexpr" : jsonArray
                } 
            ],
        "totalCount" : 1
    }
    window.updatePropertyInModel({key:'usertaskassignment',value:value})
}

export default saveHandler