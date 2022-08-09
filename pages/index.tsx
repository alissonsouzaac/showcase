import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useState } from 'react';

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  listPrice: string;
  salePrice: string;
  favorite: boolean;
}

export interface ProductsProps {
  products: Product[]
}

export default function Home({ products }: ProductsProps) {
  const [listProducts, setListProducts] = useState<Product[]>(products);

  const handleFavoriteProduct = (productId: number) => {
    const newProduct = listProducts.map((product: Product) => (
      product.id === productId ? { ...product, favorite: !product.favorite } : product
    ));
    setListProducts(newProduct);
  }

  return (
    <div className={styles.container}>
        <Head>
        <title>Product List</title>
        <meta name="description" content="Product List" />
        <link rel="icon" href="/favicon.ico" />
        </Head>


        <main className={styles.main}>
        <h1>clothes</h1>
        {listProducts.map((prod: Product, index: number) => (
            <div key={`product-${index}`} className={styles.cardProduct}>
                <div className={styles.productContainer}>
                <Image 
                    src={prod.imageUrl}
                    alt={`image-${prod.id}`}
                    loading="lazy"
                    width={200}
                    height={200}
                    className={styles.image}
                />
                {prod.favorite 
                    ? 
                    <MdFavorite
                        className={styles.icon}
                       // size={30}
                        color="error"
                        onClick={() => handleFavoriteProduct(prod.id)}
                    /> 
                    : 
                    <MdFavoriteBorder
                        className={styles.icon}  
                        //size={30}
                        onClick={() => handleFavoriteProduct(prod.id)}
                    />
                }
                <div className={styles.productDescription}>
                    <span>{prod.name}</span><br></br>
                    <del> in {prod.listPrice}</del><br></br>
                    <span> per {prod.salePrice}</span>
                </div>
                </div>
            </div>
        ))}
        </main>
    </div>
)
}

export const getStaticProps: GetStaticProps = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "TShirt Colors",
      imageUrl: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80",
      listPrice: "99.90",
      salePrice: "59.90",
      favorite: true
    },
    {
      id: 2,
      name: "Jacket",
      imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      listPrice: "399.90",
      salePrice: "199.90",
      favorite: false
    },
    {
      id: 3,
      name: "Tricot",
      imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=705&q=80",
      listPrice: "159.90",
      salePrice: "100.00",
      favorite: false
    }
  ];

  return {
    props: {
      products
    },
    revalidate: 30
  }
}
