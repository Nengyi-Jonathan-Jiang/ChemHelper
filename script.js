const table_main = document.getElementById("periodic-table-main");
const table_bottom = document.getElementById("periodic-table-bottom");

function addBlankEntry() {
    const d = document.createElement("div");
    d.className = "blank"
    d.innerText = ".";
    table_main.appendChild(d);
}

function createElementEntry(el, number) {
    const d = document.createElement("div");
    d.dataset.number = number;

    if(el === null) {
        d.className = "element unknown";
        d.innerText = "?";
        return d;
    }

    const {symbol, name, category, "atomic-mass": atomic_mass, "oxidation-states": oxidation_states, radioactive} = el;

    d.className = `element ${category}`;
    d.innerText = symbol;

    if(radioactive) d.className += ' radioactive';

    const mass_d = document.createElement("span");
    mass_d.className = 'element-mass';
    mass_d.innerText = isNaN(atomic_mass) ? '?' : atomic_mass;
    d.appendChild(mass_d);

    const name_d = document.createElement("span");
    name_d.className = 'element-name';
    name_d.innerText = name;
    if(el['text-shrink']) name_d.style.setProperty('--text-shrink', el['text-shrink'] * 100 + '%');
    d.appendChild(name_d);

    if(oxidation_states) {
        const oxidation_d = document.createElement("span");
        oxidation_d.className = 'element-oxidation';
        for(let i of oxidation_states){
            const s = document.createElement("span");
            s.innerText = i;
            oxidation_d.appendChild(s);
        }
        d.appendChild(oxidation_d);
    }

    return d;
}
function createBreak() {
    return document.createElement("br");
}

for(let i = 1; i <= elements.length; i++) {

    const entry = createElementEntry(elements[i - 1], i)
    if(i > 56 && i <= 70 || i > 88 && i <= 102) table_bottom.appendChild(entry);
    else table_main.appendChild(entry);

    if(i === 4 || i === 12) for(let j = 0; j < 10; j++) addBlankEntry();
    if(i === 1) for(let j = 0; j < 16; j++) addBlankEntry();

    if([2, 10, 18, 36, 54, 86, 118].includes(i)) table_main.appendChild(createBreak());
    if(i === 70) table_bottom.appendChild(createBreak());
}



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