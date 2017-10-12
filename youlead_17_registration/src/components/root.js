import React from 'react'
import { Provider } from 'react-redux'
import storeConfig from '../storeConfig'
const store = storeConfig()
export default Root = ()=>{
<Provider store={store}>
  <App store={store}/>
</Provider>
}