1. npm install
2. npm run start:debug
3. generate OTP with POST `/auth/requestotp`
  ```
  {
    "email": "sample@example.com"
  }
  ```
4. get the OTP from console
5. login with POST `/auth/login`
  ```
  {
    "email": "sample@example.com",
    "otp": 123456
  }
  ```
6. sample response: 
  ```
  {
    "user": {
      "email": "sample@example.com",
      "_id": "643176972b6af261734206da",
      "__v": 0
  },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDMxNzY5NzJiNmFmMjYxNzM0MjA2ZGEiLCJpYXQiOjE2ODA5NjMyMjMsImV4cCI6MTY4MzU1NTIyM30. vEKLvTCUJ3-KYC5yBG43HOe31fldpV-oL9RNkb-Y88I"
  }
  ```
7. Do all other requests with header `X-Access-Token` and value as token from above
8. Get the profile at GET `/user/profile` 