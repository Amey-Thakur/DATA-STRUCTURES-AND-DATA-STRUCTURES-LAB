/**
 * ================================================================
 *   Data Structures Lab (DS Lab) - Interactive Logic
 * ================================================================
 *   Author: Amey Thakur
 *   GitHub: https://github.com/Amey-Thakur
 *   Course: Data Structures (DS) Lab
 *   Roll No: 50
 *   Batch: B3
 *   Date: January 17, 2020
 * ================================================================
 */

/**
 * =========================================
 *   CORE FUNCTIONALITY
 * =========================================
 */

// Set Current Year
const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Back to Top Logic
const backToTopBtn = document.getElementById("btn-back-to-top");
if (backToTopBtn) {
    window.onscroll = function () { scrollFunction(); };
    backToTopBtn.addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}

function scrollFunction() {
    if (!backToTopBtn) return;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
}

// Theme Toggle Logic
if (toggleBtn) {
    const themeIcon = toggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) updateIcon(themeIcon, savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (themeIcon) updateIcon(themeIcon, newTheme);
    });
}

function updateIcon(icon, theme) {
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Scroll Reveal Logic using Intersection Observer
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => revealObserver.observe(el));

// =========================================
//   MULTI-ALGORITHM VISUALIZER
// =========================================
const visualizerContainer = document.getElementById('visualizer-container');
const btnShuffle = document.getElementById('btn-shuffle');
const btnRun = document.getElementById('btn-run');
const btnRunText = document.getElementById('btn-run-text');
const speedSlider = document.getElementById('speed-slider');
const algoSelect = document.getElementById('algo-select');
const algoTitle = document.getElementById('algo-title');
const algoDescription = document.getElementById('algo-description');
const searchControls = document.getElementById('search-controls');
const searchTarget = document.getElementById('search-target');
const algoLegend = document.getElementById('algo-legend');
const algoComplexity = document.getElementById('algo-complexity');
const pseudoCodeEl = document.getElementById('pseudo-code-display');

// Pseudo-code Strings
const algoPseudoCode = {
    bubble: [
        "for (int i = 0; i < n - 1; i++) {",
        "    for (int j = 0; j < n - i - 1; j++) {",
        "        if (array[j] > array[j + 1]) {",
        "            swap(&array[j], &array[j+1]);",
        "        }",
        "    }",
        "}"
    ],
    insertion: [
        "for (int i = 1; i < n; i++) {",
        "    int key = array[i];",
        "    int j = i - 1;",
        "    while (j >= 0 && array[j] > key) {",
        "        array[j + 1] = array[j];",
        "        j = j - 1;",
        "    }",
        "    array[j + 1] = key;",
        "}"
    ],
    selection: [
        "for (int i = 0; i < n - 1; i++) {",
        "    int min_idx = i;",
        "    for (int j = i + 1; j < n; j++) {",
        "        if (array[j] < array[min_idx])",
        "            min_idx = j;",
        "    }",
        "    swap(&array[min_idx], &array[i]);",
        "}"
    ],
    quick: [
        "void quickSort(int arr[], int low, int high) {",
        "    if (low < high) {",
        "        int pi = partition(arr, low, high);",
        "        quickSort(arr, low, pi - 1);",
        "        quickSort(arr, pi + 1, high);",
        "    }",
        "}",
        "int partition(...) { ... pivot logic ... }"
    ],
    merge: [
        "void mergeSort(int arr[], int l, int r) {",
        "    if (l < r) {",
        "        int m = l + (r - l) / 2;",
        "        mergeSort(arr, l, m);",
        "        mergeSort(arr, m + 1, r);",
        "        merge(arr, l, m, r);",
        "    }",
        "}"
    ],
    heap: [
        "for (int i = n / 2 - 1; i >= 0; i--)",
        "    heapify(arr, n, i);",
        "for (int i = n - 1; i > 0; i--) {",
        "    swap(&arr[0], &arr[i]);",
        "    heapify(arr, i, 0);",
        "}"
    ],
    shell: [
        "for (int gap = n/2; gap > 0; gap /= 2) {",
        "    for (int i = gap; i < n; i += 1) {",
        "        int temp = a[i];",
        "        for (j = i; j >= gap && a[j-gap] > temp; j -= gap)",
        "            a[j] = a[j-gap];",
        "        a[j] = temp;",
        "    }",
        "}"
    ],
    linear: [
        "for (int i = 0; i < n; i++) {",
        "    if (arr[i] == x)",
        "        return i;",
        "}",
        "return -1;"
    ],
    binary: [
        "while (l <= r) {",
        "    int m = l + (r - l) / 2;",
        "    if (arr[m] == x) return m;",
        "    if (arr[m] < x) l = m + 1;",
        "    else r = m - 1;",
        "}",
        "return -1;"
    ],
    cocktail: [
        "do {",
        "    swapped = false;",
        "    for (i = 0; i < end; i++) { ... } // Forward",
        "    if (!swapped) break;",
        "    swapped = false;",
        "    for (i = end; i > 0; i--) { ... } // Backward",
        "} while (swapped);"
    ]
};

