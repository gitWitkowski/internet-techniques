window.addEventListener("load", (event) => {
    console.log("page is fully loaded");
    document.getElementById("stop_btn").disabled = true;
    setInterval(function () { draw(table); }, 1000 / 60 );
});

const w = 1000;
const h = 700;

var stop = false;

let table = new Array();
var n = 100;
var delay = 100;

const SORTING_TYPES = {
    BUBBLE_SORT: 0,
    INSERTION_SORT: 1,
    SELECTION_SORT: 2,
    COCKTAIL_SHAKER_SORT: 3,
    MERGE_SORT: 4,
    SHELL_SORT: 5
};

const SORTING_TYPES_URL = [
    "https://en.wikipedia.org/wiki/Bubble_sort",
    "https://en.wikipedia.org/wiki/Insertion_sort",
    "https://en.wikipedia.org/wiki/Selection_sort",
    "https://en.wikipedia.org/wiki/Cocktail_shaker_sort",
    "https://en.wikipedia.org/wiki/Merge_sort",
    "https://en.wikipedia.org/wiki/Shellsort"
];

var element_color = document.getElementById("elem_color").value;
var color1 = document.getElementById("color1").value;
var color2 = document.getElementById("color2").value;
var color3 = document.getElementById("color3").value;

function update_colors() {
    element_color = document.getElementById("elem_color").value;
    color1 = document.getElementById("color1").value;
    color2 = document.getElementById("color2").value;
    color3 = document.getElementById("color3").value;
    redraw();
}

function applySettings(){
    var select = document.getElementById("settingSelect");
    console.log(select.options[select.selectedIndex].value);
    var data = JSON.parse(select.options[select.selectedIndex].value);

    document.getElementById("mySelect").value = data.sortType;
    document.getElementById("link1").href = SORTING_TYPES_URL[document.getElementById("mySelect").selectedIndex];
    document.getElementById("numOfElements").value = data.numOfElements;
    n = data.numOfElements;
    document.getElementById("delay").value = data.delay;

    changeDelay(data.delay);

    document.getElementById("elem_color").value = data.element_color;
    document.getElementById("color1").value = data.color1;
    document.getElementById("color2").value = data.color2;
    document.getElementById("color3").value = data.color3;

    permutateArray();
    update_colors();
}

document.getElementById("mySelect").addEventListener("change", ()=>{
    var select = document.getElementById("mySelect");
    document.getElementById("link1").href = SORTING_TYPES_URL[select.selectedIndex];
});

function redraw() {
    for (let i = 0; i < n; i++) {
        table[i][1] = element_color;
    }
}

document.getElementById("elem_color").addEventListener("input", update_colors);
document.getElementById("color1").addEventListener("input", update_colors);
document.getElementById("color2").addEventListener("input", update_colors);
document.getElementById("color3").addEventListener("input", update_colors);

for (let i = 0; i < n; i++) {
    table.push([Math.floor(Math.random() * 100) + 1, element_color]);
}


function permutateArray() {
    table = new Array();
    for (let i = 0; i < n; i++)
        table.push([Math.floor(Math.random() * 600) + 1, element_color]);
}

function changeDelay(val) {
    var minp = 0;
    var maxp = 100;

    var minv = Math.log(1);
    var maxv = Math.log(1000);

    var scale = (maxv - minv) / (maxp - minp);

    delay = Math.exp(minv + scale * (val - minp));
    document.getElementById("delayLabel").innerHTML = Math.round(delay);
}

function changeNumOfElements(val) {
    n = val;
    table = new Array();
    for (let i = 0; i < n; i++) {
        table.push([Math.floor(Math.random() * 100) + 1, element_color]);
    }
    document.getElementById("numOfElementsLabel").innerHTML = val;
}

function disable() {
    stop = false;
    document.getElementById("start_btn").disabled = true;
    document.getElementById("mix_btn").disabled = true;
    document.getElementById("numOfElements").disabled = true;
    document.getElementById("elem_color").disabled = true;
    document.getElementById("color1").disabled = true;
    document.getElementById("color2").disabled = true;
    document.getElementById("color3").disabled = true;
    document.getElementById("stop_btn").disabled = false;
    try{
        document.getElementById("save").disabled = true;
        document.getElementById("apply").disabled = true;
    }catch{}
}

