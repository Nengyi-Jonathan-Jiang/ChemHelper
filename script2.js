const info_bar = document.getElementById('info-bar');
const info_name_d = document.getElementById('element-name-info');
const info_mass_d = document.getElementById('atomic-mass-info');
const info_o_states_d = document.getElementById('oxidation-states-info');

function setCurrentElement(el) {
    console.log(el);

    if(el === null) {
        info_bar.dataset.state = 'hidden';
        return;
    }

    info_name_d.innerText = el.name;
    info_mass_d.innerText = el['atomic-mass'];
    info_o_states_d.innerText = el['oxidation-states']?.join(', ') ?? '?';

    info_bar.dataset.state = '';
}

document.onclick = _ => {
    setCurrentElement(null);
}

let allElements = document.querySelectorAll('.element');
for(let i of allElements){
    let idx = i.dataset.number - 1;
    let el = elements[idx];
    i.onclick = event => (setCurrentElement(el), event.stopPropagation());
}