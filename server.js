const http = require('http');
const app = require('./app');
const cors = require('cors');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 202
  }));

server.listen(port, () => {
    console.log(`Servidor inicializado en el puerto ${port}`)
});