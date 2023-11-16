import PremadeGame from "@/app/modules/PremadeGame";
import dbConnect from "@/app/modules/dbManager";

export async function GET(request: Request) {  // 버전별로 각각 List 따로 병합하기..
    dbConnect();
    
    const premadeGames = PremadeGame;
    const allGames = await premadeGames.findOne().lean();
    return Response.json(allGames);
}