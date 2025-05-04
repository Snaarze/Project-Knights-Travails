export class Node {
  constructor(vertex) {
    this.vertex = vertex;
    this.edges = [];
    this.parent = "";
  }

  getVertex() {
    return this.vertex;
  }
}
