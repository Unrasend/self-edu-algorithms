import { AdjList } from "./types.ts";

export const EmptyGraph: AdjList = [];
export const DisconnectedGraph: AdjList = [[], []];
export const DAG_Small: AdjList = [[1, 2], [3], [3], []];
export const MixedCycleGraph: AdjList = [[], [3, 5], [1, 3], [4, 5], [6], [4], [2]];
export const BidirectionalGraph: AdjList = [[4, 3, 1], [3, 2, 4], [3], [4], []];
export const ReverseDAG: AdjList = [[2, 3], [3, 5], [4, 6], [2], [4], [1]];
export const SmallCycleGraph: AdjList = [[2, 3], [1, 4], [1], [2]];
export const LinearGraph: AdjList = [[2], [1, 3], [2], []];
export const EulerianPathGraph: AdjList = [[2, 1], [5, 4], [4, 3], [1, 0], [5, 3], [3, 2]];
export const EulerianCycleGraph: AdjList = [[1, 7], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [0, 6, 8], [7]];
