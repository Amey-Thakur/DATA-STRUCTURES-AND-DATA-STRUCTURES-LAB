/*
 * Program: Doubly Linked List Operations
 * Description: Implementation of doubly linked list with bidirectional traversal
 * Author: Amey Thakur
 * Purpose: Demonstrates doubly linked list with forward and backward pointers
 */

#include <stdio.h>
#include <stdlib.h>

// Node structure for doubly linked list
struct Node {
    int data;
    struct Node* next;  // Pointer to next node
    struct Node* prev;  // Pointer to previous node
};

// Global head pointer
struct Node* head = NULL;

// Function prototypes
struct Node* createNode(int value);
void insertNode(int value);
void deleteNode(int value);
void displayForward();
void displayBackward();
void freeList();

int main() {
    int choice, value;
    
    printf("=== Doubly Linked List Operations ===\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Insert Node\n");
        printf("2. Delete Node\n");
        printf("3. Display Forward\n");
        printf("4. Display Backward\n");
        printf("5. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter node value: ");
                scanf("%d", &value);
                insertNode(value);
                printf("Node inserted successfully!\n");
                break;
                
            case 2:
                if (head == NULL) {
                    printf("List is empty!\n");
                } else {
                    printf("Enter node value to delete: ");
                    scanf("%d", &value);
                    deleteNode(value);
                }
                break;
                
            case 3:
                displayForward();
                break;
                
            case 4:
                displayBackward();
                break;
                
            case 5:
                freeList();
                printf("Exiting program...\n");
                exit(0);
                
            default:
                printf("Invalid choice! Please enter 1-5.\n");
        }
    }
    
    return 0;
}

/*
 * Function: createNode
 * Description: Creates a new node with given value
 * Parameters: value - Data to store in node
 * Returns: Pointer to newly created node
 */
struct Node* createNode(int value) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        exit(1);
    }
    
    newNode->data = value;
    newNode->next = NULL;
    newNode->prev = NULL;
    
    return newNode;
}

/*
 * Function: insertNode
 * Description: Inserts a new node at the end of the list
 * Parameters: value - Data to insert
 * Note: Updates both next and prev pointers
 */
void insertNode(int value) {
    struct Node* newNode = createNode(value);
    
    // If list is empty
    if (head == NULL) {
        head = newNode;
        return;
    }
    
    // Traverse to last node
    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    
    // Link new node
    current->next = newNode;
    newNode->prev = current;
}

/*
 * Function: deleteNode
 * Description: Deletes first occurrence of node with given value
 * Parameters: value - Value of node to delete
 */
void deleteNode(int value) {
    if (head == NULL) {
        printf("List is empty!\n");
        return;
    }
    
    struct Node* current = head;
    
    // Search for the node
    while (current != NULL && current->data != value) {
        current = current->next;
    }
    
    // Node not found
    if (current == NULL) {
        printf("Node with value %d not found!\n", value);
        return;
    }
    
    // If node is head
    if (current == head) {
        head = current->next;
        if (head != NULL) {
            head->prev = NULL;
        }
    }
    // If node is in middle or end
    else {
        if (current->prev != NULL) {
            current->prev->next = current->next;
        }
        if (current->next != NULL) {
            current->next->prev = current->prev;
        }
    }
    
    free(current);
    printf("Node with value %d deleted successfully!\n", value);
}

/*
 * Function: displayForward
 * Description: Displays list from head to tail
 */
void displayForward() {
    if (head == NULL) {
        printf("\nList is empty!\n");
        return;
    }
    
    printf("\nDoubly Linked List (Forward): ");
    struct Node* current = head;
    
    while (current != NULL) {
        printf("%d", current->data);
        if (current->next != NULL) {
            printf(" <--> ");
        }
        current = current->next;
    }
    printf(" <--> NULL\n");
}

/*
 * Function: displayBackward
 * Description: Displays list from tail to head
 */
void displayBackward() {
    if (head == NULL) {
        printf("\nList is empty!\n");
        return;
    }
    
    // Find last node
    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    
    printf("\nDoubly Linked List (Backward): NULL <--> ");
    
    // Traverse backwards
    while (current != NULL) {
        printf("%d", current->data);
        if (current->prev != NULL) {
            printf(" <--> ");
        }
        current = current->prev;
    }
    printf("\n");
}

/*
 * Function: freeList
 * Description: Frees all allocated memory
 */
void freeList() {
    struct Node* current = head;
    struct Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
    
    head = NULL;
}
