/*
 * Program: Count Non-Zero Nodes in Linked List
 * Description: Counts the number of nodes with non-zero data values
 * Author: Amey Thakur
 * Purpose: Demonstrates traversal and conditional counting
 */

#include <stdio.h>
#include <stdlib.h>

// Node structure
struct Node {
    int data;
    struct Node* next;
};

// Function prototypes
struct Node* createNode(int value);
void insertNode(struct Node** head, int value);
int countNonZeroNodes(struct Node* head);
void displayList(struct Node* head);
void freeList(struct Node* head);

int main() {
    struct Node* head = NULL;
    int n, value, i, count;
    
    printf("=== Count Non-Zero Nodes ===\n");
    
    // Create linked list
    printf("\nEnter number of nodes: ");
    scanf("%d", &n);
    
    printf("Enter %d values:\n", n);
    for (i = 0; i < n; i++) {
        printf("  Node %d: ", i + 1);
        scanf("%d", &value);
        insertNode(&head, value);
    }
    
    // Display list
    displayList(head);
    
    // Count non-zero nodes
    count = countNonZeroNodes(head);
    
    printf("\nTotal nodes: %d\n", n);
    printf("Non-zero nodes: %d\n", count);
    printf("Zero nodes: %d\n", n - count);
    
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
 * Function: countNonZeroNodes
 * Description: Counts nodes with non-zero data
 * Parameters: head - Head of list
 * Returns: Number of nodes with data != 0
 */
int countNonZeroNodes(struct Node* head) {
    int count = 0;
    struct Node* current = head;
    
    while (current != NULL) {
        if (current->data != 0) {
            count++;
        }
        current = current->next;
    }
    
    return count;
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
