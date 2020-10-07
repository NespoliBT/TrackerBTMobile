import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  SliderComponent,
} from "react-native";
import TasksService from "./services/TasksService";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [hours, setHours] = useState(0);
  const [title, setTitle] = useState("");

  TasksService.getTasks().then(({ data }) => {
    setTasks(data);
  });

  const handleNewTask = () => {
    let date = new Date();
    setTitle("");
    setHours(0);
    if (title) TasksService.newTask(title, hours, date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cazzo hai fatto oggi?</Text>

      <View style={styles.toInsert}>
        <TextInput
          style={styles.titleToInsert}
          onSubmitEditing={(e) => handleNewTask(e)}
          returnKeyLabel="next"
          onChangeText={(value) => setTitle(value)}
          value={title}
        />

        <Slider
          style={styles.hourSlider}
          minimumValue={0}
          maximumValue={8}
          step={0.5}
          minimumTrackTintColor="#dd83a0"
          maximumTrackTintColor="#212931"
          thumbTintColor="#dd83a0"
          value={hours}
          onValueChange={(value) => {
            setHours(value);
          }}
        />
        <Text style={styles.hoursLabel}>{hours + " H"}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.activity}>Attività</Text>
        <Text style={styles.hours}>Ore</Text>
        <Text style={styles.date}>Data</Text>
      </View>
      <View style={styles.tasks}>
        {tasks
          ? tasks.map((task) => {
              let date = new Date(Number(task.date));
              return (
                <View style={styles.task} key={task.id}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskHours}>{task.hours + " H"}</Text>
                  <Text style={styles.taskDate}>
                    {date.getDate() +
                      "/" +
                      (date.getMonth() + 1) +
                      "/" +
                      date.getFullYear()}
                  </Text>
                </View>
              );
            })
          : ""}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b2128",
    padding: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Iosevka",
    color: "#63aec0",
  },
  toInsert: {
    marginTop: 20,
  },
  titleToInsert: {
    backgroundColor: "#212931",
    borderRadius: 100,
    padding: 20,
    color: "#e5e5e5",
  },
  hourSlider: {
    height: 50,
  },
  hoursLabel: {
    color: "#e5e5e5",
    textAlign: "center",
    fontSize: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 40,
  },
  activity: {
    width: "33%",
    color: "#e25987",
    textAlign: "right",
  },
  hours: {
    width: "33%",
    color: "#b877b4",
    textAlign: "center",
  },
  date: {
    width: "33%",
    color: "#85ba86",
    textAlign: "left",
  },
  tasks: {
    borderStyle: "dashed",
    marginTop: 10,
  },
  task: {
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#212931",
    borderRadius: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  taskTitle: {
    color: "#e5e5e5",
    width: "33%",
    textAlign: "right",
    borderRightColor: "#212931",
    borderRightWidth: 2,
    margin: 10,
    paddingRight: 10,
  },
  taskHours: {
    color: "#e5e5e5",
    width: "20%",
    textAlign: "center",
    margin: 10,
  },
  taskDate: {
    color: "#e5e5e5",
    width: "33%",
    margin: 10,
    paddingLeft: 10,
    borderLeftColor: "#212931",
    borderLeftWidth: 2,
  },
});
