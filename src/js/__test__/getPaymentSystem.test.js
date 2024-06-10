import getPaymentSystem from '../getPaymentSystem';

test.each([
  ['American_Express', '371449635398431'],
  ['Diners_Club', '30273339856467'],
  ['Discover', '6011321977455348'],
  ['JCB', '3537691664550151'],
  ['MasterCard', '5382013224475624'],
  ['Visa', '4024007124272138'],
  ['Mir', '2201382000000013'],
])(('should return name payment system'), (paymentSystem, num) => {
  expect(getPaymentSystem(num)).toBe(paymentSystem);
});