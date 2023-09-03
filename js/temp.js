
//-----------------------------global declerations



let ingredients = []


let meals = []

let mealsIng = []
let areaMeals = []
let categories = []
let categorMealss = []

let areas = []




//__________________sidebar____________________//


$("#sideBar").css("left", - $(".navitemsCont").outerWidth())

$(".openSidebar").click(function () {


    if ($("#sideBar").css("left") == "0px") {
        $("#sideBar").animate({ "left": - $(".navitemsCont").outerWidth() }, 500)
        $(".openSidebar").removeClass("fa-x")
        $(".openSidebar").addClass("fa-bars")

        $(".nav-item").addClass("animateli")

    }

    else {
        $("#sideBar").animate({ "left": "0px" }, 500)
        $(".openSidebar").removeClass("fa-bars")
        $(".openSidebar").addClass("fa-x")


        let i = 50;

        document.querySelectorAll(".nav-item").forEach((e) => {



            setTimeout(function (duration) {
                duration = i
                e.classList.remove("animateli")

            }, i)
            i += 100
        })

    }

})


////////////////////////////////////////////////////////











//-----------------------------fetch functions





async function fetchDataIng() {


    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    res = await res.json()


    ingredients = res.meals
    console.log(ingredients);

}






async function fetchData() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    response = await response.json()


    meals = response.meals
    console.log(meals);



}







async function fetchDataCat() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()


    categories = response.categories
    console.log(categories);



}






async function fetchDataArea() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()


    areas = response.meals
    console.log(areas);



}




//-------------------------------------------


//--------------------------------events


///////////////_________________________________________ingredients________________________________________________



$("#ingredients").click(async function () {

    await fetchDataIng()


    let temp = ""
    console.log(typeof (ingredients[0].strDescription));
    for (i = 0; i < ingredients.length; i++) {


        temp += `<div class=" col-lg-3 text-center text-white position-relative">
        
                            <i class="fa-solid fa-drumstick-bite fa-4x "></i>
        
                            <h3>${ingredients[i].strIngredient}</h3>
        
                            <p>${(ingredients[i].strDescription != null) ? ingredients[i].strDescription.split(" ").slice(0, 10).join(" ") : ""}</p>
    
                            <div type="${ingredients[i].strIngredient}" class="overlayING w-100 h-100 position-absolute z-3 opacity-0  top-0">
                            </div>
        
                        </div>
            
            `
    }


    $("#Ingridents .row").html(temp);

    $("#Ingridents").removeClass('d-none')
    $("#Ingridents").siblings('section').addClass('d-none')



    //-------------------------------------------------------------

    getDetailsByid()

    //-------------------------------------------------------------


})


///////////////_________________________________________categories________________________________________________


$("#categories").click(async function () {




    await fetchDataCat()
    /**async function fetchDataCat() {
    
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        response = await response.json()
    
    
        categories = response.categories
        console.log(categories);
    
    } */

    let temp = ""

    categories.forEach(element => {

        temp += `
    
    <div class="meal col-3 ">

             <div class=" category1 position-relative overflow-hidden">
                 <img class="w-100 rounded rounded-3" src="${element.strCategoryThumb}" alt="">
                 <div class="overly w-100 h-100 position-absolute  rounded rounded-3 d-flex align-items-center overflow-hidden flex-column p-2">
                     <span class="fw-bold fs-3 mx-2">${element.strCategory}</span> 
                     <p class="fs-6">${element.strCategoryDescription.split(" ").slice(0, 25).join(" ")}</p>
    
                 </div>
                 <div type="${element.strCategory}" class="overlayING w-100 h-100 position-absolute z-3 opacity-0  top-0">
                 </div>
             </div>
    
         </div>
    
    
    `

    });

    $(".mealsRowCat").html(temp)


    $("#categ").removeClass("d-none")
    $('section').not("#categ").addClass("d-none")
    getDetailsByiCategory()

})



///////////////__________________________________________Areas_____________________________________________________

