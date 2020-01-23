This package contains utilities.

  

# Priority Queue Description

It use internal state which is changed each pop or push method execution.

Tests coming soon.

### push(priority, item)

priority - it`s a positive number (priority > 0) which represent how many times in one queue iteration item will be removed.

Iteration length is sum of all priorites together but may be shorter if priority doesn`t have enough items.

### pop()

return and remove item from queue

### peek()

return item from queue

  

## Example

  

```

const queueInstance = Queue();

queueInstance.push(1, 1);

queueInstance.push(1, 2);

queueInstance.push(2, 3);

queueInstance.push(2, 4);

queueInstance.push(2, 5);

queueInstance.push(2, 6);

queueInstance.push(2, 7);

  

// start from first pushed element from highest priority

queueInstance.pop(); //3

queueInstance.pop(); //4

queueInstance.pop(); //5

// pop (priority + 1) times elements from elements pushed into priority

queueInstance.pop(); //1

queueInstance.pop(); //2

// then change to next lower priority

queueInstance.pop(); //6

queueInstance.pop(); //7

//if there is nothing left return null

queueInstance.pop(); //null

```