import {
  Layers,
  Search,
  ArrowUpDown,
  ListTree,
  GitBranch,
  Database,
  Network,
  Hash,
  Workflow,
  Waypoints,
  BrainCircuit,
} from 'lucide-react';

/*
  Recursive sidebar data.
  Each node can have:
    - label: display text
    - icon: Lucide icon component (optional, top-level only)
    - path: route path (leaf nodes)
    - children: nested array of nodes (branch nodes)

  The Sidebar component renders this recursively — no hardcoded depth limits.
*/

const sidebarData = [
  {
    label: 'Array',
    icon: Layers,
    children: [
      {
        label: 'Searching',
        icon: Search,
        children: [
          { label: 'Linear Search', path: '/algorithm/linear-search' },
          { label: 'Binary Search', path: '/algorithm/binary-search' },
        ],
      },
      {
        label: 'Sorting',
        icon: ArrowUpDown,
        children: [
          { label: 'Bubble Sort', path: '/algorithm/bubble-sort' },
          { label: 'Selection Sort', path: '/algorithm/selection-sort' },
          { label: 'Insertion Sort', path: '/algorithm/insertion-sort' },
          { label: 'Merge Sort', path: '/algorithm/merge-sort' },
          { label: 'Quick Sort', path: '/algorithm/quick-sort' },
          { label: 'Heap Sort', path: '/algorithm/heap-sort' },
          { label: 'Counting Sort', path: '/algorithm/counting-sort' },
          { label: 'Radix Sort', path: '/algorithm/radix-sort' },
        ],
      },
    ],
  },
  {
    label: 'Linked List',
    icon: ListTree,
    children: [
      { label: 'Singly Linked List', path: '/algorithm/singly-linked-list' },
      { label: 'Doubly Linked List', path: '/algorithm/doubly-linked-list' },
      { label: 'Circular Linked List', path: '/algorithm/circular-linked-list' },
    ],
  },
  {
    label: 'Stack & Queue',
    icon: Database,
    children: [
      { label: 'Stack', path: '/algorithm/stack' },
      { label: 'Queue', path: '/algorithm/queue' },
      { label: 'Priority Queue', path: '/algorithm/priority-queue' },
      { label: 'Deque', path: '/algorithm/deque' },
    ],
  },
  {
    label: 'Tree',
    icon: GitBranch,
    children: [
      { label: 'Binary Tree', path: '/algorithm/binary-tree' },
      { label: 'Binary Search Tree', path: '/algorithm/binary-search-tree' },
      { label: 'AVL Tree', path: '/algorithm/avl-tree' },
      {
        label: 'Traversals',
        children: [
          { label: 'Inorder', path: '/algorithm/inorder-traversal' },
          { label: 'Preorder', path: '/algorithm/preorder-traversal' },
          { label: 'Postorder', path: '/algorithm/postorder-traversal' },
          { label: 'Level Order', path: '/algorithm/level-order-traversal' },
        ],
      },
    ],
  },
  {
    label: 'Graph',
    icon: Network,
    children: [
      { label: 'BFS', path: '/algorithm/bfs' },
      { label: 'DFS', path: '/algorithm/dfs' },
      { label: "Dijkstra's", path: '/algorithm/dijkstra' },
      { label: "Kruskal's", path: '/algorithm/kruskal' },
      { label: "Prim's", path: '/algorithm/prim' },
    ],
  },
  {
    label: 'Hashing',
    icon: Hash,
    children: [
      { label: 'Hash Table', path: '/algorithm/hash-table' },
      { label: 'Open Addressing', path: '/algorithm/open-addressing' },
      { label: 'Chaining', path: '/algorithm/chaining' },
    ],
  },
  {
    label: 'Recursion & Backtracking',
    icon: Workflow,
    children: [
      { label: 'Fibonacci', path: '/algorithm/fibonacci' },
      { label: 'N-Queens', path: '/algorithm/n-queens' },
      { label: 'Sudoku Solver', path: '/algorithm/sudoku-solver' },
    ],
  },
  {
    label: 'Dynamic Programming',
    icon: BrainCircuit,
    children: [
      { label: '0/1 Knapsack', path: '/algorithm/knapsack' },
      { label: 'Longest Common Subsequence', path: '/algorithm/lcs' },
      { label: 'Longest Increasing Subsequence', path: '/algorithm/lis' },
      { label: 'Coin Change', path: '/algorithm/coin-change' },
    ],
  },
  {
    label: 'Greedy',
    icon: Waypoints,
    children: [
      { label: 'Activity Selection', path: '/algorithm/activity-selection' },
      { label: 'Huffman Coding', path: '/algorithm/huffman-coding' },
      { label: 'Fractional Knapsack', path: '/algorithm/fractional-knapsack' },
    ],
  },
];

export default sidebarData;
