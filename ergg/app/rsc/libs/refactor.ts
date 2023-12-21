import { getColor, sortStandard } from "./assets";
import CharMastery from "@/server/parsed/charMastery.json";

export interface Data {
  code: number; // 험체 코드
  name: string; // 험체 이름 + 무기

  weapon: string;
  weaponNum: number;

  WR: number; // WinRate
  PR: number; // PickRate
  SR: number; // 점수+Rate

  WRGrade: string;
  PRGrade: string;

  data: PrimaryData | undefined;

  tier: number; //임시, 삭제예정
  color: string;
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
    case "Tonfa": return "톤파";
    case "Guitar": return "기타";
    case "Nunchaku": return "쌍절곤";
    case "Whip": return "채찍";
    case "Arcana": return "아르카나";
    case "Camera": return "카메라";
    case "VFArm": return "VF 의수";
    default: return weapon;
  }
}

export function getCharTier(np: number) {
  if (np >= 270) {
    return 0;
  } else if (np >= 190) {
    return 1;
  } else if (np >= 150) {
    return 2;
  } else if (np >= 90) {
    return 3;
  } else if (np >= 30) {
    return 4
  } else if (np <= -100) {
    return 6;
  } else {
    return 5;
  }
}

export function getAvgGrade(parsedData: Array<any>, code: number, weapon: number, starttiergroup: number, endtiergroup: number) {
  if (getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 0) === 0) { // Nan 값 처리
    return 0;
  }
  return (getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 1)
    + getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 2) * 2
    + getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 3) * 3
    + getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 4) * 4
    + getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 5) * 5
    + getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 6) * 6
    + getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 7) * 7
    + getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 8) * 8) / getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, 0)
}

export function getGameCount(parsedData: Array<any>, code: number, weapon: number, starttiergroup: number, endtiergroup: number, grade: number) {
  // 5차원 배열 분해코드라 난잡함
  // code parameter : 각 험체 코드, 0 : 전체
  // weapon parameter : 각 무기코드(순서), 0 : 전체
  // tiergroup parameter : 각 티어그룹 ex) start 5 end 1 => 플레 ~ 이터
  // grade parameter : 1 ~ 8 : 1 ~ 8 등, 9 : 탈출 , 0 : 전체(탈출 포함)
  let count = 0;

  if (code === 0) {
    if (weapon === 0) {
      parsedData.map((char: any, cp: number) => {
        char.grades.map((weapon: any, wp: number) => {
          if (starttiergroup > endtiergroup) {
            for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
              if (grade === 0) {
                weapon[starttiergroup - i - 1].forEach((element: number) => { // 탈출수 중복 안되도록 모든 등수 리턴할때는 POP();
                  count += element;
                });
                count -= weapon[starttiergroup - i - 1][8];
              } else {
                count += weapon[starttiergroup - i - 1][grade - 1];
              }
            }
          }
          else if (starttiergroup === endtiergroup) {
            if (grade === 0) {
              weapon[starttiergroup - 1].forEach((element: number) => {
                count += element;
              });
              count -= weapon[starttiergroup - 1][8];
            } else {
              count += weapon[starttiergroup - 1][grade - 1];
            }
          }
        });
      });
    } else {
      parsedData.map((char, p) => {
        if (starttiergroup > endtiergroup) {
          for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
            if (grade === 0) {
              char.grades[weapon - 1][starttiergroup - i - 1].forEach((element: number) => {
                count += element;
              });
              count -= char.grades[weapon - 1][starttiergroup - i - 1][8];
            } else {
              count += char.grades[weapon - 1][starttiergroup - i - 1][grade - 1];
            }
          }
        } else if (starttiergroup === endtiergroup) {
          if (grade === 0) {
            char.grades[weapon - 1][starttiergroup - 1].forEach((element: number) => {
              count += element;
            });
            count -= char.grades[weapon - 1][starttiergroup - 1][8];
          } else {
            count += char.grades[weapon - 1][starttiergroup - 1][grade - 1];
          }
        }
      });
    }
  } else {
    if (weapon === 0) {
      parsedData[code - 1].grades.map((weapon: any, wp: number) => {
        if (starttiergroup > endtiergroup) {
          for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
            if (grade === 0) {
              weapon[starttiergroup - i - 1].forEach((element: number) => {
                count += element;
              });
              count -= weapon[starttiergroup - i - 1][8];
            } else {
              count += weapon[starttiergroup - i - 1][grade - 1];
            }
          }
        } else if (starttiergroup === endtiergroup) {
          if (grade === 0) {
            weapon[starttiergroup - 1].forEach((element: number) => {
              count += element;
            });
            count -= weapon[starttiergroup - 1][8];
          } else {
            count += weapon[starttiergroup - 1][grade - 1];
          }
        }
      });
    } else {
      if (starttiergroup > endtiergroup) {
        for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
          if (grade === 0) {
            parsedData[code - 1].grades[weapon - 1][starttiergroup - i - 1].forEach((e: number) => {
              count += e;
            });
            count -= parsedData[code - 1].grades[weapon - 1][starttiergroup - i - 1][8];
          } else {
            count += parsedData[code - 1].grades[weapon - 1][starttiergroup - i - 1][grade - 1];
          }
        }
      } else if (starttiergroup === endtiergroup) {
        if (grade === 0) {
          parsedData[code - 1].grades[weapon - 1][starttiergroup - 1].forEach((e: number) => {
            count += e;
          });
          count -= parsedData[code - 1].grades[weapon - 1][starttiergroup - 1][8];
        } else {
          count += parsedData[code - 1].grades[weapon - 1][starttiergroup - 1][grade - 1];
        }
      }
    }
  }
  return count;
}

