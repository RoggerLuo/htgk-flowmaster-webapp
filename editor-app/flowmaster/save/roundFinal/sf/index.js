// import sf_never_touched from './sf_never_touched'

export default function(){
    let flag = true //sf_never_touched()
    rdx.store.getState().sf.repo.forEach((el) => {
        let shape = fm.getNodeById(el.id)
        if (!shape) return
        if(!el.businessStatus.value){ //如果没有设置businessStatusId项的话
            
            // if (fm.multi.is.sf(shape)) return false
            // if(fm.next.is("Exclusive gateway",shape)) return false  //三种分支都不显示
            // if(fm.next.is("Circulation task",shape)) return false
            // if(fm.parallelGate.isShapeIn(shape)) return false

            // fm.spotlight(shape)
            // if(!!shape.properties["oryx-name"]){
            //     window.showAlert(`连线<span style="color:orange">"${shape.properties["oryx-name"]}"</span>业务状态未设置`)
            // }else{
            //     window.showAlert(`<span style="color:orange">连线</span>业务状态未设置`)
            // }
            flag = false
            return 
        }else{ //如果设置了
            if(fm.multi.is.sf(shape)){ //分支保存的时候再命名一次，为了加上${CBpass}
                fm.multi.branch.namingOnSave(shape)
            }
            shape.setProperty('businessStatusId', el.businessStatus.value)
            // 一个组件有两个 redux data包
            shape.setProperty('reduxData', el)
        }

    })
    return flag
}
