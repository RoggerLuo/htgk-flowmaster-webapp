import loadUserTask from './UserTask'
import loadEndEvent from './loadEndEvent'
import loadMultiUserTask from './loadMultiUserTask'
import loadSF from './loadSF'
export default function(modelData){ /* 对服务器上的数据进行 解析 然后加载进redux */
    modelData.childShapes && modelData.childShapes.forEach((el,index)=>{
        switch(el.stencil.id){
            case 'SequenceFlow':
                loadSF(el,index,modelData)
                break
            case 'EndNoneEvent':
                loadEndEvent(el,index,modelData)
                break
            case 'EndErrorEvent':
                loadEndEvent(el,index,modelData)
                break
            case 'UserTask':
                loadUserTask(el,index,modelData)
                break
            case 'MultiUserTask':
                loadMultiUserTask(el,index,modelData)
            break
        }
    })
}
