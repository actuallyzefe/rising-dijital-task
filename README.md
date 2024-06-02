# Rising Dijital Order App

### How to run?

You must have [Docker](https://www.docker.com/) installed on your machine.

navigate to the project directory.

docker build -t <image_name>

docker run -p 3000:3000 <image_name>

Don't forget to add your own .env credentials. In this project you just need one. <b>JWT_SECRET</b>

navigate to <b>http://localhost:3000/auth/register</b> 

After successfully registered you can login now from <b>http://localhost:3000/auth/login</b>

If you want to view products you can navigate to <b>http://localhost:3000/product/list</b>

At first you won't be able to place an order because you don't have a balance. Therefore, you need to make a deposit first

navigate to <b>http://localhost:3000/user/deposit</b>

Great! Now you are able to create your first order! Navigate to  <b>http://localhost:3000/order/create</b>

You can view your orders from  <b>http://localhost:3000/order/my-orders</b>

## How it works?

#### Authenticaion

Under the hood, when a register request comes in, The backend hashing password and creating a user in SQLite with given informations. On the login request, the backend checking password with hash and giving if passwords matches, hashing user without 'password' field and returning a response including jwt; ⁠ { token: 'eyJ...'} ⁠

The jwt will be checked on the backend and if able to decode, it will perform the operation in the request.\

### Tech Stack

•⁠  ⁠NestJS
•⁠  ⁠TypeScript
•⁠  ⁠ExpressJS
•⁠  ⁠SQLite
•⁠  ⁠AWS ECR
•⁠  ⁠AWS ECS (Fargate)

## Why I used This Stack?

#### Backend

NestJS is very powerful for developing high-scale applications. It increases development speed with built-in modules.

#### Deployment

Github Actions is provides fast and easy way to create pipelines. I can publish image to ECR and deploy to ECS on a fargate instance. ECS enables us to scale app to some point where we need to Kubernetes.

## What to Improve?

There are a lot of things to improve but due to task complete time limit I'm not able to do them all.

•⁠  ⁠Backend:
  - It would be very nice to have a swagger documentation.
  - I could be setting up a logging service with winston and monitoring with newrelic or add a ray tracing such as zipkin or opentelemetry.
  - I could be writing a pipeline with CircleCI and deploying it to Kubernetes.
  - It would be nice to have 2 layered(pod level, provider level) cache for improving performance and reducing costs.
  - I could be writing multiple product checkouts.
  - I could be integrating the app with a payment provider.

