
export default (currentRepo) => {
    const cate = currentRepo.data && currentRepo.data[0] && currentRepo.data[0].cate || ''
    if(!cate) return false
    
    if(
        !(
            (cate=='boss') ||
            (cate=="EMPLOYEE") ||
            (cate=='customizeRole') ||
            (cate=='ORG')
        )
    ){
        return true
    }
}
