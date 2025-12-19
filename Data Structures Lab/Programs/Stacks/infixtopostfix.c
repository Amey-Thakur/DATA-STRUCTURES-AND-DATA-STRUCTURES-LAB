/*
 * Program: Infix to Postfix Conversion
 * Description: Converts infix expression to postfix notation using stack
 * Author: Amey Thakur
 * Purpose: Demonstrates operator precedence and expression conversion
 * Note: Works with single-letter variables and single-digit constants
 * Example: A+B*C converts to ABC*+
 */

#include <stdio.h>
#include <stdlib.h>
#include <ctype.h>
#include <string.h>

#define SIZE 100

// Global stack and top pointer
char stack[SIZE];
int top = -1;

// Function prototypes
void push(char item);
char pop();
int isOperator(char symbol);
int precedence(char symbol);
void infixToPostfix(char infix[], char postfix[]);

int main() {
    char infix[SIZE], postfix[SIZE];
    
    printf("=== Infix to Postfix Converter ===\n\n");
    printf("Note: Expression should contain single letter variables and single digit constants only.\n");
    printf("Operators supported: + - * / ^\n");
    printf("Example: A+B*C or (A+B)*C\n\n");
    
    printf("Enter infix expression: ");
    fgets(infix, SIZE, stdin);
    
    // Remove newline if present
    infix[strcspn(infix, "\n")] = 0;
    
    // Convert to postfix
    infixToPostfix(infix, postfix);
    
    printf("\nInfix Expression:   %s\n", infix);
    printf("Postfix Expression: %s\n", postfix);
    
    return 0;
}

/*
 * Function: push
 * Description: Pushes an item onto the stack
 * Parameters: item - Character to push
 */
void push(char item) {
    if (top >= SIZE - 1) {
        printf("\nStack Overflow!\n");
        exit(1);
    }
    
    top++;
    stack[top] = item;
}

/*
 * Function: pop
 * Description: Pops and returns top item from stack
 * Returns: Character popped from stack
 */
char pop() {
    char item;
    
    if(top < 0) {
        printf("\nStack Underflow: Invalid infix expression!\n");
        exit(1);
    }
    
    item = stack[top];
    top--;
    
    return item;
}

/*
 * Function: isOperator
 * Description: Checks if a symbol is an operator
 * Parameters: symbol - Character to check
 * Returns: 1 if operator, 0 if operand
 */
int isOperator(char symbol) {
    if (symbol == '^' || symbol == '*' || symbol == '/' || 
        symbol == '+' || symbol == '-') {
        return 1;
    }
    return 0;
}

/*
 * Function: precedence
 * Description: Returns precedence of operators
 * Parameters: symbol - Operator symbol
 * Returns: Precedence value (higher = more precedence)
 * Note:
 *   ^ (exponent) = 3 (highest)
 *   * / = 2
 *   + - = 1 (lowest)
 */
int precedence(char symbol) {
    if (symbol == '^') {
        return 3;  // Exponent operator, highest precedence
    }
    else if (symbol == '*' || symbol == '/') {
        return 2;
    }
    else if (symbol == '+' || symbol == '-') {
        return 1;  // Lowest precedence
    }
    else {
        return 0;
    }
}

/*
 * Function: infixToPostfix
 * Description: Converts infix expression to postfix notation
 * Parameters:
 *   infix - Input infix expression
 *   postfix - Output postfix expression
 * Algorithm:
 *   1. Scan infix expression from left to right
 *   2. If operand, add to postfix
 *   3. If '(', push to stack
 *   4. If ')', pop until '(' is found
 *   5. If operator, pop higher/equal precedence operators, then push current
 *   6. After scan, pop all remaining operators
 */
void infixToPostfix(char infix[], char postfix[]) {
    int i = 0, j = 0;
    char item, x;
    
    // Add opening parenthesis to stack
    push('(');
    
    // Add closing parenthesis to infix expression
    strcat(infix, ")");
    
    item = infix[i];
    
    printf("\n--- Conversion Process ---\n");
    
    // Scan entire infix expression
    while (item != '\0') {
        
        // If symbol is '(', push it
        if (item == '(') {
            push(item);
            printf("Pushed '%c' onto stack\n", item);
        }
        
        // If operand (digit or letter), add to postfix
        else if (isdigit(item) || isalpha(item)) {
            postfix[j] = item;
            j++;
            printf("Added operand '%c' to postfix\n", item);
        }
        
        // If operator
        else if (isOperator(item)) {
            // Pop operators with higher or equal precedence
            x = pop();
            while (isOperator(x) && precedence(x) >= precedence(item)) {
                postfix[j] = x;
                j++;
                printf("Popped '%c' (higher precedence) to postfix\n", x);
                x = pop();
            }
            
            // Push back the last popped item
            push(x);
            
            // Push current operator
            push(item);
            printf("Pushed operator '%c' onto stack\n", item);
        }
        
        // If closing parenthesis ')'
        else if (item == ')') {
            // Pop until opening parenthesis '(' is found
            x = pop();
            while (x != '(') {
                postfix[j] = x;
                j++;
                printf("Popped '%c' to postfix\n", x);
                x = pop();
            }
            printf("Discarded '('\n");
        }
        
        // Invalid symbol
        else {
            printf("\nInvalid character '%c' in expression!\n", item);
            exit(1);
        }
        
        i++;
        item = infix[i];
    }
    
    // Check for unmatched parentheses
    if (top > 0) {
        printf("\nInvalid infix expression: Unmatched parentheses!\n");
        exit(1);
    }
    
    // Add null terminator
    postfix[j] = '\0';
}
