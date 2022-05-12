const db        = require("../models");
const Product   = db.products;
const parseResponse  = require("../utils/response.helper")
const service   = 'Product';
const log       = 'Product controller';

exports.store = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const product = new Product({
        sku: req.body.sku,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price
    });

    product
        .save(product)
        .then(data => {
            console.log(`│  ├── ${log} :: insert :: insert`);
            let result = parseResponse.created(data)
            res.status(201).send(result)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product."
                });
            });
};

exports.getAll = (req, res) => {
    const sku       = req.query.sku;
    var condition   = sku ? { sku: { $regex: new RegExp(sku), $options: "i" } } : {};
    Product.find(condition)
        .then(data => {
            console.log(`│  ├── ${log} :: get :: getAll`);
            let result = parseResponse.success(data)
            res.send(result)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Products."
            });
        });
};

exports.getOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if (data) {
                console.log(`│  ├── ${log} :: get :: getOne`);
                let result = parseResponse.success(data)
                res.send(result)
            } else {
                let result = parseResponse.notFound(service, id)
                res.status(404).send(result);
            }
        })
        .catch(err => {
        let result = parseResponse.notFound(service, id)
        res.status(404).send(result);
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                console.log(`│  ├── ${log} :: put :: updated`);
                res.send({ message: "Product was updated successfully." })
            };
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    Product.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                console.log(`│  ├── ${log} :: delete :: cancelled`);
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                console.log(`│  ├── ${log} :: delete :: destroy`);
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};