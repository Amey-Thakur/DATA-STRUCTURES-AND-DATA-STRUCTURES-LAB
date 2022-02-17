#include<stdio.h>
#include<stdlib.h>

struct node
{
	int data;
	struct node* next;
};

struct node *one = NULL, *two = NULL, *result = NULL;

struct node* insertNode(int);
void display();

void main()
{
	int val=0,no=0,i=0;
	struct node* ptr = NULL;
	printf("Enter number of nodes to be entered in list 1 :  ");
	scanf("%d",&no);
	for(i=0;i<no;i++)
	{
		printf("Enter node %d in lst list :  ",i);
		scanf("%d",&val);
		if(one == NULL)
		{
			one = insertNode(val);
		}
		else
		{
			struct node* p;
			p = one;
		
			while(p->next != NULL)
			{
				p = p->next;
			}
			p->next = insertNode(val);
		}	
	}
	
	printf("Enter number of nodes to be entered in list 2 :  ");
	scanf("%d",&no);
	for(i=0;i<no;i++)
	{
		printf("Enter node %d in 2nd list :  ",i);
		scanf("%d",&val);
		if(two == NULL)
		{
			two = insertNode(val);
		}
		else
		{
			struct node* p;
			p = two;
		
			while(p->next != NULL)
			{
				p = p->next;
			}
			p->next = insertNode(val);
		}	
	}
	ptr = one;
	while(ptr != NULL)
	{
		val = ptr->data;
		if(result == NULL)
		{
			result = insertNode(val);
		}
		else
		{
			struct node* p;
			p = result;
		
			while(p->next != NULL)
			{
				p = p->next;
			}
			p->next = insertNode(val);
		}
		ptr = ptr->next;
	}
	ptr = two;
	while(ptr != NULL)
	{
		val = ptr->data;
		if(result == NULL)
		{
			result = insertNode(val);
		}
		else
		{
			struct node* p;
			p = result;
		
			while(p->next != NULL)
			{
				p = p->next;
			}
			p->next = insertNode(val);
		}
		ptr = ptr->next;
	}
	
	display();	
}

void display()
{
	struct node *ptr;
	
	printf("\n1st Linkedlist :\n");
	for(ptr = one;ptr != NULL; ptr = ptr->next)
	{
		printf("--> %d",ptr->data);
	}
	
	
	printf("\n2nd Linklist :\n");
	for(ptr = two;ptr != NULL; ptr = ptr->next)
	{
		printf("--> %d",ptr->data);
	}
	
	printf("\n Merged Linklist : \n");
	for(ptr = result;ptr != NULL ;ptr = ptr->next)
	{
		printf("--> %d", ptr->data);
	}
}

struct node* insertNode(int val)
{
	struct node* temp;
	temp=(struct node*)malloc(sizeof(struct node));
	
	temp->data = val;
	temp->next = NULL;
	
	return temp;
}
