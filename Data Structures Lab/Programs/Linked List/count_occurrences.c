#include<stdio.h>
#include<stdlib.h>

struct node
{
	int data;
	struct node* next;
};

struct node *one = NULL;

struct node* insertNode(int);
void countOccurence();

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
	countOccurence();
 }

struct node* insertNode(int val)
{
	struct node* temp;
	temp=(struct node*)malloc(sizeof(struct node));
	
	temp->data = val;
	temp->next = NULL;
	
	return temp;
}	

void countOccurence()
{
	struct node* ptr = NULL;
	int val=0,count=0;
	printf("\n Enter the data whoose occurence you have to find: ");
	scanf("%d",&val);
	for (ptr = one;ptr != NULL;ptr = ptr->next)
	{    
        if(ptr->data==val)
        {
        	count++;
		}
    }
    printf("%d times %d is occured in the entered link list",count,val);
}
