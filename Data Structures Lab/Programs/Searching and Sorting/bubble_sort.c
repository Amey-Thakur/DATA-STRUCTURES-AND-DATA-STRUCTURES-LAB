/*
 * Program: Bubble Sort Algorithm
 * Description: Sorts an array using bubble sort technique
 * Author: Amey Thakur
 * Purpose: Demonstrates comparison-based sorting algorithm
 * Time Complexity: O(n²) worst and average case, O(n) best case
 * Space Complexity: O(1)
 */

#include <stdio.h>
#include <conio.h>

#define MAX_SIZE 100

// Function prototypes
int readArray(int arr[]);
void bubbleSort(int arr[], int n);
void displayArray(int arr[], int n, const char* message);
void swap(int* a, int* b);

int main() {
    int arr[MAX_SIZE];
    int n;
    
    printf("=== Bubble Sort Algorithm ===\n\n");
    
    // Read input array
    n = readArray(arr);
    
    // Display original array
    displayArray(arr, n, "Original Array");
    
    // Perform bubble sort
    bubbleSort(arr, n);
    
    // Display sorted array
    displayArray(arr, n, "Sorted Array");
    
    getch();
    return 0;
}

/*
 * Function: readArray
 * Description: Reads array elements from user
 * Returns: Number of elements read
 */
int readArray(int arr[]) {
    int n, i;
    
    printf("Enter number of elements (max %d): ", MAX_SIZE);
    scanf("%d", &n);
    
    if (n > MAX_SIZE || n <= 0) {
        printf("Invalid size! Using default of 5.\n");
        n = 5;
    }
    
    printf("Enter %d elements:\n", n);
    for (i = 0; i < n; i++) {
        printf("  Element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }
    
    return n;
}

/*
 * Function: bubbleSort
 * Description: Sorts array in ascending order using bubble sort algorithm
 * Parameters:
 *   arr - Array to sort
 *   n - Number of elements
 * Algorithm: Repeatedly compares adjacent elements and swaps if in wrong order
 */
void bubbleSort(int arr[], int n) {
    int i, j;
    int swapped;  // Flag to optimize when array is sorted
    
    printf("\n--- Sorting Process---\n");
    
    for (i = 0; i < n - 1; i++) {
        swapped = 0;
        
        // Last i elements are already sorted
        for (j = 0; j < n - i - 1; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = 1;
            }
        }
        
        // If no swaps occurred, array is sorted
        if (swapped == 0) {
            printf("Array sorted after %d pass(es)\n", i + 1);            break;
        }
    }
}

/*
 * Function: swap
 * Description: Swaps two integer values
 * Parameters: a, b - Pointers to integers to swap
 */
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

/*
 * Function: displayArray
 * Description: Displays array elements with a message
 * Parameters:
 *   arr - Array to display
 *   n - Number of elements
 *   message - Description message
 */
void displayArray(int arr[], int n, const char* message) {
    int i;
    
    printf("\n%s: ", message);
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
