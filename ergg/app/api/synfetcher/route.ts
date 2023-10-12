import Synergy from "../../modules/Synergy";
import dbConnect from "../../modules/dbManager";
import SynergyData from "../../../server/synergyData.json";

export async function GET() {
    dbConnect();
    const synergys = Synergy;
    const motherData:any = await synergys.findOne().lean();
    return Response.json({ data: motherData!.data });
}

async function mergeSynergys(mother: Array<any>) { // 이새끼가 문제임 씨발
    let formattedData: Array<any> = [];
    let mergedList: Array<any> = SynergyData;

    mother.map((data, p) => {
        formattedData.push(data.data);
    });

    formattedData.map((datas, p) => {
        datas.map((char: any, cp: number) => {
            char.synergy.map((weapon: any, wp: number) => {
                weapon.map((tier: any, tp: number) => {
                    tier.map((item: any, ip: number) => {
                        const isExist = (e: any) => (e[0] === item[0] && e[1] === item[1]);
                        const index = mergedList[cp].synergy[wp][tp].findIndex(isExist);

                        if (index === -1) {
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