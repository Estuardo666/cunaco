/** Base path for every asset downloaded from fintechx-wbs.framer.website. */
export const FX_ASSETS = "/sites/fintechx-wbs-framer-website-097bbfaf/root-8a5edab2/images";

/** Resolve a downloaded asset by its original Framer filename. */
export function fxAsset(filename: string): string {
  return `${FX_ASSETS}/${filename}`;
}

/** Base path for the Cuna&Co. brand assets extracted from the app kit artifact. */
export const CUNA_ASSETS = "/brand/cunaco";

/** Resolve a Cuna&Co. brand illustration/icon by filename. */
export function cunaAsset(filename: string): string {
  return `${CUNA_ASSETS}/${filename}`;
}
