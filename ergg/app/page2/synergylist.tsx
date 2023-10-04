'use server'

import parseSynergy from "./fetcher";

export default async function SynergyList({ }) {

    return (
        <div className="flex flex-row w-full h-[160px] bg-neutral-300 gap-x-2 p-4">
        </div>
    )
}

function getSynergyList(data: Array<any>, charCode: number, weaponNum: number, startTierGroup: number, endTierGroup: number) {
    // charCode, weaponNum은 0일 수 없음.
    // tierGroup => 8 브 7 실 6 골 ~ 2 데 1 이
    let sList:Array<any> = [];

    if (startTierGroup > endTierGroup) {
        for (let i = 0; i <= (startTierGroup - endTierGroup); i++) {
            data[charCode - 1].synergy[weaponNum][startTierGroup - i - 1].map((sData, p) => {

                const isExist = (e) => e[0] == sData[0] && e[1] == sData[1];
                const index = sList.findIndex(isExist);

                if(index === -1) {
                    sList.push(sData);
                } else {
                    sList[index][2] += sData[2];
                    sList[index][3] += sData[3];
                    sList[index][4] += sData[4];
                }
            })
        }
    } else if (startTierGroup === endTierGroup) {
        data[charCode - 1].synergy[weaponNum][startTierGroup - 1].map((sData, p) => {

            const isExist = (e) => e[0] == sData[0] && e[1] == sData[1];
            const index = sList.findIndex(isExist);

            if(index === -1) {
                sList.push(sData);
            } else {
                sList[index][2] += sData[2];
                sList[index][3] += sData[3];
                sList[index][4] += sData[4];
            }
        })
    }

    return sList;
}