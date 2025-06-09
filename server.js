const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes');

app.use(express.json());

app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went Wrong" });
});

app.listen(3005, () => {
    console.log("Server Started");
})