$("#areas").click(async function () {

    await fetchDataArea()




    let temp = ""


    console.log(typeof (areas[0].strDescription));

    //////
    areas.forEach(function (e) {


        temp += `<div class=" col-lg-3 text-center text-white position-relative">
        
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
        
                            <h3>${e.strArea}</h3>
        
                            <div  class="overlayArea top-0  w-100 h-100 position-absolute z-3 opacity-0 "></div>
        
                        </div>`


    })


    $("#Area .row").html(temp)


    $("#Area").removeClass('d-none')
    $("#Area").siblings('section').addClass('d-none')





    $(".overlayArea").click(async function (e) {


        let AreaName = $(e.target).siblings("h3").html()
        console.log(AreaName);

        let resArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${AreaName}`)

        resArea = await resArea.json()

        areaMeals = resArea.meals
        console.log(areaMeals);

        let mealAreaTemp = ""

        areaMeals.forEach(function (e) {

            mealAreaTemp += `
            <div class="meal col-3 ">

             <div class=" position-relative overflow-hidden">
                 <img class="w-100 rounded rounded-3" src="${e.strMealThumb}" alt="">
                 <div class="overly w-100 h-100 position-absolute  rounded rounded-3 d-flex align-items-center">
                     <span class="fw-bold fs-3 mx-2">${e.strMeal}</span>
                 </div>
                 <div type="${e.idMeal}" class="areaMealOverlay w-100 h-100 opacity-0 z-3 bg-danger top-0 position-absolute  rounded rounded-3 d-flex align-items-center">

                 </div>
             </div>

         </div> 
            
            `

        })


        $(".mealsRow").html(mealAreaTemp)


        $("#Area").addClass('d-none')
        $("#Meals").removeClass('d-none')



        $(".areaMealOverlay").click(async function (e) {
            console.log($(e.target).attr("type"));
            let ingTemp = ''
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${$(e.target).attr("type")}`)

            res = await res.json()

            let meal = res.meals[0]
            console.log(meal);

            let tagsTemp = ""
            if (meal.strTags != null) {

                let split = meal.strTags.split(",")
                console.log(split);

                split.forEach(e => {


                    tagsTemp += `
                     <span class="btn btn-warning"> ${e} </span>
                 `

                });




            }


            for (let i = 1; i <= 20; i++) {


                if (meal[`strIngredient${i}`] != "") {


                    ingTemp += `
                                   <span class="btn btn-info"> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]} </span>
                               `


                }



            }

            console.log(meal.strMealThumb);

            $("#mealDesc").html(`<div class="container">
            <div class="row p-5 text-white">
                <div class="col-lg-4 px-3 " ><img src="${meal.strMealThumb}"  class="w-100 rounded rounded-3"
                        alt="">
                    <h2>${meal.strMeal}</h2>
                </div>

                <div class="col-lg-8 px-3">
                    <h3 class="my-0">Instructions</h3>
                    <p>${meal.strInstructions}</p>
                    <h3>Area: <span>${meal.strArea}</span></h3>
                    <h3>Category: <span>${meal.strCategory}</span></h3>
                    <h4>Recipes</h4>

                    <div >
                         ${ingTemp} 

                    </div>

                    <h4>Tags:</h4>

                 <div>
                        ${tagsTemp}
                    </div>

                    <a target="_blank" href="${meal.strSource}" > <button class="btn bg-success">Source</button></a>
                     <a target="_blank" href="${meal.strYoutube}" >  <button class="btn bg-danger">Youtube</button></a>

                </div>






            </div>



        </div>`)














            $("#Meals").addClass('d-none')
            $("#mealDesc").removeClass("d-none")


        })



    })


})


///////////////_____________________________________________search_________________________________________________




$("#searCH").click(function () {

    $("#Meals").removeClass("d-none")
    $("section").not("#Meals").addClass("d-none")
    $("#search").removeClass("d-none")
    $(".mealsRow").addClass("d-none")




    $("#SearchbyName").keyup(function () {

        let value = $("#SearchbyName").val();



        displayMeals(fetchDataByName(value))


        $(".mealsRow").removeClass("d-none")

    })

    $("#SearchbyFL").keyup(function () {

        let value = $("#SearchbyFL").val();



        displayMeals(fetchDataByFL(value))


        $(".mealsRow").removeClass("d-none")

    })





})

