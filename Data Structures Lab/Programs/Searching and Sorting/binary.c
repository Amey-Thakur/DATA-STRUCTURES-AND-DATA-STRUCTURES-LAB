/*
 * Program: Binary Search (Alternative Implementation)
 * Description: Searches for an element in sorted array using binary search
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <conio.h>

#define MAX_SIZE 100

// Function prototypes
int binarySearch(int arr[], int target, int size);
void displayArray(int arr[], int size);

int main() {
    int arr[MAX_SIZE];
    int size, target, result, i;
    
    printf("=== Binary Search (Alternative Implementation) ===\n\n");
    
    // Input array size
    printf("Enter the size of array (Max %d): ", MAX_SIZE);
    scanf("%d", &size);
    
    // Validate size
    if (size > MAX_SIZE || size <= 0) {
        printf("Invalid size! Using default of 5.\n");
        size = 5;
    }
    
    // Input array elements (must be sorted)
    printf("\nEnter %d elements in SORTED order:\n", size);
    for (i = 0; i < size; i++) {
        printf("  Element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }
    
    // Display the array
    displayArray(arr, size);
    
    // Input element to search
    printf("\nEnter element to search: ");
    scanf("%d", &target);
    
    // Perform binary search
    result = binarySearch(arr, target, size);
    
    // Display result
    if (result == -1) {
        printf("\nNumber %d is not found in the array\n", target);
    } else {
        printf("\nNumber %d is found at position %d\n", target, result);
    }
    
    getch();
    return 0;
}

/*
 * Function: binarySearch
 * Description: Performs binary search on sorted array
 * Parameters:
 *   arr - Sorted array to search in
 *   target - Element to find
 *   size - Number of elements in array
 * Returns: Position (1-indexed) if found, -1 if not found
 * Algorithm:
 *   - Repeatedly divides search interval in half
 *   - Compares target with middle element
 *   - Narrows search to left or right half based on comparison
 */
int binarySearch(int arr[], int target, int size) {
    int low, high, mid;
    
    low = 0;
    high = size - 1;
    
    printf("\n--- Search Process ---\n");
    
    while (low <= high) {
        // Calculate middle index
        mid = (low + high) / 2;
        
        printf("Searching in range [%d, %d], mid index = %d (value: %d)\n", 
               low, high, mid, arr[mid]);
        
        // Check if target is at middle
        if (arr[mid] == target) {
            printf("Target found at index %d!\n", mid);
            return mid + 1;  // Return 1-indexed position
        }
        
        // If target is greater, ignore left half
        else if (arr[mid] < target) {
            printf("  Target > %d, searching right half\n", arr[mid]);
            low = mid + 1;
        }
        
        // If target is smaller, ignore right half
        else if (arr[mid] > target) {
            printf("  Target < %d, searching left half\n", arr[mid]);
            high = mid - 1;
        }
    }
    
    // Element not found
    return -1;
}

/*
 * Function: displayArray
 * Description: Displays all array elements
 * Parameters:
 *   arr - Array to display
 *   size - Number of elements
 */
void displayArray(int arr[], int size) {
    int i;
    
    printf("\nArray elements: ");
    for (i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
