const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const { mail } = require("../config");

const transport = nodemailer.createTransport({
  host: mail.host,
  port: mail.port,
  auth: {
    user: mail.user,
    pass: mail.pass
  }
});

const viewPath = path.resolve("./src/resources/mail");

transport.use(
  "compile",
  hbs({
    viewEngine: exphbs.create({
      layoutsDir: path.resolve(viewPath, "layouts"),
      partialsDir: path.resolve(viewPath, "partials"),
      defaultLayout: "default",
      extname: ".html"
    }),
    viewPath,
    extName: ".html"
  })
);

module.exports = transport;
