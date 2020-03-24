import { getString, setString } from 'tns-core-modules/application-settings';
const pause = {
  namespaced: true,
  state: {
    pause: 0,
    startTime: null
  },
  actions: {
    addEndPause({ state, commit }, endTime) {
      let start = getString('pause').split(":");
      let startHours = +start[0];
      let startMinutes = +start[1];

      let end = endTime.split(":");
      let endHours = +end[0];
      let endMinutes = +end[1];

      let x = endHours - startHours;
      if ( endHours < startHours ) {
        x = 24 - (startHours - endHours);
      }
      let y = endMinutes - startMinutes;
      if (endMinutes < startMinutes) {
        y = 60 - (startMinutes - endMinutes);
        x--;
      }

      const pauseTime = 60 * x + y;

      setString('pause', '');
      const checkInData = JSON.parse(getString('checkIn'));
      checkInData.pause += pauseTime;
      setString('checkIn', JSON.stringify(checkInData));

      commit("setPause", checkInData.pause);
      return state.pause;
    },
    addStartPause({ _, commit }, startTime) {
      commit("setStartTime", startTime);
      setString('pause', startTime);
    },
    clearState({state, commit}) {
      commit('setStartTime', null);
      commit('setPause', 0);
    }
  },
  mutations: {
    setStartTime(state, time) {
      state.startTime = time;
    },
    setPause(state, total) {
      state.pause = total;
    }
  }
};

export default pause;
