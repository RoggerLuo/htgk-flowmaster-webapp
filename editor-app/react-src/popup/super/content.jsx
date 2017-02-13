import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../../redux/configureStore.js'
import Tree from './tree'
import StaffList from './staffList'
import Dropdown from '../../basicComp/Dropdown'
import './style'
const Component = ({title,confirm,content,display,dispatch,height}) => {
    const options = {
    }
    return (
        <div className="super-content">
            发起人的上<Dropdown />级领导
        </div>
    )
}
// const Component2 = (<div>
//             <input/>
//             <Tree /><StaffList />
//             <input/>
//         </div>)
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