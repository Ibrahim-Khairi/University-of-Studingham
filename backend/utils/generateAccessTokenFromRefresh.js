import jwt from 'jsonwebtoken';
import RefreshToken from "../models/RefreshToken.js";
import {generateAccessToken} from "./generateAccessToken.js";

export const generateAccessTokenFromRefresh = async (refreshToken) => {
    if (!refreshToken) throw new Error('RefreshToken is missing');

    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken) throw new Error("Invalid refresh token provided");

    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    return generateAccessToken(payload);
}