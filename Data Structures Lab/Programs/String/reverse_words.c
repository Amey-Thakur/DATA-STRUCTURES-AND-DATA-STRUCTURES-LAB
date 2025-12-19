/*
 * Program: Reverse Words in String
 * Description: Reverses the order of words in a sentence
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <string.h>

#define MAX_LENGTH 100  // Maximum string length

// Function prototypes
void reverseWords(char* str, char* rev);
void displayResults(char* original, char* reversed);

int main() {
    char str[MAX_LENGTH];      // Original string
    char rev[MAX_LENGTH];      // Reversed words string
    
    // Read input string
    printf("Enter a string: ");
    fgets(str, MAX_LENGTH, stdin);
    
    // Remove newline character added by fgets
    str[strcspn(str, "\n")] = '\0';
    
    // Reverse the words
    reverseWords(str, rev);
    
    // Display results
    displayResults(str, rev);
    
    return 0;
}

/*
 * Function: reverseWords
 * Description: Reverses the order of words in a string
 * Parameters:
 *   str - Original string
 *   rev - String to store reversed words
 * Algorithm: Traverses string from right to left, identifying words 
 *            by spaces and copying them to result in reversed order
 */
void reverseWords(char* str, char* rev) {
    int len = strlen(str);
    int wordStart = len - 1;  // Start of current word (from right)
    int wordEnd = len - 1;    // End of current word
    int revIndex = 0;          // Index in reversed string
    int i;
    
    // Traverse string from right to left
    while (wordStart > 0) {
        // Find start of current word (stop at space)
        if (str[wordStart] == ' ') {
            // Copy word to reversed string
            i = wordStart + 1;
            while (i <= wordEnd) {
                rev[revIndex++] = str[i++];
            }
            
            // Add space after word
            rev[revIndex++] = ' ';
            
            // Update word end position
            wordEnd = wordStart - 1;
        }
        
        wordStart--;
    }
    
    // Copy the first word (from index 0 to wordEnd)
    for (i = 0; i <= wordEnd; i++) {
        rev[revIndex++] = str[i];
    }
    
    // Null terminate the reversed string
    rev[revIndex] = '\0';
}

/*
 * Function: displayResults
 * Description: Displays original and reversed strings
 * Parameters:
 *   original - Original string
 *   reversed - Reversed words string
 */
void displayResults(char* original, char* reversed) {
    printf("\n--- Results ---\n");
    printf("Original string:\n  %s\n\n", original);
    printf("Reversed words:\n  %s\n", reversed);
}
