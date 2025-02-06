import { Box, Button, Drawer, IconButton, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DataChats from '../../data/chats.json'
import { setChat } from "../../store/features/chatSlice";


const Chats = ({ open, setOpen, chat }) => {

   const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);


  const handleCloseDrawer = () => {
    setOpen(false);
  }

  //carga mensajes guardados en localstorage
  useEffect(() => {
      //primero buscar si hay mensajes guardados en localstorage
      const storedMessages = JSON.parse(localStorage.getItem(`chat_${chat.id}`))
      if (storedMessages) {
        setMessages(storedMessages);
      } else {
        //sino cargar mensajes iniciales del archivo JSON
        const chatData = DataChats.find((item) => item.id === chat.id);

        if (chatData) {
          // Cargar el mensaje inicial del archivo JSON
          const initialMessages = chatData.messages || [
            {
              text: chatData.messages[0].text,
              sender: "user",
              time: chatData.messages[0].time,
            },
          ];
          setMessages(initialMessages);
          localStorage.setItem(`chat_${chat.id}`, JSON.stringify(initialMessages));
        }
      }
  }, [chat]);

  const handleSendMessage = () => {
    const replyText = document.getElementById("message-input").value.trim();
    if (replyText === "") return;

    const newMessage = { text: replyText, sender: "me", time: new Date().toLocaleTimeString() };
    const updatedMessages = [...messages, newMessage];

    //guardar mensaje enviado en localStorage 
    localStorage.setItem(`chat_${chat.id}`, JSON.stringify(updatedMessages));

    //actualizar estado con el nuevo mensaje
    setMessages(updatedMessages);

    //respoder automaticamente
    setTimeout(() => {
      const botReply = { text: "Muchas gracias", sender: "user", time: new Date().toLocaleTimeString() };
      const updatedWithBotReply = [...updatedMessages, botReply];
      localStorage.setItem(`chat_${chat.id}`, JSON.stringify(updatedWithBotReply));
      setMessages(updatedWithBotReply);
      dispatch(setChat(chat));
    }, 5000);

    document.getElementById("message-input").value = "";
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseDrawer}
    >
      <Box
        sx={{
          width: 350,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          p: 2
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseDrawer}
          sx={{ alignSelf: "flex-end" }}
        >
          <CloseIcon />
        </IconButton>
        {chat && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <img
                src={chat.image}
                alt="User"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
              <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                {chat.name}
              </Typography>
            </Box>

            {/* Historial de mensajes */}
            <Box sx={{ flex: 1, overflowY: "auto", mb: 2 }}>
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: msg.sender === "me" ? "#d1e7fd" : "#f0f0f0",
                    p: 1,
                    marginLeft: msg.sender === "me" ? "auto" : 0,
                    borderRadius: 2,
                    mb: 1,
                    maxWidth: "80%",
                    alignSelf: msg.sender === "me" ? "flex-end" : "flex-start"
                  }}
                >
                  <Typography>{msg.text}</Typography>
                  <Typography sx={{ fontSize: "0.8rem", textAlign: "right", color: "#666" }}>
                    {msg.time}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Campo para responder */}
            <TextField
              fullWidth
              id="message-input"
              label="Escribe tu respuesta..."
              variant="outlined"
            />

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleSendMessage}
            >
              Enviar
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Chats