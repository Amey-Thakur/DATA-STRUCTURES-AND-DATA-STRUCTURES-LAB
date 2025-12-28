/**
 * =========================================
 *   INTERACTIVE LOGIC
 *   Enhanced by Google Deepmind
 * =========================================
 */

// Set Current Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = toggleBtn.querySelector('i');
const htmlElement = document.documentElement;

// Back to Top Logic
const backToTopBtn = document.getElementById("btn-back-to-top");
window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
}

backToTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Theme Toggle Logic
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateIcon(savedTheme);

toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
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

// DS Controls
const mainControls = document.getElementById('main-controls');
const dsControls = document.getElementById('ds-controls');
const dsInput = document.getElementById('ds-input');
const btnPushEnqueue = document.getElementById('btn-push-enqueue');
const btnPopDequeue = document.getElementById('btn-pop-dequeue');
const btnPushText = document.getElementById('btn-push-text');
const btnPopText = document.getElementById('btn-pop-text');

// LL Controls
const llControls = document.getElementById('ll-controls');
const llInput = document.getElementById('ll-input');
const btnInsertHead = document.getElementById('btn-insert-head');
const btnInsertTail = document.getElementById('btn-insert-tail');
const btnDeleteHead = document.getElementById('btn-delete-head');
const btnDeleteTail = document.getElementById('btn-delete-tail');

// BT Controls
const btControls = document.getElementById('bt-controls');
const btInput = document.getElementById('bt-input');
const btnBtInsert = document.getElementById('btn-bt-insert');
const btnBtReset = document.getElementById('btn-bt-reset');

// Graph Controls
const graphControls = document.getElementById('graph-controls');
const graphInput = document.getElementById('graph-input');
const btnAddNode = document.getElementById('btn-add-node');
const btnAddEdge = document.getElementById('btn-add-edge');
const btnRunBFS = document.getElementById('btn-run-bfs');
const btnRunDFS = document.getElementById('btn-run-dfs');
const btnGraphReset = document.getElementById('btn-graph-reset');

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
    graph: { title: 'Graph Traversal', desc: 'Visualizing Breadth-First Search (BFS) and Depth-First Search (DFS) on a graph.', complexity: 'O(V + E)' }
};

const algoComplexity = document.getElementById('algo-complexity');

// Update UI when algorithm changes
algoSelect.addEventListener('change', () => {
    const algo = algoSelect.value;
    algoTitle.textContent = algoInfo[algo].title;
    algoDescription.textContent = algoInfo[algo].desc;
    algoComplexity.textContent = algoInfo[algo].complexity;

    // Reset state and visibility
    isRunning = false;
    btnRunText.textContent = 'Start';
    dsInput.value = '';

    // Hide ALL controls first
    mainControls.style.display = 'none';
    searchControls.style.display = 'none';

    mainControls.style.display = 'flex';

    if (algo === 'binary') {
        searchControls.style.display = 'flex';
        btnRunText.textContent = 'Search';
        initSortedArray();
    } else if (algo === 'linear') {
        searchControls.style.display = 'flex';
        btnRunText.textContent = 'Search';
        initArray();
    } else {
        searchControls.style.display = 'none';
        btnRunText.textContent = 'Start';
        initArray();
    }
});

// Stack Implementation
function renderStack() {
    visualizerContainer.innerHTML = '';
    visualizerContainer.style.flexDirection = 'column-reverse';
    visualizerContainer.style.alignItems = 'center';
    visualizerContainer.style.justifyContent = 'flex-start';
    visualizerContainer.style.paddingBottom = '0';

    if (dsArray.length === 0) {
        visualizerContainer.innerHTML = '<div style="color: var(--text-secondary);">Stack is Empty</div>';
        return;
    }

    dsArray.forEach((val, idx) => {
        const block = document.createElement('div');
        block.className = 'val-block';
        block.textContent = val;
        block.style.width = '100px';
        block.style.height = '40px';
        block.style.background = idx === dsArray.length - 1 ? '#8b5cf6' : 'var(--accent-color)';
        block.style.border = '1px solid rgba(255,255,255,0.2)';
        block.style.display = 'flex';
        block.style.alignItems = 'center';
        block.style.justifyContent = 'center';
        block.style.color = '#fff';
        block.style.borderRadius = '4px';
        block.style.margin = '2px';
        block.style.animation = 'fadeInDown 0.3s ease';
        visualizerContainer.appendChild(block);
    });
}

// Queue Implementation
function renderQueue() {
    visualizerContainer.innerHTML = '';
    visualizerContainer.style.flexDirection = 'row';
    visualizerContainer.style.alignItems = 'center';
    visualizerContainer.style.justifyContent = 'center';
    visualizerContainer.style.paddingBottom = '20px';

    if (dsArray.length === 0) {
        visualizerContainer.innerHTML = '<div style="color: var(--text-secondary);">Queue is Empty</div>';
        return;
    }

