import {
  AssetEvent,
  EventType,
  OpenSeaAccount,
  OpenSeaEventResponse,
  PaymentToken,
} from "./opensea_types";
import axios from "axios";

interface OpenSeaEventBase {
  tokenId: number | number[];
  amount: number;
  currency: string;
}
interface OpenSeaEventBid extends OpenSeaEventBase {
  eventType: "bid";
  user: string;
}
interface OpenSeaEventSaleBegin extends OpenSeaEventBase {
  eventType: "sale_begin";
  user: string;
  isDutchAuction: boolean;
}
interface OpenSeaEventPurchase extends OpenSeaEventBase {
  eventType: "purchase";
  purchase_from_user: string;
  purchase_to_user: string;
}
type OpenSeaEvent =
  | OpenSeaEventBid
  | OpenSeaEventSaleBegin
  | OpenSeaEventPurchase;

const getBestUsername = (acct: OpenSeaAccount | null) => {
  if (!acct) {
    return "unknown";
  }
  const niceName = acct.user && acct.user.username;
  return niceName ? niceName : acct.address;
};

const paymentInfo = (config: { weiAmount: number; token: PaymentToken }) => {
  const { weiAmount, token } = config;
  const amount = weiAmount / 10 ** token.decimals;
  const currency = token.name;
  return { amount, currency };
};

export const getEvents = async (config: {
  contractAddress: string;
  occurredAfter: number;
  limit: number;
}) => {
  const { contractAddress, limit, occurredAfter } = config;
  const url = `https://api.opensea.io/api/v1/events?only_opensea=true&limit=${limit}&occurred_after=${occurredAfter}&asset_contract_address=${contractAddress}`;
  console.debug(`Fetching OpenSea ${url}`);

  const requestResponse = await axios.get(url);
  const response = requestResponse.data as OpenSeaEventResponse;
  const rawEvents = response.asset_events;

  let result: OpenSeaEvent[] = [];

  rawEvents.forEach((rawEvent) => {
    const tokenId = rawEvent.asset
      ? parseInt(rawEvent.asset.token_id)
      : rawEvent.asset_bundle.assets.map((a) => parseInt(a.token_id));

    if (rawEvent.event_type === EventType.Successful) {
      const event: OpenSeaEvent = {
        eventType: "purchase",
        tokenId,
        purchase_to_user: getBestUsername(rawEvent.winner_account),
        purchase_from_user: getBestUsername(rawEvent.seller),
        ...paymentInfo({
          weiAmount: parseInt(rawEvent.total_price),
          token: rawEvent.payment_token,
        }),
      };
      result.push(event);
    } else if (rawEvent.event_type === EventType.Created) {
      const user = getBestUsername(rawEvent.from_account);
      const isDutchAuction = rawEvent.auction_type === "dutch";
      const event: OpenSeaEvent = {
        eventType: "sale_begin",
        tokenId,
        isDutchAuction,
        user,
        ...paymentInfo({
          weiAmount: parseInt(rawEvent.ending_price),
          token: rawEvent.payment_token,
        }),
      };
      result.push(event);
    } else if (rawEvent.event_type === EventType.OfferEntered) {
      const user = getBestUsername(rawEvent.from_account);
      const event: OpenSeaEvent = {
        tokenId,
        eventType: "bid",
        user,
        ...paymentInfo({
          weiAmount: parseInt(rawEvent.bid_amount),
          token: rawEvent.payment_token,
        }),
      };
      result.push(event);
    }
  });

  return result;
};
