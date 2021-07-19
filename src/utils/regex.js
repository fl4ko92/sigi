const numberRegex = /^[0-9]+$/
const idRegex = /^[0-9]{11}$/
const emailRegex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/
const lettersBlankSpacesRegex = /^([á-úÁ-Úa-zA-Z ])+$/
const cmfRegex = /^([0-9-.])+$/
const lastNameRegex = /^([á-úÁ-Úa-zA-Z])+( [á-úÁ-Úa-zA-Z]+)?$/
const positiveNumberRegex = /^[0-9]+$/
const numbersRegex = /^(?!-0(\.0+)?$)-?(0|[1-9]\d*)(\.\d+)?$/

const isNumber = string => {
  return numberRegex.test(string)
}

const isId = string => {
  return idRegex.test(string)
}

const isCmf = string => {
  return cmfRegex.test(string)
}

const isEmail = string => {
  return emailRegex.test(string)
}

const isPhone = string => {
  return phoneRegex.test(string)
}

const isLettersWithBlankSpaces = string => {
  return lettersBlankSpacesRegex.test(string)
}

const isLastName = string => {
  return lastNameRegex.test(string)
}

const isPositiveNumber = string => {
  return positiveNumberRegex.test(string)
}

const isGpsCoordinate = string => {
  return numbersRegex.test(string)
}

export {
  isNumber,
  isId,
  isEmail,
  isPhone,
  isLettersWithBlankSpaces,
  isLastName,
  isPositiveNumber,
  isGpsCoordinate,
  isCmf,
}
