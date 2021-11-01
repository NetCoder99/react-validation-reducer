import classes from './QuoteItem.module.css';
import { Link } from 'react-router-dom';
import { QuoteDataDef } from '../../models/QuoteDataDef';

const QuoteItem = (props: QuoteDataDef) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link className='btn' to={"/quotes/"+props.id} >View Fullscreen</Link>
    </li>
  );
};

export default QuoteItem;
