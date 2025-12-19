/*
 * Program: Circular Linked List Operations
 * Description: Implementation of circular linked list with insert, delete, and display
 * Author: Amey Thakur
 * Purpose: Demonstrates circular linked list where last node points to first node
 */

#include <stdio.h>
#include <stdlib.h>

// Node structure for circular linked list
struct Node {
    int data;
    struct Node* next;
};

// Global pointers
struct Node* head = NULL;

// Function prototypes
struct Node* createNode(int value);
void insertNode(int value);
void deleteNode(int value);
void displayList();
void freeList();

int main() {
    int choice, value;
    
    printf("=== Circular Linked List Operations ===\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Insert Node\n");
        printf("2. Delete Node\n");
        printf("3. Display List\n");
        printf("4. Exit\n");
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
 * Description: Inserts a new node at the end of circular list
 * Parameters: value - Data to insert
 * Note: In circular list, last node's next points to head
 */
void insertNode(int value) {
    struct Node* newNode = createNode(value);
    
    // If list is empty, create first node pointing to itself
    if (head == NULL) {
        head = newNode;
        newNode->next = head;  // Circular link
        return;
    }
    
    // Traverse to last node
    struct Node* current = head;
    while (current->next != head) {
        current = current->next;
    }
    
    // Insert new node at end and maintain circular link
    current->next = newNode;
    newNode->next = head;
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
    struct Node* previous = NULL;
    
    // Find last node (to maintain circular link)
    struct Node* last = head;
    while (last->next != head) {
        last = last->next;
    }
    
    // If head node contains the value
    if (current->data == value) {
        // Only one node in list
        if (current->next == head) {
            free(current);
            head = NULL;
        } else {
            // Update last node to point to new head
            last->next = current->next;
            head = current->next;
            free(current);
        }
        printf("Node with value %d deleted successfully!\n", value);
        return;
    }
    
    //Search for node to delete
    previous = current;
    current = current->next;
    
    while (current != head) {
        if (current->data == value) {
            previous->next = current->next;
            free(current);
            printf("Node with value %d deleted successfully!\n", value);
            return;
        }
        previous = current;
        current = current->next;
    }
    
    printf("Node with value %d not found!\n", value);
}

/*
 * Function: displayList
 * Description: Displays all nodes in the circular linked list
 */
void displayList() {
    if (head == NULL) {
        printf("\nList is empty!\n");
        return;
    }
    
    printf("\nCircular Linked List: ");
    struct Node* current = head;
    
    do {
        printf("%d", current->data);
        if (current->next != head) {
            printf(" --> ");
        }
        current = current->next;
    } while (current != head);
    
    printf(" --> (back to head: %d)\n", head->data);
}

/*
 * Function: freeList
 * Description: Frees all allocated memory in the list
 */
void freeList() {
    if (head == NULL) {
        return;
    }
    
    struct Node* current = head;
    struct Node* next;
    
    // Break circular link
    struct Node* last = head;
    while (last->next != head) {
        last = last->next;
    }
    last->next = NULL;
    
    // Free all nodes
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
    
    head = NULL;
}
