
const isSingleSelect = (cate) => {
    switch(cate){
        case 'boss':
        case 'fromDb':
        case 'EXTERNAL':
        case 'form':
        case 'historicTask':
        return true
    }
    return false
}

const isTheSameCate = (cate1,cate2) => {
    return isSingleSelect(cate1) == isSingleSelect(cate2)
}

export default ({reduxCate,add,clear,groupInd}) => { //reduxCate有的是空字符串，有的是 undefine 日了狗
    return (item) => {
        // if(
        //     (reduxCate == item.cate || !!reduxCate==false) //两个都是同一个，不用清空
        // ||
        //     (!isSingleSelect(item.cate) && !isSingleSelect(reduxCate)) //两个都不是单选，也不用清空              
        // ){ /* 不清空 */ }else{//清空

        //     const r=confirm("修改节点审批人类型，可能会导致之前已维护的内容被清空");
        //     if(r==true){
        //         clear()
        //     }else{
        //         return 
        //     }
        // }
        add(item)
        activeSave() 
    }
}
