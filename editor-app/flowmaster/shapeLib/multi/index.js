import is from './is'
import branch from './branch'
import completeCheck from './completeCheck'
import { multiSelectCheck, gatewaySelectCheck } from './selectCheck'
global.fm = global.fm || {}
fm.multi = {}
fm.multi.is = is
fm.multi.branch = branch
fm.multi.completeCheck = completeCheck

fm.multi.selectCheck = {}
fm.multi.selectCheck.multi = multiSelectCheck 
fm.multi.selectCheck.gateway = gatewaySelectCheck 
