import ProductItem from './ProductItem';
import classes from './Products.module.css';

const PRODUCTS = [
  {
    id: 1,
    title: "Test",
    price: 6,
    description: 'This is a first product - amazing!'
  },
  {
    id: 2,
    title: "Test 2",
    price: 3,
    description: 'This is a second product - amazing!'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      {PRODUCTS.map(product => {
        return (
          <ul>
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              />
          </ul>
        )
      })}
    </section>
  );
};

export default Products;
