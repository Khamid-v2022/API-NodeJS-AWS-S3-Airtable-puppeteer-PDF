const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const controller = require('./controller.js');

const app = express();

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.post('/', async(req, res) => {
    console.log(req);
    // const auth = req.body.auth;
    // if (auth == "IL8OKtZuP4uOU5JBo3uIoj2ySN3ai") {
    //     let response = await controller();
    //     res.send(response);
    // } else {
    //     return res.status(535).json({ status: 535, message: "Auth failed!" })
    // }

})

app.listen(3001, () => {
    console.log('Listening on port 3001');
})