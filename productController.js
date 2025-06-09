const { readDB, writeDB } = require("../utils/fileHelpers");

exports.getAllProducts = async (req, res) => {
    try {
        const data = await readDB();
        res.json(data.products);
    } catch (err) {
        res.status(500).json({ message: "Error while reading database" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const data = await readDB();
        const product = data.products.find(p => p.id === parseInt(req.params.id));
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: "Error while reading database" });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, category, price } = req.body;
        if (!name || !category || !price) {
            return res.status(400).json({ message: "Products are missing" });
        }
        const data = await readDB();
        const nameExists = data.products.some(
            p => p.name.toLowerCase() === name.toLowerCase()
        );
        if (nameExists) {
            return res.status(400).json({ message: "Product " })
        }
        const maxId = data.products.reduce((max, product) => product.id > max ? product.id : max, 0);
        const newProduct = {
            id: maxId + 1,
            name,
            category,
            price: Number(price)
        };
        data.products.push(newProduct);
        await writeDB(data);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Error occured" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const data = await readDB();
        const productIndex = data.products.findIndex(p => p.id === parseInt(req.params.id));
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        const { name, category, price } = req.body;
        const product = data.products[productIndex];
        if (name) product.name = name;
        if (category) product.category = category;
        if (price) product.price = Number(price);
        await writeDB(data);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Error found" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const data = await readDB();
        const productIndex = data.products.findIndex(p => p.id === parseInt(req.params.id));
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product Not Found" });
        }
        const [deleteProduct] = data.products.splice(productIndex, 1);
        await writeDB(data);
        res.json(deleteProduct);
    } catch (error) {
        res.status(500).json({ message: "Error occurred" });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const data = await readDB();
        const term = req.params.term.toLowerCase();
        const result = data.products.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error occured" });
    }
};

exports.getProductByCategory = async (req, res) => {
    try {
        const category = req.params.category.toLowerCase();
        const data = await readDB();
        const result = data.products.filter(p => p.category.toLowerCase() === category);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error occurred" });
    }
};

exports.getProductStats = async (req, res) => {
    try {
        const data = await readDB();
        const stats = {
            totalProducts: data.products.length,
            averagePrice: data.products.reduce((sum, product) => sum + product.price, 0) / data.products.length || 0
        };
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: "Error occurred" });
    }
};
