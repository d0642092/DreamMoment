const port = 3000;
const express = require("express");
const myApp = express();

// Set the static file directory
myApp.use(express.static('./public'));

myApp.get('/', (req, res) => {
    res.sendFile('index.html', { root: './html/' });
})
myApp.get('/culture', (req,res)=>{
    res.sendFile('culture.html',{root:'./html/'});
});
myApp.get('/learn', (req, res) => {
    res.sendFile('learn.html', { root: './html/' });
});
myApp.get('/donate', (req, res) => {
    res.sendFile('donate.html', { root: './html/' });
});
myApp.get('/competition', (req, res) => {
    res.sendFile('competition.html', { root: './html/' });
});
myApp.get('/volunteer', (req, res) => {
    res.sendFile('volunteer.html', { root: './html/' });
});
myApp.listen(port, () => console.log(`Example app listening on port ${port}!`));