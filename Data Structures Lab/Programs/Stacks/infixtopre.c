/*
 * Program: Infix to Prefix Conversion
 * Description: Converts infix expression to prefix notation using stack
 * Author: Amey Thakur
 * Purpose: Demonstrates conversion by reversing and using postfix logic
 * Note: Works with alphanumeric operands and basic operators
 * Example: A+B*C converts to +A*BC
 */

#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define SIZE 50

// Global stack and top pointer
char stack[SIZE];
int top = -1;

// Function prototypes
void push(char element);
char pop();
int precedence(char element);

int main() {
    char infix[50], prefix[50], ch, element;
    int i = 0, k = 0;
    
    printf("=== Infix to Prefix Converter ===\n\n");
    printf("Operators supported: + - * /\n");
    printf("Example: A+B*C or (A+B)*C\n\n");
    
    printf("Enter infix expression: ");
    scanf("%s", infix);
    
    // Push sentinel '#' onto stack
    push('#');
    
    // Reverse the infix expression
    strrev(infix);
    
    printf("\n--- Conversion Process ---\n");
    printf("Reversed infix: %s\n", infix);
    
    // Process each character
    while ((ch = infix[i++]) != '\0') {
        
        // If closing parenthesis (after reversal it becomes opening)
        if (ch == ')') {
            push(ch);
            printf("Pushed ')' onto stack\n");
        }
        
        // If alphanumeric (operand)
        else if (isalnum(ch)) {
            prefix[k++] = ch;
            printf("Added operand '%c' to prefix\n", ch);
        }
        
        // If opening parenthesis (after reversal it becomes closing)
        else if (ch == '(') {
            // Pop until matching ')' is found
            while (stack[top] != ')') {
                prefix[k++] = pop();
            }
            element = pop();  // Remove ')'
            printf("Popped until ')' found\n");
        }
        
        // Operator
        else {
            // Pop operators with higher or equal precedence
            while (precedence(stack[top]) >= precedence(ch)) {
                prefix[k++] = pop();
            }
            push(ch);
            printf("Pushed operator '%c' onto stack\n", ch);
        }
    }
    
    // Pop remaining operators from stack
    while (stack[top] != '#') {
        prefix[k++] = pop();
    }
    
    prefix[k] = '\0';  // Null terminate
    
    // Reverse prefix to get final result
    strrev(prefix);
    
    // Reverse infix back to original
    strrev(infix);
    
    printf("\nInfix Expression:  %s\n", infix);
    printf("Prefix Expression: %s\n", prefix);
    
    return 0;
}

/*
 * Function: push
 * Description: Pushes an element onto stack
 * Parameters: element - Character to push
 */
void push(char element) {
    stack[++top] = element;
}

/*
 * Function: pop
 * Description: Pops and returns top element from stack
 * Returns: Character popped from stack
 */
char pop() {
    return stack[top--];
}

/*
 * Function: precedence
 * Description: Returns precedence of operators
 * Parameters: element - Operator to check
 * Returns: Precedence value
 * Note:
 *   # (sentinel) = 0
 *   ) = 1
 *   + - = 2
 *   * / = 3
 */
int precedence(char element) {
    switch (element) {
        case '#':
            return 0;
        case ')':
            return 1;
        case '+':
        case '-':
            return 2;
        case '*':
        case '/':
            return 3;
        default:
            return 0;
    }
}
