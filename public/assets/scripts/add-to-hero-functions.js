const basicValuesArray = [strengthVal, defenceVal, staminaVal, agilityVal];
basicValuesArray.forEach((basicValue)=>{
    basicValue.addEventListener('click', (event)=>{
        const clickedTargetId = event.target.parentNode.id;
        const clickedSpanClass = event.target.classList.value;
        if (checkSumOfValues(clickedSpanClass, clickedTargetId)) {

            clickedSpanClass === 'inc' ? tempWarrior[`${clickedTargetId}`] += 1 : tempWarrior[`${clickedTargetId}`] -= 1;
        } else if (clickedSpanClass === 'dec' && tempWarrior[`${clickedTargetId}`] > 1) {

            clickedSpanClass === 'dec' ? tempWarrior[`${clickedTargetId}`] -= 1 : null;

        }
        changeHTML(clickedTargetId);

    });
});

function changeHTML(id){
    const clickedLi = document.querySelector(`#${id} strong`);
    clickedLi.textContent = tempWarrior[`${id}`];

    const sumFromTempWarrior = Object.values(tempWarrior).reduce((prev, curr) => prev + curr, 0 );
    const incArray = [strengthInc, defenceInc, staminaInc, agilityInc];
    if (sumFromTempWarrior < 10){
        for (const skill of incArray){
            skill.classList.remove('disabled')
        }
    } else if (sumFromTempWarrior >= 9){
        for (const skill of incArray){
            skill.classList.add('disabled')
        }
    }

    const listFromPage = document.querySelector('ul');
    console.log(listFromPage.children.length)
    if (listFromPage.children.length === 5 && sumFromTempWarrior === 10) {
        const li = document.createElement('li');
        li.classList.add('store')
        li.innerHTML = `<h2><a href=\"/chosen-skills?${tempWarriorToString()}\">Store</a></h2>`
        listFromPage.appendChild(li);
    } else if (listFromPage.children.length > 5 && sumFromTempWarrior < 10){
        listFromPage.lastElementChild.remove();
    }
};

function checkSumOfValues(incDec, classOfClicked){
    if (incDec === 'dec' && tempWarrior[`${classOfClicked}`] <= 1) return false;
    const valuesArray = [strengthVal, defenceVal, staminaVal, agilityVal];
    const sumFromArrayOfValues = valuesArray.reduce((prev, curr)=> prev+Number(curr.childNodes[3].textContent), 0)
    const sumFromTempWarrior = Object.values(tempWarrior).reduce((prev, curr) => prev + curr, 0 );

    if (sumFromArrayOfValues !== sumFromTempWarrior) {
        alert('Do Not Cheat!');
        window.location.reload(true);
        return false;
    }

    return true;
}

const tempWarriorToString= ()=> {
    const warriorName = document.querySelector('h1 strong').textContent;
    let stringedWarrrior = [`name=${warriorName}&`];
    Object.entries(tempWarrior).forEach(([key, value])=> {
        stringedWarrrior.push(`${key}=${value}`);
        stringedWarrrior.push(`&`);
    });
    stringedWarrrior.pop();
    stringedWarrrior = stringedWarrrior.join('');
    console.log(stringedWarrrior);
    console.log(typeof stringedWarrrior);
    return stringedWarrrior.trim();
}