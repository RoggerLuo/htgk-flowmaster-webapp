import ifNotInRepo from './ifNotInRepo'
export default function(shape){
    if(fm.branchSf.is(shape)){
        return ifNotInRepo('branch',shape,()=>{ //如果不在repo中，又是branchSf，肯定验证不通过
            fm.branchSf.emptyWarning(shape)
            return false
        })
    }
    return ifNotInRepo('sf',shape,()=>{
        return fm.sf.statusStrategy(shape,(describe)=>{ //如果不在repo中，肯定没有业务状态，不通过
            describe(shape)
            return false
        })
    })
}