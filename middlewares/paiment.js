module.exports = function(req, res, next) {
	var titulary = req.body.titulary;
	var number = req.body.number;
	var expiration = req.body.expiration;
	var cryptogram = req.body.cryptogram;
	req.valid = true;
	req.message = null;

	var dateRegExp = /[0-3]\d\/[0-1]\d\/\d\d\d\d/g;
	var cryptoRegExp = /\d\d\d/g;
	if(number.toString().length !== 16){
		req.valid = false;
		req.message = "Vous n'avez pas saisi un numéro de carte bleu à 16 chiffres"; 
	}
	if(cryptogram.length !== 3 || !cryptogram.match(cryptoRegExp) ){
		req.valid = false; 
		req.message = "Le cryptogramme doit contenir 3 chiffres"; 
	}
	if( !expiration.match(dateRegExp) ){
		req.valid = false;
		req.message = "Vous devez rentrez une date valide (jj/mm/aaaa)";
	}
	else{
		var day = expiration.slice(0,2);
		var month = expiration.slice(3,5);
		var year = expiration.slice(6,10);
		if( day > 31 || day < 1 || month > 12 || month < 1 ){
			req.valid = false;
			req.message = "Vous devez rentrez une date valide (jj/mm/aaaa)";
		}
		else{
			var yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - 1); // Récupération de la date d'hier pour éviter le conflit lorsque la date d'expiration est le jour de la commande
			var sendDate = new Date(year, month-1, day);
			if( yesterday > sendDate ){
				req.valid = false;
				req.message = "La date d'expiration ne doit pas être passée."
			}
		}
	}
	next();
};