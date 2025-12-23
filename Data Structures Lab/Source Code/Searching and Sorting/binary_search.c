/*
 * Program: Binary Search Algorithm
 * Description: Searches for an element in sorted array using binary search
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <conio.h>

#define MAX_SIZE 100

// Function prototypes
int readSortedArray(int arr[]);
int binarySearch(int arr[], int n, int target);
void displayArray(int arr[], int n);

int main() {
    int arr[MAX_SIZE];
    int n, target, result;
    
    printf("=== Binary Search Algorithm ===\n\n");
    
    // Read sorted array
    printf("Enter elements in SORTED order:\n");
    n = readSortedArray(arr);
    
    // Display array
    displayArray(arr, n);
    
    // Get search element
    printf("\nEnter element to search: ");
    scanf("%d", &target);
    
    // Perform binary search
    result = binarySearch(arr, n, target);
    
    // Display result
    if (result != -1) {
        printf("\nElement %d found at index %d (position %d)\n", target, result, result + 1);
    } else {
        printf("\nElement %d not found in array\n", target);
    }
    
    getch();
    return 0;
}

/*
 * Function: readSortedArray
 * Description: Reads sorted array from user
 * Returns: Number of elements
 */
int readSortedArray(int arr[]) {
    int n, i;
    
    printf("Enter number of elements (max %d): ", MAX_SIZE);
    scanf("%d", &n);
    
    if (n > MAX_SIZE || n <= 0) {
        printf("Invalid size! Using default of 5.\n");
        n = 5;
    }
    
    for (i = 0; i < n; i++) {
        printf("  Element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }
    
    return n;
}

/*
 * Function: binarySearch
 * Description: Performs binary search on sorted array
 * Parameters:
 *   arr - Sorted array to search in
 *   n - Number of elements
 *   target - Element to find
 * Returns: Index of element if found, -1 otherwise
 * Algorithm: Repeatedly divides search space in half
 */
int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    int mid;
    
    printf("\n--- Search Process ---\n");
    
    while (left <= right) {
        // Calculate middle index
        mid = left + (right - left) / 2;
        
        printf("Searching in range [%d, %d], middle = %d (value: %d)\n", 
               left, right, mid, arr[mid]);
        
        // Check if target is at mid
        if (arr[mid] == target) {
            return mid;
        }
        
        // If target greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
            printf("  Target > %d, searching right half\n", arr[mid]);
        }
        // If target smaller, ignore right half
        else {
            right = mid - 1;
            printf("  Target < %d, searching left half\n", arr[mid]);
        }
    }
    
    // Element not found
    return -1;
}

/*
 * Function: displayArray
 * Description: Displays array elements
 * Parameters:
 *   arr - Array to display
 *   n - Number of elements
 */
void displayArray(int arr[], int n) {
    int i;
    
    printf("\nArray elements: ");
    for (i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
