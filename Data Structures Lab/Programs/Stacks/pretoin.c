#include <stdio.h>
#include <string.h>
#define MAX 30

char stack[MAX][MAX];
int top = -1;

void push(char str[])
{
	if(top != MAX-1)
	{
  		strcpy(stack[++top], str);
 	}
 	else
	{
		printf("Stack overflow : May be invalid prefix expression\n");
	}
}

void pop(char str[])
{	
	if(top != -1)
	{
		strcpy(str,stack[top--]);
	}
	else
	{
  		printf("Stack underflow : May be invalid prefix expression\n");
	}
}

int isoperator(char c)
{
	if(c == '+' || c == '-' || c == '*' || c == '/' || c == '^')
		return 1;
	return 0;
}

void prefix_to_infix(char prefix[], char infix[])
{
	char op[2]; //operator string
	char poped1[MAX];
 	char poped2[MAX];
 	char temp[MAX];
 	int i = strlen(prefix);
 	op[1] = '\0';
 	while(--i != -1)
	{
		if(prefix[i] == ' ')
		{
			continue;
		}
		if(isoperator(prefix[i]))
		{
   			pop(poped1);
			pop(poped2);
   			op[0] = prefix[i]; //operator
   			strcpy(temp, poped1);
   			strcat(temp, op);
   			strcat(temp, poped2);
   			push(temp);
  		}
  		else
		{
   			op[0] = prefix[i]; //operand
   			push(op);
  		}	
 	}
 	pop(infix);
}

int main()
{
	char prefix[] = "+-*^ABCD//EF+GH"; //INFIX :  A^B*C-D+E/F/G+H
 	char infix[MAX];
 	prefix_to_infix(prefix,infix);
 	printf("Input Prefix  Expression : %s\n",prefix);
 	printf("Output Infix  Expression : %s\n",infix);
 	return 0;
}
