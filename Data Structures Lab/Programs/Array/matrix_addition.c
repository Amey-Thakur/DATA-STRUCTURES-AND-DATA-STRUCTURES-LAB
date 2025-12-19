/*
 * Program: 3x3 Matrix Addition
 * Description: Adds two 3x3 matrices and displays the result using pointer arithmetic
 * Author: Amey Thakur
 * Purpose: Demonstrates 2D array manipulation using pointers
 */

#include <stdio.h>
#include <conio.h>

#define SIZE 3  // Matrix dimensions (3x3)

// Function prototypes
void readMatrix(int matrix[][SIZE], const char* name);
void addMatrices(int a[][SIZE], int b[][SIZE], int result[][SIZE]);
void displayMatrix(int matrix[][SIZE], const char* name);

int main() {
    int matrixA[SIZE][SIZE];  // First matrix
    int matrixB[SIZE][SIZE];  // Second matrix
    int matrixC[SIZE][SIZE];  // Result matrix
    
    // Read input matrices
    readMatrix(matrixA, "First");
    readMatrix(matrixB, "Second");
    
    // Perform matrix addition
    addMatrices(matrixA, matrixB, matrixC);
    
    // Display result
    displayMatrix(matrixC, "Sum");
    
    getch();
    return 0;
}

/*
 * Function: readMatrix
 * Description: Reads a 3x3 matrix from user input
 * Parameters: 
 *   matrix - 2D array to store the matrix
 *   name - Name identifier for the matrix (First/Second)
 */
void readMatrix(int matrix[][SIZE], const char* name) {
    int i, j;
    
    printf("\nEnter %s matrix (%dx%d):\n", name, SIZE, SIZE);
    
    for (i = 0; i < SIZE; i++) {
        for (j = 0; j < SIZE; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
}

/*
 * Function: addMatrices
 * Description: Adds two matrices using pointer arithmetic
 * Parameters:
 *   a - First matrix
 *   b - Second matrix
 *   result - Resultant matrix (a + b)
 */
void addMatrices(int a[][SIZE], int b[][SIZE], int result[][SIZE]) {
    int i, j;
    
    for (i = 0; i < SIZE; i++) {
        for (j = 0; j < SIZE; j++) {
            // Using pointer arithmetic to access array elements
            *(*(result + i) + j) = *(*(a + i) + j) + *(*(b + i) + j);
        }
    }
}

/*
 * Function: displayMatrix
 * Description: Displays a matrix in formatted output
 * Parameters:
 *   matrix - Matrix to display
 *   name - Name to display above the matrix
 */
void displayMatrix(int matrix[][SIZE], const char* name) {
    int i, j;
    
    printf("\n%s Matrix:\n", name);
    
    for (i = 0; i < SIZE; i++) {
        printf("\t");
        for (j = 0; j < SIZE; j++) {
            // Display using pointer arithmetic
            printf("%d\t", *(*(matrix + i) + j));
        }
        printf("\n");
    }
}
