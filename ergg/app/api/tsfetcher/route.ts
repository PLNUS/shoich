import TacticalSkill from "../../modules/TacticalSkill";
import dbConnect from "../../modules/dbManager";
export const dynamic = 'force-dynamic'
export async function GET() {
    dbConnect();
    const TSs = TacticalSkill;
    const motherData:any = await TSs.findOne().lean();
    return Response.json({ data: motherData!.data });
}