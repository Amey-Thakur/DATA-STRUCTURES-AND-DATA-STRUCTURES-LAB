# Data Structures Lab Programs

This folder contains **34 comprehensive C programs** covering fundamental data structures and algorithms. All programs include detailed comments, proper documentation, and follow standard coding practices.

---

## 📚 Quick Navigation

- [Arrays](#arrays-4-programs)
- [Strings](#strings-3-programs)
- [Linked Lists](#linked-lists-7-programs)
- [Stacks](#stacks-8-programs)
- [Queues](#queues-5-programs)
- [Searching & Sorting](#searching--sorting-7-programs)

---

## Arrays (4 Programs)

| # | Program | Description |
|---|---------|-------------|
| 1 | [matrix_addition.c](Programs/Array/matrix_addition.c) | Adds two 3x3 matrices using pointer arithmetic |
| 2 | [student_marks_analysis.c](Programs/Array/student_marks_analysis.c) | Analyzes student marks with subject/student averages |
| 3 | [find_pairs_sum.c](Programs/Array/find_pairs_sum.c) | Finds all pairs that sum to target value (50) |
| 4 | [array_sum_mean.c](Programs/Array/array_sum_mean.c) | Calculates sum and mean of 2D array elements |

---

## Strings (3 Programs)

| # | Program | Description |
|---|---------|-------------|
| 1 | [reverse_words.c](Programs/String/reverse_words.c) | Reverses word order in a sentence |
| 2 | [count_characters.c](Programs/String/count_characters.c) | Counts numbers, uppercase, lowercase, special chars |
| 3 | [replace_character.c](Programs/String/replace_character.c) | Replaces all occurrences of a character |

---

## Linked Lists (7 Programs)

| # | Program | Description |
|---|---------|-------------|
| 1 | [singly_linked_list.c](Programs/Linked%20List/singly_linked_list.c) | Basic singly linked list operations |
| 2 | [circular_linked_list.c](Programs/Linked%20List/circular_linked_list.c) | Circular linked list (last→first) |
| 3 | [doubly_linked_list.c](Programs/Linked%20List/doubly_linked_list.c) | Doubly linked list with bidirectional traversal |
| 4 | [concatenate_linked_lists.c](Programs/Linked%20List/concatenate_linked_lists.c) | Merges two linked lists |
| 5 | [count_nonzero_nodes.c](Programs/Linked%20List/count_nonzero_nodes.c) | Counts nodes with non-zero values |
| 6 | [count_occurrences.c](Programs/Linked%20List/count_occurrences.c) | Counts occurrences of a value |
| 7 | [find_max_min.c](Programs/Linked%20List/find_max_min.c) | Finds maximum and minimum values |

---

## Stacks (8 Programs)

### Expression Evaluation
| # | Program | Description |
|---|---------|-------------|
| 1 | [evaluate_postfix_simple.c](Programs/Stacks/evaluate_postfix_simple.c) | Evaluates postfix expressions (simple) |
| 2 | [evaluate_postfix_expression.c](Programs/Stacks/evaluate_postfix_expression.c) | Evaluates postfix expressions (advanced) |
| 3 | [evaluate_prefix.c](Programs/Stacks/evaluate_prefix.c) | Evaluates prefix expressions |

### Expression Conversion
| # | Program | Description |
|---|---------|-------------|
| 4 | [infix_to_postfix.c](Programs/Stacks/infix_to_postfix.c) | Converts infix → postfix |
| 5 | [infix_to_prefix.c](Programs/Stacks/infix_to_prefix.c) | Converts infix → prefix |
| 6 | [postfix_to_infix.c](Programs/Stacks/postfix_to_infix.c) | Converts postfix → infix |
| 7 | [prefix_to_infix.c](Programs/Stacks/prefix_to_infix.c) | Converts prefix → infix |

### Stack Implementation
| # | Program | Description |
|---|---------|-------------|
| 8 | [stack_using_linked_list.c](Programs/Stacks/stack_using_linked_list.c) | Dynamic stack using linked list |

---

## Queues (5 Programs)

| # | Program | Description |
|---|---------|-------------|
| 1 | [circular_queue.c](Programs/Queues/circular_queue.c) | Circular queue with wrap-around |
| 2 | [priority_queue.c](Programs/Queues/priority_queue.c) | Priority-based queue (linked list) |
| 3 | [reverse_queue.c](Programs/Queues/reverse_queue.c) | Reverses queue using stack |
| 4 | [double_ended_queue.c](Programs/Queues/double_ended_queue.c) | Deque with sentinel nodes |
| 5 | [deque_both_ends.c](Programs/Queues/deque_both_ends.c) | Array-based deque |

---

## Searching & Sorting (7 Programs)

### Searching Algorithms
| # | Program | Description | Time Complexity |
|---|---------|-------------|-----------------|
| 1 | [binary_search.c](Programs/Searching%20and%20Sorting/binary_search.c) | Binary search (advanced) | O(log n) |
| 2 | [binary.c](Programs/Searching%20and%20Sorting/binary.c) | Binary search (alternative) | O(log n) |

### Sorting Algorithms
| # | Program | Description | Time Complexity |
|---|---------|-------------|-----------------|
| 3 | [bubble_sort.c](Programs/Searching%20and%20Sorting/bubble_sort.c) | Bubble sort (optimized) | O(n²) |
| 4 | [bubble.c](Programs/Searching%20and%20Sorting/bubble.c) | Bubble sort (alternative) | O(n²) |
| 5 | [insertion.c](Programs/Searching%20and%20Sorting/insertion.c) | Insertion sort | O(n²) |
| 6 | [merge.c](Programs/Searching%20and%20Sorting/merge.c) | Merge sort (divide & conquer) | O(n log n) |
| 7 | [quick.c](Programs/Searching%20and%20Sorting/quick.c) | Quick sort (partition-exchange) | O(n log n) avg |

---

## 📝 Program Features

All programs include:

- ✅ **Comprehensive Comments** - Detailed explanations for easy understanding
- ✅ **Author Attribution** - Amey Thakur
- ✅ **Function Documentation** - Purpose, parameters, and return values explained
- ✅ **Algorithm Explanations** - Step-by-step logic clarification
- ✅ **Error Handling** - Input validation and edge case management
- ✅ **Standard Practices** - Follows C coding conventions
- ✅ **Modular Design** - Separate functions for clarity

---

## 🚀 How to Use

1. **Navigate** to the desired program folder
2. **Open** the `.c` file
3. **Compile** using: `gcc filename.c -o output`
4. **Run** using: `./output` (Linux/Mac) or `output.exe` (Windows)

Example:
```bash
cd "Programs/Array"
gcc matrix_addition.c -o matrix_addition
./matrix_addition
```

---

## 📖 Learning Path

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

## 💡 Key Concepts Covered

- **Arrays**: Matrix operations, statistical analysis
- **Strings**: Manipulation, character analysis
- **Linked Lists**: Dynamic memory, pointer manipulation
- **Stacks**: LIFO principle, expression evaluation
- **Queues**: FIFO principle, priority handling
- **Searching**: Binary search efficiency
- **Sorting**: Comparison of algorithms

---

## 📬 Contact

**Author**: Amey Thakur  
**Repository**: [DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB](https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB)

---

*Last Updated: December 2024*
