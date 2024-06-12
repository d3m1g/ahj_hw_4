/* eslint-disable indent */
/* eslint-disable eqeqeq */
import getResultCheckCartNum from './getResultCheckCartNum';
import getPaymentSystem from './getPaymentSystem';

import visa from '../../img/visa.png';
import mastercard from '../../img/mastercard.png';
import americanexpress from '../../img/americanexpress.png';
import discover from '../../img/discover.png';
import jcb from '../../img/jcb.png';
import dinersclub from '../../img/dinersclub.png';
import mir from '../../img/mir.png';

const mockDataCards = [
  { value: 'Visa', img: visa },
  { value: 'MasterCard', img: mastercard },
  { value: 'American_Express', img: americanexpress },
  { value: 'Discover', img: discover },
  { value: 'JCB', img: jcb },
  { value: 'Diners_Club', img: dinersclub },
  { value: 'Mir', img: mir },
];

export default class CreditCardValidator {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
    <div class="container">
      <h1 class="header">Check your credit card number</h1>

      <ul class="cards">
        ${mockDataCards
          .map((card) => `
            <li class="card" id="${card.value}">
              <img src="${card.img}" alt="${card.value}">
            </li>
          `).join('')}
      </ul>

      <form id="form" data-id="form-selector">
        <div class="form-group">
          <input class="form-control" id="card_number" data-id="input-selector" type="text" value="" name="card_number" placeholder="Credit card number">
          <div class="tooltip">
            <div class="tooltip-arrow"></div>
            <div class="tooltip-inner">Please insert a credit card number</div>
          </div>
          <button class="form-btn" id="clickform" data-id="click-selector" type="button">Click to Validate</button>
        </div>

        <p class="message"></p>
      </form>
    </div>
    `;
  }

  static get formSelector() {
    return '[data-id=form-selector]';
  }

  static get inputSelector() {
    return '[data-id=input-selector]';
  }

  static get clickSelector() {
    return '[data-id=click-selector]';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;

    const input = this.parentEl.querySelector(this.constructor.inputSelector);
    input.addEventListener('keyup', (evt) => this.onInput(evt));

    const click = this.parentEl.querySelector(this.constructor.clickSelector);
    click.addEventListener('click', (evt) => this.onClick(evt));
  }

  onInput(evt) {
    const paymentSystem = getPaymentSystem(evt.currentTarget.value);

    const cards = this.parentEl.querySelectorAll('.card');

    cards.forEach((item) => {
      if (item.id == paymentSystem) {
        item.classList.remove('card-hidden');
      } else {
        item.classList.add('card-hidden');
      }
    });
  }

  onClick(evt) {
    evt.preventDefault();

    const inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
    const result = getResultCheckCartNum(inputEl.value);

    const message = document.querySelector('.message');
    message.innerHTML = `${result}`;
  }
}
