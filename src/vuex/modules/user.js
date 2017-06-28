/**
 * Created by jayce on 2017/6/27.
 */
import  api from '../../fetch/api'

import * as types from '../types'

const state = {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户信息
    userData: JSON.parse(localStorage.getItem('userInfo')) || {}
}

const actions = {

    /**
     * 退出登录
     * @param {any} {commit}
     */
    setSignOut({ commit }) {
        localStorage.removeItem('loginStatus')
        localStorage.removeItem('userInfo')
        commit(types.SET_LOGIN_STATUS, false)
        commit(types.GET_USER_DATA, {})
    },

    /**
     * 请求用信息
     * @param {any} {commit}
     * @param {any} name
     */
    getUserData({ commit }, name) {
        commit(types.COM_LOADING_STATUS, true)
        api.Login()
            .then(res => {
                localStorage.setItem('userInfo', JSON.stringify(res.data))
                localStorage.setItem('loginStatus', true)
                commit(types.COM_LOADING_STATUS, false)
                commit(types.GET_USER_DATA, res.data)
                console.log(res);
            })
            .catch(err=>console.log(err));
    }
}

const getters = {
    userData: state => state.userData,
    loginStatus:state=>state.loginStatus
}

const mutations = {
    [types.SET_LOGIN_STATUS](state, status) {
        state.loginStatus = status
    },
    [types.GET_USER_DATA](state, res) {
        state.userData = res
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}
