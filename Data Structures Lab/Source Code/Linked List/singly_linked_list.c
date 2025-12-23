/*
 * Program: Singly Linked List Operations
 * Description: Implementation of singly linked list with insert, delete, and display operations
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <stdlib.h>

// Node structure for singly linked list
struct Node {
    int data;
    struct Node* next;
};

// Global head pointer
struct Node* head = NULL;

// Function prototypes
struct Node* createNode(int value);
void insertNode(int value);
void deleteNode(int value);
void displayList();
void freeList();

int main() {
    int choice, value;
    
    printf("=== Singly Linked List Operations ===\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Insert Node\n");
        printf("2. Delete Node\n");
        printf("3. Display List\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", \u0026choice);
        
        switch (choice) {
            case 1:
                printf("Enter node value: ");
                scanf("%d", \u0026value);
                insertNode(value);
                printf("Node inserted successfully!\n");
                break;
                
            case 2:
                if (head == NULL) {
                    printf("List is empty!\n");
                } else {
                    printf("Enter node value to delete: ");
                    scanf("%d", \u0026value);
                    deleteNode(value);
                }
                break;
                
            case 3:
                displayList();
                break;
                
            case 4:
                freeList();
                printf("Exiting program...\n");
                exit(0);
                
            default:
                printf("Invalid choice! Please enter 1-4.\n");
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
    
    return newNode;
}

/*
 * Function: insertNode
 * Description: Inserts a new node at the end of the list
 * Parameters: value - Data to insert
 */
void insertNode(int value) {
    struct Node* newNode = createNode(value);
    
    // If list is empty, make new node the head
    if (head == NULL) {
        head = newNode;
        return;
    }
    
    // Traverse to the last node
    struct Node* current = head;
    while (current->next != NULL) {
        current = current->next;
    }
    
    // Insert new node at end
    current->next = newNode;
}

/*
 * Function: deleteNode
 * Description: Deletes first occurrence of node with given value
 * Parameters: value - Value of node to delete
 */
void deleteNode(int value) {
    // Check if list is empty
    if (head == NULL) {
        printf("List is empty! Cannot delete.\n");
        return;
    }
    
    struct Node* current = head;
    struct Node* previous = NULL;
    
    // If head node contains the value
    if (current->data == value) {
        head = current->next;
        free(current);
        printf("Node with value %d deleted successfully!\n", value);
        return;
    }
    
    // Search for the node to delete
    while (current != NULL && current->data != value) {
        previous = current;
        current = current->next;
    }
    
    // If node not found
    if (current == NULL) {
        printf("Node with value %d not found!\n", value);
        return;
    }
    
    // Delete the node
    previous->next = current->next;
    free(current);
    printf("Node with value %d deleted successfully!\n", value);
}

/*
 * Function: displayList
 * Description: Displays all nodes in the linked list
 */
void displayList() {
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
 * Description: Frees all allocated memory in the list
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
