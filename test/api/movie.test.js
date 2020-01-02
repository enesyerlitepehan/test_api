const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
let token, movieId;
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
                    //console.log(err);
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    done();
                });
        })
    });

    describe('/POST movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'Udemy',
                director_id: '5e08e8e022914f4684f284b5',
                category: 'Komedi',
                country: 'Türkiye',
                year: 1950,
                imdb_score: 8
            }
            chai.request(server)
                .post('/api/movies/')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();
                })
        });
    });

    describe('/GET/:director_id movie', () => {
        it('it should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });
});