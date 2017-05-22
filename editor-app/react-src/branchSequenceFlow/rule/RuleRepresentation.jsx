import React,{createClass} from 'react';
import Dropdown from '../../basicComp/branch-dropdown'

/* 字典
    dropdownData : 给3个dropdown传递的数据组合
    ruleMode: 是否显示规则的 删除按钮
    del: 点击删除当前 规则
    oninput: 为了输入的时候保存文字
*/
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
            <div className="input-text-container">
                <input type='text' className="input-text" value={dropdownData.input} onChange={oninput}/>
            </div>
        </div>
    )
}
export default Rule
