/*
  Hardcoded algorithm content data.
  Keyed by slug (matches route param :name).
  Each entry has: title, category, overview, steps, complexity, code (multi-lang), examples.
*/

const algorithms = {
  'linear-search': {
    title: 'Linear Search',
    category: 'Array → Searching',
    overview:
      'Linear Search is the simplest searching algorithm. It sequentially checks each element of the list until a match is found or the whole list has been searched.',
    steps: [
      'Start from the first element of the array.',
      'Compare the current element with the target value.',
      'If a match is found, return the current index.',
      'If no match, move to the next element.',
      'If the end is reached without a match, return -1.',
    ],
    complexity: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(1)',
    },
    code: {
      cpp: `#include <iostream>
using namespace std;

int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target)
            return i;
    }
    return -1;
}

int main() {
    int arr[] = {2, 4, 7, 10, 15};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 7;
    int result = linearSearch(arr, n, target);
    cout << "Element found at index: " << result << endl;
    return 0;
}`,
      python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

arr = [2, 4, 7, 10, 15]
target = 7
result = linear_search(arr, target)
print(f"Element found at index: {result}")`,
      javascript: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

const arr = [2, 4, 7, 10, 15];
const target = 7;
console.log("Element found at index:", linearSearch(arr, target));`,
    },
    examples: [
      { input: '[2, 4, 7, 10, 15], target = 7', output: 'Index 2' },
      { input: '[1, 3, 5, 9], target = 6', output: '-1 (Not Found)' },
    ],
  },

  'binary-search': {
    title: 'Binary Search',
    category: 'Array → Searching',
    overview:
      'Binary Search works on sorted arrays by repeatedly dividing the search interval in half. It compares the target value to the middle element of the array.',
    steps: [
      'Ensure the array is sorted.',
      'Set low = 0 and high = n - 1.',
      'Calculate mid = (low + high) / 2.',
      'If arr[mid] == target, return mid.',
      'If arr[mid] < target, set low = mid + 1.',
      'If arr[mid] > target, set high = mid - 1.',
      'Repeat until low > high.',
    ],
    complexity: {
      time: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
      space: 'O(1)',
    },
    code: {
      cpp: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int arr[] = {1, 3, 5, 7, 9, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    cout << binarySearch(arr, n, 7) << endl;
    return 0;
}`,
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

print(binary_search([1, 3, 5, 7, 9, 11], 7))`,
      javascript: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9, 11], 7));`,
    },
    examples: [
      { input: '[1, 3, 5, 7, 9, 11], target = 7', output: 'Index 3' },
      { input: '[2, 4, 6, 8, 10], target = 5', output: '-1 (Not Found)' },
    ],
  },

  'bubble-sort': {
    title: 'Bubble Sort',
    category: 'Array → Sorting',
    overview:
      'Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    steps: [
      'Start from the first element.',
      'Compare the current element with the next element.',
      'If the current element is greater, swap them.',
      'Move to the next pair and repeat.',
      'After each full pass, the largest unsorted element "bubbles" to the end.',
      'Repeat until no swaps are needed.',
    ],
    complexity: {
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
    },
    code: {
      cpp: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    return 0;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));`,
    },
    examples: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', output: '[11, 12, 22, 25, 34, 64, 90]' },
      { input: '[5, 1, 4, 2, 8]', output: '[1, 2, 4, 5, 8]' },
    ],
  },

  'selection-sort': {
    title: 'Selection Sort',
    category: 'Array → Sorting',
    overview:
      'Selection Sort divides the array into a sorted and an unsorted region. It repeatedly selects the smallest element from the unsorted part and moves it to the sorted part.',
    steps: [
      'Find the minimum element in the unsorted portion.',
      'Swap it with the first unsorted element.',
      'Move the boundary of the sorted portion one element forward.',
      'Repeat until the entire array is sorted.',
    ],
    complexity: {
      time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
    },
    code: {
      cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        swap(arr[i], arr[minIdx]);
    }
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      javascript: `function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
  }
  return arr;
}`,
    },
    examples: [
      { input: '[29, 10, 14, 37, 13]', output: '[10, 13, 14, 29, 37]' },
    ],
  },

  'insertion-sort': {
    title: 'Insertion Sort',
    category: 'Array → Sorting',
    overview:
      'Insertion Sort builds the sorted array one element at a time by repeatedly picking the next element and inserting it into its correct position among the already sorted elements.',
    steps: [
      'Start from the second element (index 1).',
      'Compare it with the elements before it.',
      'Shift all larger elements one position to the right.',
      'Insert the current element in the correct position.',
      'Repeat for all remaining elements.',
    ],
    complexity: {
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
    },
    code: {
      cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i], j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      javascript: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i], j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    },
    examples: [
      { input: '[12, 11, 13, 5, 6]', output: '[5, 6, 11, 12, 13]' },
    ],
  },

  'merge-sort': {
    title: 'Merge Sort',
    category: 'Array → Sorting',
    overview:
      'Merge Sort is a divide-and-conquer algorithm. It divides the array into halves, recursively sorts them, and then merges the two sorted halves.',
    steps: [
      'Divide the array into two halves.',
      'Recursively sort each half.',
      'Merge the two sorted halves into one sorted array.',
      'The merge step compares elements from both halves and places them in order.',
    ],
    complexity: {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      space: 'O(n)',
    },
    code: {
      cpp: `void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}`,
    },
    examples: [
      { input: '[38, 27, 43, 3, 9, 82, 10]', output: '[3, 9, 10, 27, 38, 43, 82]' },
    ],
  },

  'quick-sort': {
    title: 'Quick Sort',
    category: 'Array → Sorting',
    overview:
      'Quick Sort is a divide-and-conquer algorithm that selects a pivot element, partitions the array around the pivot, and recursively sorts the sub-arrays.',
    steps: [
      'Choose a pivot element (commonly the last element).',
      'Partition the array such that elements smaller than the pivot are on the left and greater on the right.',
      'Recursively apply quick sort to the left and right partitions.',
    ],
    complexity: {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      space: 'O(log n)',
    },
    code: {
      cpp: `int partition(int arr[], int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) swap(arr[++i], arr[j]);
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
      python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x <= pivot]
    right = [x for x in arr[:-1] if x > pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)`,
      javascript: `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.slice(0, -1).filter(x => x <= pivot);
  const right = arr.slice(0, -1).filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`,
    },
    examples: [
      { input: '[10, 7, 8, 9, 1, 5]', output: '[1, 5, 7, 8, 9, 10]' },
    ],
  },

  'heap-sort': {
    title: 'Heap Sort',
    category: 'Array → Sorting',
    overview: 'Heap Sort uses a binary heap data structure. It first builds a max heap from the input data, then repeatedly extracts the maximum element and places it at the end of the sorted portion.',
    steps: [
      'Build a max heap from the array.',
      'The root of the heap is the largest element.',
      'Swap it with the last element of the heap.',
      'Reduce heap size by one and heapify the root.',
      'Repeat until the heap is empty.',
    ],
    complexity: {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      space: 'O(1)',
    },
    code: {
      cpp: `void heapify(int arr[], int n, int i) {
    int largest = i, l = 2*i+1, r = 2*i+2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}
void heapSort(int arr[], int n) {
    for (int i = n/2-1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n-1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}`,
      python: `def heap_sort(arr):
    import heapq
    heapq.heapify(arr)
    return [heapq.heappop(arr) for _ in range(len(arr))]`,
      javascript: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n/2)-1; i >= 0; i--) heapify(arr, n, i);
  for (let i = n-1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}
