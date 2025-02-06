import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, Modal, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Cancel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import usersData from '../../data/profiles';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setUsers, setLogin } from '../../store/features/userSlice';

const Login = ({ open, setOpen }) => {

    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const foundUser = usersData.find(
            (u) => u.email === user.email && u.password === user.password
        );
        if (foundUser) {
            dispatch(setUsers(foundUser))
            dispatch(setLogin(true));
            setOpen(false);
            setUser({
                email: '',
                password: ''
            });
        } else {
            setError('Correo o contraseña incorrectos');
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
        setError('');
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className='modal-style'>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseModal}
                    sx={{
                        left: '90%',
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <form onSubmit={handleSubmit}>
                    <FormControl
                        variant="standard"
                        fullWidth
                        style={{ paddingTop: 10 }}>
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Correo electronico
                        </InputLabel>
                        <TextField sx={{ border: 2, borderRadius: 1 }}
                            name="email"
                            type='email'
                            placeholder="Escribe aquí tu email"
                            value={user.email}
                            onChange={handleOnChange}
                            fullWidth
                            margin="normal"
                            size="small"
                            required
                        />
                    </FormControl>
                    <FormControl
                        variant="standard"
                        fullWidth
                        style={{ paddingTop: 10 }}>
                        <InputLabel shrink htmlFor="bootstrap-input">
                            Contraseña
                        </InputLabel>
                        <TextField sx={{ border: 2, borderRadius: 1 }}
                            name='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Escribe aquí tu contraseña"
                            value={user.password}
                            onChange={handleOnChange}
                            fullWidth
                            margin="normal"
                            size="small"
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </FormControl>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Grid container >
                        <Grid size={12}>
                            <Button
                                color='secondary'
                                type="submit"
                                fullWidth
                                sx={{
                                    height: '100%'
                                }}
                            >
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Modal>
    )
}

export default Login