const { createProduct } = require("../controllers/ProductUtils");
const router = require("express").Router();

//constants
const ID_PREFIX = "VP-";

//create new product set
router.route("/productset").post((req, res) => {});

//create new product
router.route("/product").post((req, res) => {});

//add product to product set
router.route("/productset/product").post((req, res) => {});

//update product
//update product name
router.route("/product/name").put((req, res) => {});

//update product category
router.route("/product/category").put((req, res) => {});

//update product description
router.route("/product/description").put((req, res) => {});

//update product labels
router.route("/product/labels").put((req, res) => {});

//delete product
router.route("/product").delete((req, res) => {});

//delete product set
router.route("/productset").delete((req, res) => {});

//delete product from product set
router.route("/productset/product").delete((req, res) => {});

//get all product sets
router.route("/productset").get((req, res) => {});

//get all products
router.route("/product").get((req, res) => {});

//get all products in product set
router.route("/productset/product").get((req, res) => {});

//get all reference images of a product
router.route("/product/referenceimage").get((req, res) => {});

//get a single product
router.route("/singleproduct").get((req, res) => {});

//add product image
router.route("/product/referenceimage").post((req, res) => {});

//delete product image
router.route("/product/referenceimage").delete((req, res) => {});

module.exports = router;