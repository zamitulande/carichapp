import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import DataChats from '../../data/chats.json'
import { Box, Typography } from '@mui/material';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import Chats from './Chats';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setChat } from '../../store/features/chatSlice';

const ChatList = () => {

  const dispatch = useDispatch();

  
  const chatsStorage = useSelector((state) => state.chat.chat);
  const messageBoot = useSelector((state) => state.chat.messageBoot);
  const login = useSelector((state) => state.user.login);
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectUser = (chat) => {
    if(login){
      setSelectedChat(chat);
      setOpen(true);
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Inicie sesión para responder mensajes.',
      })
    }    
  }

  useEffect(() => {
    const handleGenerateChats = () => {
      const chats = DataChats.map((chat) => {
        const storedMessages = JSON.parse(localStorage.getItem(`chat_${chat.id}`)) || chat.messages;
        const chatData = {
          id: chat.id,
          name: chat.name,
          image: chat.image,
          messages: storedMessages
        };   
        return chatData;
      });
      dispatch(setChat(chats));
    };  
    handleGenerateChats();
  }, []);
  
  
  const getLastMessage = (chatId) => {
    const storedChat = JSON.parse(localStorage.getItem(`chat_${chatId}`)) || [];
    if (storedChat && storedChat.length > 0) {
      return storedChat.length > 0 ? storedChat[storedChat.length - 1] : null; //traer el último mensaje del localstorage
    } 
  }
  return (
    <>
      {chatsStorage.map((chat, index) => {
        const lastMessage = getLastMessage(chat.id);
        return (
        <Box key={chat.id}
          onClick={() => handleSelectUser(chat)}
          sx={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "flex-start", 
            gap: 1, 
            padding: 1.5, 
            backgroundColor: "#D0E8FF", 
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s ease", 
            "&:hover": {
              backgroundColor: "#A8D0FF"
            },
            borderBottom: "solid 1px black"
          }}
        >
          <img
            src={chat.image}
            alt="image"
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", margin: 0 }}>
            <Typography sx={{ fontSize: 20, fontWeight: "bold", padding:0 }}>
              {chat.name}
            </Typography>
            <Typography variant="span" sx={{margin:0}}>{lastMessage.text}</Typography>
              <Typography variant="span" sx={{mt:1, fontSize:15}}>
               ultima vez {lastMessage.time}
              </Typography>
          </Box>
         
        </Box>
        );
      })}
       <Chats open={open} setOpen={setOpen} chat={selectedChat} />
    </>
  )
}

export default ChatList