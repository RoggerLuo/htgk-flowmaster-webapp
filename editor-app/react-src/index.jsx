global.rct = global.rct || {}
import './userGuide/component'

import './subflow'
import './multi'
import './branchSf'
import './usertask'
import './manual'
import './circulation'

import branchNodeComponent from './branchNode/Container'
import popupStart from './popup'
import popupXStart from './popupX'
import myAlert from './alert/alert'
import mySpin from './alert/spin'
import sf from './sf'


import saveButton from './saveButton/saveButton'
// global.saveButton = { render: saveButton, flag: true }
rct.isSaveBtnInit = false
rct.saveBtnInit = () => {
    if(!rct.isSaveBtnInit) saveButton()
}

popupStart()
popupXStart()
myAlert()
mySpin()

global.branchComponent = { render: branchNodeComponent }
global.sequenceflowCompInitializer = sf

import zh from './i18n/zh'
import en from './i18n/en'
window.reactI18n = zh


import '../qingfont/iconfont.css'
import './global.less'
import './icon.less'
import './basic.less'
import './common'
