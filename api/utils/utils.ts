import { VercelRequest } from "@vercel/node";
import { verifyKey } from "discord-interactions";

export function isValidRequest(request: VercelRequest) {
  if (request.method !== "POST") return false;

  const signature = request.headers["x-signature-ed25519"] as string;
  const timestamp = request.headers["x-signature-timestamp"] as string;
  const rawBody = JSON.stringify(request.body);

  return verifyKey(
    rawBody,
    signature,
    timestamp,
    process.env.DISCORD_BOT_PUBLIC_KEY!
  );
}
