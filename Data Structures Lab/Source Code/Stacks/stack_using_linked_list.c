/*
 * Program: Stack Implementation Using Linked List
 * Description: Implements stack operations using linked list (dynamic memory)
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <stdlib.h>
#include <conio.h>

// Node structure
struct Node {
    int value;
    struct Node* next;
};

// Global top pointer
struct Node* top = NULL;

// Function prototypes
void push();
void pop();
void display();
void freeStack();

int main() {
    int choice;
    
    printf("=== Stack Using Linked List ===\n");
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Push\n");
        printf("2. Pop\n");
        printf("3. Display\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                push();
                break;
            case 2:
                pop();
                break;
            case 3:
                display();
                break;
            case 4:
                freeStack();
                printf("\nExiting...\n");
                exit(0);
            default:
                printf("\nInvalid choice! Please enter 1-4.\n");
        }
    }
    
    return 0;
}

/*
 * Function: push
 * Description: Pushes a new element onto the stack
 * Note: Creates new node using malloc - no size limit
 */
void push() {
    int value;
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    
    if (newNode == NULL) {
        printf("\nCannot push element: Memory allocation failed!\n");
        return;
    }
    
    printf("\nEnter value to push: ");
    scanf("%d", &value);
    
    // Set node data
    newNode->value = value;
    
    // If stack is empty
    if (top == NULL) {
        newNode->next = NULL;
        top = newNode;
    }
    // If stack has elements
    else {
        newNode->next = top;
        top = newNode;
    }
    
    printf("Item %d pushed successfully!\n", value);
}

/*
 * Function: pop
 * Description: Removes and returns top element from stack
 */
void pop() {
    struct Node* temp;
    int poppedValue;
    
    // Check if stack is empty
    if (top == NULL) {
        printf("\nStack Underflow! Stack is empty.\n");
        return;
    }
    
    poppedValue = top->value;
    temp = top;
    top = top->next;
    
    // Free the popped node
    free(temp);
    
    printf("\nItem popped = %d\n", poppedValue);
}

/*
 * Function: display
 * Description: Displays all elements in the stack from top to bottom
 */
void display() {
    struct Node* current;
    
    if (top == NULL) {
        printf("\nStack is empty!\n");
        return;
    }
    
    printf("\nStack elements (top to bottom):\n");
    current = top;
    
    while (current != NULL) {
        printf("  %d\n", current->value);
        current = current->next;
    }
}

/*
 * Function: freeStack
 * Description: Frees all allocated memory in the stack
 */
void freeStack() {
    struct Node* current = top;
    struct Node* next;
    
    while (current != NULL) {
        next = current->next;
        free(current);
        current = next;
    }
    
    top = NULL;
}
