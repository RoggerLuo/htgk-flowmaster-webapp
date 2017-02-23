import React,{createClass} from 'react';
import './style'


const Component = (props) => {

    return(
        <div className="react-approve" >
            <SectionTitle text={'会签范围'}/>
            <Frame>

                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组1</div>
                        <div><i className="icon qingicon icon-jiahao2fill"></i></div>
                    </div>
                    <div style={{flex:'3.5',whiteSpace:'normal'}}>
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                        <Character index={1} text={'text'} />
                    </div>
                </div>
                
            </Frame>
            <Frame> 
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组2</div>
                        <div></div>
                    </div>
                    <div style={{flex:'3.5'}}>
                        <div>添加审批人员</div>
                    </div>
                </div>
            </Frame>            
            <div className="section-title">审批规则</div>
            <div className="content">需每个会签范围内至少一名代表审批通过方可会签通过</div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.approve
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default function(){
    render(
        <Provider store={store}>
            <ComponentContainer />
        </Provider>
        ,
        document.getElementById('parallelApprovePropertyCtrl')
    );
}