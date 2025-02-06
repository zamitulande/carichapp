import { Box, Container } from '@mui/material'
import React from 'react'
import Chats from './helpers/Chats'
import ChatList from './helpers/ChatList'

const Dashboard = () => {
  return (
    <Container maxWidth="xl">
        <Box mt={2}>
            <Chats/>   
        </Box>
    </Container>
  )
}

export default Dashboard