# Sorting Algorithm Visualizer

An interactive web application built to visualize the inner workings of various sorting algorithms. This project uses HTML, CSS, and vanilla JavaScript to provide a clear, visual representation of the sorting process, helping users understand how each algorithm operates.



## 🚀 Live Demo

**[Check out the live version here!](https://sorting-visualizer-five-jade.vercel.app/)**



---

## ✨ Features

-   **Multiple Algorithms**: Visualize 6 popular sorting algorithms:
    -   Bubble Sort
    -   Selection Sort
    -   Insertion Sort
    -   Merge Sort
    -   Quick Sort
    -   Heap Sort
-   **Interactive Controls**:
    -   **Generate New Array**: Create a new random array to sort.
    -   **Array Size Slider**: Easily adjust the number of elements in the array (from 10 to 150).
    -   **Sort & Stop**: Full control to start and stop the animation at any point.
-   **Live Timer**: A real-time timer shows the duration of the sorting process, with a precise final time displayed upon completion.
-   **Algorithm Details**: Displays the Time Complexity (Best, Average, Worst) and Space Complexity for the selected algorithm.
-   **Clear Visualization**:
    -   Bars are color-coded to indicate their current state:
        -   🔴 **Comparing**: Red bars are being compared.
        -   🟡 **Swapping/Pivoting**: Yellow bars indicate a swap or a pivot element.
        -   🟢 **Sorted**: Green bars are in their final sorted position.
-   **Responsive Design**: The layout is fully responsive and works smoothly on desktops, tablets, and mobile devices.

---

## 🛠️ Technologies Used

-   **HTML5**: For the basic structure and content.
-   **CSS3**: For custom styling and animations.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for modern and responsive styling.
-   **Vanilla JavaScript (ES6+)**: For all the logic, DOM manipulation, and algorithm implementation.

---

## 📂 How to Use

To run this project locally, follow these simple steps:

1.  **Clone the repository or download the files:**
    ```sh
    git clone [https://github.com/shivanshjoshi08/Sorting-Visualizer.git]
    ```
    Make sure you have `index.html`, `style.css`, and `script.js` in the same directory.

2.  **Open the HTML file:**
    Navigate to the project directory and open the `index.html` file in your favorite web browser (like Chrome, Firefox, or Edge).

3.  **Enjoy!**
    You can now interact with the visualizer.

---

## ⚙️ Code Structure & Overview

The project is organized into three separate files for better maintainability:

### 📄 `index.html`
This file contains the main structure of the web page.
-   It sets up the header with all user controls (buttons, sliders, dropdown).
-   Defines the container (`#bar-container`) for the visualization and the details panel.
-   Links to the `style.css` stylesheet and the `script.js` file.

### 🎨 `style.css`
This file holds all the custom CSS rules that complement Tailwind CSS.
-   It includes styling for the range slider to ensure a consistent look across browsers.
-   Defines the core `bar` style and the color-coded state classes: `.bar-compare`, `.bar-swap`, and `.bar-sorted`.

### 💻 `script.js`
This is the heart of the application, containing all the dynamic logic.
-   **DOM Manipulation**: Selects all necessary HTML elements to interact with.
-   **State Management**: Uses variables like `array`, `isSorting`, `stopSorting`, and `timerInterval` to track the application's state.
-   **Core Functions**: Includes helpers like `generateArray()`, `renderBars()`, `toggleControls()`, and `delay()`.
-   **Event Listeners**: Manages all user interactions, triggering the appropriate functions.
-   **Timer Logic**: Uses `performance.now()` to accurately measure the sorting duration and `setInterval` to display a live-updating timer during the sort.
-   **Sorting Algorithms**: Each algorithm is implemented as an `async` function that modifies the array and updates the DOM elements' styles to create the visual animation, using `await delay()` to control the speed.

---

## 🔮 Future Improvements

-   [ ] Add a **Speed Control Slider** to adjust the animation delay.
-   [ ] Implement more sorting algorithms (e.g., Radix Sort, Counting Sort).
-   [ ] Show a live counter for the number of comparisons and array swaps.
-   [ ] Add sound effects for comparison and swap operations for a more immersive experience.
