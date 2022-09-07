/**
 * 双向链表
 */
export default class DoublyLinkedList<V = any> {
  value: V
  prev: DoublyLinkedList<V> | null
  private next: DoublyLinkedList<V>[]

  constructor(value: V, prev: DoublyLinkedList<V> | null = null, next: DoublyLinkedList<V>[] = []) {
    this.value = value
    this.prev = prev
    this.next = next
  }

  append(node: DoublyLinkedList<V>) {
    this.next.push(node)
  }

  prepend(node: DoublyLinkedList<V> | null) {
    this.prev = node
  }

  resolvePath() {
    const path = [this.value]
    let current = this.prev
    while (current !== null) {
      path.push(current.value)
      current = current.prev
    }
    return path.reverse().slice(1)
  }
}
