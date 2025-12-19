#include<stdio.h>
#include<stdlib.h>

struct node
{
	int data;
	struct node* next;
};

struct node *one = NULL;

struct node* insertNode(int);
void countNonZero();

void main()
{
	int val=0,no=0,i=0;
	struct node* ptr = NULL;
	printf("Enter number of nodes to be entered in list :  ");
	scanf("%d",&no);
	for(i=0;i<no;i++)
	{
		printf("Enter node %d in list :  ",i);
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
	countNonZero();
 }

struct node* insertNode(int val)
{
	struct node* temp;
	temp=(struct node*)malloc(sizeof(struct node));
	
	temp->data = val;
	temp->next = NULL;
	
	return temp;
}	

void countNonZero()
{
	struct node* ptr = NULL;
	int count=0;
	for (ptr = one;ptr != NULL;ptr = ptr->next)
	{    
        if(ptr->data != 0)
        {
        	count++;
		}
    }
    printf("There are %d Non-zero Elements in the entered link list",count);
}
