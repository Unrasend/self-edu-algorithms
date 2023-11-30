import { AdjList } from "./types.ts";
import { BidirectionalGraph, DAG_Small, DisconnectedGraph, EmptyGraph, EulerianCycleGraph, EulerianPathAndCycleGraph, EulerianPathGraph, LinearGraph, MixedCycleGraph, ReverseDAG } from "./graphs.ts";

const countInOutDegrees = (graph: AdjList): [number[], number[]] => {
  const inwards: number[] = new Array(graph.length);
  const outwards: number[] = new Array(graph.length);

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

const hasEulerianPath = (inwards: number[], outwards: number[]): boolean => {
  let start_nodes = 0;
  let end_nodes = 0;

  for (let i = 0; i < inwards.length; i++) {
    if (outwards[i] - inwards[i] > 1 || inwards[i] - outwards[i] > 1) {
      return false;
    }

    if (outwards[i] - inwards[i] === 1) {
      start_nodes++;
    }

    if (inwards[i] - outwards[i] === 1) {
      end_nodes++;
    }
  }

  return end_nodes === 0 && start_nodes === 0 || end_nodes === 1 && start_nodes === 1;
};

const findStartNode = (inwards: number[], outwards: number[]): number => {
  let start = 0;

  for (let i = 0; i < inwards.length; i++) {
    if (outwards[i] - inwards[i] == 1) {
      return i;
    }

    if (outwards[i] > 0) {
      start = i;
    }
  }

  return start;
}

const dfs = (graph: readonly number[][], node: number, outwards: number[], path: number[] = []): number[] => {
  while (outwards[node] > 0) {
    const nextNode = graph[node][--outwards[node]];

    dfs(graph, nextNode, outwards, path);
  }

  path.unshift(node);

  return path;
};

const findEulerPath = (graph: AdjList): number[] | null => {
  if (graph == null || graph?.length === 0) {
    return null;
  }

  const [inwards, outwards] = countInOutDegrees(graph);

  if (!hasEulerianPath(inwards, outwards)) {
    return null;
  }

  return dfs(graph, findStartNode(inwards, outwards), outwards);
};

console.log(findEulerPath(EmptyGraph));
console.log(findEulerPath(DisconnectedGraph));
console.log(findEulerPath(DAG_Small));
console.log(findEulerPath(MixedCycleGraph));
console.log(findEulerPath(BidirectionalGraph));
console.log(findEulerPath(ReverseDAG));
console.log(findEulerPath(LinearGraph));
console.log(findEulerPath(EulerianPathGraph));
console.log(findEulerPath(EulerianCycleGraph));
console.log(findEulerPath(EulerianPathAndCycleGraph));
