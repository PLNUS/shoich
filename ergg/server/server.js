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

const synergySchema = new Schema({
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
const Synergy = mongoose.model('synergys', synergySchema);
const Game = mongoose.model('games', gameSchema);

const CharMastery = require("./charMastery.json");
const CharacterData = require("./charData.json");
const SynergyData = require("./synergyData.json");
const WeaponData = require("./weaponData.json");

function getTierGroup(mmr, eterCut, demiCut) {
    if (mmr >= eterCut) {
        return 1; // 이+
    } else if (mmr >= demiCut) {
        return 2; // 데
    } else if (mmr >= 6000) {
        return 3; // 미
    } else if (mmr >= 5000 && mmr < 6000) {
        return 4; // 다
    } else if (mmr >= 4000 && mmr < 5000) {
        return 5; // 플
    } else if (mmr >= 3000 && mmr < 4000) {
        return 6; // 골
    } else if (mmr >= 2000 && mmr < 3000) {
        return 7; // 실
    } else if (mmr >= 1000 && mmr < 2000) {
        return 8; // 브
    } else {
        return 0;
    }
}

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
    Game.find().sort({ _id: -1 }).limit(1).then((docs) => {
        console.log(docs[0].lastGameNum);
        UpdatedData = CharacterData; // 초기화
        sendSyncRequests(docs[0].lastGameNum, 8);
    })
    //매 n초마다 수행!
    schedule.scheduleJob('10 41 * * * *', function () {
        // Game.find().sort({ _id: -1 }).limit(1).then((docs) => {
        //     console.log(docs[0].lastGameNum);
        //     UpdatedData = CharacterData; // 초기화
        //     sendSyncRequests(docs[0].lastGameNum, 7);
        // })
    })
}) // 타입스크립트로 전환 해야함


const API_KEY = 'i1C9XPLAWw44iInr1a8oA4KIZBDwpN8IaLzs9ba0';

