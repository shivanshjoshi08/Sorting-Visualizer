Sorting Algorithm Visualizer
An interactive web-based tool built with Vanilla JavaScript, HTML, and CSS to visualize the inner workings of various sorting algorithms. This project provides a clear, step-by-step visual representation of how different algorithms sort an array of numbers, making complex concepts easier to understand.

✨ Features
Multiple Algorithms: Visualize six fundamental sorting algorithms:

Bubble Sort

Selection Sort

Insertion Sort

Merge Sort

Quick Sort

Heap Sort

Interactive Controls:

Generate New Array: Create a new random array of bars to sort.

Array Size Slider: Dynamically change the number of elements in the array (from 10 to 150).

Start & Stop: Full control to start and stop the sorting process at any time.

Real-time Visualization:

Bars are color-coded to represent their current state:

Blue: Default state.

Red: Elements being compared.

Yellow: Pivot element or elements being swapped.

Green: Element is in its final sorted position.

Performance Metrics:

Live Timer: A running timer shows the elapsed time while the algorithm is running.

Time Taken: Displays the precise time taken for the sort to complete.

Complexity Analysis: Shows the Best, Average, and Worst-case Time and Space complexities for the selected algorithm.

Responsive Design: The visualizer is designed to work smoothly on different screen sizes.

🚀 Live Demo
Check out the live demo here!

🛠️ Technologies Used
Frontend: HTML5, CSS3, JavaScript (ES6+)

Styling: Tailwind CSS for a modern, utility-first UI.

Fonts: Google Fonts (Inter) for clean and readable typography.

⚙️ Getting Started
To get this project running on your local machine, follow the steps below:

Clone the repository:

git clone [https://github.com/shivanshjoshi08/sorting-visualizer.git]

Navigate to the project directory:

cd sorting-visualizer

Open the application:
Simply open the index.html file in your favorite web browser. No extra installation or build steps are required!

💡 How It Works
Array Representation: The array of numbers is visually represented by div elements (bars). The height of each bar is proportional to the numerical value it represents.

Asynchronous Visualization: The core of the visualization is handled using async/await functions in JavaScript. A small delay() is introduced after each comparison or swap. This allows the browser to re-render the UI and display the changes step-by-step, instead of freezing and showing only the final result.

Dynamic Styling: As the algorithms run, CSS classes (.bar-compare, .bar-swap, .bar-sorted) are dynamically added or removed from the bars to change their color and reflect the current operation.

Happy Sorting!