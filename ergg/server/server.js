// const {mergeJSON} = require("../app/test/page";
const express = require('express'); // express 임포트
const { Schema } = require('mongoose')
const mongoose = require('mongoose');
const schedule = require('node-schedule');
const cors = require('cors');

const SCHEDULE_PORT = 8000;
const app = express(); // app생성
const axios = require('axios');

const gameSchema = new Schema({
    lastGameNum: {
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
    data: {
        required: true,
        type: Object,
    }
});

const itemSchema = new Schema({
    lastGameNum: {
        required: true,
        type: Number,
    },
    data: {
        required: true,
        type: Object,
    }
});

const Synergy = mongoose.model('synergys', synergySchema);
const Item = mongoose.model('items', itemSchema);
const Game = mongoose.model('games', gameSchema);

const CharMastery = require("./parsed/charMastery.json");
const CharacterData = require("./base/charData.json");
const SynergyData = require("./base/synergyData.json");
const ItemData = require("./base/itemData.json");
const ItemParsed = require("./parsed/itemData.json");

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
    Game.find()
        .sort({ _id: -1, }).then((docs) => {
            let datalist = [];
            docs.map((data, p) => {
                datalist[p] = data.data;
            });
            res.json(datalist);
        })
});

app.listen(SCHEDULE_PORT, () => {
    //29123763
    Game.find().sort({ _id: -1 }).limit(1).then((docs) => {
        UpdatedData = CharacterData;
        UpdatedSynergyData = SynergyData;
        UpdatedItemData = ItemData; // 초기화
        sendSyncRequests(docs[0].lastGameNum, 6);
    })

    //매 n초마다 수행!
    schedule.scheduleJob('10 41 * * * *', function () { });
}) // 타입스크립트로 전환 해야함


const API_KEY = 'i1C9XPLAWw44iInr1a8oA4KIZBDwpN8IaLzs9ba0';

function getWeaponNum(charCode, firstWeaponCode) {
    if (firstWeaponCode === 0) { // 잠수면 그냥 1번무기에 반영
        return 0;
    } else {
        let WeaponType = ItemParsed.find(e => e.code == firstWeaponCode).weaponType
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
let UpdatedItemData = ItemData;
let rankcount = 0;

let lastOrdinaryGame = 0;
let errorCount = 0;

function sendSyncRequests(startpoint, parallels) { // 병렬 실행화. 비동기 함수를 병렬로 임의만큼 동시호출하여 스피드업
    console.log(startpoint + " 부터 파싱 시작");
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
                if (response.data.code === 200) {
                    UpdateFunc(response);
                    lastOrdinaryGame < gameCode ? (lastOrdinaryGame = gameCode) : null;
                    errorCount = 0;
                } else {
                    errorCount++;
                }
                resolve("성공")
            }).catch(function (error) {
                if(error.response.status === 429) {
                    console.log("파싱주기가 너무 빠릅니다.");
                }
                rejects(error);
            });
    })
}

async function parseAsync(startpoint, parallels, repeatstart) { // 이 함수는 비동기(순차)처리됨
    let i = repeatstart;
    while (errorCount < 100 || startpoint + i < lastOrdinaryGame) {
        try {
            await getGameData(startpoint + i);
        } catch (err) { }
        i += parallels;
    }
    if (repeatstart === parallels) {
        console.log("최종점: " + lastOrdinaryGame + ", 1분간 반복대기.");
        setTimeout(() => {
            Game.updateOne({lastGameNum: startpoint},{
                lastGameNum: lastOrdinaryGame + 1,
                data: UpdatedData
            }).then((res) => {});
            Synergy.updateOne({lastGameNum: startpoint},{
                lastGameNum: lastOrdinaryGame + 1,
                data: UpdatedSynergyData
            }).then((res) => { });
            Item.updateOne({lastGameNum: startpoint},{
                lastGameNum: lastOrdinaryGame + 1,
                data: UpdatedItemData
            }).then((res) => {});
            console.log("종료.");
        }, 60000); // 병렬로 진행중인 함수들이 안끝났을수도 있어서 2분 대기
    }
}

