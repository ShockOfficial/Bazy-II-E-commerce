import React, { useState, useEffect } from "react";
import { Grid, Card, Image, Text, Container } from "@mantine/core";
import { useStyles } from "./styles";

const products = [
  {
    _id: 1,
    name: "Koszulka męska",
    brand: "Nike",
    price: 129.99,
    image: "https://via.placeholder.com/400x400?text=Product+1",
  },
  {
    _id: 2,
    name: "Buty sportowe",
    brand: "Adidas",
    price: 299.99,
    image: "https://via.placeholder.com/400x400?text=Product+2",
  },
  {
    _id: 3,
    name: "Kurtka zimowa",
    brand: "The North Face",
    price: 599.99,
    image: "https://via.placeholder.com/400x400?text=Product+3",
  },
  {
    _id: 4,
    name: "Spodnie dresowe",
    brand: "Puma",
    price: 149.99,
    image: "https://via.placeholder.com/400x400?text=Product+4",
  },
  {
    _id: 5,
    name: "Koszula męska",
    brand: "Tommy Hilfiger",
    price: 199.99,
    image: "https://via.placeholder.com/400x400?text=Product+5",
  },
  {
    _id: 6,
    name: "Sukienka letnia",
    brand: "H&M",
    price: 79.99,
    image: "https://via.placeholder.com/400x400?text=Product+6",
  },
  {
    _id: 7,
    name: "Buty do biegania",
    brand: "Asics",
    price: 249.99,
    image: "https://via.placeholder.com/400x400?text=Product+7",
  },
  {
    _id: 8,
    name: "Koszulka damska",
    brand: "Zara",
    price: 89.99,
    image: "https://via.placeholder.com/400x400?text=Product+8",
  },
];

export function Home() {
  const { classes } = useStyles();

  return (
    <Container size="md">
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50}>
        {products.map((product) => (
          <Grid.Col key={product._id} span={4} className={classes.card}>
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src={product.image}
                  height={320}
                  alt="Norway"
                  fit="cover"
                />
                <div className={classes.description}>
                  <Text size="lg" weight={700}>
                    {product.brand}
                  </Text>
                  <Text>{product.name}</Text>
                  <Text size="sm" weight={700}>
                    {product.price} zł
                  </Text>
                </div>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
}
