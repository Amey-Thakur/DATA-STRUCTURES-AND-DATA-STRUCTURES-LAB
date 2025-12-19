/*
 * Program: Evaluate Prefix Expression
 * Description: Evaluates prefix (Polish Notation) expression using stack
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX 20

// Stack structure
typedef struct stack {
    int data[MAX];
    int top;
} stack;

// Function prototypes
void init(stack* s);
int empty(stack* s);
int full(stack* s);
int pop(stack* s);
void push(stack* s, int value);
int evaluate(char operator, int operand1, int operand2);

int main() {
    stack s;
    char expression[MAX];
    char ch;
    int operand1, operand2, result;
    int i, length;
    
    init(&s);
    
    printf("=== Prefix Expression Evaluator ===\n\n");
    printf("Enter prefix expression (single digit operands only):\n");
    printf("Example: *+593 means (5+9)*3\n");
    printf("Operators: + - * / %%\n");
    printf("Expression: ");
    scanf("%s", expression);
    
    length = strlen(expression);
    
    printf("\n--- Evaluation Process ---\n");
    printf("Scanning from right to left...\n");
    
    // Scan expression from right to left
    for (i = length - 1; i >= 0; i--) {
        ch = expression[i];
        
        // If character is a digit, push it to stack
        if (isdigit(ch)) {
            push(&s, ch - '0');  // Convert ASCII to integer
            printf("Pushed operand: %c\n", ch);
        }
        // If character is an operator
        else {
            // Pop two operands (order is different from postfix!)
            operand1 = pop(&s);  // First operand
            operand2 = pop(&s);  // Second operand
            
            printf("Evaluating: %d %c %d\n", operand1, ch, operand2);
            
            // Evaluate the operation
            result = evaluate(ch, operand1, operand2);
            
            printf("Result: %d\n", result);
            
            // Push result back to stack
            push(&s, result);
        }
    }
    
    // Final result is at top of stack
    result = pop(&s);
    printf("\nFinal value of expression = %d\n", result);
    
    return 0;
}

/*
 * Function: evaluate
 * Description: Performs arithmetic operation based on operator
 * Parameters:
 *   operator - Arithmetic operator (+, -, *, /, %)
 *   operand1 - First operand
 *   operand2 - Second operand
 * Returns: Result of the operation
 */
int evaluate(char operator, int operand1, int operand2) {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if (operand2 == 0) {
                printf("Error: Division by zero!\n");
                return 0;
            }
            return operand1 / operand2;
        case '%':
            return operand1 % operand2;
        default:
            printf("Invalid operator!\n");
            return 0;
    }
}

/*
 * Function: init
 * Description: Initializes the stack
 * Parameters: s - Pointer to stack
 */
void init(stack* s) {
    s->top = -1;  // Empty stack indicated by top = -1
}

/*
 * Function: empty
 * Description: Checks if stack is empty
 * Parameters: s - Pointer to stack
 * Returns: 1 if empty, 0 otherwise
 */
int empty(stack* s) {
    return (s->top == -1);
}

/*
 * Function: full
 * Description: Checks if stack is full
 * Parameters: s - Pointer to stack
 * Returns: 1 if full, 0 otherwise
 */
int full(stack* s) {
    return (s->top == MAX - 1);
}

/*
 * Function: push
 * Description: Pushes a value onto the stack
 * Parameters:
 *   s - Pointer to stack
 *   value - Value to push
 */
void push(stack* s, int value) {
    if (full(s)) {
        printf("Stack overflow!\n");
        return;
    }
    
    s->top++;
    s->data[s->top] = value;
}

/*
 * Function: pop
 * Description: Pops and returns top value from stack
 * Parameters: s - Pointer to stack
 * Returns: Value popped from stack
 */
int pop(stack* s) {
    if (empty(s)) {
        printf("Stack underflow!\n");
        return 0;
    }
    
    int value = s->data[s->top];
    s->top--;
    
    return value;
}
