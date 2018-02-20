# simple_diagramer
TODO  

## Style note
In my javascript code here, I will use 'const foo = () => {}'
style for 'private' functions and for public ones I will use the  
'function foo() {}' style...   ...maybe 'public/private' is not what I am doing.  Perhaps 'independent/dependent' would be a better way to put it.     	

## How to run
This has zero backend logic. It does need a web server. Depending on which python version I happen to be using I use either:   
python -m http.server 3030    
OR    
python -m SimpleHTTPServer 3030       
In the browser you can see this at:     
http://localhost:3030/diagram.html

## Buttons and what/how
1:default : allows nodes to be dragged      
2:node add : click on the white background to add new node. Note1 - a table entry will be created, which has a text field. Note2 - set the <select> color to choose a background    
3:<select> choose color for the 'node add'    
4:edge add : click on a node and drag to a node. Note1: If you do not drag far enough you will get a circle. This is meant to denote a cycle. Frankly, I do not know if I like this feature or not.    
5:tdd : Run the tdd tests ( check console for output )    
6:save : This will marshal whatever is currently showing to localstore    
7:clear datastore : This will erase the localstore    
8:delete : permitts the clicking on the nodes. This will delete nodes and associated paths   



## Features
Reposition Edges | Done   
Reposition Nodes | Done   
Add edges | Done   
Table text inputs to Nodes | Done   
Node2Table | Done   
Add nodes | Done    
Edges | Done    
CRUD w/ localstorage | Done 	 
cycles | Done ( but it is ugly )   
tdd | 50%

## Metro 
See the metro branch for the beginings of metro style picking 

## Dummy text
Quote from Wittgenstien or L. Carol or Alice in Wonderland ( as filtered by my memory ) 

