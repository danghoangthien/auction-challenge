# Auction system assessment

## Database
**Engine: Mysql**
**ORM library: sequelize**
### Tables schema
  -[Schema](server/src/sequelizer/schema.yml)

## Assumption
This project scope is focus on auction, so I simplified some bussiness requirement of folowing domain:
- **Deposit** (make simple deposit function just let bidder adding amount, then it will increment bidder amount right away).
- **Register** (simple register with unique email, non-verify method applied ex: email, otp verification...).
- **Login** (simple email and password login).
- **User aka Bidder** - make only one user type as bidder who could both create new item for auction and place bid for an auction.
- **Item & Auction** separate domain of **Item** against **Auction** so that and item could be in auction if it auction session fail or that item is re-enable based on item domain bussiness.
- **Place Bid** When a bid are placed:
  + Reserved amount will be take place by deducting biddder balance amount.
  + Failed bidder will be refunded by Reserved bidding amount on the fly.
### Authentication
- Using *Authorization header* with *Bearer token* with expiry.
- Generating and Verifying token using JWT
- private routes are protected by Authentication-check middleware which using JWT to verify Bearer token from Authorization header.
- User access protected routed from browser will be redirected to /login
### Application flow
- User register.
- Login with registered email.
- Access home page by default.
- Home page with contain all item list with filter ('Available - OnGoing', 'InAuction', 'Completed').
- Click on filter will see filtered items.
- Start deposit => Balance amount on headder will be updated immediately.
- Start create some item and set Ready for aution:
  + => relevant item list will be updated immediately.
  + => Triggering an scheduler to end an expired auction in future (not tested yet)
- Only InAuction item could have Bid button for bidding.
- When Bidding success:
  + => Balance amount on headder will be updated (refund, reverse) immediately.
  + => Relevant items in InAuction list will update auction info (current winner, current amount) immediately.
#### Not working yet
- When bidder start create some item without set Ready for aution, we don't have function to set it Ready for aution later yet.
- Expected to have sheduler to end an expired auction => accossiated relation data not alter properly yet.
### Coding architecture
#### Backend:
- Leveraging **Dependency Injection** pattern for easier managing and mocking dependency in testing
- Try to apply **SOLID DRY** principle
- Using Scheduler job to run future job in background.
- Leveraging **Observer Pattern** to reduce code complexity and make it easier to expand in future. For instance: when an auction is start, Email observer object will be notified and sending commercial email to target user, meanwhile Sheduler Observer will be notified and set a scheduled job for ending Aution in the expired time
#### Frontend:
- Using **Lazy loading (with retry)** to reduce and optimize bundle size
- Using observer pattern to listen and update common states

## [Demo Screenshot](https://www.awesomescreenshot.com/video/18994200?key=1b915050396e05b4f4e7f1137a73ca8d)

## [Setup](README.md)
