import axios from "axios";
import { useState } from "react";
import FormAuthor from "../FormAuthor";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const AddAuthor = ({ agregarAutor, URL_BASE }) => {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const addNewAuthor = ({ name }) => {
        const URL = `${URL_BASE}/author/new`;

        axios.post(URL, {
            name
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data);
                agregarAutor(response.data);
                setError('');
                setMessage('Autor agregado exitosamente!');
            })
            .catch((error) => {
                setError(error.response.data);
                console.log(error);
            });
    }

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => navigate('/')}>Home</Button>
            <h2>Add an Author</h2>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <FormAuthor onSubmitFunction={addNewAuthor} initialName={''} setMessage={setMessage} />
            {message && <div style={{ color: 'green', marginTop: '10px' }}>{message}</div>}
        </>
    )
};

export default AddAuthor;