export default (shape) => {
    if(fm.getOutgoingX2(shape)){
        const middleShapeTitle = fm.getTitle(fm.getOutgoingX2(shape))
        if( middleShapeTitle == 'Exclusive gateway'|| middleShapeTitle == 'Parallel gateway'){
            fm.getOutgoingX2(shape).outgoing.forEach(el=>{
                if(fm.getOutgoing(el)){
                    if(fm.getTitle(fm.getOutgoing(el)) == 'Subflow'){
                        window.showAlert('开始节点后的分支不能连接子流程')
                        fm.undo()
                    }
                }

            })
        }
    }

}
