import React from "react";
import styles from "./Content.module.css"
import SearchBar from '@/components/SeachBar'


const Content=()=>{
    return <div className={styles.container}>
     <div className={styles.title}>Find the Best Recipes for the Deals Near You</div>
     <SearchBar/>
    </div>

}

export default Content;