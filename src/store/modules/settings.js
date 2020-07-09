import * as types from '../mutation-types'
import settingsServer from '../../api/settings'

// initial state
const state = {
  platformOrgTree: [],
  areaUnionOrgTree: [],
  industrialUnionOrgTree: [],
  storeOrgTree: [],
  platformRoleSelect: [],
  areaUnionRoleSelect: [],
  industrialUnionRoleSelect: [],
  storeRoleSelect: []
}


// getters
const getters = {
  // parseDiploma: (state, name)=> {

  //   Enums.diplomas.map(diploma=> {
  //     if (diploma.name == name) {
  //       return diploma;
  //     }
  //   })

  // }

}


// actions
const actions = {
  // 获取组织架构（平台、市区县工会、产业工会、商城）
  loadOrgTree({commit}, params) {
    return new Promise((resolve, reject) => {
      settingsServer.loadOrganizationTree(params, res => {
        commit(types.LOAD_ORGTREE, {params, res});
        resolve(res);
      }, () => {
        reject();
      });
    })
  },
  // 获取角色类型下拉列表（平台、市区县工会、产业工会、商城）
  loadRoleSelect({commit}, params) {
    return new Promise((resolve, reject) => {
      settingsServer.loadRoleSelect(params, res => {
        commit(types.LOAD_ROLESELECT, {params, res});
        resolve(res);
      }, () => {
        reject();
      });
    })
  },
}


// mutations
const mutations = {
  [types.LOAD_ORGTREE](state, params) {
    if (params.params.typeId === 10901) {
      state.platformOrgTree = params.res.data;
    } else if (params.params.typeId === 10902) {
      state.areaUnionOrgTree = params.res.data;
    } else if (params.params.typeId === 10903) {
      state.industrialUnionOrgTree = params.res.data;
    } else {
      state.storeOrgTree = params.res.data;
    }
  },

  [types.LOAD_ROLESELECT](state, params) {
    if (params.params.type === 10901) {
      state.platformRoleSelect = params.res.data;
    } else if (params.params.type === 10902) {
      state.areaUnionRoleSelect = params.res.data;
    } else if (params.params.type === 10903) {
      state.industrialUnionRoleSelect = params.res.data;
    } else {
      state.storeRoleSelect = params.res.data;
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
