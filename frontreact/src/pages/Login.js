import React, {useEffect, useState} from 'react'
import md5 from 'md5';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import axios from 'axios';
import '../css/Login.css';

function Login(props) {

    const baseUrl="https://localhost:44325/api/usuarios";
    const cookies = new Cookies();

    const [form, setForm] = useState({
        correo:'',
        password: ''
    });

    const handleChange = e => {
        const {name, value} = e.target;
        setForm({
            ...form,
            [name]: value
        });
        console.log(form);
    }

    const iniciarSesion = async() => {
        await axios.get(baseUrl+`/${form.correo}/${md5(form.password)}`)
        .then(response => {
            return response.data;
        }).then(response => {
            if(response.length>0){
                var respuesta = response[0];
                console.log(respuesta);
                cookies.set('id', respuesta.id, {path: '/'});
                cookies.set('nombre', respuesta.nombre, {path: '/'});
                alert("Inicio de sesión exitoso.");
                props.history.push('/home');
            } else {
                alert("El correo o la contraseña no son correctos.");
            }
        })    
        .catch(error => {
            console.log(error);
        })
    }

    useEffect(()=>{
        if(cookies.get('id')){
          props.history.push('/home');
        }
    },[]);

    return(
        <div>
            <div className="containerPrincipal">
                <div className="containerLogin">
                    <div className ="form-group">
                        <label>Correo: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="correo"
                            onChange={handleChange}
                        />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={handleChange}
                        />
                        <br />
                        <button className="btn btn-primary" onClick={() => iniciarSesion()}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;