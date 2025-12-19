/*
 * Program: Character Replacement
 * Description: Replaces all occurrences of a character with another in a string
 * Author: Amey Thakur
 * Purpose: Demonstrates string manipulation and character replacement
 */

#include <stdio.h>
#include <conio.h>

#define MAX_LENGTH 100  // Maximum string length

// Function prototypes
void replaceCharacter(char* str, char oldChar, char newChar);
void displayResults(char* original, char* modified, char oldChar, char newChar, int count);

int main() {
    char str[MAX_LENGTH];   // Input string
    char oldChar;           // Character to be replaced
    char newChar;           // Replacement character
    char originalCopy[MAX_LENGTH];  // Copy of original string
    int i, count = 0;
    
    // Read input string
    printf("Enter a string: ");
    fgets(str, MAX_LENGTH, stdin);
    str[strcspn(str, "\n")] = '\0';  // Remove newline
    
    // Save original string for display
    strcpy(originalCopy, str);
    
    // Read character to be replaced
    printf("Enter the character to be replaced: ");
    scanf("%c", &oldChar);
    
    // Read replacement character
    printf("Enter the replacement character: ");
    scanf(" %c", &newChar);  // Space before %c to skip whitespace
    
    // Count occurrences before replacement
    for (i = 0; str[i] != '\0'; i++) {
        if (str[i] == oldChar) {
            count++;
        }
    }
    
    // Perform replacement
    replaceCharacter(str, oldChar, newChar);
    
    // Display results
    displayResults(originalCopy, str, oldChar, newChar, count);
    
    getch();
    return 0;
}

/*
 * Function: replaceCharacter
 * Description: Replaces all occurrences of oldChar with newChar in string
 * Parameters:
 *   str - String to modify
 *   oldChar - Character to be replaced
 *   newChar - Replacement character
 */
void replaceCharacter(char* str, char oldChar, char newChar) {
    int i = 0;
    
    // Traverse string and replace characters
    while (str[i] != '\0') {
        if (str[i] == oldChar) {
            str[i] = newChar;
        }
        i++;
    }
}

/*
 * Function: displayResults
 * Description: Displays original and modified strings
 * Parameters:
 *   original - Original string
 *   modified - Modified string after replacement
 *   oldChar - Character that was replaced
 *   newChar - Replacement character
 *   count - Number of replacements made
 */
void displayResults(char* original, char* modified, char oldChar, char newChar, int count) {
    printf("\n--- Results ---\n");
    printf("Original string:  \"%s\"\n", original);
    printf("Modified string:  \"%s\"\n", modified);
    printf("\nReplaced '%c' with '%c'\n", oldChar, newChar);
    printf("Total replacements: %d\n", count);
}
