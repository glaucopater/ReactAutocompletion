AutoCompletion
===

A React JS Web Component with auto complete feature 
---

I tried to limit the number of packages in order to have a small code solution.
For ajax request I used Axios, which is one of the fastest ajax solution for React Js.

Note the at the moment the remote url retrieves data from https://jsonplaceholder.typicode.com/posts 
but it is very easy to adapt to any kind of feed.


As a stylesheet preprocessor I decided to use LESS.

The main App component manages the main container with the input box. On page loading the remote live data are retrieved.
The second small class manages the results in a list.
The idea was to present all the found matching items for the auto completion box highlighting the section of the matched content.

The Enter Key clear all the result if the search field is empty!

Keyboard arrows (up, down) allow to move between suggested items

 
To run the app: npm install && npm start