import { inngest } from "@/inngest/client";

export async function Post() {
  await inngest.send({ name: "demo/error", data: {} });
  return Response.json({ status: "started" })
}