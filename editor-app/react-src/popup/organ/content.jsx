import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../../redux/configureStore.js'
import Tree from './tree'
import StaffList from './staffList'
import Dropdown from '../../basicComp/Dropdown'
import './style'

const data = [
    {text:'一',value:'1'},
    {text:'二',value:'2'},
    {text:'三',value:'3'}
]

const data2 = [
    {text:'财务专员',value:'finance'},
    {text:'人事专员',value:'hr'},
    {text:'xx专员',value:'xx'}
]

const Component = ({title,confirm,content,display,dispatch,height}) => {    
    const choosed = (item)=>{
        dispatch({type:'dropdown1Choose',item})
    }
    const choosed2 = (item)=>{
        dispatch({type:'dropdown2Choose',item})
    }

    return (
        <div className="super-content">
            最近<Dropdown data={data} choosed={choosed}/>级分管<Dropdown data={data2} choosed={choosed2}/>
        </div>
    )
}
// const Component2 = (<div>
//             <input/>
//             <Tree /><StaffList />
//             <input/>
//         </div>)
// export default Component

  
const mapStateToProps = (state) => {
    return state.dropdown
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ComponentContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default ComponentContainer

// export default function(){
//     render(
//         <Provider store={store}>
//             <ComponentContainer />
//         </Provider>
//         ,
//         document.getElementById('hugePopup')
//     );
// }