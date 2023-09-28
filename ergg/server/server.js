// import {mergeJSON} from "../app/test/page";
const express = require('express'); // express 임포트
const { Schema } = require('mongoose')
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const cors = require('cors');

const SCHEDULE_PORT = 8010;
const app = express(); // app생성

app.use(cors({
    origin: true, // 출처 허용 옵션
}));

app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb', extended: false}));

const gameSchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    versionMajor: {
        required: true,
        type: Number,
    },
    versionMinor: {
        required: true,
        type: Number,
    },
    data: {
        required: true,
        type: Object,
    }
});

const Game = mongoose.model('game', gameSchema);

app.get('/', function (req, res) {
    res.send('hello world!!');
});

mongoose
    .connect(
        'mongodb+srv://erdev:gvB8hZr0EUXeNYMV@eranalysis.usfpeze.mongodb.net/ERAnalysis?retryWrites=true&w=majority',
        {
            // useNewUrlPaser: true,
            // useUnifiedTofology: true,
            // useCreateIndex: true,
            // useFindAndModify: false,
        }
    )
    .then(() => console.log('MongoDB conected'))
    .catch((err) => {
        console.log(err);
    });

app.get('/recent', function (req, res) {
    Game.find().sort({_id:-1}).limit(1).then((docs) => {
        res.send(docs[0]);
      })
});

app.post('/games', function (req, res) { // 순수하게 게임 데이터들만 보냄
    Game.find({versionMajor : req.body.versionMajor, versionMinor : req.body.versionMinor})
        .sort({_id:-1,}).then((docs) => {
        let datalist = [];
        docs.map((data, p) => {
            datalist[p] = data.data;
        });
        res.json(datalist);
      })
});

app.post('/upload', function(req, res) {
    Game.create({
        lastGameNum : req.body.lastGameNum,
        versionMajor: req.body.versionMajor,
        versionMinor: req.body.versionMinor,
        data: req.body.data})
        .then(() => {
            res.send(200,"complited");
        })
})

app.listen(SCHEDULE_PORT, () => {
    //매 5초마다 수행!
    schedule.scheduleJob('*/5 * * * * *', function () {
        console.log("자 5초마다 드가자");
    })
}) // 타입스크립트로 전환 해야함