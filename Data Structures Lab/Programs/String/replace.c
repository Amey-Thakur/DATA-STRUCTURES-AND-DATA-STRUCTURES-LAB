	#include<stdio.h>
#include<conio.h>

void main()
{
	char str[6],r,re;
	int i=0;

	printf("\n Enter String  \n");
	scanf("%s",&str);

	printf("\n Enter the character to be replaced \n");
	scanf("%c",&r);
    scanf("%c",&r);
    
	printf("\n Enter the character to be replaced with %c",r);
	scanf("%c",&re);
	scanf("%c",&re);
    
	for(i=0;str[i];i++)
	{
		if(str[i]==r)
		{
			str[i]=re;
		}
	}

	printf("\n String after replacing is '' %s '' ",str);
	getch();
}

