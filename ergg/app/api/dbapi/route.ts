import type { NextApiRequest, NextApiResponse } from "next";
import Game from "../../modules/Game";
import dbConnect from "../../modules/dbManager";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    if (req.method === "GET") {
        try {
            dbConnect();
            const games = Game;
            const allGames = await games.find({});

            let datalist:Array<any> = [];
            allGames.map((data, p) => {
                datalist.push(data.data);
            });
            return NextResponse.json(datalist);
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: "dja" });
        }
    } else if (req.method === "POST") {

    }
}