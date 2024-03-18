DROP TABLE LoginAttempts;
DROP TABLE Transaction;
DROP TABLE TransactionMode;
DROP TABLE UserPreference;
DROP TABLE Notification;
DROP TABLE UserFeedback;
DROP TABLE FavouriteProducts;
DROP TABLE UserFavourites;
DROP TABLE Quantity;
DROP TABLE GiftCardValue;
DROP TABLE PromoCode;
DROP TABLE ProductOrders;
DROP TABLE UserRewardsHistory;
DROP TABLE UserRewards;
DROP TABLE Product;
DROP TABLE Orders;
DROP TABLE Brand;
DROP TABLE Category;
DROP TABLE CustomerPhoneDetails;
DROP TABLE Customer;
DROP TABLE Users;
DROP TABLE Roles;

CREATE TABLE Roles (
roleID CHAR(20),
isSuperAdmin NUMBER(1),
isCustomer NUMBER(1),
PRIMARY KEY (roleID));

CREATE TABLE Users (
userID CHAR(20),
roleID CHAR(20),
emailID CHAR(50),
password CHAR(50),
isActive NUMBER(1),
lastLogin TIMESTAMP,
PRIMARY KEY (userID),
FOREIGN KEY(roleID) REFERENCES Roles(roleID));

CREATE TABLE Customer (
customerID CHAR(20),
userID CHAR(20),
firstName CHAR(20),
lastName CHAR(20),
zipcode INTEGER,
address CHAR(50),
DOB DATE,
PRIMARY KEY (customerID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE CustomerPhoneDetails (
customerID CHAR(20),
phoneNumber INTEGER,
phoneType CHAR(30),
PRIMARY KEY (customerID, phoneNumber),
FOREIGN KEY(customerID) REFERENCES Customer(customerID) ON DELETE CASCADE);

CREATE TABLE LoginAttempts (
userID CHAR(20),
loginAttempts INTEGER,
loginDatetime TIMESTAMP,
PRIMARY KEY (userID,loginAttempts),
FOREIGN KEY(userID) REFERENCES Users(userID) ON DELETE CASCADE);

CREATE TABLE TransactionMode(
transactionModeID CHAR(20),
transactionMode CHAR(20),
PRIMARY KEY(transactionModeID));

CREATE TABLE Transaction (
transactionID CHAR(20),
userID CHAR(20),
transactionModeID CHAR(20),
status CHAR(20),
amount REAL,
transactionDatetime TIMESTAMP,
PRIMARY KEY (transactionID),
FOREIGN KEY(transactionModeID) REFERENCES TransactionMode(transactionModeID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE UserPreference (
preferenceID CHAR(20),
userID CHAR(20),
email NUMBER(1),
sms NUMBER(1),
PRIMARY KEY (preferenceID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE Notification (
notificationID CHAR(20),
userID CHAR(20),
isSMSSent NUMBER(1),
isEmailSent NUMBER(1),
message CHAR(80),
notificationDatetime TIMESTAMP,
PRIMARY KEY (notificationID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE UserFeedback (
feedbackID CHAR(20),
userID CHAR(20),
message CHAR(80),
rating INTEGER,
PRIMARY KEY (feedbackID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE Brand (
brandID CHAR(20),
brandName CHAR(40),
PRIMARY KEY (brandID));

CREATE TABLE Category (
categoryID CHAR(20),
categoryName CHAR(40),
PRIMARY KEY (categoryID));

CREATE TABLE Product (
productID CHAR(20),
brandID CHAR(20),
categoryID CHAR(20),
productName CHAR(40),
description CHAR(80),
termsAndConditions CHAR(80),
stepsToRedeem CHAR(80),
PRIMARY KEY (productID),
FOREIGN KEY(brandID) REFERENCES Brand(brandID),
FOREIGN KEY(categoryID) REFERENCES Category(categoryID));

CREATE TABLE UserFavourites (
userID CHAR(20),
favouriteID CHAR(20),
PRIMARY KEY(userID, favouriteID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE FavouriteProducts (
userID CHAR(20),
favouriteID CHAR(20),
productID CHAR(20),
PRIMARY KEY(userID, favouriteID, productID),
FOREIGN KEY(userID, favouriteID) REFERENCES UserFavourites(userID, favouriteID),
FOREIGN KEY(productID) REFERENCES Product(productID));

CREATE TABLE Quantity (
productID CHAR(20),
quantity INTEGER,
PRIMARY KEY (productID, quantity),
FOREIGN KEY(productID) REFERENCES Product(productID) ON DELETE CASCADE);

CREATE TABLE GiftCardValue (
giftcardID CHAR(20),
productID CHAR(20),
giftCardNumber INTEGER,
giftCardPin INTEGER,
PRIMARY KEY (giftcardID),
FOREIGN KEY(productID) REFERENCES Product(productID));

CREATE TABLE PromoCode (
promocodeID CHAR(20),
productID CHAR(20),
Name CHAR(20),
offerValue REAL,
PRIMARY KEY (promocodeID),
FOREIGN KEY(productID) REFERENCES Product(productID));

CREATE TABLE Orders (
orderID CHAR(20),
userID CHAR(20),
status CHAR(20),
discount REAL,
totalAmount REAL,
startDate DATE,
endDate DATE,
orderDatetime TIMESTAMP,
PRIMARY KEY (orderID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE ProductOrders (
orderID CHAR(20),
productID CHAR(20),
count INTEGER,
PRIMARY KEY (orderID, productID),
FOREIGN KEY(productID) REFERENCES Product(productID),
FOREIGN KEY(orderID) REFERENCES Orders(orderID));

CREATE TABLE UserRewards (
rewardID CHAR(20),
userID CHAR(20),
points REAL,
PRIMARY KEY (rewardID),
FOREIGN KEY(userID) REFERENCES Users(userID));

CREATE TABLE UserRewardsHistory (
historyID CHAR(20),
rewardID CHAR(20),
orderID CHAR(20),
points REAL,
modifiedDatetime TIMESTAMP,
PRIMARY KEY (historyID),
FOREIGN KEY(rewardID) REFERENCES UserRewards(rewardID),
FOREIGN KEY(orderID) REFERENCES Orders(orderID));