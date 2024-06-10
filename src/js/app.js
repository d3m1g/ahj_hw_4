import CreditCardValidator from './CreditCardValidator';

const parentEl = document.querySelector('body');

const creditCardValidator = new CreditCardValidator(parentEl);
creditCardValidator.bindToDOM();