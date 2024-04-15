import { randomBetweenInt } from "./random";

const TOP = [
  "LongHairBob",
  "LongHairBun",
  "LongHairCurly",
  "LongHairCurvy",
  "LongHairFro",
  "LongHairFroBand",
  "LongHairNotTooLong",
  "LongHairMiaWallace",
  "LongHairStraight",
  "LongHairStraight2",
  "LongHairStraightStrand",
  "ShortHairDreads01",
  "ShortHairShaggyMullet",
  "ShortHairShortCurly",
  "ShortHairShortFlat",
  "ShortHairShortRound",
  "ShortHairShortWaved",
  "ShortHairSides",
  "ShortHairTheCaesar",
  "ShortHairTheCaesarSidePart",
];

const ACCESSORIES = ["Blank", "Blank", "Blank", "Prescription01", "Prescription02", "Round"];

const SKIN = ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"];

export function getRandomAvataaarsUrl() {
  return `https://avataaars.io/?avatarStyle=Transparent&topType=${TOP[randomBetweenInt(0, TOP.length)]}&accessoriesType=${
    ACCESSORIES[randomBetweenInt(0, ACCESSORIES.length)]
  }&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=${
    SKIN[randomBetweenInt(0, SKIN.length)]
  }`;
}
