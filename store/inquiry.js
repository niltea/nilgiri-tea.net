const keys = [
  'event',
  'isCircle',
  'inquiryCategory',
  'ticketCount',
  'chairCount',
  'paidDate',
  'paidPrice',
  'paidName',
  'name',
  'circleName',
  'mail',
  'body',
];

export const state = () => ({
  event          : null,
  isCircle       : null,
  inquiryCategory: '',
  ticketCount    : 0,
  chairCount     : 0,
  paidDate       : '',
  paidPrice      : 0,
  paidName       : '',
  name           : '',
  circleName     : '',
  mail           : '',
  body           : '',

  isOK: false,
});
export const mutations = {
  setData (state, payload) {
    keys.forEach((key) => {
      if (payload[key] !== undefined) {
        state[key] = payload[key];
      }
    });
    state.isOK = true;
  },
  remove (state) {
    state.event = null;
    state.isCircle = null;
    state.inquiryCategory = '';
    state.ticketCount = 0;
    state.chairCount = 0;
    state.paidDate = '';
    state.paidPrice = 0;
    state.paidName = '';
    state.name = '';
    state.circleName = '';
    state.mail = '';
    state.body = '';
  },
  resetOKFlag (state) {
    state.isOK = false;
  },
};

export const getters = {
  getContact (state) {
    return {
      event          : state.event,
      isCircle       : state.isCircle,
      inquiryCategory: state.inquiryCategory,
      ticketCount    : state.ticketCount,
      chairCount     : state.chairCount,
      paidDate       : state.paidDate,
      paidPrice      : state.paidPrice,
      paidName       : state.paidName,
      name           : state.name,
      circleName     : state.circleName,
      mail           : state.mail,
      body           : state.body,
      isOK           : state.isOK,
    };
  },
};

export const actions = {
  setFormData ({ commit, dispatch, state }, payload) {
    commit('remove');
    commit('setData', payload);
  },
  removeAction ({ commit }) {
    commit('remove');
  },
  resetOKFlag ({ commit }) {
    commit('resetOKFlag');
  },
};
