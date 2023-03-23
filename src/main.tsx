import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import './global.pcss'
import {Provider} from "react-redux";
import {store} from "./redux/store"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
)