// ... (Rest of code)

async function highlightLine(lineIdx) {
    if (!pseudoCodeEl) return;
    const lines = pseudoCodeEl.querySelectorAll('.pseudo-code-line');
    lines.forEach((line, idx) => {
        if (idx === lineIdx) line.classList.add('highlight-line');
        else line.classList.remove('highlight-line');
    });
}

// ...

// Cocktail Shaker Sort
async function cocktailSort() {
    renderPseudoCode(algoPseudoCode.cocktail);
    const n = array.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;
    const sortedIndices = [];

    await highlightLine(0); // do {

    do {
        swapped = false;
        await highlightLine(1); // swapped = false

        // Forward pass
        await highlightLine(2); // Forward loop
        for (let i = start; i < end; ++i) {
            if (!isRunning) return;
            renderBars([i, i + 1], [], sortedIndices);
            await sleep(getDelay());

            if (array[i] > array[i + 1]) {
                renderBars([], [i, i + 1], sortedIndices);
                await sleep(getDelay());
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }

        if (!swapped) {
            await highlightLine(3); // break
            break;
        }

        swapped = false;
        await highlightLine(4); // swapped = false
        end--;
        sortedIndices.push(end + 1);

        // Backward pass
        await highlightLine(5); // Backward loop
        for (let i = end - 1; i >= start; --i) {
            if (!isRunning) return;
            renderBars([i, i + 1], [], sortedIndices);
            await sleep(getDelay());

            if (array[i] > array[i + 1]) {
                renderBars([], [i, i + 1], sortedIndices);
                await sleep(getDelay());
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }

        start++;
        sortedIndices.push(start - 1);
        await highlightLine(6); // } while(swapped)

    } while (swapped && isRunning);

    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
    await highlightLine(-1);
}
let array = [];
let isRunning = false;
const ARRAY_SIZE = 25;
const MAX_VALUE = 180;
let dsArray = []; // For Stack/Queue

// Algorithm descriptions
const algoInfo = {
    bubble: { title: 'Bubble Sort', desc: 'Repeatedly compares adjacent elements and swaps them if they are in the wrong order.', complexity: 'O(n²)' },
    insertion: { title: 'Insertion Sort', desc: 'Builds the sorted array one element at a time by inserting each element into its correct position.', complexity: 'O(n²)' },
    selection: { title: 'Selection Sort', desc: 'Finds the minimum element and places it at the beginning, then repeats for remaining elements.', complexity: 'O(n²)' },
    quick: { title: 'Quick Sort', desc: 'Uses divide-and-conquer with a pivot element to partition and recursively sort subarrays.', complexity: 'O(n log n)' },
    merge: { title: 'Merge Sort', desc: 'Divides array into halves, sorts them recursively, and merges sorted halves.', complexity: 'O(n log n)' },
    heap: { title: 'Heap Sort', desc: 'Builds a max-heap from the array and repeatedly extracts the maximum element.', complexity: 'O(n log n)' },
    shell: { title: 'Shell Sort', desc: 'Generalization of insertion sort that allows exchange of far items.', complexity: 'O(n log n)' },
    linear: { title: 'Linear Search', desc: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.', complexity: 'O(n)' },
    binary: { title: 'Binary Search', desc: 'Efficiently finds a target value in a sorted array by repeatedly dividing the search interval in half.', complexity: 'O(log n)' },
    cocktail: { title: 'Cocktail Shaker Sort', desc: 'Bidirectional Bubble Sort that traverses the list in both directions, alternatively bubbling large elements to end and small elements to beginning.', complexity: 'O(n²)' },
};



// Initialize random array
function initArray() {
    array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        array.push(Math.floor(Math.random() * MAX_VALUE) + 20);
    }
    renderBars();
}

// Initialize sorted array for binary search
function initSortedArray() {
    array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
        array.push(Math.floor((i + 1) * (MAX_VALUE / ARRAY_SIZE)) + 10);
    }
    if (searchTarget) {
        searchTarget.value = array[Math.floor(Math.random() * ARRAY_SIZE)];
    }
    renderBars([], [], [], []);
}

// Render bars with highlighting
function renderBars(comparing = [], swapping = [], sorted = [], found = []) {
    const container = visualizerContainer || document.getElementById('visualizer-container');
    if (!container) return;
    container.innerHTML = '';
    // Reset Container Styles for Bar Chart
    visualizerContainer.style.flexDirection = 'row';
    visualizerContainer.style.alignItems = 'flex-end';
    visualizerContainer.style.justifyContent = 'center';
    visualizerContainer.style.paddingBottom = '20px';

    const containerWidth = visualizerContainer.offsetWidth - 40;
    const barWidth = Math.max(8, Math.floor(containerWidth / ARRAY_SIZE) - 4);

    array.forEach((value, idx) => {
        const bar = document.createElement('div');
        bar.style.width = barWidth + 'px';
        bar.style.height = value + 'px';
        bar.style.borderRadius = '4px 4px 0 0';
        bar.style.transition = 'height 0.15s ease, background 0.15s ease';
        bar.style.position = 'relative';

        if (found.includes(idx)) {
            bar.style.background = '#8b5cf6'; // Purple - found
        } else if (sorted.includes(idx)) {
            bar.style.background = '#10b981'; // Green - sorted
        } else if (swapping.includes(idx)) {
            bar.style.background = '#ef4444'; // Red - swapping
        } else if (comparing.includes(idx)) {
            bar.style.background = '#f59e0b'; // Yellow - comparing
        } else {
            bar.style.background = 'var(--accent-color)'; // Default
        }

        visualizerContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getDelay() {
    if (!speedSlider) return 100;
    const speed = speedSlider.value;
    return Math.max(10, 500 - (speed * 4.5));
}

// Pseudo-code Helpers
function renderPseudoCode(lines) {
    if (!pseudoCodeEl) return;
    if (!lines) {
        pseudoCodeEl.style.display = 'none';
        return;
    }
    pseudoCodeEl.innerHTML = lines.map(line => `<div class="pseudo-code-line">${line}</div>`).join('');
    pseudoCodeEl.style.display = 'block';
}



// ========== SORTING ALGORITHMS ==========

// Bubble Sort
async function bubbleSort() {
    renderPseudoCode(algoPseudoCode.bubble);
    const n = array.length;
    const sortedIndices = [];

    await highlightLine(0); // Outer loop start
    for (let i = 0; i < n - 1; i++) {
        await highlightLine(1); // Inner loop start
        for (let j = 0; j < n - i - 1; j++) {
            if (!isRunning) return;

            await highlightLine(2); // Comparison
            renderBars([j, j + 1], [], sortedIndices);
            await sleep(getDelay());

            if (array[j] > array[j + 1]) {
                await highlightLine(3); // Swap
                renderBars([], [j, j + 1], sortedIndices);
                await sleep(getDelay());
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            await highlightLine(1); // Inner loop repeat
        }
        sortedIndices.push(n - 1 - i);
        await highlightLine(0); // Outer loop repeat
    }
    await highlightLine(-1); // Clear highlight
    sortedIndices.push(0);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}


// Cocktail Shaker Sort
async function cocktailSort() {
    renderPseudoCode(algoPseudoCode.cocktail);
    const n = array.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;
    const sortedIndices = [];

    await highlightLine(0); // swapped = true
    await highlightLine(1); // while (swapped)

    while (swapped && isRunning) {
        swapped = false;
        await highlightLine(2); // swapped = false

        // Forward pass
        await highlightLine(3); // for loop forward
        for (let i = start; i < end; ++i) {
            if (!isRunning) return;
            renderBars([i, i + 1], [], sortedIndices);
            await highlightLine(4); // compare
            await sleep(getDelay());

            if (array[i] > array[i + 1]) {
                await highlightLine(5); // swap
                renderBars([], [i, i + 1], sortedIndices);
                await sleep(getDelay());
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await highlightLine(6); // swapped = true
            }
        }

        if (!swapped) {
            await highlightLine(9); // if (!swapped) break
            break;
        }

        swapped = false;
        end--;
        sortedIndices.push(end + 1); // Last element is sorted
        await highlightLine(10); // swapped = false
        await highlightLine(11); // --end

        // Backward pass
        await highlightLine(12); // for loop backward
        for (let i = end - 1; i >= start; --i) {
            if (!isRunning) return;
            renderBars([i, i + 1], [], sortedIndices);
            await highlightLine(13); // compare
            await sleep(getDelay());

            if (array[i] > array[i + 1]) {
                await highlightLine(14); // swap
                renderBars([], [i, i + 1], sortedIndices);
                await sleep(getDelay());
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
                await highlightLine(15); // swapped = true
            }
        }
        start++;
        sortedIndices.push(start - 1); // First element is sorted
        await highlightLine(18); // ++start
    }

    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Insertion Sort
async function insertionSort() {
    renderPseudoCode(algoPseudoCode.insertion);
    const n = array.length;
    const sortedIndices = [0];
    await highlightLine(0); // Loop start
    for (let i = 1; i < n; i++) {
        if (!isRunning) return;
        await highlightLine(1); // key = array[i]
        let key = array[i];
        await highlightLine(2); // j = i - 1
        let j = i - 1;
        renderBars([i], [], sortedIndices);
        await sleep(getDelay());

        while (j >= 0 && array[j] > key) {
            await highlightLine(3); // While condition (checked implicitly)
            if (!isRunning) return;
            renderBars([j], [j, j + 1], sortedIndices);
            await highlightLine(4); // array[j+1] = array[j]
            await sleep(getDelay());
            array[j + 1] = array[j];
            await highlightLine(5); // j--
            j--;
        }
        await highlightLine(7); // array[j+1] = key
        array[j + 1] = key;
        sortedIndices.push(i);
        renderBars([], [], sortedIndices);
        await sleep(getDelay());
    }
    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Selection Sort
async function selectionSort() {
    renderPseudoCode(algoPseudoCode.selection);
    const n = array.length;
    const sortedIndices = [];
    await highlightLine(0); // Outer loop
    for (let i = 0; i < n - 1; i++) {
        if (!isRunning) return;
        await highlightLine(1); // min_idx = i
        let minIdx = i;
        await highlightLine(2); // Inner loop start
        for (let j = i + 1; j < n; j++) {
            if (!isRunning) return;
            renderBars([minIdx, j], [], sortedIndices);
            await highlightLine(3); // Comparison
            await sleep(getDelay());
            if (array[j] < array[minIdx]) {
                await highlightLine(4); // Update min_idx
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            await highlightLine(6); // Swap
            renderBars([], [i, minIdx], sortedIndices);
            await sleep(getDelay());
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
        }
        sortedIndices.push(i);
    }
    await highlightLine(-1);
    sortedIndices.push(n - 1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Quick Sort
async function quickSort(low = 0, high = array.length - 1, sortedIndices = []) {
    if (low === 0 && high === array.length - 1) {
        renderPseudoCode(algoPseudoCode.quick);
    }

    if (low < high && isRunning) {
        await highlightLine(1); // if low < high
        await sleep(getDelay() / 2);

        await highlightLine(2); // partition
        await sleep(getDelay() / 2);
        const pi = await partition(low, high, sortedIndices);

        if (!isRunning) return;

        await highlightLine(3); // recursive left
        await sleep(getDelay() / 2);
        await quickSort(low, pi - 1, sortedIndices);

        await highlightLine(4); // recursive right
        await sleep(getDelay() / 2);
        await quickSort(pi + 1, high, sortedIndices);
    }

    if (low === 0 && high === array.length - 1) {
        await highlightLine(-1);
        renderBars([], [], Array.from({ length: array.length }, (_, i) => i));
        finishRun();
    }
}

async function partition(low, high, sortedIndices) {
    await highlightLine(7); // Partition function start (pseudo)
    const pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (!isRunning) return;
        renderBars([j, high], [], sortedIndices);
        await sleep(getDelay());
        if (array[j] < pivot) {
            i++;
            renderBars([], [i, j], sortedIndices);
            await sleep(getDelay());
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    renderBars([], [i + 1, high], sortedIndices);
    await sleep(getDelay());
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    sortedIndices.push(i + 1);
    return i + 1;
}

// Merge Sort
async function mergeSort(left = 0, right = array.length - 1) {
    if (left === 0 && right === array.length - 1) {
        renderPseudoCode(algoPseudoCode.merge);
    }

    if (left >= right) return;

    await highlightLine(1); // if l < r
    const mid = Math.floor((left + right) / 2);
    if (!isRunning) return;

    await highlightLine(2); // mid calc
    await highlightLine(3); // recursive left
    await mergeSort(left, mid);

    await highlightLine(4); // recursive right
    await mergeSort(mid + 1, right);

    await highlightLine(5); // merge call
    await merge(left, mid, right);

    if (left === 0 && right === array.length - 1) {
        await highlightLine(-1);
        renderBars([], [], Array.from({ length: array.length }, (_, i) => i));
        finishRun();
    }
}

async function merge(left, mid, right) {
    if (!isRunning) return;
    const n1 = mid - left + 1;
    const n2 = right - mid;
    const L = array.slice(left, mid + 1);
    const R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (!isRunning) return;
        renderBars([k], [], [], []);
        await sleep(getDelay());

        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        renderBars([], [k], [], []);
        await sleep(getDelay());
        k++;
    }

    while (i < n1) {
        if (!isRunning) return;
        array[k] = L[i];
        renderBars([], [k], [], []);
        await sleep(getDelay());
        i++; k++;
    }

    while (j < n2) {
        if (!isRunning) return;
        array[k] = R[j];
        renderBars([], [k], [], []);
        await sleep(getDelay());
        j++; k++;
    }
}

// Heap Sort
async function heapSort() {
    renderPseudoCode(algoPseudoCode.heap);
    const n = array.length;

    // Build max heap
    await highlightLine(0); // loop start
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (!isRunning) return;
        await highlightLine(1); // heapify call
        await heapify(n, i);
    }

    // Extract elements from heap
    await highlightLine(2); // extraction loop
    for (let i = n - 1; i > 0; i--) {
        if (!isRunning) return;
        renderBars([0, i], [], []);
        await sleep(getDelay());

        await highlightLine(3); // swap(0, i)
        [array[0], array[i]] = [array[i], array[0]];
        renderBars([], [0, i], [], []);
        await sleep(getDelay());

        await highlightLine(4); // heapify(i, 0)
        await heapify(i, 0);
    }
    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

async function heapify(n, i) {
    if (!isRunning) return;
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < n && array[l] > array[largest]) largest = l;
    if (r < n && array[r] > array[largest]) largest = r;

    if (largest !== i) {
        renderBars([i, largest], [], []);
        await sleep(getDelay());

        [array[i], array[largest]] = [array[largest], array[i]];
        renderBars([], [i, largest], [], []);
        await sleep(getDelay());

        await heapify(n, largest);
    }
}

// Shell Sort
async function shellSort() {
    renderPseudoCode(algoPseudoCode.shell);
    const n = array.length;
    await highlightLine(0); // Outer loop (gap)
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        await highlightLine(1); // i loop
        for (let i = gap; i < n; i++) {
            if (!isRunning) return;
            await highlightLine(2); // temp = array[i]
            let temp = array[i];
            let j;
            await highlightLine(3); // inner loop
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                if (!isRunning) return;
                renderBars([j, j - gap], [], []);
                await sleep(getDelay());
                await highlightLine(4); // array[j] = array[j-gap]
                array[j] = array[j - gap];
                renderBars([], [j], [], []);
                await sleep(getDelay());
            }
            await highlightLine(5); // array[j] = temp
            array[j] = temp;
        }
    }
    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// ========== SEARCHING ALGORITHMS ==========

// Linear Search
async function linearSearch() {
    renderPseudoCode(algoPseudoCode.linear);
    if (!searchTarget) return;
    const target = parseInt(searchTarget.value);
    const n = array.length;

    await highlightLine(0); // Loop start
    for (let i = 0; i < n; i++) {
        if (!isRunning) return;

        renderBars([i], [], [], []); // Highlight current being checked
        await highlightLine(1); // if arr[i] == x
        await sleep(getDelay());

        if (array[i] === target) {
            await highlightLine(2); // return i
            renderBars([], [], [], [i]); // Found!
            await sleep(1000);
            finishRun();
            await highlightLine(-1);
            return;
        }
    }
    await highlightLine(4); // return -1
    // Not found
    renderBars([], Array.from({ length: n }, (_, i) => i), [], []);
    await sleep(500);
    renderBars();
    finishRun();
    await highlightLine(-1);
}

// Binary Search
async function binarySearch() {
    renderPseudoCode(algoPseudoCode.binary);
    if (!searchTarget) return;
    const target = parseInt(searchTarget.value);
    let left = 0, right = array.length - 1;

    await highlightLine(0); // while loop
    while (left <= right && isRunning) {
        const mid = Math.floor((left + right) / 2);
        await highlightLine(1); // int m = ...
        renderBars([left, right], [mid], [], []);
        await sleep(getDelay() * 2);

        await highlightLine(2); // if arr[m] == x
        if (array[mid] === target) {
            renderBars([], [], [], [mid]);
            await sleep(1000);
            finishRun();
            await highlightLine(-1);
            return;
        } else if (array[mid] < target) {
            await highlightLine(3); // if arr[m] < x
            left = mid + 1;
        } else {
            await highlightLine(4); // else
            right = mid - 1;
        }
        await highlightLine(0); // loop check
    }

    await highlightLine(6); // return -1
    // Not found - flash red
    renderBars([], Array.from({ length: array.length }, (_, i) => i), [], []);
    await sleep(500);
    renderBars();
    finishRun();
    await highlightLine(-1);
}

function finishRun() {
    isRunning = false;
    const algo = algoSelect ? algoSelect.value : 'bubble';
    if (btnRunText) btnRunText.textContent = algo === 'binary' ? 'Search' : 'Start';
}

// Run selected algorithm
function runAlgorithm() {
    if (!algoSelect) return;
    const algo = algoSelect.value;
    switch (algo) {
        case 'bubble': bubbleSort(); break;
        case 'cocktail': cocktailSort(); break;
        case 'insertion': insertionSort(); break;
        case 'selection': selectionSort(); break;
        case 'quick': quickSort(); break;
        case 'merge': mergeSort(); break;
        case 'heap': heapSort(); break;
        case 'shell': shellSort(); break;
        case 'linear': linearSearch(); break;
        case 'binary': binarySearch(); break;
    }
}

// Initialize AOS and PWA
document.addEventListener('DOMContentLoaded', () => {
    // PWA Service Worker Registration
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(err => console.log('Service Worker registration failed', err));
        });
    }

    // Share Functionality
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const shareData = {
                title: 'AMEY | DS Lab Portfolio',
                text: 'Check out this interactive Data Structures and Algorithms visualizer by Amey Thakur!',
                url: window.location.origin + window.location.pathname
            };

            try {
                if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                } else {
                    await navigator.clipboard.writeText(window.location.href);
                    const originalIcon = shareBtn.innerHTML;
                    shareBtn.innerHTML = '<i class="fas fa-check"></i>';
                    shareBtn.classList.add('success');
                    setTimeout(() => {
                        shareBtn.innerHTML = originalIcon;
                        shareBtn.classList.remove('success');
                    }, 2000);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Error sharing:', err);
                }
            }
        });
    }

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }
});

