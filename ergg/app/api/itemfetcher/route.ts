import Item from "../../modules/Item";
import dbConnect from "../../modules/dbManager";
import SynergyData from "../../../server/synergyData.json";

export async function GET() {
    dbConnect();
    const items = Item;
    const motherData:any = await items.findOne().lean();
    return Response.json({ data: motherData!.data });
}