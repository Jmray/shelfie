import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Form from './components/Form/Form';



export default (
    <Switch>
        <Route path='/add/:id' component={Form}/>
        <Route path='/add' component={Form}/>
        <Route path='/' component={Dashboard}/>
        
        
    </Switch>
)