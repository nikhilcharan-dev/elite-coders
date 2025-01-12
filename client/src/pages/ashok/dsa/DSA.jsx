import React from 'react';
import './DSA.css';

const DSA = () => {
    const topics = [
        {
            title: 'Arrays',
            questions: [
                { name: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/' },
                { name: 'Maximum Subarray', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/maximum-subarray/' },
                { name: 'Trapping Rain Water', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/trapping-rain-water/' },
                { name: 'Rotate Array', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://practice.geeksforgeeks.org/problems/rotate-array' },
                { name: 'Find Missing Number', difficulty: 'Easy', platform: 'CodeChef', link: 'https://www.codechef.com/problems/MISNUM' },
            ],
            pdfLink: '/pdf/arrays.pdf',
        },
        {
            title: 'Strings',
            questions: [
                { name: 'Reverse String', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-string/' },
                { name: 'Longest Palindromic Substring', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-palindromic-substring/' },
                { name: 'String Compression', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/string-compression/' },
            ],
            pdfLink: '/pdf/strings.pdf',
        },
        {
            title: 'Hash Table',
            questions: [
                { name: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/two-sum/' },
                { name: 'Group Anagrams', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/group-anagrams/' },
                { name: 'Top K Frequent Elements', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/top-k-frequent-elements/' },
                { name: 'Subarray Sum Equals K', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
            ],
            pdfLink: '/pdf/hash-table.pdf',
        },
        {
            title: 'Set',
            questions: [
                { name: 'Longest Consecutive Sequence', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
                { name: 'Intersection of Two Arrays', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-arrays/' },
                { name: 'Happy Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/happy-number/' },
                { name: 'Unique Email Addresses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/unique-email-addresses/' },
                { name: 'Valid Sudoku', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-sudoku/' },
                { name: 'Longest Consecutive Sequence', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
                { name: 'Intersection of Two Arrays', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/intersection-of-two-arrays/' },
                { name: 'Happy Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/happy-number/' },
                { name: 'Unique Email Addresses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/unique-email-addresses/' },
                { name: 'Valid Sudoku', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-sudoku/' },
            ],
            pdfLink: '/pdf/set.pdf',
        },
        {
            title: 'Stack',
            questions: [
                { name: 'Valid Parentheses', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/valid-parentheses/' },
                { name: 'Min Stack', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/min-stack/' },
                { name: 'Largest Rectangle in Histogram', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
            ],
            pdfLink: '/pdf/stack.pdf',
        },
        {
            title: 'Queue',
            questions: [
                { name: 'Implement Queue using Stacks', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
                { name: 'Circular Queue', difficulty: 'Medium', platform: 'GeeksForGeeks', link: 'https://practice.geeksforgeeks.org/problems/circular-queue/' },
                { name: 'Sliding Window Maximum', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/sliding-window-maximum/' },
                { name: 'Design a Queue', difficulty: 'Medium', platform: 'Codeforces', link: 'https://codeforces.com/problemset/problem/1537/C' },
            ],
            pdfLink: '/pdf/queue.pdf',
        },
        {
            title: 'Linked List',
            questions: [
                { name: 'Reverse Linked List', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/reverse-linked-list/' },
                { name: 'Merge Two Sorted Lists', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
                { name: 'Linked List Cycle', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/linked-list-cycle/' },
                { name: 'Remove Nth Node From End of List', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
                { name: 'Copy List with Random Pointer', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/copy-list-with-random-pointer/' },
            ],
            pdfLink: '/pdf/linked-list.pdf',
        },
        {
            title: 'Graphs',
            questions: [
                { name: 'Clone Graph', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/clone-graph/' },
                { name: 'Number of Islands', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/number-of-islands/' },
                { name: 'Word Ladder', difficulty: 'Hard', platform: 'LeetCode', link: 'https://leetcode.com/problems/word-ladder/' },
            ],
            pdfLink: '/pdf/graphs.pdf',
        },
        {
            title: 'Dynamic Programming',
            questions: [
                { name: 'Fibonacci Number', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/fibonacci-number/' },
                { name: 'Climbing Stairs', difficulty: 'Easy', platform: 'LeetCode', link: 'https://leetcode.com/problems/climbing-stairs/' },
                { name: 'Longest Increasing Subsequence', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
                { name: 'Coin Change', difficulty: 'Medium', platform: 'LeetCode', link: 'https://leetcode.com/problems/coin-change/' },
            ],
            pdfLink: '/pdf/dynamic-programming.pdf',
        },
    ];


    return (
        <div className="dsa-section">
            {topics.map((topic, index) => (
                <div key={index} className="topic-card">
                    <div className="topic-header">
                        <h3>{topic.title}</h3>
                        <a href={topic.pdfLink} target="_blank" rel="noopener noreferrer" className="pdf-link">
                            View PDF
                        </a>
                    </div>
                    <div className="questions-container">
                        {topic.questions.map((question, idx) => (
                            <div key={idx} className="question-card">
                                <h4 className="question-name">{question.name}</h4>
                                <p className="question-details">
                                    <span className={`difficulty ${question.difficulty.toLowerCase()}`}>
                                        {question.difficulty}
                                    </span>
                                    <span className="platform">{question.platform}</span>
                                </p>
                                <a href={question.link} target="_blank" rel="noopener noreferrer" className="solve-btn">
                                    Solve
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DSA;
