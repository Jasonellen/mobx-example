
import React from 'react'
import {render} from 'react-dom'
import Routers from './routers/router'
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import * as stores  from './stores'
configure({ enforceActions: "observed" })

render((
	<Provider {...stores}>
		<Routers />
	</Provider>
), document.getElementById('root'))


// 开启局部热更新
if (module.hot) {
	module.hot.accept('./routers/router', () => {
		render((
			<Provider {...stores}>
				<Routers />
			</Provider>
		), document.getElementById('root'))
	})
}