#include<stdio.h>
#include<conio.h>

void main()
{
	int i, j, temp,a[10];
	printf("enter the elements ");
	for(i = 0; i <= 10; i ++)
	{
		scanf("%d",&a[i]);
	}
	for (i = 0; i <= 10; i++)
	{
		for(j = i +1;j <= 10; j++)
		{
			if(a[i] > a[j])
			{
				temp = a[i];
				while( j != i)
				{
					a[j] = a[j-1];
					j --;	
				}
				a[i] = temp;
			}
		}
	}
	printf ("the sorted array is : ");
	for( i = 0; i <=10; i++)
		printf("%d \n",a[i]);
}
