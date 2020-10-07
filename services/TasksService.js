import axios from "axios";

export default class TasksService {
  static getTasks() {
    return axios.get("http://192.168.1.15:3001/tasks");
  }
  static newTask(title, hours, date) {
    axios
      .post("http://192.168.1.15:3001/tasks/new", {
        title: title,
        hours: hours,
        date: date,
      })
      .catch(function (error) {
        console.log("error");
      });
  }
}
