// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
let id = 1;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

// DEL LADO DEL CLIENTE
//fetch.post('localhost....', {author:...,title:...,contents:...})
//|---req---|                |------------- body ----------------|

// DEL LADO DEL SERVIDOR
// req = fecth.post(...)
// req.body = {author:...,title:...,contents:...}

server.post('/posts', (req, res) => {
    const { author, title, contents } = req.body;
    if (!author || !title || !contents) {
        const objJson = { error: "No se recibieron los parámetros necesarios para crear el Post" };
        return res.status(STATUS_USER_ERROR).json(objJson);
    } else {
        const newPost = {
            id: id++,
            author,
            title,
            contents,

        }
        posts.push(newPost);
        res.json(newPost);
    }
})

server.post('/posts/author/:author', (req, res) => {
    const { title, contents } = req.body;
    const { author } = req.params;

    if (!author || !title || !contents) {
        const objJson = { error: "No se recibieron los parámetros necesarios para crear el Post" };
        return res.status(STATUS_USER_ERROR).json(objJson);
    } else {
        const newPost = {
            id: id++,
            author,
            title,
            contents,

        }
        posts.push(newPost);
        res.json(newPost);
    }
})
//movies?s=rocky&&apy=123 ---> {s:rocky, apikey:123}
// /post?term=hola ---> requery ---> {term: 'hola'}
server.get('/posts', (req, res)=>{
    const { term }= req.query;
    if(term){
        const filtrados = posts.filter(P => P.title.includes(term) || P.contents.includes(term))
        return res.json(filtrados);
    }
    
        res.json(posts);
    
})

server.get('/posts/:author', (req, res)=>{
    const { author } = req.params;
    if (author) {
        const filtrados = posts.filter(P => P.author === author);
        if(filtrados.length === 0){
            return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"});
        }
        return res.json(filtrados);
    }

    
})

server.get('/posts/:author/:title', (req, res)=>{
    const { author, title } = req.params;
    if(author && title){
        const filtrados = posts.filter(P => P.author === author && P.title === title);
        if(filtrados.length === 0){
            return res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
        }
        return res.json(filtrados);
    }
})

server.put('/posts', (req, res)=>{

    const { id, title, contents } = req.body;

    if (!id || !title || !contents) {
        return res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    }

    const objPost = posts.find(P => P.id === id);

    if(!objPost){
        return res.status(STATUS_USER_ERROR).json({error: "No hay post el id"})
    }

    objPost.title = title;
    objPost.contents = contents;

    res.json(objPost);
})

server.delete('/posts', (req, res)=>{
    const { id } = req.body;
    if(!id){
        return res.status(STATUS_USER_ERROR).json({error: "Te olvidades del id"})
    }

    const objPost = posts.find(P => P.id === id);

    if(!objPost){
        return res.status(STATUS_USER_ERROR).json({error: "No hay post con el id"})
    }
   posts = posts. filter(P => P.id !== id);

   res.json({ success: true });
})

server.delete('/author', (req, res)=>{

    const { author } = req.body;

    if(!author) return res.status(STATUS_USER_ERROR).json({error: "Te olvidaste del autor"});

    const objAuthorPos= posts.filter(P => P.author === author);

    if(objAuthorPos.length === 0) return res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"});

    posts = posts.filter(P => P.author === author);

    res.json(objAuthorPos);

})
module.exports = { posts, server };
