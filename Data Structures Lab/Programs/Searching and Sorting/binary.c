#include <stdio.h>
#include<conio.h>
int binarySearch (int arr[], int num, int size) 
{

    int low, high, mid;
    
    low = 0;
    high = size - 1;
    
    while (low <= high) {
     
        /* Calculate mid index */

        mid = (low + high) / 2;
    
        
        if (arr[mid] == num ) {
         
            return mid+1;
         
        } else if ( arr[mid] > num) {
         
            high = mid - 1;
         
        } else if ( arr[mid] < num) {
         
            low = mid + 1;
         
        }
    }
    
    return -1;
 
}

int main(void) {
    
   int arr[100], len, num, result,i;
 
   printf(" \n Enter the size of an array (Max 100)");
   scanf ("%d", &len);
 
   printf("\n Enter the elements of an array \n");
 

   for (i = 0; i < len; i++) 
   {
  	  scanf ("%d", &arr[i]);
  
   }
 
   printf ("\n Enter the elements to be searched in an array");
   scanf ("%d", &num);
 
   result = binarySearch (arr, num, len);
 
   if (result == -1) 
   {
  
       printf (" \n Number is not found in an array");
  
   } 
   else 
   {
  
       printf (" \n Number is found at %d position", result );
   }
 
   return 0;
}
 

