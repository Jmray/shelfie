
module.exports = {
    //Read Products function
    getAll: (req, res) => {
        req.app.get('db').read_products().then(products => {
            res.status(200).send(products);
        })
        .catch(err => {
            res.status(500).send('Error with database');
            console.error(err);
        });

    },
    create: (req, res) => {
        const {
            product_name,
            product_price,
            image_url
        } = req.body;
        req.app.get('db').create_product([product_name, product_price, image_url]).then(() => {
            res.status(200).send('Success')
        })
        .catch(err => {
            res.status(500).send('Error with Posting');
            console.error(err);
        });
    },
    delete: (req, res) => {
        const {
            id,
        } = req.params;
        req.app.get('db').delete_product([id]).then(() => {
            res.status(200).send('deleted')
        })
        .catch(err => {
            res.status(500).send('Error with deleting');
            console.error(err);
        });
    },
    update: (req, res) => {
        const {
            id,
        } = req.params;
        const {
            product_name,
            product_price,
            image_url,
        } = req.body;
        req.app.get('db').update_product([product_name, product_price, image_url, id]).then(() => {
            res.status(200).send('updated')
        })
        .catch(err => {
            res.status(500).send('Error with updating');
            console.error(err);
        });
    }
    
    

}

