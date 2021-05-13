import { getEvents } from "./events";
import { redisClient } from "./storage";

const go = async () => {
  const events = await getEvents({
    contractAddress: "0x82262bfba3e25816b4c720f1070a71c7c16a8fc4",
    limit: 100,
    occurredAfter: 1620673859,
  });
  console.log({ events });
};

go().then(() => {
  process.exit();
});
