import Synergy from "../modules/Synergy";
import dbConnect from "../modules/dbManager";

export default async function parseSynergy() {
  'use server'
    dbConnect();
    const synergys = Synergy;
    const motherData = await synergys.find().lean();
    const merged = await mergeSynergys(motherData);

    return merged;
}

async function mergeSynergys(mother: Array<any>) {
    let formattedData: Array<any> = [];
    mother.map((data, p) => {
      formattedData.push(data.data);
    });
  
    let mergedList = formattedData[0];
    if (formattedData.length > 1) {
      formattedData.shift();

      formattedData.map((slist, sp) => {
        mergedList.map((char, cp) => {
          slist.map((schar, scp) => {
            schar.synergy.map((weapon, wp) => {
              weapon.map((tiergroup, tp) => {
                tiergroup.map((sdata, dp) => {
                  const isExist = e => e[0] == sdata[0] && e[1] == sdata[1];
                  const index = char.synergy[wp][tp].findIndex(isExist);

                  if(index === -1) {
                    mergedList[cp].synergy[wp][tp].push(sdata);
                  } else {
                    mergedList[cp].synergy[wp][tp][index][2] += sdata[2];
                    mergedList[cp].synergy[wp][tp][index][3] += sdata[3];
                    mergedList[cp].synergy[wp][tp][index][4] += sdata[4];
                  }
                })
              });
            });
          })
        });
      });
    }
  return mergedList;
}