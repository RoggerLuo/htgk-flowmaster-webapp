import './userGuide/component'
import '../qingfont/iconfont.css'
import './global.less'
import './icon.less'
import './chooseStaffPopup.less'
import './basic.less'

import approveComponent from './approveComponent'
import parallelApproveComponent from './parallelApproveComponent'
import branchSequenceFlowComponent from './branchSequnceFlow/component'
import chooseStaffPopup from './chooseStaffPopup'
import store from '../redux/configureStore'

chooseStaffPopup()
global.branchSequenceFlowComponent = {render:branchSequenceFlowComponent}
global.parallelApproveComponent = {render:parallelApproveComponent}
global.approveComponent = {render:approveComponent}
global.reduxStore = store