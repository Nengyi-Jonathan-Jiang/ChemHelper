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

    const {symbol, name, category, "atomic-mass": atomic_mass, "oxidation-states": oxidation_states} = el;

    d.className = `element ${category}`;
    d.innerText = symbol;

    const mass_d = document.createElement("span");
    mass_d.className = 'element-mass';
    mass_d.innerText = isNaN(atomic_mass) ? '?' : atomic_mass;
    d.appendChild(mass_d);

    const name_d = document.createElement("span");
    name_d.className = 'element-name';
    name_d.innerText = name;
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