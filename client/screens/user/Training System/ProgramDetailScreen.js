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
  View,
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
    setProgram(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Text style={style.Heading}>{program?.title}</Text>
        <Card>
          <CardItem cardBody>
            <Image
              source={{ uri: program?.imageURL }}
              style={{ height: 200, flex: 1 }}
            />
          </CardItem>
        </Card>
        <Text style={style.Heading1}>Description</Text>
        <Text style={{ marginBottom: 20 }}>{program?.description}</Text>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Schedule
        </Text>
        {program?.exercise?.map((data, i) => {
          return (
            <View style={{ marginBottom: 20 }} key={i}>
              <Text style={{ textAlign: "center" }}>{data.day}</Text>
              <Text style={{ textAlign: "center" }}>{data.area}</Text>
            </View>
          );
        })}
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}>
          Workout Plan
        </Text>
        {program?.workoutList?.map((data, i) => {
          return (
            <View style={{ marginBottom: 20 }} key={i}>
              <Text style={{ textAlign: "center" }}>{data.day}</Text>
              <Text style={{ textAlign: "center" }}>{data.exerciseName}</Text>
              <Text style={{ textAlign: "center" }}>{data.reps}</Text>
              <Text style={{ textAlign: "center" }}>{data.sets}</Text>
            </View>
          );
        })}
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

const style = new StyleSheet.create({
  Heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  Heading1: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
