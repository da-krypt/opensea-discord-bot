const dotEnvPath = process.env.DOTENV_PATH;
if (!dotEnvPath) {
  throw new Error(
    "No dotenv path required, please specify via DOTENV_PATH env var"
  );
}
require("dotenv").config({ path: dotEnvPath });

const stringOrError = (val: string | undefined) => {
  if (!val) {
    throw new Error("please provide all ENV vars");
  }
  return val;
};

export const config = {
  bidEthMinimum: 0.5,
  smartContractAddress: stringOrError(process.env.SMART_CONTRACT_ADDRESS),
  discordWebhookUrl: stringOrError(process.env.DISCORD_WEBHOOK_URL),
};
