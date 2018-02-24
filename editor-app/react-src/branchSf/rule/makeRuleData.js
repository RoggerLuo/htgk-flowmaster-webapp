import { template, defaultOption } from '../../../redux/reducers/branch/basic'
import judgeList from '../judge.conf.js'
import { addUserFieldOptions } from '../userField.conf.js'
import i18n from '../../i18n'

export default (conditions, chooseFactory, branch, key1, key2) => {
    const currentRuleData = conditions && conditions[key1] && conditions[key1].data[key2] && conditions[key1].data[key2] || undefined
    if (!currentRuleData) return null


    const dropdown2cate = currentRuleData.entry2template || '0'
    //inputCtrlInfoData 来自于 reducer的action，是第二个下拉的选中项
    const rdxData =  currentRuleData.inputCtrlInfoData || { cate:'text'}
    

    // 这个是最后一个输入组件的 模版数据，是下拉选项，还是单行输入 等等
    let inputCtrlInfoData = Object.assign( {}, rdxData )
    if(inputCtrlInfoData.subform_type){ //如果是表单组件, 更新
        window.formProperties.forEach(el=>{
            if(el.value == inputCtrlInfoData.value){
                inputCtrlInfoData = el
            }
        })
    }
  
    //三级联动 //第三个下拉，判断符号，> = 
    template.entry3.options = judgeList[inputCtrlInfoData.cate] || judgeList.text
    if(inputCtrlInfoData.cate =='calculate'){
        template.entry3.options = judgeList[inputCtrlInfoData.rule.type] 
        //dateDiff //timeDiff //sum  //mean  //formula
    }

    //设置选中项
    template.entry1.choosedOption = currentRuleData.entry1
    template.entry2.choosedOption = currentRuleData.entry2
    template.entry3.choosedOption = currentRuleData.entry3
    template.input = currentRuleData.input
    template.inputCtrlInfoData = inputCtrlInfoData
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
