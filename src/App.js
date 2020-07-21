import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Home, Contact } from './views'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Home} /> 
        <Route path='/contact' component={Contact} /> 
      </Switch>
    </Layout>
  );
}

export default App