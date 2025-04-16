import express from "express";
import { mongoDbConnection } from "./connection/db.js\
";
import { addDummyPost } from "./controllers/testContrller.js";

/**
 * ** Create an app object from Express to handle routing.
 */
const app = express();

// Add middleware to parse incomming request body.
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

//  Import PORT and IP variables from .env file.
const PORT = process.env.PORT;
const IP = process.env.IP;

/**
 *  **** Make connection between express app and mongoose:
 */
mongoDbConnection();

// create dummy data to test mongodb database is created.
app.get("/", (req, res) => {
  console.log("hello testing");
  addDummyPost();
  res.send("dummy post added to db.");
});

/**
 *  **** Routes Methods:
 *  ** app.get('/', callerMethod): get takes two arguments.
 *     1st__argument:specify the route where user request called 'route path'.
 *     2nd__request handler method: that handles the http request called 'request handler'.
 *
 *  ** app.post("", routeHandler)
 */
// app.get("/root", (req, res) => {
//   /**
//    * **** Response Handler methods:
//    *    res.append(key, value): Append the specified value to the HTTP response header field.
//    *    res.attachment('fileName'): Sets HTTP response 'Content-Disposition' header field to "attachment".
//    *                                If fileName is given then it sets the Content-Type based on extension name.
//    *    res.cookie(cookieName, value, option): Sets Cookie name to value. The value parameter may be a string or object converted to JSON.
//    *                                The options parameter is an object that can have following properties.
//    *
//    *
//    */

//   //   // Example to handle append method.
//   //   res.append("Warning", "199 Miscellaneous warning");
//   //   res.append("Link", ["<http://localhost/8080>", "<http://localhost:9090/>"]);
//   //   res.append("Set-Cookie", "foo=bar; Path=/; HttpOnly");

//   //   // Example to handle attachment method:
//   //   //   res.attachment(); // Content-Disposition: attachment
//   //   res.attachment("path/to/logo.png"); // Content-Disposition: attachment filename="logo.png" and Content-Type: image/png

//   // Examples: to handle cookie in response headers.
//   //   res.cookie("name", "umair", {
//   //     domain: "abc.com",
//   //     path: "/root",
//   //     httpOnly: true,
//   //     secure: true,
//   //   });

//   res.cookie("name", "umair", {
//     expires: new Date(Date.now() + 900000),
//     httpOnly: true,
//     secure: true,
//   });

//   res.clearCookie("rememberme", { path: "/" });
//   res.download("/report-12345.pdf");

//   res.json({ message: "Hello from the server" });
// });

// // post data to server:
// app.post("/", async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     console.log({ name, email });
//     res.json({ name, email });
//   } catch (error) {
//     console.error(error);
//   }
// });

// // app.all(): Special routing method used to load middleware function at the path for all http request methods.
// app.all("/secret", (req, res, next) => {
//   console.log("Accessing the secret section ...");
//   res.json({
//     message: "accessing the secret.",
//     info: "app.all(): Special routing method used to load middleware function at the path for all http request methods.",
//   });
//   next(); // pass control to next handler.
// });

// // path that match the requests to /random.text.
// app.get("/random.text", (req, res) => {
//   res.send("random.text is here!!!!!!!!!!!");
// });

// /**
//  * **** Routes paths based on strings paterns.
//  */
// // // matching paths: abcd, abbcd, abbbcd, and so on.
// // app.get("/ab+cd", (req, res) => {
// //   res.send("ab+cd"); // show unexpected error
// // });

// // matching paths: abcd, abxcd, abRANDOMcd, and so on.
// app.get("/ab*cd", (req, res) => {
//   res.send("ab*cd");
// });

// // // This route path will match /abe and /abcde.
// // app.get("/ab(cd)?e", (req, res) => {
// //   res.send("ab(cd)?e"); // show unexpected error
// // });

// /**
//  * **** Routes paths based on Regular Expressions:
//  *  "/.*fly$/": this regular expression must contain the 'fly' in string path.
//  */
// // This route path will match butterfly and dragonfly, but not butterflyman, dragonflyman, and so on.
// app.get(/.*fly$/, (req, res) => {
//   res.send("/.*fly$/");
// });

// /**
//  * **** Route Parameters:
//  *  Route parameters are named URL segments that are used to capture the values at specified at their position in the URL.
//  *  The capture values are papulated at 'req.params' object.
//  */
// app.get("/users/:userId/books/:bookId", (req, res) => {
//   const { userId, bookId } = req.params;
//   //   console.log({ userId, bookId });

//   res.json({
//     userId,
//     bookId,
//   });
// });

// // The hyphen (-) and dot (.) are interpreted literally, they can be used along with route parameters for useful purpose.
// app.get("/flights/:from-:to", (req, res) => {
//   const { from, to } = req.params;
//   res.json({ from, to });
// });
// //
// app.get("/plantae/:genus.:species", (req, res) => {
//   const { genus, species } = req.params;
//   res.json({ genus, species });
// });

// /**
//  * **** Route Hanlders:
//  *      we can provide multiple callback function that behaves like middleware to handle request.
//  *      the only exception is that these callback might invoke next('route') to bypass remaning routes callback.
//  */
// // Example One:
// app.get(
//   "/example/a",
//   (req, res, next) => {
//     console.log("First Callback");
//     // const condition = true;
//     // if (condition) {
//     //   res.send("Hello fron first callback");
//     // }
//     next();
//   },
//   (req, res, next) => {
//     console.log("Second callback");
//     // res.send("Hello fron second callback");
//     next();
//   },
//   (req, res) => {
//     console.log("Final callback");
//     res.send("Hello fron final callback");
//   }
// );

// Listen the server on IP:PORT
const server = app.listen(PORT, IP, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on ${JSON.stringify(server.address())}`);
});
