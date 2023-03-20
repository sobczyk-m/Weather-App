import styles from './App.module.pcss'
import Search from "../Search/Search";
import React from 'react';

function App() {

    return (
        <div className={styles.center}>
            <Search/>
        </div>
    )
}

export default App
