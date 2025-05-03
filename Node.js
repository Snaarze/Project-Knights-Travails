export class Node {
  constructor(vertex) {
    this.vertex = vertex;
    this.edges = [];
  }

  getVertex() {
    return this.vertex;
  }
}
