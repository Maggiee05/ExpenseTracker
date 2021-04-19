# Expense Tracker
Maggie Chen (ziningc2) | Moderator: Miranda Liu (minerl2)

This is an App about the final project for CS242

## Abstract
### Project Purpose
The purpose of this project is to track the expenses of a user. 
And to motivate people to control the expenses in daily life.

### Project Motivation
I found myself not awaring of how much I've spent everyday until I want to buy something expensive.
Therefore I believe something like expense tracker may help me track the expense everyday. 
I believe visualizing the expenses and earnings allow people to have a better understanding of total expenses.
I also try to integrate the expense tracker with the wish list, 
since it might also motivate people to save more money and spend more time considering before buying something.

## Technical Specification
- Platform: Cross-platform app (React Native)
- Programming Languages: JavaScript
- Stylistic Conventions: Airbnb JavaScript Style Guide
- IDE: Visual Studio Code
- Tools/Interfaces: React Native
- Target Audience: Broad-range audience

## Functional Specification
### Features
- **A basic application of expense tracker**
  
    User can input the expense and earning of each day. 
    There is also visualization of the total expense for each month.
  
- **A wish list**
  
    User can put something on the wish list. And the page will show the status of the product 
    (scraped from the product website).
  
- **Setting Expense/Savings Goal**

    User can input a number for the amount of money that they want to save. 
    If the amount is reached, user will receive notification of whether to buy the product.
  
- **Login/Logout**


## Brief Timeline
### Week 1
  - Implement the **Create Account**, **Login/Logout**
  - Setting up the **basic UI design** that allow users to input numbers and click buttons

### Week 2 
  - Implement the **expense tracker**, connecting with **user input** and **database**
  - Implement the **Wish List**
    
### Week 3
  - Implement the visualization for expense tracker
  - Implement the goal setting. Allow user to set a goal amount for the expense tracker

### Week4
  - Optimize the UI design, and add other **custom features**
  - Handling the notifications

## Rubrics
### Week 1
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Set up |  2  |  +1 Properly setting up React App <br> +1 Properly setting up the database|
|  Login |  5  |  +1: Support Create Account <br> +1: Support password validation <br> +1: Show current user if logged in <br> +1: Handle error messages <br> +1: Valid username and password can navigate to the main App|
|  Logout |  2  |  +1: Implement Logout <br> +1: User should not see the personal data after logged out|
|  Basic UI Design  |  3  |  +1: Login form is properly designed <br> +1: Can navigate between screens <br> +1: Basic screen design for each feature implemented|
|  Expense tracker frontend  | 3 | +1: Allow user to input expense/earning <br> +1: Show the total amount <br> +1: Allow user to select the category of expense|
|  Eslint|  2  |  +1: Set up Eslint <br> +1: No error or warning message|
|  Unit test |  3  |  -0.5: missing a unit test case|
|  Manual Test Plan |  5  |  -1: missing a test case |

### Week 2
| Category | Total Score Allocated | Detailed Rubrics                                                            |
|------------|:---------:|-------------------------------------------------------------------------------|
|  Expense tracker backend  | 4 | +1: Properly store the user input number and the total amount <br> +1: Connection between backend and frontend (complete implementation of expense tracker) <br> +1: The expense tracker design follows the App interface sketch<br> +1: Handle errors|
|  Wish List backend |  4  |  +1: Implement the scraper <br> +1: Can scrape corresponding data with a user-input url <br> +1: Handle errors <br> +1: Store the scraped data into database properly|
|  Wish List Frontend |  6  |  +1: Allow user to enter the url of the wish list product <br> +2: Rendering the product information properly (read from database) <br> +1: Click certain tab will bring user to the product website <br> +1: Handle error views <br> +1: The wish list design follows the App interface sketch|
|  Screen rendering |  1  |  +1: Loading screen for wish list during scraping|
|  Eslint|  1  |  +1: No error or warning message|
|  Unit test |  4  |  -0.5: missing a unit test case|
|  Manual Test Plan |  5  |  -1: missing a test case |


### Week 3
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Visualization |  4  |   +1: Have a proper chart showing monthly balance <br> +1: Have a proper chart for categorical expense <br> +1: Have a proper chart for categorical income<br> +1: User can choose which chart to render |
|  Set goal |  5  | +1: User can set the amount goal <br>  +1: Amount goal properly stored in backend <br> +1: User can change the goal amount once per month (Receive alert notification) <br> +1: Rendering the status of whether the user meets the goal <br> +1: User can choose to randomly generate a goal amount|
|  Interaction with expense tracker|  2  | +1: The expense tracker screen shows the remaining amount needed for the goal <br> +1: Show message if the goal user set is largely greater than the saving amount |
|  Reset  |  2  |  +1: User can reset the expense tracker <br> +1: User can reset the wish list |
|  Profile Screen frontend |  2  |  +1: The frontend design for 'Me' Screen is implemented (user can enter, select etc.) <br> +1: Implement the frontend design for 'change password' screen and 'add categories' screen |
|  Eslint|  1  |  +1: No error or warning message|
|  Unit test |  4  |  -0.5: missing a unit test case|
|  Manual Test Plan |  5  |  -1: missing a test case |


### Week 4
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Nice App design |  2  |  -1: Have same color representation for different attributes <br> -1: Use default react native component design (font, button etc.) |
|  Custom features |  8  |  +2: User can choose to convert to dark mode for the App <br> +1: User can choose different currency <br> +1: User can choose to hide the total amount <br> +1: User can add/delete categories in expense tracker <br> +1: User can change password <br> +1: User can delete account <br> +1: User can share the report in 'Report' Screen |
|  Notification Message |  4  |  +1: Prompting notification when the saving amount meets the goal <br> +1: The notification can navigate to the wish list/product website <br> +1: Notification when expense is largely greater than earnings each day <br> +1: Notification when monthly savings amount not meet the goal <br> -1: Not handling error view |
|  Security Enhancement |  1  |  +1: Password Encryption/Decryption implemented|
|  Eslint|  1  |  +1: No error or warning message|
|  Unit test |  3  |  -0.5: missing a unit test case|
|  Manual Test Plan |  6  |  -1: missing a test case |

### Grading Calculator
  - Week 1

https://docs.google.com/spreadsheets/d/1LhzSwWQyhrfntDo2NEbMBCnGtViZdAsnxnrrY9f3I9c/edit#gid=1203283929

  - Week 2
    
https://docs.google.com/spreadsheets/d/1bDvv_OZlHPLAp75qeyFQCavTbW3g6Wg3L2ITeHqYhvQ/edit#gid=1203283929  

  - Week 3

https://docs.google.com/spreadsheets/d/1IGfDNQmyR5V5Ez-votl9B40Fmk4XG-Xk1qdJfTK6XAE/edit#gid=1203283929

  - Week 4

https://docs.google.com/spreadsheets/d/1YNLmfNub8weMusvXzEert1QszPKXQptoPqg1nALdTNc/edit#gid=1203283929
