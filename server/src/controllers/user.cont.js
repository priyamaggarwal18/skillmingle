import asyncHandler from "../utils/asyncHandler";

export const loginuser = asyncHandler(async (req, res) => {
    res.send("Login user");
});

export const registeruser = asyncHandler(async (req, res) => {
    res.send("Register user");
});