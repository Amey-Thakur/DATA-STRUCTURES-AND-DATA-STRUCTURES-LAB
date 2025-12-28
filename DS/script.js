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
    stack: { title: 'Stack', desc: 'LIFO (Last In First Out) structure. Elements are added and removed from the top only.', complexity: 'O(1)' },
    queue: { title: 'Queue', desc: 'FIFO (First In First Out) structure. Elements are added at the rear and removed from the front.', complexity: 'O(1)' },
    linkedlist: { title: 'Linked List', desc: 'Linear collection of data elements whose order is not given by their physical placement in memory.', complexity: 'O(1) / O(n)' },
    binarytree: { title: 'Binary Search Tree', desc: 'Tree data structure where each node has at most two children, allowing for efficient search, insertion, and deletion.', complexity: 'O(log n)' },
    graph: { title: 'Graph Traversal', desc: 'Visualizing Breadth-First Search (BFS) and Depth-First Search (DFS) on a graph.', complexity: 'O(V + E)' }
};

const algoComplexity = document.getElementById('algo-complexity');

// Update UI when algorithm changes
algoSelect.addEventListener('change', () => {
    const algo = algoSelect.value;
    algoTitle.textContent = algoInfo[algo].title;
    algoDescription.textContent = algoInfo[algo].desc;
    algoComplexity.textContent = algoInfo[algo].complexity;

    // Reset state
    isRunning = false;
    btnRunText.textContent = 'Start';
    dsInput.value = '';

    if (algo === 'stack' || algo === 'queue' || algo === 'linkedlist' || algo === 'binarytree' || algo === 'graph') {
        mainControls.style.display = 'none';
        searchControls.style.display = 'none';

        // Reset all specific controls
        dsControls.style.display = 'none';
        llControls.style.display = 'none';
        btControls.style.display = 'none';
        graphControls.style.display = 'none';

        if (algo === 'graph') {
            graphControls.style.display = 'flex';
            resetGraph();
        } else if (algo === 'binarytree') {
            btControls.style.display = 'flex';
            resetBST();
        } else if (algo === 'linkedlist') {
            llControls.style.display = 'flex';
            dsArray = [];
            renderLinkedList();
        } else {
            dsControls.style.display = 'flex';

            if (algo === 'stack') {
                btnPushText.textContent = 'Push';
                btnPopText.textContent = 'Pop';
                dsArray = [];
                renderStack();
            } else {
                btnPushText.textContent = 'Enqueue';
                btnPopText.textContent = 'Dequeue';
                dsArray = [];
                renderQueue();
            }
        }
    } else {
        mainControls.style.display = 'flex';
        dsControls.style.display = 'none';

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

    dsArray.forEach((val, idx) => {
        const block = document.createElement('div');
        block.className = 'val-block';
        block.textContent = val;
        block.style.width = '50px';
        block.style.height = '50px';
        block.style.background = idx === 0 ? '#8b5cf6' : 'var(--accent-color)'; // Head is purple
        block.style.border = '1px solid rgba(255,255,255,0.2)';
        block.style.display = 'flex';
        block.style.alignItems = 'center';
        block.style.justifyContent = 'center';
        block.style.color = '#fff';
        block.style.borderRadius = '8px';
        block.style.margin = '4px';
        block.style.animation = 'fadeInDown 0.3s ease';

        // Add arrow for next
        if (idx < dsArray.length - 1) {
            const arrow = document.createElement('div');
            arrow.innerHTML = '<i class="fas fa-arrow-right" style="color: var(--text-secondary);"></i>';
            visualizerContainer.appendChild(block);
            visualizerContainer.appendChild(arrow);
        } else {
            visualizerContainer.appendChild(block);
        }
    });
}

// Linked List Implementation
function renderLinkedList() {
    visualizerContainer.innerHTML = '';
    visualizerContainer.style.flexDirection = 'row';
    visualizerContainer.style.alignItems = 'center';
    visualizerContainer.style.justifyContent = 'flex-start';
    visualizerContainer.style.paddingBottom = '40px';
    visualizerContainer.style.overflowX = 'auto';

    if (dsArray.length === 0) {
        visualizerContainer.innerHTML = '<div style="color: var(--text-secondary);">List is Empty</div>';
        return;
    }

    dsArray.forEach((val, idx) => {
        const node = document.createElement('div');
        node.className = 'll-node';

        // Data Part
        const dataDiv = document.createElement('div');
        dataDiv.className = 'll-data';
        dataDiv.textContent = val;

        // Pointer Part
        const ptrDiv = document.createElement('div');
        ptrDiv.className = 'll-ptr';
        ptrDiv.innerHTML = '<div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>';

        node.appendChild(dataDiv);
        node.appendChild(ptrDiv);

        if (idx === 0) {
            const headLabel = document.createElement('div');
            headLabel.className = 'll-head-label';
            headLabel.textContent = 'HEAD';
            dataDiv.appendChild(headLabel);
        }

        visualizerContainer.appendChild(node);

        // Arrow and Null
        if (idx < dsArray.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'll-link';
            arrow.innerHTML = '<i class="fas fa-arrow-right"></i>';
            visualizerContainer.appendChild(arrow);
        } else {
            const arrow = document.createElement('div');
            arrow.className = 'll-link';
            arrow.innerHTML = '<i class="fas fa-arrow-right"></i>';

            const nullTerm = document.createElement('div');
            nullTerm.className = 'll-null';
            nullTerm.textContent = 'NULL';

            visualizerContainer.appendChild(arrow);
            visualizerContainer.appendChild(nullTerm);
        }
    });
}

// Stack/Queue Buttons
btnPushEnqueue.addEventListener('click', () => {
    const val = dsInput.value;
    if (val === '') return;

    if (dsArray.length >= 8) {
        alert("Limit reached for visualization purposes!");
        return;
    }

    const num = parseInt(val);
    dsArray.push(num);
    dsInput.value = '';

    if (algoSelect.value === 'stack') renderStack();
    else renderQueue();
});

btnPopDequeue.addEventListener('click', () => {
    if (dsArray.length === 0) return;

    if (algoSelect.value === 'stack') {
        dsArray.pop();
        renderStack();
    } else {
        dsArray.shift();
        renderQueue();
    }
});

// Linked List Buttons
btnInsertHead.addEventListener('click', () => {
    const val = llInput.value;
    if (val === '') return;
    if (dsArray.length >= 8) { alert("Limit reached for visualization purposes!"); return; }
    dsArray.unshift(parseInt(val));
    llInput.value = '';
    renderLinkedList();
});

btnInsertTail.addEventListener('click', () => {
    const val = llInput.value;
    if (val === '') return;
    if (dsArray.length >= 8) { alert("Limit reached for visualization purposes!"); return; }
    dsArray.push(parseInt(val));
    llInput.value = '';
    renderLinkedList();
});

btnDeleteHead.addEventListener('click', () => {
    if (dsArray.length === 0) return;
    dsArray.shift();
    renderLinkedList();
});

btnDeleteTail.addEventListener('click', () => {
    if (dsArray.length === 0) return;
    dsArray.pop();
    renderLinkedList();
});

// =========================================
//   BINARY SEARCH TREE (BST) VISUALIZATION
// =========================================

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

let bstRoot = null;

function resetBST() {
    bstRoot = null;
    renderBST();
}

function insertBST(value) {
    const newNode = new TreeNode(value);
    if (!bstRoot) {
        bstRoot = newNode;
    } else {
        insertNode(bstRoot, newNode);
    }
    renderBST();
}

function insertNode(node, newNode) {
    if (newNode.value < node.value) {
        if (!node.left) node.left = newNode;
        else insertNode(node.left, newNode);
    } else {
        if (!node.right) node.right = newNode;
        else insertNode(node.right, newNode);
    }
}

function renderBST() {
    visualizerContainer.innerHTML = '';
    // Reset container styles for absolute positioning
    visualizerContainer.style.position = 'relative';
    visualizerContainer.style.display = 'block';
    visualizerContainer.style.height = '400px';
    visualizerContainer.style.overflow = 'auto'; // allow scroll if tree gets wide
    visualizerContainer.style.flexDirection = '';
    visualizerContainer.style.alignItems = '';
    visualizerContainer.style.justifyContent = '';

    if (!bstRoot) {
        visualizerContainer.style.display = 'flex';
        visualizerContainer.style.alignItems = 'center';
        visualizerContainer.style.justifyContent = 'center';
        visualizerContainer.innerHTML = '<div style="color: var(--text-secondary);">Tree is Empty</div>';
        return;
    }

    // SVG for edges
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "bt-svg");
    // Ensure SVG covers scrollable area if needed, but 100% is fine for now
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    visualizerContainer.appendChild(svg);

    // Calculate layout
    const containerWidth = visualizerContainer.clientWidth || 800;
    // Root at center, offset by width/4
    calculateNodePositions(bstRoot, containerWidth / 2, 40, containerWidth / 4);

    // Draw
    drawTree(bstRoot, svg);
}

function calculateNodePositions(node, x, y, offset) {
    if (!node) return;
    node.x = x;
    node.y = y;
    calculateNodePositions(node.left, x - offset, y + 70, offset / 1.8);
    calculateNodePositions(node.right, x + offset, y + 70, offset / 1.8);
}

function drawTree(node, svg) {
    if (!node) return;

    // Draw Left Edge
    if (node.left) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", node.x);
        line.setAttribute("y1", node.y);
        line.setAttribute("x2", node.left.x);
        line.setAttribute("y2", node.left.y);
        line.setAttribute("class", "bt-edge");
        svg.appendChild(line);
        drawTree(node.left, svg);
    }

    // Draw Right Edge
    if (node.right) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", node.x);
        line.setAttribute("y1", node.y);
        line.setAttribute("x2", node.right.x);
        line.setAttribute("y2", node.right.y);
        line.setAttribute("class", "bt-edge");
        svg.appendChild(line);
        drawTree(node.right, svg);
    }

    // Draw Node (Div)
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'bt-node';
    nodeDiv.textContent = node.value;
    nodeDiv.style.left = (node.x - 20) + 'px';
    nodeDiv.style.top = (node.y - 20) + 'px';
    visualizerContainer.appendChild(nodeDiv);
}