function enable() {
    stop = true;
    document.getElementById("start_btn").disabled = false;
    document.getElementById("mix_btn").disabled = false;
    document.getElementById("numOfElements").disabled = false;
    document.getElementById("elem_color").disabled = false;
    document.getElementById("color1").disabled = false;
    document.getElementById("color2").disabled = false;
    document.getElementById("color3").disabled = false;
    document.getElementById("stop_btn").disabled = true;
    try{
        document.getElementById("save").disabled = false;
        document.getElementById("apply").disabled = false;
    }catch{}
}

function request_stop() {
    enable();
    permutateArray();
    // setTimeout(permutateArray, 500);
}


function start() {
    disable();
    var sort = document.getElementById("mySelect");
    switch (eval(sort.options[sort.selectedIndex].value)) {
        case SORTING_TYPES.BUBBLE_SORT:
            bubbleSort(table);
            break;
        case SORTING_TYPES.INSERTION_SORT:
            insertionSort(table);
            break;
        case SORTING_TYPES.SELECTION_SORT:
            selectionSort(table);
            break;
        case SORTING_TYPES.COCKTAIL_SHAKER_SORT:
            cocktailShakerSort(table);
            break;
        case SORTING_TYPES.MERGE_SORT:
            mergeSort(0, n - 1, table);
            break;
        case SORTING_TYPES.SHELL_SORT:
            shellSort(table);
            break;
        default:
            enable();
            break;
    }
}

//
function draw(table) {
    canvas = document.getElementById("myCanvas");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(1, 1);

        let maxVal = 0;
        for (var i = 0; i < table.length; i++)
            if (table[i][0] > maxVal)
                maxVal = table[i][0];

        for (var i = 0; i < table.length; i++) {
            ctx.fillStyle = table[i][1];
            let unitWidth = w / table.length;
            let unitHeight = h / maxVal;
            ctx.beginPath();
            ctx.fillRect(i * unitWidth, h - unitHeight * table[i][0], unitWidth, unitHeight * table[i][0]);
            ctx.stroke();
        }
    }
}

//
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//
async function bubbleSort(arr) {
    for (let i = 1; i < n; i++) {
        if (stop) break;
        for (let j = 0; j < n - i; j++) {
            arr[j][1] = color1;
            arr[j + 1][1] = color3;
            await sleep(delay);
            if (arr[j][0] > arr[j + 1][0])
                [arr[j][0], arr[j + 1][0]] = [arr[j + 1][0], arr[j][0]];
            arr[j][1] = color3;
            arr[j + 1][1] = color1;
            await sleep(delay);
            arr[j][1] = element_color;
            arr[j + 1][1] = element_color;
            if (stop) break;
        }
    }
    enable();
}

//
async function cocktailShakerSort(arr) {
    var bottom = 0;
    var top = n - 1;
    var swapped = true;

    while (swapped) {
        if (stop) break;
        swapped = false;
        for (var i = bottom; i < top; i++) {
            arr[i][1] = color1;
            arr[i + 1][1] = color2;
            await sleep(delay);
            if (arr[i][0] > arr[i + 1][0]) {
                [arr[i][0], arr[i + 1][0]] = [arr[i + 1][0], arr[i][0]];
                swapped = true;
                arr[i + 1][1] = color1;
                arr[i][1] = color2;
                await sleep(delay);
            }
            arr[i][1] = element_color;
            arr[i + 1][1] = element_color;
            if (stop) break;
        }
        top--;
        for (var i = top; i > bottom; i--) {
            arr[i][1] = color1;
            arr[i - 1][1] = color2;
            await sleep(delay);
            if (arr[i][0] < arr[i - 1][0]) {
                [arr[i][0], arr[i - 1][0]] = [arr[i - 1][0], arr[i][0]];
                swapped = true;
                arr[i][1] = color2;
                arr[i - 1][1] = color1;
                await sleep(delay);
            }
            arr[i][1] = element_color;
            arr[i - 1][1] = element_color;
            if (stop) break;
        }
        bottom++;
    }
    enable();
}

//
async function insertionSort(arr) {
    for (var i = 0; i < n; i++) {
        if (stop) break;
        var j = i;
        arr[i][1] = color3;
        while (j > 0 && arr[j - 1][0] > arr[j][0]) {
            arr[i][1] = color3;
            arr[j][1] = color1;
            arr[j - 1][1] = color2;
            await sleep(delay);
            [arr[j - 1][0], arr[j][0]] = [arr[j][0], arr[j - 1][0]];
            arr[j][1] = color2;
            arr[j - 1][1] = color1;
            await sleep(delay);
            arr[j][1] = element_color;
            arr[j - 1][1] = element_color;
            j--;
            if (stop) break;
        }
        arr[i][1] = element_color;
    }
    enable();
}

