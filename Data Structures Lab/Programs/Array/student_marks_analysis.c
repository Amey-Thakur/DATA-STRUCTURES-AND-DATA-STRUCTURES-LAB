/*
 * Program: Student Marks Analysis
 * Description: Analyzes marks of students across multiple subjects
 * Author: Amey Thakur
 * Reference: https://github.com/Amey-Thakur/DATA-STRUCTURES-AND-DATA-STRUCTURES-LAB
 */

#include <stdio.h>
#include <conio.h>

#define NUM_STUDENTS 2  // Number of students
#define NUM_SUBJECTS 5  // Number of subjects

// Function prototypes
void readMarks(int marks[][NUM_SUBJECTS]);
void calculateSubjectAverages(int marks[][NUM_SUBJECTS], int subjectAvg[]);
void calculateStudentAverages(int marks[][NUM_SUBJECTS], int studentAvg[]);
void displaySubjectAverages(int subjectAvg[]);
void displayStudentAverages(int studentAvg[]);
int countLowPerformers(int studentAvg[], int threshold);

int main() {
    int marks[NUM_STUDENTS][NUM_SUBJECTS];  // Marks array: students x subjects
    int subjectAvg[NUM_SUBJECTS] = {0};     // Average marks per subject
    int studentAvg[NUM_STUDENTS] = {0};     // Average marks per student
    int lowPerformers;                       // Count of students below threshold
    
    // Read marks from user
    readMarks(marks);
    
    // Calculate and display subject-wise averages
    calculateSubjectAverages(marks, subjectAvg);
    displaySubjectAverages(subjectAvg);
    
    printf("***************************************************\n");
    
    // Calculate and display student-wise averages
    calculateStudentAverages(marks, studentAvg);
    displayStudentAverages(studentAvg);
    
    printf("*****************************************************\n");
    
    // Count and display students scoring below 50
    lowPerformers = countLowPerformers(studentAvg, 50);
    printf("\n%d student(s) scored below 50 average\n", lowPerformers);
    
    getch();
    return 0;
}

/*
 * Function: readMarks
 * Description: Reads marks for all students and subjects
 * Parameters: marks - 2D array to store marks
 */
void readMarks(int marks[][NUM_SUBJECTS]) {
    int i, j;
    
    for (i = 0; i < NUM_STUDENTS; i++) {
        printf("\nEnter marks for Student %d:\n", i + 1);
        for (j = 0; j < NUM_SUBJECTS; j++) {
            printf("  Subject %d: ", j + 1);
            scanf("%d", &marks[i][j]);
        }
    }
}

/*
 * Function: calculateSubjectAverages
 * Description: Calculates average marks obtained in each subject
 * Parameters:
 *   marks - Student marks array
 *   subjectAvg - Array to store subject averages
 */
void calculateSubjectAverages(int marks[][NUM_SUBJECTS], int subjectAvg[]) {
    int i, j;
    int subjectTotal[NUM_SUBJECTS] = {0};  // Total marks per subject
    
    // Sum marks for each subject across all students
    for (j = 0; j < NUM_SUBJECTS; j++) {
        for (i = 0; i < NUM_STUDENTS; i++) {
            subjectTotal[j] += marks[i][j];
        }
        // Calculate average
        subjectAvg[j] = subjectTotal[j] / NUM_STUDENTS;
    }
}

/*
 * Function: calculateStudentAverages
 * Description: Calculates average marks obtained by each student
 * Parameters:
 *   marks - Student marks array
 *   studentAvg - Array to store student averages
 */
void calculateStudentAverages(int marks[][NUM_SUBJECTS], int studentAvg[]) {
    int i, j;
    int studentTotal[NUM_STUDENTS] = {0};  // Total marks per student
    
    // Sum marks for each student across all subjects
    for (i = 0; i < NUM_STUDENTS; i++) {
        for (j = 0; j < NUM_SUBJECTS; j++) {
            studentTotal[i] += marks[i][j];
        }
        // Calculate average
        studentAvg[i] = studentTotal[i] / NUM_SUBJECTS;
    }
}

/*
 * Function: displaySubjectAverages
 * Description: Displays average marks for each subject
 * Parameters: subjectAvg - Array containing subject averages
 */
void displaySubjectAverages(int subjectAvg[]) {
    int i;
    
    printf("\n--- Subject-wise Average Marks ---\n");
    for (i = 0; i < NUM_SUBJECTS; i++) {
        printf("Subject %d: %d\n", i + 1, subjectAvg[i]);
    }
}

/*
 * Function: displayStudentAverages
 * Description: Displays average marks for each student
 * Parameters: studentAvg - Array containing student averages
 */
void displayStudentAverages(int studentAvg[]) {
    int i;
    
    printf("\n--- Student-wise Average Marks ---\n");
    for (i = 0; i < NUM_STUDENTS; i++) {
        printf("Student %d: %d\n", i + 1, studentAvg[i]);
    }
}

/*
 * Function: countLowPerformers
 * Description: Counts students with average below threshold
 * Parameters:
 *   studentAvg - Array of student averages
 *   threshold - Minimum acceptable average
 * Returns: Number of students below threshold
 */
int countLowPerformers(int studentAvg[], int threshold) {
    int i, count = 0;
    
    for (i = 0; i < NUM_STUDENTS; i++) {
        if (studentAvg[i] < threshold) {
            count++;
        }
    }
    
    return count;
}
