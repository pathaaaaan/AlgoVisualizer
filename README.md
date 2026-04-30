# DS AlgoVisualizer

An interactive Data Structures & Algorithms visualizer built with React and Vite. Step through sorting algorithms, searching algorithms, and core data structures with smooth, real-time animations.

🔗 **Live Demo:** [ds-algovisualizer.netlify.app](https://ds-algovisualizer.netlify.app/)

---

## Features

- **Sorting Algorithms** — Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Counting Sort, Radix Sort
- **Searching Algorithms** — Linear Search, Binary Search
- **Data Structures** — Stack, Queue, Linked List
- **Step-by-step execution** with animated state transitions
- **Learn mode** — topic overviews, complexity tables, and code walkthroughs
- Responsive dark-themed UI with a recursive sidebar syllabus

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Routing | React Router v7 |
| Icons | Lucide React |

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/pathaaaaan/AlgoVisualizer.git
cd AlgoVisualizer

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── algorithms/       # Step generators for each algorithm
├── components/       # Reusable UI components (layout, visualizers)
├── data/             # Syllabus & topic metadata
├── hooks/            # Custom React hooks
├── pages/            # Home, Learn, TopicPage, AlgorithmPage
├── routes/           # App routing
├── styles/           # Global style overrides
└── utils/            # Shared helpers
```

---

## License

MIT
