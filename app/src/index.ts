import { config } from "./config";
import delay = require("delay");
import { alertDiscord, GetAssetInfo } from "./discord";
import { getEvents } from "./events";
import { getLastFetch, setLastFetch } from "./storage";
import axios from "axios";
import { schedule } from "node-cron";

const TWENTY_FOUR_HOURS = 86400;

const assetInfoFn: GetAssetInfo = async (tokenId: number | number[]) => {
  let name = `Solvency #${tokenId}`;

  if (typeof tokenId === "object") {
    return { name };
  }

  try {
    const url = `https://www.solvency.art/api/${tokenId}`;
    const reqResp = await axios.get(url);
    const resp = reqResp.data as {
      attributes: {
        trait_type: string;
        value: string;
      }[];
    };
    const attributesString = resp.attributes.map((x) => x.value).join(", ");
    name += ` (${attributesString})`;
  } catch (e) {
    console.error(e);
  }
  return { name };
};

const currentUnixEpochSeconds = () => {
  return parseInt((new Date().getTime() / 1000).toString());
};

const runAlert = async () => {
  let occurredAfterString = await getLastFetch();
  if (occurredAfterString === null) {
    const rightNowTimestamp = currentUnixEpochSeconds();
    const curTimestamp = rightNowTimestamp - TWENTY_FOUR_HOURS;
    occurredAfterString = curTimestamp.toString();

    console.debug(`No timestamp set, setting to`, curTimestamp);
    await setLastFetch(curTimestamp);
  }

  const occurredAfter = parseInt(occurredAfterString);
  console.debug(`Fetching from timestamp`, occurredAfter);

  const events = await getEvents({
    contractAddress: config.smartContractAddress,
    limit: 100,
    occurredAfter: occurredAfter,
  });
  console.debug(`${events.length} events found`);

  try {
    const theEvents = events;
    for (let i = 0; i < theEvents.length; ++i) {
      const e = theEvents[i];
      await alertDiscord(e, assetInfoFn);
      await delay(1000);
    }
  } catch (e) {
    console.error(e);
  } finally {
    const newTime = currentUnixEpochSeconds();
    console.log(`Complete fetch from`, occurredAfter, `to`, newTime);
    await setLastFetch(newTime);
  }
};

let isRunning = false;
const tick = async () => {
  if (isRunning) {
    console.log(`Not ticking because running`);
    return;
  }
  console.log(`${new Date().toLocaleString()} Ticking...`);

  isRunning = true;
  try {
    await runAlert();
    console.log(`Tick completed successfully`);
  } catch (e) {
    console.error(e);
    console.log(`Tick failed`);
  } finally {
    isRunning = false;
  }
};

tick();
schedule("*/2 * * * *", tick);
