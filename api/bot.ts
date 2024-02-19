import getRawBody from "raw-body";
import { verifyKey } from "discord-interactions";
import { VercelRequest, VercelResponse } from "@vercel/node";

const BOT_PUBLIC_KEY = process.env.DISCORD_BOT_PUBLIC_KEY as string;

async function verifyRequest(request: VercelRequest): Promise<boolean> {
  if (request.method === "POST") return false;

  console.log(request);
  const signature = request.headers["x-signature-ed25519"] as string;
  const timestamp = request.headers["x-signature-timestamp"] as string;
  const rawBody = await getRawBody(request);

  return verifyKey(rawBody, signature, timestamp, BOT_PUBLIC_KEY);
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  console.log(request);
  if (!(await verifyRequest(request)))
    return response.status(401).end("Invalid request.");

  switch (request.body["type"]) {
    case 1:
      console.log("Discord Ping");
      return response.status(200).json({ type: 1 });
    default:
      return response.status(404).end("Unknown type");
  }
}
