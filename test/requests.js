describe("basic requests", function(){
    var passportStub = require('passport-stub'),
        User = require('../server/models').User;

    before(function(done){
        app.db.connection.db.dropDatabase(function(){
            passportStub.install(app);
            var testUser = new User({
                _id: 'testuser@strekmann.no',
                name: 'Testuser',
                username: 'testulf',
                is_active: true,
                is_admin: false,
                email: 'testuser@strekmann.no'
            });
            testUser.save(function(err, user){
                done(err);
            });
        });
    });

    after(function(done){
        app.db.connection.db.dropDatabase(function(){
            passportStub.uninstall();
            done();
        });
    });

    describe("when fetching unknown url", function(){
        it("expect return status 404", function(done){
            request(app)
                .get("/err")
                .expect(404)
                .end(function(err, res){
                    if (err) { return done(err); }
                    done();
                });
        });
    });

    describe("when fetching protected url", function(){
        it("expect redirect to login", function(done){
            request(app)
                .get("/account")
                .expect(302)
                .end(function(err, res){
                    if (err) { return done(err); }
                    res.text.should.equal('Moved Temporarily. Redirecting to /');
                    done();
                });
        });
    });

    describe("when fetching protected url after login", function(){
        it('expect success', function(done){
            passportStub.login({_id: 'testuser@strekmann.no'});
            request(app)
                .get('/account')
                .expect(200)
                .end(function(err, ress){
                    passportStub.logout();
                    done(err);
                });
        });
    });
});