//
async function merge(p, q, r, arr) {
    var lNum = q - p + 1;
    var rNum = r - q;

    let tabLeft = new Array(lNum);
    let tabRight = new Array(rNum);

    let temporaryTab = new Array(lNum + rNum);

    for (var i = 0; i < lNum; i++)
        tabLeft[i] = arr[p + i][0];

    for (var i = 0; i < rNum; i++)
        tabRight[i] = arr[q + 1 + i][0];

    var leftIndex = 0;
    var rightIndex = 0;
    var currentIndex = 0;

    while (leftIndex < lNum && rightIndex < rNum) {
        arr[p + leftIndex][1] = color1;
        arr[q + 1 + rightIndex][1] = color1;

        if (tabLeft[leftIndex] <= tabRight[rightIndex]) {
            temporaryTab[currentIndex] = tabLeft[leftIndex];
            arr[p + leftIndex][1] = color2;
            await sleep(delay);
            arr[p + leftIndex][1] = element_color;
            arr[q + 1 + rightIndex][1] = element_color;
            leftIndex++;
        } else {
            temporaryTab[currentIndex] = tabRight[rightIndex];
            arr[q + 1 + rightIndex][1] = color2;
            await sleep(delay);
            arr[p + leftIndex][1] = element_color;
            arr[q + 1 + rightIndex][1] = element_color;
            rightIndex++;
        }
        currentIndex++;
    }

    while (leftIndex < lNum) {
        arr[p + leftIndex][1] = color2;
        await sleep(delay);
        temporaryTab[currentIndex] = tabLeft[leftIndex];
        arr[p + leftIndex][1] = element_color;
        leftIndex++;
        currentIndex++;
    }

    while (rightIndex < rNum) {
        arr[q + 1 + rightIndex][1] = color2;
        await sleep(delay);
        temporaryTab[currentIndex] = tabRight[rightIndex];
        arr[q + 1 + rightIndex][1] = element_color;
        rightIndex++;
        currentIndex++;
    }

    for (var i = 0; i < (lNum + rNum); i++) {
        arr[p + i][0] = temporaryTab[i];
        arr[p + i][1] = color3;
        await sleep(delay);
        arr[p + i][1] = element_color;
    }
}

async function mergeSort(p, r, arr) {
    if (p >= r)
        return;

    var q = Math.floor((p + r) / 2);

    if (stop) return;
    await mergeSort(p, q, arr);
    await mergeSort(q + 1, r, arr);
    await merge(p, q, r, arr);

    if (p == 0 && r == n - 1)
        enable();
}

//
async function shellSort(arr) {
    const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    for (var g = 0; g < gaps.length; g++) {
        var gap = gaps[g];
        for (var i = gap; i < n; i++) {
            if (stop) break;
            var j = i;
            arr[i][1] = color3;
            while (j >= gap && arr[j - gap][0] > arr[j][0]) {
                arr[i][1] = color3;
                arr[j][1] = color1;
                arr[j - gap][1] = color2;
                await sleep(delay);
                [arr[j - gap][0], arr[j][0]] = [arr[j][0], arr[j - gap][0]];
                arr[j][1] = color2;
                arr[j - gap][1] = color1;
                await sleep(delay);
                arr[j][1] = element_color;
                arr[j - gap][1] = element_color;
                j -= gap;
                if (stop) break;
            }
            arr[i][1] = element_color;
        }
    }
    enable();
}

//
async function selectionSort(arr) {
    for (var i = 0; i < n - 1; i++) {
        if (stop) break;
        var min = i;
        arr[min][1] = color2;
        for (var j = i + 1; j < n; j++) {
            arr[j][1] = color1;
            await sleep(delay);
            if (arr[j][0] < arr[min][0]) {
                arr[min][1] = element_color;
                min = j;
                arr[min][1] = color2;
            } else {
                arr[j][1] = element_color;
            }
            if (stop) break;
        }
        arr[i][1] = color1;
        await sleep(delay);
        [arr[i][0], arr[min][0]] = [arr[min][0], arr[i][0]];
        await sleep(delay);
        arr[i][1] = element_color;
        arr[min][1] = element_color;
        await sleep(delay);
    }
    enable();
}