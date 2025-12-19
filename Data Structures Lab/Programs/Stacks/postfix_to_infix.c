/*
 * Program: Postfix to Infix Conversion
 * Description: Converts postfix expression to infix notation using stack
 * Author: Amey Thakur
 * Purpose: Demonstrates conversion using string stack
 * Example: AB+C* converts to (A+B)*C
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 20

// Global stack variables
char stack[MAX][MAX];  // Stack of strings
int top = -1;

// Function prototypes
void push(char str[]);
void pop(char str[]);
int isOperator(char ch);
void postfixToInfix(char postfix[], char infix[]);

int main() {
    char postfix[MAX], infix[MAX];
    
    printf("=== Postfix to Infix Converter ===\n\n");
    printf("Operators supported: + - * /\n");
    printf("Example: AB+ (means A+B)\n");
    printf("Example: AB+C* (means (A+B)*C)\n\n");
    
    printf("Enter postfix expression: ");
    scanf("%s", postfix);
    
    // Convert to infix
    postfixToInfix(postfix, infix);
    
    printf("\nPostfix Expression: %s\n", postfix);
    printf("Infix Expression:   %s\n", infix);
    
    return 0;
}

/*
 * Function: push
 * Description: Pushes a string onto the stack
 * Parameters: str - String to push
 */
void push(char str[]) {
    if (top >= MAX - 1) {
        printf("Stack overflow!\n");
        exit(1);
    }
    
    strcpy(stack[++top], str);
}

/*
 * Function: pop
 * Description: Pops and returns top string from stack
 * Parameters: str - Buffer to store popped string
 */
void pop(char str[]) {
    if (top < 0) {
        printf("Stack underflow!\n");
        exit(1);
    }
    
    strcpy(str, stack[top--]);
}

/*
 * Function: isOperator
 * Description: Checks if character is an operator
 * Parameters: ch - Character to check
 * Returns: 1 if operator, 0 otherwise
 */
int isOperator(char ch) {
    return (ch == '+' || ch == '-' || ch == '*' || ch == '/');
}

/*
 * Function: postfixToInfix
 * Description: Converts postfix expression to infix
 * Parameters:
 *   postfix - Input postfix expression
 *   infix - Output infix expression
 * Algorithm:
 *   - Scan postfix from left to right
 *   - If operand, push to stack
 *   - If operator, pop two operands, combine as (operand1 operator operand2), push back
 */
void postfixToInfix(char postfix[], char infix[]) {
    char operand1[MAX], operand2[MAX], temp[MAX];
    char op[2];
    int i = 0;
    
    op[1] = '\0';  // Null terminate operator string
    
    printf("\n--- Conversion Process ---\n");
    
    while (postfix[i] != '\0') {
        
        // If operand (letter or digit), push it
        if (!isOperator(postfix[i])) {
            op[0] = postfix[i];
            push(op);
            printf("Pushed operand: %c\n", postfix[i]);
        }
        
        // If operator
        else {
            // Pop two operands
            pop(operand2);  // Second operand (top)
            pop(operand1);  // First operand
            
            // Create infix expression: (operand1 operator operand2)
            strcpy(temp, "(");
            strcat(temp, operand1);
            op[0] = postfix[i];
            strcat(temp, op);
            strcat(temp, operand2);
            strcat(temp, ")");
            
            printf("Combined: %s\n", temp);
            
            // Push result back to stack
            push(temp);
        }
        
        i++;
    }
    
    // Final result is on stack
    pop(infix);
}
