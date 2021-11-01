import { QuoteDataDef } from "../models/QuoteDataDef";
export const LOAD_QUOTES = "LOAD_QUOTES";

export const initialState = { quotes: new Array<QuoteDataDef>() }

export interface Payload {
  type: string,
  quotes: QuoteDataDef[],
};

export const quotesReducer = (state: any, action: Payload) => {
  switch (action.type) {
    case LOAD_QUOTES:
      const quotes = action.quotes
      return {quotes: [...quotes]}

    default:
      return state
  }
}