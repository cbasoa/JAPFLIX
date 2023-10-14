let lista = document.getElementById("lista");
let inputSearch = document.getElementById("inputBuscar");
let btnSearch = document.getElementById("btnBuscar");
let URL = "https://japceibal.github.io/japflix_api/movies-data.json";
let item = [];


//Obtenemos el JSON
function getJSON() {
    fetch(URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })

        .then(data => {
            item = data
            console.log(item)
            searchFilter(item)
        })

        .catch(error => console.log(error))
}
getJSON();

// Busqueda
function searchFilter(item) {
    btnSearch.addEventListener("click", function () {
        let searched = inputSearch.value.toLowerCase();
        console.log(searched);
        lista.innerHTML = "";
        for (let i = 0; i < item.length; i++) {
            if ((item[i].title.toLowerCase().includes(searched)) || (item[i].genres[0].name.toLowerCase().includes(searched)) || (item[i].tagline.toLowerCase().includes(searched)) || (item[i].overview.toLowerCase().includes(searched))) {
                lista.innerHTML += `

            <button class="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop${i}" aria-controls="offcanvasTop${i}"> ${item[i].title}  ${item[i].tagline}  <span class="fa fa-star checked">${item[i].vote_average}</span> </button>
           
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop${i}" aria-labelledby="offcanvasTopLabel">
            <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">${item[i].title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button></div>
            <div class="offcanvas-body">
            ${item[i].overview}
            ${item[i].genres.map(genres => genres.name)}
            </div>

            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            More
            </button>
            <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Release_date: ${getYear(item[i])}</a></li>
            <li><a class="dropdown-item" href="#">Runtime:  ${item[i].runtime}</a></li>
            <li><a class="dropdown-item" href="#">Budget:  ${item[i].budget}</a></li>
            <li><a class="dropdown-item" href="#">Revenue: ${item[i].revenue}</a></li>
            
            </ul>
            </div>
            </div>
                     `;

            }
        }
    });
}

//Obtener el año 
function getYear(item){
    
    const moonLanding = new Date(item.release_date);
    return moonLanding.getFullYear();
}