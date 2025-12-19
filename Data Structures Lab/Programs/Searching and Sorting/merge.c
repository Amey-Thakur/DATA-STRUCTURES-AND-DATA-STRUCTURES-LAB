/*
 * Program: Merge Sort Algorithm
 * Description: Sorts an array using divide-and-conquer merge sort technique
 * Author: Amey Thakur
 * Purpose: Demonstrates efficient recursive sorting algorithm
 * Time Complexity: O(n log n) in all cases
 * Space Complexity: O(n)
 */

#include <stdio.h>
#include <conio.h>

#define MAX_SIZE 50

// Function prototypes
int readArray(int arr[]);
void mergeSort(int arr[], int left, int right);
void merge(int arr[], int left, int mid, int right);
void displayArray(int arr[], int n, const char* message);

int main() {
    int arr[MAX_SIZE];
    int n;
    
    printf("=== Merge Sort Algorithm ===\n\n");
    
    // Read input array
    n = readArray(arr);
    
    // Display original array
    displayArray(arr, n, "Original Array");
    
    // Perform merge sort
    mergeSort(arr, 0, n - 1);
    
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
 * Function: mergeSort
 * Description: Recursively divides array and sorts using merge
 * Parameters:
 *   arr - Array to sort
 *   left - Starting index
 *   right - Ending index
 * Algorithm:
 *   1. Divide array into two halves
 *   2. Recursively sort both halves
 *   3. Merge the sorted halves
 */
void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        
        // Sort first half
        mergeSort(arr, left, mid);
        
        // Sort second half
        mergeSort(arr, mid + 1, right);
        
        // Merge the sorted halves
        merge(arr, left, mid, right);
    }
}

/*
 * Function: merge
 * Description: Merges two sorted subarrays into one sorted array
 * Parameters:
 *   arr - Array containing both subarrays
 *   left - Starting index of first subarray
 *   mid - Ending index of first subarray
 *   right - Ending index of second subarray
 * Algorithm: Compares elements from both subarrays and places them in order
 */
void merge(int arr[], int left, int mid, int right) {
    int i, j, k;
    int temp[MAX_SIZE];
    
    i = left;      // Starting index of left subarray
    j = mid + 1;   // Starting index of right subarray
    k = left;      // Starting index of temp array
    
    // Merge the two subarrays into temp
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k] = arr[i];
            i++;
        } else {
            temp[k] = arr[j];
            j++;
        }
        k++;
    }
    
    // Copy remaining elements from left subarray, if any
    while (i <= mid) {
        temp[k] = arr[i];
        i++;
        k++;
    }
    
    // Copy remaining elements from right subarray, if any
    while (j <= right) {
        temp[k] = arr[j];
        j++;
        k++;
    }
    
    // Copy merged elements back to original array
    for (k = left; k <= right; k++) {
        arr[k] = temp[k];
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
