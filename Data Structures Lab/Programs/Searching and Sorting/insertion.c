/*
 * Program: Insertion Sort Algorithm
 * Description: Sorts an array using insertion sort technique
 * Author: Amey Thakur
 * Purpose: Demonstrates insertion sort by inserting each element in its correct position
 * Time Complexity: O(n²) worst case, O(n) best case
 * Space Complexity: O(1)
 */

#include <stdio.h>
#include <conio.h>

#define MAX_SIZE 100

// Function prototypes
int readArray(int arr[]);
void insertionSort(int arr[], int n);
void displayArray(int arr[], int n, const char* message);

int main() {
    int arr[MAX_SIZE];
    int n;
    
    printf("=== Insertion Sort Algorithm ===\n\n");
    
    // Read input array
    n = readArray(arr);
    
    // Display original array
    displayArray(arr, n, "Original Array");
    
    // Perform insertion sort
    insertionSort(arr, n);
    
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
 * Function: insertionSort
 * Description: Sorts array using insertion sort algorithm
 * Parameters:
 *   arr - Array to sort
 *   n - Number of elements
 * Algorithm: 
 *   - Builds sorted array one element at a time
 *   - Takes each element and inserts it in correct position in sorted portion
 */
void insertionSort(int arr[], int n) {
    int i, j, key;
    
    printf("\n--- Sorting Process ---\n");
    
    // Start from second element (first element is already "sorted")
    for (i = 1; i < n; i++) {
        key = arr[i];  // Element to be inserted
        j = i - 1;
        
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert key at correct position
        arr[j + 1] = key;
        
        printf("Pass %d: ", i);
        for (int k = 0; k < n; k++) {
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
