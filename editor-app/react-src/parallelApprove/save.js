import store from '../../redux/configureStore.js'

const saveHandler = () => {
    /* 这个data是一个多层数组*/
    let data = store.getState().parallel.repo.filter((el,index)=>{ 
        return el.id == store.getState().parallel.id
    })[0].data
    
    let jsonArray = []
    data.forEach((group)=>{
        let innerArray  = []
        group.forEach((el,index)=>{
            switch(el.cate){
                case 'boss':
                    innerArray.push('boss' + '('+ el.value +')')
                    break
                case 'role':
                    innerArray.push('role' + '('+ el.value2 +':'+ el.value +')')
                    break
                case "EMPLOYEE":
                    innerArray.push('user' + '('+ el.value +')')
                    break
                case 'ORG':
                case 'DEPT':
                    innerArray.push('org' + '('+ el.value +')')
                    break
            }
        })
        jsonArray.push(innerArray)
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
    // console.log(JSON.stringify(getJson()))
}

export default saveHandler