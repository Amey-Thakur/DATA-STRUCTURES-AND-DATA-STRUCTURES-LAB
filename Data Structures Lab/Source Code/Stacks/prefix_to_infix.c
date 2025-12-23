/*
 * Program: Prefix to Infix Conversion
 * Description: Converts prefix expression to infix notation using string stack
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <string.h>

#define MAX 30

// Global stack for strings
char stack[MAX][MAX];
int top = -1;

// Function prototypes
void push(char str[]);
void pop(char str[]);
int isOperator(char ch);
void prefixToInfix(char prefix[], char infix[]);

int main() {
    // Example: +-*^ABCD//EF+GH  means  A^B*C-D+E/F/G+H
    char prefix[MAX] = "+-*^ABCD//EF+GH";
    char infix[MAX];
    
    printf("=== Prefix to Infix Converter ===\n\n");
    printf("Operators supported: + - * / ^\n");
    printf("Example: +AB means A+B\n");
    printf("Example: *+ABC means (A+B)*C\n\n");
    
    // Convert to infix
    prefixToInfix(prefix, infix);
    
    printf("Input Prefix Expression:  %s\n", prefix);
    printf("Output Infix Expression:  %s\n", infix);
    
    return 0;
}

/*
 * Function: push
 * Description: Pushes a string onto the stack
 * Parameters: str - String to push
 */
void push(char str[]) {
    if (top < MAX - 1) {
        strcpy(stack[++top], str);
    } else {
        printf("Stack overflow: May be invalid prefix expression\n");
    }
}

/*
 * Function: pop
 * Description: Pops and returns top string from stack
 * Parameters: str - Buffer to store popped string
 */
void pop(char str[]) {
    if (top >= 0) {
        strcpy(str, stack[top--]);
    } else {
        printf("Stack underflow: May be invalid prefix expression\n");
    }
}

/*
 * Function: isOperator
 * Description: Checks if character is an operator
 * Parameters: ch - Character to check
 * Returns: 1 if operator, 0 otherwise
 */
int isOperator(char ch) {
    return (ch == '+' || ch == '-' || ch == '*' || ch == '/' || ch == '^');
}

/*
 * Function: prefixToInfix
 * Description: Converts prefix expression to infix notation
 * Parameters:
 *   prefix - Input prefix expression
 *   infix - Output infix expression
 * Algorithm:
 *   - Scan prefix from RIGHT to LEFT
 *   - If operand, push to stack
 *   - If operator, pop two operands, combine as (operand1 operator operand2), push back
 */
void prefixToInfix(char prefix[], char infix[]) {
    char op[2];            // Operator string
    char popped1[MAX];     // First popped operand
    char popped2[MAX];     // Second popped operand
    char temp[MAX];        // Temporary string for combination
    int i = strlen(prefix);
    
    op[1] = '\0';  // Null terminate operator string
    
    printf("--- Conversion Process ---\n");
    printf("Scanning from right to left...\n");
    
    // Scan from right to left
    while (--i != -1) {
        
        // Skip spaces
        if (prefix[i] == ' ') {
            continue;
        }
        
        // If operator
        if (isOperator(prefix[i])) {
            // Pop two operands
            pop(popped1);
            pop(popped2);
            
            // Create infix: (popped1 operator popped2)
            op[0] = prefix[i];  // Operator
            strcpy(temp, "(");
            strcat(temp, popped1);
            strcat(temp, op);
            strcat(temp, popped2);
            strcat(temp, ")");
            
            printf("Combined: %s\n", temp);
            
            // Push result back to stack
            push(temp);
        }
        
        // If operand
        else {
            op[0] = prefix[i];  // Operand
            push(op);
            printf("Pushed operand: %c\n", prefix[i]);
        }
    }
    
    // Final result is on stack
    pop(infix);
}
