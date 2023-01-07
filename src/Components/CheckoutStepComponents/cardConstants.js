import VISA_ICON from '../../assets/cardLogos/visa.png';
import MASTERCARD_ICON from '../../assets/cardLogos/masterCard.png';
import AMERICAN_EXPRESS_ICON from '../../assets/cardLogos/amex.png';
import DISCOVER_ICON from '../../assets/cardLogos/discover.png';

export const OTHERCARDS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const AMERICANEXPRESS = [
  /[1-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

export const CARD = [
  'VISA',
  'MASTERCARD',
  'AMERICAN_EXPRESS',
  'DISCOVER'
]

export const CARDICON = {
  VISA: VISA_ICON,
  MASTERCARD: MASTERCARD_ICON,
  AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
  DISCOVER: DISCOVER_ICON
}