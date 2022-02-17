#include <stdio.h>
#include <string.h>

int main()
{
    char str[100], rev[100];
    int len=0, i=0, count=0, ws=0, we=0;

    printf("Enter any string: ");
    gets(str);
    
	ws = strlen(str) - 1;
    we   = strlen(str) - 1;

    while(ws > 0)
    {
        if(str[ws] == ' ')
        {
            i = ws + 1;
            while(i <= we)
            {
                rev[count] = str[i];
				i++;
                count++;
            }
            rev[count++] = ' ';

            we = ws - 1;
        }

        ws--;
    }

    for(i=0; i<=we; i++)
    {
        rev[count] = str[i];
        count++;
    }

    rev[count] = '\0'; 

    printf("Original string \n %s\n\n", str);
    printf("Reverse ordered words \n %s", rev);

    return 0;
}
