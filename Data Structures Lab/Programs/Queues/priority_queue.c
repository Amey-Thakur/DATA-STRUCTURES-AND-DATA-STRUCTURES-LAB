/*
 * Program: Priority Queue Implementation
 * Description: Linked list-based priority queue where lower priority number = higher priority
 * Author: Amey Thakur
 * Purpose: Demonstrates priority-based insertion and deletion
 */

#include <stdio.h>
#include <stdlib.h>

// Node structure for priority queue
typedef struct Node {
    int data;
    int priority;
    struct Node* next;
} Node;

// Global front pointer
Node* front = NULL;

// Function prototypes
void insert(int value, int priority);
void delete();
void display();
void freeQueue();

int main() {
    int choice, value, priority;
    
    printf("=== Priority Queue Implementation ===\n");
    printf("Note: Lower priority number = Higher priority\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Insert\n");
        printf("2. Delete (Remove Highest Priority)\n");
        printf("3. Display\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter value: ");
                scanf("%d", &value);
                printf("Enter priority (lower = higher priority): ");
                scanf("%d", &priority);
                insert(value, priority);
                break;
            case 2:
                delete();
                break;
            case 3:
                display();
                break;
            case 4:
                freeQueue();
                printf("Exiting program...\n");
                exit(0);
            default:
                printf("Invalid choice!\n");
        }
    }
    
    return 0;
}

/*
 * Function: insert
 * Description: Inserts element maintaining priority order
 * Parameters:
 *   value - Data to insert
 *   priority - Priority value (lower number = higher priority)
 * Algorithm: Inserts in sorted order by priority
 */
void insert(int value, int priority) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    
    if (newNode == NULL) {
        printf("Memory allocation failed!\n");
        return;
    }
    
    newNode->data = value;
    newNode->priority = priority;
    newNode->next = NULL;
    
    // Case 1: Queue is empty OR new node has highest priority
    if (front == NULL || priority < front->priority) {
        newNode->next = front;
        front = newNode;
    }
    // Case 2: Insert in middle or end based on priority
    else {
        Node* current = front;
        
        // Find position to insert (maintain sorted order)
        while (current->next != NULL && current->next->priority <= priority) {
            current = current->next;
        }
        
        newNode->next = current->next;
        current->next = newNode;
    }
    
    printf("Item %d with priority %d inserted successfully!\n", value, priority);
}

/*
 * Function: delete
 * Description: Removes and returns element with highest priority (lowest priority number)
 */
void delete() {
    if (front == NULL) {
        printf("Queue Underflow! Queue is empty.\n");
        return;
    }
    
    Node* temp = front;
    printf("Deleted item: %d (Priority: %d)\n", temp->data, temp->priority);
    
    front = front->next;
    free(temp);
}

/*
 * Function: display
 * Description: Displays all elements with their priorities
 */
void display() {
    if (front == NULL) {
        printf("\nQueue is empty!\n");
        return;
    }
    
    printf("\nPriority Queue:\n");
    printf("Priority   |   Value\n");
    printf("-----------|----------\n");
    
    Node* current = front;
    while (current != NULL) {
        printf("%5d      |   %5d\n", current->priority, current->data);
        current = current->next;
    }
}

/*
 * Function: freeQueue
 * Description: Frees all allocated memory
 */
void freeQueue() {
    Node* current = front;
    Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
    
    front = NULL;
}
