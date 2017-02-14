import React,{createClass} from 'react';
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../../../redux/configureStore.js'
import Tree from './tree'
import StaffList from './staffList'
import './style'
const Component = ({title,confirm,content,display,dispatch,height}) => {
    const options = {
    }
    // <input className="search"/>
    return (
        <div className="certain-person">
            <div className="search-container">
                <input type="text" className="search-input form-control" placeholder="搜索人员..." />
            </div>
            <div className="middle-container">
                <Tree /><StaffList />
            </div>
            <div className="search-container">
                <input type="text" className="choosed form-control" placeholder="未选择" />
            </div>

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