import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/Recipe.module.css";
import Cookies from "js-cookie";

export default function Recipe() {
  const router = useRouter();
  const [recipe, setRecipe] = useState(null);
  const [nutriItems, setNutriItems] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const query = Cookies.get("topic") ? Cookies.get("topic") : "";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": `${process.env.X_RapidAPI_Key2}`,
        "X-RapidAPI-Host": "edamam-recipe-search.p.rapidapi.com",
      },
    };
    const response = await fetch(
      `https://edamam-recipe-search.p.rapidapi.com/search?q=${query}`,
      options
    );
    const result = await response.json();
    // console.log(result.hits);
    if (router.query.id) {
      const id = Number(router.query.id);
      console.log(result.hits[id]);
      setRecipe(result.hits[id].recipe);

      const nutri = [];
      const nutritions = result.hits[id].recipe;
      Object.keys(nutritions.totalNutrients).map((item, index) => {
        if (nutritions.totalNutrients[item].quantity > 0 && nutri.length < 15) {
          nutri.push(
            <li key={index}>
              {nutritions.totalNutrients[item].label +
                ": " +
                Number(nutritions.totalNutrients[item].quantity).toFixed(2) +
                nutritions.totalNutrients[item].unit}
            </li>
          );
        }
      });
      setNutriItems(nutri);
    }
  };
  useEffect(() => {
    fetchData();
  }, [router.query.id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log(recipe.url);
    const response = await fetch("/api/send_message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        message: `Here is your recipe! please check it\nRecipe: ${recipe.label}\nCalories: ${String(Number(recipe.calories).toFixed(2))}kcal\nYour total calories today is ${String(Number(recipe.calories).toFixed(2))}kcal!\nGood Job! Invest in your health with every bite!`,
       
      }),
    });
    const data=await response.json();
    console.log(data);
  };

  return (
    <div className={styles.container}>
      {recipe && (
        <div className={styles.content}>
          <div className={styles.label}>{recipe.label}</div>
          <div className={styles.recipeContent}>
            <div className={styles.textColumn}>
              <div className={styles.board}>
                <div className={styles.price}>
                  <div style={{ fontSize: "30px" }}>$15</div>
                  <div style={{ fontSize: "14px" }}>Price</div>
                </div>
                <div className={styles.calories}>
                  <div style={{ fontSize: "30px" }}>
                    {Number(recipe.calories).toFixed(2)}
                  </div>
                  <div style={{ fontSize: "14px" }}>Calories</div>
                </div>
                <div className={styles.minutes}>
                  <div style={{ fontSize: "30px" }}>
                    {Number(recipe.totalTime) - 5 > 0
                      ? Number(recipe.totalTime) - 5
                      : 0}{" "}
                    - {Number(recipe.totalTime) + 5}
                  </div>
                  <div style={{ fontSize: "14px" }}>Minutes to cool</div>
                </div>
              </div>
              <div style={{ marginBottom: "20px", marginLeft: "30px" }}>
                <div className={styles.subtitle}>Nutrition:</div>
                <ul className={styles.ingredients}>{nutriItems}</ul>
              </div>
              <div style={{ marginBottom: "20px", marginLeft: "30px" }}>
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
          <div style={{ textAlign: "center",marginTop:"20px",display:"flex",justifyContent:"center" }}>
            <a className={styles.button} href={recipe.url}>
              Click for Instructions
            </a>
            <div style={{ textAlign: "center" }}>
            <button
              className={styles.button}
              onClick={() => setShowModal(true)}
            >
              Send it to my phone
            </button>
          </div>
          </div>
          
          {showModal && (
            <div className={styles.modal}>
              <form onSubmit={handleSendMessage}>
                <label>Phone number:</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  required
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <div style={{textAlign:"center"}}>
                <button type="submit">Send message</button>
                <button onClick={() => setShowModal(false)}>Close</button>
                </div>
                
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
