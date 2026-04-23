const express = require("express");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const cors = require("cors");

require("./db");

const Product = require("./Product");
const User = require("./user");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const requireAdmin = (req, res, next) => {
  const role = req.headers["x-user-role"];

  if (role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado" });
  }

  next();
};

app.get("/products", async (req, res) => {
  try {
    const { brand, productType, refresh } = req.query;

    if (refresh === "true") {
      let url = "http://makeup-api.herokuapp.com/api/v1/products.json?";

      if (brand) url += `brand=${brand}&`;
      if (productType) url += `product_type=${productType}`;

      const response = await axios.get(url);
      const products = response.data;

      const validProducts = await Promise.all(
        products.map(async (p) => {
          try {
            if (p.image_link) {
              await axios.head(p.image_link);
            }
            return p;
          } catch {
            console.log("Imagen inválida:", p.image_link);
            return null;
          }
        })
      );

      const filteredProducts = validProducts.filter(Boolean);

      await Promise.all(
        filteredProducts.map((p) =>
          Product.updateOne(
            { name: p.name, brand: p.brand },
            {
              name: p.name,
              brand: p.brand,
              product_type: p.product_type,
              price: p.price,
              image_link: p.image_link,
            },
            { upsert: true }
          )
        )
      );

      return res.json({
        message: "Productos actualizados",
        count: filteredProducts.length,
      });
    }

    const filter = {};

    if (brand) filter.brand = brand;
    if (productType) filter.product_type = productType;

    const productsFromDB = await Product.find(filter);
    res.json(productsFromDB);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo productos" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    res.json({ message: "Usuario creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Error creando usuario",
      error: err.message,
    });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Las contraseñas no coinciden",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
    });

    await newUser.save();

    res.json({ message: "Usuario creado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Error creando usuario",
      error: err.message,
    });
  }
});

app.put("/make-admin/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { role: "admin" },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json({
      message: "Usuario actualizado a admin",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error actualizando usuario",
    });
  }
});

app.get("/admin/products", requireAdmin, async (req, res) => {
  try {
    const products = await Product.find();

    const data = products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      brand: p.brand,
      product_type: p.product_type,
      price: p.price,
      image_link: p.image_link,
    }));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo productos",
    });
  }
});

app.get("/admin/products/:id", requireAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      id: product._id.toString(),
      name: product.name,
      brand: product.brand,
      product_type: product.product_type,
      price: product.price,
      image_link: product.image_link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error obteniendo producto",
    });
  }
});

app.put("/admin/products/:id", requireAdmin, async (req, res) => {
  try {
    const { name, brand, product_type, price, image_link } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        brand,
        product_type,
        price,
        image_link,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      brand: updatedProduct.brand,
      product_type: updatedProduct.product_type,
      price: updatedProduct.price,
      image_link: updatedProduct.image_link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error actualizando producto",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});