#include<stdio.h>
#include<stdlib.h>
#define SIZE 5
void insert();
void delet();
void display();
int queue[SIZE], rear=-1, front=-1, item;
main()
{
int ch;
do
{
printf("\n\n1. \tInsert\n2. \tDelete\n3. \tDisplay\n4. \tExit\n");
printf("\nEnter your choice: ");
scanf("%d", &ch);
switch(ch)
{
case 1:
insert();
break;
case 2:
delet();
break;
case 3:
display();
break;
case 4:
exit(0);
default:
printf("\n\nInvalid choice. Please try again... \n");
}
} while(1);
getch();
}
void insert()
{
if((front==0 && rear==SIZE-1) || (front==rear+1))
printf("\n\nQueue is full.");
else
{
printf("\n\nEnter ITEM: ");
scanf("%d", &item);
if(rear == -1)
{
rear = 0;
front = 0;
}
else if(rear == SIZE-1)
rear = 0;
else
rear++;
queue[rear] = item;
printf("\n\nItem inserted: %d\n", item);
}
}
void delet()
{
if(front == -1)
printf("\n\nQueue is empty. \n");
else
{
item = queue[front];
if(front == rear)
{
front = -1;
rear = -1;
}
else if(front == SIZE-1)
front = 0;
else
front++;
printf("\n\nITEM deleted: %d", item);
}
}
void display()
{
int i;
if((front == -1) || (front==rear+1))
printf("\n\nQueue is empty. \n");
else
{ printf("\n\n");
for(i=front; i<=rear; i++)
printf("\t%d",queue[i]);
}
}
 
 

