const http = require('http');
const app = require('./app');
const cors = require('cors');
const port = process.env.PORT;
const server = http.createServer(app);
app.use(cors());

server.listen(port, () => {
    console.log(`Servidor inicializado en el puerto ${port}`)
});