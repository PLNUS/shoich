import type { NextApiRequest, NextApiResponse } from "next";
import Game from "../modules/dbManager";
import dbConnect from "../modules/dbManager";
import mongoose from "mongoose";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === "GET") {
        try {
            dbConnect();
            const games = Game;

            const allGames = await games.find({});

            res.status(200).json(allGames[0].data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else if (req.method === "POST") {

    }
}