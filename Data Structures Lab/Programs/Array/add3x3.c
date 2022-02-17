#include<stdio.h>
#include<conio.h>

void main()
{
	int a[3][3],b[3][3],c[3][3],i,j,count=0,sum=0;
	//clrscr();
	printf("Enter array :\n");
	
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			scanf("%d",&a[i][j]);
		}	
	}
	
	printf("\n Enter 2nd array :\n");
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			scanf("%d",&b[i][j]);
		}	
	}
	
	for(i=0;i<3;i++)
	{
		for(j=0;j<3;j++)
		{
			//c[i][j]=a[i][j]+b[i][j];
			*(*(c + i )+ j) = *(*(a + i ) + j ) + *(*(b + i ) + j );
		}
	}	
	
	printf("\n  Sum : ");
	for(i=0;i<3;i++)
	{
		printf("\n \t");
		for(j=0;j<3;j++)
		{
			printf("%d \t",*(*(c +i)+j));//c[i][j]);
		}
	}
	
	getch();
	
	
}
