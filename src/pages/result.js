import Navbar from '@/components/Navbar';
import styles from '@/styles/Result.module.css';
import { useState, useEffect } from 'react';
import GridImage from '@/components/GridImage';

export default function Result(){
    const [recipes, setRecipes] = useState([]);
    const fetchData = async () => {
        const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": `${process.env.X_RapidAPI_Key2}`,
              "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
            },
          };
          const response = await fetch(
            "https://edamam-recipe-search.p.rapidapi.com/search?q=salmon%20and%20asparagus",
            options
          );
          const result = await response.json();
        //   console.log(result.hits);
          setRecipes(result.hits);
         
    };
    useEffect(() => {
        fetchData();
      }, []);
    return <div>
     <Navbar/>
     <div className={styles.content}>
        <GridImage recipes={recipes.slice(0,9)}/>
     </div>
    </div>
}