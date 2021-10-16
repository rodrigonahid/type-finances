export const FormatCurrency = (value: number): string => {
  const formattedValue = (new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value));
  return `${formattedValue}`
}

export const FormatDate = (value: number): number | string => {
  if(value < 10){
    return `0${value}`
  }
  return value;
}