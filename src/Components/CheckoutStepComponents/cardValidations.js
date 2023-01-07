export const cardNumberValidation = (cardNumber) => {
  const regexPattern = {
    MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
    VISA: /^4[0-9]{2,}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{5,}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
  }
  for (const card in regexPattern) {
    if (cardNumber.replace(/[^\d]/g, '').match(regexPattern[card])) {
      if (cardNumber) {
        return cardNumber && /^[1-6]{1}[0-9]{14,15}$/i.test(cardNumber.replace(/[^\d]/g, '').trim())
        ? ''
        : 'Please enter a valid card';
      }
    }
  }
  return 'Enter a valid card';
};

export const cardExpireValidation = (month, year) => {
  let validMonths = [];
  let validYears = [];
  for (let i = new Date().getMonth() + 1; i < 13; i++) {
    validMonths.push(`${`${i}`.length === 1 ? `0${i}`: i}`)
  };
  for (let i = 0; i < 10; i++ ) {
    validYears.push(`${new Date().getFullYear() + i}`)
  };
  if (validMonths.includes(month) && validYears.includes(year)) {
    return '';
  } else if (validYears.includes(year)) {
    return '';
  } else {
    return 'Enter a valid date';
  }
}

export const cvvValidation = (cvv) => {
  let cvvTester = /\d{3}/g
  if (cvvTester.test(cvv)) {
    return ''
  } else {
    return 'Please enter a valid CVV'
  }
}