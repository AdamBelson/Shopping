var mongoose = require('mongoose'),
    Product = mongoose.model('Product');
	
exports.getProduct = function(req, res){
	
	Product.findOne({_id: req.query.productId}).exec(function(err, product){
		if (!product){
			res.status(404).json({msg: req.query.productId});
		} else {
			res.json(productId);
		}
	});
	
};

exports.getProducts = function(req, res){
	
	Product.find().exec(function(err, products){
		if (!products){
			res.status(404).json({msg: 'Products not found'});
		} else {
			res.json(products);
		}
	});
	
};
