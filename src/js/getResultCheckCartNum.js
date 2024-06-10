/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-cond-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable no-return-assign */
export default function getResultCheckCartNum(str) { /* переписать функцию */
  if (!str || str == 0) {
    const tooltip = document.querySelector('.tooltip');
    tooltip.classList.add('tooltip-show');

    setTimeout(() => {
      tooltip.classList.remove('tooltip-show');
    }, 3000);

    return '';
  }
  return getResultCheckAlgorithmLuhn(str);
}

export function getResultCheckAlgorithmLuhn(num) {
  const reverseNum = num.split('').reverse();

  const arrNum = reverseNum.map((n, i) => {
    return ((i + 1) % 2 === 0 ? ((n *= 2) > 9 ? n - 9 : n) : +n);
  });

  let sum = 0;
  arrNum.forEach((i) => sum += i);

  if (sum % 10 === 0) {
    return 'Luhn Algorithm Check <span class="valid">&#10004;</span>';
  }
  return 'Luhn Algorithm Check <span class="invalid">&#10006;</span>';
}