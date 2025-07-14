import * as z from "zod";

export const StatusMessage = z.object({
    status: z.literal(["connected", "disconnecting", "ping", "pong"])
});