function countNodes(node) {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
}

// BT Button Listeners
btnBtInsert.addEventListener('click', () => {
    const val = parseInt(btInput.value);
    if (isNaN(val)) return;
    if (countNodes(bstRoot) >= 15) { alert("Limit reached for visualization purposes!"); return; }
    insertBST(val);
    btInput.value = '';
});

btnBtReset.addEventListener('click', () => {
    resetBST();
});

// =========================================
//   GRAPH VISUALIZATION (BFS/DFS)
// =========================================

let graphNodes = [];
let graphEdges = [];
let adjacencyList = new Map();

function resetGraph() {
    graphNodes = [];
    graphEdges = [];
    adjacencyList.clear();
    renderGraph();
}

function addGraphNode() {
    if (graphNodes.length >= 8) { alert("Max 8 nodes for demo!"); return; }
    const id = graphNodes.length;
    // Circular Layout
    const angle = (id / 8) * 2 * Math.PI; // max 8 nodes
    const cx = 50; // percent
    const cy = 50; // percent
    const radius = 30; // percent
    // We'll calculate px positions in render
    graphNodes.push({ id });
    adjacencyList.set(id, []);
    renderGraph();
}

function addGraphEdge(u, v) {
    u = parseInt(u);
    v = parseInt(v);
    if (isNaN(u) || isNaN(v)) return;
    if (!adjacencyList.has(u) || !adjacencyList.has(v)) { alert("Invalid Nodes"); return; }
    if (u === v) return;

    // Check duplicate
    const exists = graphEdges.some(e => (e.u === u && e.v === v) || (e.u === v && e.v === u));
    if (exists) return;

    graphEdges.push({ u, v });
    adjacencyList.get(u).push(v);
    adjacencyList.get(v).push(u); // Undirected
    renderGraph();
}

