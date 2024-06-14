import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormAuthor from "../FormAuthor";
import { Button } from "@mui/material";

const EditAuthor = ({ URL_BASE }) => {
    const { id } = useParams();
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [authorNotFound, setAuthorNotFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL_BASE}/author/${id}`)
            .then((response) => {
                if (response.data.name === 'CastError') {
                    throw new Error('Autor no encontrado');
                }
                setName(response.data.name);
            })
            .catch((error) => {
                console.log(error);
                setAuthorNotFound(true);
            });
    }, [id, URL_BASE]);

    const updateAuthor = ({ name }) => {
        const URL = `${URL_BASE}/author/edit/${id}`;
        const author = { name };

        axios.put(URL, author)
            .then((response) => {
                console.log(response);
                setError('');
                setMessage('Autor actualizado');
            })
            .catch((error) => {
                console.log(error);
                setError(error.response.data);
                setMessage('Error al actualizar el autor');
            });
    }

    if (authorNotFound) {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Home</Button>
                <h2>Lo sentimos, pero no pudimos encontrar el autor que estás buscando.</h2>
                <p>¿Deseas agregar un autor nuevo a nuestra base de datos?</p>
                <Button variant="contained" color="primary" onClick={() => navigate('/new')}>Agregar autor nuevo</Button>
            </div>
        );
    }

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Home</Button>
            <h2>Edit this author</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <FormAuthor onSubmitFunction={updateAuthor} initialName={name} setMessage={setMessage} />
            {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
        </>
    );
}

export default EditAuthor;
