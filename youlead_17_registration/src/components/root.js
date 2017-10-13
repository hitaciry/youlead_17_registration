import React from 'react'
import { Provider } from 'react-redux'
import storeConfig from '../storeConfig'

const store = storeConfig()

const Root = ()=>{
<Provider store={store}>
  <App store={store}/>
</Provider>
}
export default Root;