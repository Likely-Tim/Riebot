import { InteractionType } from "discord-interactions";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { isValidRequest } from "../utils/utils.js";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (!isValidRequest(request)) {
    return response.status(401).end("Invalid request.");
  }

  switch (request.body["type"]) {
    case InteractionType.PING:
      console.log("Discord Ping");
      return response.status(200).json({ type: InteractionType.PING });
    default:
      return response.status(404).end("Unknown type");
  }
}
