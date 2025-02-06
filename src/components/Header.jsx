import { AppBar, Box, Container, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import { useMediaQuery } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import logo from '../assets/logo.png';
import React, { useState } from 'react'
import Login from './auth/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../store/features/userSlice';

const Header = () => {

    const dispatch = useDispatch();

    const isMobile = useMediaQuery("(max-width:600px)");

    const login = useSelector((state) => state.user.login)
    const users = useSelector((state) => state.user.users)

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleAuthAction = () => {
        if (login) {
            dispatch(setLogin(false))
        } else {
            setOpen(true);
        }
        handleCloseUserMenu();
    };
    
    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ width: isMobile ? "120px" : "280px", height: isMobile ? "30px" : "80px" }}>
                        <img src={logo} alt="logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title={users.name}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={users.image} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleAuthAction}>
                                {login ? "Cerrar Sesión" : "Ingresar"}
                            </MenuItem>
                            <Login open={open} setOpen={setOpen} />
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header