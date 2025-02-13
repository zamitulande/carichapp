import { Box, Button, Drawer, IconButton, TextField, Typography, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearIsTypingChat, markChatAsUnread, setIsTypingChat, setMessageBoot } from "../../store/features/chatSlice";
import { openIA } from "./openIA";


const Chats = ({ open, setOpen, chat, setSelectedChat }) => {

  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [messages, setMessages] = useState([]);
  const [messageSend, setMessageSend] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const users = useSelector((state) => state.user.users)
  const isTypingChats = useSelector((state) => state.chat.isTypingChats);

  const handleCloseDrawer = () => {
    setOpen(false);
    setSelectedChat(null);
  }

  //carga mensajes guardados en localstorage
  useEffect(() => {
    if (chat) {
      const storedMessages = JSON.parse(localStorage.getItem(`chat_${chat.id}`)) || [];
      setMessages(storedMessages);

      dispatch(setMessageBoot(storedMessages));

      //si el chat tiene solo un mensaje, establecer el mensaje predeterminado
      if (storedMessages.length <= 1) {
        setMessageSend(`Hola, soy ${users.name}, tu agente de servicio en que te puedo ayudar?`);
      } else {
        setMessageSend("");
      }
    }
  }, [chat]);

  useEffect(() => {
    if (messages.length > 0) {

      if (timeoutId) clearTimeout(timeoutId);
    
      const id = setTimeout(async () => {
        const lastMessage = messages[messages.length - 1];

        if (lastMessage.sender !== "bot") {
          dispatch(setIsTypingChat(chat.id));
          const botResponse = await openIA(lastMessage.text);

          const updatedMessages = [...messages, botResponse];
          localStorage.setItem(`chat_${chat.id}`, JSON.stringify(updatedMessages));
          dispatch(setMessageBoot(updatedMessages));

          dispatch(clearIsTypingChat(chat.id));
          dispatch(markChatAsUnread(chat.id));
        }
      }, 10000);

      setTimeoutId(id);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (messageSend === "") return;

    //mensaje enviado por el agente
    const newMessage = { text: messageSend, sender: "me", time: new Date().toLocaleTimeString() };
    const updatedMessages = [...messages, newMessage];

    //guardar mensaje enviado en localStorage 
   localStorage.setItem(`chat_${chat.id}`, JSON.stringify(updatedMessages));

    //actualizar estado con el nuevo mensaje
    setMessages(updatedMessages);
    setMessageSend("");

    dispatch(setIsTypingChat(chat.id));

    const botResponse = await openIA(messageSend);

    const updatedWithBotResponse = [...updatedMessages, botResponse];

    localStorage.setItem(`chat_${chat.id}`, JSON.stringify(updatedWithBotResponse));
    dispatch(setMessageBoot(updatedWithBotResponse));

    dispatch(clearIsTypingChat(chat.id));
    dispatch(markChatAsUnread(chat.id));

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
          width: isMobile ? 340 : 500,
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
            {/* header del chat */}

            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1
            }}
            >
              <img
                src={chat.image}
                alt="User"
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", margin: 0 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: 18 }}>
                  {chat.name}
                </Typography>
                {isTypingChats[chat.id] && (
                  <Typography color="notify" variant="body2" sx={{ fontWeight: "bold" }}>
                    Escribiendo...
                  </Typography>
                )}
              </Box>
            </Box>

            {/* historial de mensajes */}
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
              multiline
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