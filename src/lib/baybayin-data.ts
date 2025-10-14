
export type BaybayinCharacter = {
  roman: string;
  char: string;
  name: string;
  type: 'vowel' | 'consonant';
  examples: {
    tagalog: string;
    baybayin: string;
    english: string;
  }[];
};

export const baybayinCharacters: BaybayinCharacter[] = [
  { 
    roman: "a", 
    char: "ᜀ", 
    name: "A", 
    type: "vowel",
    examples: [
        { tagalog: "araw", baybayin: "ᜀᜇᜏ᜔", english: "sun/day" },
        { tagalog: "ama", baybayin: "ᜀᜋ", english: "father" },
    ]
  },
  { 
    roman: "e/i", 
    char: "ᜁ", 
    name: "E/I", 
    type: "vowel",
    examples: [
        { tagalog: "ilaw", baybayin: "ᜁᜎᜏ᜔", english: "light" },
        { tagalog: "isda", baybayin: "ᜁᜐ᜔ᜇ", english: "fish" },
    ]
  },
  { 
    roman: "o/u", 
    char: "ᜂ", 
    name: "O/U", 
    type: "vowel",
    examples: [
        { tagalog: "ulan", baybayin: "ᜂᜎᜈ᜔", english: "rain" },
        { tagalog: "utak", baybayin: "ᜂᜆᜃ᜔", english: "brain" },
    ]
  },
  { 
    roman: "ba", 
    char: "ᜊ", 
    name: "Ba", 
    type: "consonant",
    examples: [
        { tagalog: "bayan", baybayin: "ᜊᜌᜈ᜔", english: "country" },
        { tagalog: "bato", baybayin: "ᜊᜆᜓ", english: "stone" },
    ]
  },
  { 
    roman: "ka", 
    char: "ᜃ", 
    name: "Ka", 
    type: "consonant",
    examples: [
        { tagalog: "kape", baybayin: "ᜃᜉᜒ", english: "coffee" },
        { tagalog: "kalabaw", baybayin: "ᜃᜎᜊᜏ᜔", english: "carabao" },
    ]
  },
  { 
    roman: "da/ra", 
    char: "ᜇ", 
    name: "Da/Ra", 
    type: "consonant",
    examples: [
        { tagalog: "dagat", baybayin: "ᜇᜄᜆ᜔", english: "sea" },
        { tagalog: "dila", baybayin: "ᜇᜒᜎ", english: "tongue" },
    ]
  },
  { 
    roman: "ga", 
    char: "ᜄ", 
    name: "Ga", 
    type: "consonant",
    examples: [
        { tagalog: "gabi", baybayin: "ᜄᜊᒒ", english: "night" },
        { tagalog: "ginto", baybayin: "ᜄᜒᜈ᜔ᜆᜓ", english: "gold" },
    ]
  },
  { 
    roman: "ha", 
    char: "ᜑ", 
    name: "Ha", 
    type: "consonant",
    examples: [
        { tagalog: "hangin", baybayin: "ᜑᜅᜒᜈ᜔", english: "wind" },
        { tagalog: "hari", baybayin: "ᜑᜇᜒ", english: "king" },
    ]
  },
  { 
    roman: "la", 
    char: "ᜎ", 
    name: "La", 
    type: "consonant",
    examples: [
        { tagalog: "lakad", baybayin: "ᜎᜃᜇ᜔", english: "walk" },
        { tagalog: "langit", baybayin: "ᜎᜅᜒᜆ᜔", english: "sky" },
    ]
  },
  { 
    roman: "ma", 
    char: "ᜋ", 
    name: "Ma", 
    type: "consonant",
    examples: [
        { tagalog: "mata", baybayin: "ᜋᜆ", english: "eye" },
        { tagalog: "mahal", baybayin: "ᜋᜑᜎ᜔", english: "love" },
    ]
  },
  { 
    roman: "na", 
    char: "ᜈ", 
    name: "Na", 
    type: "consonant",
    examples: [
        { tagalog: "nanay", baybayin: "ᜈᜈᜌ᜔", english: "mother" },
        { tagalog: "niyog", baybayin: "ᜈᜒᜌᜓᜄ᜔", english: "coconut" },
    ]
  },
  { 
    roman: "nga", 
    char: "ᜅ", 
    name: "Nga", 
    type: "consonant",
    examples: [
        { tagalog: "ngayon", baybayin: "ᜅᜌᜓᜈ᜔", english: "now" },
        { tagalog: "ngiti", baybayin: "ᜅᜒᜆᜒ", english: "smile" },
    ]
  },
  { 
    roman: "pa", 
    char: "ᜉ", 
    name: "Pa",
    type: "consonant",
    examples: [
        { tagalog: "paa", baybayin: "ᜉᜀ", english: "foot" },
        { tagalog: "puso", baybayin: "ᜉᜓᜐᜓ", english: "heart" },
    ]
  },
  { 
    roman: "sa", 
    char: "ᜐ", 
    name: "Sa", 
    type: "consonant",
    examples: [
        { tagalog: "salamat", baybayin: "ᜐᜎᜋᜆ᜔", english: "thank you" },
        { tagalog: "sawa", baybayin: "ᜐᜏ", english: "snake" },
    ]
  },
  { 
    roman: "ta", 
    char: "ᜆ", 
    name: "Ta", 
    type: "consonant",
    examples: [
        { tagalog: "tao", baybayin: "ᜆᜂ", english: "person" },
        { tagalog: "talaga", baybayin: "ᜆᜎᜄ", english: "really" },
    ]
  },
  { 
    roman: "wa", 
    char: "ᜏ", 
    name: "Wa", 
    type: "consonant",
    examples: [
        { tagalog: "wala", baybayin: "ᜏᜎ", english: "nothing" },
        { tagalog: "walo", baybayin: "ᜏᜎᜓ", english: "eight" },
    ]
  },
  { 
    roman: "ya", 
    char: "ᜌ", 
    name: "Ya", 
    type: "consonant",
    examples: [
        { tagalog: "yaman", baybayin: "ᜌᜋᜈ᜔", english: "wealth" },
        { tagalog: "yelo", baybayin: "ᜌᜒᜎᜓ", english: "ice" },
    ]
  },
];

export const kudlit = {
  ei: "ᜒ",
  ou: "ᜓ",
  virama: "᜔", // pamatay
};
