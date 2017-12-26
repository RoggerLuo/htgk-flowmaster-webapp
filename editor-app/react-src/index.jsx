
import './utils/connect2redux'
import '../ngEvent'
import './userGuide/component'

import approveComponent from './approveNode/Container'
import endPointComponent from './endPoint/Container'
import parallelApproveComponent from './parallelApprove/MainCompContainer'
import branchSequenceFlowComponent from './branchSequenceFlow/Component'
import branchNodeComponent from './branchNode/Container'
import popupStart from './popup'
import popupXStart from './popupX'
import saveButton from './saveButton/saveButton'
import myAlert from './alert/alert'
import mySpin from './alert/spin'
import manual from './manual/Container'
import circulation from './circulation/Container'
import custom from './custom/Container'
import subflow from './subflow/Container'
import sf from './sf'

//reduxStore要在下面这一堆东西执行之前执行

popupStart()
popupXStart()
myAlert()
mySpin()

global.saveButton = { render: saveButton, flag: true }
global.branchSequenceFlowComponent = { render: branchSequenceFlowComponent }
global.parallelApproveComponent = { render: parallelApproveComponent }
global.approveComponent = { render: approveComponent }
global.branchComponent = { render: branchNodeComponent }
global.endPointComponent = endPointComponent
global.manualCompInitializer = manual
global.circulationCompInitializer = circulation
global.customCompInitializer = custom
global.subflowCompInitializer = subflow
global.sequenceflowCompInitializer = sf

import zh from './i18n/zh'
import en from './i18n/en'
window.reactI18n = zh


import '../qingfont/iconfont.css'
import './global.less'
import './icon.less'
import './basic.less'
