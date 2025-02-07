import { Box, Button, Drawer, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import responses from "../../data/responses";
import { clearIsTypingChat, markChatAsUnread, setIsTypingChat, setMessageBoot } from "../../store/features/chatSlice";


const Chats = ({ open, setOpen, chat }) => {

  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [messages, setMessages] = useState([]);
  const [messageSend, setMessageSend] = useState("");

  const users = useSelector((state) => state.user.users)

  const handleCloseDrawer = () => {
    setOpen(false);
  }

  //carga mensajes guardados en localstorage
  useEffect(() => {
    if (chat) {
      const storedMessages = JSON.parse(localStorage.getItem(`chat_${chat.id}`)) || [];
      setMessages(storedMessages);

      dispatch(setMessageBoot(storedMessages));

      //si el chat tiene solo un mensaje, establecer el mensaje predeterminado
      if (storedMessages.length <= 1) {
        setMessageSend(`Hola, soy ${users.name}, ¿qué necesitas?`);
      } else {
        setMessageSend("");
      }
    }
  }, [chat]);

  const handleSendMessage = () => {
    if (messageSend === "") return;

    const newMessage = { text: messageSend, sender: "me", time: new Date().toLocaleTimeString() };
    const updatedMessages = [...messages, newMessage];

    //guardar mensaje enviado en localStorage 
    localStorage.setItem(`chat_${chat.id}`, JSON.stringify(updatedMessages));

    //actualizar estado con el nuevo mensaje
    setMessages(updatedMessages);
    setMessageSend("");

    dispatch(setIsTypingChat(chat.id));

    //respuesta automática después de 10 segundo
    setTimeout(() => {
      //elegit una respuesta aleatoria del response.jsom
      const randomIndex = Math.floor(Math.random() * responses.length);
      const randomResponse = responses[randomIndex];

      const botMessage = { text: randomResponse, sender: "bot", time: new Date().toLocaleTimeString() };
      const updatedWithBotResponse = [...updatedMessages, botMessage];

      localStorage.setItem(`chat_${chat.id}`, JSON.stringify(updatedWithBotResponse));
      setMessages(updatedWithBotResponse);
      dispatch(setMessageBoot(updatedWithBotResponse))

      dispatch(clearIsTypingChat(chat.id));
      dispatch(markChatAsUnread(chat.id));
    }, 10000);

  };

  if (!chat) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleCloseDrawer}
      disableEnforceFocus
      disableAutoFocus
    >
      <Box
        sx={{
          width: isMobile ? 380 : 500,
          height: "90%",
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

            <TextField
              type="text"
              value={messageSend}
              onChange={(e) => setMessageSend(e.target.value)}
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
              disabled={messageSend.trim() === ""}
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