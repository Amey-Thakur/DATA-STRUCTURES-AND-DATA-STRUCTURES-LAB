/*
 * Program: Count Occurrences in Linked List
 * Description: Counts how many times a specific value appears in the list
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
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
int countOccurrences(struct Node* head, int target);
void displayList(struct Node* head);
void freeList(struct Node* head);

int main() {
    struct Node* head = NULL;
    int n, value, i, target, count;
    
    printf("=== Count Occurrences in Linked List ===\n");
    
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
    
    // Search for occurrences
    printf("\nEnter value to search: ");
    scanf("%d", &target);
    
    count = countOccurrences(head, target);
    
    if (count == 0) {
        printf("\nValue %d not found in the list.\n", target);
    } else if (count == 1) {
        printf("\nValue %d appears 1 time in the list.\n", target);
    } else {
        printf("\nValue %d appears %d times in the list.\n", target, count);
    }
    
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
 * Function: countOccurrences
 * Description: Counts occurrences of a value in the list
 * Parameters:
 *   head - Head of list
 *   target - Value to count
 * Returns: Number of times target appears
 */
int countOccurrences(struct Node* head, int target) {
    int count = 0;
    struct Node* current = head;
    
    while (current != NULL) {
        if (current->data == target) {
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
