import './userGuide/component'
import '../qingfont/iconfont.css'
import './global.less'
import './icon.less'
import './basic.less'

import approveComponent from './approveNode/Component'
import parallelApproveComponent from './parallelApprove/MainCompContainer'
import branchSequenceFlowComponent from './branchSequnceFlow/Component'
import popupStart from './popup/wrapContainer'
import store from '../redux/configureStore'

popupStart()
global.branchSequenceFlowComponent = {render:branchSequenceFlowComponent}
global.parallelApproveComponent = {render:parallelApproveComponent}
global.approveComponent = {render:approveComponent}
global.reduxStore = store