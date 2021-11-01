import { QuoteDataDef } from "../models/QuoteDataDef";

export const sortQuotes = (quotes: QuoteDataDef[], ascending: boolean) => {
  if (!quotes) {
    return new Array<QuoteDataDef>();
  }
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};
