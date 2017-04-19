import store from '../../redux/configureStore.js'

const saveHandler = () => {
    /* 这个data是一个多层数组*/
    let choosedElement = store.getState().branch.dataRepo.filter((el,index)=>{ 
        return el.id == store.getState().branch.id
    })

    let data = []
    if(choosedElement[0]){
        data = choosedElement[0].conditions
    }
    
    let jsonArray = []
    let returnString = '${'
    data.forEach((condition,i)=>{
        let conditionArray  = []        
        condition.forEach((el,index)=>{
            switch(el.entry1.index){
                case 0:
                    returnString += ' f.'
                break
                case 1:
                    returnString += ' u.'
                break
                case 2:
                    returnString += ' e.'
                break
            }
            returnString += el.entry2.value
            returnString += ' '
            returnString += el.entry3.value
            returnString += ' '
            returnString += el.input

            if(index < (condition.length-1)){
                returnString += ' && '                
            }
        })

        if(i < (data.length-1)){
            returnString += ' || '                
        }
    })
    returnString += '}'
    window.updatePropertyInModel({key:"conditionsequenceflow",value:returnString})
    window.updatePropertyInModel({key:"reduxdata",value:choosedElement[0]})

}

window.saveHandlerBranch = saveHandler

export default saveHandler