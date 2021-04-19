## Manual Test plan (updated in week2)
## Prerequisite

#### The following OS should be used for testing
- Mac OS X
- Linux
- Windows 7

#### Testing IDE
- Visual Studio Code

#### Project Requirement
- Expo
- JavaScript
- React Native
- Firebase
- Eslint


---
## Project Setup

- git clone https://gitlab.engr.illinois.edu/ziningc2/sp21-cs242-project

- cd sp21-cs242-project

- Make sure you have React Native packages dependencies installed
  

---
## Manual Tests
- To start the project, run the App using following command

    ```cd my-app```

    ```npm start```

- You should be seeing this in terminal

![](img/p0.png)

- You can run the App on an iOS simulator using XCode.

- This is the main screen

![](img/p1.png)

### Register

- If you are new to the App, you should go to the register page. After click the **REGISTER** button

![](img/p2.png)

You will have the sign up page to enter your username and password, and confirm your password. Password input are text secured.

- If your **password** and **Confirm password** does not match

![](img/p3.png)


You will receive the notification like this. You should click **OK** and re-enter

- If you enter password less than 6 characters

![](img/p4.png)

You will receive the notification like this. You should click **OK** and re-enter


- If you enter a valid username and password and click **SIGN UP**

*You will be guided to the main page. And your information will be inserted into the Firebase.*


### Login

- If you've already registered. You can go to the **Login** Screen and enter username and password. Password is text secured.

- If you enter a username that has not been registered before

![](img/p5.png)

You will receive the notification like this.

- If your password does not match your username as registered before

![](img/p6.png)

You will receive the notification like this. You should click **OK** and re-enter

- If you enter correct username and password and click **LOGIN**. You will be guided to the main screen of the App


### Application Main Page

- This the main screen of the Application

![](img/p7.png)

You can see there are four tabs in the bottom, each for the *expense tracker*, *wish list*, *search*, and *Report*.

You can see the **YOUR BALANCE** on the top showing your total balance, and the current date. The **Memo** below is for the user to input the Category of a transaction. The **Amount** is for the user to input the amount of a transaction. There's also a **Logout** button for logging out. 

- If you click the **Logout** button

You will be guided back to the login page.

- Click **Add** to add the expense/income to the tracker

For example *300* means an income of $300, and *-500* means an expense of $500. Certain amount will be added/deducted from the balance.

---

### Expense Tracker

- The balance amount is hided at first. If you click the **Show** Button

![](img/p8.png)

The exact amount of balance will be revealed.

---

### Wish List

- Click the **Wishlist** tab, you will be brought to the main Wish list screen.

![](img/p9.png)

The default product info is all empty. And the image is the *Amazon Logo*. You can enter url in the input box to add stuff to your wishlist.

- If you enter an invalid url

![](img/p10.png)

You will receive an alert message.

- If you enter a valid url

![](img/p11.png)

After a short loading scene, the information of the product of your url will be rendered in the wishlist screen. And certain information will be stored into database. 

- If you click the image

![](img/p12.png)

After a short loading scene, you will be guided to the official Amazon website of the wish list product.

- You can click the **Back** button on the top right corner to go back to the wishlist screen.

---

### TO DO