function heapify(arr, n, i) {
  let largest = i, l = 2*i+1, r = 2*i+2;
  if (l < n && arr[l] > arr[largest]) largest = l;
  if (r < n && arr[r] > arr[largest]) largest = r;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    },
    examples: [
      { input: '[12, 11, 13, 5, 6, 7]', output: '[5, 6, 7, 11, 12, 13]' },
    ],
  },

  'bfs': {
    title: 'Breadth-First Search',
    category: 'Graph',
    overview: 'BFS explores a graph level by level using a queue. It visits all nodes at the present depth before moving to the next depth level.',
    steps: [
      'Start from the source vertex and enqueue it.',
      'Mark the source as visited.',
      'While the queue is not empty, dequeue a vertex.',
      'Visit all adjacent unvisited vertices and enqueue them.',
      'Mark each visited vertex.',
    ],
    complexity: {
      time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
      space: 'O(V)',
    },
    code: {
      cpp: `void bfs(vector<vector<int>>& adj, int s) {
    queue<int> q;
    vector<bool> visited(adj.size(), false);
    visited[s] = true;
    q.push(s);
    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
      python: `from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    result = []
    while queue:
        node = queue.popleft()
        result.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return result`,
      javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  while (queue.length) {
    const node = queue.shift();
    result.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}`,
    },
    examples: [
      { input: 'Graph: {0:[1,2], 1:[3], 2:[4], 3:[], 4:[]}, start=0', output: '[0, 1, 2, 3, 4]' },
    ],
  },

  'dfs': {
    title: 'Depth-First Search',
    category: 'Graph',
    overview: 'DFS explores a graph by going as deep as possible along each branch before backtracking. It uses a stack (or recursion).',
    steps: [
      'Start from the source vertex.',
      'Mark it as visited.',
      'Recursively visit all adjacent unvisited vertices.',
      'Backtrack when no unvisited adjacent vertices remain.',
    ],
    complexity: {
      time: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)' },
      space: 'O(V)',
    },
    code: {
      cpp: `void dfs(vector<vector<int>>& adj, int node, vector<bool>& visited) {
    visited[node] = true;
    cout << node << " ";
    for (int neighbor : adj[node])
        if (!visited[neighbor])
            dfs(adj, neighbor, visited);
}`,
      python: `def dfs(graph, node, visited=None):
    if visited is None:
        visited = set()
    visited.add(node)
    result = [node]
    for neighbor in graph[node]:
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    return result`,
      javascript: `function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  const result = [node];
  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }
  return result;
}`,
    },
    examples: [
      { input: 'Graph: {0:[1,2], 1:[3], 2:[4], 3:[], 4:[]}, start=0', output: '[0, 1, 3, 2, 4]' },
    ],
  },
  'singly-linked-list': {
    title: 'Singly Linked List',
    category: 'Linked List',
    overview: 'A singly linked list is a linear data structure consisting of nodes, where each node contains data and a pointer to the next node in the sequence.',
    steps: [
      'Traversal: Start at the head and follow the NEXT pointers until null.',
      'Insertion: Create a new node and update the surrounding NEXT pointers to link it into the list.',
      'Deletion: Unlink a target node by pointing the previous node to the deleted node\'s NEXT target.'
    ],
    complexity: {
      time: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
      space: 'O(1)'
    },
    code: {
      cpp: '// Linked list node struct implementation coming soon',
      python: '# Python LL implementation coming soon',
      javascript: '// JS LL implementation coming soon'
    },
    examples: [
      { input: 'Insert 25 at pos 2', output: 'A -> B -> 25 -> C' }
    ]
  }
};

export default algorithms;