function getWeaponNum(charCode, firstWeaponCode) {
    if(firstWeaponCode === 0 ) { // 잠수면 그냥 1번무기에 반영
        return 0;
    } else {
        let WeaponType = WeaponData.find(e => e.code == firstWeaponCode).weaponType
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
                    // 여기 수정해야함 시발 병렬실행돼서 ㅈㄴ많이실행됨
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
                        Synergy.create({
                            lastGameNum: lastOrdinaryGame + 1,
                            versionMajor: versionMajor,
                            versionMinor: versionMinor,
                            data: UpdatedSynergyData
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
                        sendSyncRequests(point, 15); // %% 주의 필요 %%
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
            if (i % 1000 === 0) {
                console.log(i + "회 진행중")
            }
            await getGameData(startpoint + i);
        } catch (err) { }
        i += parallels;
    }
    if (repeatstart === parallels) {
        console.log("최종점 확인으로 종료.");
        setTimeout(() => {
            Game.create({
                lastGameNum: lastOrdinaryGame + 1,
                versionMajor: versionMajor,
                versionMinor: versionMinor,
                data: UpdatedData
            });
            Synergy.create({
                lastGameNum: lastOrdinaryGame + 1,
                versionMajor: versionMajor,
                versionMinor: versionMinor,
                data: UpdatedSynergyData
            });
        }, 60000); // 병렬로 진행중인 함수들이 안끝났을수도 있어서 2분 대기
    }
}

async function UpdateFunc(response) {
    let game = response.data.userGames;

    // matchingMode = 2 일반 3 랭크
    // matchingTeamMod = 3 스쿼드
    if (game[0].matchingMode === 3 && game[0].serverName === "Seoul") { // 랭겜, 서버 세팅
        game.map((user, p) => {
            if (user.mmrBefore > 1000) { // 브론즈 이상 통계만 수집
                let weaponNum = getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0]);
                let tierGroup = getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1;

                // 이하 각 유저에 대해 수집하는 지표들
                // 등수 / 점수 / 평딜 / 팀킬 / (데스 or 데스 시점)

                // 1. 등수
                UpdatedData[user.characterNum - 1].grades[weaponNum][tierGroup][user.gameRank - 1]++;

                if (user.escapeState === 1) { // 탈출인지 구분
                    UpdatedData[user.characterNum - 1].grades[weaponNum][tierGroup][8]++;
                }

                // 2. 점수
                if (user.mmrGain > 0) { // 점수 먹었을 경우
                    UpdatedData[user.characterNum - 1].scores[weaponNum][tierGroup][0]++;
                }
                // 점수 먹었던 안먹었던 총 점수변동 반영
                UpdatedData[user.characterNum - 1].scores[weaponNum][tierGroup][1] += user.mmrGain;

                // 가독성 위해 if문 두번 씀 그냥
                if (user.escapeState === 0) { // 탈출시 이상한 데이터 return함. %% 평딜 평킬 구할때는 탈출인 판수 빼고 산출 %%
                    // 3. 평딜
                    let targetGameCount = UpdatedData[user.characterNum - 1].grades[weaponNum][tierGroup][user.gameRank - 1];
                    // 해당 구간(티어그룹별, 무기별) 판수 카운트

                    let beforeAvgDeal = UpdatedData[user.characterNum - 1].avgdeal[weaponNum][tierGroup][user.gameRank - 1];

                    UpdatedData[user.characterNum - 1].avgdeal[weaponNum][tierGroup][user.gameRank - 1]
                        = (beforeAvgDeal * (targetGameCount - 1) + user.damageToPlayer) / targetGameCount; // 평딜 구하는 수식

                    // 4. TK(팀 킬수)
                    let beforeAvgTK = UpdatedData[user.characterNum - 1].tk[weaponNum][tierGroup][user.gameRank - 1];

                    UpdatedData[user.characterNum - 1].tk[weaponNum][tierGroup][user.gameRank - 1]
                        = (beforeAvgTK * (targetGameCount - 1) + user.teamKill) / targetGameCount;
                }

                // Q. 평딜이랑 TK 지표를 등수별로 수집해야 하는가?
                // 예상 가능한 사용처 - 전적검색 이후 우승시 평딜 , 우승시 팀킬 등으로 캐리력 등 계산,
                //                     티어산출 시 같은 딜러그룹(평원딜, 메이지, 브루저 등) 내에서 비교 반영
                // A. 일단 할 수 있으면 구체적으로 수집해보자


                /* =============================================  이하 synergyData  =============================================================== */

                for (let userP = 0; userP < game.length; userP++) {
                    const synergyCharCode = game[userP].characterNum;
                    const synergyWeaponCode = getWeaponNum(game[userP].characterNum - 1, game[userP].equipFirstItemForLog[0][0]);

                    const isExist = (element) => element[0] == synergyCharCode && element[1] == synergyWeaponCode;
                    const index = UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup].findIndex(isExist);
                    const isTeam = game[userP].teamNumber === user.teamNumber && game[userP].characterNum !== user.characterNum;

                    if (index === -1) {
                        if (user.gameRank === 1 && isTeam) { // 1등이며 같은 팀일 경우

                            // 가장 하위 차원의 객체에 [캐릭 코드, 무기 index(0~3), 승리 수, 순방 수, 이 캐릭터와 함께한 전체 판수] 로 기록됨.
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup].push([synergyCharCode, synergyWeaponCode, 1, 1, 1]);
                        } else if (user.mmrGain > 0 && isTeam) {
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup].push([synergyCharCode, synergyWeaponCode, 0, 1, 1]);
                        } else if (isTeam) {
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup].push([synergyCharCode, synergyWeaponCode, 0, 0, 1]);
                        }
                    } else {
                        if (user.gameRank === 1 && isTeam) { // 1등이며 같은 팀일 경우

                            // 가장 하위 차원의 객체에 [캐릭 코드, 무기 index(0~3), 승리 수, 순방 수, 이 캐릭터와 함께한 전체 판수] 로 기록됨.
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup][index][2]++;
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup][index][3]++;
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup][index][4]++;
                        } else if (user.mmrGain > 0 && isTeam) {
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup][index][3]++;
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup][index][4]++;
                        } else if (isTeam) {
                            UpdatedSynergyData[user.characterNum - 1].synergy[tierGroup][index][4]++;
                        }
                    }
                }

                // 3. 나를 죽인 캐릭터 기록 - 너무 난해해져서 잠정중단

                // let deathDetails = JSON.parse(user.deathDetails);
                // if (Object.keys(deathDetails).length !== 0) { // 1데스 이상일 경우
                //     let deathCount = 0;
                //     Object.values(deathDetails).forEach((d) => {
                //         deathCount += d; // 데스 수 총합
                //     })

                //     // KillDetails 로 가야 날 죽인 캐릭 + 무기 를 알수있는데 이는 최대 3개밖에 기록이안됨 ;; 불안정한 지표임
                //     for (let i = 1; i <= deathCount && i <= 3; i++) { // 데스 수 만큼 반복
                //         if (i !== 1) {
                //             const killerCharCode = getCharCodeByName(user[`killerCharacter${i}`]);
                //             const killerWeaponCode = getWeaponNumByName(getCharCodeByName(user[`killerCharacter${i}`]) - 1, user[`killerWeapon${i}`]);
                //             const killerTeam1 = game.find(e => e.userNum == user[`killerUserNum${i}`]);
                //             const killerTeamNum = killerTeam1.teamNumber;

                //             for (let userP = 0; userP < game.length; userP++) { // 할거면 여기서부터

                //             }
                //         } else {
                //             const killerCharCode = getCharCodeByName(user.killerCharacter);
                //             const killerWeaponCode = getWeaponNumByName(getCharCodeByName(user.killerCharacter) - 1, user.killerWeapon);

                //             const isExist = (element) => element[0][0] == killerCharCode && element[0][1] == killerWeaponCode;
                //             const index = UpdatedSynergyData[user.characterNum - 1].counter[tierGroup].findIndex(isExist);

                //             if (index === -1) { // 이미 시너지 데이터가 존재하는지
                //                 UpdatedSynergyData[user.characterNum - 1].counter[tierGroup]
                //                     .push([killerCharCode, killerWeaponCode, 1]); // 여기서 WeaponNum은 시작이 0임. (0,1,2,3)
                //             } else {
                //                 UpdatedSynergyData[user.characterNum - 1].counter[tierGroup][index][2]++;
                //             }
                //         }
                //     }
                // }
            }

        })

        rankcount++;
    } else if (game[0].matchingMode === 2) { }
}

const CharBaseData = require('./character.json');

function getCharCodeByName(name) {
    return CharBaseData.findIndex(x => x.name == name) + 1;
}

function getWeaponNumByName(code, wpname) {
    let list = Object.values(CharMastery[code]);
    return list.findIndex(x => x == wpname);
}