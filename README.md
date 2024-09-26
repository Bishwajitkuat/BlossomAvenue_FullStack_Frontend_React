# Blossom Avenue

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Table of content

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)

## Overview

This project is the Front service for Blossom Avenue which is a flower shop application, developed using React, Typescript, React-Query and Tailwindcss. This user interface various functionalities including user management, product management, and order processing. The system supports three types of users: **Admin**, **Employee** and **Customer**.

### Live Demo

The project is deployed you can visit in the following link.

- There are some test user credentials are given at the login page for testing
- There are some test users to test user update and delete.
- This is still an ongoing project some feature might not work as intended or missing.

[Blossom Avenue](https://blossomavenue.vercel.app/)

The backend project is deployed too. You can find the API documentation from the following link.

[The Swagger documentation](https://blossomavenue-f2grfmdmepbcb4es.northeurope-01.azurewebsites.net/index.html)

<img style="width:250px" src="screen_shots/Screenshot_0.png">
<img style="width:250px" src="screen_shots/Screenshot_1.png">
<img style="width:250px" src="screen_shots/Screenshot_2.png">
<img style="width:250px" src="screen_shots/Screenshot_3.png">

### Key Features

- **User Management**:

  - User can create and update their profile.
  - Admin user can update other users
    - Change user role and active status.
    - Delete user.

- **Authentication Management**

  - Users can authenticate with their credentials
  - When users logged in, a jwt access token is send as response and a HttpOnly refresh token is set to user's browser.
  - Users can access resources from Authorized routes with valid access token
  - When access token is expired, they can make a request to /refreshToken endpoint with expired access token and refresh token from cookie
    - expired access token is required to generate new access token and refresh token.
  - Users can logged from all the session by making a request to /logout route with access and refresh token.

- **Product & Category Management**:

  - Customers can browse sort, filter products.
  - And can also view product detail
  - Admins and Employees can create, view, update, delete
    - Product Categories
    - Products
    - Images
    - Variations
      - Each product can have multiple variation and images.

- **Cart Management**
  - Customers can add and remove product to their car as well as can increase and decrease the amount by one at a time.
  - Customers can clear their cart altogether.
  - Cart info is stored in database, so customer can still view their cart from another session.
- **Order Management**

  - Customer can place order, view all of their orders and order by id.
  - Admin or Employee can update or delete order
    - Such as change status, shipping address.

- **Product Reviews**:

  - Customers can create, update, delete, and view reviews for products.

### Folder Structure

```bash
.
├── App.tsx
├── components
│   ├── ImageCarousel.tsx
│   ├── NotAvailable.tsx
│   ├── Pagination.tsx
│   └── ui
│       ├── Error.tsx
│       ├── icons
│       │   ├── BankNoteIcon.tsx
│       │   ├── CartIcon.tsx
│       │   ├── LockIcon.tsx
│       │   ├── MapPinIcon.tsx
│       │   ├── ParsonIcon.tsx
│       │   ├── StarIcon.tsx
│       │   ├── StockIcon.tsx
│       │   └── TrashCanIcon.tsx
│       └── Loader.tsx
├── features
│   ├── Authentications
│   │   └── LoginForm.tsx
│   ├── Authorizations
│   │   ├── AdminProtectedRoutes.tsx
│   │   ├── EmployeeAdminProtectedRoutes.tsx
│   │   ├── ProtectedRoutes.tsx
│   │   └── RestrictedAccess.tsx
│   ├── Cart
│   │   ├── CartDetail.tsx
│   │   ├── CartIconWithItemNumber.tsx
│   │   ├── CartItems.tsx
│   │   └── NoItemInCart.tsx
│   ├── Home
│   │   └── LandingBanner.tsx
│   ├── Order
│   │   ├── AdminOrders.tsx
│   │   ├── AllOrders.tsx
│   │   ├── CreateOrder.tsx
│   │   ├── OrderDetail.tsx
│   │   ├── OrderItems.tsx
│   │   └── ShippingAddress.tsx
│   ├── Products
│   │   ├── AddProductReview.tsx
│   │   ├── AdminProducts.tsx
│   │   ├── AllProducts.tsx
│   │   ├── CreateProductForm.tsx
│   │   ├── FilterProduct.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductDetail.tsx
│   │   ├── ProductReviews.tsx
│   │   ├── UpdateProduct.tsx
│   │   └── VariationsSelector.tsx
│   └── users
│       ├── AdminUpdateUser.tsx
│       ├── UserProfile.tsx
│       ├── UsersTable.tsx
│       ├── Users.tsx
│       └── UserUpdateForm.tsx
├── hooks
│   ├── Auth
│   │   ├── useGetAuthFromLocalStorage.tsx
│   │   ├── useRefreshToken.tsx
│   │   ├── useSetAuthToLocalStorage.tsx
│   │   ├── useUserLogin.tsx
│   │   ├── useUserLogout.tsx
│   │   └── useUserRegistration.tsx
│   ├── Cart
│   │   ├── useAddToCart.tsx
│   │   ├── useClearCart.tsx
│   │   ├── useDeleteItemFromCart.tsx
│   │   ├── useGetCart.tsx
│   │   └── useReduceQuantityFromCart.tsx
│   ├── Order
│   │   ├── useAddOrder.tsx
│   │   ├── useDeleteOrder.tsx
│   │   ├── useGetAllOrdersByAdmin.tsx
│   │   ├── useGetAllOrders.tsx
│   │   └── useUpdateOrderStatus.tsx
│   ├── products
│   │   ├── useAddProductReview.tsx
│   │   ├── useCreateProduct.tsx
│   │   ├── useDeleteProduct.tsx
│   │   ├── useGetLatestProducts.tsx
│   │   ├── useGetProductById.tsx
│   │   ├── useGetProducts.tsx
│   │   └── useUpdateProduct.tsx
│   ├── useAxiosPrivate.tsx
│   ├── useDebounce.tsx
│   ├── useGetAllCatagories.tsx
│   └── User
│       ├── useDeleteUserByAdmin.tsx
│       ├── useGetAllUsersByAdmin.tsx
│       ├── useGetUserProfile.tsx
│       ├── useUpdateProfile.tsx
│       └── useUpdateUserByAdmin.tsx
├── index.css
├── index.tsx
├── layout
│   ├── AppLayout.tsx
│   ├── Footer.tsx
│   └── Header.tsx
├── pages
│   ├── Cart.tsx
│   ├── CreateOrderPage.tsx
│   ├── CreateProduct.tsx
│   ├── Dashboard.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Orders.tsx
│   ├── Products.tsx
│   ├── Product.tsx
│   ├── Profile.tsx
│   └── UserRegistration.tsx
├── react-app-env.d.ts
├── reportWebVitals.ts
├── services
│   ├── api
│   │   ├── authentication.ts
│   │   └── axios.ts
│   └── zod
├── setupTests.ts
├── store
├── test
│   ├── components
│   │   ├── appRender.tsx
│   │   └── components
│   │       ├── Error.test.tsx
│   │       ├── ImageCarousel.test.tsx
│   │       └── NotAvailable.test.tsx
│   └── features
│       ├── CartDetail.test.tsx
│       ├── LandingBanner.test.tsx
│       ├── LoginForm.test.tsx
│       └── ProductDetail.test.tsx
└── utils
    └── types
        ├── authentication.ts
        ├── cart.ts
        ├── order.ts
        ├── pagination.ts
        ├── product.ts
        └── user.ts
```

### Technologies Used

- **React**
- **Typescript**
- **React Query**
- **React Router**
- **React Testing Library**
- **Tailwindcss**
