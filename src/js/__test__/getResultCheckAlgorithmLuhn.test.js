import { getResultCheckAlgorithmLuhn } from '../getResultCheckCartNum';

test.each([
  /* American_Express */ '371449635398431',
  /* Diners_Club */ '30273339856467',
  /* Discover */ '6011321977455348',
  /* JCB */ '3537691664550151',
  /* MasterCard */ '5382013224475624',
  /* Visa */ '4024007124272138',
  /* Mir */ '2201382000000013',
])(('should return message for a valid card number'), (num) => {
  expect(getResultCheckAlgorithmLuhn(num)).toBe('Luhn Algorithm Check <span class="valid">&#10004;</span>');
});

test('should return message for a invalid card number', () => {
  const num = '371449635398430';
  const result = getResultCheckAlgorithmLuhn(num);

  expect(result).toBe('Luhn Algorithm Check <span class="invalid">&#10006;</span>');
});