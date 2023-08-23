const table_main = document.getElementById("periodic-table-main");
const table_bottom = document.getElementById("periodic-table-bottom");

function addBlankEntry(el, number) {
    const d = document.createElement("div");
    d.className = "blank"
    table_main.appendChild(d);
}

function addElementEntry(el, number) {
    const d = document.createElement("div");

    if(el === null) {
        d.className = "element unknown";
        table_main.appendChild(d);
        return;
    }

    console.log(el);

    const {symbol, name, category} = el;
    const atomic_mass = el["atomic-mass"];

    d.className = `element ${category}`;
    d.innerText = symbol;

    table_main.appendChild(d);
}
function addLanathideEntry(el, number) {

}

function addActinideEntry(el, number) {

}

function addBreak() {
    table_main.appendChild(document.createElement("br"));
}

for(let i = 1; i <= elements.length; i++) {
    addElementEntry(elements[i - 1], i);
    if(i === 4 || i === 12) for(let j = 0; j < 10; j++) addBlankEntry();
    if(i === 1) for(let j = 0; j < 16; j++) addBlankEntry();
    if([2, 10, 18, 36, 54, 86, 118].includes(i)) addBreak();
}