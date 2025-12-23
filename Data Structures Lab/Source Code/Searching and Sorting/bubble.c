/*
 * Program: Bubble Sort (Alternative Implementation)
 * Description: Sorts an array using bubble sort with reverse iteration
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <conio.h>

#define MAX_SIZE 30

// Function prototypes
int readArray(int arr[]);
void bubbleSort(int arr[], int count);
void displayArray(int arr[], int count, const char* message);

int main() {
    int numbers[MAX_SIZE];
    int count;
    
    printf("=== Bubble Sort (Alternative Implementation) ===\n\n");
    
    // Read array from user
    count = readArray(numbers);
    
    // Display original array
    displayArray(numbers, count, "Original elements");
    
    // Perform bubble sort
    bubbleSort(numbers, count);
    
    // Display sorted array
    displayArray(numbers, count, "Sorted elements");
    
    getch();
    return 0;
}

/*
 * Function: readArray
 * Description: Reads array elements from user input
 * Parameters: arr - Array to store elements
 * Returns: Number of elements entered
 */
int readArray(int arr[]) {
    int count, i;
    
    printf("How many numbers are you going to enter? (max %d): ", MAX_SIZE);
    scanf("%d", &count);
    
    // Validate count
    if (count > MAX_SIZE || count <= 0) {
        printf("Invalid count! Using default of 5.\n");
        count = 5;
    }
    
    printf("\nEnter %d numbers:\n", count);
    for (i = 0; i < count; i++) {
        printf("  Number %d: ", i + 1);
        scanf("%d", &arr[i]);
    }
    
    return count;
}

/*
 * Function: bubbleSort
 * Description: Sorts array in ascending order using bubble sort
 * Parameters:
 *   arr - Array to sort
 *   count - Number of elements
 * Algorithm:
 *   - Uses reverse outer loop (count-2 down to 0)
 *   - Compares adjacent elements
 *   - Swaps if they are in wrong order
 *   - After each pass, largest unsorted element moves to its final position
 */
void bubbleSort(int arr[], int count) {
    int i, j, temp;
    
    printf("\n--- Sorting Process ---\n");
    
    // Outer loop: runs from count-2 down to 0
    // Each iteration fixes one element at the end
    for (i = count - 2; i >= 0; i--) {
        
        // Inner loop: compare adjacent elements
        // j goes from 0 to i (unsorted portion)
        for (j = 0; j <= i; j++) {
            
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap if they are in wrong order
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        
        // Display array after each pass
        printf("After pass %d: ", count - 1 - i);
        for (int k = 0; k < count; k++) {
            printf("%d ", arr[k]);
        }
        printf("\n");
    }
}

/*
 * Function: displayArray
 * Description: Displays array elements with a message
 * Parameters:
 *   arr - Array to display
 *   count - Number of elements
 *   message - Description message
 */
void displayArray(int arr[], int count, const char* message) {
    int i;
    
    printf("\n%s: ", message);
    for (i = 0; i < count; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
