// This is a simplified transliteration engine for educational purposes.
// It does not cover all the complex rules and exceptions of Baybayin.

import { baybayinCharacters, kudlit } from "./baybayin-data";

const romanToBaybayinMap: Record<string, string> = {
  'a': 'ᜀ', 'e': 'ᜁ', 'i': 'ᜁ', 'o': 'ᜂ', 'u': 'ᜂ',
  'b': 'ᜊ', 'k': 'ᜃ', 'd': 'ᜇ', 'g': 'ᜄ', 'h': 'ᜑ',
  'l': 'ᜎ', 'm': 'ᜋ', 'n': 'ᜈ', 'p': 'ᜉ', 'r': 'ᜇ',
  's': 'ᜐ', 't': 'ᜆ', 'w': 'ᜏ', 'y': 'ᜌ'
};

const vowels = ['a', 'e', 'i', 'o', 'u'];

export function tagalogToBaybayin(text: string): string {
  if (!text) return "";
  let baybayinScript = "";
  const lowerCaseText = text.toLowerCase();
  
  let i = 0;
  while (i < lowerCaseText.length) {
    let currentChar = lowerCaseText[i];
    let nextChar = lowerCaseText[i + 1];

    // Handle 'nga' digraph
    if (currentChar === 'n' && nextChar === 'g') {
      let thirdChar = lowerCaseText[i + 2];
      if (vowels.includes(thirdChar)) {
        baybayinScript += 'ᜅ'; // Nga
        if (thirdChar === 'e' || thirdChar === 'i') {
          baybayinScript += kudlit.ei;
        } else if (thirdChar === 'o' || thirdChar === 'u') {
          baybayinScript += kudlit.ou;
        }
        i += 3;
      } else {
        baybayinScript += 'ᜅ' + kudlit.virama;
        i += 2;
      }
      continue;
    }

    // Handle consonants
    if (romanToBaybayinMap[currentChar] && !vowels.includes(currentChar)) {
      if (vowels.includes(nextChar)) {
        baybayinScript += romanToBaybayinMap[currentChar];
        if (nextChar === 'e' || nextChar === 'i') {
          baybayinScript += kudlit.ei;
        } else if (nextChar === 'o' || nextChar === 'u') {
          baybayinScript += kudlit.ou;
        }
        // 'a' is implicit, do nothing
        i += 2;
      } else {
        // Consonant followed by another consonant or end of word
        baybayinScript += romanToBaybayinMap[currentChar] + kudlit.virama;
        i += 1;
      }
      continue;
    }

    // Handle standalone vowels
    if (vowels.includes(currentChar)) {
       baybayinScript += romanToBaybayinMap[currentChar];
       i += 1;
       continue;
    }

    // Handle spaces and punctuation
    if (currentChar === ' ') {
      baybayinScript += ' ';
    } else {
      baybayinScript += currentChar;
    }
    i += 1;
  }

  return baybayinScript;
}
