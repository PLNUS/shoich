import Game from "@/app/modules/Game";
import dbConnect from "@/app/modules/dbManager";

export default async function getTierList(versionMajor:number, versionMinor:number) {
    dbConnect();
    const games = Game;
    const allGames = await games.find({versionMajor : versionMajor, versionMinor : versionMinor}).sort({_id:-1,});
    let mergedGames = mergeJSON(allGames);
    return mergedGames;
  }
  
  async function mergeJSON(lists: Array<any>) { // 파싱 데이터 병합 함수
    let formattedData: Array<any> = [];
    lists.map((data, p) => {
      formattedData.push(data.data);
    });
  
    let mergedList = formattedData[0];
    if (formattedData.length > 1) {
      formattedData.shift();
  
      formattedData.map((list, lp) => {
        mergedList.map((char, cp) => {
          char.grades.map((weapon, wp) => {
            weapon.map((tg, tp) => {
              tg.map((grade, gp) => {
                mergedList[cp].grades[wp][tp][gp] += list[cp].grades[wp][tp][gp];
              });;
            });
          });
          char.scores.map((weapon, wp) => {
            weapon.map((tg, tp) => {
              tg.map((scores, sp) => {
                mergedList[cp].scores[wp][tp][sp] += list[cp].grades[wp][tp][sp];
              });;
            })
          });
        });
        mergedList.map((char, cp) => {
          char.tk.map((weapon, wp) => {
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
          char.avgdeal.map((weapon, wp) => {
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
  