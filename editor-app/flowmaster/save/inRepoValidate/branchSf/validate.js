export default (repo, shape) => {
    const gateway = shape.incoming[0]
    if (fm.multi.is.gateway(gateway)) return true
    if (fm.manual.is.gateway(gateway)) return true
    if (shape.properties.defaultflow == 'true') return true
    if (valid(repo)) {
        return true
    }else{
        /* 如果有一个为为空值，整个条件都为空 */
        fm.branchSf.emptyWarning(shape)
        return false
    }
}

function valid(repo) {
    return !repo.conditions.some((condi, i) => {
        return condi.data.some((rule, index) => {
            if (dropdown_not_ok(rule)) return true
            if (input_not_ok(rule)) return true            
            return false
        })
    })   
}

function dropdown_not_ok(rule){
    return !(rule.entry1.value && rule.entry2.value && rule.entry3.value)  
} 

function input_not_ok(rule){
    if (typeof(rule.input) == 'object') {
        if (!rule.input.value) {
            return true
        }
        if (rule.input.value == '""') {
            return true
        }
    }
    if (rule.input == '""') {
        return true
    }
    return false
}