function renderGraph(visited = new Set(), visiting = null, pathEdges = new Set()) {
    visualizerContainer.innerHTML = '';
    visualizerContainer.style.position = 'relative';
    visualizerContainer.style.display = 'block';
    visualizerContainer.style.height = '400px';
    visualizerContainer.style.overflow = 'hidden';

    if (graphNodes.length === 0) {
        visualizerContainer.style.display = 'flex';
        visualizerContainer.style.alignItems = 'center';
        visualizerContainer.style.justifyContent = 'center';
        visualizerContainer.innerHTML = '<div style="color: var(--text-secondary);">Graph is Empty</div>';
        return;
    }

    const width = visualizerContainer.clientWidth || 800;
    const height = 400;
    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 3;

    // SVG for edges
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("class", "bt-svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    visualizerContainer.appendChild(svg);

    // Calculate Positions
    const nodePositions = {};
    const total = graphNodes.length;
    graphNodes.forEach((node, i) => {
        const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        nodePositions[node.id] = { x, y };
    });

    // Draw Edges
    graphEdges.forEach(edge => {
        const p1 = nodePositions[edge.u];
        const p2 = nodePositions[edge.v];
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", p1.x);
        line.setAttribute("y1", p1.y);
        line.setAttribute("x2", p2.x);
        line.setAttribute("y2", p2.y);

        let cls = "graph-edge";
        // Check if edge is traversed
        // Note: undirected, so check both directions
        const edgeKey1 = `${edge.u}-${edge.v}`;
        const edgeKey2 = `${edge.v}-${edge.u}`;
        if (pathEdges.has(edgeKey1) || pathEdges.has(edgeKey2)) {
            cls += " traversed";
        }
        line.setAttribute("class", cls);
        svg.appendChild(line);
    });

    // Draw Nodes
    graphNodes.forEach(node => {
        const pos = nodePositions[node.id];
        const el = document.createElement('div');
        el.className = 'graph-node';
        if (visited.has(node.id)) el.classList.add('visited');
        if (visiting === node.id) el.classList.add('visiting');

        el.textContent = node.id;
        el.style.left = (pos.x - 20) + 'px';
        el.style.top = (pos.y - 20) + 'px';
        visualizerContainer.appendChild(el);
    });
}

// Traversals
async function bfs(startNode) {
    if (!adjacencyList.has(startNode)) return;
    const visited = new Set();
    const queue = [startNode];
    visited.add(startNode);
    const pathEdges = new Set();

    renderGraph(visited, startNode, pathEdges);
    await sleep(800);

    while (queue.length > 0) {
        const u = queue.shift();
        renderGraph(visited, u, pathEdges); // Visited state mostly

        const neighbors = adjacencyList.get(u).sort((a, b) => a - b);
        for (const v of neighbors) {
            if (!visited.has(v)) {
                visited.add(v);
                queue.push(v);
                pathEdges.add(`${u}-${v}`);
                renderGraph(visited, v, pathEdges); // Show v as visiting
                await sleep(800);
            }
        }
    }
    renderGraph(visited, null, pathEdges);
}

async function dfs(startNode) {
    if (!adjacencyList.has(startNode)) return;
    const visited = new Set();
    const pathEdges = new Set();

    await dfsRecursive(startNode, visited, pathEdges);
    renderGraph(visited, null, pathEdges);
}

async function dfsRecursive(u, visited, pathEdges) {
    visited.add(u);
    renderGraph(visited, u, pathEdges);
    await sleep(800);

    const neighbors = adjacencyList.get(u).sort((a, b) => a - b);
    for (const v of neighbors) {
        if (!visited.has(v)) {
            pathEdges.add(`${u}-${v}`);
            await dfsRecursive(v, visited, pathEdges);
            // Backtrack visual
            renderGraph(visited, u, pathEdges);
            await sleep(400);
        }
    }
}


// Graph Listeners
btnAddNode.addEventListener('click', () => {
    addGraphNode();
});

btnAddEdge.addEventListener('click', () => {
    const val = graphInput.value;
    const parts = val.split('-');
    if (parts.length === 2) {
        addGraphEdge(parts[0], parts[1]);
        graphInput.value = '';
    } else {
        alert("Use format u-v (e.g. 0-1)");
    }
});

btnRunBFS.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    bfs(0).then(() => isRunning = false);
});

