import { Fragment, useEffect, useReducer, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import HttpService from '../../http/http-service';
import { sortQuotes } from '../../lib/sortFunctions';
import { QuoteDataDef } from '../../models/QuoteDataDef';
import { initialState, LOAD_QUOTES, quotesReducer } from '../../store/quotesReducer';
import FormStatus from '../Common/FormStatus';

import classes   from './QuoteList.module.css';
import { QuoteTable } from './QuoteTable';

const QuoteList = () => {
  console.log('QuoteList.init');
  const history        = useHistory()
  const location       = useLocation();
  const [formStatus,   setFormStatus]  = useState({pending: false, errFlag: false, message: '' });
  const [quotesState,  quoteDispatch]  = useReducer(quotesReducer, initialState);  

  useEffect(() => {
    setFormStatus({pending: true, errFlag: false, message: "Fetching quotes ... "})
    HttpService.getAllQuotes()
    .then(response => {
      const recCnt = response.data.length;
      quoteDispatch({type: LOAD_QUOTES, quotes: response.data });
      setFormStatus({pending: false, errFlag: false, message: "Fetch complete: " + recCnt})
      console.table(response.data);
    })
    .catch(error => {
      setFormStatus({pending: false, errFlag: true, message: error.message})
      console.log(error);
    });
  }, []);

  const queryPArams = new URLSearchParams(location.search);
  const isSortedAsc = queryPArams.get('sort') === 'asc' ? true : false;
  const sortBtnHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    history.push("/quotes?sort=" + (isSortedAsc ? 'desc' : 'asc'));
  }

  sortQuotes(quotesState.quotes, isSortedAsc);
  const tmpQuotes:QuoteDataDef[] = [...quotesState.quotes]

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortBtnHandler}>Sort {isSortedAsc ? 'Descending' : 'Ascending'}</button>
        <FormStatus pending={formStatus.pending} errFlag={formStatus.errFlag} message={formStatus.message} />
      </div>
      <QuoteTable quotes={tmpQuotes} />
    </Fragment>
  );
};

export default QuoteList;
