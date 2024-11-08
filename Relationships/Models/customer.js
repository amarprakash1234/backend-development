const mongoose = require("mongoose");
const {Schema} = mongoose;

main().then(() => console.log("Connection successful!!")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        }
    ]
});

// customerSchema.pre("findOneAndDelete", async () =>{
//     console.log("PRE MIDDLEWARE!!")
// });

customerSchema.post("findOneAndDelete", async (customer) =>{

    if(customer.orders.length) {
        let res = await Order.deleteMany({ _id: customer.orders });
        console.log(res);
    }

});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


//Functions
const findCustomer = async () => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]); // es se result me orders array ke ander id ki jagah document deikhegi.
}

const findCustomer2 = async () => {
    let result = await Customer.find({});
    console.log(result[0]); // es se result me orders array ke ander id deikhegi.
}

const addCust = async () => {
    let newCust = new Customer({
        name: "Karan Arjun"
    });

    let newOrder = new Order({
        item: "Burger",
        price: 250
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("Added new customer!!");
}

// addCust();

const delCust = async () => {
    let data = await Customer.findByIdAndDelete('66d47f019dbc9b56fe39779b');
    console.log(data);
}

delCust();



// findCustomer();

// const addCustomer = async () => {
//     let cust1 = new Customer({
//         name: "Rahul Kumar",
//     });

//     let order1 = await Order.findOne({item: "Chips"});
//     let order2 = await Order.findOne({item: "Choclate"});

//     cust1.orders.push(order1);
//     cust1.orders.push(order2);

//     let res = await cust1.save();
//     console.log(res);
// }

// addCustomer();

// const addOrders = async () => {
//     let res = await Order.insertMany([
//         {
//             item: "Samosa",
//             price: 12,
//         },
//         {
//             item: "Chips",
//             price: 10,
//         },
//         {
//             item: "Choclate",
//             price: 40,
//         },
//     ]);
//     console.log(res);
// }

// addOrders();





