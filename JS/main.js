// Declaration Section
const searchBtn = document.getElementById("search-btn");
const InputText = document.getElementById("search-input");
const mealList = document.getElementById("meal");
const heading = document.getElementById("result");
let id = "";

//initializing localStorage
if (localStorage.getItem("favMeals") == null) {
  localStorage.setItem("favMeals", JSON.stringify([]));
}

//added eventlistner to searchButton
searchBtn.addEventListener("click", searchBar);
function searchBar() {
  let userInput = InputText.value.trim();
  if (InputText.value != " " && userInput) {
    GetMealList();
  } else {
    alert("Please Enter The Input ..!!");
  }
}

// get meal list that matches with the characters that Enter in Search BAr
function GetMealList() {
  let html = "";
  let mealArray = JSON.parse(localStorage.getItem("favMeals"));
  fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${InputText.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      heading.innerHTML = `<h1 class="notFound">-: You Search Results :- </h1>`;
      if (data.meals) {
        data.meals.forEach((meal) => {
          let isFav = false;
          for (let i = 0; i < mealArray.length; i++) {
            if (mealArray[i] == meal.idMeal) {
              isFav = true;
            }
          }
          if (isFav) {
            html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img id="img" src = "${meal.strMealThumb}" alt = "food Name">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                              <a href = "meal.html?id=${meal.idMeal}"id="btn1" target="_self" class = "recipe-btn">More Details</a>
                               <a href = "#"onclick= "RemoveFav(${meal.idMeal})"  class="recipe-btn button "><span>Remove Favourite</span></a>
                        </div>
                        </div>
                    </div>
                `;
          } else {
            html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img id="img" src = "${meal.strMealThumb}" alt = "food Name">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                              <a href = "meal.html?id=${meal.idMeal}" id="btn1" target="_self" "class = "recipe-btn button">More Details</a>
                               <a href = "#" onclick= "AddFav(${meal.idMeal})" class="recipe-btn buttonadd"><span>Add Favourite</span></a>
                        </div>
                        </div>
                    </div>
                `;
          }
        });
        mealList.classList.remove("notFound");
      } else {
        heading.innerHTML = "";
        html = "Uh Oh!! We didn't find any meal!";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

//Function Remove meals to favourites list
function RemoveFav(mealId) {
  let localArray = JSON.parse(localStorage.getItem("favMeals"));
  if (localArray.indexOf(mealId) != -1) {
    localArray = localArray.filter((item) => item != mealId);
    localStorage.setItem("favMeals", JSON.stringify(localArray));
    alert("Remove From favourite List");
    GetMealList();
  }
}
//Function Add meals to favourites list
function AddFav(mealId) {
  let localArray = JSON.parse(localStorage.getItem("favMeals"))
    ? JSON.parse(localStorage.getItem("favMeals"))
    : [];
  localArray.push(mealId);
  localStorage.setItem("favMeals", JSON.stringify(localArray));
  alert("Added To Favourites List");
  GetMealList();
}