// Shuffle button


// Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const btnShowCode = document.getElementById('btn-show-code');
    const codeModal = document.getElementById('code-modal');
    const closeModal = document.getElementById('close-modal');
    const modalCode = document.getElementById('modal-code');
    const modalTitle = document.getElementById('modal-title');
    const modalGithubLink = document.getElementById('modal-github-link');

    function getAlgoFunction(algo) {
        switch (algo) {
            case 'bubble': return bubbleSort;
            case 'cocktail': return cocktailSort;
            case 'insertion': return insertionSort;
            case 'selection': return selectionSort;
            case 'quick': return quickSort;
            case 'merge': return mergeSort;
            case 'heap': return heapSort;
            case 'shell': return shellSort;
            case 'linear': return linearSearch;
            case 'binary': return binarySearch;
            default: return null;
        }
    }

    if (btnShowCode) {
        btnShowCode.addEventListener('click', () => {
            if (!algoSelect) return;
            const algo = algoSelect.value;
            const func = getAlgoFunction(algo);

            if (func) {
                if (modalTitle) modalTitle.textContent = algoInfo[algo].title + ' Implementation';
                if (modalCode) {
                    modalCode.textContent = func.toString();
                    if (window.Prism) {
                        Prism.highlightElement(modalCode);
                    }
                }
                if (codeModal) codeModal.style.display = 'flex';
                if (modalGithubLink) modalGithubLink.href = 'https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB';
            }
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (codeModal) codeModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (codeModal && e.target === codeModal) {
            codeModal.style.display = 'none';
        }
    });

    // Stats Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const animationDuration = 2000; // 2 seconds for all counters

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || '';
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / animationDuration, 1);

            // Ease-out effect (optional, makes it smoother)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            const currentCount = Math.floor(easeOut * target);
            counter.innerText = currentCount + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + suffix;
            }
        };

        requestAnimationFrame(updateCount);
    });
});

