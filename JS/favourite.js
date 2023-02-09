// Declaration Section
let favMeals = JSON.parse(localStorage.getItem("favMeals"));
const heading = document.getElementById("result");
const mealList = document.getElementById("meal");
let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
let id = "";

//fetching meals present in Local storage from api
const fetchData = async (mealId) => {
  try {
    let res = await fetch(url + mealId);
    let data = await res.json();
    displaySearchResults(data.meals[0]);
  } catch (error) {
    console.error(error);
  }
};

//Render favourite meals present in local Storage
const renderFav = () => {
  if (favMeals.length === 0) {
    heading.innerHTML = `<h1 class="notFound"> Uh Oh!! Your Favourite List Is Empty..!!</h1>`;
    mealList.innerHTML = "";
  } else {
    mealList.innerHTML = "";
    heading.innerHTML = `<h1 class="notFound">-: Your Favourite List :-</h1>`;
    console.log(favMeals);
    favMeals.map((mealId) => {
      const mealData = fetchData(mealId);
    });
  }
};

//displaying fav meals in dom
const displaySearchResults = (meal) => {
  let isFav = true;
  mealList.innerHTML += `
                <div class = "meal-item" data-id = "${meal.idMeal}">
                    <div class = "meal-img">
                        <img id="img" src = "${meal.strMealThumb}" alt = "${meal.idMeal}">
                    </div>
                    <div class = "meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href = "meal.html?id=${meal.idMeal}" id="btn1" target="_self" onclick= "fetchById(${meal.idMeal})"class = "recipe-btn">More Details</a>
                        <a href = "#"onclick= "RemoveFav(${meal.idMeal})"  class="recipe-btn button "><span>Remove Favourite</span></a>
                    </div>
                </div>

            `;
};

// Function To Remove Meal From Favourite List
function RemoveFav(mealId) {
  console.log(mealId);
  let localArray = JSON.parse(localStorage.getItem("favMeals"));
  localArray = localArray.filter((item) => item != mealId);
  localStorage.setItem(
    "favMeals",
    JSON.stringify(localArray && localArray.length > 0 ? localArray : "")
  );
  favMeals = JSON.parse(localStorage.getItem("favMeals"));
  alert("Removed From Favourites");
  renderFav();
}
renderFav();
