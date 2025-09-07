document.addEventListener('DOMContentLoaded', () => {
    // DOM Element References
    const generateArrayBtn = document.getElementById('generate-array-btn');
    const sortBtn = document.getElementById('sort-btn');
    const stopBtn = document.getElementById('stop-btn');
    const sizeSlider = document.getElementById('size-slider');
    const sizeValue = document.getElementById('size-value');
    const algorithmSelect = document.getElementById('algorithm-select');
    const barContainer = document.getElementById('bar-container');
    const timeTakenElem = document.getElementById('time-taken');
    const liveTimerElem = document.getElementById('live-timer');
    
    // State variables
    let array = [];
    let isSorting = false;
    let stopSorting = false;
    let timerInterval = null; // To hold the timer's interval ID
    const ANIMATION_SPEED_MS = 10; // Default speed

    // Algorithm complexity data
    const algorithmDetails = {
        bubbleSort: { name: "Bubble Sort", bestTime: "O(n)", avgTime: "O(n²)", worstTime: "O(n²)", space: "O(1)" },
        selectionSort: { name: "Selection Sort", bestTime: "O(n²)", avgTime: "O(n²)", worstTime: "O(n²)", space: "O(1)" },
        insertionSort: { name: "Insertion Sort", bestTime: "O(n)", avgTime: "O(n²)", worstTime: "O(n²)", space: "O(1)" },
        mergeSort: { name: "Merge Sort", bestTime: "O(n log n)", avgTime: "O(n log n)", worstTime: "O(n log n)", space: "O(n)" },
        quickSort: { name: "Quick Sort", bestTime: "O(n log n)", avgTime: "O(n log n)", worstTime: "O(n²)", space: "O(log n)" },
        heapSort: { name: "Heap Sort", bestTime: "O(n log n)", avgTime: "O(n log n)", worstTime: "O(n log n)", space: "O(1)" },
    };

    // --- Core Functions ---

    /**
     * Updates the details panel with the complexity of the selected algorithm.
     */
    function updateAlgorithmDetails() {
        const selectedAlgorithm = algorithmSelect.value;
        const details = algorithmDetails[selectedAlgorithm];

        document.getElementById('details-title').textContent = `${details.name} Details`;
        document.getElementById('best-time').textContent = details.bestTime;
        document.getElementById('avg-time').textContent = details.avgTime;
        document.getElementById('worst-time').textContent = details.worstTime;
        document.getElementById('space-complexity').textContent = details.space;
    }

    /**
     * Generates a new random array and renders it as bars.
     */
    function generateArray() {
        if (isSorting) return;
        
        stopSorting = true; // Stop any residual processes
        if (timerInterval) clearInterval(timerInterval); // Clear any running timer
        liveTimerElem.classList.add('hidden'); // Hide live timer
        timeTakenElem.textContent = 'N/A'; // Reset time taken display
        array = [];
        barContainer.innerHTML = '';
        const size = sizeSlider.value;
        
        for (let i = 0; i < size; i++) {
            // Generate random numbers between 5 and 100
            array.push(Math.floor(Math.random() * 95) + 5);
        }
        
        renderBars();
    }

    /**
     * Renders the current array as vertical bars in the container.
     */
    function renderBars() {
        barContainer.innerHTML = '';
        array.forEach((value, index) => {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${value}%`;
            // Calculate bar width based on container size and array length
            const barWidth = Math.max(1, Math.floor(barContainer.clientWidth / (array.length * 1.5)));
            bar.style.width = `${barWidth}px`;
            barContainer.appendChild(bar);
        });
    }

    /**
     * A utility function to create a delay using Promises.
     * @param {number} ms - The delay in milliseconds.
     */
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Toggles the state of UI controls (buttons, slider).
     * @param {boolean} disabled - Whether to disable the controls.
     */
    function toggleControls(disabled) {
        isSorting = disabled;
        generateArrayBtn.disabled = disabled;
        sizeSlider.disabled = disabled;
        algorithmSelect.disabled = disabled;
        sortBtn.disabled = disabled;
        stopBtn.disabled = !disabled;
    }


    // --- Event Listeners ---

    generateArrayBtn.addEventListener('click', generateArray);
    sizeSlider.addEventListener('input', () => {
        sizeValue.textContent = sizeSlider.value;
        generateArray();
    });
    stopBtn.addEventListener('click', () => {
        stopSorting = true;
        if (timerInterval) clearInterval(timerInterval); // Also stop the timer
        liveTimerElem.classList.add('hidden');
    });

    sortBtn.addEventListener('click', async () => {
        stopSorting = false;
        toggleControls(true);

        const selectedAlgorithm = algorithmSelect.value;
        
        // Get all bar elements once before sorting
        const bars = document.getElementsByClassName('bar');

        // --- Live Timer Logic ---
        const startTime = performance.now();
        liveTimerElem.classList.remove('hidden'); // Show the timer
        liveTimerElem.textContent = '0.00 s';

        // Update the timer display every 50ms for a smooth counter
        timerInterval = setInterval(() => {
            const elapsedTime = (performance.now() - startTime) / 1000; // in seconds
            liveTimerElem.textContent = `${elapsedTime.toFixed(2)} s`;
        }, 50);


        // Call the selected sorting algorithm
        switch (selectedAlgorithm) {
            case 'bubbleSort':    await bubbleSort(bars); break;
            case 'selectionSort': await selectionSort(bars); break;
            case 'insertionSort': await insertionSort(bars); break;
            case 'mergeSort':     await mergeSort(bars); break;
            case 'quickSort':     await quickSort(bars); break;
            case 'heapSort':      await heapSort(bars); break;
        }
        
        // Stop the live timer interval and hide it
        clearInterval(timerInterval);
        liveTimerElem.classList.add('hidden');


        // If sorting was completed (not stopped), show final sorted state and accurate time
        if (!stopSorting) {
            const endTime = performance.now();
            const durationInMs = endTime - startTime;
            // Display the final, more accurate time in the details section
            timeTakenElem.textContent = `${(durationInMs / 1000).toFixed(4)} s`;

            for (let i = 0; i < bars.length; i++) {
                bars[i].classList.add('bar-sorted');
            }
        } else {
            // If stopped, the timer is already cleared. Update text.
            timeTakenElem.textContent = 'Stopped';
            renderBars();
        }

        toggleControls(false);
    });
    
    algorithmSelect.addEventListener('change', () => {
        updateAlgorithmDetails();
        generateArray();
    });

    // Generate initial array and set details on page load
    generateArray();
    updateAlgorithmDetails();
    window.addEventListener('resize', renderBars); // Adjust bars on window resize

    // --- Sorting Algorithms ---

    /**
     * Swaps two bars' heights and updates the underlying array.
     * @param {HTMLElement} bar1 - The first bar element.
     * @param {HTMLElement} bar2 - The second bar element.
     * @param {number} i - Index of the first bar.
     * @param {number} j - Index of the second bar.
     */
    function swap(bar1, bar2, i, j) {
        // Swap heights
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;

        // Swap values in the array
        const tempValue = array[i];
        array[i] = array[j];
        array[j] = tempValue;
    }
    
    // 1. Bubble Sort
    async function bubbleSort(bars) {
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (stopSorting) return;
                
                bars[j].classList.add('bar-compare');
                bars[j + 1].classList.add('bar-compare');
                
                await delay(ANIMATION_SPEED_MS);
                
                if (array[j] > array[j + 1]) {
                    swap(bars[j], bars[j + 1], j, j + 1);
                }
                
                bars[j].classList.remove('bar-compare');
                bars[j + 1].classList.remove('bar-compare');
            }
            bars[n - 1 - i].classList.add('bar-sorted');
        }
        if (!stopSorting) bars[0].classList.add('bar-sorted');
    }

    // 2. Selection Sort
    async function selectionSort(bars) {
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            bars[i].classList.add('bar-compare'); // Mark current position
            for (let j = i + 1; j < n; j++) {
                if (stopSorting) return;
                
                bars[j].classList.add('bar-compare');
                await delay(ANIMATION_SPEED_MS);
                
                if (array[j] < array[minIdx]) {
                    if (minIdx !== i) {
                        bars[minIdx].classList.remove('bar-swap');
                    }
                    minIdx = j;
                    bars[minIdx].classList.add('bar-swap'); // Mark new minimum
                }
                bars[j].classList.remove('bar-compare');
            }
            
            await delay(ANIMATION_SPEED_MS);
            swap(bars[i], bars[minIdx], i, minIdx);

            bars[minIdx].classList.remove('bar-swap');
            bars[i].classList.remove('bar-compare');
            bars[i].classList.add('bar-sorted');
        }
        if (!stopSorting) bars[n - 1].classList.add('bar-sorted');
    }
    
    // 3. Insertion Sort
    async function insertionSort(bars) {
        const n = array.length;
        bars[0].classList.add('bar-sorted');
        for (let i = 1; i < n; i++) {
            if (stopSorting) return;
            let key = array[i];
            let keyHeight = bars[i].style.height;
            let j = i - 1;
            
            bars[i].classList.add('bar-compare');
            await delay(ANIMATION_SPEED_MS);

            while (j >= 0 && array[j] > key) {
                if (stopSorting) return;
                
                array[j + 1] = array[j];
                bars[j + 1].style.height = bars[j].style.height;
                bars[j + 1].classList.add('bar-sorted');
                
                j--;
                await delay(ANIMATION_SPEED_MS);
                  // Unsort previous elements for visualization
                for(let k=i; k>=0; k--) bars[k].classList.remove('bar-sorted');
            }
            array[j + 1] = key;
            bars[j + 1].style.height = keyHeight;
            bars[i].classList.remove('bar-compare');
            
            // Mark all elements up to i as sorted for this pass
            for(let k=0; k<=i; k++) bars[k].classList.add('bar-sorted');
        }
    }

    // 4. Merge Sort
    async function mergeSort(bars) {
        await mergeSortRecursive(bars, 0, array.length - 1);
    }

    async function mergeSortRecursive(bars, l, r) {
        if (l >= r) {
            if(l>=0 && l < bars.length && !stopSorting) bars[l].classList.add('bar-sorted');
            return;
        }
        if (stopSorting) return;
        const m = l + Math.floor((r - l) / 2);
        await mergeSortRecursive(bars, l, m);
        await mergeSortRecursive(bars, m + 1, r);
        await merge(bars, l, m, r);
    }

    async function merge(bars, l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;
        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = array[l + i];
        for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];
        
        let i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
            if (stopSorting) return;
            
            if(bars[l+i]) bars[l+i].classList.add('bar-compare');
            if(bars[m+1+j]) bars[m+1+j].classList.add('bar-compare');
            await delay(ANIMATION_SPEED_MS);
            
            if(bars[l+i]) bars[l+i].classList.remove('bar-compare');
            if(bars[m+1+j]) bars[m+1+j].classList.remove('bar-compare');

            if (L[i] <= R[j]) {
                array[k] = L[i];
                bars[k].style.height = `${L[i]}%`;
                i++;
            } else {
                array[k] = R[j];
                bars[k].style.height = `${R[j]}%`;
                j++;
            }
            if(bars[k]) bars[k].classList.add('bar-sorted');
            k++;
        }

        while (i < n1) {
            if (stopSorting) return;
            array[k] = L[i];
            bars[k].style.height = `${L[i]}%`;
            bars[k].classList.add('bar-sorted');
            i++; k++;
        }
        while (j < n2) {
            if (stopSorting) return;
            array[k] = R[j];
            bars[k].style.height = `${R[j]}%`;
            bars[k].classList.add('bar-sorted');
            j++; k++;
        }
    }

    // 5. Quick Sort
    async function quickSort(bars) {
        await quickSortRecursive(bars, 0, array.length - 1);
         // After sorting is done, ensure all bars are marked as sorted if not stopped
        if(!stopSorting) {
            for(let i=0; i<bars.length; i++) {
                bars[i].classList.add('bar-sorted');
            }
        }
    }

    async function quickSortRecursive(bars, low, high) {
        if (low < high) {
            if (stopSorting) return;
            let pi = await partition(bars, low, high);
            if (pi === -1) return; // Stop propagation
            await quickSortRecursive(bars, low, pi - 1);
            await quickSortRecursive(bars, pi + 1, high);
        } 
    }

    async function partition(bars, low, high) {
        let pivot = array[high];
        bars[high].classList.add('bar-swap'); // Pivot color
        let i = (low - 1);

        for (let j = low; j <= high - 1; j++) {
            if (stopSorting) return -1; // Indicate stop
            bars[j].classList.add('bar-compare');
            await delay(ANIMATION_SPEED_MS);

            if (array[j] < pivot) {
                i++;
                swap(bars[i], bars[j], i, j);
            }
            bars[j].classList.remove('bar-compare');
        }
        if(stopSorting) return -1;
        swap(bars[i + 1], bars[high], i + 1, high);
        await delay(ANIMATION_SPEED_MS);
        bars[high].classList.remove('bar-swap');
        return (i + 1);
    }

    // 6. Heap Sort
    async function heapSort(bars) {
        const n = array.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            if (stopSorting) return;
            await heapify(bars, n, i);
        }

        for (let i = n - 1; i > 0; i--) {
            if (stopSorting) return;
            swap(bars[0], bars[i], 0, i);
            bars[i].classList.add('bar-sorted');
            await heapify(bars, i, 0);
        }
            if (!stopSorting) bars[0].classList.add('bar-sorted');
    }

    async function heapify(bars, n, i) {
        if (stopSorting) return;
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;
        
        bars[i].classList.add('bar-swap');
        if(l < n) bars[l].classList.add('bar-compare');
        if(r < n) bars[r].classList.add('bar-compare');
        
        if (l < n && array[l] > array[largest]) largest = l;
        if (r < n && array[r] > array[largest]) largest = r;

        await delay(ANIMATION_SPEED_MS);

        bars[i].classList.remove('bar-swap');
        if(l < n) bars[l].classList.remove('bar-compare');
        if(r < n) bars[r].classList.remove('bar-compare');

        if (largest !== i) {
            swap(bars[i], bars[largest], i, largest);
            await heapify(bars, n, largest);
        }
    }
});