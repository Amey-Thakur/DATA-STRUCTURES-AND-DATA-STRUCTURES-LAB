/*
 * Program: Pair Sum Finder
 * Description: Finds all pairs of numbers in an array that sum to 50
 * Author: Amey Thakur
 * Purpose: Demonstrates array traversal and pair finding algorithm
 * Note: Counts each pair once (a,b) and (b,a) are counted as different pairs
 */

#include <stdio.h>
#include <conio.h>

#define TARGET_SUM 50   // Target sum value
#define MAX_SIZE 100    // Maximum array size

// Function prototypes
int readArray(int arr[]);
void findPairSum(int arr[], int size, int targetSum);

int main() {
    int arr[MAX_SIZE];  // Array to store numbers
    int size;            // Actual number of elements
    
    // Read array from user
    size = readArray(arr);
    
    // Find and display pairs with target sum
    printf("\nPairs that sum to %d:\n", TARGET_SUM);
    findPairSum(arr, size, TARGET_SUM);
    
    getch();
    return 0;
}

/*
 * Function: readArray
 * Description: Reads array elements from user input
 * Parameters: arr - Array to store elements
 * Returns: Number of elements read
 */
int readArray(int arr[]) {
    int i, size;
    
    printf("Enter number of elements (max %d): ", MAX_SIZE);
    scanf("%d", &size);
    
    // Validate input size
    if (size > MAX_SIZE || size <= 0) {
        printf("Invalid size! Using default size of 7.\n");
        size = 7;
    }
    
    printf("Enter %d numbers:\n", size);
    for (i = 0; i < size; i++) {
        printf("  Element %d: ", i + 1);
        scanf("%d", &arr[i]);
    }
    
    return size;
}

/*
 * Function: findPairSum
 * Description: Finds and displays all pairs that sum to target value
 * Parameters:
 *   arr - Input array
 *   size - Number of elements in array
 *   targetSum - Desired sum value
 * Algorithm: Uses nested loop to check all pairs (i,j) where i != j
 */
void findPairSum(int arr[], int size, int targetSum) {
    int i, j;
    int pairCount = 0;  // Number of pairs found
    int sum;            // Sum of current pair
    
    // Check all possible pairs
    for (i = 0; i < size; i++) {
        for (j = 0; j < size; j++) {
            sum = arr[i] + arr[j];
            
            // Check if pair sums to target and elements are distinct
            if (sum == targetSum && arr[i] != arr[j]) {
                pairCount++;
                printf("  Pair %d: (%d, %d)\n", pairCount, arr[i], arr[j]);
            }
        }
    }
    
    if (pairCount == 0) {
        printf("  No pairs found that sum to %d\n", targetSum);
    } else {
        printf("\nTotal pairs found: %d\n", pairCount);
    }
}
