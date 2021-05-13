import { config } from "./config";
import delay = require("delay");
import { alertDiscord, GetAssetInfo } from "./discord";
import { getEvents } from "./events";
import { redisClient } from "./storage";

const assetInfoFn: GetAssetInfo = async (tokenId: number) => {
  return { name: `Solvency #${tokenId}` };
};

const go = async () => {
  const events = await getEvents({
    contractAddress: config.smartContractAddress,
    limit: 100,
    occurredAfter: 1620673859,
  });

  const theEvents = events.slice(0, 5);
  for (let i = 0; i < theEvents.length; ++i) {
    const e = theEvents[i];
    await alertDiscord(e, assetInfoFn);
    await delay(1000);
  }
};

go().then(() => {
  process.exit();
});
