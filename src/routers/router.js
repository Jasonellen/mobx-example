import React, {Component} from 'react';
import {
	Router,
	Route,
	Switch,
} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
const supportsHistory = 'pushState' in window.history
const browserHistory = createBrowserHistory()

import Home from '../containers/Home'
import Drag from '../containers/Drag'
import DragH from '../containers/DragH'
import DragBetween from '../containers/DragBetween'

class Routers extends Component {
	render() {
		return (
			<Router history={browserHistory} forceRefresh={!supportsHistory}>
				<Switch>
					<Route exact path="/" component={Home}></Route>
					<Route exact path="/Drag" component={Drag}></Route>
					<Route exact path="/DragH" component={DragH}></Route>
					<Route exact path="/DragBetween" component={DragBetween}></Route>
				</Switch>
			</Router>
		)
	}
}
export default Routers;
