import React, { useEffect, useState } from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { Image, Text } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Button,
  Input,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProgramDetailScreen({ route }) {
  const [program, setProgram] = useState();

  const fetchData = async () => {
    const token = await AsyncStorage.getItem("auth-token");
    const res = await axios.get(
      "http://10.0.2.2:5002/trainings/get/" + route.params.id,
      {
        headers: { "x-auth-token": JSON.parse(token) },
      }
    );
    console.log(res.data);
    setProgram(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text>{program?.title}</Text>
        {/* {program?.map((data, i) => {
          return (
            <Card key={i}>
              <CardItem>
                <Body>
                  <Image
                    source={{ uri: data.imageURL }}
                    style={{ height: 200, width: 200, flex: 1 }}
                  />
                  <Text>{data.title}</Text>
                </Body>
              </CardItem>
            </Card>
          );
        })} */}
      </Content>
    </Container>
  );
}