async function UpdateFunc(response) {
    let game = response.data.userGames;

    try {
        if (game[0].matchingMode === 3 && game[0].serverName === "Seoul") { // 랭겜, 서버 세팅
            game.map((user, p) => {
                if (user.mmrBefore > 1000) { // 브론즈 이상 통계만 수집
                    let weaponNum = getWeaponNum(user.characterNum - 1, user.equipFirstItemForLog[0][0]);
                    let tierGroup = getTierGroup(user.mmrBefore, tierCut[0], tierCut[1]) - 1;

                    // 이하 각 유저에 대해 수집하는 지표들
                    // 등수 / 점수 / 평딜 / 팀킬 / (데스 or 데스 시점)

                    // 1. 등수
                    UpdatedData[user.characterNum - 1].grades[weaponNum][tierGroup][user.gameRank - 1]++;

                    if (user.escapeState === 3) { // 탈출 성공시
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
                        const index = UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup].findIndex(isExist);
                        const isTeam = game[userP].teamNumber === user.teamNumber && game[userP].characterNum !== user.characterNum;

                        if (index === -1) {
                            if (user.gameRank === 1 && isTeam) { // 1등이며 같은 팀일 경우
                                if (user.mmrGain > 0) {
                                    UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup].push([synergyCharCode, synergyWeaponCode, 1, 1, 1]);
                                } else {
                                    UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup].push([synergyCharCode, synergyWeaponCode, 1, 0, 1]);
                                }
                            } else if (user.mmrGain > 0 && isTeam) {
                                UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup].push([synergyCharCode, synergyWeaponCode, 0, 1, 1]);
                            } else if (isTeam) {
                                UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup].push([synergyCharCode, synergyWeaponCode, 0, 0, 1]);
                            }
                        } else {
                            if (user.gameRank === 1 && isTeam) { // 1등이며 같은 팀일 경우
                                // 가장 하위 차원의 객체에 [캐릭 코드, 무기 index(0~3), 승리 수, 순방 수, 이 캐릭터와 함께한 전체 판수] 로 기록됨.
                                UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup][index][2]++;
                            }
                            if (user.mmrGain > 0 && isTeam) {
                                UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup][index][3]++;
                            }
                            if (isTeam) {
                                UpdatedSynergyData[user.characterNum - 1].synergy[weaponNum][tierGroup][index][4]++;
                            }
                        }
                    }

                    // 이하 아이템 통계 기록 부분 원리는 시너지 기록과 같음

                    for (let itemType = 0; itemType < 5; itemType++) {
                        const findByCode = (e) => e.code === user.equipment[itemType];
                        const item = ItemParsed.find(findByCode);
                        if (user.equipment[itemType] !== undefined && item !== undefined) {
                            const isExist = (element) => element[0] == user.equipment[itemType];
                            const index = UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup].findIndex(isExist);

                            if (index === -1) { // 제대로 병합이 ㅏㅇㄴ되고있음
                                if (user.gameRank === 1) {
                                    if (user.mmrGain > 0) {
                                        UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup].push([user.equipment[itemType],itemType,item.grade, 1, 1, 1]);
                                    } else {
                                        UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup].push([user.equipment[itemType],itemType,item.grade,  1, 0, 1]);
                                    }
                                } else if (user.mmrGain > 0) {
                                    UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup].push([user.equipment[itemType],itemType,item.grade, 0, 1, 1]);
                                }
                                UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup].push([user.equipment[itemType],itemType,item.grade, 0, 0, 1]);
                            } else {
                                if (user.gameRank === 1) {
                                    UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup][index][3]++;
                                }
                                if (user.mmrGain > 0) {
                                    UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup][index][4]++;
                                }
                                UpdatedItemData[user.characterNum - 1].items[weaponNum][tierGroup][index][5]++;
                            }
                        }
                    }
                }
            });
            // matchingMode = 2 일반 3 랭크
            // matchingTeamMod = 3 스쿼드
            rankcount++;
        }
    } catch (e) {
        console.log(e);
    }
}