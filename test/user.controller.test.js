const chai = require('chai');
const chaiHttp = require('chai-http');
// const path = require('path');
// const app = require(path.resolve(__dirname, 'D:/My Project/mynodeapp/src/app.js'));
// const User = require(path.resolve(__dirname, 'D:/My Project/mynodeapp/src/controllers/user.controller.js'));
const path = require('path');
const User = require(path.resolve(__dirname, 'D:/My Project/mynodeapp/test/user.model.js'));
const app = require(path.resolve(__dirname, 'D:/My Project/mynodeapp/test/app.js'));

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API', () => {
  before(async () => {
    // Connect to MongoDB before running tests
    await require(path.resolve(__dirname, 'D:/My Project/mynodeapp/test/database.js'))();
  });

  beforeEach(async () => {
    // Clear the users collection before each test
     await User.deleteMany({});
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await chai.request(app)
        .post('/api/users')
        .send({ username: 'testuser', password: 'testpassword' });

        console.log('Response Body:', res.body);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('_id');
      expect(res.body.username).to.equal('testuser');
      expect(res.body.password).to.equal('testpassword');
    });
  });

  describe('GET /api/users', () => {
    it('should get all users', async () => {
      // Insert some test users
      await User.create({ username: 'user1', password: 'pass1' });
      await User.create({ username: 'user2', password: 'pass2' });

      const res = await chai.request(app).get('/api/users');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.have.lengthOf(2);
      expect(res.body[0].username).to.equal('user1');
      expect(res.body[1].username).to.equal('user2');
    });
  });
  
});
