import React, { useState, useEffect } from "react";
import { Grid, Card, Image, Text, Container } from "@mantine/core";
import { useStyles } from "./styles";

const products = [
  {
    _id: 1,
    name: "Koszulka męska",
    brand: "Nike",
    price: 129.99,
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/0f72800f-c30e-448a-9110-8d7ac8ce4e69/koszulka-meska-jordan-23-engineered-JW2hWq.png",
  },
  {
    _id: 2,
    name: "Buty sportowe",
    brand: "Adidas",
    price: 299.99,
    image:
      "https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy,c_fill,g_auto/86dbbccdb3db4f5f846eaa7600ee8b42_9366/OZWEEGO_Shoes_Czern_EE6999_01_standard.jpg",
  },
  {
    _id: 3,
    name: "Kurtka zimowa",
    brand: "The North Face",
    price: 599.99,
    image:
      "https://images.thenorthface.com/is/image/TheNorthFaceEU/7Z8C_MN8_hero?$262x306$",
  },
  {
    _id: 4,
    name: "Spodnie dresowe",
    brand: "Puma",
    price: 149.99,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_500,h_500/global/523566/01/mod01/fnd/EEA/fmt/png/M%C4%99skie-spodnie-dresowe-PUMAxALEX-TOUSSAINT",
  },
  {
    _id: 5,
    name: "Koszula męska",
    brand: "Tommy Hilfiger",
    price: 199.99,
    image:
      "https://tommy-europe.scene7.com/is/image/TommyEurope/DM0DM16320_YBH_hover?$plp_max_395@2x$",
  },
  {
    _id: 6,
    name: "Sukienka letnia",
    brand: "H&M",
    price: 79.99,
    image:
      "https://lp2.hm.com/hmgoepprod?set=source[/ab/26/ab268110ff018c2d4ed4db95dbeebe872543c8c1.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&call=url[file:/product/main]",
  },
  {
    _id: 7,
    name: "Buty do biegania",
    brand: "Asics",
    price: 249.99,
    image:
      "https://images.asics.com/is/image/asics/1011B621_402_SR_RT_GLB?$zoom$",
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
