import {
  Grid,
  Card,
  Image,
  Text,
  Container,
  Space,
  Loader,
  Flex,
} from "@mantine/core";
import { useStyles } from "./styles";
import { useCollection } from "../../hooks/useCollection";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const { documents: products, isLoading, error } = useCollection("products");

  const handleClick = (_id: string) => {
    navigate(`/${_id}`);
  };

  return (
    <Container size="md">
      <Space h="xl"></Space>
      {products && (
        <Grid
          justify="center"
          gutter={5}
          gutterXs="md"
          gutterMd="xl"
          gutterXl={50}
        >
          {products.map((product) => (
            <Grid.Col
              key={product._id}
              md={4}
              sm={6}
              xs={8}
              className={classes.card}
            >
              <Card
                onClick={() => handleClick(product._id)}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
              >
                <Card.Section>
                  <Image
                    src={product.imageUrls[0]}
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
      )}

      {isLoading && (
        <Flex justify="center">
          <Loader color="indigo" mt={30} />
        </Flex>
      )}

      {error && (
        <Flex justify="center">
          <Text fz="sm" c="red" mt={30}>
            {error}
          </Text>
        </Flex>
      )}
    </Container>
  );
}
