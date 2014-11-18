var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/cart');
require('./models/cart_model.js');
var Address = mongoose.model('Address');
var Billing = mongoose.model('Billing');
var Product = mongoose.model('Product');
var ProductQuantity = mongoose.model('ProductQuantity');
var Order = mongoose.model('Order');
var Customer = mongoose.model('Customer');
function addProduct(customer, order, name, imagefile, 
                    price, description, instock){
  var product = new Product({name:name, imagefile:imagefile, 
                             price:price, description:description, 
                             instock:instock});
  product.save(function(err, results){
    order.items.push(new ProductQuantity({quantity: 1, 
                                          product: [product]}));
    order.save();
    customer.save();
    console.log("Product " + name + " Saved.");
  });
}
Product.remove().exec(function(){
  Order.remove().exec(function(){
    Customer.remove().exec(function(){
      var shipping = new Address({
        name: 'Customer A',
        address: 'Somewhere',
        city: 'My Town',
        state: 'CA',
        zip: '55555'
      });
      var billing = new Billing({
        cardtype: 'Visa',
        name: 'Customer A',
        number: '1234567890',
        expiremonth: 1,
        expireyear: 2020,
        address: shipping
      });
      var customer = new Customer({
        userid: 'customerA',
        shipping: shipping,
        billing: billing,
        cart: []
      });
      customer.save(function(err, result){
        var order = new Order({
          userid: customer.userid,
          items: [],
          shipping: customer.shipping,
          billing: customer.billing
        });
        order.save(function(err, result){
          addProduct(customer, order, 'zombie1', 
              'zombie1.jpg', 12.34, 
              'zombie1 description', 
              Math.floor((Math.random()*10)+1));
          addProduct(customer, order, 'zombie2', 
              'zombie2.jpg', 45.45, 
              'zombie2 description', 
              Math.floor((Math.random()*10)+1));
          addProduct(customer, order, 'zombie3', 
              'zombie3.jpg', 38.52, 
              'zombie3 description', 
              Math.floor((Math.random()*10)+1));
          addProduct(customer, order, 'zombie4', 
              'zombie4.jpg', 77.45, 
              'zombie4 description', 
              Math.floor((Math.random()*10)+1));
        });
      });      
    });
  });
});;