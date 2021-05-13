import { OpenSeaEvent } from "./events";
import { config } from "./config";
export type GetAssetInfo = (
  tokenId: number | number[]
) => Promise<{ name: string }>;
import axios from "axios";

const calculateDescription = (osEvent: OpenSeaEvent): string => {
  const totalAmount = `${osEvent.amount} ${osEvent.currency}`;

  switch (osEvent.eventType) {
    case "sale_begin":
      if (osEvent.isDutchAuction) {
        //
        return `Dutch auction began (ending at ${totalAmount}) by ${osEvent.user}`;
      } else {
        return `For sale for ${totalAmount} by ${osEvent.user}`;
      }
    case "purchase":
      return `Purchased for ${totalAmount} by ${osEvent.purchase_to_user} from ${osEvent.purchase_from_user}`;
    case "bid":
      return `Bid placed for ${totalAmount} by ${osEvent.user}`;
  }
};

export const alertDiscord = async (
  osEvent: OpenSeaEvent,
  getAssetInfo: GetAssetInfo
) => {
  const assetInfo = await getAssetInfo(osEvent.tokenId);
  const description = calculateDescription(osEvent);

  const discordText = `${assetInfo.name} \n\n ${description} \n\n ${osEvent.osUrl}`;
  const imageUrl = osEvent.imageUrl;

  const discordInfo = {
    content: discordText,
    embeds: [{ image: { url: imageUrl } }],
  };

  console.log("alerting discord with", JSON.stringify(discordInfo));
  return axios.post(config.discordWebhookUrl, discordInfo);
};
