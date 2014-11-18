var mongoose = require('mongoose'),
    Order = mongoose.model('Order'),
	Address = mongoose.model('Address'),
	Billing = mongoose.model('Billing'),
	Customer = mongoose.model('Customer');
	
exports.getOrder = function(req, res){
		console.log('adamhere');
	Product.findOne({_id: req.query.orderId}).exec(function(err, order){
		if (!order){
			res.status(404).json({msg: req.query.orderId});
		} else {
			res.json(orderId);
		}
	});
	
};

exports.getOrders = function(req, res){
	
	Order.find({userid: 'customerA'}).exec(function(err, orders){
		if (!orders){
			res.status(404).json({msg: 'Orders not found'});
		} else {
			res.json(orders);
		}
	});
	};
	
exports.addOrder = function(req, res){
  var orderShipping = new Address(req.body.updatedShipping);
  var orderBilling = new Billing(req.body.updatedBilling);
  var orderItems = req.body.orderItems;
  var newOrder = new Order({userid: 'customerA',
                      items: orderItems, shipping: orderShipping, 
                      billing: orderBilling});
  newOrder.save(function(err, results){
    if(err){
		res.status(500).json({msg: 'Failed to save Order.'});
    } else {
      Customer.update({ userid: 'customerA' }, 
          {$set:{cart:[]}})
      .exec(function(err, results){
        if (err || results < 1){
			res.status(404).json({msg: 'Failed to update Cart.'});
        } else {
         res.json({msg: "Order Saved."});
        }
      });
    }
  });
  };