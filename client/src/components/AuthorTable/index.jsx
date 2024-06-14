import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './AuthorTable.css';

const AuthorTable = ({ authors, eliminarAutor }) => {
    const navigate = useNavigate();
    return (
        <div className="App">
            <TableContainer component={Paper} style={{ width: '50%', margin: 'auto' }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Author</TableCell>
                            <TableCell>Actions Available</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.sort((a, b) => a.name.localeCompare(b.name)).map((author) => (
                            <TableRow key={author._id}>
                                <TableCell>{author.name}</TableCell>
                                <TableCell id='actions'>
                                    <Button variant="contained" color="secondary" onClick={() => { navigate(`/edit/${author._id}`) }}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={() => { eliminarAutor(author._id) }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default AuthorTable;