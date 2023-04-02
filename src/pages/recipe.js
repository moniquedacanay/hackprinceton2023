import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/Recipe.module.css";
export default function Recipe() {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [nutriItems,setNutriItems]=useState([]);

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
    console.log(result.hits);
    if (router.query.id) {
      const id = Number(router.query.id);
      console.log(result.hits[id]);
      setRecipe(result.hits[id].recipe);
    
      const nutri = [];
      const nutritions=result.hits[id].recipe;
      Object.keys(nutritions.totalNutrients).map((item, index) => {
        if(nutritions.totalNutrients[item].quantity>0&&nutri.length<10) {
        nutri.push(
        <li key={index}>
           {nutritions.totalNutrients[item].label+': '+((Number)(nutritions.totalNutrients[item].quantity)).toFixed(2)+(nutritions.totalNutrients[item].unit)}
        </li>
        )
         
        }
      });
      
      setNutriItems(nutri);
      console.log(nutriItems)
    }
  };
  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  return (
    <div className={styles.container}>
      {recipe  && (
        <div className={styles.content}>
          <div className={styles.label}>{recipe.label}</div>
          <div className={styles.recipeContent}>
            <div className={styles.textColumn}>
               <div className={styles.board}>
                <div className={styles.price}>
                    <div style={{fontSize:"30px"}}>$5</div>
                    <div style={{fontSize:"14px"}}>Price</div>
                </div>
                <div className={styles.calories}>

                    <div style={{fontSize:"30px"}}>{Number(recipe.calories).toFixed(2)}</div>
                    <div style={{fontSize:"14px"}}>Calories</div>

                </div>
                <div className={styles.minutes}>
                    <div style={{fontSize:"30px"}}>{Number(recipe.totalTime)-5>0?Number(recipe.totalTime)-5:0} - {Number(recipe.totalTime)+5}</div>
                    <div style={{fontSize:"14px"}}>Minutes to cool</div>

                </div>
               </div>
              <div style={{marginBottom:"20px",marginLeft:"30px"}}>
                <div className={styles.subtitle}>Nutrition:</div>
                <ul className={styles.ingredients}>
                  {nutriItems}
                </ul>
              </div>
              <div style={{marginBottom:"20px",marginLeft:"30px"}}>
                <div className={styles.subtitle}>Ingredients:</div>
                <ul className={styles.ingredients}>
                  {recipe.ingredients.map((item, index) => (
                    <li key={index} className={styles.ingredient}>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.imgColumn}>
              <img src={recipe.image} />
            </div>
          </div>
          <div style={{textAlign:"center"}}>
            <a className={styles.button} href={recipe.url}>Click for Instructions</a>
          </div>
        </div>
      )}
    </div>
  );
}
