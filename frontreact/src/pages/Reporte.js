import React, { useState, useCallback } from 'react'
import axios from 'axios';

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InVjYW5kMDAyMSIsInJvbGUiOiJEZXZlbG9wZXIiLCJuYmYiOjE2MTc4MTk2NzEsImV4cCI6MTYxNzgyMDg3MSwiaWF0IjoxNjE3ODE5NjcxLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQ5MjIwIiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo0OTIyMCJ9.HfHlC6G4wNxlD_oxtdL1sE64tMRXdWF6FMpW-iMR8ow';
const apiUrl = 'https://api.toka.com.mx/candidato/api/customers';

const authAxios = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

function Reporte() {
    const [users, setUsers] = useState([]);
    const [requestError, setRequestError] = useState();

    const fetchData = useCallback(async () => {
        try {
            const result = await authAxios.get(``);
            setUsers(result.data);
        } catch (err) {
            setRequestError(err.message);
        }
    })

    return(
        <div className="App">
            <h1>Reporte</h1>
            <button onClick={() => fetchData()}>Obtener Registros</button>
            {users.map(user => {
                return <p key={user.IdPersonaFisica}>{user.Nombre}</p>
            })}

            {requestError && <p className="error">{requestError}</p>}
        </div>
    )
}

export default Reporte;