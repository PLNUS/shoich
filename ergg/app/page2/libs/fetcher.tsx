import Synergy from "../../modules/Synergy";
import dbConnect from "../../modules/dbManager";
import SynergyData from "../../../server/synergyData.json";

export default async function parseSynergy() {
  dbConnect();
  const synergys = Synergy;
  const motherData = await synergys.find().lean();
  const merged = await mergeSynergys(motherData);
  return {data : merged};
}

async function mergeSynergys(mother: Array<any>) { // 이새끼가 문제임 씨발
  let formattedData: Array<any> = [];
  let mergedList: Array<any> = SynergyData;

  mother.map((data, p) => {
    formattedData.push(data.data);
  });

  formattedData.map((datas, p) => {
    datas.map((char, cp) => {
      char.synergy.map((weapon, wp) => {
        weapon.map((tier, tp) => {
          tier.map((item, ip) => {
            const isExist = (e) => (e[0] === item[0] && e[1] === item[1]);
            const index = mergedList[cp].synergy[wp][tp].findIndex(isExist);
            if(cp===64 && tp === 4 && item[0] === 53 && item[1] === 3) {
              console.log("뎁마 팀원 망커스 표본 " + index + " 에 있음");
            }

            if(index === -1) {
              mergedList[cp].synergy[wp][tp].push(item);
            } else {
              mergedList[cp].synergy[wp][tp][index][2] += item[2];
              mergedList[cp].synergy[wp][tp][index][3] += item[3];
              mergedList[cp].synergy[wp][tp][index][4] += item[4];
            }
          });
        });
      });
    });
  });
  
  return mergedList;
}