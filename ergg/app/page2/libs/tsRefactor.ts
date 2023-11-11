import TSList from "@/server/parsed/tacticalSkillData.json";

export interface TacticalSkill {
    name: string;
    desc: string;

    group: number;

    winRate: number;
    sbRate: number;
    pickRate: number;

    countWin: number;
    countSb: number;
    games: number;
}

export function getTacticalSkillsList(data: Array<any>, charCode: number, weaponNum: number, startTierGroup: number, endTierGroup: number) {
    // charCode, weaponNum은 0일 수 없음.
    // tierGroup => 8 브   7 실 6 골 ~ 2 데 1 이
    // console.log(data);

    const tList: Array<TacticalSkill> = [];
    let entireGames: number = 0;

    for (let i = 0; i <= (startTierGroup - endTierGroup); i++) {
        data[charCode - 1].data[weaponNum][startTierGroup - i - 1].map((ts: Array<number>, p: number) => {
            const isExistTS = tList.findIndex(e => e.group === ts[0]);
            const TS = TSList.find(e => e.group === ts[0]);

            if(isExistTS === -1) {
                tList.push({
                    name: TS!.name,
                    desc: "",
                    
                    group: ts[0],

                    winRate: 0,
                    pickRate: 0,
                    sbRate: 0,

                    countWin: ts[1],
                    countSb: ts[2],
                    games: ts[3]
                });
            } else {
                tList[isExistTS].countWin += ts[1];
                tList[isExistTS].countSb += ts[2];
                tList[isExistTS].games += ts[3];
            }

            entireGames += ts[3];
        });

        tList.map((t, p) => {
            tList[p].winRate = Math.floor(t.countWin / t.games * 1000) / 10;
            tList[p].sbRate = Math.floor(t.countSb / t.games * 1000) / 10;
            tList[p].pickRate = Math.floor(t.games / entireGames * 1000) / 10;
        })
    }
    return tList;
}