import { template, defaultOption } from '../../../redux/reducers/branch/basic'
import judgeList from '../judge.conf.js'
// import ctrlList from '../ctrl.conf.js'

export default (conditions, chooseFactory, branch, key1, key2) => {
    const ruleEl = conditions && conditions[key1] && conditions[key1].data[key2] && conditions[key1].data[key2] || undefined
    if (!ruleEl) return null
    const dropdown2cate = ruleEl.entry2template || '0'
    const ctrlTemplate = ruleEl.ctrlTemplate || 'text'
        //二级联动
    switch (dropdown2cate) {
        case '0':
            template.entry2.options = [defaultOption()]
            break
        case '1':
            template.entry2.options = branch.formProperties || []
            break
        case '2':
            template.entry2.options = branch.userProperties || []
            break
        case '3':
            template.entry2.options = branch.environmentVariable || []
            break
    }
    //三级联动
    template.entry3.options = judgeList[ctrlTemplate]
        //设置选中项
    template.entry1.choosedOption = ruleEl.entry1
    template.entry2.choosedOption = ruleEl.entry2
    template.entry3.choosedOption = ruleEl.entry3
    template.input = ruleEl.input
    template.ctrlTemplate = ctrlTemplate
        //方法
    template.entry1.choose = optionItem => chooseFactory('entry1')(optionItem)
    template.entry2.choose = optionItem => chooseFactory('entry2')(optionItem)
    template.entry3.choose = optionItem => chooseFactory('entry3')(optionItem)
        //是否翻译
    template.entry1.usePut = true
    template.entry2.usePut = false
    template.entry3.usePut = false
    return template
}
