import mongoose from "mongoose";
import express from "express";
import CodeBlood from "../models/codeblood.js";
import Question from "../models/question.js";

const router = express.Router();

const dsaTopics = [
    'Array', 'Graph', 'Stack', 'Queue', 'String', 'Matrix', 'Design', 'Sorting', 'Bitmask', 'Divisors',
    'Geometry', 'Database', 'Recursion', 'Simulation', 'Union Find', 'Hash Table', 'Merge Sort', 'Radix Sort',
    'Line Sweep', 'Binary Tree', 'Heap (Priority Queue)', 'Segment Tree', 'Suffix Array', 'Binary Search Tree',
    'Doubly-Linked List', 'Binary Indexed Tree', 'Breadth-First Search', 'Depth-First Search', 'Minimum Spanning Tree',
    'Biconnected Component', 'Binary Search', 'Memoization', 'Backtracking', 'Rolling Hash', 'Suffix Sum',
    'String Matching', 'Monotonic Stack', 'Monotonic Queue', 'Topological Sort', 'Eulerian Circuit', 'Tree Construction',
    'Binary Search Tree', 'Divide and Conquer', 'Dynamic Programming', 'Dis-Joint Set Union', 'Binary Indexed Tree',
    'Breadth-First Search', 'Heap (Priority Queue)', 'Segment Tree', 'Counting Sort', 'Shortest Path', 'Sliding Window',
    'Bit Manipulation', 'Number Theory', 'Modular Arithmetic', 'Interactive', 'Reservoir Sampling', 'Rejection Sampling',
    'Minimum Cut'
];

const cpTopics = [
    'Math', 'Tree', 'Trie', 'Sets', 'Greedy', 'Cycles', 'Subset', 'Ranking', 'Prefix Sum', 'Probability',
    'Linked List', 'Brainteaser', 'Permutations', 'Optimisation', 'Two Pointers', 'Rolling Hash', 'Segment Tree',
    'Combinatorics', 'Quickselect', 'Ordered Set', 'Concurrency', 'Game Theory', 'Randomized', 'Factorials',
    'Algorithms', 'Counting', 'Iterator', 'Searching', 'Factorials', 'Pattern Generation', 'Tree Construction',
    'Probability and Statistics', 'Strongly Connected Component', 'Interactive', 'Enumeration', 'Brainteaser',
    'Graph Theory', 'Topological Sort', 'Game Theory', 'Probabilities'
];

router.get("/dsa", async (req, res) => {
    try {
        const dsa = await CodeBlood.find({ topic: { $in : dsaTopics } }).exec();
        return res.status(200).json(dsa);
    } catch (err) {
        res.status(500).json({ message: "Server Error"  });
    }
});

router.get("/cp", async (req, res) => {
    try {
        const cp = await CodeBlood.find({ topic: { $in: cpTopics } }).exec();
        return res.status(200).json(cp);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/find/:topic", async (req, res) => {
    console.log("Finding all topics", req.params);
    try {
        const topic = req.params.topic;
        const questions = await CodeBlood.findOne({ topic: topic }).exec();
        return res.status(200).json(questions);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;