document.getElementById('input-btn').addEventListener('click', function(){
    const inputField = document.getElementById('input-field').value;
    const cardsId = document.getElementById('cardsId');
    cardsId.textContent ='';
    const inputErrorDiv = document.getElementById('input-error');
    // clear text
    inputErrorDiv.textContent = '';

    if(inputField.length == 0){
        inputErrorDiv.innerText = 'Please input somthing on search bar';

    } else{
        getUrlString(inputField)
    }
})

const fetched = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
 
const getUrlString = inputData =>{
    if(inputData.length == 1){
        loadSportsData(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputData}`);
       
    } else{
        loadSportsData(`https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputData}`);
       
    }
}
const loadSportsData = url =>{
 
//    console.log(url)
   fetched(url)
   .then(data =>{

    //turn of spinner
    document.getElementById("spinner").classList.add("d-none");
    // console.log(data)
    const dataArray = data.teams;  
    console.log(dataArray.length)
    const cardsId = document.getElementById('cardsId');
    dataArray.forEach(team => {
        // console.log(team)
        const {strDescriptionEN, strTeamBadge, idTeam, strTeam} = team;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="displaySingleTeam('${strTeam}')"  class="card">
            <img src="${strTeamBadge}" class="card-img-top img-fluid p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${strTeam}</h5>
                <p class="card-text">${strDescriptionEN.slice(1, 120)}</p>
            </div>
        </div>
        `;
        cardsId.appendChild(div);
     
    });
   })


}


const displaySingleTeam = name =>{
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${name}`;
    window.scrollTo(0, 40);
    fetched(url)
    .then(data =>{
        console.log(data.teams[0])
        const singleTeam = data.teams[0];
        const {strDescriptionEN, strTeamBadge, strTeam, strYoutube} = singleTeam;
        const singleDiv = document.getElementById('single-card');
        singleDiv.textContent = '';
        const div = document.createElement('div');
        // div.style = 'width: 18rem;';
        div.classList.add('card', 'mb-3', 'w-25', 'mx-auto', 'my-4');
        div.innerHTML = `
        <img src="${strTeamBadge}" class="card-img-top img-fliud" alt="...">
        <div class="card-body">
          <h5 class="card-title">${strTeam}</h5>
          <p class="card-text">${strDescriptionEN.slice(1, 50)}</p>
        </div>
        `;
        singleDiv.appendChild(div);

    })
}