btnRunDFS.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    dfs(0).then(() => isRunning = false);
});

btnGraphReset.addEventListener('click', () => {
    resetGraph();
});
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
    searchTarget.value = array[Math.floor(Math.random() * ARRAY_SIZE)];
    renderBars([], [], [], []);
}

// Render bars with highlighting
function renderBars(comparing = [], swapping = [], sorted = [], found = []) {
    visualizerContainer.innerHTML = '';
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
    const speed = speedSlider.value;
    return Math.max(10, 500 - (speed * 4.5));
}

// ========== SORTING ALGORITHMS ==========

// Bubble Sort
async function bubbleSort() {
    const n = array.length;
    const sortedIndices = [];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!isRunning) return;
            renderBars([j, j + 1], [], sortedIndices);
            await sleep(getDelay());
            if (array[j] > array[j + 1]) {
                renderBars([], [j, j + 1], sortedIndices);
                await sleep(getDelay());
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
        sortedIndices.push(n - 1 - i);
    }
    sortedIndices.push(0);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Insertion Sort
async function insertionSort() {
    const n = array.length;
    const sortedIndices = [0];
    for (let i = 1; i < n; i++) {
        if (!isRunning) return;
        let key = array[i];
        let j = i - 1;
        renderBars([i], [], sortedIndices);
        await sleep(getDelay());
        while (j >= 0 && array[j] > key) {
            if (!isRunning) return;
            renderBars([j], [j, j + 1], sortedIndices);
            await sleep(getDelay());
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = key;
        sortedIndices.push(i);
        renderBars([], [], sortedIndices);
        await sleep(getDelay());
    }
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Selection Sort
async function selectionSort() {
    const n = array.length;
    const sortedIndices = [];
    for (let i = 0; i < n - 1; i++) {
        if (!isRunning) return;
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (!isRunning) return;
            renderBars([minIdx, j], [], sortedIndices);
            await sleep(getDelay());
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            renderBars([], [i, minIdx], sortedIndices);
            await sleep(getDelay());
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
        }
        sortedIndices.push(i);
    }
    sortedIndices.push(n - 1);
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// Quick Sort
async function quickSort(low = 0, high = array.length - 1, sortedIndices = []) {
    if (low < high && isRunning) {
        const pi = await partition(low, high, sortedIndices);
        if (!isRunning) return;
        await quickSort(low, pi - 1, sortedIndices);
        await quickSort(pi + 1, high, sortedIndices);
    }
    if (low === 0 && high === array.length - 1) {
        renderBars([], [], Array.from({ length: array.length }, (_, i) => i));
        finishRun();
    }
}

async function partition(low, high, sortedIndices) {
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
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    if (!isRunning) return;

    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);

    if (left === 0 && right === array.length - 1) {
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
    const n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (!isRunning) return;
        await heapify(n, i);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        if (!isRunning) return;
        renderBars([0, i], [], []);
        await sleep(getDelay());

        [array[0], array[i]] = [array[i], array[0]];
        renderBars([], [0, i], [], []);
        await sleep(getDelay());

        await heapify(i, 0);
    }

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
    const n = array.length;
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < n; i++) {
            if (!isRunning) return;
            let temp = array[i];
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                if (!isRunning) return;
                renderBars([j, j - gap], [], []);
                await sleep(getDelay());
                array[j] = array[j - gap];
                renderBars([], [j], [], []);
                await sleep(getDelay());
            }
            array[j] = temp;
        }
    }
    renderBars([], [], Array.from({ length: n }, (_, i) => i));
    finishRun();
}

