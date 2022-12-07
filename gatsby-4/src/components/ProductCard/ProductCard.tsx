import React from "react";
import { Product } from "../../../../shared/products/MockProductsService";
import { GatsbyImage } from "gatsby-plugin-image";
import { generateGatsbyImageData } from "../../shopstory/Provider";

export const ProductCard: React.FC<{
  product: Product;
  hasOverlay: boolean;
}> = ({ product, hasOverlay }) => {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <div
          style={{
            paddingBottom: "66.666%",
            background: hasOverlay ? "#f3f3f3" : "none",
          }}
        >
          <GatsbyImage
            image={generateGatsbyImageData({ imageUrl: product.image })}
            alt={product.title}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}
          />
        </div>
      </div>
      <div
        style={{
          paddingBottom: 6,
          paddingTop: 20,
          textAlign: "center",
          fontSize: 15,
        }}
      >
        {product.title}
      </div>
      <div style={{ fontWeight: 600, textAlign: "center", fontSize: 15 }}>
        {product.price}$
      </div>
    </div>
  );
};
