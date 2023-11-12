import TraitList from "@/server/parsed/traitList.json";

export interface Trait {
    core: string | undefined;
    type: string | undefined;
    desc: string;

    winRate: number;
    sbRate: number;
    pickRate: number;

    countWin: number;
    countSb: number;
    games: number;

    sub: Array<SubTrait>;
}

interface SubTrait {
    sub: string | undefined;
    type: string | undefined;
    desc: string;

    winRate: number;
    sbRate: number;
    pickRate: number;

    countWin: number;
    countSb: number;
    games: number;
}

export function getTraitList(data: Array<any>, charCode: number, weaponNum: number, startTierGroup: number, endTierGroup: number) {
    // charCode, weaponNum은 0일 수 없음.
    // tierGroup => 8 브   7 실 6 골 ~ 2 데 1 이
    // console.log(data);

    const tList: Array<Trait> = [];
    let coreEntireGames: number = 0;

    for (let i = 0; i <= (startTierGroup - endTierGroup); i++) { // 티어그룹에 따른 반복때문ㅇ ㅔ결국 병합 코드 작성해야함.
        data[charCode - 1].trait[weaponNum][startTierGroup - i - 1].map((trait: any, p: number) => {
            coreEntireGames += trait.core[3];

            const coreDesc = TraitList.find((e) => e.code === trait.core[0]);
            const isExistCore = tList.findIndex((e: any) => e.core === coreDesc?.name);

            let subList: Array<SubTrait> = [];

            trait.sub.map((sub: any, p: number) => {
                const subDesc = TraitList.find((e) => e.code === sub[0]);

                if (isExistCore !== -1) {
                    const isExistSub = tList[isExistCore].sub.findIndex((e: any) => e.sub === subDesc?.name);

                    if(isExistSub !== -1) {
                        tList[isExistCore].sub[isExistSub].countWin += sub[1];
                        tList[isExistCore].sub[isExistSub].countSb += sub[2];
                        tList[isExistCore].sub[isExistSub].games += sub[3];
                    } else {
                        subList.push({
                            sub: subDesc?.name,
                            type: subDesc?.traitGroup,
                            desc: subDesc === undefined ? "" : subDesc!.desc,
                            countWin: sub[1],
                            countSb: sub[2],
                            games: sub[3],
                            winRate: 0,
                            sbRate: 0,
                            pickRate: 0,
                        });
                    }
                } else {
                    subList.push({
                        sub: subDesc?.name,
                        type: subDesc?.traitGroup,
                        desc: subDesc === undefined ? "" : subDesc!.desc,
                        countWin: sub[1],
                        countSb: sub[2],
                        games: sub[3],
                        winRate: 0,
                        sbRate: 0,
                        pickRate: 0
                    });
                }
            });

            if (isExistCore !== -1) {
                tList[isExistCore].countWin += trait.core[1];
                tList[isExistCore].countSb += trait.core[2];
                tList[isExistCore].games += trait.core[3];
            } else {
                tList.push({
                    core: coreDesc?.name,
                    type: coreDesc?.traitGroup,
                    desc: coreDesc === undefined ? "" : coreDesc!.desc,
                    countWin: trait.core[1],
                    countSb: trait.core[2],
                    games: trait.core[3],
                    winRate: 0,
                    sbRate: 0,
                    pickRate: 0,
                    sub: subList
                });
            }
        });
    }

    tList.map((trait, p) => {
        tList[p].winRate = Math.floor(trait.countWin / trait.games * 1000) / 10;
        tList[p].sbRate = Math.floor(trait.countSb / trait.games * 1000) / 10;
        tList[p].pickRate = Math.floor(trait.games / coreEntireGames * 1000) / 10;

        trait.sub.map((sub, subp) => {
            tList[p].sub[subp].winRate = Math.floor(sub.countWin / sub.games * 1000) / 10;
            tList[p].sub[subp].sbRate = Math.floor(sub.countSb / sub.games * 1000) / 10;
            tList[p].sub[subp].pickRate = Math.floor(sub.games / trait.games * 1000) / 10;
        });
    });
    
    return tList;
}