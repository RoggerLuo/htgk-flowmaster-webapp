import getPreviousComp from './getPreviousComp'
import getSetting from './Setting'
global.fm = global.fm || {}
fm.approve = {}
fm.approve.isHidePreviousSpecified = (currentRepo) => {
    const cate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate || ''
    if(!cate) return false
    if(
        !(
            (cate=='boss') ||
            (cate=="EMPLOYEE") ||
            (cate=='customizeRole')
        )
    ){
        return true
    }
}
fm.approve.getPreviousComp = getPreviousComp
fm.approve.getSetting = getSetting