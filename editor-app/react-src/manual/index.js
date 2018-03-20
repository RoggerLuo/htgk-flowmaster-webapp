import component from './component'
import is from './is'
import completeCheck from './completeCheck'
import singleConnectCheck from './singleConnectCheck'

global.fm = global.fm || {}
fm.manual = {}
fm.manual.is = is
fm.manual.completeCheck = completeCheck
fm.manual.singleConnectCheck = singleConnectCheck
fm.manual.component = component