export function getAvgdeal(parsedData: Array<any>, code: number, weapon: number, starttiergroup: number, endtiergroup: number, grade: number) {
  // 10/22 여기 수정해야함. 여러 티어그룹 - 각 등수별 평딜 구할 때 값이 이상함
  // code, weapon 은 0일 수 없음
  let deal = 0;
  let targetgrades = getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, grade);

  if (starttiergroup > endtiergroup) {
    for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
      if (grade === 0) {
        parsedData[code - 1].avgdeal[weapon - 1][starttiergroup - i - 1].map((avgdealByGrade: number, gp: number) => {
          deal += avgdealByGrade;
        });
      } else {
        deal += parsedData[code - 1].avgdeal[weapon - 1][starttiergroup - i - 1][grade - 1];
      }
    }
  } else if (starttiergroup === endtiergroup) {
    if (grade === 0) {
      parsedData[code - 1].avgdeal[weapon - 1][starttiergroup - 1].map((avgdealByGrade: number, gp: number) => {
        deal += avgdealByGrade;
      });
    } else {
      deal += parsedData[code - 1].avgdeal[weapon - 1][starttiergroup - 1][grade - 1];
    }
  }
  return targetgrades !== 0 ? deal / targetgrades : 0;
}

export function getAvgTK(parsedData: Array<any>, code: number, weapon: number, starttiergroup: number, endtiergroup: number, grade: number) {
  // code, weapon 은 0일 수 없음
  let tk = 0;
  let targetgrades = getGameCount(parsedData, code, weapon, starttiergroup, endtiergroup, grade);

  if (starttiergroup > endtiergroup) {
    for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
      if (grade === 0) {
        parsedData[code - 1].tk[weapon - 1][starttiergroup - i - 1].map((tkByGrade: number, gp: number) => {
          tk += tkByGrade;
        });
      } else {
        tk += parsedData[code - 1].tk[weapon - 1][starttiergroup - i - 1][grade - 1];
      }
    }
  } else if (starttiergroup === endtiergroup) {
    if (grade === 0) {
      parsedData[code - 1].tk[weapon - 1][starttiergroup - 1].map((tkByGrade: number, gp: number) => {
        tk += tkByGrade;
      });
    } else {
      tk += parsedData[code - 1].tk[weapon - 1][starttiergroup - 1][grade - 1];
    }
  }
  return targetgrades !== 0 ? tk / targetgrades : 0;
}

export function getSbCount(parsedData: Array<any>, code: number, weapon: number, starttiergroup: number, endtiergroup: number) {
  // 순방 수 반환
  // code, weapon 은 0일 수 없음
  let count = 0;

  if (starttiergroup > endtiergroup) {
    for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
      count += parsedData[code - 1].scores[weapon - 1][starttiergroup - i - 1][0];
    }
  } else if (starttiergroup === endtiergroup) {
    count += parsedData[code - 1].scores[weapon - 1][starttiergroup - 1][0];
  }
  return count;
}

export function getSbScore(parsedData: Array<any>, code: number, weapon: number, starttiergroup: number, endtiergroup: number) {
  // 순방 점수 반환
  // code, weapon 은 0일 수 없음
  let score = 0;

  if (starttiergroup > endtiergroup) {
    for (let i = 0; i <= (starttiergroup - endtiergroup); i++) {
      score += parsedData[code - 1].scores[weapon - 1][starttiergroup - i - 1][1];
    }
  } else if (starttiergroup === endtiergroup) {
    score += parsedData[code - 1].scores[weapon - 1][starttiergroup - 1][1];
  }
  return score;
}

