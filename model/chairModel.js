var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var chairSchema = new Schema({
    reference: Number,
    name: String,
    description : String,
    imageURL: String,
    type: String,
    color: String,
    code: String,
    price: Number,
    material: String
});

var chairModel = mongoose.model('Chair', chairSchema);

chairModel.find({}).then(
    function(chairs){
        if(chairs.length == 0) {
            var chair1 = new chairModel({
                reference: 15244,
                name: 'Ingolf',
                description: 'Chaise, blanc. Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra.',
                imageURL: 'http://www.ikea.com/fr/fr/images/products/ingolf-chaise-blanc__0454095_PE602593_S4.JPG',
                type: 'Fonctionnel',
                color: 'Blanc',
                code: '#FFFFFF',
                price: 550,
                material: 'Bois massif'
            });
            var chair2 = new chairModel({
                reference: 48775,
                name: 'BÖRJE',
                description: 'Chaise, brun, Gobo blanc. Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra.',
                imageURL: 'http://www.ikea.com/fr/fr/images/products/borje-chaise-blanc__0121732_PE278342_S4.JPG',
                type: 'Confort',
                color: 'Marron',
                code: '#a8572e',
                price: 399,
                materia: '100% coton'
            });
            var chair3 = new chairModel({
                reference: 78445,
                name: 'Fauteuil design multicolore',
                description: 'Fauteuil très design, effet atténue sur les daltoniens. Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra.',
                imageURL: 'https://www.sofamobili.com/boutique/images_produits/fauteuil-design-capitonne-frank-z.jpg',
                type: 'Gaming',
                color: 'Vert',
                code: '#1b9532',
                price: 5490,
                material: 'Cuir'
            });
            var chair4 = new chairModel({
                reference: 65341,
                name: 'DXRacer Gaming Chair',
                description: 'Chaise gaming professionnelle, se penche jusqu\'a 30°.  Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra.',
                imageURL: 'http://images.dxracer-europe.com/data/product/390f660/dxracer_tank_gaming_chair__ohtc29ne.jpg',
                type: 'Gaming',
                color: 'Vert',
                code: '#1b9532',
                price: 5490,
                material: 'Cuir'
            });
            var chair5 = new chairModel({
                reference: 12441,
                name: 'Confetti',
                description: 'Chaises pliantes de jardin en métal rouge. Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra.',
                imageURL: 'http://www.maisonsdumonde.com/img/2-chaises-pliantes-de-jardin-en-metal-rouge-confetti-1000-8-32-155422_3.jpg',
                type: 'Exterieur',
                color: 'blanc',
                code: '#FFFFFF',
                price: 499,
                material: 'Métal'
            });

            chair1.save(function (err, chair){
                chair2.save(function (){
                    chair3.save(function (){
                        chair4.save(function (){
                            chair5.save(function (){
                            });
                        });
                    });
                });
            });
        }
    },
    function (err) {
        console.log(err);
    });

module.exports = chairModel;