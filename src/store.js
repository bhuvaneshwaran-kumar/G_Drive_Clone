import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducers from './reducers'

const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const StoreProvider = ({ children }) => <Provider store={store}>{children}</Provider>

export default StoreProvider

