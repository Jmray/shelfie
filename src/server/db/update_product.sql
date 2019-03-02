UPDATE products
SET product_name = $1, product_price = $2, image_url = $3
WHERE id = $4;