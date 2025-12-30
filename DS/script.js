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

// =========================================
//   CONSOLE EASTER EGG 🥚
// =========================================
console.log(
    "%c📊 DS Lab Portfolio",
    "font-size: 28px; font-weight: bold; color: #2563eb; text-shadow: 2px 2px 0 #0f172a;"
);
console.log(
    "%c👋 Hey developer! Curious about the code?",
    "font-size: 14px; color: #64748b;"
);
console.log(
    "%c🔗 https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB",
    "font-size: 12px; color: #2563eb;"
);
console.log(
    "%c⚠️ This portfolio is protected. Please respect the author's work!",
    "font-size: 12px; color: #f59e0b; font-weight: bold;"
);

// PWA Install Logic
let deferredPrompt;
const pwaInstallBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    pwaInstallBtn.style.display = 'flex';
});

pwaInstallBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            pwaInstallBtn.style.display = 'none';
        }
        deferredPrompt = null;
    }
});

// Share Functionality
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'Data Structures Lab Portfolio — Amey Thakur',
            text: 'Data Structures Lab Portfolio — Amey Thakur',
            url: window.location.href
        };

        try {
            await navigator.share(shareData);
        } catch (err) {
            // Fallback: Copy to clipboard
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = window.location.href;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            alert('Portfolio link copied to clipboard!');
        }
    });
}

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
const btnRunIcon = document.getElementById('btn-run-icon');
const speedSlider = document.getElementById('speed-slider');
const algoSelect = document.getElementById('algo-select');
const algoTitle = document.getElementById('algo-title');
const algoDescription = document.getElementById('algo-description');
const searchControls = document.getElementById('search-controls');
const searchTarget = document.getElementById('search-target');
const algoLegend = document.getElementById('algo-legend');
const algoComplexity = document.getElementById('algo-complexity');
const pseudoCodeEl = document.getElementById('pseudo-code-display');

