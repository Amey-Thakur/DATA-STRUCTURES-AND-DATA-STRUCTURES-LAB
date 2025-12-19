/*
 * Program: 2D Array Sum and Mean Calculator
 * Description: Calculates the sum and mean of all elements in a 2D array
 * Author: Amey Thakur
 * Purpose: Demonstrates 2D array manipulation and basic statistics
 */

#include <stdio.h>
#include <conio.h>

#define ROWS 3     // Number of rows
#define COLS 3     // Number of columns

// Function prototypes
void readArray(int arr[][COLS]);
int calculateSum(int arr[][COLS]);
float calculateMean(int arr[][COLS]);
void displayArray(int arr[][COLS]);

int main() {
    int arr[ROWS][COLS];  // 2D array
    int sum;              // Sum of all elements
    float mean;           // Mean of all elements
    
    // Read array from user
    readArray(arr);
    
    // Display the array
    displayArray(arr);
    
    // Calculate and display sum
    sum = calculateSum(arr);
    printf("\nSum of all elements: %d\n", sum);
    
    // Calculate and display mean
    mean = calculateMean(arr);
    printf("Mean of all elements: %.2f\n", mean);
    
    getch();
    return 0;
}

/*
 * Function: readArray
 * Description: Reads elements of 2D array from user input
 * Parameters: arr - 2D array to store elements
 */
void readArray(int arr[][COLS]) {
    int i, j;
    
    printf("Enter %dx%d array elements:\n", ROWS, COLS);
    
    for (i = 0; i < ROWS; i++) {
        printf("  Row %d: ", i + 1);
        for (j = 0; j < COLS; j++) {
            scanf("%d", &arr[i][j]);
        }
    }
}

/*
 * Function: calculateSum
 * Description: Calculates sum of all elements in 2D array
 * Parameters: arr - Input 2D array
 * Returns: Sum of all elements
 */
int calculateSum(int arr[][COLS]) {
    int i, j;
    int sum = 0;
    
    for (i = 0; i < ROWS; i++) {
        for (j = 0; j < COLS; j++) {
            sum += arr[i][j];
        }
    }
    
    return sum;
}

/*
 * Function: calculateMean
 * Description: Calculates mean (average) of all elements in 2D array
 * Parameters: arr - Input 2D array
 * Returns: Mean value (float)
 */
float calculateMean(int arr[][COLS]) {
    int sum = calculateSum(arr);
    int totalElements = ROWS * COLS;
    
    return (float)sum / totalElements;
}

/*
 * Function: displayArray
 * Description: Displays 2D array in matrix format
 * Parameters: arr - Array to display
 */
void displayArray(int arr[][COLS]) {
    int i, j;
    
    printf("\nArray elements:\n");
    
    for (i = 0; i < ROWS; i++) {
        printf("  ");
        for (j = 0; j < COLS; j++) {
            printf("%d\t", arr[i][j]);
        }
        printf("\n");
    }
}
