import render from './render'
import { tplSrc, tplSrcWithV } from './constant'

export default function($scope, shape) {    
    const sf = shape
    // 是否显示名字
    $scope.propertyTpl = tplSrcWithV('only-id.html')
    fm.sf.nameStrategy(sf,()=>{
        $scope.propertyTpl = tplSrcWithV('sf-name.html')
    })

    // 是否显示状态
    let renderPlaceholder = false
    fm.sf.statusStrategy(sf,()=>{
        render(fm.sf.statusComponent)
        renderPlaceholder = true
    })

    /* 如果是普通分支节点的branch */
    if (fm.branchSf.is(shape)) {
        if (shape.properties['defaultflow'] != 'true') {
            render(fm.branchSf.component,renderPlaceholder)
        }
    }
}
