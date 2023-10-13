
import CharData from "@/server/base/charData.json";
import CharMastery from "@/server/parsed/charMastery.json";
import { getKoreanWeapon } from "../../rsc/libs/refactor";
import ItemParsed from "@/server/parsed/itemData.json";

interface Item {
    code: number;
    itemtype: number;
    itemgrade: string;
    synergyWin: number;
    synergySb: number;
    countWin: number;
    countSb: number;
    validityWin: boolean;
    validitySb: boolean;
    games: number;
}

export function getFormattedItem(data: Array<any>) {
    let formattedData: Array<Item> = [];
    let entireGames = 0;
    data.forEach(element => {
        entireGames += element[5];
    });;

    data.map((char, p) => {
        formattedData.push({
            code: char[0],
            itemtype: char[1],
            itemgrade: char[2],
            synergyWin: Math.floor(char[3] / char[5] * 10000) / 100,
            synergySb: Math.floor(char[4] / char[5] * 10000) / 100,
            countWin: char[3],
            countSb: char[4],
            validitySb: char[5] > entireGames / 200,
            validityWin: char[5] > entireGames / 300,
            games: char[5]
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

function getWeaponNum(charCode:number, firstWeaponCode:number) {
    if (firstWeaponCode === 0) { // 잠수면 그냥 1번무기에 반영
        return 0;
    } else {
        let WeaponType = ItemParsed.find(e => e.code === firstWeaponCode)!.weaponType
        if (CharMastery[charCode].weapon1 == WeaponType) {
            return 0;
        } else if (CharMastery[charCode].weapon2 == WeaponType) {
            return 1;
        } else if (CharMastery[charCode].weapon3 == WeaponType) {
            return 2;
        } else if (CharMastery[charCode].weapon4 == WeaponType) {
            return 3;
        } else {
            return 4;//방어구
        }
    }
}

export function getItemList(data: Array<any>, charCode: number, weaponNum: number, startTierGroup: number, endTierGroup: number) {
    // charCode, weaponNum은 0일 수 없음.
    // tierGroup => 8 브   7 실 6 골 ~ 2 데 1 이
    const sList: Array<any> = [];
    for (let i = 0; i <= (startTierGroup - endTierGroup); i++) {
        let isExist;
        let index:number;
        data[charCode - 1].items[weaponNum][startTierGroup - i - 1].map((sData:any, p:number) => {
            isExist = (e:any) => e[0] === sData[0] && e[1] === sData[1] && e[2] === sData[2];
            index = sList.findIndex(isExist);

            if(sData[1] !== 0 || getWeaponNum(charCode - 1, sData[0]) === weaponNum) {
                if (index === -1) {
                    sList.push(sData);
                } else {
                    sList[index][3] += sData[3];
                    sList[index][4] += sData[4];
                    sList[index][5] += sData[5];
                }
            } // 시발 권아야로 우승하고 돌소끼는 년들 평균 배제
        });
    }
    //자꾸 resume(rerender) 됐을때 값이 변함 시발 이거 왜이럼? 그냥 데이터 가공을 서버사이드에서 하고 갈무리된걸 SSR 렌더링시 가져오는게 나을듯 수정 ㄱ
    //특정 상황 resume시 starttiergroup - 1 (i=0일때) 값이 추가로 적용됨.
    return sList;
}