/*
 * Program: Concatenate Two Linked Lists
 * Description: Merges two linked lists into a single list
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
struct Node* concatenateLists(struct Node* list1, struct Node* list2);
void displayList(struct Node* head, const char* listName);
void freeList(struct Node* head);

int main() {
    struct Node* list1 = NULL;
    struct Node* list2 = NULL;
    struct Node* mergedList = NULL;
    int n, value, i;
    
    printf("=== Concatenate Two Linked Lists ===\n");
    
    // Create first list
    printf("\nEnter number of nodes for List 1: ");
    scanf("%d", &n);
    printf("Enter %d values for List 1:\n", n);
    for (i = 0; i < n; i++) {
        printf("  Node %d: ", i + 1);
        scanf("%d", &value);
        insertNode(&list1, value);
    }
    
    // Create second list
    printf("\nEnter number of nodes for List 2: ");
    scanf("%d", &n);
    printf("Enter %d values for List 2:\n", n);
    for (i = 0; i < n; i++) {
        printf("  Node %d: ", i + 1);
        scanf("%d", &value);
        insertNode(&list2, value);
    }
    
    // Display original lists
    displayList(list1, "List 1");
    displayList(list2, "List 2");
    
    // Concatenate lists
    mergedList = concatenateLists(list1, list2);
    
    // Display merged list
    displayList(mergedList, "Merged List");
    
    // Free memory
    freeList(mergedList);
    
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
 * Function: concatenateLists
 * Description: Concatenates two linked lists
 * Parameters:
 *   list1 - First linked list
 *   list2 - Second linked list
 * Returns: Head of merged list
 * Algorithm: Creates new list by copying all nodes from both lists
 */
struct Node* concatenateLists(struct Node* list1, struct Node* list2) {
    struct Node* result = NULL;
    struct Node* current;
    
    // Copy all nodes from list1
    current = list1;
    while (current != NULL) {
        insertNode(&result, current->data);
        current = current->next;
    }
    
    // Copy all nodes from list2
    current = list2;
    while (current != NULL) {
        insertNode(&result, current->data);
        current = current->next;
    }
    
    return result;
}

/*
 * Function: displayList
 * Description: Displays all nodes in the list
 * Parameters:
 *   head - Head of list
 *   listName - Name to display
 */
void displayList(struct Node* head, const char* listName) {
    if (head == NULL) {
        printf("\n%s is empty!\n", listName);
        return;
    }
    
    printf("\n%s: ", listName);
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
 * Description: Frees all allocated memory in list
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
