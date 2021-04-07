import React, { useState, useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

function App() {

  const baseUrl = "https://localhost:44325/api/personasfisicas";
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [personaFisicaSeleccionada, setPersonaFisicaSeleccionada] = useState({
    idPersonaFisica: '',
    fechaRegistro: '',
    fechaActualizacion: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    rfc: '',
    fechaNacimiento: '',
    usuarioAgrega: '',
    activo: ''
  })

  const handleChange = e => {
    const {name, value} = e.target;
    setPersonaFisicaSeleccionada({
      ...personaFisicaSeleccionada,
      [name]: value
    });
    console.log(personaFisicaSeleccionada);
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const peticionGet = async() => {
    await axios.get(baseUrl)
    .then(response => {
      setData(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const peticionPost = async() => {
    delete personaFisicaSeleccionada.idPersonaFisica;
    personaFisicaSeleccionada.usuarioAgrega = parseInt(personaFisicaSeleccionada.usuarioAgrega);
    await axios.post(baseUrl, personaFisicaSeleccionada)
    .then(response => {
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error => {
      console.log(error);
    })
  }

  const peticionPut = async() => {
    personaFisicaSeleccionada.usuarioAgrega = parseInt(personaFisicaSeleccionada.usuarioAgrega);
    await axios.put(baseUrl+"/"+personaFisicaSeleccionada.idPersonaFisica, personaFisicaSeleccionada)
    .then(response => {
      var respuesta = response.data;
      var dataAuxiliar = data;
      dataAuxiliar.map(PersonaFisica => {
        if(PersonaFisica.idPersonaFisica===personaFisicaSeleccionada.idPersonaFisica) {
          PersonaFisica.fechaRegistro = respuesta.fechaRegistro;
          PersonaFisica.fechaActualizacion = respuesta.fechaActualizacion;
          PersonaFisica.nombre = respuesta.nombre;
          PersonaFisica.apellidoPaterno = respuesta.apellidoPaterno;
          PersonaFisica.apellidoMaterno = respuesta.apellidoMaterno;
          PersonaFisica.rfc = respuesta.rfc;
          PersonaFisica.fechaNacimiento = respuesta.fechaNacimiento;
          PersonaFisica.usuarioAgrega = respuesta.usuarioAgrega;
          PersonaFisica.activo = respuesta.activo;
        }
      })
      abrirCerrarModalEditar();
    }).catch(error => {
      console.log(error);
    })
  }

  const peticionDelete = async() => {
    await axios.delete(baseUrl+"/"+personaFisicaSeleccionada.idPersonaFisica)
    .then(response => {
      setData(data.filter(PersonaFisica => PersonaFisica.idPersonaFisica!==response.data));
      abrirCerrarModalEliminar();
    }).catch(error => {
      console.log(error);
    })
  }

  const seleccionarPersonaFisica = (personaFisica, caso) => {
    setPersonaFisicaSeleccionada(personaFisica);
    (caso==="Editar")?
    abrirCerrarModalEditar(): abrirCerrarModalEliminar();
  }

  useEffect(() => {
    peticionGet();
  },[])

  return (
    <div className="App">
      <br/><br/>
      <button onClick={() => abrirCerrarModalInsertar()} className="btn btn-success">Agregar Persona Física</button>
      <br/><br/>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha de Registro</th>
            <th>Fecha de Actualización</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>RFC</th>
            <th>Fecha de Nacimiento</th>
            <th>Usuario Agrega</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {data.map(PersonaFisica=>(
            <tr key={PersonaFisica.idPersonaFisica}>
              <td>{PersonaFisica.idPersonaFisica}</td>
              <td>{PersonaFisica.fechaRegistro}</td>
              <td>{PersonaFisica.fechaActualizacion}</td>
              <td>{PersonaFisica.nombre}</td>
              <td>{PersonaFisica.apellidoPaterno}</td>
              <td>{PersonaFisica.apellidoMaterno}</td>
              <td>{PersonaFisica.rfc}</td>
              <td>{PersonaFisica.fechaNacimiento}</td>
              <td>{PersonaFisica.usuarioAgrega}</td>
              <td>{PersonaFisica.activo}</td>
              <td>
                <button className="btn btn-primary" onClick={() => seleccionarPersonaFisica(PersonaFisica, "Editar")}>Editar</button>{"   "}
                <button className="btn btn-danger" onClick={() => seleccionarPersonaFisica(PersonaFisica, "Eliminar")}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>Agregar Persona Física</ModalHeader>
          <ModalBody>
            <div class="form-group">
              <label>Fecha de Registro: </label>
              <br />
              <input type="date" className="form-control" name="fechaRegistro" onChange={handleChange}/>
              <br />
              <label>Fecha de Actualización: </label>
              <br />
              <input type="date" className="form-control" name="fechaActualizacion" onChange={handleChange}/>
              <br />
              <label>Nombre: </label>
              <br />
              <input type="text" maxlength="50" className="form-control" name="nombre" onChange={handleChange}/>
              <br />
              <label>Apellido Paterno: </label>
              <br />
              <input type="text" maxlength="50" className="form-control" name="apellidoPaterno" onChange={handleChange}/>
              <br />
              <label>Apellido Materno: </label>
              <br />
              <input type="text" maxlength="50" className="form-control" name="apellidoMaterno" onChange={handleChange}/>
              <br />
              <label>RFC: </label>
              <br />
              <input type="text" maxlength="13" className="form-control" name="rfc" onChange={handleChange}/>
              <br />
              <label>Fecha de Nacimiento: </label>
              <br />
              <input type="date" className="form-control" name="fechaNacimiento" onChange={handleChange}/>
              <br />
              <label>Usuario Agrega: </label>
              <br />
              <input type="text" className="form-control" name="usuarioAgrega" onChange={handleChange}/>
              <br />
              <label>Activo: </label>
              <br />
              <input type="text" className="form-control" name="activo" onChange={handleChange}/>
              <br />
            </div>
          </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPost()}>Agregar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEditar}>
        <ModalHeader>Editar Persona Física</ModalHeader>
          <ModalBody>
            <div class="form-group">
              <label>ID: </label>
              <br />
              <input type="text" className="form-control" readOnly value={personaFisicaSeleccionada && personaFisicaSeleccionada.idPersonaFisica}/>
              <br />
              <label>Fecha de Registro: </label>
              <br />
              <input type="date" className="form-control" name="fechaRegistro" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.fechaRegistro}/>
              <br />
              <label>Fecha de Actualización: </label>
              <br />
              <input type="date" className="form-control" name="fechaActualizacion" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.fechaActualizacion}/>
              <br />
              <label>Nombre: </label>
              <br />
              <input type="text" maxlength="50" className="form-control" name="nombre" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.nombre}/>
              <br />
              <label>Apellido Paterno: </label>
              <br />
              <input type="text" maxlength="50" className="form-control" name="apellidoPaterno" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.apellidoPaterno}/>
              <br />
              <label>Apellido Materno: </label>
              <br />
              <input type="text" maxlength="50" className="form-control" name="apellidoMaterno" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.apellidoMaterno}/>
              <br />
              <label>RFC: </label>
              <br />
              <input type="text" maxlength="13" className="form-control" name="rfc" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.rfc}/>
              <br />
              <label>Fecha de Nacimiento: </label>
              <br />
              <input type="date" className="form-control" name="fechaNacimiento" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.fechaNacimiento}/>
              <br />
              <label>Usuario Agrega: </label>
              <br />
              <input type="text" className="form-control" name="usuarioAgrega" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.usuarioAgrega}/>
              <br />
              <label>Activo: </label>
              <br />
              <input type="text" className="form-control" name="activo" onChange={handleChange} value={personaFisicaSeleccionada && personaFisicaSeleccionada.activo}/>
              <br />
            </div>
          </ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={() => peticionPut()}>Editar</button>{"   "}
          <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás seguro que deseas eliminar el registro seleccionado de {personaFisicaSeleccionada && personaFisicaSeleccionada.nombre} {personaFisicaSeleccionada && personaFisicaSeleccionada.apellidoPaterno} {personaFisicaSeleccionada && personaFisicaSeleccionada.apellidoMaterno}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => peticionDelete()}>Sí</button>
          <button className="btn btn-secondary" onClick={() => abrirCerrarModalEliminar()}>No</button>
        </ModalFooter>
      </Modal>

    </div>
  );
}

export default App;
