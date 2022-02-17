#include<stdio.h>
#include<conio.h>

void main()
{
	int a[7],i,j,count=0,sum=0;
	//clrscr();
	printf("Enter 30 numbers");
	
	for(i=0;i<7;i++)
	{
		scanf("%d",&a[i]);
	}
	
	for(i=0;i<7;i++)
	{
		for(j=0;j<7;j++)
		{
			sum=a[i]+a[j];
			if(sum==50 && a[i]!=a[j])
			{
				count++;
				printf("Pair %d ( %d , %d ) ",count, a[i],a[j]);
			}
		}
	}	
	getch();
	
	
}
