/*
 * Program: Find Maximum and Minimum in Linked List
 * Description: Finds the maximum and minimum values in a linked list
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

// Node structure
struct Node {
    int data;
    struct Node* next;
};

// Function prototypes
struct Node* createNode(int value);
void insertNode(struct Node** head, int value);
void findMaxMin(struct Node* head, int* max, int* min);
void displayList(struct Node* head);
void freeList(struct Node* head);

int main() {
    struct Node* head = NULL;
    int n, value, i, max, min;
    
    printf("=== Find Maximum and Minimum in Linked List ===\n");
    
    // Create linked list
    printf("\nEnter number of nodes: ");
    scanf("%d", &n);
    
    if (n <= 0) {
        printf("Invalid number of nodes!\n");
        return 1;
    }
    
    printf("Enter %d values:\n", n);
    for (i = 0; i < n; i++) {
        printf("  Node %d: ", i + 1);
        scanf("%d", &value);
        insertNode(&head, value);
    }
    
    // Display list
    displayList(head);
    
    // Find max and min
    findMaxMin(head, &max, &min);
    
    printf("\nMaximum value: %d\n", max);
    printf("Minimum value: %d\n", min);
    printf("Difference: %d\n", max - min);
    
    // Free memory
    freeList(head);
    
    return 0;
}

/*
 * Function: createNode
 * Description: Creates a new node with given value
 * Parameters: value - Data to store
 * Returns: Pointer to new node
 */
struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    
    newNode->data = value;
    newNode->next = NULL;
    
    return newNode;
}

/*
 * Function: insertNode
 * Description: Inserts node at end of list
 * Parameters:
 *   head - Pointer to head pointer
 *   value - Data to insert
 */
void insertNode(struct Node** head, int value) {
    struct Node* newNode = createNode(value);
    
    if (*head == NULL) {
        *head = newNode;
        return;
    }
    
    struct Node* current = *head;
    while (current->next != NULL) {
        current = current->next;
    }
    
    current->next = newNode;
}

/*
 * Function: findMaxMin
 * Description: Finds maximum and minimum values in the list
 * Parameters:
 *   head - Head of list
 *   max - Pointer to store maximum value
 *   min - Pointer to store minimum value
 */
void findMaxMin(struct Node* head, int* max, int* min) {
    if (head == NULL) {
        printf("List is empty!\n");
        return;
    }
    
    // Initialize with first node's data
    *max = head->data;
    *min = head->data;
    
    struct Node* current = head->next;
    
    // Traverse and compare
    while (current != NULL) {
        if (current->data > *max) {
            *max = current->data;
        }
        if (current->data < *min) {
            *min = current->data;
        }
        current = current->next;
    }
}

/*
 * Function: displayList
 * Description: Displays all nodes in the list
 * Parameters: head - Head of list
 */
void displayList(struct Node* head) {
    if (head == NULL) {
        printf("\nList is empty!\n");
        return;
    }
    
    printf("\nLinked List: ");
    struct Node* current = head;
    
    while (current != NULL) {
        printf("%d", current->data);
        if (current->next != NULL) {
            printf(" --> ");
        }
        current = current->next;
    }
    printf(" --> NULL\n");
}

/*
 * Function: freeList
 * Description: Frees all allocated memory
 * Parameters: head - Head of list to free
 */
void freeList(struct Node* head) {
    struct Node* current = head;
    struct Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
}