///////////////____________________________________________contact us________________________________________________

$("#COntact").click(function () {

    $("section").not($("#subscribtion")).addClass("d-none")
    $("#subscribtion").removeClass("d-none")
})

///////////////____________________________________________validation________________________________________________



$("#UName").keyup(function () {

    if (nameValidation()) {
        $("#NAlert").addClass('d-none')

    } else {

        $("#NAlert").removeClass('d-none')

    }
    btnValidation()
})


$("#UEmail").keyup(function () {

    if (emailValidation()) {
        $("#EAlert").addClass('d-none')

    } else {

        $("#EAlert").removeClass('d-none')

    }
    btnValidation()
})

$("#UPhone").keyup(function () {

    if (phoneValidation()) {
        $("#PAlert").addClass('d-none')

    } else {

        $("#PAlert").removeClass('d-none')

    }
    btnValidation()
})

$("#UAge").keyup(function () {

    if (ageValidation()) {
        $("#AAlert").addClass('d-none')

    } else {

        $("#AAlert").removeClass('d-none')

    }
    btnValidation()
})

$("#Upassword").keyup(function () {

    if (pwValidation()) {
        $("#PWAlert").addClass('d-none')

    } else {

        $("#PWAlert").removeClass('d-none')


    }
    btnValidation()
})

$("#Upassword_check").keyup(function () {

    if (repwValidation()) {
        $("#REAlert").addClass('d-none')

    } else {

        $("#REAlert").removeClass('d-none')

    }

    btnValidation()
})


function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("UName").value))
}


function emailValidation() {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(document.getElementById("UEmail").value)
}



function phoneValidation() {

    return /^(?:\+2|002)?01[0-9]{9}$/.test(document.getElementById("UPhone").value)
}


function ageValidation() {
    if ((document.getElementById("UAge").value) > 10 && (document.getElementById("UAge").value) < 120) {
        return true
    }

    else { return false }
}

function pwValidation() {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(document.getElementById("Upassword").value)
}

function repwValidation() {

    if (document.getElementById("Upassword_check").value == document.getElementById("Upassword").value) { return true }
    else { return false }

}

function btnValidation(){
    if ((nameValidation()
    && emailValidation() && phoneValidation() && ageValidation() && pwValidation() && repwValidation()) == true) { document.getElementById("SSSubmit").removeAttribute("disabled")

    console.log('hello');

    // $(".alert").addClass("d-none") 

}
    else { document.getElementById("SSSubmit").setAttribute("disabled" , true)


    console.log('done everything is true');
}

}


//--------------------------------end of events


//--------------------------------functions---------------------


async function fetchDataByName(value) {


    console.log(value);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    response = await response.json()


    meals = response.meals
    console.log(meals);



}


async function fetchDataByFL(value) {


    console.log(value);

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
    response = await response.json()


    meals = response.meals
    console.log(meals);

}


async function fetchData() {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`)
    response = await response.json()


    meals = response.meals
    console.log(meals);

}

async function displayMeals(functionnn) {

    await functionnn

    let temp = ""

    meals.forEach(element => {

        temp += `<div class="meal col-3 ">

        <div class=" position-relative overflow-hidden">
            <img class="w-100 rounded rounded-3" src="${element.strMealThumb}" alt="">
            <div class="overly w-100 h-100 position-absolute  rounded rounded-3 d-flex align-items-center">
                <span class="fw-bold fs-3 mx-2">${element.strMeal}</span>
            </div>
            <div type="${element.idMeal}" class="areaMealOverlay w-100 h-100 position-absolute z-3 opacity-0  top-0">
                 </div>
        </div>

    </div>`

    });


    document.querySelector(".mealsRow").innerHTML = temp

    showDetailsById()

}

displayMeals(fetchData())

async function getDetailsByid() {
    $(".overlayING").click(async function (e) {

        let ingID = $(e.target).attr("type")
        let temp = ""
        console.log(ingID);


        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingID}`)
        res = await res.json()
        mealsIng = res.meals
        console.log(mealsIng);


        mealsIng.forEach(e => {
            temp += `
        <div class="meal col-3 ">
    
                 <div class=" position-relative overflow-hidden">
                     <img class="w-100 rounded rounded-3" src="${e.strMealThumb}" alt="">
                     <div class="overly w-100 h-100 position-absolute  rounded rounded-3 d-flex align-items-center">
                         <span class="fw-bold fs-3 mx-2">${e.strMeal}</span>
                     </div>
                     <div type="${e.idMeal}" class="areaMealOverlay w-100 h-100 opacity-0 z-3 bg-danger top-0 position-absolute  rounded rounded-3 d-flex align-items-center">
    
                     </div>
                 </div>
    
             </div>
        `
        });

        $("#Meals .row").html(temp)


        $("section").not("#Meals").addClass("d-none")
        $("#Meals").removeClass("d-none")


        showDetailsById()

    })

};





