import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import ChatList from './helpers/ChatList'

const Dashboard = () => {

    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <Box mt={isMobile ? 7 : 10}>
            <ChatList />
        </Box>
    )
}

export default Dashboard