import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Link, Switch } from 'react-router-dom';
import Cookies from 'universal-cookie';

import App from './App'
import Reporte from './Reporte'

function Home(props) {

    const cookies = new Cookies();

    const cerrarSesion = () => {
        cookies.remove('id', {path: '/'});
        cookies.remove('nombre', {path: '/'});
        props.history.push("./");
    }

    useEffect(()=>{
        if(!cookies.get('id')){
          props.history.push('./');
        }
    },[]);

    return(
        <BrowserRouter>
        <div>
            <h1>Módulos</h1>
            <h3>Bievenido, {cookies.get('nombre')}</h3>
            <button className="btn btn-danger" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
            <div>
                <ul>
                    <li><Link to="/app">Personas Físicas</Link></li>
                    <li><Link to="/reporte">Reportes</Link></li>
                    <Route exact path="/app" component={App} />
                    <Route exact path="/reporte" component={Reporte} />
                </ul>
            </div>
        </div>
        </BrowserRouter>
    )
}

export default Home;