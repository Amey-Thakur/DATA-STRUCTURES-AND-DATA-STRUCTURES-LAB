/*
 * Program: Deque with Operations at Both Ends (Array Implementation)
 * Description: Array-based deque supporting insert/delete at both front and rear
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 10

// Global variables
int deque[MAX_SIZE];
int front = 0;
int rear = 0;

// Function prototypes
void addRear();
void addFront();
void deleteFront();
void deleteRear();
void display();

int main() {
    int choice;
    
    printf("=== Deque (Both Ends) - Array Implementation ===\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Add at Rear\n");
        printf("2. Add at Front\n");
        printf("3. Delete from Front\n");
        printf("4. Delete from Rear\n");
        printf("5. Display\n");
        printf("6. Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                addRear();
                printf("\nDeque after insertion at rear:\n");
                display();
                break;
            case 2:
                addFront();
                printf("\nDeque after insertion at front:\n");
                display();
                break;
            case 3:
                deleteFront();
                printf("\nDeque after deletion from front:\n");
                display();
                break;
            case 4:
                deleteRear();
                printf("\nDeque after deletion from rear:\n");
                display();
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
 * Function: addRear
 * Description: Inserts element at rear end
 */
void addRear() {
    int value;
    
    if (rear == MAX_SIZE) {
        printf("\nDeque Overflow! Cannot insert at rear.\n");
        return;
    }
    
    printf("Enter value to insert: ");
    scanf("%d", &value);
    
    rear++;
    deque[rear] = value;
    
    // Initialize front if first element
    if (rear == 1 && front == 0) {
        front = 1;
    }
    
    printf("Element %d inserted at rear!\n", value);
}

/*
 * Function: addFront
 * Description: Inserts element at front end
 * Note: Can only insert at front if front > 1
 */
void addFront() {
    int value;
    
    if (front <= 1) {
        printf("\nCannot add at front end! Front is at minimum position.\n");
        return;
    }
    
    printf("Enter value to insert: ");
    scanf("%d", &value);
    
    front--;
    deque[front] = value;
    
    printf("Element %d inserted at front!\n", value);
}

/*
 * Function: deleteFront
 * Description: Removes element from front end
 */
void deleteFront() {
    if (front == 0) {
        printf("\nDeque Underflow! Deque is empty.\n");
        return;
    }
    
    int value = deque[front];
    printf("Deleted element from front: %d\n", value);
    
    // If only one element, reset deque
    if (front == rear) {
        front = 0;
        rear = 0;
    } else {
        front++;
    }
}

/*
 * Function: deleteRear
 * Description: Removes element from rear  end
 */
void deleteRear() {
    if (rear == 0) {
        printf("\nCannot delete from rear! Deque is empty.\n");
        return;
    }
    
    int value = deque[rear];
    
    // If only one element, reset deque
    if (front == rear) {
        front = 0;
        rear = 0;
    } else {
        rear--;
        printf("Deleted element from rear: %d\n", value);
    }
}

/*
 * Function: display
 * Description: Displays all elements in deque
 */
void display() {
    if (front == 0) {
        printf("\nDeque is empty!\n");
        return;
    }
    
    printf("\nDeque elements:\n");
    for (int i = front; i <= rear; i++) {
        printf("%d\n", deque[i]);
    }
    printf("(Front: %d, Rear: %d)\n", front, rear);
}
