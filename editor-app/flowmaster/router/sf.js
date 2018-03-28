import render from './render'
import { tplSrc } from './common'
export default function($scope, shape) {    
    const sf = shape
    // 是否显示名字
    $scope.propertyTpl = tplSrc + 'only-id.html'
    if(
        fm.last.is('User task',shape) ||
        fm.manual.is.sf(shape)
    ){
        $scope.propertyTpl = tplSrc + 'node-name.html'
    }

    // 是否显示状态
    let renderPlaceholder = false
    sfStatusStrategy(sf,()=>{
        render(fm.statusSf)       
        renderPlaceholder = true
    })

    /* 如果是普通分支节点的branch */
    if (fm.branch.is(shape)) {
        if (shape.properties['defaultflow'] != 'true') {
            render(fm.branchSf.component,renderPlaceholder)
        }
    }
}

function sfStatusStrategy(sf,cb){
    if (!fm.parallelGate.isShapeIn(sf)){ //不在并行连线里面
        if ( //这些前面，显示连线状态
            fm.next.is("User task", sf) ||
            fm.next.is("Manual task", sf) ||
            fm.next.is("Multi user task", sf) ||
            fm.next.is("Subflow", sf) ||
            fm.next.is("Parallel gateway", sf) ||
            fm.next.is("End event", sf)
        ) {
            return cb()
        }
    }
}
fm.save = {}
fm.save.sfStatusStrategy = sfStatusStrategy


/* 如果是人工分支branch */
// if (fm.manual.is.sf(shape)) {
//     render(fm.statusSf)
//     return
// }

/* 如果是会签分支branch */
// if (fm.multi.is.sf(shape)) {
    // render(fm.statusSf)
    // $scope.propertyTpl = tplSrc + 'only-id.html'
    // return
// }

// 顺序很重要，如果是 人工或会签，这里就不执行了
// if(fm.last.is('User task',shape)){
//     render(fm.statusSf)
//     return
// }

// 普通的sf
// $scope.propertyTpl = tplSrc + 'only-id.html'
