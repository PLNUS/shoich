import CharMastery from "@/server/parsed/charMastery.json";
import { getGameCount, getKoreanWeapon, getSbCount } from "./refactor";
import { sortByGap } from "./assets";

export function getPremadeList(premade: any, general: any, startTierGroup: number, endTierGroup: number) {
    let newList:Array<any> = [];

    if (startTierGroup === 0 && endTierGroup === 0) {
      // 초깃값 0,0 인 SSR시 빈 리스트 반환
      return newList;
    }

    premade.map((data: any, p: number) => {
        let weaponData = Object.values(CharMastery[p]);
        weaponData.shift(); // 첫 항목 (캐릭코드)날리고

        weaponData.map((weapon, wcode) => {
            if (weapon !== "None") {
                const entireAllCharGameCount = getGameCount(premade, 0, 0, startTierGroup, endTierGroup, 0);
                const entireGameCount = getGameCount(premade, data.code, wcode + 1, startTierGroup, endTierGroup, 0);
                const winGameCount = getGameCount(premade, data.code, wcode + 1, startTierGroup, endTierGroup, 1);
                const sbCount = getSbCount(premade, data.code, wcode + 1, startTierGroup, endTierGroup);

                const WR = Math.floor(winGameCount / entireGameCount * 10000) / 100 ;
                const SR = Math.floor(sbCount / entireGameCount * 10000) / 100;
                const PR = Math.floor(entireGameCount / entireAllCharGameCount * 10000) / 100;

                const notPreEntireGameCount = getGameCount(general, data.code, wcode + 1, startTierGroup, endTierGroup, 0);
                const notPrewinGameCount = getGameCount(general, data.code, wcode + 1, startTierGroup, endTierGroup, 1);
                const notPresbCount = getSbCount(general, data.code, wcode + 1, startTierGroup, endTierGroup);

                const notPremadeWR = Math.floor(notPrewinGameCount / notPreEntireGameCount * 10000) / 100;
                const notPremadeSR = Math.floor(notPresbCount / notPreEntireGameCount * 10000) / 100;

                if (entireGameCount !== 0 && PR > 0.2){
                    newList.push({
                        code: data.code,
                        name: data.name,
                        weapon: getKoreanWeapon(weapon.toString()),
                        WR: WR,
                        SR: SR,
                        PR: PR,
                        WRGap: WR - notPremadeWR,
                        SRGap: SR - notPremadeSR
                    }); // 출시안되었거나 픽률 낮은 실험체 제거
                } 
            }
        })
    });

    return newList.sort(sortByGap);
}