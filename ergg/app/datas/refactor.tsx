import Character from '../test/charData.json';
import CharMastery from '../test/charMastery.json';
import Data2 from '../test/charData3.json';

export function getKoreanWeapon(weapon: string) { // 영문 무기이름 들어가면 한국 무기이름 반환..
    switch (weapon) {
        case "OneHandSword": return "단검";
        case "TwoHandSword": return "양손검";
        case "Axe": return "도끼";
        case "DualSword": return "쌍검";
        case "Pistol": return "권총";
        case "AssaultRifle": return "돌격소총";
        case "SniperRifle": return "저격총";
        case "Rapier": return "레이피어";
        case "Spear": return "창";
        case "Hammer": return "망치";
        case "Bat": return "방망이";
        case "HighAngleFire": return "투척";
        case "DirectFire": return "암기";
        case "Bow": return "활";
        case "CrossBow": return "석궁";
        case "Glove": return "글러브";
        case "Tonfa": return "돈파";
        case "Guitar": return "기타";
        case "Nunchaku": return "쌍절곤";
        case "Whip": return "채찍";
        case "Arcana": return "아르카나";
        case "Camera": return "카메라";
        case "VFArm": return "VF 의수";
        default: return weapon;
    }
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

function getAvgGrade(code: number, weapon: number, starttiergroup: number, endtiergroup: number) {
    return (getGameCount([], code, weapon, starttiergroup, endtiergroup, 1)
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 2) * 2
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 3) * 3
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 4) * 4
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 5) * 5
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 6) * 6
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 7) * 7
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 8) * 8
        + getGameCount([], code, weapon, starttiergroup, endtiergroup, 9) * 4) / getGameCount([], code, weapon, starttiergroup, endtiergroup, 0)
}

function getGameCount(dataA: Array<any>, code: number, weapon: number, starttiergroup: number, endtiergroup: number, grade: number) {
    // 5차원 배열 분해코드라 난잡함
    // code parameter : 각 험체 코드, 0 : 전체
    // weapon parameter : 각 무기코드(순서), 0 : 전체
    // tiergroup parameter : 각 티어그룹, 0 : 전체
    // grade parameter : 1 ~ 8 : 1 ~ 8 등, 9 : 탈출 , 0 : 전체(탈출 포함)
    // 시발 좃댓다 티어구간 나누기 해야함
    let count = 0;

    if (code === 0) {
        if (weapon === 0) {
            Data2.map((char, cp) => {
                char.grades.map((weapon, wp) => {
                    if (starttiergroup > endtiergroup) {
                        for (let i = 0; i < starttiergroup - endtiergroup; i++) {
                            if (grade === 0) {
                                weapon[starttiergroup - i - 1].forEach(element => {
                                    count += element;
                                });
                            } else {
                                count += weapon[starttiergroup - i - 1][grade - 1];
                            }
                        }
                    }
                });
            });
        } else {
            Data2.map((char, p) => {
                if (starttiergroup > endtiergroup) {
                    for (let i = 0; i < starttiergroup - endtiergroup; i++) {
                        if (grade === 0) {
                            char.grades[weapon - 1][starttiergroup - i - 1].forEach(element => {
                                count += element;
                            });
                        } else {
                            count += char.grades[weapon - 1][starttiergroup - i - 1][grade - 1];
                        }
                    }
                }
            });
        }
    } else {
        if (weapon === 0) {
            Data2[code - 1].grades.map((weapon, wp) => {
                if (starttiergroup > endtiergroup) {
                    for (let i = 0; i < starttiergroup - endtiergroup; i++) {
                        if (grade === 0) {
                            weapon[starttiergroup - i - 1].forEach(element => {
                                count += element;
                            });
                        } else {
                            count += weapon[starttiergroup - i - 1][grade - 1];
                        }
                    }
                }
            });
        } else {
            if (starttiergroup > endtiergroup) {
                for (let i = 0; i < starttiergroup - endtiergroup; i++) {
                    if (grade === 0) {
                        Data2[code - 1].grades[weapon - 1][starttiergroup - i - 1].forEach(e => {
                            count += e;
                        });
                    } else {
                        count += Data2[code - 1].grades[weapon - 1][starttiergroup - i - 1][grade - 1];
                    }
                }
            }
        }
    }
    return count;
}

function getAvgdeal(code: number, weapon: number, starttiergroup: number, endtiergroup: number, grade: number) {
    // code, weapon 은 0일 수 없음
    let deal = 0;
    let targetgrades = 0;

    if (starttiergroup > endtiergroup) {
        for (let i = 0; i < starttiergroup - endtiergroup; i++) {
            if (grade === 0) {
                Data2[code - 1].avgdeal[weapon - 1][starttiergroup - i - 1].map((avgdealByGrade, gp) => {
                    deal += avgdealByGrade * Data2[code - 1].grades[weapon - 1][starttiergroup - i - 1][gp];
                    targetgrades += Data2[code - 1].grades[weapon - 1][starttiergroup - i - 1][gp];
                });
            } else {
                deal += Data2[code - 1].avgdeal[weapon - 1][starttiergroup - i - 1][grade - 1];
                targetgrades = Data2[code - 1].grades[weapon - 1][starttiergroup - i - 1][grade - 1];
            }
        }
    }
    return targetgrades !== 0 ? deal / targetgrades : 0;
}

