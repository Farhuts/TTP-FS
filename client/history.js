import {createMemoryHistory, createBrowserHistory} from 'history'

const history = createBrowserHistory()
// process.env.NODE_ENV === 'test'
//   ? createMemoryHistory()
// : createBrowserHistory()

export default history
