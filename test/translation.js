describe("translations", function(){
    var translations = {
        "Username": [null, "Brukernavn"],
        "Want %s items": [null, "Ønsker %s gjenstander"],
        "%(cheese)s cheeses": [null, "%(cheese)s oster"]
    };
    var __ = require('../server/lib/translator')(translations);

    describe("translator", function(){
        it("should translate 'Username' -> 'Brukernavn'", function(){
            expect(__('Username')).to.equal('Brukernavn');
        });

        it("should translate 'Want %s items' -> 'Ønsker 2 gjenstander'", function(){
            expect(__('Want %s items', 2)).to.equal('Ønsker 2 gjenstander');
        });

        it("should translate '%(cheese)s cheeses' -> '4 oster'", function(){
            expect(__('%(cheese)s cheeses', {cheese: 4})).to.equal('4 oster');
        });
    });
});
