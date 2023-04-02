const chai = require("chai");
const chaihttp = require("chai-http");
const server = require("../src/server");
const should = chai.should();
const ONG = require("../src/models/ong-model");
const color = require("colors");

chai.use(chaihttp);

describe(color.yellow("Testing API ONG-SERVICE"), () => {
  describe("/api/ong-register", () => {
    before(() => ONG.deleteMany({}));
    it(color.cyan("It should register a new ONG"), (done) => {
      const ong = {
        name: "Voluntad ONG",
        email: "voluntad@gmail.com",
        password: "12345678",
        confirm_password: "12345678",
        website: "www.voluntad.com",
        telephone: 55556666,
        ong_type: "cultura",
        user_comment:
          "Mi primer experiencia en Administracion fue en ONG BS AS con buen clima laboral.",
      };
      chai
        .request(server)
        .post("/api/ong-register")
        .send(ong)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Registro Exitoso");
          done();
        });
    });
    it(color.cyan("It should login an ONG and return TOKEN"), (done) => {
        ong = {
          email: "voluntad@gmail.com",
          password: "12345678"
        }
        chai
        .request(server)
        .post("/api/ong-login")
        .send(ong)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("token").should.not.be.eql("");
          done();
        });
    })
  });
});
