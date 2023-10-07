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
    if (formattedData.length > 2) {
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
            schar.items.map((weapon, wp) => {
              weapon.map((tiergroup, tp) => {
                tiergroup.map((idata, dp) => {
                  const isExist = e => e[0] == idata[0];
                  const index = char.items[wp][tp].findIndex(isExist);

                  if(index === -1) {
                    mergedList[cp].items[wp][tp].push(idata);
                  } else {
                    mergedList[cp].items[wp][tp][index][1] += idata[1];
                    mergedList[cp].items[wp][tp][index][2] += idata[2];
                    mergedList[cp].items[wp][tp][index][3] += idata[3];
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