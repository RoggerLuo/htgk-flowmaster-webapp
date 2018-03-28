import render from './render'
import { tplSrc } from './constant'

export default function($scope, shape) {    
    const sf = shape
    // 是否显示名字
    $scope.propertyTpl = tplSrc + 'only-id.html'
    fm.sf.nameStrategy(sf,()=>{
        $scope.propertyTpl = tplSrc + 'node-name.html'        
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
