import store from '../../redux/configureStore.js'

const saveHandler = () => {
    let data = store.getState().parallel.repo.filter((el,index)=>{
        return el.id == store.getState().parallel.id
    })[0].data
    let string = ''
    data && data.forEach((el,index)=>{
        switch(el.cate){
            case 'boss':
                string += 'boss' + '('+ el.value +')'
                break
            case 'role':
                string += 'role' + '('+ el.value2 +':'+ el.value +')'
                break
            case 'user':
                break
        }
    })
    let value = {
        "items" : 
            [ 
                {
                    "assignment_type" : "candidate",
                    "resourceassignmentexpr" : string
                } 
            ],
        "totalCount" : 1
    }
    window.updatePropertyInModel({key:'usertaskassignment',value:value})
    // console.log(JSON.stringify(getJson()))
}

export default saveHandler