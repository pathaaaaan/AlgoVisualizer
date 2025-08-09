# Sorting Algorithm Visualizer

An interactive JavaFX application that visualizes various sorting and searching algorithms through animated bar charts. This educational tool helps users understand how different algorithms work by showing step-by-step animations of the sorting/searching process.

## 🎯 Features

### Sorting Algorithms
- **Bubble Sort** - O(n²) worst case, O(n) best case
- **Insertion Sort** - O(n²) worst case, O(n) best case  
- **Selection Sort** - O(n²) worst and best case
- **Shell Sort** - O(n²) worst case, O(n log n) best case
- **Quick Sort** - O(n²) worst case, O(n log n) best case
- **Merge Sort** - O(n log n) worst and best case

### Searching Algorithms
- **Linear Search** - O(n) worst case, O(1) best case
- **Binary Search** - O(log n) worst case, O(1) best case

### Interactive Features
- 🎛️ **Adjustable array size** (10-300 elements)
- ⏱️ **Configurable animation delay** (1-2000ms)
- 📊 **Real-time status updates** showing current algorithm and sorting state
- 🎨 **Color-coded visualization**:
  - Selected elements being compared (pink)
  - Current pivot/index (green)
  - Found elements (bright green)
  - Not found elements (red)
- ✨ **Smooth swap animations** between elements
- 🔄 **Randomize button** to generate new unsorted arrays

## 🚀 Getting Started

### Prerequisites
- Java 8 or higher
- JavaFX (included in Java 8-10, separate installation required for Java 11+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sorting-algorithm-visualizer.git
   cd sorting-algorithm-visualizer
   ```

2. **Compile the project**
   ```bash
   javac -cp "path/to/javafx-sdk/lib/*" src/sortingVisualizer/*.java src/RunProject.java
   ```

3. **Run the application**
   ```bash
   java -cp "src:path/to/javafx-sdk/lib/*" RunProject
   ```

### For Java 11+ Users
If you're using Java 11 or later, you'll need to download JavaFX separately:

1. Download JavaFX SDK from [OpenJFX](https://openjfx.io/)
2. Extract it to a directory
3. Update the classpath in the commands above with your JavaFX path

## 🎮 How to Use

1. **Launch the application** - The main window will open with a randomized array
2. **Adjust settings**:
   - Use the "Array Size" slider to change the number of elements (10-300)
   - Use the "Delay" slider to control animation speed (1-2000ms)
3. **Choose an algorithm**:
   - Click any sorting algorithm button to start visualization
   - For searching, enter a value in the "Search Value" field and click Linear/Binary Search
4. **Watch the animation** - Elements will be color-coded and animated as the algorithm progresses
5. **Randomize** - Click "Randomize" to generate a new unsorted array

## 🏗️ Project Structure

```
Sorting_Visualizer-master/
├── src/
│   ├── RunProject.java                 # Main entry point
│   └── sortingVisualizer/
│       ├── Main.java                   # JavaFX application class
│       ├── Controller.java             # Main controller with algorithm implementations
│       └── resources/
│           ├── mainWindow.fxml         # UI layout
│           ├── mainWindowStyles.css    # Styling
│           └── bar-chart.png           # Application icon
├── README.md                           # This file
└── LICENSE                             # License information
```

## 🎨 UI Design

The application features a modern dark theme with:
- **Background**: Dark blue (#0C2633)
- **Accent color**: Cyan (#00D8FA)
- **Success color**: Bright green (#39FF14)
- **Error color**: Red (#FF0000)
- **Selected elements**: Pink (#FFAAAA)

## 🔧 Technical Details

- **Framework**: JavaFX
- **Language**: Java
- **Architecture**: MVC pattern with FXML
- **Threading**: Multi-threaded animations to prevent UI freezing
- **Visualization**: JavaFX BarChart component
- **Animation**: JavaFX TranslateTransition for smooth element swapping

## 📚 Educational Value

This visualizer is perfect for:
- **Students** learning algorithms and data structures
- **Educators** demonstrating algorithm concepts
- **Developers** understanding algorithm performance characteristics
- **Anyone** interested in seeing how sorting algorithms work

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Development Team

**Team ALGOVIZ** - Developed this educational tool to make algorithm learning more interactive and engaging.

---

⭐ **Star this repository if you find it helpful!**
