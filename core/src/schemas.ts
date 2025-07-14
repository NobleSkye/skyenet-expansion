import * as z from "zod";

export const StatusMessage = z.object({
    status: z.literal(["connected", "disconnecting", "ping", "pong"])
});

export const ServerError = z.object({
    message: z.string()
});