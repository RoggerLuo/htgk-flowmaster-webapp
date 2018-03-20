import render from './render'
import { tplSrc } from './common'
export default function($scope, shape) {    
    $scope.propertyTpl = tplSrc + 'node-name.html'
    
    /* 如果是人工分支branch */
    if (fm.manual.is.sf(shape)) {
        render(fm.statusSf)
        return
    }

    /* 如果是会签分支branch */
    if (fm.multi.is.sf(shape)) {
        render(fm.statusSf)
        $scope.propertyTpl = tplSrc + 'only-id.html'
        return
    }

    // 顺序很重要，如果是 人工或会签，这里就不执行了
    if(fm.last.is('User task',shape)){
        render(fm.statusSf)
        return
    }

    /* 如果是普通分支节点的branch */
    if (fm.branch.is(shape)) {
        if (shape.properties['defaultflow'] == 'true') {
            $scope.propertyTpl = tplSrc + 'only-id.html'
        } else {
            render(fm.statusSf)
            render(fm.branchSf.component,true)
            $scope.propertyTpl = tplSrc + 'only-id.html'
        }
        return
    }
    // 普通的sf
    $scope.propertyTpl = tplSrc + 'only-id.html'
}

