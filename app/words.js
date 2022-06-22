const ONES = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];
const TEENS = [
  '',
  'eleven',
  'twelve',
  'thirteen',
  'fourteen',
  'fifteen',
  'sixteen',
  'seventeen',
  'eighteen',
  'nineteen',
];
const TEENS_SPLIT = [
  ['', ''],
  ['eleven', ''],
  ['twelve', ''],
  ['thirteen', ''],
  ['four', 'teen'],
  ['fifteen', ''],
  ['sixteen', ''],
  ['seven', 'teen'],
  ['eight', 'teen'],
  ['nine', 'teen'],
];
const TENS = [
  '',
  'ten',
  'twenty',
  'thirty',
  'forty',
  'fifty',
  'sixty',
  'seventy',
  'eighty',
  'ninety',
];

const STR_OH_TICK = "o'";
const STR_CLOCK = 'clock';

function appendNumber(num) {
  const onesVal = num % 10;
  const tensVal = (num - onesVal) / 10;

  let words = '';

  if (tensVal > 0) {
    if (tensVal === 1 && num !== 10) {
      return TEENS[onesVal];
    }
    words += TENS[tensVal];
    if (onesVal > 0) {
      words += ' ';
    }
  }

  if (onesVal > 0 || num === 0) {
    words += ONES[onesVal];
  }
  return words;
}

// o'clock (0) and plain number words (10..)
export function minuteToFormalWords(minutes) {
  if (minutes === 0) {
    return [`${STR_OH_TICK}${STR_CLOCK}`, ''];
  }
  if (minutes < 10) {
    return [ONES[minutes % 10], ''];
  }
  if (minutes > 10 && minutes < 20) {
    return [
      TEENS_SPLIT[(minutes - 10) % 10][0],
      TEENS_SPLIT[(minutes - 10) % 10][1],
    ];
  }

  const onesVal = minutes % 10;
  const tensVal = (minutes - onesVal) / 10;

  return [TENS[tensVal], onesVal === 0 ? '' : ONES[onesVal]];
}

export function hourTo12hWord(hours) {
  hours = hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  return appendNumber(hours);
}
