import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'


const formDataObject ={   
    type:'datagrid',
    colHeader:['姓名','组织','职位'],//'',
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

// <th><input type="checkbox" /></th>
const TrBody = (data) => {
    return data.map((el,index)=>{
        let active = ''
        if(index%2!=0){
            active="active"
        }
        return (
            <tr key={index} className={active}>
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
    <table className="table table-bordered" style={{marginLeft: '-1px',marginTop:'-1px'}}>
        <tbody>
            <TrHeader data={data.colHeader}/>
            {TrBody(data.data)}
        </tbody>
    </table>
)


const Component = ({title,confirm,content,display,dispatch,height}) => {
    const options = {
        
    }
    return (
        <div className="staff-list">
            <Table data = {formDataObject}/>
        </div>
    )
}
export default Component
// const mapStateToProps = (state) => {
//     return state.popup
// }

// const mapDispatchToProps = (dispatch) => {
//     return {dispatch}
// }

// const ComponentContainer = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Component)


// export default function(){
//     render(
//         <Provider store={store}>
//             <ComponentContainer />
//         </Provider>
//         ,
//         document.getElementById('hugePopup')
//     );
// }