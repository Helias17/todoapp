import { ISpecialChars } from './interfaces';

const specialChars: ISpecialChars[] = [
  { char: '<', replacement: '\u003C‎' },
  { char: '>', replacement: '\u003E‎' },
  { char: '"', replacement: '\u201C' },
  { char: '{', replacement: '\u007B' },
  { char: '}', replacement: '\u007D' },
  { char: '\'', replacement: '\u0027' },
];

const replaceSpecialChars = (str: string): string => {

  specialChars.forEach(item => {
    const regexp = new RegExp(item.char, "g");
    str = str.replace(regexp, item.replacement);
  })
  return str;
}

export default replaceSpecialChars;