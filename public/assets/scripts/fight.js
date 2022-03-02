const fight = document.querySelector('#fight');

fight.addEventListener('click', (event)=> {
    const warriors = `${event.target.value}`;
    const [warrior1, warrior2] = warriors.split('#%^');
    let newSearch = window.location.search;
    newSearch = newSearch.indexOf('&strength=')> 1 ? newSearch.substring(0, newSearch.indexOf('&strength='))+`&warriorTwoName=${warrior2}` : window.location.search;
    const newLocation = window.location.protocol + "//" + window.location.host + '/next-fight' + newSearch;
    console.log(newLocation);
    window.location = newLocation;
});