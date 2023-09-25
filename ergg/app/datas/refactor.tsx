import Character from '../test/charData.json';
import CharMastery from '../test/charMastery.json';
import Data1 from '../test/charData2.json';
import Data2 from '../test/charData3.json';

interface Data {
    code: number; // 험체 코드
    name: string; // 험체 이름 + 무기
    // tiergroup: number; // 티어그룹 - 1 : 이 데 미 , 2 : 다 , 3 : 플 , 4 : 골 , 0 오류

    WR: number; // WinRate
    PR: number; // PickRate
    SR: number; // 점수+Rate
    SbScore: number; // 총 변동점수
    SbCount: number; // 점수+ 수
    TK: number; // 팀킬 
    avgdeal: number; // 평딜
    avggrade: number; // 평순

    tier: number; //임시, 삭제예정
    nadjapoint: number; // 나쟈 포인트, 각종 지표로 산출된 정수로 티어 산출시 사용
};

export function getKoreanWeapon(weapon: string) { // 영문 무기이름 들어가면 한국 무기이름 반환..
    return weapon;
}

function getNadjaPoint(char: Data) { // 티어 산출 밸런싱 필요
    let var1: number = char.SbCount * char.PR; // 
    let var2: number = (char.SbScore * char.PR);
    let var3: number = char.TK;
    let var4: number = char.WR;
    let var5: number = char.avggrade;
    return (var1) / 1200 + (var2) / 1000 + var3 * 5 + var4 * 8 - (var5-3) * 40;
}

function getCharTier(np: number) {
    if (np >= 260) {
        return 0;
    } else if (np >= 210) {
        return 1;
    } else if (np >= 180) {
        return 2;
    } else if (np >= 140) {
        return 3;
    } else if (np >= 100) {
        return 4
    } else {
        return 5;
    }
}

function getAvgGrade(code: number, weapon: number, tiergroup: number) {
    return (getGameCount([], code, weapon, tiergroup, 1) 
    + getGameCount([], code, weapon, tiergroup, 2)*2 
    + getGameCount([], code, weapon, tiergroup, 3)*3 
    + getGameCount([], code, weapon, tiergroup, 4)*4 
    + getGameCount([], code, weapon, tiergroup, 5)*5 
    + getGameCount([], code, weapon, tiergroup, 6)*6 
    + getGameCount([], code, weapon, tiergroup, 7)*7 
    + getGameCount([], code, weapon, tiergroup, 8)*8 
    + getGameCount([], code, weapon, tiergroup, 9)*4) / getGameCount([], code, weapon, tiergroup, 0)
}

function getGameCount(dataA: Array<any>, code: number, weapon: number, tiergroup: number, grade: number) {
    // 5차원 배열 분해코드라 난잡함
    // code parameter : 각 험체 코드, 0 : 전체
    // weapon parameter : 각 무기코드(순서), 0 : 전체
    // tiergroup parameter : 각 티어그룹, 0 : 전체
    // grade parameter : 1 ~ 8 : 1 ~ 8 등, 9 : 탈출 , 0 : 전체(탈출 포함)
    let count = 0;

    if (code === 0) {
        if (weapon === 0) {
            Data2.map((char, cp) => {
                char.grades.map((weapon, wp) => {
                    if (tiergroup === 0) {
                        weapon.map((tg, tp) => {
                            if (grade === 0) {
                                tg.forEach(element => {
                                    count += element;
                                });
                            } else {
                                count += tg[grade - 1];
                            }
                        });
                    } else {
                        if (grade === 0) {
                            weapon[tiergroup - 1].forEach(element => {
                                count += element;
                            });
                        } else {
                            count += weapon[tiergroup - 1][grade - 1];
                        }
                    }
                });
            });
        } else {
            Data2.map((char, p) => {
                if (tiergroup === 0) {
                    char.grades[weapon - 1].map((tg, gp) => {
                        if (grade === 0) {
                            tg.forEach(element => {
                                count += element;
                            });
                        } else {
                            count += tg[grade - 1];
                        }
                    })
                } else {
                    if (grade === 0) {
                        char.grades[weapon - 1][tiergroup - 1].forEach(element => {
                            count += element;
                        });
                    } else {
                        count += char.grades[weapon - 1][tiergroup - 1][grade - 1];
                    }
                }
            });
        }
    } else {
        if (weapon === 0) {
            Data2[code - 1].grades.map((weapon, wp) => {
                if (tiergroup === 0) {
                    weapon.map((tg, tp) => {
                        if (grade === 0) {
                            tg.forEach(element => {
                                count += element;
                            });
                        } else {
                            count += tg[grade - 1];
                        }
                    });
                } else {
                    if (grade === 0) {
                        weapon[tiergroup - 1].forEach(element => {
                            count += element;
                        });
                    } else {
                        count += weapon[tiergroup - 1][grade - 1];
                    }
                }
            });
        } else {
            if (tiergroup === 0) {
                Data2[code - 1].grades[weapon - 1].map((tg, tp) => {
                    if (grade === 0) {
                        tg.forEach(element => {
                            count += element;
                        });
                    } else {
                        count += tg[grade - 1];
                    }
                });
            } else {
                if (grade === 0) {
                    Data2[code - 1].grades[weapon - 1][tiergroup - 1].forEach(e => {
                        count += e;
                    });
                } else {
                    count += Data2[code - 1].grades[weapon - 1][tiergroup - 1][grade - 1];
                }
            }
        }
    }
    return count;
}

