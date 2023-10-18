const app = require('./server');

const port = 8080;

const server = app.listen(port, listening);
function listening() {
    console.log(server);
    console.log(`running on localhost: ${port}`);
}