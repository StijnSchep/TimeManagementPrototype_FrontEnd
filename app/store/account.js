import axios from "axios";
import LoginPage from "../components/login/LoginPage"
import * as dialogs from "tns-core-modules/ui/dialogs";

const account = {
  namespaced: true,
  state: {
    employee: {}
  },
  actions: {
    fetchEmployee({ state, commit }, token) {
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/employee", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.status === 200) {
            commit("setEmployee", res.data.result[0]);
          }
          if (res.status === 401) {
            setString('store', "");
          }
        })
        .catch(err => {
          dialogs.alert({
            title: 'Error',
            message: 'Kon de werknemer gegevens niet ophalen',
            okButtonText: 'Ok!'
          });
        });
    },
  },
  mutations: {
    setEmployee(state, employee) {
      employee.BirthDate = new Date(employee.BirthDate);
      state.employee = employee;
    }
  }
};

export default account;
