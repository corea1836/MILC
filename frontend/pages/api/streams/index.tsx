import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    result: {
      uid,
      rtmps: { streamKey, url },
    },
  } = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
        },
        body: `{"meta": {"name":"test"},"recording": { "mode": "automatic", "timeoutSeconds": 10}}`,
      }
    )
  ).json();

  res.json({
    ok: true,
    uid,
    streamKey,
    url,
  });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
