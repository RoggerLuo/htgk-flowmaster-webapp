import './userGuide/component'
import '../qingfont/iconfont.css'
import './global.less'
import './icon.less'
import './basic.less'

import approveComponent from './approveComponent'
import parallelApproveComponent from './parallelApprove/component'
import branchSequenceFlowComponent from './branchSequnceFlow/component'
import chooseStaffPopup from './popup/container'
import store from '../redux/configureStore'

chooseStaffPopup()
global.branchSequenceFlowComponent = {render:branchSequenceFlowComponent}
global.parallelApproveComponent = {render:parallelApproveComponent}
global.approveComponent = {render:approveComponent}
global.reduxStore = store