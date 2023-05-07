import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";
import Hero from "../components/Hero";

const Home = () => {
  const products = useContext(ProductContext);
  const filteredProducts = products.filter((product: { category: string }) => {
    return (
      product.category === "men's clothing" ||
      product.category === "women's clothing"
    );
  });

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {filteredProducts.map(
              (product: {
                id: number;
                title: string;
                price: number;
                description: string;
                category: string;
                image: string;
                rating: { rate: number; count: number };
              }) => (
                <Product key={product.id} product={product} />
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
