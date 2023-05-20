function calculateMinCost(event) {
  event.preventDefault();

  // Get the input value of rope lengths and convert it into an array
  const ropeLengthsInput = document.getElementById('ropeLengths');
  const ropeLengths = ropeLengthsInput.value.split(',').map(Number);

  // Call the function to calculate the minimum cost
  const minCost = findMinimumCost(ropeLengths);

  // Display the minimum cost in the result div
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = `Minimum Cost: ${minCost}`;
}

function findMinimumCost(ropeLengths) {
  // Edge case: If there are no ropes or only one rope, return 0 as there are no costs involved
  if (ropeLengths.length < 2) {
    return 0;
  }

  let minCost = 0;
  let heap = new MinHeap();

  // Insert all rope lengths into the min heap
  for (let i = 0; i < ropeLengths.length; i++) {
    heap.insert(ropeLengths[i]);
  }

  // Merge ropes until there is only one rope left
  while (heap.size() > 1) {
    const rope1 = heap.extractMin();
    const rope2 = heap.extractMin();
    const mergedRope = rope1 + rope2;
    minCost += mergedRope;
    heap.insert(mergedRope);
  }

  return minCost;
}

// MinHeap class implementation for extracting minimum element efficiently
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    const min = this.heap[0];
    const lastElement = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastElement;
      this.sinkDown(0);
    }

    return min;
  }

  size() {
    return this.heap.length;
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element >= parent) {
        break;
      }

      this.heap[parentIndex] = element;
      this.heap[index] = parent;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild < element) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild
