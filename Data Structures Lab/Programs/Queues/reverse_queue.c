/*
 * Program: Reverse Queue Using Stack
 * Description: Reverses the order of elements in a queue using an auxiliary stack
 * Author: Amey Thakur
 * Purpose: Demonstrates queue reversal algorithm using LIFO property of stack
 */

#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100

// Stack structure
typedef struct {
    int* array;
    int top;
    int capacity;
} Stack;

// Queue structure
typedef struct {
    int* array;
    int front;
    int rear;
    int capacity;
} Queue;

// Function prototypes - Stack
Stack* createStack(int capacity);
void push(Stack* s, int value);
int pop(Stack* s);
int isStackEmpty(Stack* s);

// Function prototypes - Queue  
Queue* createQueue(int capacity);
void enqueue(Queue* q, int value);
int dequeue(Queue* q);
int isQueueEmpty(Queue* q);
void displayQueue(Queue* q);
void reverseQueue(Queue* q, Stack* s);

int main() {
    int capacity, choice, value;
    Queue* q;
    Stack* s;
    
    printf("=== Reverse Queue Using Stack ===\n");
    printf("Enter maximum capacity: ");
    scanf("%d", &capacity);
    
    q = createQueue(capacity);
    s = createStack(capacity);
    
    while (1) {
        printf("\n--- Menu ---\n");
        printf("1. Insert Element\n");
        printf("2. Display Queue\n");
        printf("3. Reverse Queue\n");
        printf("4. Exit\n");
        printf("Enter choice: ");
        scanf("%d", &choice);
        
        switch (choice) {
            case 1:
                printf("Enter value: ");
                scanf("%d", &value);
                enqueue(q, value);
                break;
            case 2:
                printf("\nCurrent Queue: ");
                displayQueue(q);
                break;
            case 3:
                printf("\nOriginal Queue: ");
                displayQueue(q);
                reverseQueue(q, s);
                printf("Reversed Queue: ");
                displayQueue(q);
                break;
            case 4:
                free(q->array);
                free(q);
                free(s->array);
                free(s);
                printf("Exiting...\n");
                exit(0);
            default:
                printf("Invalid choice!\n");
        }
    }
    
    return 0;
}

// Stack implementations
Stack* createStack(int capacity) {
    Stack* s = (Stack*)malloc(sizeof(Stack));
    s->capacity = capacity;
    s->top = -1;
    s->array = (int*)malloc(capacity * sizeof(int));
    return s;
}

void push(Stack* s, int value) {
    s->array[++s->top] = value;
}

int pop(Stack* s) {
    return s->array[s->top--];
}

int isStackEmpty(Stack* s) {
    return s->top == -1;
}

// Queue implementations
Queue* createQueue(int capacity) {
    Queue* q = (Queue*)malloc(sizeof(Queue));
    q->capacity = capacity;
    q->front = -1;
    q->rear = -1;
    q->array = (int*)malloc(capacity * sizeof(int));
    return q;
}

void enqueue(Queue* q, int value) {
    if (q->rear == q->capacity - 1) {
        printf("Queue Overflow!\n");
        return;
    }
    
    q->array[++q->rear] = value;
    if (q->front == -1) {
        q->front = 0;
    }
    printf("Element %d enqueued!\n", value);
}

int dequeue(Queue* q) {
    if (isQueueEmpty(q)) {
        return -1;
    }
    
    int value = q->array[q->front++];
    if (q->front > q->rear) {
        q->front = q->rear = -1;
    }
    return value;
}

int isQueueEmpty(Queue* q) {
    return q->front == -1;
}

void displayQueue(Queue* q) {
    if (isQueueEmpty(q)) {
        printf("Queue is empty!\n");
        return;
    }
    
    for (int i = q->front; i <= q->rear; i++) {
        printf("%d ", q->array[i]);
    }
    printf("\n");
}

/*
 * Function: reverseQueue
 * Description: Reverses queue using stack
 * Algorithm:
 *   1. Dequeue all elements from queue and push to stack
 *   2. Pop all elements from stack and enqueue back to queue
 * This works because stack is LIFO and queue is FIFO
 */
void reverseQueue(Queue* q, Stack* s) {
    int temp;
    
    // Step 1: Transfer all elements from queue to stack
    while (!isQueueEmpty(q)) {
        temp = dequeue(q);
        push(s, temp);
    }
    
    // Reset queue
    q->front = -1;
    q->rear = -1;
    
    // Step 2: Transfer all elements from stack back to queue
    while (!isStackEmpty(s)) {
        temp = pop(s);
        enqueue(q, temp);
    }
    
    printf("\nQueue reversed successfully!\n");
}
