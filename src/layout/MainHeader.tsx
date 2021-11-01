import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainHeader = () => {
    return (
        <header className={classes.header}>
            <header>Options</header>
            <nav className={classes.nav}>
            <ul>
                <li>
                    <NavLink activeClassName={classes.active} to="/quotes">Quotes</NavLink>
                </li>
                <li>
                    <NavLink activeClassName={classes.active} to="/login">Login</NavLink>
                </li>
            </ul>
            </nav>
        </header>
    );
};

export default MainHeader;
