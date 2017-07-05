import React,{createClass} from 'react';
import Dropdown from '../../basicComp/branch-dropdown'
import ctrlComponents from '../ctrl.conf.js'
/* ruleMode: 是否显示规则的 删除按钮 */
const Rule = ({dropdownData,ruleMode,del,oninput}) => {
    let border = '1px solid white'
    let display = 'none'
    if(ruleMode =='delete'){
        border = '1px solid red'//#dde4ef
        display = ''
    }else{
        border = '1px solid white'
        display = 'none'
    }
    const InputComp = ctrlComponents[dropdownData.ctrlTemplate]
    return (
        <div className="delete-frame" style={{border:border}}>
            <div style={{display:display,
                left: '22px',
                right: '22px',
                height: '66px',
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0.63)',
                zIndex: '999',
            }}></div>
            <div className="container-row">
                <Dropdown {...dropdownData.entry1}/>
                <Dropdown {...dropdownData.entry2}/>
                <Dropdown {...dropdownData.entry3}/>
                <i className="icon iconfont icon-guanbi2fill icon-red-close-for-rule" 
                    onClick={del}
                    style={{display:display}}>
                </i>
            </div>    
            <div className="container-row-placeholder"></div>
            <InputComp inputCompData = {}/>
        </div>
    )
}
/* <InputTest value={dropdownData.input} oninput={oninput}/> */
export default Rule
