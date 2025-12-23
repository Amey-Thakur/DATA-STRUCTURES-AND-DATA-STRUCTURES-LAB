/*
 * Program: Circular Queue Implementation
 * Description: Array-based circular queue with insert, delete, and display operations
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

#define MAX_SIZE 5  // Maximum queue capacity

// Global queue variables
int queue[MAX_SIZE];
int front = -1;
int rear = -1;

// Function prototypes
void enqueue();
void dequeue();
void display();
int isFull();
int isEmpty();

int main() {
    int choice;
    
    printf("=== Circular Queue Operations ===\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Insert (Enqueue)\n");
        printf("2. Delete (Dequeue)\n");
        printf("3. Display Queue\n");
        printf("4. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                enqueue();
                break;
            case 2:
                dequeue();
                break;
            case 3:
                display();
                break;
            case 4:
                printf("Exiting program...\n");
                exit(0);
            default:
                printf("Invalid choice! Please enter 1-4.\n");
        }
    }
    
    return 0;
}

/*
 * Function: isFull
 * Description: Checks if circular queue is full
 * Returns: 1 if full, 0 otherwise
 * Condition: Queue is full when (front==0 && rear==SIZE-1) OR (front==rear+1)
 */
int isFull() {
    return ((front == 0 && rear == MAX_SIZE - 1) || (front == rear + 1));
}

/*
 * Function: isEmpty
 * Description: Checks if queue is empty
 * Returns: 1 if empty, 0 otherwise
 */
int isEmpty() {
    return (front == -1);
}

/*
 * Function: enqueue
 * Description: Inserts element at rear of circular queue
 * Note: Rear wraps around to 0 when it reaches MAX_SIZE-1
 */
void enqueue() {
    int item;
    
    if (isFull()) {
        printf("\nQueue Overflow! Cannot insert.\n");
        return;
    }
    
    printf("Enter value to insert: ");
    scanf("%d", &item);
    
    // If queue is empty, initialize front and rear
    if (isEmpty()) {
        front = 0;
        rear = 0;
    }
    // If rear is at end, wrap around to beginning
    else if (rear == MAX_SIZE - 1) {
        rear = 0;
    }
    // Normal case, increment rear
    else {
        rear++;
    }
    
    queue[rear] = item;
    printf("Item %d inserted successfully!\n", item);
}

/*
 * Function: dequeue
 * Description: Removes element from front of circular queue
 * Note: Front wraps around to 0 when it reaches MAX_SIZE-1
 */
void dequeue() {
    int item;
    
    if (isEmpty()) {
        printf("\nQueue Underflow! Queue is empty.\n");
        return;
    }
    
    item = queue[front];
    
    // If only one element, reset queue
    if (front == rear) {
        front = -1;
        rear = -1;
    }
    // If front is at end, wrap around to beginning
    else if (front == MAX_SIZE - 1) {
        front = 0;
    }
    // Normal case, increment front
    else {
        front++;
    }
    
    printf("Item %d deleted successfully!\n", item);
}

/*
 * Function: display
 * Description: Displays all elements in circular queue
 */
void display() {
    int i;
    
    if (isEmpty()) {
        printf("\nQueue is empty!\n");
        return;
    }
    
    printf("\nCircular Queue elements: ");
    
    // Case 1: Normal order (front <= rear)
    if (front <= rear) {
        for (i = front; i <= rear; i++) {
            printf("%d ", queue[i]);
        }
    }
    // Case 2: Wrapped around (rear < front)
    else {
        // Print from front to end
        for (i = front; i < MAX_SIZE; i++) {
            printf("%d ", queue[i]);
        }
        // Print from start to rear
        for (i = 0; i <= rear; i++) {
            printf("%d ", queue[i]);
        }
    }
    
    printf("\n(Front: %d, Rear: %d)\n", front, rear);
}
