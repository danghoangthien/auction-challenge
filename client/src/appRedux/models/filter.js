import store from 'appRedux/store';

const INITIAL_STATE = {
  status: null,
};

const FILTER_LIST_MODEL = '@app//filters';
const FILTER_MODEL = '@app//filter';
const FILTER_CONTAINER_MODEL = '@app//filter_container';

const filters = {
  name: FILTER_LIST_MODEL,
  state: INITIAL_STATE, // initial state
  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    async list(endpointService) {
      if (endpointService) {
        const { data } = await endpointService.filters();
        data.status && this.setData(data);
      }
    },
  },
};

const filter = {
  name: FILTER_MODEL,
  state: INITIAL_STATE, // initial state
  reducers: {
    setData(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    async create({ endpointService, payload }) {
      const { data } = await endpointService.createFilters(payload);
      if (data.status) {
        this.setData(data);
        window.location.reload();
      }
    },
    async delete({ endpointService, filterId }) {
      const { data } = await endpointService.deleteFilter(filterId);
      if (data.status) {
        this.setData(INITIAL_STATE);
        window.location.reload();
      }
    },
  },
};

const filterContainer = {
  name: FILTER_CONTAINER_MODEL,
  state: {
    isOpen: false,
  }, // initial state
  reducers: {
    setIsOpen(state, isOpen) {
      return {
        ...state,
        isOpen,
      };
    },
    toggle(state) {
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    },
  },
};

export { filters, filter, filterContainer };
