/*
 * Program: Postfix Expression Evaluation
 * Description: Evaluates postfix (Reverse Polish Notation) expressions using stack
 * Example: 5 3 + 2 * → (5+3)*2 = 16
 * Author: Amey Thakur
 * Time Complexity: O(n) where n is length of expression
 */

#include <stdio.h>
#include <conio.h>
#include <stdlib.h>
#include <ctype.h>

#define MAX_SIZE 100

// Stack implementation
int stack[MAX_SIZE];
int top = -1;

// Function prototypes
void push(int value);
int pop();
int isOperator(char ch);
int performOperation(int operand1, int operand2, char operator);
int evaluatePostfix(char* expression);

int main() {
    char expression[MAX_SIZE];
    int result;
    
    printf("=== Postfix Expression Evaluation ===\n\n");
    printf("Enter postfix expression (use spaces between tokens):\n");
    printf("Example: 5 3 + 2 *\n");
    printf("Operators: + - * / \n\n");
    
    gets(expression);
    
    result = evaluatePostfix(expression);
    
    printf("\nResult: %d\n", result);
    
    getch();
    return 0;
}

/*
 * Function: push
 * Description: Pushes value onto stack
 * Parameters: value - Integer to push
 */
void push(int value) {
    if (top >= MAX_SIZE - 1) {
        printf("Stack Overflow!\n");
        exit(1);
    }
    stack[++top] = value;
}

/*
 * Function: pop
 * Description: Pops and returns top value from stack
 * Returns: Top element of stack
 */
int pop() {
    if (top < 0) {
        printf("Stack Underflow!\n");
        exit(1);
    }
    return stack[top--];
}

/*
 * Function: isOperator
 * Description: Checks if character is an operator
 * Returns: 1 if operator, 0 otherwise
 */
int isOperator(char ch) {
    return (ch == '+' || ch == '-' || ch == '*' || ch == '/');
}

/*
 * Function: performOperation
 * Description: Performs arithmetic operation
 * Parameters:
 *   operand1 - First operand
 *   operand2 - Second operand
 *   operator - Operation to perform
 * Returns: Result of operation
 */
int performOperation(int operand1, int operand2, char operator) {
    switch (operator) {
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case '*': return operand1 * operand2;
        case '/': 
            if (operand2 == 0) {
                printf("Error: Division by zero!\n");
                exit(1);
            }
            return operand1 / operand2;
        default:
            printf("Invalid operator: %c\n", operator);
            exit(1);
    }
}

/*
 * Function: evaluatePostfix
 * Description: Evaluates postfix expression
 * Parameters: expression - Postfix expression string
 * Returns: Evaluation result
 * Algorithm:
 *   1. Scan expression left to right
 *   2. If operand, push to stack
 *   3. If operator, pop two operands, compute, push result
 *   4. Final stack value is result
 */
int evaluatePostfix(char* expression) {
    int i = 0;
    int operand1, operand2, result;
    
    printf("\n--- Evaluation Steps ---\n");
    
    while (expression[i] != '\0') {
        // Skip whitespace
        if (expression[i] == ' ') {
            i++;
            continue;
        }
        
        // If operand (digit)
        if (isdigit(expression[i])) {
            int num = 0;
            // Handle multi-digit numbers
            while (isdigit(expression[i])) {
                num = num * 10 + (expression[i] - '0');
                i++;
            }
            push(num);
            printf("  Pushed: %d\n", num);
        }
        // If operator
        else if (isOperator(expression[i])) {
            operand2 = pop();  // Note: popped in reverse order
            operand1 = pop();
            result = performOperation(operand1, operand2, expression[i]);
            push(result);
            printf("  %d %c %d = %d\n", operand1, expression[i], operand2, result);
            i++;
        }
        else {
            i++;
        }
    }
    
    return pop();
}
