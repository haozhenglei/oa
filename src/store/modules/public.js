import * as types from '../mutation-types'
import publicServer from '../../api/public'
import router from '../../router'

// initial state
const state = {
  logined: false,
  bodyWidth: 0,
  bodyHeight: 0,
  pageAllSizeMore: [10, 20, 40, 60, 80, 100,1000],
  breadcrumbData: [
    {name: '设置', path: '', params: {}},
    {name: '操作日志', path: '/handlelog', params: {}}
  ],
  pageAllSize: [10, 20, 40, 60, 80, 100],
  loginUser: {},
  menuList: [],
  permission: [],
  resourceTree: [],
  asideMenuList: [],
  uploadAll: {
    fileType: 'customerHead/productImage',
  },
  //机票订单管理
  airOrderConfig:{
    filters:{},
    status :false,
    searchForm:{}
  },
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
  changeLoginStatus({commit}, params) {
    if (!params) {
      router.push({path: '/'});
      localStorage.clear();
    }
    commit(types.CHANGE_LOGIN_STATUS, params);
  },

  loadbodySize({commit}) {
    commit(types.LOAD_BODYSIZE);
  },

  loadMenuList({commit}, params) {
    commit(types.LOAD_MENULIST, params);
  },

  loadPermission({commit}, params) {
    commit(types.LOAD_PERMISSION, params);
  },

  loadResourceTree({commit}, params) {
    commit(types.LOAD_RESOURCE_TREE, params);
  },

  loadAsideMenu({commit}, params) {
    commit(types.LOAD_ASIDEMENU, params);
  },

  changeBreadcrumb({commit}, params) {
    commit(types.CHANGE_BREADCRUMB, params);
  },

  loadLoginUser({commit}, params) {
    commit(types.LOAD_LOGIN_USER, params);
  }
}


// mutations
const mutations = {
  [types.CHANGE_LOGIN_STATUS](state, params) {
    state.logined = params;
  },

  [types.LOAD_BODYSIZE](state) {
    state.bodyWidth = document.body.clientWidth;
    state.bodyHeight = document.body.clientHeight;
  },

  [types.LOAD_RESOURCE](state, params) {
    state.resource = params;
  },
  [types.LOAD_MENULIST](state, params) {
    state.menuList = params;
  },
  [types.LOAD_PERMISSION](state, params) {
    state.permission = params;
  },

  [types.LOAD_RESOURCE_TREE](state, params) {
    state.resourceTree = params;
  },

  [types.LOAD_ASIDEMENU](state, params) {
    state.asideMenuList = params;
  },

  [types.CHANGE_BREADCRUMB](state, params) {
    state.breadcrumbData = params;
  },

  [types.LOAD_LOGIN_USER](state, params) {
    state.loginUser = params;
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
