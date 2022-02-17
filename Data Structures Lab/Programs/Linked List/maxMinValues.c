#include<stdio.h>
#include<stdlib.h>

struct node
{
	int data;
	struct node* next;
};

struct node *one = NULL;

struct node* insertNode(int);
void minMax();

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
	minMax();
 }

struct node* insertNode(int val)
{
	struct node* temp;
	temp=(struct node*)malloc(sizeof(struct node));
	
	temp->data = val;
	temp->next = NULL;
	
	return temp;
}	

void minMax()
{
	struct node* ptr = NULL;
	int count=0,min=0,max=0;
	min = max = one->data;
	for (ptr = one;ptr != NULL;ptr = ptr->next)
	{    
        if(ptr->data < min)
        {
        	min = ptr->data;
		}
		if(ptr->data > max)
		{
			max = ptr->data;
		}
    }
    printf("\n\n %d is the Minimum value in the entered link list",min);
	printf("\n %d is the Maximum value in the entered link list",max);
}
