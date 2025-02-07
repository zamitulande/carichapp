import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import DataChats from '../../data/chats.json'
import { Box, Typography } from '@mui/material';
import Chats from './Chats';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { markChatAsRead, setChat } from '../../store/features/chatSlice';

const ChatList = () => {

  const dispatch = useDispatch();


  const chatsStorage = useSelector((state) => state.chat.chat);
  const isTypingChats = useSelector((state) => state.chat.isTypingChats);
  const messageBoot = useSelector((state) => state.chat.messageBoot);
  const unreadMessages = useSelector((state) => state.chat.unreadMessages);

  const login = useSelector((state) => state.user.login);
  const [open, setOpen] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectUser = (chat) => {
    if (login) {
      setSelectedChat(chat);
      setOpen(true);
      dispatch(markChatAsRead(chat.id));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Inicie sesión para responder mensajes.',
      })
    }
  }

  useEffect(() => {
    const handleGenerateChats = () => {
      const chats = DataChats.map((chat) => {
        const storedMessages = JSON.parse(localStorage.getItem(`chat_${chat.id}`));

        //si no hay mensajes previos en localStorage, guardar los datos iniciales
        if (!storedMessages) {
          localStorage.setItem(`chat_${chat.id}`, JSON.stringify(chat.messages));
        }

        const chatData = {
          id: chat.id,
          name: chat.name,
          image: chat.image,
          messages: storedMessages || chat.messages,
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
              backgroundColor: "#f0f8ff",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f8f0"
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
              <Typography sx={{ fontSize: 20, fontWeight: "bold", padding: 0 }}>
                {chat.name}
              </Typography>
              
              {isTypingChats[chat.id] ? (
              <Typography color='notify' variant="span" sx={{ fontWeight: "bold"}}>
                Escribiendo...
              </Typography>
            ) : (
              <Typography variant="span">{lastMessage.text}</Typography>
            )}
            <Typography variant="span" sx={{ mt: 1, fontSize: 15 }}>
              Última vez {lastMessage.time}
            </Typography>
            </Box>
            {unreadMessages[chat.id] && (
              <Typography variant="span" color='notify' sx={{ fontWeight: "bold", marginLeft:'auto' }}>Nuevo</Typography>
            )}
          </Box>
        );
      })}
      <Chats open={open} setOpen={setOpen} chat={selectedChat} />
    </>
  )
}

export default ChatList