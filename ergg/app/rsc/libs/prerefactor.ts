import CharMastery from "@/server/parsed/charMastery.json";
import { getAvgGrade, getAvgTK, getAvgdeal, getGameCount, getKoreanWeapon, getSbCount } from "./refactor";
import { sortByGap } from "./assets";

export function getPremadeList(premade: any, general: any, startTierGroup: number, endTierGroup: number) {
    let newList: Array<any> = [];

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

                const WR = Math.floor(winGameCount / entireGameCount * 10000) / 100;
                const SR = Math.floor(sbCount / entireGameCount * 10000) / 100;
                const PR = Math.floor(entireGameCount / entireAllCharGameCount * 10000) / 100;

                const notPreEntireAllGameCount = getGameCount(general, 0, 0, startTierGroup, endTierGroup, 0);
                const notPreEntireGameCount = getGameCount(general, data.code, wcode + 1, startTierGroup, endTierGroup, 0);
                const notPrewinGameCount = getGameCount(general, data.code, wcode + 1, startTierGroup, endTierGroup, 1);
                const notPresbCount = getSbCount(general, data.code, wcode + 1, startTierGroup, endTierGroup);

                const notPremadeWR = Math.floor(notPrewinGameCount / notPreEntireGameCount * 10000) / 100;
                const notPremadeSR = Math.floor(notPresbCount / notPreEntireGameCount * 10000) / 100;
                const notPremadePR = Math.floor(notPreEntireGameCount / notPreEntireAllGameCount * 10000) / 100;

                const AvgDeal = Math.floor(getAvgdeal(premade, data.code, wcode + 1, startTierGroup, endTierGroup, 0));
                const AvgGrade = Math.floor(getAvgGrade(premade, data.code, wcode + 1, startTierGroup, endTierGroup) * 10) / 10;
                const AvgTK = Math.floor(getAvgTK(premade, data.code, wcode + 1, startTierGroup, endTierGroup, 0) * 10) / 10;
                
                const notPremadeAvgDeal = Math.floor(getAvgdeal(general, data.code, wcode + 1, startTierGroup, endTierGroup, 0));
                const notPremadeAvgGrade = Math.floor(getAvgGrade(general, data.code, wcode + 1, startTierGroup, endTierGroup) * 10) / 10;
                const notPremadeAvgTK = Math.floor(getAvgTK(general, data.code, wcode + 1, startTierGroup, endTierGroup, 0) * 10) / 10;
                

                if (entireGameCount !== 0 && PR > 0.2) {
                    newList.push({
                        code: data.code,
                        name: data.name,
                        weapon: (data.code === 27 ? "통합" : getKoreanWeapon(weapon.toString())), // 알렉스 통합 처리
                        WR: WR,
                        SR: SR,
                        PR: PR,
                        AvgDeal: AvgDeal,
                        AvgTK : AvgTK,
                        AvgGrade: AvgGrade,
                        general : {
                            WR: notPremadeWR,
                            SR: notPremadeSR,
                            PR: notPremadePR,
                            AvgDeal: notPremadeAvgDeal,
                            AvgTK : notPremadeAvgTK,
                            AvgGrade : notPremadeAvgGrade
                        }
                        
                    }); // 출시안되었거나 픽률 낮은 실험체 제거
                }
            }
        })
    });

    return newList.sort(sortByGap);
}