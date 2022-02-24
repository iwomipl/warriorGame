const reset = document.querySelector('#reset');
const fight = document.querySelector('#fight');



reset.addEventListener('click', (event)=> {
    const warrior = `${event.target.value}`;
    let newSearch = window.location.search;
    newSearch = newSearch.indexOf('&opponentName')> 1 ? newSearch.substring(0, newSearch.indexOf('&opponentName')) : window.location.search;

    const newLocation = window.location.protocol + "//" + window.location.host + window.location.pathname + newSearch +`&opponentName=${warrior}`;
    console.log(newLocation);
    window.location = newLocation;
});

fight.addEventListener('click', (event)=>{
    const warriors = `${event.target.value}`;
    const [warrior1, warrior2] = warriors.split('#%^');
    const newSearchOpponent = `${window.location.search}&warriorOne=${warrior1}&warriorTwo=${warrior2}`;
    const newLocationOpponent = window.location.protocol + "//" + window.location.host + '/fight' + newSearchOpponent;
    window.location = newLocationOpponent;
})