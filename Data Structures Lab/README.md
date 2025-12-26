<!-- =========================================================================================
                                     HEADER SECTION
     ========================================================================================= -->
<div align="center">

  <!-- Title -->
  # Data Structures Lab

  <!-- Subtitle -->
  ### CSL303 · Semester III · Computer Engineering

  <!-- Badges -->
  [![Curated by](https://img.shields.io/badge/Curated%20by-Amey%20Thakur-blue.svg)](https://github.com/Amey-Thakur)
  [![Source Code](https://img.shields.io/badge/Source%20Code-34-yellowgreen.svg)](#quick-navigation)
  [![Language](https://img.shields.io/badge/Language-C-blueviolet.svg)](Source%20Code/)
  [![Lab Manual](https://img.shields.io/badge/Lab%20Manual-Available-brightgreen.svg)](DSL%20Experiments.pdf)

  <!-- Short Description -->
  **A comprehensive collection of 34 C programs covering fundamental data structures and algorithms with detailed comments, proper documentation, and industry-standard coding practices.**

  ---

  <!-- Navigation Links -->
  [How to Use](#how-to-use) &nbsp;·&nbsp; [Learning Path](#learning-path) &nbsp;·&nbsp; [Lab Manual](#lab-manual) &nbsp;·&nbsp; [Arrays](#arrays-4-source-codes) &nbsp;·&nbsp; [Strings](#strings-3-source-codes) &nbsp;·&nbsp; [Linked Lists](#linked-lists-7-source-codes) &nbsp;·&nbsp; [Stacks](#stacks-8-source-codes) &nbsp;·&nbsp; [Queues](#queues-5-source-codes) &nbsp;·&nbsp; [Searching & Sorting](#searching--sorting-7-source-codes)

</div>

---

> [!TIP]
> **Visualization is Key**: Always draw the state of your data structure (nodes, pointers, indices) on paper before and during code implementation. Dry running your logic with small test cases is the most effective way to debug complex pointer manipulations.

> [!WARNING]
> **Memory Management**: Improper handling of pointers and dynamic memory allocation (`malloc`, `free`) in C can lead to **Segmentation Faults** or **Memory Leaks**. Always ensure pointers are initialized and correctly freed when no longer in use.

---

<!-- =========================================================================================
                                     HOW TO USE SECTION
     ========================================================================================= -->
## How to Use

1. **Navigate** to the desired source code folder.
2. **Open** the `.c` file.
3. **Compile** using: `gcc filename.c -o output`.
4. **Run** using: `./output` (Linux/Mac) or `output.exe` (Windows).

Example:
```bash
cd "Source Code/Array"
gcc matrix_addition.c -o matrix_addition
./matrix_addition
```

---


<!-- =========================================================================================
                                     LEARNING PATH SECTION
     ========================================================================================= -->
## Learning Path

**Beginner Level:**
- Start with Arrays → Strings
- Move to basic Linked Lists
- Explore Searching algorithms

**Intermediate Level:**
- Advanced Linked Lists (circular, doubly)
- Stack operations and expressions
- Queue implementations

**Advanced Level:**
- Expression conversions (infix/postfix/prefix)
- Sorting algorithms comparison
- Data structure trade-offs

---

<!-- =========================================================================================
                                     LAB MANUAL SECTION
     ========================================================================================= -->
## Lab Manual

| # | Resource | Description |
|:-:|:---|:---|
| 1 | [DSL Experiments.pdf](DSL%20Experiments.pdf) | Complete laboratory manual with all experiments |

---

<!-- =========================================================================================
                                     ARRAYS SECTION
     ========================================================================================= -->
## Arrays (4 Source Codes)

| # | Program | Description | Source Code |
|:---|:---|:---|:-:|
| 1 | matrix_addition.c | Adds two 3x3 matrices using pointer arithmetic | [View](Source%20Code/Array/matrix_addition.c) |
| 2 | student_marks_analysis.c | Analyzes student marks with subject/student averages | [View](Source%20Code/Array/student_marks_analysis.c) |
| 3 | find_pairs_sum.c | Finds all pairs that sum to target value (50) | [View](Source%20Code/Array/find_pairs_sum.c) |
| 4 | array_sum_mean.c | Calculates sum and mean of 2D array elements | [View](Source%20Code/Array/array_sum_mean.c) |

---

<!-- =========================================================================================
                                     STRINGS SECTION
     ========================================================================================= -->
## Strings (3 Source Codes)

| # | Program | Description | Source Code |
|:---|:---|:---|:-:|
| 1 | reverse_words.c | Reverses word order in a sentence | [View](Source%20Code/String/reverse_words.c) |
| 2 | count_characters.c | Counts numbers, uppercase, lowercase, special chars | [View](Source%20Code/String/count_characters.c) |
| 3 | replace_character.c | Replaces all occurrences of a character | [View](Source%20Code/String/replace_character.c) |

---

<!-- =========================================================================================
                                     LINKED LISTS SECTION
     ========================================================================================= -->
## Linked Lists (7 Source Codes)

| # | Program | Description | Source Code |
|:---|:---|:---|:-:|
| 1 | singly_linked_list.c | Basic singly linked list operations | [View](Source%20Code/Linked%20List/singly_linked_list.c) |
| 2 | circular_linked_list.c | Circular linked list (last→first) | [View](Source%20Code/Linked%20List/circular_linked_list.c) |
| 3 | doubly_linked_list.c | Doubly linked list with bidirectional traversal | [View](Source%20Code/Linked%20List/doubly_linked_list.c) |
| 4 | concatenate_linked_lists.c | Merges two linked lists | [View](Source%20Code/Linked%20List/concatenate_linked_lists.c) |
| 5 | count_nonzero_nodes.c | Counts nodes with non-zero values | [View](Source%20Code/Linked%20List/count_nonzero_nodes.c) |
| 6 | count_occurrences.c | Counts occurrences of a value | [View](Source%20Code/Linked%20List/count_occurrences.c) |
| 7 | find_max_min.c | Finds maximum and minimum values | [View](Source%20Code/Linked%20List/find_max_min.c) |

---

<!-- =========================================================================================
                                     STACKS SECTION
     ========================================================================================= -->
## Stacks (8 Source Codes)

### Expression Evaluation
| # | Program | Description | Source Code |
|:---|:---|:---|:-:|
| 1 | evaluate_postfix_simple.c | Evaluates postfix expressions (simple) | [View](Source%20Code/Stacks/evaluate_postfix_simple.c) |
| 2 | evaluate_postfix_expression.c | Evaluates postfix expressions (advanced) | [View](Source%20Code/Stacks/evaluate_postfix_expression.c) |
| 3 | evaluate_prefix.c | Evaluates prefix expressions | [View](Source%20Code/Stacks/evaluate_prefix.c) |

### Expression Conversion
| # | Program | Description | Source Code |
|:---|:---|:---|:-:|
| 4 | infix_to_postfix.c | Converts infix → postfix | [View](Source%20Code/Stacks/infix_to_postfix.c) |
| 5 | infix_to_prefix.c | Converts infix → prefix | [View](Source%20Code/Stacks/infix_to_prefix.c) |
| 6 | postfix_to_infix.c | Converts postfix → infix | [View](Source%20Code/Stacks/postfix_to_infix.c) |
| 7 | prefix_to_infix.c | Converts prefix → infix | [View](Source%20Code/Stacks/prefix_to_infix.c) |

### Stack Implementation
| # | Program | Description | Source Code |
|:---|:---|:---|:-:|
| 8 | stack_using_linked_list.c | Dynamic stack using linked list | [View](Source%20Code/Stacks/stack_using_linked_list.c) |

---

<!-- =========================================================================================
                                     QUEUES SECTION
     ========================================================================================= -->
## Queues (5 Source Codes)

| # | Program | Description | Source Code |
|:---|:---|:---|:-:|
| 1 | circular_queue.c | Circular queue with wrap-around | [View](Source%20Code/Queues/circular_queue.c) |
| 2 | priority_queue.c | Priority-based queue (linked list) | [View](Source%20Code/Queues/priority_queue.c) |
| 3 | reverse_queue.c | Reverses queue using stack | [View](Source%20Code/Queues/reverse_queue.c) |
| 4 | double_ended_queue.c | Deque with sentinel nodes | [View](Source%20Code/Queues/double_ended_queue.c) |
| 5 | deque_both_ends.c | Array-based deque | [View](Source%20Code/Queues/deque_both_ends.c) |

---

<!-- =========================================================================================
                               SEARCHING & SORTING SECTION
     ========================================================================================= -->
## Searching & Sorting (7 Source Codes)

### Searching Algorithms
| # | Program | Description | Time Complexity | Source Code |
|:---|:---|:---|:---|:-:|
| 1 | binary_search.c | Binary search (advanced) | O(log n) | [View](Source%20Code/Searching%20and%20Sorting/binary_search.c) |
| 2 | binary.c | Binary search (alternative) | O(log n) | [View](Source%20Code/Searching%20and%20Sorting/binary.c) |

### Sorting Algorithms
| # | Program | Description | Time Complexity | Source Code |
|:---|:---|:---|:---|:-:|
| 3 | bubble_sort.c | Bubble sort (optimized) | O(n²) | [View](Source%20Code/Searching%20and%20Sorting/bubble_sort.c) |
| 4 | bubble.c | Bubble sort (alternative) | O(n²) | [View](Source%20Code/Searching%20and%20Sorting/bubble.c) |
| 5 | insertion.c | Insertion sort | O(n²) | [View](Source%20Code/Searching%20and%20Sorting/insertion.c) |
| 6 | merge.c | Merge sort (divide & conquer) | O(n log n) | [View](Source%20Code/Searching%20and%20Sorting/merge.c) |
| 7 | quick.c | Quick sort (partition-exchange) | O(n log n) avg | [View](Source%20Code/Searching%20and%20Sorting/quick.c) |

---



<!-- =========================================================================================
                                     FOOTER SECTION
     ========================================================================================= -->
<div align="center">

  <!-- Footer Navigation -->
  [↑ Back to Top](#data-structures-lab)

  [How to Use](#how-to-use) &nbsp;·&nbsp; [Learning Path](#learning-path) &nbsp;·&nbsp; [Lab Manual](#lab-manual) &nbsp;·&nbsp; [Arrays](#arrays-4-source-codes) &nbsp;·&nbsp; [Strings](#strings-3-source-codes) &nbsp;·&nbsp; [Linked Lists](#linked-lists-7-source-codes) &nbsp;·&nbsp; [Stacks](#stacks-8-source-codes) &nbsp;·&nbsp; [Queues](#queues-5-source-codes) &nbsp;·&nbsp; [Searching & Sorting](#searching--sorting-7-source-codes)

  <br>

  **[🏠 Back to Main Repository](../)**

  ---

  ### [Data Structures and Data Structures Lab](../)

  **CSC305 & CSL303 · Semester III · Computer Engineering**

  *University of Mumbai · Curated by [Amey Thakur](https://github.com/Amey-Thakur)*

</div>

