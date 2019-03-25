import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.jason());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "welcome to my API"
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`listening on port ${port}....`);
});