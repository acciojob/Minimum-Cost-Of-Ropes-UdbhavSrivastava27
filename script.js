
  //your code here
  document.getElementById("inputForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const ropeLengthsInput = document.getElementById("ropeLengths").value;
  const ropeLengths = ropeLengthsInput.split(",").map(Number);

  const minimumCost = calculateMinimumCost(ropeLengths);

  document.getElementById("result").textContent = `Minimum cost: ${minimumCost}`;
});

function calculateMinimumCost(ropeLengths) {
  // Create a priority queue (min heap) to store the rope lengths
  const priorityQueue = new PriorityQueue(ropeLengths);

  let totalCost = 0;

  while (priorityQueue.size() > 1) {
    // Remove the two ropes with the smallest lengths from the priority queue
    const rope1 = priorityQueue.remove();
    const rope2 = priorityQueue.remove();

    const cost = rope1 + rope2;

    // Add the cost of connecting the two ropes to the total cost
    totalCost += cost;

    // Add the combined rope length back to the priority queue
    priorityQueue.insert(cost);
  }

  return totalCost;
}

// Priority queue implementation using a binary heap
class PriorityQueue {
  constructor(arr = []) {
    this.heap = [];
    this.size = 0;

    // Build the priority queue from the given array
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  insert(value) {
    this.heap.push(value);
    this.size++;
    this.bubbleUp(this.size - 1);
  }

  remove() {
    if (this.size === 0) {
      return null;
    }

    this.swap(0, this.size - 1);
    const root = this.heap.pop();
    this.size--;
    this.bubbleDown(0);
    return root;
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (leftChildIndex < this.size && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }

    if (rightChildIndex < this.size && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      this.swap(index, smallestIndex);
      this.bubbleDown(smallestIndex);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

