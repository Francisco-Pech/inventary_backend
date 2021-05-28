const http = require('http');
const app = require('./app');
const cors = require('cors');
const port = 3000 || process.env.PORT;
const server = http.createServer(app);
app.use(cors());


server.listen(port, () => {
    console.log(`Servidor inicializado en el puerto Hola ${port}`)
});