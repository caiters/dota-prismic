const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const request = require("request");
const Cookies = require("cookies");
const PrismicConfig = require("./prismic-configuration");
const Onboarding = require("./onboarding");
const app = require("./config");

const PORT = app.get("port");

app.listen(PORT, () => {
  Onboarding.trigger();
  process.stdout.write(`Point your browser to: http://localhost:${PORT}\n`);
});

// Middleware to inject prismic context
app.use((req, res, next) => {
  res.locals.ctx = {
    endpoint: PrismicConfig.apiEndpoint,
    linkResolver: PrismicConfig.linkResolver
  };
  // add PrismicDOM in locals to access them in templates.
  res.locals.PrismicDOM = PrismicDOM;
  Prismic.api(PrismicConfig.apiEndpoint, {
    accessToken: PrismicConfig.accessToken,
    req
  })
    .then(api => {
      req.prismic = { api };
      next();
    })
    .catch(error => {
      next(error.message);
    });
});

/*
 *  --[ INSERT YOUR ROUTES HERE ]--
 */

/*
 * Route with documentation to build your project with prismic
 */
app.get("/", (req, res) => {
  //res.render("home");
  req.prismic.api.getByUID("standard_content", 'home').then(function(pageContent) {
    res.render("home", {
      pageContent: pageContent
    });
  });
});

app.get("/roster", (req, res) => {
  res.render("roster");
});

app.route("/raiding").get(function(req, res) {
  req.prismic.api.getSingle("raiding_information").then(function(pageContent) {
    res.render("raiding", {
      pageContent: pageContent,
      raidRequirements: pageContent.data.raid_requirements
    });
  });
});

app.route("/:uid").get(function(req, res) {
  var uid = req.params.uid;
  req.prismic.api.getByUID("standard_content", uid).then(function(pageContent) {
    res.render("page", {
      pageContent: pageContent
    });
  });
});

/*
 * Preconfigured prismic preview
 */
app.get("/preview", (req, res) => {
  const token = req.query.token;
  if (token) {
    req.prismic.api
      .previewSession(token, PrismicConfig.linkResolver, "/")
      .then(url => {
        const cookies = new Cookies(req, res);
        cookies.set(Prismic.previewCookie, token, {
          maxAge: 30 * 60 * 1000,
          path: "/",
          httpOnly: false
        });
        res.redirect(302, url);
      })
      .catch(err => {
        res.status(500).send(`Error 500 in preview: ${err.message}`);
      });
  } else {
    res.send(400, "Missing token from querystring");
  }
});
