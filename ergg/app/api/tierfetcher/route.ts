import Game from "@/app/modules/Game";
import dbConnect from "@/app/modules/dbManager";

export async function GET(request: Request) {  // 버전별로 각각 List 따로 병합하기..
    dbConnect();
    
    const games = Game;
    const allGames = await games.findOne().lean();
    return Response.json(allGames);
}

function mergeJSON(lists: Array<any>) { // 파싱 데이터 병합 함수
    let formattedData: Array<any> = [];
    lists.map((data, p) => {
        formattedData.push(data.data);
    });

    let mergedList = formattedData[0];
    formattedData.shift(); // 기본 형식 세팅을 위해 0번째꺼 그냥 가져옴

    if (formattedData.length > 0) {
        formattedData.map((list, lp) => {
            mergedList.map((char: any, cp: number) => {
                char.grades.map((weapon: Array<Array<Array<number>>>, wp: number) => {
                    weapon.map((tg, tp) => {
                        tg.map((grade, gp) => {
                            mergedList[cp].grades[wp][tp][gp] += list[cp].grades[wp][tp][gp];
                        });;
                    });
                });
                char.scores.map((weapon: Array<Array<Array<number>>>, wp: number) => {
                    weapon.map((tg, tp) => {
                        tg.map((scores, sp) => {
                            mergedList[cp].scores[wp][tp][sp] += list[cp].grades[wp][tp][sp];
                        });;
                    })
                });
            });
            mergedList.map((char: any, cp: number) => {
                char.tk.map((weapon: Array<Array<Array<number>>>, wp: number) => {
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
                char.avgdeal.map((weapon: Array<Array<Array<number>>>, wp: number) => {
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
