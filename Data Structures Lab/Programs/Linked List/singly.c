#include<stdio.h>
#include<stdlib.h>

struct node
{
	int data;
	struct node* next;
};

struct node *one = NULL;

struct node* insertNode(int);
void display();
void delete(int);

void main()
{
	int choice,val=0,no=0,i=0;;
	while(1)
	{
		printf("\n\n1. Create \n2. Delete \n3. Display \n4. Exit \n");
		scanf("%d",&choice);
		
		switch(choice)
		{
			case 1:
				printf("\nEnter node value :  ");
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
				break;
			case 2:
				printf("\nEnter node value :  ");
				scanf("%d",&val);
				delete(val);
				break;
			case 3: 
				display();
				break;
			case 4:
				exit(1);
			default:
				printf("\nError......\nEnter correct option");
				break;
		}
	}
}
void delete(int val)
{
	struct node *temp;
	struct node *ref;
	temp = one;
	while(temp->data != val)
	{
		ref = temp;
		temp=temp->next;
	}
	if(temp->next == NULL)
	{
		ref->next = NULL;
		free(temp);
	}
	else
	{
		ref->next = temp->next;
		free(temp);
	}
}
void display()
{
	struct node *ptr;
	
	printf("\n\nEntered Linklist : \n");
	for(ptr = one;ptr != NULL ;ptr = ptr->next)
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
