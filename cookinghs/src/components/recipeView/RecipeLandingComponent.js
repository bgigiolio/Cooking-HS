import React from 'react';
import RecipesPageCardGroup from './RecipesPageCardGroup';
import SearchBar from "material-ui-search-bar";
import styles from '../../styles/recipelanding.module.css';
import { Button } from 'reactstrap';

// make a stylesheet


class RecipeLanding extends React.Component {
    render() {
        return(
            <div>
                <div className={styles.topCategories}>
                    <div className={styles.categoryButtons}>
                        <Button className={styles.categoryButton}>Chicken</Button>
                        <Button className={styles.categoryButton}>Quick Fix</Button>
                        <Button className={styles.categoryButton}>Vegetarian</Button>
                    </div>

                    <div className={styles.barDiv}>
                        <SearchBar className={styles.searchBar}></SearchBar>
                    </div>

                </div>
               
                <RecipesPageCardGroup/>
    
            </div>
        )
    }
}

export default RecipeLanding;