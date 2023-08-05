const express = require ('express'); //declarar variable
var app = express(); 	//creacion de la aplicacion
const port = process.env.PORT ?? 3000;
function hello_handler(req, res){
res.send('bye');

};
app.get('/hello', hello_handler);
app.listen(port, function(){
    console.log(`server running on http://localhost:${port}`);
});