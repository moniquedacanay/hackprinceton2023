import styles from "./GridImage.module.css";
const GridImage = ({ recipes }) => {
  console.log(recipes);
  return (
    <div className={styles.grid}>
      {recipes.map((recipe, index) => (
        <div key={index}  className={styles.item}>
            <img src={recipe.recipe.image} alt="picture" />
          <div className={styles.title}>{recipe.recipe.label}</div>
        </div>
      ))}
    </div>
  );
};

export default GridImage;
