import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../redux/configureStore.js'

const formDataObject ={   
    type:'datagrid',
    colHeader:['','姓名','组织','职位'],
    rowHeader:[],
    data:[
        ['value1','value2','value3'],
        ['value4','value5','value6'],
        ['value7','value8','value9'],
        ['value10','value11','value12'],
        ['value10','value11','value12'],
        ['value10','value11','value12'],
        ['value10','value11','value12'],
        ['value10','value11','value12'],
        ['value10','value11','value12'],
        ['value10','value11','value12'],
    ]
}

const TrBody = (data) => {
    return data.map((el,index)=>{
        let active = ''
        if(index%2!=0){
            active="active"
        }
        return (
            <tr key={index} className={active}>
                <th><input type="checkbox" /></th>
                {
                    el.map((el2,index2)=>{
                        return (
                            <th key={index2}>{el2}</th>
                        )
                    })
                }
            </tr>
        )
    })
}

const TrHeader = ({data}) => {
    return (
        <tr>
            {
                data.map((el,index)=>{
                    return (
                        <th key={index} className="success">{el}</th>
                    )
                })
            }
        </tr>
    )
}

const Table = ({data}) => (
    <table className="table table-bordered">
        <tbody>
            <TrHeader data={data.colHeader}/>
            {TrBody(data.data)}
        </tbody>
    </table>
)



const HugePopUp = ({dispatch,visibleStatus}) => {
    const cancel = () => {
        dispatch({type:'closeBigPopupOfChooseStaff'})
    }
    

    return(
    <div className="huge-popup" style={{display:visibleStatus}}>
        <div className="huge-popup-visible">
            
            <div className="huge-popup-header">
                请选择
            </div>
            
            <div className="huge-popup-content">
                <div className="huge-popup-left">
                    <div className="folder">
                        <i className="icon qingicon icon-anzhuoxiala"></i>
                        <i className="icon qingicon icon-icon-test"></i>深圳恒拓高科信息技术有限公司
                    </div>
                    <div className="folder">
                        <i className="icon qingicon icon-anzhuoxiala"></i>
                        <i className="icon qingicon icon-icon-test"></i>深圳恒拓高科信息技术有限公司
                        <div className="folder">
                            <i className="icon qingicon icon-anzhuoxiala"></i>
                            <i className="icon qingicon icon-icon-test"></i>深圳恒拓高科信息技术有限公司
                        </div>

                    </div>
                    
                </div>
                <div className="huge-popup-middle">
                    <div className="search-container">
                        <input type="text" className="search-input form-control" placeholder="Text input" />
                    </div>
                    <Table data={formDataObject} />
                </div>
                <div className="huge-popup-right">
                    <div className="characters">
                        <div className="character">
                            <span className="name">张三</span><span>&nbsp;X</span>
                        </div>
                        或
                        <div className="character">
                            <span className="name">上两级领导</span><span>&nbsp;X</span>
                        </div>

                    </div>
                    
                </div>

            </div>
            <div className="huge-popup-footer">
                <div className="button-group">
                    <div className="cancel" onClick={cancel}>
                        取消
                    </div>
                    <div className="placeholder">
                    </div>

                    <div className="confirm">
                        确定
                    </div>
                </div>
            </div>

        </div>
    </div>
)}


const mapStateToProps = (state) => {
    return {visibleStatus:state.approve.bigPopupOfChooseStaff}
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const HugePopUpContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(HugePopUp)


export default function(){
    render(
        <Provider store={store}>
            <HugePopUpContainer />
        </Provider>
        ,
        document.getElementById('hugePopup')
    );
}