// Initialize on load
// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Force render immediately
    initArray();

    // 1. Algo Select Listener
    if (algoSelect) {
        algoSelect.addEventListener('change', () => {
            const algo = algoSelect.value;
            if (algoInfo[algo]) {
                if (algoTitle) algoTitle.textContent = algoInfo[algo].title;
                if (algoDescription) algoDescription.textContent = algoInfo[algo].desc;
                if (algoComplexity) algoComplexity.textContent = algoInfo[algo].complexity;
            }

            // Reset state
            isRunning = false;
            if (dsInput) dsInput.value = '';

            // Ensure controls visibility
            if (mainControls) mainControls.style.display = 'flex';
            if (dsControls) dsControls.style.display = 'none';

            // VISIBILITY LOGIC: Force "Find Value" for Search Algos
            const searchControlsEl = document.getElementById('search-controls');
            const isSearch = (algo === 'binary' || algo === 'linear');

            if (searchControlsEl) {
                // Use strong CSS classes (defined in style.css)
                if (isSearch) {
                    searchControlsEl.classList.remove('force-hidden');
                    searchControlsEl.classList.add('force-visible');
                    // Helper to ensure layout
                    searchControlsEl.classList.add('d-flex');
                } else {
                    searchControlsEl.classList.remove('force-visible');
                    searchControlsEl.classList.add('force-hidden');
                    searchControlsEl.classList.remove('d-flex');
                }
            }

            // Update Start Button Text
            if (btnRunText) btnRunText.textContent = isSearch ? 'Search' : 'Start';

            // Initialize Array
            if (algo === 'binary') initSortedArray();
            else initArray();

            // Show pseudo code if available
            if (typeof algoPseudoCode !== 'undefined' && algoPseudoCode[algo]) {
                renderPseudoCode(algoPseudoCode[algo]);
            } else {
                renderPseudoCode(null);
            }
        });
    }

    // 2. Shuffle Button
    if (btnShuffle) {
        btnShuffle.addEventListener('click', () => {
            if (isRunning) {
                isRunning = false;
            }
            setTimeout(() => {
                if (algoSelect && algoSelect.value === 'binary') {
                    initSortedArray();
                } else {
                    initArray();
                }
                if (btnRunText) btnRunText.textContent = (algoSelect && (algoSelect.value === 'binary' || algoSelect.value === 'linear')) ? 'Search' : 'Start';
            }, 100);
        });
    }

    // 3. Run Button
    if (btnRun) {
        btnRun.addEventListener('click', () => {
            if (isRunning) {
                isRunning = false;
                if (btnRunText) btnRunText.textContent = (algoSelect && (algoSelect.value === 'binary' || algoSelect.value === 'linear')) ? 'Search' : 'Start';
            } else {
                isRunning = true;
                if (btnRunText) btnRunText.textContent = 'Pause';
                runAlgorithm();
            }
        });
    }

    // 4. Force Initial UI State
    if (algoSelect) {
        algoSelect.dispatchEvent(new Event('change'));
    } else {
        initArray();
    }
}