async function showDetailsById() {
    $('.areaMealOverlay').click(async function (e) {


        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.getAttribute("type")}`)
        res = await res.json()

        let mealDet = res.meals[0]
        console.log(mealDet);


        let tempTag = ""

        let temp_ing = ""

        for (i = 1; i < 20; i++) {

            if (mealDet[`strIngredient${i}`] != null && mealDet[`strIngredient${i}`] != "") {


                temp_ing += `<span class="btn btn-info mx-1"> ${mealDet[`strMeasure${i}`]} ${mealDet[`strIngredient${i}`]} </span>`

            }


        }

        if (mealDet.strTags != null) {
            let x = mealDet.strTags.split(",")
            console.log(x);
            x.forEach(function (e) {
                tempTag += `<span class="btn btn-warning mx-1"> ${e} </span>`
            })
        }




        $("#mealDesc").html(`<div class="container">
<div class="row p-5 text-white">
    <div class="col-lg-4 px-3 " ><img src="${mealDet.strMealThumb}"  class="w-100 rounded rounded-3"
            alt="">
        <h2>${mealDet.strMeal}</h2>
    </div>

    <div class="col-lg-8 px-3">
        <h3 class="my-0">Instructions</h3>
        <p>${mealDet.strInstructions}</p>
        <h3>Area: <span>${mealDet.strArea}</span></h3>
        <h3>Category: <span>${mealDet.strCategory}</span></h3>
        <h4>Recipes</h4>

        <div  >
            ${temp_ing}

        </div>

        <h4>Tags:</h4>

        <div>
            ${tempTag}
        </div>

       

        <a target="_blank" href="${mealDet.strSource}" > <button class="btn bg-success">Source</button></a>
          <a target="_blank" href="${mealDet.strYoutube}" >  <button class="btn bg-danger">Youtube</button></a>



    </div>






</div>



</div>
`)


        $("section").not("#mealDesc").addClass("d-none")
        $("#mealDesc").removeClass("d-none")
    })
}

async function getDetailsByiCategory() {
    $(".overlayING").click(async function (e) {

        let ingID = $(e.target).attr("type")
        let temp = ""
        console.log(ingID);


        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${ingID}`)
        res = await res.json()
        mealsIng = res.meals
        console.log(mealsIng);


        mealsIng.forEach(e => {
            temp += `
        <div class="meal col-3 ">
    
                 <div class=" position-relative overflow-hidden">
                     <img class="w-100 rounded rounded-3" src="${e.strMealThumb}" alt="">
                     <div class="overly w-100 h-100 position-absolute  rounded rounded-3 d-flex align-items-center">
                         <span class="fw-bold fs-3 mx-2">${e.strMeal}</span>
                     </div>
                     <div type="${e.idMeal}" class="areaMealOverlay w-100 h-100 opacity-0 z-3 bg-danger top-0 position-absolute  rounded rounded-3 d-flex align-items-center">
    
                     </div>
                 </div>
    
             </div>
        `
        });

        $("#Meals .row").html(temp)
        $("section").not("#Meals").addClass("d-none")
        $("#Meals").removeClass("d-none")
        showDetailsById()

    })

};