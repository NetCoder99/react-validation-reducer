import { QuoteDataDef } from "../../models/QuoteDataDef";
import classes   from './QuoteTable.module.css';
import Card from "../UI/Card";

export const QuoteTable = (props: { quotes: QuoteDataDef[] }) => {
  return (
    <Card>
      <div className="container">
        <h3>Available Quotes:</h3>
        <table className={classes.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Author</th>
              <th>Text</th>
              <th>Comments</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.quotes &&
              props.quotes.map((quote) => (
                <tr key={quote.id}>
                  <td>{quote.id}</td>
                  <td>{quote.author}</td>
                  <td>{quote.text}</td>
                  <td>{"0"}</td>
                  <td>Edit</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
