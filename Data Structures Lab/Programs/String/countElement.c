#include<stdio.h>
#include<conio.h>

void main()
{
	char str[20];
	int num=0,sc=0,uc=0,a=0,lc=0,i=0;
	
	printf("Enter String within 10 character \n");
	scanf("%s", &str);
	
	for(i=0;str[i];i++)
	{	
		if(str[i]<=57 && str[i]>=48 )
		{
			num++;
		}
		else if(str[i]<=90 && str[i]>=65)
		{
			uc++;
		}
		else if(str[i]<=122 && str[i]>=97 )
		{
			lc++;
		}
		else
		{
			sc++;
		}
	}
	printf("The given string contains \n\n %d Numbers \n %d Special Characters \n %d Uppercase Characters \n %d Lowercase Characters",num,sc,uc,lc);
	getch();
	
	
}
