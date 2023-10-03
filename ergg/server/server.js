// const {mergeJSON} = require("../app/test/page";
const express = require('express'); // express 임포트
const { Schema } = require('mongoose')
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const cors = require('cors');

const SCHEDULE_PORT = 8010;
const app = express(); // app생성
const axios = require('axios');

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

const Game = mongoose.model('game', gameSchema)

const verSchema = new Schema({
    versionMajor: {
        required: true,
        type: Number,
    },
    versionMinor: {
        required: true,
        type: Number,
    }
});

const Version = mongoose.model('versions', verSchema)

const CharMastery = require("./charMastery.json");
const CharacterData = require("./charData.json");
const SynergyData = require("./synergyData.json");
const WeaponData = require("./weaponData.json");
const { getTierGroup } = require("./ertool");

let tierCut = [,];

app.use(cors({
    origin: true, // 출처 허용 옵션
}));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: false }));

app.get('/', function (req, res) {
    res.send('hello world!!');
});

axios.get('https://open-api.bser.io/v1/rank/top/19/3', {
    params: {},
    headers: { 'x-api-key': 'i1C9XPLAWw44iInr1a8oA4KIZBDwpN8IaLzs9ba0' }
}).then(function (response) {
    let eterCut = response.data.topRanks.find(e => e.rank === 200).mmr;
    let demiCut = response.data.topRanks.find(e => e.rank === 700).mmr;
    tierCut = [eterCut, demiCut];
    console.log(tierCut)
}).catch(function (e) {
    tierCut = [100000, 100000];
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
    .then(() => {
        console.log('MongoDB conected');
    })
    .catch((err) => {
        console.log(err);
    });

app.get('/recent', function (req, res) {
    Game.find().sort({ _id: -1 }).limit(1).then((docs) => {
        res.send(docs[0]);
    })
});

app.post('/games', function (req, res) { // 순수하게 게임 데이터들만 보냄
    console.log('games 요청 받음');
    Game.find({ versionMajor: req.body.versionMajor, versionMinor: req.body.versionMinor })
        .sort({ _id: -1, }).then((docs) => {
            let datalist = [];
            docs.map((data, p) => {
                datalist[p] = data.data;
            });
            res.json(datalist);
        })
});

app.post('/upload', function (req, res) {
    Game.create({
        lastGameNum: req.body.lastGameNum,
        versionMajor: req.body.versionMajor,
        versionMinor: req.body.versionMinor,
        data: req.body.data
    })
        .then(() => {
            res.send(200, "complited");
        })
})

app.post('/uploadver', function (req, res) {
    Version.create({
        versionMajor: req.body.versionMajor,
        versionMinor: req.body.versionMinor,
    })
        .then(() => {
            res.send(200, "complited");
        })
})

app.listen(SCHEDULE_PORT, () => {
    getGameData(28149510);
    //매 5초마다 수행!
    schedule.scheduleJob('0 0 21 * * *', function () {
        Game.find().sort({ _id: -1 }).limit(1).then((docs) => {
            console.log(docs[0].lastGameNum);
            UpdatedData = CharacterData; // 초기화
            sendSyncRequests(docs[0].lastGameNum, 7);
        })
    })
}) // 타입스크립트로 전환 해야함


const API_KEY = 'i1C9XPLAWw44iInr1a8oA4KIZBDwpN8IaLzs9ba0';

function getWeaponNum(charCode, firstWeaponCod) {
    let WeaponType = WeaponData.find(e => e.code === firstWeaponCode).weaponType
    if (CharMastery[charCode].weapon1 == WeaponType) {
        return 0;
    } else if (CharMastery[charCode].weapon2 == WeaponType) {
        return 1;
    } else if (CharMastery[charCode].weapon3 == WeaponType) {
        return 2;
    } else {
        return 3;
    }
}

let UpdatedData = CharacterData;
let UpdatedSynergyData = SynergyData;
let rankcount = 0;
let verChangedPoint = Infinity;

let versionMajor = 0;
let versionMinor = 0;

let lastOrdinaryGame = 0;
let errorCount = 0;

function sendSyncRequests(startpoint, parallels) { // 병렬 실행화. 비동기 함수를 병렬로 임의만큼 동시호출하여 스피드업
    for (let repeatstart = 1; repeatstart <= parallels; repeatstart++) {
        parseAsync(startpoint, parallels, repeatstart);
    }
}

async function getGameData(gameCode) {
    return new Promise((resolve, rejects) => {
        axios.get('https://open-api.bser.io/v1/games/' + gameCode, {
            params: {},
            headers: { 'x-api-key': API_KEY }
        })
            .then(function (response) {
                if (versionMajor === 0) {
                    versionMajor = response.data.userGames[0].versionMajor;
                    versionMinor = response.data.userGames[0].versionMinor;
                    UpdateFunc(response);
                    lastOrdinaryGame < gameCode ? lastOrdinaryGame = gameCode : null;
                } else if (versionMajor === response.data.userGames[0].versionMajor && versionMinor === response.data.userGames[0].versionMinor) {
                    UpdateFunc(response);
                    lastOrdinaryGame < gameCode ? lastOrdinaryGame = gameCode : null;
                } else { // 버전이 바뀌었을 경우
                    verChangedPoint = gameCode;
                    lastOrdinaryGame < gameCode ? lastOrdinaryGame = gameCode : null;
                    console.log("버전 변경점 확인, 잔존함수 2분 대기 이후 재파싱 시작.")
                    setTimeout(() => {
                        Game.create({
                            lastGameNum: lastOrdinaryGame + 1,
                            versionMajor: versionMajor,
                            versionMinor: versionMinor,
                            data: UpdatedData
                        });

                        versionMajor = response.data.userGames[0].versionMajor;
                        versionMinor = response.data.userGames[0].versionMinor;
                        UpdatedData = CharacterData; // 초기화
                        Version.create({
                            versionMajor: versionMajor,
                            versionMinor: versionMinor
                        });

                        let point = verChangedPoint;
                        verChangedPoint = Infinity; // 초기화
                        sendSyncRequests(point, 7);
                    }, 60000); // 병렬로 진행중인 함수들이 안끝났을수도 있어서 2분 대기 후 동작
                }
                errorCount = 0;
                resolve("성공")
            }).catch(function (error) {
                errorCount++;
                rejects(error);
            });
    })
}

async function parseAsync(startpoint, parallels, repeatstart) { // 이 함수는 비동기(순차)처리됨
    let i = repeatstart;
    while ((errorCount < 100 || startpoint + i < lastOrdinaryGame) && startpoint + i < verChangedPoint) {
        try {
            if (i % 2000 === 0) {
                console.log(i + "회 진행중")
            }
            await getGameData(startpoint + i);
        } catch (err) { }
        i += parallels;
    }
    if (repeatstart === parallels) {
        setTimeout(() => {
            Game.create({
                lastGameNum: lastOrdinaryGame + 1,
                versionMajor: versionMajor,
                versionMinor: versionMinor,
                data: UpdatedData
            });
        }, 60000); // 병렬로 진행중인 함수들이 안끝났을수도 있어서 2분 대기
        console.log("최종점 확인으로 종료.");
    }
}

function UpdateFunc(response) {
    let game = response.data.userGames;

    // matchingMode = 2 일반 3 랭크
    // matchingTeamMod = 3 스쿼드
    if (game[0].matchingMode === 3 && game[0].serverName === "Seoul") { // 랭겜, 서버 세팅
        game.map((user, p) => {
            // 이하 각 유저에 대해 수집하는 지표들
            // 등수 / 점수 / 평딜 / 팀킬 / (데스 or 데스 시점)

            // 1. 등수
            UpdatedData[user.characterNum - 1].grades[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][user.gameRank - 1]++;

            if (user.escapeState === 1) { // 탈출인지 구분
                UpdatedData[user.characterNum - 1].grades[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][8]++;
            }

            // 2. 점수
            if (user.mmrGain > 0) { // 점수 먹었을 경우
                UpdatedData[user.characterNum - 1].scores[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][0]++;
            }
            // 점수 먹었던 안먹었던 총 점수변동 반영
            UpdatedData[user.characterNum - 1].scores[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][1] += user.mmrGain;

            // 가독성 위해 if문 두번 씀 그냥
            if (user.escapeState === 0) { // 탈출시 이상한 데이터 return함. %% 평딜 평킬 구할때는 탈출인 판수 빼고 산출 %%
                // 3. 평딜
                let targetGameCount = UpdatedData[user.characterNum - 1].grades[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][user.gameRank - 1];
                // 해당 구간(티어그룹별, 무기별) 판수 카운트

                let beforeAvgDeal = UpdatedData[user.characterNum - 1].avgdeal[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][user.gameRank - 1];

                UpdatedData[user.characterNum - 1].avgdeal[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][user.gameRank - 1]
                    = (beforeAvgDeal * (targetGameCount - 1) + user.damageToPlayer) / targetGameCount; // 평딜 구하는 수식

                // 4. TK(팀 킬수)
                let beforeAvgTK = UpdatedData[user.characterNum - 1].tk[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][user.gameRank - 1];

                UpdatedData[user.characterNum - 1].tk[getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])][getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][user.gameRank - 1]
                    = (beforeAvgTK * (targetGameCount - 1) + user.teamKill) / targetGameCount;
            }

            // Q. 평딜이랑 TK 지표를 등수별로 수집해야 하는가?
            // 예상 가능한 사용처 - 전적검색 이후 우승시 평딜 , 우승시 팀킬 등으로 캐리력 등 계산,
            //                     티어산출 시 같은 딜러그룹(평원딜, 메이지, 브루저 등) 내에서 비교 반영
            // A. 일단 할 수 있으면 구체적으로 수집해보자


            /* =============================================  이하 synergyData  =============================================================== */

            if (user.gameRank === 1) {
                // 1. 같이 1등을 한 캐릭터 기록
                // 가장 하위 차원의 객체에 [[캐릭 코드, 무기 index(0~3)], 승리 수] 로 기록됨.

                game.map((teamUser, up) => {
                    if (user.teamNumber === teamUser.teamNumber && user.nickname !== teamUser.nickname) { // 팀원일 경우
                        const isExist = (element) => element[0] == [teamUser.characterNum, getWeaponNum(teamUser.characterNum - 1, teamUser.equipFirstItemForLog[0][0])];
                        const index = UpdatedSynergyData[user.characterNum - 1].synergy.win[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1].findIndex(isExist);

                        if (isExist === undefined) { // 이미 시너지 데이터가 존재하는지
                            UpdatedSynergyData[user.characterNum - 1].synergy.win[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1]
                                .push([[user.characterNum, getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])], 1]); // 여기서 WeaponNum은 시작이 0임. (0,1,2,3)
                        } else {
                            UpdatedSynergyData[user.characterNum - 1].synergy.win[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][index][1]++;
                        }
                    }
                });
            } else if (user.mmrGain > 0) {
                // 2. 같이 점수+를 한 캐릭터 기록
                // 가장 하위 차원의 객체에 [[캐릭 코드, 무기 index(0~3)], 승리 수] 로 기록됨.

                game.map((teamUser, up) => {
                    if (user.teamNumber === teamUser.teamNumber && user.nickname !== teamUser.nickname) { // 팀원일 경우
                        const isExist = (element) => element[0] == [teamUser.characterNum, getWeaponNum(teamUser.characterNum - 1, teamUser.equipFirstItemForLog[0][0])];
                        const index = UpdatedSynergyData[user.characterNum - 1].synergy.sb[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1].findIndex(isExist);

                        if (isExist === undefined) { // 이미 시너지 데이터가 존재하는지
                            UpdatedSynergyData[user.characterNum - 1].synergy.sb[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1]
                                .push([[user.characterNum, getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0])], 1]); // 여기서 WeaponNum은 시작이 0임. (0,1,2,3)
                        } else {
                            UpdatedSynergyData[user.characterNum - 1].synergy.sb[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][index][1]++;
                        }
                    }
                });
            }

            // 3. 나를 죽인 캐릭터 기록

            let deathDetails = JSON.parse(user.deathDetails);
            if (Object.values(deathDetails).length > 0) { // 1데스 이상일 경우
                let deathCount = 0;
                Object.values(deathDetails).forEach((d) => {
                    deathCount += d; // 데스 수 총합
                })

                for (let i = 1; i <= deathCount; i++) { // 데스 수 만큼 반복
                    if (i !== i) {
                        const killerCharCode = getCharCodeByName(user[`killerCharacter${i}`]);
                        const killerWeaponCode = getWeaponNumByName(getCharCodeByName(user[`killerCharacter${i}`]) - 1, user[`killerWeapon${i}`]);

                        const isExist = (element) => element[0] == [killerCharCode, killerWeaponCode];
                        const index = UpdatedSynergyData[user.characterNum - 1].counter[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1].findIndex(isExist)

                        if (isExist === undefined) { // 이미 시너지 데이터가 존재하는지
                            UpdatedSynergyData[user.characterNum - 1].counter[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1]
                                .push([[killerCharCode, killerWeaponCode], 1]); // 여기서 WeaponNum은 시작이 0임. (0,1,2,3)
                        } else {
                            UpdatedSynergyData[user.characterNum - 1].counter[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][index][1]++;
                        }
                        
                    } else {
                        const killerCharCode = getCharCodeByName(user.killerCharacter);
                        const killerWeaponCode = getWeaponNumByName(getCharCodeByName(user.killerCharacter) - 1, user.killerWeapon);

                        const isExist = (element) => element[0] == [killerCharCode, killerWeaponCode];
                        const index = UpdatedSynergyData[user.characterNum - 1].counter[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1].findIndex(isExist)

                        if (isExist === undefined) { // 이미 시너지 데이터가 존재하는지
                            UpdatedSynergyData[user.characterNum - 1].counter[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1]
                                .push([[killerCharCode, killerWeaponCode], 1]); // 여기서 WeaponNum은 시작이 0임. (0,1,2,3)
                        } else {
                            UpdatedSynergyData[user.characterNum - 1].counter[getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1][index][1]++;
                        }
                    }
                }
            }
        })


        rankcount++;
        
        console.log(UpdatedSynergyData);
        // appendCount('현재 파싱한 랭겜 수 : ' + rankcount);
        // appendJSON(JSON.stringify(UpdatedData, null, ''));
    } else if (game[0].matchingMode === 2) { }
}

const CharBaseData = require('./character.json');

function getCharCodeByName(name) {
    return CharBaseData.findIndex(x => x.name == name) + 1;
}

function getWeaponNumByName(code, wpname) {
    return Object.values(CharMastery[code]).pop().findIndex(x => x == wpname);
}