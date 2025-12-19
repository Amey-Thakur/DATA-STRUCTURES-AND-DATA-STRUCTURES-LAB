/*
 * Program: Quick Sort Algorithm
 * Description: Sorts an array using quick sort (partition-exchange) technique
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <conio.h>

#define MAX_SIZE 100

// Function prototypes
int readArray(int arr[]);
void quickSort(int arr[], int low, int high);
int partition(int arr[], int low, int high);
void swap(int* a, int* b);
void displayArray(int arr[], int n, const char* message);

int main() {
    int arr[MAX_SIZE];
    int n;
    
    printf("=== Quick Sort Algorithm ===\n\n");
    
    // Read input array
    n = readArray(arr);
    
    // Display original array
    displayArray(arr, n, "Original Array");
    
    // Perform quick sort
    quickSort(arr, 0, n - 1);
    
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
 * Function: quickSort
 * Description: Recursively sorts array using quick sort algorithm
 * Parameters:
 *   arr - Array to sort
 *   low - Starting index
 *   high - Ending index
 * Algorithm:
 *   1. Select pivot element
 *   2. Partition array around pivot
 *   3. Recursively sort subarrays on both sides of pivot
 */
void quickSort(int arr[], int low, int high) {
    if (low < high) {
        // Partition array and get pivot index
        int pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after partition
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

/*
 * Function: partition
 * Description: Partitions array around pivot element
 * Parameters:
 *   arr - Array to partition
 *   low - Starting index
 *   high - Ending index
 * Returns: Final position of pivot
 * Algorithm:
 *   - Choose first element as pivot
 *   - Rearrange so elements smaller than pivot are on left
 *   - Elements greater than pivot are on right
 */
int partition(int arr[], int low, int high) {
    int pivot = arr[low];  // Choose first element as pivot
    int i = low;
    int j = high;
    
    while (i < j) {
        // Find element greater than pivot from left
        while (arr[i] <= pivot && i < high) {
            i++;
        }
        
        // Find element smaller than pivot from right
        while (arr[j] > pivot) {
            j--;
        }
        
        // Swap if pointers haven't crossed
        if (i < j) {
            swap(&arr[i], &arr[j]);
        }
    }
    
    // Place pivot in correct position
    swap(&arr[low], &arr[j]);
    
    return j;
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
