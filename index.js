const express = require('express'); //declarar variable
var app = express(); 	//creacion de la aplicacion
const port = process.env.PORT ?? 3000;
const lista_de_usuarios = [];
app.use(express.json());
function hello_handler(req, res) {
    res.send('bye');

}

function create_users(req, res) {
    console.log("Entre");
    const username = req.body.username;
    const password = req.body.password;
    const usuario = {
        username, password, fullName: req.body.fullName
    }
    lista_de_usuarios.push(usuario);
    res.status(201).send("usuario creado");

}

function hello_handler2(req, res) {
    res.send('hola papus');

}

function devolverUsarios(req, res){
    res.status(200).json(lista_de_usuarios);
}
function verificarUser(req, res){

    const usuario = req.body.username;
    const contra = req.body.password;
    const usuarioencontrado = lista_de_usuarios.find(buscarUser);
    function buscarUser(u){
        if (u.username === usuario && u.password === contra){
            return true;
        } else{
            return false;
        }
    }
    if (usuarioencontrado === undefined){
        res.status(401).send("no tiene permiso");
    } else{
        res.status(200).send("OK");
    }
}

app.get('/hello', hello_handler);
app.get('/hola', hello_handler2);
app.post('/users', create_users);
app.get('/users', devolverUsarios);
app.post('/user/login', verificarUser);
app.listen(port, function () {
    console.log(`server running on http://localhost:${port}`);
});
