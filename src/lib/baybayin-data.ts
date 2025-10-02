export type BaybayinCharacter = {
  roman: string;
  char: string;
  name: string;
  type: 'vowel' | 'consonant';
};

export const baybayinCharacters: BaybayinCharacter[] = [
  { roman: "a", char: "ᜀ", name: "A", type: "vowel" },
  { roman: "e/i", char: "ᜁ", name: "E/I", type: "vowel" },
  { roman: "o/u", char: "ᜂ", name: "O/U", type: "vowel" },
  { roman: "ba", char: "ᜊ", name: "Ba", type: "consonant" },
  { roman: "ka", char: "ᜃ", name: "Ka", type: "consonant" },
  { roman: "da/ra", char: "ᜇ", name: "Da/Ra", type: "consonant" },
  { roman: "ga", char: "ᜄ", name: "Ga", type: "consonant" },
  { roman: "ha", char: "ᜑ", name: "Ha", type: "consonant" },
  { roman: "la", char: "ᜎ", name: "La", type: "consonant" },
  { roman: "ma", char: "ᜋ", name: "Ma", type: "consonant" },
  { roman: "na", char: "ᜈ", name: "Na", type: "consonant" },
  { roman: "nga", char: "ᜅ", name: "Nga", type: "consonant" },
  { roman: "pa", char: "ᜉ", name: "Pa", type: "consonant" },
  { roman: "sa", char: "ᜐ", name: "Sa", type: "consonant" },
  { roman: "ta", char: "ᜆ", name: "Ta", type: "consonant" },
  { roman: "wa", char: "ᜏ", name: "Wa", type: "consonant" },
  { roman: "ya", char: "ᜌ", name: "Ya", type: "consonant" },
];

export const kudlit = {
  ei: "ᜒ",
  ou: "ᜓ",
  virama: "᜔", // pamatay
};
