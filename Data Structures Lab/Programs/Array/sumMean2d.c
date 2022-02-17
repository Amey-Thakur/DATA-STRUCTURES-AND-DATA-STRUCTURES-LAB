#include<stdio.h>
#include<conio.h>

void main()
{
	int a[3][3],i,j,count=0,sum=0;
	//clrscr();
	printf("Enter array");
	
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			scanf("%d",&a[i][j]);
		}	
	}
	
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			sum=sum+a[i][j];
		}
	}	
	printf("Sum = %d ",sum);
	getch();
	
	
}
