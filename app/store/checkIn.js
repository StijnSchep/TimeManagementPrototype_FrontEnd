import axios from "axios";
import { setString } from 'tns-core-modules/application-settings';
import * as dialogs from 'tns-core-modules/ui/dialogs';

const checkIn = {
  namespaced: true,
  state: {
    branchId: null,
    departmentId: null,
    workedHours: [],
    allBranchesWithDepartments: [],
    postCheckInStatus: 0,
    checkOutStatus: 0
  },
  actions: {
    getBranchIdAndDepartmentId({ state, commit }, { branchId, departmentId }) {
      commit("setBranchId", branchId);
      commit("setDepartmentId", departmentId);
      return state.branchId;
    },
    getAllBranchesAndDepartments({ state, commit }, token) {
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/checkIn", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.status === 401) {
            setString('store', "");
          }
          commit("setBranchesWithDepartments", res.data.result);
        })
        .catch(err => {
          dialogs.alert({
            title: 'Error',
            message: 'Kon de filialen en afdelingen niet ophalen',
            okButtonText: 'Ok!'
          });

        });
    },
    postCheckIn({ state, commit }, { form, token }) {
      axios
        .post("https://nostrapersoneelsapi.herokuapp.com/api/checkIn", form, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.status === 401) {
            setString('store', "");
          }
          commit("setPostCheckInStatus", res.status);
          const checkInSaveData = {
            branchId: form.branchId,
            departmentId: form.departmentId,
            pause: 0
          };
          setString('checkIn', JSON.stringify(checkInSaveData));
        })
        .catch(err => {
          dialogs.alert({
            title: 'Error',
            message: 'Kon niet inklokken!',
            okButtonText: 'Ok!'
          });
        });
    },
    fetchAllWorkedHours({ state, commit }, token) {
      axios
        .get("https://nostrapersoneelsapi.herokuapp.com/api/workedHours", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          if (res.status === 401) {
            setString('store', "");
          }
          commit("setWorkedHours", res.data.result);
        })
        .catch(err => {
          dialogs.alert({
            title: 'Error',
            message: 'De gewerkte uren konden niet worden opgehaald!',
            okButtonText: 'Ok!'
          });
        });
    },
    updateWorkedHours({ state, commit }, { token, data }) {
      axios
        .patch("https://nostrapersoneelsapi.herokuapp.com/api/checkOut", data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          if (res.status === 401) {
            setString('store', "");
          }
          commit("setCheckOutStatus", res.status);
        })
        .catch(error => {
          dialogs.alert({
            title: 'Error',
            message: error.message,
            okButtonText: 'Ok!'
          });
        });
    },
    clearState({state, commit}) {
      commit('setBranchId', null);
      commit('setDepartmentId', null);
      commit('setPostCheckInStatus', 0);
      commit('setCheckOutStatus', 0);
    }
  },
  mutations: {
    setBranchId(state, bId) {
      state.branchId = bId;
    },
    setDepartmentId(state, dId) {
      state.departmentId = dId;
    },
    setWorkedHours(state, items) {
      state.workedHours = items;
    },
    setBranchesWithDepartments(state, items) {
      state.allBranchesWithDepartments = items;
    },
    setPostCheckInStatus(state, statusCode) {
      state.postCheckInStatus = statusCode;
    },
    setCheckOutStatus(state, statusCode) {
      state.checkOutStatus = statusCode;
    }
  }
};

export default checkIn;
