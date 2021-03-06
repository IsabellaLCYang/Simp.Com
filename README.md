# Project
Link: https://dogecom.herokuapp.com

### Intro: 
We designed an e-commerce platform supporting roles from guests to buyer to seller. We included a variety of features from upload products, drag & drop files and cart operations to more advanced integration such as live chat and data visualization.

### Project Description
We designed a business startup framework which supports various role-based activity through our interactive dashboard UI for small business and their corresponding targeted customers. Seller activity spans from designing presentation page to tracking order status where logged-in user can browse page, add/delete item to/from carts/wishlist, receive email notification for restocking of wanted item, adn guests are limited to only browsing.

User login information including address and encrypted password will be saved as JSON into our database along with product and cart information where as uploaded product picture will be stores as schemas with Mongoose/ GridFS. Most data will support editing, retrieving features while email are used for authentication and registration. Additional functionalities may include monthly data visualization of sales, live chat or recommendation. 

### Project Requirements
**Minimal Requirements**:
- [x] Login
- [x] Basic CRUD operation on user profile includes remove/update/add to cart/wishlist 
- [x] Editable and expandable product presentation page 
- [x] Track order status for shipped items
- [x] View product page 

**Standard Requirements**:
- [x] Encrypted password 
- [ ] Data visualization
- [ ] Email notification for restocking of wanted item
- [x] Login with Google
- [x] Drag and drop pictures (jpeg,gif and most image and video format)

**Stretch Requirements**:
- [ ] Payment (support paypal, mastercard, visa credit cards etc) 
- [x] Livechat for customer support 
- [ ] Recommondation system 

### Task Breakdowns 
**Login**: 
1. Design data structures for users 
2. Design UI 
3. Databases schema 
4. REST API Endpoints for create(sign up), update(forgot my password) 
5. JWT caches

**Editable Presentation Page**:
- Icon and API for add textbox
- Design template(s) for adding text and pictures with preset size and font 
- Embed clickable hyperlink to a picture that leads to webpage allowing multiple pictures and a section for product description


**Viewing Presentation Page**: 
- Search product API, Sort product API (newest/class, price ascending/descending)
- Add to cart feature 

### Sketch 
![Rough_Sketch_Prototype.jpg](./doc/Rough_Sketch_Prototype.jpg)

