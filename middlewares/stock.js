var Chair      = require('../model/chairModel');

module.exports = function(req, res, next) {
    var cart = req.body.cart;
    var chairsMissing = [];
    var toModify = true;
    req.enoughStock = true;
    // Check if there is enough stock to accept the order
    Chair.find({}).then(function (chairs) {
        for( var i = 0; i < cart.length; i++ ) {
            for (var j = 0; j < chairs.length; j++) {
                if (chairs[j].reference == cart[i].reference) {
                    var chair = chairs[j];
                    if (chair.stock >= cart[i].qty) {
                        chair.stock -= cart[i].qty;
                        chair.save();
                    }
                    else {
                        req.enoughStock = false;
                        chairsMissing.push({reference: chair.reference, name: chair.name});
                    }
                    break;
                }
            }
        }

        // Case if there is not enough stock to accept the order
        if( !req.enoughStock ) {
            for (var i = 0; i < cart.length; i++) {
                for (var j = 0; j < chairs.length; j++) {
                    if (chairs[j].reference == cart[i].reference) {
                        toModify = true;

                        // Check if the current item is one of the missing chair
                        for (var j = 0; j < chairsMissing.length; j++){
                            if( chairsMissing[j].reference === chair.reference ){
                                toModify = false;
                            }
                        }
                        if( toModify ){
                            chair.stock += cart[j].qty;
                            chair.save();
                        }
                    }
                }
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
        console.log('stock');
        next();
    });
};