function getAvgTK(code: number, weapon: number, starttiergroup: number, endtiergroup: number, grade: number) {
    // code, weapon 은 0일 수 없음
    let tk = 0;
    let targetgrades = 0;

    if (starttiergroup > endtiergroup) {
        for (let i = 0; i < starttiergroup - endtiergroup; i++) {
            if (grade === 0) {
                Data2[code - 1].tk[weapon - 1][starttiergroup - i  - 1].map((tkByGrade, gp) => {
                    tk += tkByGrade * Data2[code - 1].grades[weapon - 1][starttiergroup - i  - 1][gp];
                    targetgrades += Data2[code - 1].grades[weapon - 1][starttiergroup - i  - 1][gp];
                });
            } else {
                tk += Data2[code - 1].tk[weapon - 1][starttiergroup - i  - 1][grade - 1];
                targetgrades = Data2[code - 1].grades[weapon - 1][starttiergroup - i  - 1][grade - 1];
            }
        }
    }
    return targetgrades !== 0 ? tk / targetgrades : 0;
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


export interface Data {
    code: number; // 험체 코드
    name: string; // 험체 이름 + 무기

    WR: number; // WinRate
    PR: number; // PickRate
    SR: number; // 점수+Rate

    data: PrimaryData | undefined;

    tier: number; //임시, 삭제예정
    nadjapoint: number; // 나쟈 포인트, 각종 지표로 산출된 정수로 티어 산출시 사용
};

export interface PrimaryData { // 원시타입, 소숫점 두자리 내림 되지 않은 데이터들
    entiregamecount: number;
    entiregamecountbytier: number;
    gamecountbygrade: Array<number>;  // 각 등수 count 0은 전체
    tkbygrade: Array<number>;
    avgdealbygrade: Array<number>;

    sbcount: number;
    sbscore: number;
    avggrade: number;
};

function getNadjaPoint(char: Data) { // 티어 산출 밸런싱 필요
    let var1: number = char.data!.sbcount; // 
    let var2: number = char.data!.sbscore;
    let var3: number = char.data!.tkbygrade[0];
    let var4: number = char.WR;
    let var5: number = char.data!.avggrade;
    let var6: number = char.PR;
    return (var2 / var1 + var3 * 4 + var4 * 6 - (var5 - 3) * 30) * var6;
}

export function getListforTiergroup(startTierGroup: number, endTierGroup: number) { // 우선순위 1 함수 가독성 및 효율 개선 필요, 
    // 티어그룹 플레+ 다이아+ 릴+ 추가 필요. function(startTierGroup, endTierGroup) 이런식으로 function(1, 0) 하면 이터 + function(2, 0) 하면 릴+ function (4, 3) 하면 플레만
    // 표본 수 확인가능하게 표시하기
    let newCharList: Array<Data> = [];

    Data2.map((char, p) => {
        let weaponData = Object.values(CharMastery[p]);
        weaponData.shift(); // 첫 항목 (캐릭코드)날리고

        weaponData.map((weapon, wcode) => {
            if (weapon !== "None") {
                let properties: PrimaryData = {
                    entiregamecount: getGameCount([], 0, 0, 4, 0, 0), // 전체 표본 수
                    entiregamecountbytier: getGameCount([], 0, 0, startTierGroup, endTierGroup, 0), // 해당 티어그룹 내 전체 표본 수
                    gamecountbygrade: [
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 0),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 1),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 2),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 3),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 4),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 5),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 6),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 7),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 8),
                        getGameCount([], char.code, wcode + 1, startTierGroup, endTierGroup, 9)],
                    sbcount: getSbCount(char.code, wcode + 1, startTierGroup),
                    sbscore: getSbCount(char.code, wcode + 1, startTierGroup),
                    avgdealbygrade: [
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 0),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 1),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 2),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 3),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 4),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 5),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 6),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 7),
                        getAvgdeal(char.code, wcode + 1, startTierGroup, endTierGroup, 8),],
                    avggrade: getAvgGrade(char.code, wcode + 1, startTierGroup, endTierGroup),
                    tkbygrade: [
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 0),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 1),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 2),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 3),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 4),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 5),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 6),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 7),
                        getAvgTK(char.code, wcode + 1, startTierGroup, endTierGroup, 8),],
                }

                let newData: Data = {
                    code: char.code,
                    name: getKoreanWeapon(weapon.toString()) + ' ' + char.name,

                    WR: properties.gamecountbygrade[0] === 0 ? 0 :
                        Math.floor(properties.gamecountbygrade[1] / properties.gamecountbygrade[0] * 10000) / 100,
                    PR: properties.entiregamecount === 0 ? 0 :
                        Math.floor(properties.gamecountbygrade[0] / properties.entiregamecountbytier * 10000) / 100,
                    SR: properties.gamecountbygrade[0] === 0 ? 0 :
                        Math.floor(properties.sbcount / properties.gamecountbygrade[0] * 10000) / 100,

                    nadjapoint: 0,
                    tier: 0,

                    data: properties
                };
                newData.nadjapoint = getNadjaPoint(newData);
                newData.tier = getCharTier(newData.nadjapoint);
                newCharList.push(newData);
            }
        });
    });

    return newCharList;
}