// Helper function to update Run button state (text and icon)
function updateRunButton(isPaused) {
    const isSearch = algoSelect && ['binary', 'linear', 'jump', 'interpolation'].includes(algoSelect.value);
    if (isPaused) {
        if (btnRunText) btnRunText.textContent = 'Pause';
        if (btnRunIcon) {
            btnRunIcon.classList.remove('fa-play');
            btnRunIcon.classList.add('fa-pause');
        }
    } else {
        if (btnRunText) btnRunText.textContent = isSearch ? 'Search' : 'Start';
        if (btnRunIcon) {
            btnRunIcon.classList.remove('fa-pause');
            btnRunIcon.classList.add('fa-play');
        }
    }
}

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
    ],
    radix: [
        "int max = getMax(arr, n);",
        "for (int exp = 1; max/exp > 0; exp *= 10) {",
        "    countSort(arr, n, exp);",
        "}",
        "// countSort: place elements in buckets",
        "// based on current digit (exp)"
    ],
    counting: [
        "int count[k] = {0}; // k = max + 1",
        "for (i = 0; i < n; i++)",
        "    count[arr[i]]++;",
        "for (i = 1; i < k; i++)",
        "    count[i] += count[i-1];",
        "for (i = n-1; i >= 0; i--)",
        "    output[--count[arr[i]]] = arr[i];"
    ],
    bucket: [
        "create n empty buckets",
        "for each element arr[i]:",
        "    insert arr[i] into bucket[n*arr[i]/max]",
        "for each bucket:",
        "    sort(bucket)",
        "concatenate all buckets"
    ],
    comb: [
        "gap = n",
        "shrink = 1.3",
        "while gap > 1 or swapped:",
        "    gap = max(1, floor(gap/shrink))",
        "    swapped = false",
        "    for i = 0 to n-gap:",
        "        if arr[i] > arr[i+gap]: swap, swapped=true"
    ],
    gnome: [
        "pos = 0",
        "while pos < n:",
        "    if pos == 0 or arr[pos] >= arr[pos-1]:",
        "        pos++",
        "    else:",
        "        swap(arr[pos], arr[pos-1])",
        "        pos--"
    ],
    bogo: [
        "while not sorted(arr):",
        "    shuffle(arr)"
    ],
    'odd-even': [
        "bool sorted = false;",
        "while !sorted:",
        "    sorted = true;",
        "    for i = 1 to n-2 step 2: // Odd",
        "        if arr[i] > arr[i+1]: swap, sorted=false",
        "    for i = 0 to n-2 step 2: // Even",
        "        if arr[i] > arr[i+1]: swap, sorted=false"
    ],
    stooge: [
        "stoogeSort(arr, i, j):",
        "    if arr[i] > arr[j]: swap(i, j)",
        "    if (j - i + 1) > 2:",
        "        t = (j - i + 1) / 3",
        "        stoogeSort(arr, i, j-t)",
        "        stoogeSort(arr, i+t, j)",
        "        stoogeSort(arr, i, j-t)"
    ],
    jump: [
        "m = sqrt(n)",
        "while arr[min(m, n)-1] < target:",
        "    prev = m, m += sqrt(n)",
        "    if prev >= n: return -1",
        "for i = prev to min(m, n)-1:",
        "    if arr[i] == target: return i",
        "return -1"
    ],
    interpolation: [
        "low = 0, high = n-1",
        "while low <= high and target >= arr[low] and target <= arr[high]:",
        "    pos = low + ((target-arr[low])*(high-low)/(arr[high]-arr[low]))",
        "    if arr[pos] == target: return pos",
        "    if arr[pos] < target: low = pos + 1",
        "    else: high = pos - 1"
    ],
    exponential: [
        "if arr[0] == x: return 0",
        "i = 1",
        "while i < n and arr[i] <= x:",
        "    i = i * 2",
        "return binarySearch(arr, i/2, min(i, n-1), x)"
    ],
    ternary: [
        "while l <= r:",
        "    m1 = l + (r-l)/3, m2 = r - (r-l)/3",
        "    if arr[m1] == x: return m1",
        "    if arr[m2] == x: return m2",
        "    if x < arr[m1]: r = m1 - 1",
        "    else if x > arr[m2]: l = m2 + 1",
        "    else: l = m1 + 1, r = m2 - 1"
    ],
    fibonacci: [
        "fib2 = 0, fib1 = 1, fibM = 1",
        "while fibM < n: fibM = fib1 + fib2, fib2 = fib1, fib1 = fibM",
        "offset = -1",
        "while fibM > 1:",
        "    i = min(offset + fib2, n-1)",
        "    if arr[i] < x: fibM = fib1, fib1 = fib2, fib2 = fibM - fib1, offset = i",
        "    else if arr[i] > x: fibM = fib2, fib1 = fib1 - fib2, fib2 = fibM - fib1",
        "    else: return i"
    ],
    meta: [
        "n = len(arr), lg = log2(n)",
        "pos = 0",
        "for (i = lg; i >= 0; i--):",
        "    new_pos = pos | (1 << i)",
        "    if new_pos < n and arr[new_pos] <= x:",
        "        pos = new_pos",
        "return pos if arr[pos] == x else -1"
    ],
    cycle: [
        "for (start = 0; start < n - 1; start++) {",
        "    item = arr[start]; pos = start;",
        "    for (i = start + 1; i < n; i++) if (arr[i] < item) pos++;",
        "    if (pos == start) continue;",
        "    while (item == arr[pos]) pos++;",
        "    if (pos != start) swap(item, arr[pos]);",
        "    while (pos != start) {",
        "        pos = start; ...find new pos...",
        "        while (item == arr[pos]) pos++;",
        "        swap(item, arr[pos]);",
        "    }",
        "}"
    ],
    tim: [
        "const RUN = 32;",
        "for (i = 0; i < n; i+=RUN)",
        "    insertionSort(arr, i, min((i+RUN-1), (n-1)));",
        "for (size = RUN; size < n; size = 2*size) {",
        "    for (left = 0; left < n; left += 2*size) {",
        "        mid = left + size - 1;",
        "        right = min((left + 2*size - 1), (n-1));",
        "        merge(arr, left, mid, right);",
        "    }",
        "}"
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
    bubble: { title: 'Bubble Sort', desc: 'Repeatedly compares adjacent elements and swaps them if they are in the wrong order.', complexity: 'O(n²)', complexityTooltip: 'Quadratic time - compares all pairs of elements.' },
    insertion: { title: 'Insertion Sort', desc: 'Builds the sorted array one element at a time by inserting each element into its correct position.', complexity: 'O(n²)', complexityTooltip: 'Quadratic time - efficient for small or nearly sorted data.' },
    selection: { title: 'Selection Sort', desc: 'Finds the minimum element and places it at the beginning, then repeats for remaining elements.', complexity: 'O(n²)', complexityTooltip: 'Quadratic time - always makes n² comparisons.' },
    quick: { title: 'Quick Sort', desc: 'Uses divide-and-conquer with a pivot element to partition and recursively sort subarrays.', complexity: 'O(n log n)', complexityTooltip: 'Linearithmic time - very efficient on average.' },
    merge: { title: 'Merge Sort', desc: 'Divides array into halves, sorts them recursively, and merges sorted halves.', complexity: 'O(n log n)', complexityTooltip: 'Linearithmic time - consistent performance guaranteed.' },
    heap: { title: 'Heap Sort', desc: 'Builds a max-heap from the array and repeatedly extracts the maximum element.', complexity: 'O(n log n)', complexityTooltip: 'Linearithmic time - uses heap data structure.' },
    shell: { title: 'Shell Sort', desc: 'Generalization of insertion sort that allows exchange of far items.', complexity: 'O(n log n)', complexityTooltip: 'Varies by gap sequence - typically linearithmic.' },
    linear: { title: 'Linear Search', desc: 'Sequentially checks each element of the list until a match is found or the whole list has been searched.', complexity: 'O(n)', complexityTooltip: 'Linear time - checks each element once.' },
    binary: { title: 'Binary Search', desc: 'Efficiently finds a target value in a sorted array by repeatedly dividing the search interval in half.', complexity: 'O(log n)', complexityTooltip: 'Logarithmic time - halves search space each step.' },
    cocktail: { title: 'Cocktail Shaker Sort', desc: 'Bidirectional Bubble Sort that traverses the list in both directions, alternatively bubbling large elements to end and small elements to beginning.', complexity: 'O(n²)', complexityTooltip: 'Quadratic time - slightly better than bubble sort.' },
    radix: { title: 'Radix Sort', desc: 'Non-comparative sorting algorithm that sorts integers by processing individual digits, from least significant to most significant.', complexity: 'O(nk)', complexityTooltip: 'Linear time - k is the number of digits in the largest number.' },
    counting: { title: 'Counting Sort', desc: 'Non-comparative algorithm that counts occurrences of each value and uses arithmetic to determine positions.', complexity: 'O(n+k)', complexityTooltip: 'Linear time - k is the range of input values.' },
    bucket: { title: 'Bucket Sort', desc: 'Distributes elements into buckets, sorts each bucket individually, then concatenates the results.', complexity: 'O(n+k)', complexityTooltip: 'Linear time on average - k is the number of buckets.' },
    comb: { title: 'Comb Sort', desc: 'Improves on Bubble Sort by using a gap larger than 1 to eliminate small values at the end (turtles).', complexity: 'O(n²)', complexityTooltip: 'Quadratic worst case - but much faster than bubble sort in practice.' },
    gnome: { title: 'Gnome Sort', desc: 'Similar to insertion sort but moves elements to their proper place by swapping backwards like a garden gnome sorting flower pots.', complexity: 'O(n²)', complexityTooltip: 'Quadratic time - simple but efficient for small or nearly sorted data.' },
    bogo: { title: 'Bogo Sort', desc: 'Permutes the array randomly until it is sorted. Highly inefficient but fascinating to watch.', complexity: 'O((n+1)!)', complexityTooltip: 'Factorial time - practically infinite for larger arrays.' },
    'odd-even': { title: 'Odd-Even Sort', desc: 'Compares all odd/even indexed adjacent pairs in two phases (odd phase and even phase) until sorted.', complexity: 'O(n²)', complexityTooltip: 'Quadratic time - also known as Brick Sort.' },
    stooge: { title: 'Stooge Sort', desc: 'Recursive sorting algorithm that divides the array into thirds and sorts the first two-thirds, last two-thirds, and first two-thirds again.', complexity: 'O(n^2.7095)', complexityTooltip: 'Worse than quadratic - very inefficient recursion.' },
    jump: { title: 'Jump Search', desc: 'Finds an element in a sorted array by jumping ahead by fixed steps and then performing a linear search backward.', complexity: 'O(√n)', complexityTooltip: 'Square root time - better than linear, worse than binary.' },
    interpolation: { title: 'Interpolation Search', desc: 'An improvement over binary search for uniformly distributed sorted arrays, calculating the probable position of the target.', complexity: 'O(log log n)', complexityTooltip: 'Double logarithmic time - extremely fast for uniform data.' },
    exponential: { title: 'Exponential Search', desc: 'Finds an element in a sorted array by identifying a range where the element could be, then performing a binary search within that range.', complexity: 'O(log i)', complexityTooltip: 'Binary search complexity - dependent on target position.' },
    ternary: { title: 'Ternary Search', desc: 'Divides the search space into three parts using two midpoints and determines which third the target resides in.', complexity: 'O(log3 n)', complexityTooltip: 'Logarithmic time - base 3.' },
    fibonacci: { title: 'Fibonacci Search', desc: 'A comparison-based search algorithm that uses Fibonacci numbers to narrow down the search range in a sorted array.', complexity: 'O(log n)', complexityTooltip: 'Logarithmic time - similar to binary search.' },
    meta: { title: 'Meta Binary Search', desc: 'Also known as One-Sided Binary Search, this algorithm uses bit manipulation to find the target element.', complexity: 'O(log n)', complexityTooltip: 'Logarithmic time - bitwise approach.' },
    cycle: { title: 'Cycle Sort', desc: 'A sorting algorithm that is optimal in terms of the total number of writes to the memory. It minimizes memory writes.', complexity: 'O(n²)', complexityTooltip: 'Quadratic time - specifically minimizes writes.' },
    tim: { title: 'Tim Sort', desc: 'A hybrid stable sorting algorithm, derived from merge sort and insertion sort, designed to perform well on many kinds of real-world data.', complexity: 'O(n log n)', complexityTooltip: 'Linearithmic - standard sort in Python and Java.' }
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

// Radix Sort
async function radixSort() {
    renderPseudoCode(algoPseudoCode.radix);
    const n = array.length;

    // Find maximum number to determine number of digits
    await highlightLine(0); // int max = getMax(arr, n)
    let max = Math.max(...array);
    await sleep(getDelay());

    // Process each digit position (units, tens, hundreds, etc.)
    await highlightLine(1); // for (int exp = 1; max/exp > 0; exp *= 10)
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        if (!isRunning) return;

        await highlightLine(2); // countSort(arr, n, exp)
        await countingSortByDigit(exp);
        await sleep(getDelay());
    }

    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Helper function for Radix Sort - Counting Sort by digit
async function countingSortByDigit(exp) {
    const n = array.length;
    const output = new Array(n).fill(0);
    const count = new Array(10).fill(0);

    await highlightLine(4); // countSort: place elements in buckets

    // Count occurrences of each digit
    for (let i = 0; i < n; i++) {
        if (!isRunning) return;
        const digit = Math.floor(array[i] / exp) % 10;
        count[digit]++;
        renderBars([i], [], []);
        await sleep(getDelay() / 2);
    }

    // Build cumulative count
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    await highlightLine(5); // based on current digit (exp)

    // Build output array (process from right to left for stability)
    for (let i = n - 1; i >= 0; i--) {
        if (!isRunning) return;
        const digit = Math.floor(array[i] / exp) % 10;
        output[count[digit] - 1] = array[i];
        count[digit]--;
        renderBars([], [i], []);
        await sleep(getDelay() / 2);
    }

    // Copy output to array
    for (let i = 0; i < n; i++) {
        if (!isRunning) return;
        array[i] = output[i];
        renderBars([], [], [i]);
        await sleep(getDelay() / 2);
    }
}

// Counting Sort
async function countingSort() {
    renderPseudoCode(algoPseudoCode.counting);
    const n = array.length;

    // Find max value to determine count array size
    await highlightLine(0); // int count[k] = {0}
    const max = Math.max(...array);
    const count = new Array(max + 1).fill(0);
    const output = new Array(n).fill(0);
    await sleep(getDelay());

    // Count occurrences
    await highlightLine(1); // for (i = 0; i < n; i++)
    await highlightLine(2); // count[arr[i]]++
    for (let i = 0; i < n; i++) {
        if (!isRunning) return;
        count[array[i]]++;
        renderBars([i], [], []);
        await sleep(getDelay());
    }

    // Build cumulative count
    await highlightLine(3); // for (i = 1; i < k; i++)
    await highlightLine(4); // count[i] += count[i-1]
    for (let i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    await sleep(getDelay());

    // Build output array (stable - process right to left)
    await highlightLine(5); // for (i = n-1; i >= 0; i--)
    await highlightLine(6); // output[--count[arr[i]]] = arr[i]
    for (let i = n - 1; i >= 0; i--) {
        if (!isRunning) return;
        output[count[array[i]] - 1] = array[i];
        count[array[i]]--;
        renderBars([], [i], []);
        await sleep(getDelay());
    }

    // Copy back to original array
    for (let i = 0; i < n; i++) {
        if (!isRunning) return;
        array[i] = output[i];
        renderBars([], [], [i]);
        await sleep(getDelay() / 2);
    }

    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Bucket Sort
async function bucketSort() {
    renderPseudoCode(algoPseudoCode.bucket);
    const n = array.length;

    // Find max value
    const max = Math.max(...array);
    const bucketCount = Math.ceil(Math.sqrt(n)); // Use sqrt(n) buckets
    const buckets = Array.from({ length: bucketCount }, () => []);

    // Distribute elements into buckets
    await highlightLine(0); // create n empty buckets
    await highlightLine(1); // for each element arr[i]
    await highlightLine(2); // insert arr[i] into bucket
    for (let i = 0; i < n; i++) {
        if (!isRunning) return;
        const bucketIndex = Math.floor((array[i] / (max + 1)) * bucketCount);
        buckets[bucketIndex].push(array[i]);
        renderBars([i], [], []);
        await sleep(getDelay());
    }

    // Sort each bucket using insertion sort
    await highlightLine(3); // for each bucket
    await highlightLine(4); // sort(bucket)
    for (let i = 0; i < bucketCount; i++) {
        buckets[i].sort((a, b) => a - b);
    }
    await sleep(getDelay());

    // Concatenate buckets back to array
    await highlightLine(5); // concatenate all buckets
    let index = 0;
    for (let i = 0; i < bucketCount; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
            if (!isRunning) return;
            array[index] = buckets[i][j];
            renderBars([], [], [index]);
            await sleep(getDelay() / 2);
            index++;
        }
    }

    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Comb Sort
async function combSort() {
    renderPseudoCode(algoPseudoCode.comb);
    const n = array.length;
    const shrink = 1.3;

    await highlightLine(0); // gap = n
    let gap = n;
    await highlightLine(1); // shrink = 1.3
    let swapped = true;

    await highlightLine(2); // while gap > 1 or swapped
    while (gap > 1 || swapped) {
        if (!isRunning) return;

        await highlightLine(3); // gap = max(1, floor(gap/shrink))
        gap = Math.floor(gap / shrink);
        if (gap < 1) gap = 1;

        await highlightLine(4); // swapped = false
        swapped = false;

        await highlightLine(5); // for i = 0 to n-gap
        await highlightLine(6); // if arr[i] > arr[i+gap]: swap
        for (let i = 0; i + gap < n; i++) {
            if (!isRunning) return;
            renderBars([i, i + gap], [], []);
            await sleep(getDelay());

            if (array[i] > array[i + gap]) {
                [array[i], array[i + gap]] = [array[i + gap], array[i]];
                swapped = true;
                renderBars([], [i, i + gap], []);
                await sleep(getDelay());
            }
        }
    }

    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Gnome Sort
async function gnomeSort() {
    renderPseudoCode(algoPseudoCode.gnome);
    const n = array.length;

    await highlightLine(0); // pos = 0
    let pos = 0;

    await highlightLine(1); // while pos < n
    while (pos < n) {
        if (!isRunning) return;

        await highlightLine(2); // if pos == 0 or arr[pos] >= arr[pos-1]
        if (pos === 0 || array[pos] >= array[pos - 1]) {
            await highlightLine(3); // pos++
            renderBars([], [], [pos]);
            pos++;
            await sleep(getDelay());
        } else {
            await highlightLine(4); // else
            await highlightLine(5); // swap(arr[pos], arr[pos-1])
            renderBars([pos, pos - 1], [], []);
            await sleep(getDelay());

            [array[pos], array[pos - 1]] = [array[pos - 1], array[pos]];
            renderBars([], [pos, pos - 1], []);
            await sleep(getDelay());

            await highlightLine(6); // pos--
            pos--;
        }
    }

    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Bogo Sort
async function bogoSort() {
    renderPseudoCode(algoPseudoCode.bogo);
    const n = array.length;
    while (!isSorted()) {
        if (!isRunning) return;
        await highlightLine(0); // while not sorted
        for (let i = n - 1; i > 0; i--) {
            if (!isRunning) return;
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        await highlightLine(1); // shuffle
        renderBars([], [], Array.from({ length: n }, (_, i) => i));
        await sleep(getDelay());
    }
    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

function isSorted() {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) return false;
    }
    return true;
}

// Odd-Even Sort
async function oddEvenSort() {
    renderPseudoCode(algoPseudoCode['odd-even']);
    const n = array.length;
    let sorted = false;
    await highlightLine(0); // bool sorted = false
    while (!sorted) {
        if (!isRunning) return;
        await highlightLine(1); // while !sorted
        sorted = true;
        await highlightLine(2); // sorted = true

        // Odd phase
        await highlightLine(3); // for i = 1 to n-2 step 2
        for (let i = 1; i < n - 1; i += 2) {
            if (!isRunning) return;
            renderBars([i, i + 1], [], []);
            await sleep(getDelay());
            if (array[i] > array[i + 1]) {
                await highlightLine(4); // if swap
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                sorted = false;
                renderBars([], [i, i + 1], []);
                await sleep(getDelay());
            }
        }

        // Even phase
        await highlightLine(5); // for i = 0 to n-2 step 2
        for (let i = 0; i < n - 1; i += 2) {
            if (!isRunning) return;
            renderBars([i, i + 1], [], []);
            await sleep(getDelay());
            if (array[i] > array[i + 1]) {
                await highlightLine(6); // if swap
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                sorted = false;
                renderBars([], [i, i + 1], []);
                await sleep(getDelay());
            }
        }
    }
    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Stooge Sort
async function stoogeSort() {
    renderPseudoCode(algoPseudoCode.stooge);
    const n = array.length;
    await stoogeSortRecursive(0, n - 1);
    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

async function stoogeSortRecursive(l, h) {
    if (!isRunning) return;
    if (l >= h) return;

    await highlightLine(0); // recursion call info
    renderBars([l, h], [], []);
    await sleep(getDelay());

    await highlightLine(1); // if arr[i] > arr[j]: swap
    if (array[l] > array[h]) {
        [array[l], array[h]] = [array[h], array[l]];
        renderBars([], [l, h], []);
        await sleep(getDelay());
    }

    await highlightLine(2); // if (j - i + 1) > 2
    if (h - l + 1 > 2) {
        await highlightLine(3); // t = (j - i + 1) / 3
        const t = Math.floor((h - l + 1) / 3);

        await highlightLine(4); // first 2/3
        await stoogeSortRecursive(l, h - t);

        await highlightLine(5); // last 2/3
        await stoogeSortRecursive(l + t, h);

        await highlightLine(6); // first 2/3 again
        await stoogeSortRecursive(l, h - t);
    }
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

// Jump Search
async function jumpSearch() {
    renderPseudoCode(algoPseudoCode.jump);
    if (!searchTarget) return;
    const target = parseInt(searchTarget.value);
    const n = array.length;

    await highlightLine(0); // m = sqrt(n)
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    let m = step;

    await highlightLine(1); // while loop
    while (array[Math.min(m, n) - 1] < target) {
        if (!isRunning) return;
        await highlightLine(2); // jumping
        renderBars([Math.min(m, n) - 1], [], []);
        await sleep(getDelay());
        prev = m;
        m += step;
        if (prev >= n) {
            await highlightLine(3); // failed
            finishRun();
            return;
        }
    }

    await highlightLine(4); // linear phase
    for (let i = prev; i < Math.min(m, n); i++) {
        if (!isRunning) return;
        renderBars([i], [], []);
        await sleep(getDelay());
        await highlightLine(5); // equality check
        if (array[i] === target) {
            renderBars([], [], [], [i]);
            await sleep(1000);
            finishRun();
            await highlightLine(-1);
            return;
        }
    }

    await highlightLine(6); // return -1
    renderBars([], Array.from({ length: n }, (_, i) => i), [], []);
    await sleep(500);
    renderBars();
    finishRun();
    await highlightLine(-1);
}

// Interpolation Search
async function interpolationSearch() {
    renderPseudoCode(algoPseudoCode.interpolation);
    if (!searchTarget) return;
    const target = parseInt(searchTarget.value);
    const n = array.length;

    await highlightLine(0); // initialization
    let low = 0;
    let high = n - 1;

    await highlightLine(1); // loop condition
    while (low <= high && target >= array[low] && target <= array[high]) {
        if (!isRunning) return;
        renderBars([low, high], [], []);
        await sleep(getDelay());

        if (low === high) {
            if (array[low] === target) {
                renderBars([], [], [], [low]);
                await sleep(1000);
            }
            finishRun();
            await highlightLine(-1);
            return;
        }

        await highlightLine(2); // calculation
        let pos = low + Math.floor(((target - array[low]) * (high - low)) / (array[high] - array[low]));
        renderBars([pos], [], []);
        await sleep(getDelay());

        await highlightLine(3); // found?
        if (array[pos] === target) {
            renderBars([], [], [], [pos]);
            await sleep(1000);
            finishRun();
            await highlightLine(-1);
            return;
        }

        if (array[pos] < target) {
            await highlightLine(4); // target is higher
            low = pos + 1;
        } else {
            await highlightLine(5); // target is lower
            high = pos - 1;
        }
    }

    // Not found
    renderBars([], Array.from({ length: n }, (_, i) => i), [], []);
    await sleep(500);
    renderBars();
    finishRun();
    await highlightLine(-1);
}

function finishRun() {
    isRunning = false;
    updateRunButton(false);
    renderPseudoCode(null); // Hide pseudo-code overlay when done
}

// Cycle Sort
async function cycleSort() {
    renderPseudoCode(algoPseudoCode.cycle);
    const n = array.length;
    const sortedIndices = [];

    await highlightLine(0); // for loop start
    for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
        if (!isRunning) return;

        await highlightLine(1); // item = arr[start]; pos = start;
        let item = array[cycleStart];
        let pos = cycleStart;

        await highlightLine(2); // for i = start + 1 ...
        for (let i = cycleStart + 1; i < n; i++) {
            if (!isRunning) return;
            renderBars([cycleStart, i, pos], [], sortedIndices);
            await sleep(getDelay());

            if (array[i] < item) {
                pos++;
            }
        }

        // If item is already in correct position
        await highlightLine(3); // if pos == start
        if (pos === cycleStart) {
            sortedIndices.push(cycleStart);
            continue;
        }

        // Ignore duplicates
        await highlightLine(4); // while item == arr[pos]
        while (item === array[pos]) {
            if (!isRunning) return;
            pos++;
            await sleep(getDelay() / 2);
        }

        // Put the item to its right position
        await highlightLine(5); // swap(item, arr[pos])
        if (pos !== cycleStart) {
            renderBars([], [pos], sortedIndices);
            await sleep(getDelay());
            let temp = item;
            item = array[pos];
            array[pos] = temp;
        }

        // Rotate rest of the cycle
        await highlightLine(6); // while pos != start
        while (pos !== cycleStart) {
            if (!isRunning) return;
            pos = cycleStart;

            await highlightLine(7); // Find pos again (summarized)
            for (let i = cycleStart + 1; i < n; i++) {
                if (array[i] < item) {
                    pos++;
                }
            }

            await highlightLine(8); // duplicate check
            while (item === array[pos]) {
                pos++;
            }

            await highlightLine(9); // swap(item, arr[pos])
            if (item !== array[pos]) {
                renderBars([], [pos], sortedIndices);
                await sleep(getDelay());
                let temp = item;
                item = array[pos];
                array[pos] = temp;
            }
        }
        sortedIndices.push(cycleStart);
    }

    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Tim Sort
async function timSort() {
    renderPseudoCode(algoPseudoCode.tim);
    const n = array.length;
    const RUN = 8; // Small RUN for visualization

    await highlightLine(0); // const RUN

    // Sort individual subarrays of size RUN
    await highlightLine(1); // for i = 0 to n step RUN
    for (let i = 0; i < n; i += RUN) {
        if (!isRunning) return;
        await highlightLine(2); // insertionSort
        await insertionSortRange(i, Math.min(i + RUN - 1, n - 1));
    }

    // Merge runs
    await highlightLine(3); // for size = RUN
    for (let size = RUN; size < n; size = 2 * size) {
        if (!isRunning) return;
        await highlightLine(4); // for left = 0
        for (let left = 0; left < n; left += 2 * size) {
            if (!isRunning) return;

            let mid = left + size - 1;
            let right = Math.min((left + 2 * size - 1), (n - 1));

            if (mid < right) {
                await highlightLine(7); // merge
                await merge(left, mid, right);
            }
        }
    }

    await highlightLine(-1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Helper for Tim Sort
async function insertionSortRange(left, right) {
    for (let i = left + 1; i <= right; i++) {
        if (!isRunning) return;
        let key = array[i];
        let j = i - 1;

        renderBars([i], [], []);
        await sleep(getDelay());

        while (j >= left && array[j] > key) {
            if (!isRunning) return;
            renderBars([j], [j, j + 1], []);
            await sleep(getDelay());
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        renderBars([], [], []);
        await sleep(getDelay());
    }
}

// Exponential Search
async function exponentialSearch() {
    renderPseudoCode(algoPseudoCode.exponential);
    const n = array.length;
    const target = parseInt(searchTarget.value);

    await highlightLine(0); // if arr[0] == x
    renderBars([0], [], []);
    await sleep(getDelay());
    if (array[0] === target) {
        renderBars([], [], [0]);
        finishRun();
        return;
    }

    await highlightLine(1); // i = 1
    let i = 1;

    await highlightLine(2); // while i < n and arr[i] <= x
    while (i < n && array[i] <= target) {
        if (!isRunning) return;
        renderBars([i], [], []);
        await highlightLine(3); // i = i * 2
        await sleep(getDelay());
        i = i * 2;
        await highlightLine(2);
    }

    await highlightLine(4); // binarySearch(...)
    const low = Math.floor(i / 2);
    const high = Math.min(i, n - 1);

    // Call binary search range helper
    await binarySearchRange(low, high, target);
}

// Helper for algorithms that need binary search in a specific range
async function binarySearchRange(low, high, target) {
    let l = low;
    let r = high;

    // We reuse the binary search logic but for a sub-range
    while (l <= r) {
        if (!isRunning) return;
        let mid = Math.floor(l + (r - l) / 2);
        renderBars([mid], [l, r], []);
        await sleep(getDelay());

        if (array[mid] === target) {
            renderBars([], [], [mid]);
            finishRun();
            return;
        }

        if (array[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    finishRun();
}

// Ternary Search
async function ternarySearch() {
    renderPseudoCode(algoPseudoCode.ternary);
    const n = array.length;
    const target = parseInt(searchTarget.value);
    let l = 0;
    let r = n - 1;

    await highlightLine(0); // while l <= r
    while (l <= r) {
        if (!isRunning) return;

        await highlightLine(1); // m1 = l + (r-l)/3, m2 = r - (r-l)/3
        let m1 = Math.floor(l + (r - l) / 3);
        let m2 = Math.floor(r - (r - l) / 3);

        renderBars([m1, m2], [l, r], []);
        await sleep(getDelay());

        await highlightLine(2); // if arr[m1] == x
        if (array[m1] === target) {
            renderBars([], [], [m1]);
            finishRun();
            return;
        }

        await highlightLine(3); // if arr[m2] == x
        if (array[m2] === target) {
            renderBars([], [], [m2]);
            finishRun();
            return;
        }

        await highlightLine(4); // if x < arr[m1]
        if (target < array[m1]) {
            r = m1 - 1;
        } else if (target > array[m2]) {
            await highlightLine(5); // else if x > arr[m2]
            l = m2 + 1;
        } else {
            await highlightLine(6); // else (mid third)
            l = m1 + 1;
            r = m2 - 1;
        }
        await highlightLine(0);
    }

    finishRun();
}

// Fibonacci Search
async function fibonacciSearch() {
    renderPseudoCode(algoPseudoCode.fibonacci);
    const n = array.length;
    const target = parseInt(searchTarget.value);

    await highlightLine(0); // fib2 = 0...
    let fib2 = 0;
    let fib1 = 1;
    let fibM = fib2 + fib1;

    await highlightLine(1); // while fibM < n
    while (fibM < n) {
        fib2 = fib1;
        fib1 = fibM;
        fibM = fib2 + fib1;
    }

    await highlightLine(2); // offset = -1
    let offset = -1;

    await highlightLine(3); // while fibM > 1
    while (fibM > 1) {
        if (!isRunning) return;

        await highlightLine(4); // i = min(offset + fib2, n-1)
        let i = Math.min(offset + fib2, n - 1);
        renderBars([i], [offset + 1, n - 1], []);
        await sleep(getDelay());

        await highlightLine(5); // if arr[i] < x
        if (array[i] < target) {
            fibM = fib1;
            fib1 = fib2;
            fib2 = fibM - fib1;
            offset = i;
        } else if (array[i] > target) {
            await highlightLine(6); // else if arr[i] > x
            fibM = fib2;
            fib1 = fib1 - fib2;
            fib2 = fibM - fib1;
        } else {
            await highlightLine(7); // else return i
            renderBars([], [], [i]);
            finishRun();
            return;
        }
    }

    if (fib1 && array[offset + 1] === target) {
        renderBars([], [], [offset + 1]);
        finishRun();
        return;
    }

    finishRun();
}

// Meta Binary Search (One-Sided Binary Search)
async function metaBinarySearch() {
    renderPseudoCode(algoPseudoCode.meta);
    const n = array.length;
    const target = parseInt(searchTarget.value);

    await highlightLine(0); // n, lg
    let lg = Math.floor(Math.log2(n));

    await highlightLine(1); // pos = 0
    let pos = 0;

    await highlightLine(2); // for i = lg...
    for (let i = lg; i >= 0; i--) {
        if (!isRunning) return;

        await highlightLine(3); // new_pos = pos | (1 << i)
        let new_pos = pos | (1 << i);

        renderBars([new_pos], [], []);
        await sleep(getDelay());

        await highlightLine(4); // if new_pos < n and arr[new_pos] <= x
        if (new_pos < n && array[new_pos] <= target) {
            await highlightLine(5); // pos = new_pos
            pos = new_pos;
            renderBars([pos], [], []);
            await sleep(getDelay());
        }
    }

    await highlightLine(6); // return pos if...
    if (array[pos] === target) {
        renderBars([], [], [pos]);
    }

    finishRun();
}

// Run selected algorithm
function runAlgorithm() {
    if (!algoSelect) return;
    const algo = algoSelect.value;
    switch (algo) {
        case 'bubble': bubbleSort(); break;
        case 'insertion': insertionSort(); break;
        case 'selection': selectionSort(); break;
        case 'quick': quickSort(); break;
        case 'merge': mergeSort(); break;
        case 'heap': heapSort(); break;
        case 'shell': shellSort(); break;
        case 'linear': linearSearch(); break;
        case 'binary': binarySearch(); break;
        case 'cocktail': cocktailSort(); break;
        case 'radix': radixSort(); break;
        case 'counting': countingSort(); break;
        case 'bucket': bucketSort(); break;
        case 'comb': combSort(); break;
        case 'gnome': gnomeSort(); break;
        case 'bogo': bogoSort(); break;
        case 'odd-even': oddEvenSort(); break;
        case 'stooge': stoogeSort(); break;
        case 'jump': jumpSearch(); break;
        case 'interpolation': interpolationSearch(); break;
        case 'exponential': exponentialSearch(); break;
        case 'ternary': ternarySearch(); break;
        case 'fibonacci': fibonacciSearch(); break;
        case 'meta': metaBinarySearch(); break;
        case 'cycle': cycleSort(); break;
        case 'tim': timSort(); break;
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


// Searchable Algorithm Dropdown Logic
document.addEventListener('DOMContentLoaded', () => {
    const algoSearch = document.getElementById('algo-search');
    const algoDropdownList = document.getElementById('algo-dropdown-list');
    const algoOptions = document.querySelectorAll('.algo-option');
    const algoGroupLabels = document.querySelectorAll('.algo-group-label');
    const hiddenSelect = document.getElementById('algo-select');

    let selectedValue = 'bubble';
    let selectedText = 'Bubble Sort';

    // Show dropdown on focus/click
    if (algoSearch) {
        algoSearch.addEventListener('focus', () => {
            algoDropdownList.classList.add('show');
        });

        algoSearch.addEventListener('click', () => {
            algoDropdownList.classList.add('show');
        });

        // Filter options as user types
        algoSearch.addEventListener('input', () => {
            const query = algoSearch.value.toLowerCase().trim();
            let hasVisibleOptions = false;

            algoOptions.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(query)) {
                    option.classList.remove('hidden');
                    // Highlight matching text
                    if (query) {
                        const regex = new RegExp(`(${query})`, 'gi');
                        option.innerHTML = option.dataset.originalText.replace(regex, '<mark>$1</mark>');
                    } else {
                        option.innerHTML = option.dataset.originalText;
                    }
                    hasVisibleOptions = true;
                } else {
                    option.classList.add('hidden');
                }
            });

            // Show/hide group labels based on visible options
            algoGroupLabels.forEach(label => {
                const group = label.textContent.toLowerCase();
                const hasVisibleInGroup = Array.from(algoOptions).some(opt =>
                    opt.dataset.group === group && !opt.classList.contains('hidden')
                );
                label.style.display = hasVisibleInGroup ? 'block' : 'none';
            });

            // Show "no results" if nothing matches
            let noResultsEl = algoDropdownList.querySelector('.algo-no-results');
            if (!hasVisibleOptions) {
                if (!noResultsEl) {
                    noResultsEl = document.createElement('div');
                    noResultsEl.className = 'algo-no-results';
                    noResultsEl.textContent = 'No algorithms found';
                    algoDropdownList.appendChild(noResultsEl);
                }
            } else if (noResultsEl) {
                noResultsEl.remove();
            }
        });

        // Store original text for highlighting
        algoOptions.forEach(option => {
            option.dataset.originalText = option.textContent;
        });

        // Set initial value in search box
        algoSearch.value = selectedText;
    }

    // Handle option selection
    algoOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Update selection
            algoOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            selectedValue = option.dataset.value;
            selectedText = option.dataset.originalText || option.textContent;

            // Update search input
            algoSearch.value = selectedText;

            // Update hidden select and trigger change event
            if (hiddenSelect) {
                hiddenSelect.value = selectedValue;
                hiddenSelect.dispatchEvent(new Event('change'));
            }

            // Close dropdown
            algoDropdownList.classList.remove('show');

            // Reset filter
            algoOptions.forEach(opt => {
                opt.classList.remove('hidden');
                opt.innerHTML = opt.dataset.originalText || opt.textContent;
            });
            algoGroupLabels.forEach(label => label.style.display = 'block');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.algo-dropdown')) {
            if (algoDropdownList) {
                algoDropdownList.classList.remove('show');
                // Restore selected value if user didn't pick anything
                if (algoSearch) {
                    algoSearch.value = selectedText;
                }
            }
        }
    });

    // Keyboard navigation
    if (algoSearch) {
        algoSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                algoDropdownList.classList.remove('show');
                algoSearch.blur();
            } else if (e.key === 'Enter') {
                const visibleOptions = Array.from(algoOptions).filter(opt => !opt.classList.contains('hidden'));
                if (visibleOptions.length > 0) {
                    visibleOptions[0].click();
                }
            }
        });
    }
});

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
            case 'insertion': return insertionSort;
            case 'selection': return selectionSort;
            case 'quick': return quickSort;
            case 'merge': return mergeSort;
            case 'heap': return heapSort;
            case 'shell': return shellSort;
            case 'linear': return linearSearch;
            case 'binary': return binarySearch;
            case 'cocktail': return cocktailSort;
            case 'radix': return radixSort;
            case 'counting': return countingSort;
            case 'bucket': return bucketSort;
            case 'comb': return combSort;
            case 'gnome': return gnomeSort;
            case 'bogo': return bogoSort;
            case 'odd-even': return oddEvenSort;
            case 'stooge': return stoogeSort;
            case 'jump': return jumpSearch;
            case 'interpolation': return interpolationSearch;
            case 'exponential': return exponentialSearch;
            case 'ternary': return ternarySearch;
            case 'fibonacci': return fibonacciSearch;
            case 'meta': return metaBinarySearch;
            case 'cycle': return cycleSort;
            case 'tim': return timSort;
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
                if (algoComplexity) {
                    algoComplexity.textContent = algoInfo[algo].complexity;
                    algoComplexity.setAttribute('data-tooltip', algoInfo[algo].complexityTooltip);
                }
            }

            // Reset state
            isRunning = false;

            // VISIBILITY LOGIC: Force "Find Value" for Search Algos
            const searchControlsEl = document.getElementById('search-controls');
            const searchAlgorithms = ['binary', 'linear', 'jump', 'interpolation', 'exponential', 'ternary', 'fibonacci', 'meta'];
            const sortedSearchAlgorithms = ['binary', 'jump', 'interpolation', 'exponential', 'ternary', 'fibonacci', 'meta'];

            const isSearch = searchAlgorithms.includes(algo);

            if (searchControlsEl) {
                if (isSearch) {
                    searchControlsEl.style.display = 'flex';
                    if (sortedSearchAlgorithms.includes(algo)) initSortedArray();
                    else initArray();
                } else {
                    searchControlsEl.style.display = 'none';
                    initArray();
                }
            }

            // Update Start Button Text and Icon
            updateRunButton(false);

            // Initialize Array
            if (sortedSearchAlgorithms.includes(algo)) initSortedArray();
            else initArray();

            // Hide pseudo code when switching algorithms (will show again on Start)
            renderPseudoCode(null);
        });
    }

    // 2. Shuffle Button
    if (btnShuffle) {
        btnShuffle.addEventListener('click', () => {
            if (isRunning) {
                isRunning = false;
            }
            setTimeout(() => {
                const sortedSearchAlgorithms = ['binary', 'jump', 'interpolation', 'exponential', 'ternary', 'fibonacci', 'meta'];
                if (algoSelect && sortedSearchAlgorithms.includes(algoSelect.value)) {
                    initSortedArray();
                } else {
                    initArray();
                }
                updateRunButton(false);
            }, 100);
        });
    }

    // 3. Run Button
    if (btnRun) {
        btnRun.addEventListener('click', () => {
            if (isRunning) {
                isRunning = false;
                updateRunButton(false);
            } else {
                isRunning = true;
                updateRunButton(true);
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

    // 5. Low-Level Security Measures (Standardized)
    // Disable Right Click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Disable Dragging images
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Disable DevTools Shortcuts
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && e.key === 'u')
        ) {
            e.preventDefault();
        }
    });

    // Disable Selection specifically for older browsers through JS
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });

    // =========================================
    //   COMMAND PALETTE LOGIC
    // =========================================
    initCommandPalette();
}

