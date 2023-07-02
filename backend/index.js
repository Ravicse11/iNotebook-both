
const connectToMongo = require('./db.js');
const cors = require('cors')
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors())
const port = process.env.PORT;
// const port=5000;


// respond with "hello world" when a GET request is made to the homepage
// app.get('/', (req, res) => {
//     res.send('hello world Welcome to backend Hope you camplete as soon as possible');

// })
app.use('/api/note', require('./routes/note.js'));
app.use('/api/auth', require('./routes/auth.js'));
const start = async () => {
    try {
        await connectToMongo();
        app.listen(port, () => {
            console.log(`welcome to my channel  http://localhost:${port}`)
        });
    }
    catch (err) {
        console.log(err);
    }


};
start();


