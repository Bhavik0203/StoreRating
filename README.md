API Testing Guide for Store Rating API
Based on the code provided, here's a comprehensive guide to test your Store Rating API in Postman with JSON request bodies for each endpoint.
Base URL
First, set up your environment with the base URL:
http://localhost:5000/api
Authentication Routes
1. Register User

Endpoint: POST /auth/register
JSON Body:

json{
  "name": "Test User Full Name",
  "email": "testuser@example.com",
  "password": "Password123!",
  "address": "123 Main Street, City, Country, Postal Code",
  "role": "USER"  // Options: "USER", "ADMIN", "STORE_OWNER"
}
2. Login

Endpoint: POST /auth/login
JSON Body:

json{
  "email": "testuser@example.com",
  "password": "Password123!"
}
Response will include a JWT token you'll need for protected routes
3. Get Current User

Endpoint: GET /auth/me
Authorization: Bearer Token (from login response)

4. Update Password

Endpoint: PUT /auth/update-password
Authorization: Bearer Token
JSON Body:

json{
  "currentPassword": "Password123!",
  "newPassword": "NewPassword123!"
}
Store Routes
1. Get All Stores

Endpoint: GET /stores

2. Get Store by ID

Endpoint: GET /stores/:id (e.g., /stores/1)

3. Create Store (Admin only)

Endpoint: POST /stores
Authorization: Bearer Token (Admin user)
JSON Body:

json{
  "name": "Example Store Name That Meets Length Requirements",
  "email": "store@example.com",
  "address": "456 Store Street, City, Country, Postal Code",
  "ownerId": 2  // ID of a user with STORE_OWNER role
}
4. Update Store (Admin only)

Endpoint: PUT /stores/:id (e.g., /stores/1)
Authorization: Bearer Token (Admin user)
JSON Body:

json{
  "name": "Updated Store Name That Meets Length Requirements",
  "email": "updated@example.com",
  "address": "789 Updated Street, City, Country, Postal Code",
  "ownerId": 2
}
5. Delete Store (Admin only)

Endpoint: DELETE /stores/:id (e.g., /stores/1)
Authorization: Bearer Token (Admin user)

6. Get Store Dashboard (Store Owner only)

Endpoint: GET /stores/dashboard/owner
Authorization: Bearer Token (Store Owner user)

Rating Routes
1. Get Store Ratings

Endpoint: GET /ratings/store/:storeId (e.g., /ratings/store/1)

2. Submit Rating

Endpoint: POST /ratings
Authorization: Bearer Token
JSON Body:

json{
  "storeId": 1,
  "rating": 4,
  "comment": "Great service and products!"
}
3. Get User Rating for Store

Endpoint: GET /ratings/user/store/:storeId (e.g., /ratings/user/store/1)
Authorization: Bearer Token

4. Delete Rating

Endpoint: DELETE /ratings/:ratingId (e.g., /ratings/1)
Authorization: Bearer Token

User Routes (Admin only)
1. Get All Users

Endpoint: GET /users
Authorization: Bearer Token (Admin user)

2. Create User

Endpoint: POST /users
Authorization: Bearer Token (Admin user)
JSON Body:

json{
  "name": "New User Full Name",
  "email": "newuser@example.com",
  "password": "Password123!",
  "address": "321 User Street, City, Country, Postal Code",
  "role": "USER"  // Options: "USER", "ADMIN", "STORE_OWNER"
}
3. Get Dashboard Stats

Endpoint: GET /users/dashboard-stats
Authorization: Bearer Token (Admin user)

4. Get User by ID

Endpoint: GET /users/:id (e.g., /users/1)
Authorization: Bearer Token (Admin user)

5. Update User

Endpoint: PUT /users/:id (e.g., /users/1)
Authorization: Bearer Token (Admin user)
JSON Body:

json{
  "name": "Updated User Full Name",
  "email": "updated@example.com",
  "address": "987 Updated Street, City, Country, Postal Code",
  "role": "STORE_OWNER"
}
6. Delete User

Endpoint: DELETE /users/:id (e.g., /users/1)
Authorization: Bearer Token (Admin user)

Testing Flow

Register an admin user
Login with admin credentials to get token
Create additional test users (store owner, regular user)
Create store(s) as admin
Submit ratings as regular user
Test all endpoints with appropriate permissions

Setting up Authorization in Postman
After receiving the token from login:

Go to the Authorization tab
Select "Bearer Token" from the Type dropdown
Paste your token in the Token field

This will add the Authorization header to your request:
Authorization: Bearer <your_jwt_token>