// ========== SEARCHING ALGORITHMS ==========

// Linear Search
async function linearSearch() {
    const target = parseInt(searchTarget.value);
    const n = array.length;

    for (let i = 0; i < n; i++) {
        if (!isRunning) return;

        renderBars([i], [], [], []); // Highlight current being checked
        await sleep(getDelay());

        if (array[i] === target) {
            renderBars([], [], [], [i]); // Found!
            await sleep(1000);
            finishRun();
            return;
        }
    }
    // Not found
    renderBars([], Array.from({ length: n }, (_, i) => i), [], []);
    await sleep(500);
    renderBars();
    finishRun();
}

// Binary Search
async function binarySearch() {
    const target = parseInt(searchTarget.value);
    let left = 0, right = array.length - 1;

    while (left <= right && isRunning) {
        const mid = Math.floor((left + right) / 2);
        renderBars([left, right], [mid], [], []);
        await sleep(getDelay() * 2);

        if (array[mid] === target) {
            renderBars([], [], [], [mid]);
            await sleep(1000);
            finishRun();
            return;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    // Not found - flash red
    renderBars([], Array.from({ length: array.length }, (_, i) => i), [], []);
    await sleep(500);
    renderBars();
    finishRun();
}

function finishRun() {
    isRunning = false;
    const algo = algoSelect.value;
    btnRunText.textContent = algo === 'binary' ? 'Search' : 'Start';
}

// Run selected algorithm
function runAlgorithm() {
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
    }
}

// Shuffle button
btnShuffle.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
    }
    setTimeout(() => {
        if (algoSelect.value === 'binary') { // Linear can be random
            initSortedArray();
        } else {
            initArray();
        }
        btnRunText.textContent = (algoSelect.value === 'binary' || algoSelect.value === 'linear') ? 'Search' : 'Start';
    }, 100);
});

// Run button
btnRun.addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        btnRunText.textContent = (algoSelect.value === 'binary' || algoSelect.value === 'linear') ? 'Search' : 'Start';
    } else {
        isRunning = true;
        btnRunText.textContent = 'Pause';
        runAlgorithm();
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
            case 'stack': return renderStack;
            case 'queue': return renderQueue;
            default: return null;
        }
    }

    if (btnShowCode) {
        btnShowCode.addEventListener('click', () => {
            const algo = algoSelect.value;
            const func = getAlgoFunction(algo);

            if (func) {
                modalTitle.textContent = algoInfo[algo].title + ' Implementation';
                modalCode.textContent = func.toString();
                if (window.Prism) Prism.highlightElement(modalCode);
                codeModal.style.display = 'flex';
                modalGithubLink.href = 'https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB';
            }
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            codeModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === codeModal) {
            codeModal.style.display = 'none';
        }
    });

    // Stats Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const suffix = counter.getAttribute('data-suffix') || '';
            const count = +counter.innerText.replace(suffix, '');

            const inc = Math.max(1, target / 100);

            if (count < target) {
                counter.innerText = Math.ceil(count + inc) + suffix;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + suffix;
            }
        };
        updateCount();
    });
});

// Initialize on load
initArray();
