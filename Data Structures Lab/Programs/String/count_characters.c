/*
 * Program: Character Type Counter
 * Description: Counts different types of characters in a string:
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <conio.h>

#define MAX_LENGTH 100  // Maximum string length

// Function prototypes
void countCharacterTypes(char* str, int* numbers, int* uppercase, 
                         int* lowercase, int* special);
void displayCounts(int numbers, int uppercase, int lowercase, int special);

int main() {
    char str[MAX_LENGTH];  // Input string
    int numbers = 0;       // Count of numeric characters
    int uppercase = 0;     // Count of uppercase letters
    int lowercase = 0;     // Count of lowercase letters
    int special = 0;       // Count of special characters
    
    // Read input string
    printf("Enter a string: ");
    scanf("%s", str);
    
    // Count different character types
    countCharacterTypes(str, &numbers, &uppercase, &lowercase, &special);
    
    // Display results
    displayCounts(numbers, uppercase, lowercase, special);
    
    getch();
    return 0;
}

/*
 * Function: countCharacterTypes
 * Description: Counts different types of characters in a string
 * Parameters:
 *   str - Input string
 *   numbers - Pointer to store count of numeric characters
 *   uppercase - Pointer to store count of uppercase letters
 *   lowercase - Pointer to store count of lowercase letters
 *   special - Pointer to store count of special characters
 * ASCII Ranges:
 *   Numbers: 48-57 (0-9)
 *   Uppercase: 65-90 (A-Z)
 *   Lowercase: 97-122 (a-z)
 */
void countCharacterTypes(char* str, int* numbers, int* uppercase, 
                         int* lowercase, int* special) {
    int i = 0;
    
    // Traverse entire string
    while (str[i] != '\0') {
        // Check if character is a number (ASCII 48-57)
        if (str[i] >= '0' && str[i] <= '9') {
            (*numbers)++;
        }
        // Check if character is uppercase (ASCII 65-90)
        else if (str[i] >= 'A' && str[i] <= 'Z') {
            (*uppercase)++;
        }
        // Check if character is lowercase (ASCII 97-122)
        else if (str[i] >= 'a' && str[i] <= 'z') {
            (*lowercase)++;
        }
        // Everything else is a special character
        else {
            (*special)++;
        }
        
        i++;
    }
}

/*
 * Function: displayCounts
 * Description: Displays counts of different character types
 * Parameters:
 *   numbers - Count of numeric characters
 *   uppercase - Count of uppercase letters
 *   lowercase - Count of lowercase letters
 *   special - Count of special characters
 */
void displayCounts(int numbers, int uppercase, int lowercase, int special) {
    printf("\n--- Character Type Analysis ---\n");
    printf("Numbers:             %d\n", numbers);
    printf("Uppercase Letters:   %d\n", uppercase);
    printf("Lowercase Letters:   %d\n", lowercase);
    printf("Special Characters:  %d\n", special);
    printf("Total:               %d\n", numbers + uppercase + lowercase + special);
}
