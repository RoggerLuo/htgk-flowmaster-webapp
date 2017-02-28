import './userGuide/component'
import '../qingfont/iconfont.css'
import './global.less'
import './icon.less'
import './basic.less'

import approveComponent from './approveNode/Container'
import parallelApproveComponent from './parallelApprove/MainCompContainer'
import branchSequenceFlowComponent from './branchSequnceFlow/Component'
import popupStart from './popup/popupWrapContainer'
import store from '../redux/configureStore'
import saveButton from './saveButton/saveButton'


popupStart()
global.saveButton = {render:saveButton}
global.branchSequenceFlowComponent = {render:branchSequenceFlowComponent}
global.parallelApproveComponent = {render:parallelApproveComponent}
global.approveComponent = {render:approveComponent}
global.reduxStore = store