export function getNadjaPoint(char: Data) { // 티어 산출 밸런싱 필요
  let var1: number = char.data!.sbcount; // 
  let var2: number = char.data!.sbscore;
  let var3: number = char.data!.tkbygrade[0];
  let var4: number = char.WR;
  let var5: number = char.data!.avggrade;
  let var6: number = char.PR;
  if (var6 < 0.08) { return -100; } // 0.08% 픽률 아래인애들은 RIP
  return (var2 / var1 + var3 * 6 + var4 * 6 - (var5 - 3) * 40) * ((var6 + 1) / 2);
}

export function getListforTiergroup(parsedData: Array<any>, startTierGroup: number, endTierGroup: number) { // 우선순위 1 함수 가독성 및 효율 개선 필요, 
  // 티어그룹 플레+ 다이아+ 릴+ 추가 필요. function(startTierGroup, endTierGroup) 이런식으로 function(1, 0) 하면 이터 + function(2, 0) 하면 릴+ function (4, 3) 하면 플레만
  // 표본 수 확인가능하게 표시하기

  let newCharList: Array<Data> = [];

  if (startTierGroup === 0 && endTierGroup === 0) {
    // 초깃값 0,0 인 SSR시 빈 리스트 반환
    return newCharList;
  }

  parsedData.map((char, p) => {
    let weaponData = Object.values(CharMastery[p]);
    weaponData.shift(); // 첫 항목 (캐릭코드)날리고

    weaponData.map((weapon, wcode) => {
      if (weapon !== "None") {
        let properties: PrimaryData = {
          entiregamecount: getGameCount(parsedData, 0, 0, 8, 1, 0), // 전체 표본 수
          entiregamecountbytier: getGameCount(parsedData, 0, 0, startTierGroup, endTierGroup, 0), // 해당 티어그룹 내 전체 표본 수
          gamecountbygrade: [
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 0),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 1),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 2),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 3),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 4),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 5),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 6),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 7),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 8),
            getGameCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 9)],
          sbcount: getSbCount(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup),
          sbscore: getSbScore(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup),
          avgdealbygrade: [
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 0),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 1),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 2),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 3),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 4),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 5),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 6),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 7),
            getAvgdeal(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 8),],
          avggrade: getAvgGrade(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup),
          tkbygrade: [
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 0),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 1),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 2),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 3),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 4),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 5),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 6),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 7),
            getAvgTK(parsedData, char.code, wcode + 1, startTierGroup, endTierGroup, 8),],
        }

        let newData: Data = {
          code: char.code,
          name: char.name,
          weapon: (char.code === 27 ? "통합" : getKoreanWeapon(weapon.toString())),
          weaponNum: wcode, // 0~3임

          WR: properties.gamecountbygrade[0] === 0 ? 0 :
            Math.floor(properties.gamecountbygrade[1] / properties.gamecountbygrade[0] * 10000) / 100,
          PR: properties.entiregamecount === 0 ? 0 :
            Math.floor(properties.gamecountbygrade[0] / properties.entiregamecountbytier * 10000) / 100,
          SR: properties.gamecountbygrade[0] === 0 ? 0 :
            Math.floor(properties.sbcount / properties.gamecountbygrade[0] * 10000) / 100,

          WRGrade: "0/0",
          PRGrade: "0/0",

          nadjapoint: 0,
          tier: 0,
          color: "",

          data: properties
        };
        newData.nadjapoint = getNadjaPoint(newData);
        newData.tier = getCharTier(newData.nadjapoint);
        newData.color = getColor(newData.tier);
        newData.data?.gamecountbygrade[0] === 0 ? null : newCharList.push(newData); // 출시안된 실험체 제거
      }
    });

    const sortedByWR = [...newCharList].sort(sortStandard.wr);
    const sortedByPR = [...newCharList].sort(sortStandard.pr);

    newCharList.map((nc, ncp) => {
      newCharList[ncp].WRGrade = (sortedByWR.findIndex(e => e.code === nc.code && e.weaponNum === nc.weaponNum) + 1) + " / " + newCharList.length;
      newCharList[ncp].PRGrade = (sortedByPR.findIndex(e => e.code === nc.code && e.weaponNum === nc.weaponNum) + 1) + " / " + newCharList.length;
    })
  });

  return newCharList;
}