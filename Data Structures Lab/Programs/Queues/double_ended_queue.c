/*
 * Program: Double-Ended Queue (Deque)
 * Description: Queue with insertion and deletion at both ends using doubly linked list
 * Author: Amey Thakur
 * Purpose: Demonstrates deque operations with sentinel nodes
 */

#include <stdio.h>
#include <stdlib.h>

// Node structure for doubly linked list
struct Node {
    int data;
    struct Node* prev;
    struct Node* next;
};

// Global head and tail sentinel nodes
struct Node* head = NULL;
struct Node* tail = NULL;

// Function prototypes
struct Node* createNode(int data);
void createSentinels();
void enqueueAtFront(int data);
void enqueueAtRear(int data);
void dequeueAtFront();
void dequeueAtRear();
void display();

int main() {
    int choice, data;
    
    printf("=== Double-Ended Queue (Deque) ===\n");
    
    // Create sentinel nodes
    createSentinels();
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Enqueue at Front\n");
        printf("2. Enqueue at Rear\n");
        printf("3. Dequeue at Front\n");
        printf("4. Dequeue at Rear\n");
        printf("5. Display\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter data: ");
                scanf("%d", &data);
                enqueueAtFront(data);
                break;
            case 2:
                printf("Enter data: ");
                scanf("%d", &data);
                enqueueAtRear(data);
                break;
            case 3:
                dequeueAtFront();
                break;
            case 4:
                dequeueAtRear();
                break;
            case 5:
                display();
                break;
            case 6:
                printf("Exiting program...\n");
                exit(0);
            default:
                printf("Invalid choice!\n");
        }
    }
    
    return 0;
}

/*
 * Function: createNode
 * Description: Creates a new node with given data
 * Parameters: data - Value to store
 * Returns: Pointer to new node
 */
struct Node* createNode(int data) {
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->prev = NULL;
    newNode->next = NULL;
    return newNode;
}

/*
 * Function: createSentinels
 * Description: Creates dummy head and tail nodes for easier operations
 * Note: Sentinel nodes simplify insert/delete logic by avoiding null checks
 */
void createSentinels() {
    head = createNode(0);  // Dummy head
    tail = createNode(0);  // Dummy tail
    head->next = tail;
    tail->prev = head;
}

/*
 * Function: enqueueAtFront
 * Description: Inserts element at the front of deque
 * Parameters: data - Value to insert
 */
void enqueueAtFront(int data) {
    struct Node* newNode = createNode(data);
    struct Node* temp = head->next;
    
    // Insert after head sentinel
    head->next = newNode;
    newNode->prev = head;
    newNode->next = temp;
    temp->prev = newNode;
    
    printf("Element %d enqueued at front!\n", data);
}

/*
 * Function: enqueueAtRear
 * Description: Inserts element at the rear of deque
 * Parameters: data - Value to insert
 */
void enqueueAtRear(int data) {
    struct Node* newNode = createNode(data);
    struct Node* temp = tail->prev;
    
    // Insert before tail sentinel
    tail->prev = newNode;
    newNode->next = tail;
    newNode->prev = temp;
    temp->next = newNode;
    
    printf("Element %d enqueued at rear!\n", data);
}

/*
 * Function: dequeueAtFront
 * Description: Removes element from the front of deque
 */
void dequeueAtFront() {
    if (head->next == tail) {
        printf("Deque is empty!\n");
        return;
    }
    
    struct Node* temp = head->next;
    printf("Element %d dequeued from front!\n", temp->data);
    
    head->next = temp->next;
    temp->next->prev = head;
    free(temp);
}

/*
 * Function: dequeueAtRear
 * Description: Removes element from the rear of deque
 */
void dequeueAtRear() {
    if (tail->prev == head) {
        printf("Deque is empty!\n");
        return;
    }
    
    struct Node* temp = tail->prev;
    printf("Element %d dequeued from rear!\n", temp->data);
    
    tail->prev = temp->prev;
    temp->prev->next = tail;
    free(temp);
}

/*
 * Function: display
 * Description: Displays all elements in the deque
 */
void display() {
    if (head->next == tail) {
        printf("\nDeque is empty!\n");
        return;
    }
    
    printf("\nDeque elements: ");
    struct Node* temp = head->next;
    
    while (temp != tail) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}
