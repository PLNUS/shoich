
import CharData from "../charData.json";
import CharMastery from "../../rsc/libs/charMastery.json";
import { getKoreanWeapon } from "../../rsc/libs/refactor";

interface Synergy {
    code: number;
    weapon: string;
    name: string;
    synergyWin: number;
    synergySb: number;
    countWin: number;
    countSb: number;
    validityWin: boolean;
    validitySb: boolean;
    games: number;
}

export function getBaseData(data: Array<Array<number>>) {
    let formattedData: Array<Synergy> = [];
    let entireGames = 0;
    data.forEach(element => {
        entireGames += element[4];
    });;

    data.map((char, p) => {
        formattedData.push({
            code: char[0],
            weapon: getWeaponNameByCharCode(char[0], char[1]),
            name: getWeaponNameByCharCode(char[0], char[1]) + " " + getNameByCharCode(char[0]),
            synergyWin: Math.floor(char[2] / char[4] * 10000) / 100,
            synergySb: Math.floor(char[3] / char[4] * 10000) / 100,
            countWin: char[2],
            countSb: char[3],
            validitySb: char[4] > entireGames / 200,
            validityWin: char[4] > entireGames / 300,
            games: char[4]
        });
    });
    return formattedData;
}

export function getWeaponNameByCharCode(code: number, wpNum: number) {
    let targetWpList = Object.values(CharMastery[code - 1]);
    targetWpList.shift();

    return getKoreanWeapon(targetWpList[wpNum].toString());
}

export function getNameByCharCode(code: number) {
    return CharData[code - 1].name;
}

export function getSynergyList(data: Array<any>, charCode: number, weaponNum: number, startTierGroup: number, endTierGroup: number) {
    // charCode, weaponNum은 0일 수 없음.
    // tierGroup => 8 브   7 실 6 골 ~ 2 데 1 이
    const sList: Array<Array<number>> = [];
    console.log(startTierGroup + " 부터 " + endTierGroup);
    console.log(data[49].synergy[0]);
    for (let i = 0; i <= (startTierGroup - endTierGroup); i++) {
        console.log(startTierGroup - i - 1);
        let isExist;
        let index:number;
        data[charCode - 1].synergy[weaponNum][startTierGroup - i - 1].map((sData:any, p:number) => {
            isExist = (e:any) => e[0] === sData[0] && e[1] === sData[1];
            index = sList.findIndex(isExist);

            if (index === -1) {
                sList.push(sData);
            } else {
                sList[index][2] += sData[2];
                sList[index][3] += sData[3];
                sList[index][4] += sData[4];
            }
        });
    }
    //자꾸 resume(rerender) 됐을때 값이 변함 시발 이거 왜이럼? 그냥 데이터 가공을 서버사이드에서 하고 갈무리된걸 SSR 렌더링시 가져오는게 나을듯 수정 ㄱ
    //특정 상황 resume시 starttiergroup - 1 (i=0일때) 값이 추가로 적용됨.
    return sList;
}