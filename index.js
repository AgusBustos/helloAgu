const express = require('express'); // Importar el módulo Express, que permite crear aplicaciones web.
var app = express(); // Crear una instancia de la aplicación Express.
const port = process.env.PORT ?? 3000; // Definir el puerto en el que se ejecutará el servidor, usando el valor de PORT del entorno o 3000 por defecto.
const lista_de_usuarios = []; // Crear una lista vacía para almacenar usuarios.

app.use(express.json()); // Habilitar el middleware para analizar el cuerpo de las solicitudes como JSON.

function hello_handler(req, res) { // Controlador para la ruta '/hello'
    res.send('bye'); // Responder con "bye" cuando se acceda a /hello.
}

function create_users(req, res) { // Controlador para la creación de usuarios mediante POST.
    console.log("Entre"); // Imprimir en la consola cuando se acceda a esta función.
    const username = req.body.username; // Obtener el nombre de usuario del cuerpo de la solicitud.
    const password = req.body.password; // Obtener la contraseña del cuerpo de la solicitud.
    const usuario = { // Crear un objeto de usuario con la información proporcionada.
        username, password, fullName: req.body.fullName
    }
    lista_de_usuarios.push(usuario); // Agregar el usuario a la lista.
    res.status(201).send("usuario creado"); // Responder con un código de estado 201 (Creado) y un mensaje.
}

function hello_handler2(req, res) {
    res.send('hola papus');

function devolverUsarios(req, res) { // Controlador para obtener la lista de usuarios.
    res.status(200).json(lista_de_usuarios); // Responder con un código de estado 200 (OK) y la lista de usuarios en formato JSON.
}

function verificarUser(req, res) { // Controlador para verificar las credenciales de inicio de sesión.
    const usuario = req.body.username; // Obtener el nombre de usuario del cuerpo de la solicitud.
    const contra = req.body.password; // Obtener la contraseña del cuerpo de la solicitud.
    const usuarioencontrado = lista_de_usuarios.find(buscarUser); // Buscar el usuario en la lista.

    function buscarUser(u) { // Función para buscar un usuario en la lista.
        if (u.username === usuario && u.password === contra) { // Comprobar si las credenciales coinciden.
            return true; // Si coinciden, devolver true.
        } else {
            return false; // Si no coinciden, devolver false.
        }
    }

    if (usuarioencontrado === undefined) { // Si no se encontró el usuario en la lista.
        res.status(401).send("no tiene permiso"); // Responder con un código de estado 401 (No autorizado) y un mensaje.
    } else {
        res.status(200).send("OK"); // Si se encontró el usuario, responder con un código de estado 200 (OK).
    }
}

app.get('/hello', hello_handler); // Asociar la función hello_handler a la ruta '/hello' con método GET.
app.get('/hola', hello_handler2); // Asociar la función hello_handler2 a la ruta '/hola' con método GET.
app.post('/users', create_users); // Asociar la función create_users a la ruta '/users' con método POST.
app.get('/users', devolverUsarios); // Asociar la función devolverUsarios a la ruta '/users' con método GET.
app.post('/user/login', verificarUser); // Asociar la función verificarUser a la ruta '/user/login' con método POST.

app.listen(port, function () { // Iniciar el servidor en el puerto especificado.
    console.log(`server running on http://localhost:${port}`); // Imprimir un mensaje en la consola indicando que el servidor está en funcionamiento.
});
