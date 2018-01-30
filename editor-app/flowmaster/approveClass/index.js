import hidePrevCheck from './hidePrevCheck'
import getPreviousComp from './getPreviousComp'
import getSetting from './Setting'
import rule_not_display_last_node_specify from './rule_not_display_last_node_specify'
global.fm = global.fm || {}
fm.approve = {}
fm.approve.hideCheck = hidePrevCheck
// fm.approve.isHidePreviousSpecified = (currentRepo) => {
//     const cate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate || ''
//     if(!cate) return false
//     if(
//         !(
//             (cate=='boss') ||
//             (cate=="EMPLOYEE") ||
//             (cate=='customizeRole')
//         )
//     ){
//         return true
//     }
// }
fm.approve.getPreviousComp = getPreviousComp
fm.approve.getSetting = getSetting
fm.approve.rule_not_display_last_node_specify = rule_not_display_last_node_specify