import { AdjList } from "./types.ts";

import { BidirectionalGraph, DAG_Small, EulerianCycleGraph, EulerianPathGraph, LinearGraph, MixedCycleGraph, ReverseDAG } from "./graphs.ts";

const countInOutDegrees = (graph: AdjList): [number[], number[], number] => {
  const indeg: number[] = new Array(graph.length);
  const outdeg: number[] = new Array(graph.length);
  let numberOfEdges: number = 0;
  indeg.fill(0);
  outdeg.fill(0);

  for (let vertex = 0; vertex < graph.length; vertex++) {
    const adjacentVertices = graph[vertex];

    outdeg[vertex] = adjacentVertices.length;
    numberOfEdges += adjacentVertices.length;

    for (let adjacentVertice of adjacentVertices) {
      indeg[adjacentVertice] = indeg[adjacentVertice]
        ? indeg[adjacentVertice] + 1
        : 1;
    }
  }

  return [indeg, outdeg, numberOfEdges];
};

const findEulerianPathStartNode = (indeg: number[], outdeg: number[]): number | null => {
  const start: number[] = [];
  const end: number[] = [];

  for (let i = 0; i < indeg.length; i++) {
    if (indeg[i] === outdeg[i] - 1) {
      start.push(i);
      continue;
    }
    if (indeg[i] === outdeg[i] + 1) {
      end.push(i);
      continue;
    }
    if (indeg[i] === outdeg[i]) {
      continue;
    }

    return null;
  }

  if (start.length === 1 && end.length === 1) {
    return start[0];
  }
  if (start.length === 0 && end.length === 0) {
    return 0;
  }
  return null;
}

const findEulerianPaths = (
  graph: AdjList,
  outdeg: number[],
  at: number,
  numberOfEdges: number,
  path: number[] = [],
  paths: number[][] = [],
  blocked: Set<string> = new Set()
): number[][] => {

  path.push(at);

  if (path.length === numberOfEdges + 1) {
    paths.push([...path]);
    return paths;
  }

  for (let index = outdeg[at] - 1; index >= 0; index--) {
    const node = graph[at][index];

    if (blocked.has(at.toString() + node.toString())) {
      continue;
    }

    blocked.add(at.toString() + node.toString());
    findEulerianPaths(graph, outdeg, node, numberOfEdges, path, paths, blocked);
    path.pop();
    blocked.delete(at.toString() + node.toString());
  }

  return paths;
};

const findEulerPath = (graph: AdjList): number[][] | null => {
  if (graph == null || graph?.length === 0) {
    return null;
  }

  const [indeg, outdeg, numberOfEdges] = countInOutDegrees(graph);

  const startVertex = findEulerianPathStartNode(indeg, outdeg);

  if (startVertex == null) {
    return null;
  }

  return findEulerianPaths(graph, outdeg, startVertex, numberOfEdges);
};

console.log(findEulerPath(DAG_Small));
console.log(findEulerPath(MixedCycleGraph));
console.log(findEulerPath(BidirectionalGraph));
console.log(findEulerPath(ReverseDAG));
console.log(findEulerPath(LinearGraph));
console.log(findEulerPath(EulerianPathGraph)?.map(path => path.map(v => v + 1)));
console.log(findEulerPath(EulerianCycleGraph));
