import Synergy from "../modules/Synergy";
import dbConnect from "../modules/dbManager";

export default async function parseSynergy() {
  'use server'
    dbConnect();
    const synergys = Synergy;
    const One = await synergys.find().lean();

    return One[0].data;
}