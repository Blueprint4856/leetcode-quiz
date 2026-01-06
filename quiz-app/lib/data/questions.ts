import { Question } from '@/lib/types/quiz'

export const QUESTIONS: Question[] = [
  // Easy questions
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to the target. You may assume that each input has exactly one solution, and you may not use the same element twice.',
    difficulty: 'easy',
    correctPattern: 'arrays_and_hashing',
    hints: ['Think about using a hash map to store complements', 'Can you do it in one pass?']
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    description: 'Given a string containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.',
    difficulty: 'easy',
    correctPattern: 'stack',
    hints: ['Use a data structure that follows LIFO', 'Match each closing bracket with the most recent opening bracket']
  },
  {
    id: '3',
    title: 'Merge Two Sorted Lists',
    description: 'You are given the heads of two sorted linked lists. Merge the two lists into one sorted list by splicing together the nodes of the lists. Return the head of the merged linked list.',
    difficulty: 'easy',
    correctPattern: 'linked_list',
    hints: ['Use a dummy node to simplify edge cases', 'Compare nodes one by one']
  },
  {
    id: '4',
    title: 'Best Time to Buy and Sell Stock',
    description: 'You are given an array prices where prices[i] is the price of a stock on the ith day. You want to maximize profit by buying on one day and selling on a different later day. Return the maximum profit. If no profit can be achieved, return 0.',
    difficulty: 'easy',
    correctPattern: 'sliding_window',
    hints: ['Track the minimum price seen so far', 'Calculate profit at each day']
  },
  {
    id: '5',
    title: 'Valid Palindrome',
    description: 'Given a string s, return true if it is a palindrome, false otherwise. A palindrome is a string that reads the same forward and backward, considering only alphanumeric characters and ignoring cases.',
    difficulty: 'easy',
    correctPattern: 'two_pointers',
    hints: ['Use one pointer at start, one at end', 'Move pointers toward each other while comparing']
  },
  {
    id: '6',
    title: 'Invert Binary Tree',
    description: 'Given the root of a binary tree, invert the tree by swapping every left node with its right node, and return its root.',
    difficulty: 'easy',
    correctPattern: 'trees',
    hints: ['Recursion works well here', 'Swap left and right children at each node']
  },
  {
    id: '7',
    title: 'Binary Search',
    description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search for target in nums. If target exists, return its index. Otherwise, return -1.',
    difficulty: 'easy',
    correctPattern: 'binary_search',
    hints: ['Use divide and conquer', 'Compare with middle element and eliminate half']
  },
  {
    id: '8',
    title: 'Linked List Cycle',
    description: 'Given the head of a linked list, determine if the linked list has a cycle. A cycle exists if a node can be reached again by continuously following the next pointer.',
    difficulty: 'easy',
    correctPattern: 'linked_list',
    hints: ['Floyd\'s cycle detection algorithm', 'Use slow and fast pointers']
  },
  {
    id: '9',
    title: 'Maximum Depth of Binary Tree',
    description: 'Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
    difficulty: 'easy',
    correctPattern: 'trees',
    hints: ['Recursion: 1 + max(left depth, right depth)', 'Base case: null node has depth 0']
  },
  {
    id: '10',
    title: 'Contains Duplicate',
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    difficulty: 'easy',
    correctPattern: 'arrays_and_hashing',
    hints: ['Use a hash set to track seen numbers', 'Return true when you find a duplicate']
  },

  // Medium questions
  {
    id: '11',
    title: '3Sum',
    description: 'Given an integer array nums, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    difficulty: 'medium',
    correctPattern: 'two_pointers',
    hints: ['Sort the array first', 'Fix one element and use two pointers for the other two']
  },
  {
    id: '12',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    correctPattern: 'sliding_window',
    hints: ['Use a window that expands and contracts', 'Track character frequencies in the window']
  },
  {
    id: '13',
    title: 'Validate Binary Search Tree',
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree. A valid BST has all left descendants less than the node, and all right descendants greater than the node.',
    difficulty: 'medium',
    correctPattern: 'trees',
    hints: ['Track valid range for each node', 'Use in-order traversal']
  },
  {
    id: '14',
    title: 'Course Schedule',
    description: 'There are n courses labeled from 0 to n-1. Some courses have prerequisites. Given the total number of courses and a list of prerequisite pairs, determine if it is possible to finish all courses.',
    difficulty: 'medium',
    correctPattern: 'graphs',
    hints: ['Detect cycles in a directed graph', 'Use topological sort or DFS']
  },
  {
    id: '15',
    title: 'Combination Sum',
    description: 'Given an array of distinct integers candidates and a target integer, return all unique combinations where the chosen numbers sum to target. The same number may be chosen unlimited times.',
    difficulty: 'medium',
    correctPattern: 'backtracking',
    hints: ['Explore all possibilities recursively', 'Prune branches that exceed target']
  },
  {
    id: '16',
    title: 'Min Stack',
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time. Implement the MinStack class with these operations.',
    difficulty: 'medium',
    correctPattern: 'stack',
    hints: ['Use an auxiliary stack to track minimums', 'Update min stack alongside main stack']
  },
  {
    id: '17',
    title: 'Kth Largest Element in an Array',
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.',
    difficulty: 'medium',
    correctPattern: 'heap_priority_queue',
    hints: ['Use a min heap of size k', 'Heap operations are O(log k)']
  },
  {
    id: '18',
    title: 'House Robber',
    description: 'You are a robber planning to rob houses along a street. Each house has a certain amount of money. Adjacent houses have security systems connected, so you cannot rob two adjacent houses. Return the maximum amount you can rob.',
    difficulty: 'medium',
    correctPattern: 'dynamic_programming',
    hints: ['At each house, choose to rob it or skip it', 'Store optimal solution for each position']
  },
  {
    id: '19',
    title: 'Search in Rotated Sorted Array',
    description: 'Given a sorted array that has been rotated at some pivot, and a target value, search for the target. If found, return its index, otherwise return -1. You must write an algorithm with O(log n) runtime.',
    difficulty: 'medium',
    correctPattern: 'binary_search',
    hints: ['One half is always sorted', 'Determine which half is sorted and if target is in that range']
  },
  {
    id: '20',
    title: 'Jump Game',
    description: 'Given an array of non-negative integers where each element represents your maximum jump length at that position, determine if you can reach the last index starting from the first index.',
    difficulty: 'medium',
    correctPattern: 'greedy',
    hints: ['Track the farthest position you can reach', 'Update it as you iterate through the array']
  },

  // Hard questions
  {
    id: '21',
    title: 'Trapping Rain Water',
    description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
    difficulty: 'hard',
    correctPattern: 'two_pointers',
    hints: ['Water level is determined by the shorter boundary', 'Use two pointers from both ends']
  },
  {
    id: '22',
    title: 'Minimum Window Substring',
    description: 'Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return empty string.',
    difficulty: 'hard',
    correctPattern: 'sliding_window',
    hints: ['Expand window until valid, then contract', 'Track character frequencies']
  },
  {
    id: '23',
    title: 'Binary Tree Maximum Path Sum',
    description: 'Given the root of a binary tree, return the maximum path sum of any non-empty path. A path is a sequence of nodes where each pair of adjacent nodes has an edge connecting them.',
    difficulty: 'hard',
    correctPattern: 'trees',
    hints: ['At each node, consider paths through it', 'Return max single path to parent']
  },
  {
    id: '24',
    title: 'Word Ladder',
    description: 'Given two words, beginWord and endWord, and a dictionary wordList, return the length of the shortest transformation sequence from beginWord to endWord where each transformed word must exist in the wordList and only one letter can be changed at a time.',
    difficulty: 'hard',
    correctPattern: 'graphs',
    hints: ['Model as a graph problem', 'Use BFS to find shortest path']
  },
  {
    id: '25',
    title: 'N-Queens',
    description: 'The n-queens puzzle is the problem of placing n queens on an n×n chessboard such that no two queens attack each other. Given an integer n, return all distinct solutions to the n-queens puzzle.',
    difficulty: 'hard',
    correctPattern: 'backtracking',
    hints: ['Place queens row by row', 'Check if placement is valid before continuing']
  },
  {
    id: '26',
    title: 'Longest Valid Parentheses',
    description: 'Given a string containing just the characters "(" and ")", return the length of the longest valid (well-formed) parentheses substring.',
    difficulty: 'hard',
    correctPattern: 'stack',
    hints: ['Track indices of unmatched parentheses', 'Use stack to find matching pairs']
  },
  {
    id: '27',
    title: 'Find Median from Data Stream',
    description: 'Design a data structure that supports adding integers from a data stream and finding the median of all elements so far.',
    difficulty: 'hard',
    correctPattern: 'heap_priority_queue',
    hints: ['Use two heaps: max heap for lower half, min heap for upper half', 'Balance the heaps to keep sizes within 1']
  },
  {
    id: '28',
    title: 'Edit Distance',
    description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You can insert, delete, or replace any character.',
    difficulty: 'hard',
    correctPattern: 'dynamic_programming',
    hints: ['2D DP table', 'Consider insert, delete, replace operations']
  },
  {
    id: '29',
    title: 'Median of Two Sorted Arrays',
    description: 'Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).',
    difficulty: 'hard',
    correctPattern: 'binary_search',
    hints: ['Binary search on the smaller array', 'Partition both arrays to find median']
  },
  {
    id: '30',
    title: 'Gas Station',
    description: 'There are n gas stations along a circular route. Given two integer arrays gas and cost, return the starting gas station index if you can travel around the circuit once, otherwise return -1.',
    difficulty: 'hard',
    correctPattern: 'greedy',
    hints: ['If total gas < total cost, impossible', 'Start from a station where you can proceed forward']
  },
]

export const PATTERNS = [
  { id: 'arrays_and_hashing', label: 'Arrays & Hashing', emoji: '📊' },
  { id: 'two_pointers', label: 'Two Pointers', emoji: '👉👈' },
  { id: 'sliding_window', label: 'Sliding Window', emoji: '🪟' },
  { id: 'stack', label: 'Stack', emoji: '📚' },
  { id: 'binary_search', label: 'Binary Search', emoji: '🔍' },
  { id: 'linked_list', label: 'Linked List', emoji: '🔗' },
  { id: 'trees', label: 'Trees', emoji: '🌳' },
  { id: 'graphs', label: 'Graphs', emoji: '🕸️' },
  { id: 'backtracking', label: 'Backtracking', emoji: '🔙' },
  { id: 'dynamic_programming', label: 'Dynamic Programming', emoji: '💎' },
  { id: 'greedy', label: 'Greedy', emoji: '🤑' },
  { id: 'heap_priority_queue', label: 'Heap / Priority Queue', emoji: '⛰️' },
] as const
