const http = require('http');
const app = require('./app');
const cors = require('cors');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

server.listen(port, () => {
    console.log(`Servidor inicializado en el puerto ${port}`)
});