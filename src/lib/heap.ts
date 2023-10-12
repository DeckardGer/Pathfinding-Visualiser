import { Node as AStarNode } from "./algorithm_classes/a-star-node";

export class MinHeap<Node extends AStarNode> {
  public items: Node[];
  public currentItemCount: number;

  constructor() {
    this.items = [];
    this.currentItemCount = 0;
  }

  add(item: Node) {
    item.heapIndex = this.currentItemCount;
    this.items[this.currentItemCount] = item;
    this.sortUp(item);
    this.currentItemCount++;
  }

  removeFirst() {
    const firstItem = this.items[0];
    this.currentItemCount--;
    const lastItem = this.items.pop()!;
    this.items[0] = lastItem;
    this.items[0].heapIndex = 0;
    this.sortDown(this.items[0]);
    return firstItem;
  }

  updateItem(item: Node) {
    this.sortUp(item);
  }

  count() {
    return this.currentItemCount;
  }

  contains(item: Node) {
    if (item.heapIndex === undefined) return false;
    return this.items[item.heapIndex] === item;
  }

  get(heapIndex: number) {
    return this.items[heapIndex];
  }

  sortDown(item: Node) {
    if (item.heapIndex === undefined) return;
    while (true) {
      const childIndexLeft = item.heapIndex * 2 + 1;
      const childIndexRight = item.heapIndex * 2 + 2;
      let swapIndex = 0;

      if (childIndexLeft < this.currentItemCount) {
        swapIndex = childIndexLeft;

        if (childIndexRight < this.currentItemCount) {
          if (
            this.items[childIndexLeft].compare(this.items[childIndexRight]) < 0
          ) {
            swapIndex = childIndexRight;
          }
        }

        if (item.compare(this.items[swapIndex]) < 0) {
          this.swap(item, this.items[swapIndex]);
        } else {
          return;
        }
      } else {
        return;
      }
    }
  }

  sortUp(item: Node) {
    if (item.heapIndex === undefined) return;
    let parentIndex = Math.trunc((item.heapIndex - 1) / 2);

    while (true) {
      const parentItem = this.items[parentIndex];

      if (item.compare(parentItem) > 0) {
        this.swap(item, parentItem);
      } else {
        break;
      }

      parentIndex = Math.trunc((item.heapIndex - 1) / 2);
    }
  }

  swap(itemA: Node, itemB: Node) {
    if (itemA.heapIndex === undefined || itemB.heapIndex === undefined) return;
    this.items[itemA.heapIndex] = itemB;
    this.items[itemB.heapIndex] = itemA;
    const itemAIndex = itemA.heapIndex;
    itemA.heapIndex = itemB.heapIndex;
    itemB.heapIndex = itemAIndex;
  }
}
