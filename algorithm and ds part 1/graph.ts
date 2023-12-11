interface WeightedGraph<T> {
    addVertex(key: Vertex): void;
    addEdge(vertex1: T, vertex2: T, weight: number): void;
    findAllShortestPaths(vertex: T);
    findShortestPath(vertex1: T, vertex2: T);
}

class Graph implements WeightedGraph<Vertex> {
    adjacencyList: Map<Vertex, Map<Vertex, number>>;
    constructor() {
        this.adjacencyList = new Map();
    }
    addVertex(vertex: Vertex): void {
        this.adjacencyList.set(vertex, new Map());
    }
    addEdge(vertex1: Vertex, vertex2: Vertex, weight: number): void {
        const map1 = this.adjacencyList.get(vertex1);
        const map2 = this.adjacencyList.get(vertex2);
        if (map1 && map2) {
            map1.set(vertex2, weight)
            map2.set(vertex1, weight)
            this.adjacencyList.set(vertex1, map1);
            this.adjacencyList.set(vertex2, map2);
        }
    }
    findShortestPath(vertex1: Vertex, vertex2: Vertex) {
        try {
            const distance = {};
            const previousV = {};
            const queue = [];
            if (!(this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2))) {
                throw new Error("Vertex does not exists.");
            }
            this.adjacencyList.forEach((_, vertex) => {
                distance[vertex.key] = vertex.key === vertex1.key ? 0 : Infinity;
                previousV[vertex.key] = null;
                queue.push(vertex);
            });
            while (queue.length) {
                queue.sort((a, b) => distance[a.key] - distance[b.key]);
                const current = queue.shift();
                if (!current) break;

                if (current.key === vertex2.key) {
                    const path = [];
                    let currentNode = vertex2.key;
                    while (previousV[currentNode]) {
                        path.unshift(currentNode);
                        currentNode = previousV[currentNode];
                    }
                    if (distance[vertex2.key] != Infinity)
                        path.unshift(vertex1.key);
                    return { path, distance: distance[vertex2.key] };
                }
                this.adjacencyList.get(current)?.forEach((neighbor, neighbor_key) => {
                    const distance1 = parseInt(distance[current.key]) + neighbor;
                    if (distance1 < distance[neighbor_key.key]) {
                        distance[neighbor_key.key] = distance1;
                        previousV[neighbor_key.key] = current.key;
                    }
                });
            }
            return { path: [], distance: distance[vertex2.key] };

        } catch (err) {
            console.error(err)
        }


    }

    findAllShortestPaths(vertex: Vertex) {
        const startVertex = this.adjacencyList.get(vertex);

        if (!startVertex) {
            throw new Error('Vertex not found.');
        }
        const paths = {};

        this.adjacencyList.forEach((_, vertex1) => {
            const shortestPath = this.findShortestPath(vertex, vertex1);
            paths[vertex1.key.toString()] = shortestPath;
        });
        console.log("All paths: ", paths)
        return paths;
    }
}

interface Path {
    path: string[];
    distance: number;
}

interface Dijkstra<T> {
    findShortestPath(vertex1: T, vertex2: T);
    findAllShortestPaths(vertex: T);
}

class DijkstraImplementation<T> implements Dijkstra<T> {
    private graph: WeightedGraph<T>;

    constructor(graph: WeightedGraph<T>) {
        this.graph = graph;
    }
    findShortestPath(vertex1: T, vertex2: T) {
        return this.graph.findShortestPath(vertex1, vertex2);
    }

    findAllShortestPaths(vertex: T) {
        this.graph.findAllShortestPaths(vertex);
    }
}

class Vertex {
    key: string;
    constructor(key: string) {
        this.key = key;
    }
}
class Edge {
    from: Vertex;
    to: Vertex;
    weight: number;
    constructor(from: Vertex, to: Vertex, weight: number) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}
const vertices = [
    new Vertex('1'),
    new Vertex('2'),
    new Vertex('3'),
    new Vertex('4'),
    new Vertex('5')
];
const edges = [
    new Edge(vertices[0], vertices[3], 3),
    new Edge(vertices[0], vertices[1], 5),
    new Edge(vertices[0], vertices[2], 4),
    new Edge(vertices[1], vertices[3], 6),
    new Edge(vertices[1], vertices[2], 5),
];
const graph: WeightedGraph<Vertex> = new Graph();

vertices.forEach(verticle => graph.addVertex(verticle));
edges.forEach(edge => graph.addEdge(edge.from, edge.to, edge.weight));

console.log(graph)


const dijkstra: Dijkstra<Vertex> = new DijkstraImplementation(graph);

const res = dijkstra.findShortestPath(vertices[3], vertices[2]); // { path: ['4', '1', '3'], distance: 7 }
console.log("Path and distance from vertex 4 to vertex 3: ", res)
const res2 = dijkstra.findShortestPath(vertices[0], vertices[4]); // { path: [], distance: Infinity }
console.log("Path and distance from vertex 1 to vertex 5:  ", res2)
const res3 = dijkstra.findShortestPath(vertices[0], vertices[0]); // { path: ['1'], distance: 0 }
console.log("Path and distance from vertex 1 to vertex 1: ", res3)

dijkstra.findAllShortestPaths(vertices[3]);