function getAvgdeal(code: number, weapon: number, tiergroup: number, grade: number) {
    // code, weapon 은 0일 수 없음
    let avgdeal = 0;

    if (tiergroup === 0) {
        Data2[code - 1].avgdeal[weapon - 1].map((tg, tp) => {
            if (grade === 0) {
                tg.forEach(element => {
                    avgdeal += element;
                });
                avgdeal /= 8;
            } else {
                avgdeal += tg[grade - 1];
            }
            avgdeal /= 4;
        });
    } else {
        if (grade === 0) {
            Data2[code - 1].avgdeal[weapon - 1][tiergroup - 1].forEach(e => {
                avgdeal += e;
            });
            avgdeal /= 8;
        } else {
            avgdeal += Data2[code - 1].avgdeal[weapon - 1][tiergroup - 1][grade - 1];
        }
    }
    return avgdeal;
}

function getAvgTK(code: number, weapon: number, tiergroup: number, grade: number) {
    // code, weapon 은 0일 수 없음
    let tk = 0;

    if (tiergroup === 0) {
        Data2[code - 1].tk[weapon - 1].map((tg, tp) => {
            if (grade === 0) {
                tg.forEach(element => {
                    tk += element;
                });
                tk /= 8;
            } else {
                tk += tg[grade - 1];
            }
            tk /= 4;
        });
    } else {
        if (grade === 0) {
            Data2[code - 1].tk[weapon - 1][tiergroup - 1].forEach(e => {
                tk += e;
            });
            tk /= 8;
        } else {
            tk += Data2[code - 1].tk[weapon - 1][tiergroup - 1][grade - 1];
        }
    }
    return tk;
}

function getSbCount(code: number, weapon: number, tiergroup: number) {
    // 순방 수 반환
    // code, weapon 은 0일 수 없음
    let count = 0;

    if (tiergroup === 0) {
        Data2[code - 1].tk[weapon - 1].map((tg, tp) => {
            count += Data2[code - 1].scores[weapon - 1][tp][0];
        });
    } else {
        count = Data2[code - 1].scores[weapon - 1][tiergroup - 1][0];
    }
    return count;
}

function getSbScore(code: number, weapon: number, tiergroup: number) {
    // 순방 점수 반환
    // code, weapon 은 0일 수 없음
    let score = 0;

    if (tiergroup === 0) {
        Data2[code - 1].scores[weapon - 1].map((tg, tp) => {
            score += Data2[code - 1].scores[weapon - 1][tp][1];
        });
    } else {
        score += Data2[code - 1].scores[weapon - 1][tiergroup - 1][1];
    }
    return score;
} // 나중에 이 데이터에서 뽑아내는 함수 싹 다른 파일로 넘기고 전역Data 하나 param으로 받아서 계산하게 해야됨

