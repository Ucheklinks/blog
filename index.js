import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let userArray = [];

function customSlug(text) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { userData: userArray }); //remember to show the user data only if user data has been entered into form in your index.ejs
});
app.get("/home", (req, res) => {
  res.redirect("/");
});

app.get("/article/:slug", (req, res) => {
  //that :slug is just a placeholder for whatever slug is clicked (which would be an anchor tag in the index.ejs file)
  const postSlug = req.params.slug;
  const fetchedPost = userArray.find(
    (fetchedPost) => fetchedPost.slug === postSlug
  );
  {
    post: fetchedPost;
  }

  res.render("article.ejs", { post: fetchedPost });
});

app.post("/submit", (req, res) => {
  const slug = customSlug(req.body.titleofblog);
  const newPost = { ...req.body, slug };
  userArray.push(newPost);

  res.redirect("/"); //after user posts info in the form, redirect user back to the homepage which is index.ejs
});

app.listen(port, () => console.log(`Server is listening on port ${port}!`));

// to proceed after the user is redirected back to home page, show his blog title as an anchor tag along with the form ready to be filled again.
