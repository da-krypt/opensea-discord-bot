// generates from https://app.quicktype.io/
// for curl https://api.opensea.io/api/v1/events\?only_opensea\=true\&offset\=0\&limit\=100\&asset_contract_address\=0x82262bfba3e25816b4c720f1070a71c7c16a8fc4
// but with all enums replaced

export interface OpenSeaEventResponse {
  asset_events: AssetEvent[];
}

export interface AssetEvent {
  approved_account: null;
  asset: Asset | null;
  asset_bundle: AssetBundle | null;
  auction_type: string | null;
  bid_amount: null | string;
  collection_slug: string;
  contract_address: string;
  created_date: Date;
  custom_event_name: null;
  dev_fee_payment_event: null;
  duration: null | string;
  ending_price: null | string;
  event_type: EventType;
  from_account: OpenSeaAccount | null;
  id: number;
  owner_account: null;
  payment_token: PaymentToken;
  quantity: string;
  seller: OpenSeaAccount | null;
  starting_price: null | string;
  to_account: null;
  total_price: null | string;
  transaction: Transaction | null;
  winner_account: OpenSeaAccount | null;
}

export interface Asset {
  id: number;
  token_id: string;
  num_sales: number;
  background_color: string;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url: string;
  animation_original_url: string;
  name: string;
  description: string;
  external_link: string;
  asset_contract: AssetContract;
  owner: OpenSeaAccount;
  permalink: string;
  collection: Collection;
  decimals: number;
}

export interface AssetContract {
  address: string;
  asset_contract_type: string;
  created_date: Date;
  name: string;
  nft_version: string;
  opensea_version: null;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply: string;
  description: string;
  external_link: string;
  image_url: string;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address: string;
  collection?: Collection;
}

export interface Collection {
  banner_image_url: null;
  chat_url: null;
  created_date: Date;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: DisplayData;
  external_url: string;
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  safelist_request_status: string;
  image_url: string;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username: null;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address: string;
  require_email: boolean;
  short_description: null;
  slug: string;
  telegram_url: null;
  twitter_username: string;
  instagram_username: string;
  wiki_url: null;
}

export interface DisplayData {
  card_display_style: string;
}

export interface OpenSeaAccount {
  user: User | null;
  profile_img_url: string;
  address: string;
  config: string;
  discord_id: string;
}

export interface User {
  username: string | null;
}

export interface AssetBundle {
  maker: OpenSeaAccount;
  slug: string;
  assets: Asset[];
  name: string;
  description: string;
  external_link: string;
  asset_contract: AssetContract;
  permalink: string;
  sell_orders: null;
}

export enum EventType {
  BidWithdrawn = "bid_withdrawn",
  Cancelled = "cancelled",
  Created = "created",
  OfferEntered = "offer_entered",
  Successful = "successful",
}

export interface PaymentToken {
  id: number;
  symbol: string;
  address: string;
  image_url: string;
  name: string;
  decimals: number;
  eth_price: string;
  usd_price: string;
}

export interface Transaction {
  block_hash: string;
  block_number: string;
  from_account: OpenSeaAccount;
  id: number;
  timestamp: Date;
  to_account: OpenSeaAccount;
  transaction_hash: string;
  transaction_index: string;
}