export function getListforTiergroup(tiergroup:number) { // 함수 가독성 및 효율 개선 필요, 티어그룹 플레+ 다이아+ 릴+ 추가 필요.
    let newCharList: Array<Data> = [];

    Data2.map((char, p) => {
        let newData: Data = {
            code: char.code,
            name: CharMastery[p].weapon1 + ' ' + char.name,
            WR: Math.floor(getGameCount([], char.code, 1, tiergroup, 1) / getGameCount([], char.code, 1, tiergroup, 0) * 10000) / 100,
            PR: Math.floor(getGameCount([], char.code, 1, tiergroup, 0) / getGameCount([], 0, 0, tiergroup, 0) * 10000) / 100,
            SR: Math.floor(getSbCount(char.code, 1, tiergroup) / getGameCount([], char.code, 1, tiergroup, 0) * 10000) / 100,
            TK: getAvgTK(char.code, 1, tiergroup, 0),
            avgdeal: Math.floor(getAvgdeal(char.code, 1, tiergroup, 0)),
            SbScore: getSbScore(char.code, 1, tiergroup),
            SbCount: getSbCount(char.code, 1, tiergroup),
            avggrade: getAvgGrade(char.code, 1, 0),

            nadjapoint: 0,
            tier: 0
        };
        newData.nadjapoint = getNadjaPoint(newData);
        newData.tier = getCharTier(newData.nadjapoint);
        newCharList.push(newData);
        if (CharMastery[p].weapon2 !== "None") {
            let newData: Data = {
                code: char.code,
                name: CharMastery[p].weapon2 + ' ' + char.name,
                WR: Math.floor(getGameCount([], char.code, 2, tiergroup, 1) / getGameCount([], char.code, 2, tiergroup, 0) * 10000) / 100,
                PR: Math.floor(getGameCount([], char.code, 2, tiergroup, 0) / getGameCount([], 0, 0, tiergroup, 0) * 10000) / 100,
                SR: Math.floor(getSbCount(char.code, 2, tiergroup) / getGameCount([], char.code, 2, tiergroup, 0) * 10000) / 100,
                TK: getAvgTK(char.code, 2, tiergroup, 0),
                avgdeal: Math.floor(getAvgdeal(char.code, 2, tiergroup, 0)),
                SbScore: getSbScore(char.code, 2, tiergroup),
                SbCount: getSbCount(char.code, 2, tiergroup),
                avggrade: getAvgGrade(char.code, 2, 0),

                nadjapoint: 0,
                tier: 0
            };
            newData.nadjapoint = getNadjaPoint(newData);
            newData.tier = getCharTier(newData.nadjapoint);
            newCharList.push(newData);
        }
        if (CharMastery[p].weapon3 !== "None") {
            let newData: Data = {
                code: char.code,
                name: CharMastery[p].weapon3 + ' ' + char.name,
                WR: Math.floor(getGameCount([], char.code, 3, tiergroup, 1) / getGameCount([], char.code, 3, tiergroup, 0) * 10000) / 100,
                PR: Math.floor(getGameCount([], char.code, 3, tiergroup, 0) / getGameCount([], 0, 0, tiergroup, 0) * 10000) / 100,
                SR: Math.floor(getSbCount(char.code, 3, tiergroup) / getGameCount([], char.code, 3, tiergroup, 0) * 10000) / 100,
                TK: getAvgTK(char.code, 3, tiergroup, 0),
                avgdeal: Math.floor(getAvgdeal(char.code, 3, tiergroup, 0)),
                SbScore: getSbScore(char.code, 3, tiergroup),
                SbCount: getSbCount(char.code, 3, tiergroup, 0),
                avggrade: getAvgGrade(char.code, 3, 0),

                nadjapoint: 0,
                tier: 0
            };
            newData.nadjapoint = getNadjaPoint(newData);
            newData.tier = getCharTier(newData.nadjapoint);
            newCharList.push(newData);
        }
        if (CharMastery[p].weapon4 !== "None") {
            let newData: Data = {
                code: char.code,
                name: CharMastery[p].weapon4 + ' ' + char.name,
                WR: Math.floor(getGameCount([], char.code, 4, tiergroup, 1) / getGameCount([], char.code, 4, tiergroup, 0) * 10000) / 100,
                PR: Math.floor(getGameCount([], char.code, 4, tiergroup, 0) / getGameCount([], 0, 0, tiergroup, 0) * 10000) / 100,
                SR: Math.floor(getSbCount(char.code, 4, tiergroup) / getGameCount([], char.code, 4, tiergroup, 0) * 10000) / 100,
                TK: getAvgTK(char.code, 4, tiergroup, 0),
                avgdeal: Math.floor(getAvgdeal(char.code, 4, tiergroup, 0)),
                SbScore: getSbScore(char.code, 4, tiergroup),
                SbCount: getSbCount(char.code, 4, tiergroup),
                avggrade: getAvgGrade(char.code, 4, 0),

                nadjapoint: 0,
                tier: 0
            };
            newData.nadjapoint = getNadjaPoint(newData);
            newData.tier = getCharTier(newData.nadjapoint);
            newCharList.push(newData);
        }
    })

    return newCharList;
}