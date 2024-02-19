import { verifyKey } from "discord-interactions";
import { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_PUBLIC_KEY = process.env.DISCORD_BOT_PUBLIC_KEY as string;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  console.log(request);
  const signature = request.headers["x-signature-ed25519"] as string;
  const timestamp = request.headers["x-signature-timestamp"] as string;
  const rawBody = JSON.stringify(request.body);

  if (!verifyKey(rawBody, signature, timestamp, BOT_PUBLIC_KEY)) {
    return response.status(401).end("Invalid request.");
  }

  switch (request.body["type"]) {
    case 1:
      console.log("Discord Ping");
      return response.status(200).json({ type: 1 });
    default:
      return response.status(404).end("Unknown type");
  }
}
