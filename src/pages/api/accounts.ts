import { requestLCDP } from "@lacagnottedesproches/lcdp-js";
import { NextApiRequest, NextApiResponse } from "next";

const lcdp = requestLCDP(
  process.env.LCDP_API_SECRET || "unknown",
  process.env.NEXT_PUBLIC_LCDP_API_URL,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const payload = req.body;
  try {
    const response = await lcdp.createAccount(payload);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
}
