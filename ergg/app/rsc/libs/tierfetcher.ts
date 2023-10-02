import Game from "@/app/modules/Game";
import Version from "@/app/modules/Version";
import dbConnect from "@/app/modules/dbManager";

export default async function getTierListForAll() {  // 버전별로 각각 List 따로 병합하기..
    dbConnect();
    const games = Game;
    const vers = Version;

    const versions:Array<any> = await vers.find({},{ versionMajor: 1, versionMinor: 1, _id: 0 }).lean();

    let mergedGames = new Array(versions.length);

    for(let i = 0; i < versions.length; i++){
      const allGames = await games.find({versionMajor:versions[i].versionMajor, versionMinor:versions[i].versionMinor}).lean();
      mergedGames[i] = mergeJSON(allGames);
    }

    return {versions : versions, data : mergedGames};
  }
  
  function mergeJSON(lists: Array<any>) { // 파싱 데이터 병합 함수
    let formattedData: Array<any> = [];
    lists.map((data, p) => {
      formattedData.push(data.data);
    });
  
    let mergedList = formattedData[0];
    if (formattedData.length > 1) {
      formattedData.shift();
  
      formattedData.map((list, lp) => {
        mergedList.map((char:any, cp:number) => {
          char.grades.map((weapon:Array<Array<Array<number>>>, wp:number) => {
            weapon.map((tg, tp) => {
              tg.map((grade, gp) => {
                mergedList[cp].grades[wp][tp][gp] += list[cp].grades[wp][tp][gp];
              });;
            });
          });
          char.scores.map((weapon:Array<Array<Array<number>>>, wp:number) => {
            weapon.map((tg, tp) => {
              tg.map((scores, sp) => {
                mergedList[cp].scores[wp][tp][sp] += list[cp].grades[wp][tp][sp];
              });;
            })
          });
        });
        mergedList.map((char:any, cp:number) => {
          char.tk.map((weapon:Array<Array<Array<number>>>, wp:number) => {
            weapon.map((tg, tp) => {
              tg.map((tks, p) => {
                let a1befval = mergedList[cp].tk[wp][tp][p] * mergedList[cp].grades[wp][tp][p];
                let a2befval = list[cp].tk[wp][tp][p] * list[cp].grades[wp][tp][p];
                let a12grade = mergedList[cp].grades[wp][tp][p] + list[cp].grades[wp][tp][p]
                mergedList[cp].tk[wp][tp][p] = isNaN((a1befval + a2befval) / a12grade) ? 0 : (a1befval + a2befval) / a12grade;
                // 1 평킬 x 1 판수 + 2 평킬 x 2 판수 / 1판수 + 2판수
              });
            });
          });
          char.avgdeal.map((weapon:Array<Array<Array<number>>>, wp:number) => {
            weapon.map((tg, tp) => {
              tg.map((deals, p) => {
                let a1befval = mergedList[cp].avgdeal[wp][tp][p] * mergedList[cp].grades[wp][tp][p];
                let a2befval = list[cp].avgdeal[wp][tp][p] * list[cp].grades[wp][tp][p];
                let a12grade = mergedList[cp].grades[wp][tp][p] + list[cp].grades[wp][tp][p]
                mergedList[cp].avgdeal[wp][tp][p] = isNaN((a1befval + a2befval) / a12grade) ? 0 : (a1befval + a2befval) / a12grade;
                // 1 평딜 x 1 판수 + 2 평딜 x 2 판수 / 1판수 + 2판수
              });
            });
          });
        });
      });
    }
    return mergedList;
  }
  