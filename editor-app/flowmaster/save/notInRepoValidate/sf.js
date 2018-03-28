import isInRepo from './isInRepo'
export default function(shape){
    if(fm.branchSf.is(shape)){
        isInRepo('branch',shape,()=>{
            fm.branchSf.emptyWarning(shape)
            return false
        })
    }
    if(fm.sf.is(shape)){
        isInRepo('sf',shape,()=>{
            return fm.sf.statusStrategy(shape,(describe)=>{
                if(!repo.businessStatus.value){
                    describe(shape)
                    return false
                }else{
                    return true
                }
            })
        })
    } 
    return true  
}