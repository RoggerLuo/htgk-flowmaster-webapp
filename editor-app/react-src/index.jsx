global.rct = global.rct || {}
import './userGuide/component'

import './subflow'
import './multi'
import './branchSf'
import './usertask'
import './manual'
import './circulation'
import './branchNode'
import './sf'

import popupStart from './popup'
import popupXStart from './popupX'
import myAlert from './alert/alert'
import mySpin from './alert/spin'



import saveButton from './saveButton/saveButton'
rct.isSaveBtnInit = false
rct.saveBtnInit = () => {
    if(!rct.isSaveBtnInit) saveButton()
}

popupStart()
popupXStart()
myAlert()
mySpin()


import zh from './i18n/zh'
import en from './i18n/en'
window.reactI18n = zh


import '../qingfont/iconfont.css'
import './global.less'
import './icon.less'
import './basic.less'
import './common'
