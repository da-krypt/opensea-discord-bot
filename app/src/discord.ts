import { OpenSeaEvent } from "./events";
import { config } from "./config";
export type GetAssetInfo = (
  tokenId: number | number[]
) => Promise<{ name: string }>;
import axios from "axios";

export const alertDiscord = async (
  osEvent: OpenSeaEvent,
  getAssetInfo: GetAssetInfo
) => {
  const assetInfo = await getAssetInfo(osEvent.tokenId);

  const discordText = `${assetInfo.name} ${JSON.stringify(osEvent)}`;
  const imageUrl = osEvent.imageUrl;

  const discordInfo = {
    content: discordText,
    embeds: [{ image: { url: imageUrl } }],
  };

  console.log("alerting discord with", JSON.stringify(discordInfo));
  return axios.post(config.discordWebhookUrl, discordInfo);
};
