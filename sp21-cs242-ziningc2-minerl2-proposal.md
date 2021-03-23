# A Mobile App
Maggie Chen (ziningc2) | Moderator: Miranda Liu (minerl2)

This is a mobile app about the final project for CS242

## Abstract
### Project Purpose
The purpose of this project is to track the expenses of a user. 
And to motivate people to control the expenses in daily life.

### Project Motivation
Expense tracker helps visualize the expenses and earnings.
The wish list can motivate people to save more money and spend more time considering before buying something.
(Sometimes if a product is saved in the wish list, 
then people might not be interested in buying it a few weeks later.)

## Technical Specification
- Platform: Cross-platform app (React Native)
- Programming Languages: JavaScript (Python for Flask should backend required)
- Stylistic Conventions: Airbnb JavaScript Style Guide
- SDK: Facebook SDK for React Native (possible for social login)
- IDE: Visual Studio Code
- Tools/Interfaces: Mobile devices
- Target Audience: Broad-range audience

## Functional Specification
### Features
- **A basic application of expense tracker**
  
    User can input the expense and earning of each day. 
    There is also visualization of the total expense for each month.
  
- **A wish list**
  
    User can put something on the wish list. And the page will show the status of the product (scraped from the product website).
    There is also visualization of the price tracking.
  
- **Expense/Saving Goal**

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
  - Optimize the UI design, and add other **custom features** such as 
  Dark Mode, Currency conversion, Redo button
  - Handling the notifications

## Rubrics
### Week 1
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Set up |  2  |  +1 Properly setting up React App <br> +1 Properly setting up the database|
|  Login |  5  |  +1: Support Create Account if email not previously registered <br> +1: Support password validation <br> +1: Show current user if logged in <br> +1: Handle error messages <br> +1: Valid username and password can navigate to the main App|
|  Logout |  2  |  +1: Implement Logout <br> +1: User should not see the personal data after logged out|
|  Basic UI Design  |  4  |  +1: Login form is properly designed <br> +1: Allow user to input number for expense/earnings <br> +1: Can navigate between screens <br> +1: Basic screen design for each feature implemented|
|  Expense tracker backend  | 1 | +1: For the correct amount of expense/earnings|
|  Unit test |  4  |  -0.5: missing a unit test case|
|  Manual Test Plan |  4  |  +0.5: for each test case |

### Week 2
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Expense tracker frontend  | 2 | +1: Rendering the correct amount for expense tracker <br> +1: The complete design of expense tracker is implemented|
|  Wish List backend |  3  |  +2: Successfully scraped the data for the wish list product <br> +1: Handle errors|
|  Wish List Frontend |  6  |  +1: Can add stuff to the wish list <br> +2: Rendering the product information properly <br> +1: User can delete from the wish list <br> +1: Click certain tab will bring user to the product website <br> +1: Handle error views|
|  Unit test |  4  |  -0.5: missing a unit test case|
|  Manual Test Plan |  4  |  +0.5: for each test case |


### Week 3
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Visualization |  5  |   +2: Implement the visualization for expense tracker properly <br> +3: User can select the time range of the visualization |
|  Set goal |  5  | +1: User can set the amount goal <br>  +1: Amount goal properly stored in backend <br> +1: User can change the goal amount once per time range (day/week/month) <br> +1: Rendering correct result of whether the user meets the goal <br> +1: If not meet the goal, clicking the tab in wish list will not bring user to the product website|
|  Reset  |  3  |  +2: User can reset the expense tracker <br> +1: User can reset the wish list |
|  Unit test |  3  |  -0.5: missing a unit test case|
|  Manual Test Plan |  4  |  +0.5: for each test case |


### Week 4
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  App design |  2  |  +2: Beautiful App Design |
|  Custom features |  6  |  +2: For each custom feature implemented properly |
|  Notification |  4  |   +1: Prompting notification when the saving amount meets the goal <br> +1: The notification can navigate to the wish list/product website <br> +1: Notification when expense is largely greater than earnings each day <br> +1: Notification when monthly savings amount not meet the goal|
|  Unit Test |  5 |  +0.5: Per unit test |
|  Manual Test Plan |  5  |  +0.5: per test case |

### Grading Calculator
  - Week 1

https://docs.google.com/spreadsheets/d/1LhzSwWQyhrfntDo2NEbMBCnGtViZdAsnxnrrY9f3I9c/edit#gid=1203283929

  - Week 2
    
https://docs.google.com/spreadsheets/d/1bDvv_OZlHPLAp75qeyFQCavTbW3g6Wg3L2ITeHqYhvQ/edit#gid=1203283929  

  - Week 3

https://docs.google.com/spreadsheets/d/1IGfDNQmyR5V5Ez-votl9B40Fmk4XG-Xk1qdJfTK6XAE/edit#gid=1203283929

  - Week 4

https://docs.google.com/spreadsheets/d/1bDvv_OZlHPLAp75qeyFQCavTbW3g6Wg3L2ITeHqYhvQ/edit#gid=1203283929
