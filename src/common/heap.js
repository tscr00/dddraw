export default class BinaryHeap {
  constructor(compare) {
    this.compare = compare;
    this.elements = [];
  }

  pop = () => {
    if (this.empty()) {
      throw Error("popping on empty heap");
    }

    const first = this.elements[0];
    const last = this.elements.pop();

    if (!this.empty()) {
      this.elements[0] = last;
      this.moveDown(0);
    }

    return first;
  };

  push = x => {
    this.elements.push(x);
    this.moveUp(this.size() - 1);
  };

  empty = () => this.size() === 0;

  size = () => {
    return this.elements.length;
  };

  moveDown = i => {
    const end = this.size();

    while (true) {
      let largestElement = i;
      let leftChild = i * 2 + 1;
      let rightChild = i * 2 + 2;

      if (leftChild < end) {
        if (this.compare(this.elements[leftChild], this.elements[i])) {
          largestElement = leftChild;
        }
      }

      if (rightChild < end) {
        if (
          this.compare(this.elements[rightChild], this.elements[largestElement])
        ) {
          largestElement = rightChild;
        }
      }

      if (largestElement === i) {
        break;
      }

      const temp = this.elements[largestElement];
      this.elements[largestElement] = this.elements[i];
      this.elements[i] = temp;

      i = largestElement;
    }
  };

  moveUp = i => {
    while (i > 0) {
      const parentIndex = Math.floor((i - 1) / 2);
      const parent = this.elements[parentIndex];

      if (this.compare(this.elements[i], parent)) {
        const temp = this.elements[i];
        this.elements[i] = parent;
        this.elements[parentIndex] = temp;
        i = parentIndex;
        continue;
      }

      break;
    }
  };
}
