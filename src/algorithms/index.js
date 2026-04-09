import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateInsertionSortSteps } from './insertionSort';
import { generateQuickSortSteps } from './quickSort';
import { generateMergeSortSteps } from './mergeSort';
import { generateHeapSortSteps } from './heapSort';
import { generateCountingSortSteps } from './countingSort';
import { generateRadixSortSteps } from './radixSort';
import { generateStackSteps } from './stack';
import { generateQueueSteps } from './queue';
import { generateLinearSearchSteps } from './linearSearch';
import { generateBinarySearchSteps } from './binarySearch';
import { generateLinkedListSteps } from './linkedList';

export const algorithmRegistry = {
  'bubble-sort': {
    name: 'Bubble Sort',
    generator: generateBubbleSortSteps,
    type: 'sorting',
  },
  'selection-sort': {
    name: 'Selection Sort',
    generator: generateSelectionSortSteps,
    type: 'sorting',
  },
  'insertion-sort': {
    name: 'Insertion Sort',
    generator: generateInsertionSortSteps,
    type: 'sorting',
  },
  'quick-sort': {
    name: 'Quick Sort',
    generator: generateQuickSortSteps,
    type: 'sorting',
  },
  'merge-sort': {
    name: 'Merge Sort',
    generator: generateMergeSortSteps,
    type: 'sorting',
  },
  'heap-sort': {
    name: 'Heap Sort',
    generator: generateHeapSortSteps,
    type: 'sorting',
  },
  'counting-sort': {
    name: 'Counting Sort',
    generator: generateCountingSortSteps,
    type: 'sorting',
  },
  'radix-sort': {
    name: 'Radix Sort',
    generator: generateRadixSortSteps,
    type: 'sorting',
  },
  'linear-search': {
    name: 'Linear Search',
    generator: generateLinearSearchSteps,
    type: 'searching',
  },
  'binary-search': {
    name: 'Binary Search',
    generator: generateBinarySearchSteps,
    type: 'searching',
  },
  'singly-linked-list': {
    name: 'Singly Linked List',
    generator: generateLinkedListSteps,
    type: 'linked_list',
  },
  'doubly-linked-list': {
    name: 'Doubly Linked List',
    generator: generateLinkedListSteps,
    type: 'linked_list',
  },
  'circular-linked-list': {
    name: 'Circular Linked List',
    generator: generateLinkedListSteps,
    type: 'linked_list',
  },
  'stack': {
    name: 'Stack',
    generator: generateStackSteps,
    type: 'stack',
  },
  'queue': {
    name: 'Queue',
    generator: generateQueueSteps,
    type: 'queue',
  },
};
