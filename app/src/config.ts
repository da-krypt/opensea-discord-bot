const stringOrError = (val: string | undefined) => {
  if (!val) {
    throw new Error("please provide all ENV vars");
  }
  return val;
};

export const config = {
  smartContractAddress: stringOrError(process.env.SMART_CONTRACT_ADDRESS),
  discordWebhookUrl: stringOrError(process.env.DISCORD_WEBHOOK_URL),
};
