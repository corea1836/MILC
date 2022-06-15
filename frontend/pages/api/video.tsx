import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/direct_upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
        },
        body: `{
          "maxDurationSeconds": 3600,
          "watermark": null
         }`,
      }
    )
  ).json();

  res.json({
    ok: true,
    ...response.result,
  });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
