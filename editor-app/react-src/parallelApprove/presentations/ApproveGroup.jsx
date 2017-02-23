import React,{createClass} from 'react';
import './style'

const ApproveGroup = ({add,del,delCharacter,modeSwitch}) => {
    if(modeSwitch == 'initial'){
        return (
            <SolidFrame> 
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组2</div>
                        <div></div>
                    </div>
                    <div style={{flex:'3.5'}}>
                        <div>添加审批人员</div>
                    </div>
                </div>
            </SolidFrame>
        )
    }else{
        return (
            <SolidFrame>
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组1</div>
                        <div><i className="icon qingicon icon-jiahao2fill"></i></div>
                    </div>
                    <div style={{flex:'3.5',whiteSpace:'normal'}}>
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                    </div>
                </div>
            </SolidFrame>
        )
    }
}

export default ApproveGroup
