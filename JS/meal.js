// Declaration Section
let mealList1 = document.getElementById("recipeDetails");
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let recipeId = urlParams.get("id");
let mealArray = JSON.parse(localStorage.getItem("favMeals"));

// getiing details from api And Show the MEal Recipe Details
function GetMealRecipe() {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.meals.forEach((meal) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          if (meal[`strIngredient${i}`]) {
            ingredients.push(
              `${meal[`strIngredient${i}`]}- ${meal[`strMeasure${i}`]}`
            );
          } else {
            break;
          }
        }

        let isFav = false;
        for (let i = 0; i < mealArray.length; i++) {
          if (mealArray[i] == meal.idMeal) {
            isFav = true;
          }
        }
        if (isFav) {
          html += `
                                  <div class="left-column">
                                    <img id="photo" src="${
                                      meal.strMealThumb
                                    }" alt="${meal.strMeal}">
                                </div>
                                <div class="right-column">
                                        <div class="Meal-details">
                                            <h1>${meal.strMeal}</h1>
                                            <div class="meal-summary">
                                                <span>${
                                                  meal.strCategory
                                                }, </span>
                                                <span>${meal.strArea}</span>
                                            </div>
                                        </div>
                                    <div class="Meal-details">
                                        <div class="meal-procedure">
                                            <div class="right-left-column">
                                                <span>Procedure :</span>
                                                <p>${meal.strInstructions}</p>
                                            </div>
                                            <div class="right-right-column">
                                                <span> Ingredients/Measures :</span>
                                                <ol>
                                                  ${ingredients
                                                    .map((e) => `<li>${e}</li>`)
                                                    .join("")}
                                                </ol>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Product Pricing -->
                                    
                                        <div class="link-buttons">
                                          <a href="${
                                            meal.strYoutube
                                          }" target="_self" class="video-btn">WATCH MEAL RECIPE</a>
                                          <a href="" onclick= "RemoveFav(${
                                            meal.idMeal
                                          })" target="_self">REMOVE FAVOURITE</a>  
                                        </div>

                                </div>  
                        `;
        } else {
          html += `
                                <div class="left-column">
                                  <img id="photo" src="${
                                    meal.strMealThumb
                                  }" alt="${meal.strMeal}">
                              </div>
                              <div class="right-column">
                                    <div class="Meal-details">
                                          <h1>${meal.strMeal}</h1>
                                          <div class="meal-summary">
                                              <span>${meal.strCategory}, </span>
                                              <span>${meal.strArea}</span>
                                          </div>
                                      </div>
                                  <div class="Meal-details">
                                      <div class="meal-procedure">
                                          <div class="right-left-column">
                                              <span>Instructions :</span>
                                              <p>${meal.strInstructions}</p>
                                          </div>
                                          <div class="right-right-column">
                                              <span> Ingredients/Measures :</span>
                                              <ol>
                                                ${ingredients
                                                  .map((e) => `<li>${e}</li>`)
                                                  .join("")}
                                              </ol>
                                          </div>
                                      </div>
                                  </div>
                                  <!-- Product Pricing -->
                                  
                                      <div class="link-buttons">
                                      <a href="${
                                        meal.strYoutube
                                      }" target="_self" class="video-btn">WATCH MEAL RECIPE</a>
                                      <a href="" onclick= "AddFav(${
                                        meal.idMeal
                                      })" target="_self">ADD FAVOURITE</a>  
                                      </div>
                                 
                              </div>  
                      `;
        }
      });
      mealList1.innerHTML = html;
    });
}

//Function Remove meals to favourites list
function RemoveFav(mealId) {
  let localArray = JSON.parse(localStorage.getItem("favMeals"));
  if (localArray.indexOf(mealId) != -1) {
    localArray = localArray.filter((item) => item != mealId);
    localStorage.setItem("favMeals", JSON.stringify(localArray));
    alert("Remove From favourite List");
    GetMealRecipe();
  }
}

//Function Remove meals to favourites list
function AddFav(mealId) {
  let localArray = JSON.parse(localStorage.getItem("favMeals"))
    ? JSON.parse(localStorage.getItem("favMeals"))
    : [];
  localArray.push(mealId);
  localStorage.setItem("favMeals", JSON.stringify(localArray));
  alert("Added To favourite List");
  GetMealRecipe();
}
GetMealRecipe();
