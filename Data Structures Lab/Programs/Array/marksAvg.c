#include<stdio.h>
#include<conio.h>
//
void main()
{
	int marks[2][5];
	int i,j,a=0,temp=0;
	int sub[5]={0,0,0,0,0},a_sub[5],stud[2]={0,0},a_stud[2];
	//clrscr();
	for(i=0;i<2;i++)
	{
		printf("Enter Marks for student %d \n",i+1);
		for(j=0;j<5;j++)
		{
			scanf("%d",&marks[i][j]);
		}
	}
//find average marks obtained in each subject
	for(j=0;j<5;j++)
	{
		for(i=0;i<2;i++)
		{
			sub[j]=sub[j]+marks[i][j];

		}
	}

	for(i=0;i<5;i++)
	{
		a_sub[i]=sub[i]/2;
	}

	for(i=0;i<5;i++)
	{
		printf("\n Average marks obtained in subject %d is %d \n",i+1,a_sub[i]);
	}
	printf("***************************************************");


//find the average marks obtained by every student.
	for(i=0;i<2;i++)
	{
		for(j=0;j<5;j++)
		{
			stud[i] = stud[i] + marks[i][j];
		}
	}

	for(i=0;i<2;i++)
	{
		a_stud[i] = stud[i] / 5;
	}

	for(i=0;i<2;i++)
	{
		printf("\n Average marks obtained by student %d is %d. \n",i+1,a_stud[i]);
	}
	printf("*****************************************************");

//find number of students who have scored below 50 in their average
	for(i=0;i<2;i++)
	{
		if(a_stud[i]<50)
		{
			a++;
		}
	}

	printf("\n %d Students have scored less than 50 as their average",a);


	getch();
}

