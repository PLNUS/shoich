import Trait from "../../modules/Trait";
import dbConnect from "../../modules/dbManager";

export async function GET() {
    dbConnect();
    const traits = Trait;
    const motherData:any = await traits.findOne().lean();
    return Response.json({ data: motherData!.data });
}