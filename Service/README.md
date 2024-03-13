# stockmarket


Step 1

   	npm i
 
Step 2 - start server 

   	npm start

API Login Credential

    John / freespace123 - admin (read / write - AAPL, MSFT, AMZN, GOOG, TSLA, FB)   idUser = 1
    
    jane / freespace321 - user (read only - AAPL, AMZN, GOOG)	 idUser = 2

Remote Database Credential:

      https://freedb.tech/phpmyadmin/
      user = freedbtech_rootassigmnment
      password = root@123


API LIST 

POST /api/stock/login

	payload 
	{
		"username": "john",
		"password":"freespace123"
	}

	reponse payload
	{
			"status": 200,
			"errorCode": null,
			"message": "OK",
			"payload": [
				{
					"idUser": 1,
					"userName": "john"
				}
			]
	}

		
GET /api/stock/user/:idUser/list/

	Gives List of last five values based on user permission

POST /api/stock/save

    payload 
    {
        "idUser":2,
        "idStock": "6",
        "value":"101"
    }
 
MORE API 

    GET /getAllStockTransaction

    GET /getAllUser

    GET /getAllSystemAttributes

    GET /getAllUserGrants


