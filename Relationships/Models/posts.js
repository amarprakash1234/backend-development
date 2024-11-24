const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(() => console.log("Connection successful!!")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const userSchema = new Schema({
    username: String,
    email: String,
});

const postSchema = new Schema({
    content: String,
    likes: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

// const addData = async () => {
    // let user1 = new User({
    //     username: "rahulkumar",
    //     email: "rahul@gmail.com",
    // });
    // let post1 = new Post({
    //     content: "Hello World",
    //     likes: 7,
    // });
    // post1.user = user1;
    // await user1.save();
    // await post1.save();



    // let post2 = new Post({
    //     content: "Bye Bye :)",
    //     likes: 23,
    // });
    // let user = await User.findOne({username: "rahulkumar"});
    // post2.user = user;
    // await post2.save();
// }

// addData();

const getData = async () => {
    let result = await Post.findOne({}).populate("user", "username"); // Populate means user ki bhi information aayegi and if information me only username(koi v ek specific) chahiye to bagal me "username"(specific key) likh denge.
    console.log(result);
}

getData();









