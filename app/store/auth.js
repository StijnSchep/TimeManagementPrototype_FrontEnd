import axios from "axios";
import { getString, setString, clear } from "tns-core-modules/application-settings";
import * as dialogs from "tns-core-modules/ui/dialogs";


const auth = {
    namespaced: true,
    state: {
        token: null,
        user: null,
        isProcessing: true,
        isValidToken: false
    },
    actions: {
        getToken({ state, commit }, { token }) {
            commit('setToken', token);
            setString('store', JSON.stringify(state));
            return state.token;
        },
        loginUser({ state, commit }, user) {
            axios
                .post('https://nostrapersoneelsapi.herokuapp.com/api/auth/login', user)
                .then((res) => {
                    if (res.status === 200) {
                        commit('setUser', res.data.user);
                        commit('setToken', res.data.token);
                        setString('store', JSON.stringify(state));
                        commit('setIsValidToken', true);
                    } else {
                        dialogs.alert({
                            title: 'Error',
                            message: 'Ongeldige gebruikersnaam of wachtwoord voor domein',
                            okButtonText: 'Ok!'
                        });
                        commit('setIsProcessing', false);
                        commit('setIsValidToken', false);
                    }
                })
                .catch((err) => {
                    dialogs.alert({
                        title: 'Error',
                        message: 'Kon niet inloggen - server fout',
                        okButtonText: 'Ok!'
                    });
                });
        },
        logoutUser({ state, commit }) {
            setString('store', "");
            setString('checkIn', "");
            setString('pauze', "");
        },
        validateToken({ state, commit }, token) {
            axios
                .get('https://nostrapersoneelsapi.herokuapp.com/api/auth/validateToken', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    if (res.status === 200) {
                        const resToken = res.data.token;
                        commit('setToken', resToken);
                        commit('setIsValidToken', true);
                        setString('store', JSON.stringify(state))
                    } else if (res.status === 401) {
                        commit('setIsValidToken', false);
                        clear();
                    }
                    return state.isValidToken;
                })
                .catch(err => {
                    dialogs.alert({
                        title: 'Error',
                        message: 'Kon geen verbinding maken met server',
                        okButtonText: 'Ok!'
                    });
                    return false;
                });

        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setUser(state, user) {
            state.user = user;
        },
        setIsProcessing(state, bool) {
            state.isProcessing = bool;
        },
        load(state) {
            if (getString("store")) {
                Object.assign(state, JSON.parse(getString('store')));
            }
        },
        setIsValidToken(state, bool) {
            state.isValidToken = bool;
        }
    }
}

export default auth;
