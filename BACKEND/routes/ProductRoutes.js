const {
    createProductSet,
    createProduct,
    addProductToProductSet,
    updateProductName,
    updateProductCategory,
    updateProductDescription,
    updateProductLabels,
    deleteProduct,
    deleteProductSet,
    deleteProductFromProductSet,
    listProductSets,
    listProducts,
    listProductsInProductSet,
    listReferenceImages,
    getProduct,
    addProductImage,
    deleteProductImage,
} = require("../controllers/ProductUtils");
const { uploadFile, downloadFile } = require("../controllers/StorageUtils");
const multermiddleware = require("../middleware/Multer");

const router = require("express").Router();

//constants
const ID_PREFIX = "VP-";

//create new product set
router.route("/productset").post((req, res) => {
    //call createProductSet method
    const productSetId = ID_PREFIX + req.body.productSetId;
    const productSetDisplayName = req.body.productSetDisplayName;

    createProductSet(productSetId, productSetDisplayName)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err);
        });
});

//create new product
router.route("/product").post(multermiddleware.fields([
    {name: "product", maxCount: 1},
    {name: "images", maxCount: 10},
]), async (req, res) => {

    const product = {...JSON.parse(req.body.product)};

    //get product details
    const productId = ID_PREFIX + String(product.name).replace(/\s/g, "-").toLowerCase();
    const productDisplayName = product.name;
    const productCategory = product.category;
    const productDescription = product.description;
    const productColor = product.color;
    const productSize = product.size;
    const productPrice = product.price;

    //create the product in vision product search
    const createdProduct = await createProduct(
        productId,
        productDisplayName,
        productCategory,
        productDescription,
        productColor,
        productSize,
        productPrice
    );

    //upload images to cloud storage
    const images = req.files.images;

    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        await uploadFile(file).then(async (uri) => {
            console.log(uri)
            //link image to product
            await addProductImage(productId, uri, "IMG-"+file.originalname);
            console.log("image "+file.originalname+" linked to product "+productId);
        }).catch((err) => {
            console.log(err);
        });
    };

    res.json({message: "Product created successfully"});
});

router.route("/storage").get((req, res) => {
    downloadFile("gs://visibuy_product_images/test-product-image-1.jpeg")
    .then((data) => {
        console.log("Gottem");
        res.json("gottem");
    })
});

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
router.route("/product/:productName").delete(async (req, res) => {
    //call deleteProduct method
    const productId =
        ID_PREFIX +
        String(req.params.productName).replace(/\s/g, "-").toLowerCase();

    const result = await deleteProduct(productId);
    res.json({ message: result });
});

//delete product set
router.route("/productset").delete((req, res) => {});

//delete product from product set
router.route("/productset/product").delete((req, res) => {});

//get all product sets
router.route("/productset").get((req, res) => {});

//get all products
router.route("/product").get((req, res) => {
    listProducts()
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            res.json(err);
        });
});

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
