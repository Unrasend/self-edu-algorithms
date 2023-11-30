import { AdjList } from "./types.ts";
import { BidirectionalGraph, DAG_Small, DisconnectedGraph, EmptyGraph, EulerianCycleGraph, EulerianPathAndCycleGraph, EulerianPathGraph, LinearGraph, MixedCycleGraph, ReverseDAG } from "./graphs.ts";

export type Pathes = {
  pathes: number[][],
  length: number,
};

const updateMaxPath = (path: number[], maxPath: Pathes): void => {
  if (path.length > maxPath.length) {
    maxPath.pathes = [[...path]];
    maxPath.length = path.length;
  } else if (path.length === maxPath.length) {
    maxPath.pathes.push([...path]);
  }
}

const findLongestPath = (
  graph: AdjList,
  currentVertice: number = 0,
  path: number[] = [],
  maxPathes: Pathes = { pathes: [], length: 0 }
): Pathes => {
  if (graph == null || graph?.length === 0) {
    return maxPathes;
  }

  if (path[0] === currentVertice) {
    path.push(currentVertice);
    updateMaxPath(path, maxPathes);

    return maxPathes;
  }

  path.push(currentVertice);
  updateMaxPath(path, maxPathes);

  if (graph[currentVertice] == null || graph[currentVertice].length === 0) {
    return maxPathes;
  }

  for (let i = 0; i < graph[currentVertice].length; i++) {
    if (graph[currentVertice][i] > 0) {
      const adjacentVertice = graph[currentVertice][i];

      graph[currentVertice][i] = -graph[currentVertice][i]; // block the path

      findLongestPath(graph, adjacentVertice, path, maxPathes);

      path.pop(); // we are going back here, so clear the path to the current length.
      graph[currentVertice][i] = -graph[currentVertice][i]; // unblock the path
    }
  }

  return maxPathes;
};

console.log(findLongestPath(EmptyGraph));
console.log(findLongestPath(DisconnectedGraph));
console.log(findLongestPath(DAG_Small));
console.log(findLongestPath(MixedCycleGraph, 1));
console.log(findLongestPath(BidirectionalGraph));
console.log(findLongestPath(ReverseDAG, 1));
console.log(findLongestPath(LinearGraph, 1));
console.log(findLongestPath(EulerianPathGraph));
console.log(findLongestPath(EulerianCycleGraph));
console.log(findLongestPath(EulerianPathAndCycleGraph));