import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/home" component={Home}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;