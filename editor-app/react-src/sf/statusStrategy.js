export default function (sf,cb){
    if (!fm.parallelGate.isShapeIn(sf)){ //不在并行连线里面
        if ( //这些前面，显示连线状态
            fm.next.is("User task", sf) ||
            fm.next.is("Manual task", sf) ||
            fm.next.is("Multi user task", sf) ||
            fm.next.is("Subflow", sf) ||
            fm.next.is("Parallel gateway", sf) ||
            fm.next.is("End event", sf)
        ) {
            return cb(describe)
        }
    }
    return true   
}

function describe(_sf){
    fm.spotlight(_sf)
    window.showAlert(`当前高亮连线的<span style='color:orange;'>业务状态未设置</span>`)
}