function initCommandPalette() {
    const overlay = document.getElementById('cmd-overlay');
    const input = document.getElementById('cmd-input');
    const resultsContainer = document.getElementById('cmd-results');
    const modal = document.querySelector('.cmd-modal');
    if (!overlay || !input || !resultsContainer) return;

    let selectedIndex = 0;
    let results = [];
    const commands = [
        { type: 'Command', name: 'Toggle Theme', icon: 'fa-adjust', action: () => document.getElementById('theme-toggle').click() },
        { type: 'Command', name: 'Scroll to Top', icon: 'fa-arrow-up', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { type: 'Command', name: 'Go to Algorithms', icon: 'fa-code-branch', action: () => document.getElementById('interactive-demo').scrollIntoView({ behavior: 'smooth' }) },
        { type: 'Command', name: 'Go to Experiments', icon: 'fa-flask', action: () => document.getElementById('foundations').scrollIntoView({ behavior: 'smooth' }) },
    ];

    // Scrape Content for Search Index
    const algorithms = Object.values(algoInfo).map(algo => ({
        type: 'Algorithm',
        name: algo.title,
        icon: 'fa-chart-bar',
        action: () => {
            const select = document.getElementById('algo-select');
            const key = Object.keys(algoInfo).find(k => algoInfo[k].title === algo.title);

            // Sync UI by simulating a user click on the dropdown option
            // This ensures internal state (selectedText/selectedValue) in the dropdown logic is updated
            const algoOptions = document.querySelectorAll('.algo-option');
            const targetOption = Array.from(algoOptions).find(opt => opt.dataset.value === key);

            if (targetOption) {
                targetOption.click();
            } else if (select && key) {
                // Fallback if option not found (should not happen)
                select.value = key;
                select.dispatchEvent(new Event('change'));
            }

            const vizSection = document.getElementById('interactive-demo');
            if (vizSection) {
                vizSection.scrollIntoView({ behavior: 'smooth' });
                // Auto-Run after scroll (800ms delay)
                setTimeout(() => {
                    const btnRun = document.getElementById('btn-run');
                    if (btnRun && !isRunning) btnRun.click();
                }, 800);
            }
        }
    }));

    const experiments = Array.from(document.querySelectorAll('.card-custom h5')).map(h5 => ({
        type: 'Experiment',
        name: h5.textContent.trim(),
        icon: 'fa-flask',
        action: () => {
            h5.scrollIntoView({ behavior: 'smooth', block: 'center' });
            const card = h5.closest('.card-custom');
            if (card) {
                card.style.transition = 'all 0.3s ease';
                card.style.transform = 'scale(1.05)';
                card.style.boxShadow = '0 0 0 4px var(--accent-color)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                    card.style.boxShadow = 'none';
                }, 1500);
            }
        }
    }));

    const searchIndex = [...commands, ...algorithms, ...experiments];

    // Open/Close Logic
    function openPalette() {
        overlay.classList.add('active');
        input.value = '';
        input.focus();
        filterResults('');
        // Hide keyboard hint permanently
        const kbdHint = document.getElementById('kbd-hint');
        if (kbdHint) kbdHint.classList.add('hidden');
    }

    function closePalette() {
        overlay.classList.remove('active');
    }

    // Filter Logic
    function filterResults(query) {
        const q = query.toLowerCase();
        results = searchIndex.filter(item =>
            item.name.toLowerCase().includes(q)
        ).slice(0, 10); // Limit to 10 results

        // Always show commands if query is empty
        if (q === '') {
            results = commands;
        }

        renderResults();
    }

    // Render Logic
    function renderResults() {
        resultsContainer.innerHTML = '';
        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="algo-no-results">No matching commands or algorithms found.</div>';
            return;
        }

        results.forEach((item, index) => {
            const div = document.createElement('div');
            div.className = `cmd-item ${index === selectedIndex ? 'selected' : ''}`;
            div.innerHTML = `
                <div class="d-flex align-items-center">
                    <div class="cmd-item-icon"><i class="fas ${item.icon}"></i></div>
                    <span class="cmd-item-text">${item.name}</span>
                </div>
                <span class="cmd-item-type">${item.type}</span>
            `;
            div.addEventListener('click', () => {
                item.action();
                closePalette();
            });
            div.addEventListener('mouseenter', () => {
                selectedIndex = index;
                renderResults(); // Re-render to update selection style
            });
            resultsContainer.appendChild(div);
        });

        // Ensure selected item is in view
        const selectedEl = resultsContainer.children[selectedIndex];
        if (selectedEl) {
            selectedEl.scrollIntoView({ block: 'nearest' });
        }
    }

    // Single, unified keydown handler
    document.addEventListener('keydown', (e) => {
        // --- CTRL+K: Toggle Command Palette ---
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            e.stopPropagation();
            if (overlay.classList.contains('active')) closePalette();
            else openPalette();
            return; // CRITICAL: Exit here to prevent global shortcuts from firing
        }

        // --- Palette-Specific Navigation (only when visible) ---
        if (overlay.classList.contains('active')) {
            if (e.key === 'Escape') {
                e.preventDefault();
                closePalette();
                return;
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % results.length;
                renderResults();
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + results.length) % results.length;
                renderResults();
                return;
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    results[selectedIndex].action();
                    closePalette();
                }
                return;
            }
            // Allow typing in the input
            return; // Don't process global shortcuts while palette is open
        }

        // --- Global Shortcuts (only when palette is CLOSED and no modifier keys) ---
        // Skip if any modifier key is pressed (to avoid Ctrl+T conflicts)
        if (e.ctrlKey || e.metaKey || e.altKey) {
            return;
        }

        // Skip if typing in an input field
        const activeTag = document.activeElement ? document.activeElement.tagName : '';
        if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
            return;
        }

        // T = Toggle Theme
        if (e.key.toLowerCase() === 't') {
            e.preventDefault();
            const toggle = document.getElementById('theme-toggle');
            if (toggle) toggle.click();
            return;
        }
    });

    input.addEventListener('input', (e) => {
        selectedIndex = 0;
        filterResults(e.target.value);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePalette();
    });
}

// Auto-hide keyboard hint after 8 seconds
document.addEventListener('DOMContentLoaded', () => {
    const kbdHint = document.getElementById('kbd-hint');
    if (kbdHint) {
        setTimeout(() => kbdHint.classList.add('hidden'), 8000);
    }
});
