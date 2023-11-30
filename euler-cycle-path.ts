import { AdjList } from "./types";

const countInOutDegrees = (graph: AdjList): [Uint16Array, Uint16Array] => {
  const inwards: Uint16Array = new Uint16Array(graph.length);
  const outwards: Uint16Array = new Uint16Array(graph.length);

  for (let vertex = 0; vertex < graph.length; vertex++) {
    const adjacentVertices = graph[vertex];

    outwards[vertex] = adjacentVertices.length;

    for (let adjacentVertice of adjacentVertices) {
      inwards[adjacentVertice] = inwards[adjacentVertice]
        ? inwards[adjacentVertice] + 1
        : 1;
    }
  }

  return [inwards, outwards];
};

const hasEulerianPath(inwards: Uint16Array, outwards: Uint16Array): boolean {
  for (let i = 0; i < graph.length; i++)
}

const findEulerPath = (graph: AdjList): any => {
  if (graph == null || graph?.length === 0) {
    return null;
  }

  const [inwards, outwards] = countInOutDegrees(graph);

};

console.log(findEulerPath([]));
console.log(findEulerPath([[], []]));
console.log(findEulerPath(null));
console.log(findEulerPath(graph1));
console.log(findEulerPath(graph2));
console.log(findEulerPath(graph3));
console.log(findEulerPath(graph4));
console.log(findEulerPath(graph5));
console.log(findEulerPath(graph6));