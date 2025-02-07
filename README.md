# Carichaap

aplicacion de mensajeria instantanea para atender clientes

-OPCION 1
instalacion y levantar aplicacion (OPCION DOCKER-COMPOSE)

1. instalar docker en tu equipo 
    - [@Installar docker](https://docs.docker.com/desktop/setup/install/windows-install/)
2. abrir terminal en raiz del proyecto
3. escribir el comando (docker compose up -d --build) ó (docker-compose up -d --build)
4. en un navegado acceder al puerto http://localhost:5173/


-OPCION 2
instalacion y levantar aplicacion (node v20.10.0 y npm v10.2.3)

1. intalar node - [@Descargar node](https://nodejs.org/es/download)
1. clonar repositorio - [@Clonar Carichapp](https://github.com/zamitulande/carichapp/tree/chat)
2. abrir terminal en raiz del proyecto
3. escribir el comando npm install
3. escribir el comando npm run dev
4. en un navegado acceder al puerto http://localhost:5173/


funcionalidades generales

1. pagina principal carga listado de chats con mensajes iniciales
2. para responder a cada chat el agente debe iniciar sesion
3. hay dos agentes predeterminado para ingresar
4. al hacer login ingresar:

        - email: juan@correo.com
          password: 123456

        - email: rios@correo.com
          password: 123456

5. al ingresar podra responder mensajes
6. la primera vez que responda el agente este tendra un mensaje predeterminado para enviar al cliente
7. podra apreciar si el cliente esta escribiendo y una notificacion para mensaje nuevo