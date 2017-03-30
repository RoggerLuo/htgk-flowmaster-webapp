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
                   // string += 'boss' + '('+ el.value +')'
                   break
               case 'role':
                   jsonArray.push('role' + '('+ el.value2 +':'+ el.value +')')
                   // string += 'role' + '('+ el.value2 +':'+ el.value +')'
                   break
               case 'user':
                   break
           }
       })
    window.updatePropertyInModel({key:'deliverToUsers',value:jsonArray})
}

export default saveHandler