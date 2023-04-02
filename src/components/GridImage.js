import styles from "./GridImage.module.css";
import { useRouter } from "next/router";
const GridImage = ({ recipes }) => {
  const router = useRouter();
  console.log(recipes);
  const handleClick=(index)=>{
    router.push(`/recipe?id=${index}`);
  }

  return (
    <div className={styles.grid}>
      {recipes.map((recipe, index) => (
        <div key={index}  className={styles.item} onClick={()=>{handleClick(index)}}>
            <img src={recipe.recipe.image} alt="picture" />
          <div className={styles.title}>{recipe.recipe.label}</div>
        </div>
      ))}
    </div>
  );
};

export default GridImage;
