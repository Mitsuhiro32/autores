import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthorTable from '../AuthorTable';
import AddAuthor from '../AddAuthor';
import EditAuthor from '../EditAuthor';
import { Button } from '@mui/material';

function App() {
  const [listaAutores, setListaAutores] = useState([]);
  const URL_BASE = 'https://autores-fhqr.onrender.com/api';
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${URL_BASE}/authors`)
      .then((response) => {
        setListaAutores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [listaAutores]);

  const agregarAutor = (nuevoAutor) => {
    setListaAutores([...listaAutores, nuevoAutor]);
  }

  const eliminarAutor = (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este autor?');

    if (confirmar) {
      axios.delete(`${URL_BASE}/author/delete/${id}`)
        .then((response) => {
          setListaAutores(listaAutores.filter((autor) => autor._id !== id));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <div className="App">
        <h1>Favorite Authors</h1>
        <Routes>
          <Route path='/' element={
            <>
              <Button variant="outlined" color="primary" onClick={() => navigate('/new')}>Add an Author</Button>
              <h2>We have quotes by:</h2>
              <AuthorTable authors={listaAutores} eliminarAutor={eliminarAutor} />
            </>
          } />
          <Route path='/new' element={<AddAuthor agregarAutor={agregarAutor} URL_BASE={URL_BASE} />} />
          <Route path='/edit/:id' element={<EditAuthor URL_BASE={URL_BASE} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
