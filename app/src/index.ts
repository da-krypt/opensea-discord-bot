import { alertDiscord, GetAssetInfo } from "./discord";
import { getEvents } from "./events";
import { redisClient } from "./storage";

const assetInfoFn: GetAssetInfo = async (tokenId: number) => {
  return { name: `Solvency ${tokenId}` };
};

const go = async () => {
  const events = await getEvents({
    contractAddress: "0x82262bfba3e25816b4c720f1070a71c7c16a8fc4",
    limit: 100,
    occurredAfter: 1620673859,
  });

  const theEvents = events.slice(0, 2);
  for (let i = 0; i < theEvents.length; ++i) {
    const e = theEvents[i];
    await alertDiscord(e, assetInfoFn);
  }
};

go().then(() => {
  process.exit();
});
