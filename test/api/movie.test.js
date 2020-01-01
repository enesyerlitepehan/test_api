const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
let token;
chai.use(chaiHttp);

describe('Movies tests', () => {
    before((done) => {  //testler başlamadan işlem yapmaya yarar
        chai.request(server)
            .post('/authenticate')
            .send({username: 'enes1', password: 'Kandy-1234'})
            .end((err, res) => {
                token = res.body.token;
                //console.log(token);
                done();
            });
    });

    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err,res) => {
                    console.log(err);
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    done();
                });
        })
    });
});