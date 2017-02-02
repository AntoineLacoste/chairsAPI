var Chair      = require('../model/chairModel');

module.exports = function(req, res, next) {
	var cart = req.body.cart;
	var chairsMissing = [];
	var toModify = true;
	req.enoughStock = true;

	// Check if there is enough stock to accept the order
	for( var i=0; i<cart.length; i++ ) {
		console.log('test : ',cart[i].reference);
		Chair.find({reference: cart[i].reference}).then(function (chair) {
			console.log('ref : ',chair);
			console.log('stock : ',chair.stock);
			console.log('dmd : ',cart[i].qty);
			if(chair.stock > cart[i].qty){
				chair.stock -= cart[i].qty;
				chair.save();
			}
			else{
				req.enoughStock = false;
				chairsMissing.push({reference: chair.reference, name: chair.name});
			}
		});
	}
	// Case if there is not enough stock to accept the order
	if( !req.enoughStock ){
		for( var i=0; i<cart.length; i++ ) {
			Chair.find({reference: cart[i].reference}).then(function (chair) {
				toModify = true;

				// Check if the current item is one of the missing chair 
				for (var j=0; j<chairsMissing.length; j++){
					if( chairsMissing[j].reference === chair.reference ){
						toModify = false;
					} 
				}
				if( toModify ){
					chair.stock += cart[i].qty;
					chair.save();
				}
			});
		}

		// Create return message
		if( chairsMissing.length > 1){
			req.message = "Il n'y a pas assez de stock pour les articles ";
			for( var i=0; i<chairsMissing.length; i++ ) {
				req.message += chairsMissing[i].name + " (référence : " + chairsMissing[i].reference + ") | ";
			}
		}
		else{
			req.message = "Il n'y a pas assez de stock pour l'article " + chairsMissing[0].name + " (référence : " + chairsMissing[0].reference + ")";
		}
		req.valid = false;
	}
	next();
};