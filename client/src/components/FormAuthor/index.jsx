import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './FormAuthor.css';
import { useNavigate } from "react-router-dom";

const FormAuthor = ({ onSubmitFunction, initialName, setMessage}) => {
    const [name, setName] = useState(initialName);
    const navigate = useNavigate();

    useEffect(() => {
        setName(initialName);
    }, [initialName]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitFunction({ name });
        setName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <TextField
                    type="input"
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="standard"
                    onFocus={() => setMessage('')}
                />
            </div>
            <br />
            <div className="buttons">
                <Button type="submit" variant="contained" color="primary">Save</Button>
                <Button variant="contained" color="error" onClick={() => navigate('/')}>Cancel</Button>
            </div>
        </form>
    );
};

export default FormAuthor;