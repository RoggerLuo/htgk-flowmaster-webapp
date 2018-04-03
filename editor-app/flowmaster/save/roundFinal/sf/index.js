export default function(){
    rdx.store.getState().sf.repo.forEach((el) => {
        let shape = fm.getNodeById(el.id)
        if (!shape) return
        if(el.businessStatus.value){ //如果设置了
            if(fm.multi.is.sf(shape)){ //分支保存的时候再命名一次，为了加上${CBpass}
                fm.multi.branch.namingOnSave(shape)
            }
            shape.setProperty('businessStatusId', el.businessStatus.value)
            shape.setProperty('reduxData', el) // 一个组件有两个 redux data包
        }            
        //如果没有设置businessStatusId项的话
    })
}
