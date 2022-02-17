#include<stdio.h>
#include<malloc.h>

typedef struct node
	{
	int priority;
	int info;
	struct node *link;
}NODE;
NODE *front = NULL;

void insert(int item,int priority)
{
	NODE *tmp,*q;

	tmp = (NODE *)malloc(sizeof(NODE));
	tmp->info = item;
	tmp->priority = priority;
	/*Queue is empty or item to be added has priority more than first item*/
	if( front == NULL || priority < front->priority )
	{
		tmp->link = front;
		front = tmp;
	}
	else
	{
		q = front;
		while( q->link != NULL && q->link->priority <= priority )
			q=q->link;
		tmp->link = q->link;
		q->link = tmp;
	}
}
void del()
{
	NODE *tmp;
	if(front == NULL)
		printf("Queue Underflow\n");
	else
	{
		tmp = front;
		printf("Deleted item is %d\n",tmp->info);
		front = front->link;
		free(tmp);
	}
}
void display()
{
	NODE *ptr;
	ptr = front;
	if(front == NULL)
		printf("Queue is empty\n");
	else
	{	
		printf("Queue is :\n");
		printf("Priority       Item\n");
		while(ptr != NULL)
		{
			printf("%5d        %5d\n",ptr->priority,ptr->info);
			ptr = ptr->link;
		}
	}
}
int main()
{
	int choice,item,priority;
	do
	{
		printf("1.Insert\n");
		printf("2.Delete\n");
		printf("3.Display\n");
		printf("4.Quit\n");
		printf("Enter your choice : ");
		scanf("%d", &choice);
		switch(choice)
		{
			case 1:
				printf("Input the item value to be added in the queue : ");
				scanf("%d",&item);
				printf("Enter its priority : ");
				scanf("%d",&priority);
				insert(item,priority);
				break;
			case 2:
				del();
				break;
			case 3:
				display();
				break;
			case 4:
			break;
				default :
				printf("Wrong choice\n");
		}
	}while(choice!=4);

	return 0;
} 

