function initialState() {
    return {
        coupons: [],
        couponAll: [],
        coupon_medias: [],
        ageGroup: [],
        newTalent: {
            id: "",
            name: "",
            age: "",
            gender: "",
            status: "",
            avatar: null
        },
        currentTalent: {
            id: "",
            name: "",
            age: "",
            gender: "",
            status: "",
            avatar: null
        },
        gender: [
            { id: "3", name: "Male" },
            { id: "4", name: "Female" },
        ],
        status: [
            { id: "P", name: "Pending / Pause" },
            { id: "L", name: "Live" },
            { id: "D", name: "Dead" },
        ],
        errorMsg: false,
        successMsg: false,
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        showMediaListModal: false,
        currentPage: 0,
        pageSize: 10,
        key: ""
    }
}

const getters = {
    data: state => {
        let firstSliceNumber = state.currentPage*state.pageSize
        let lastSliceNumber = (state.currentPage+1)*state.pageSize
        let rows = [];
        if (state.coupons.length != 0)
        {
            rows = state.coupons.slice(firstSliceNumber, lastSliceNumber)
        }

        return rows
    },
    couponAll: state => state.coupons,
    coupon_medias: state => state.coupon_medias,
    ageGroup: state => {
        let ageGroupData = state.ageGroup
        return ageGroupData
    },
    currentTalent:      state => state.currentTalent,
    newTalent:          state => state.newTalent,
    gender:             state => state.gender,
    status:             state => state.status,
    total:              state => state.coupons.length,
    errorMsg:           state => state.errorMsg,
    successMsg:         state => state.successMsg,
    showAddModal:       state => state.showAddModal,
    showEditModal:      state => state.showEditModal,
    showDeleteModal:    state => state.showDeleteModal,
    showMediaListModal: state => state.showMediaListModal,
    currentPage:        state => state.currentPage,
    pageSize:           state => state.pageSize,
    key:                state => state.key
}

const actions = {
    fetchData({ commit, state }) {
        axios
            .request({
                url: 'https://apitest.livingformusicgroup.com/api/admin/v1/coupons',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer HzGGZXFdtoq1sJbZWzBYwSzuNBr99Fogj7IdSqPN'
                }
            })
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setAll', response.data);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    fetchAgeGroupData({ commit, state }) {

        axios.get("/wp-json/vtm/v1/coupon-age-group")
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setAgeGroup', response.data.age_group);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    insertTalent({ commit, state, dispatch }) {

        let message = "";
        if (state.newTalent.avatar == "" || typeof state.newTalent.avatar == "undefined" || state.newTalent.avatar == null)
            message = "You must upload Avatar! \n\r"
        if (state.newTalent.name == "" || typeof state.newTalent.name == "undefined")
            message += "You must type Name of Voice Talent! \n\r"
        if (state.newTalent.status == "" || typeof state.newTalent.status == "undefined")
            message += "You must select Status! \n\r"
        if (state.newTalent.gender == "" || typeof state.newTalent.gender == "undefined")
            message += "You must select Gender! \n\r"
        if (state.newTalent.age == "" || typeof state.newTalent.age == "undefined")
            message += "You must select Age Group! \n\r"
        if (message != "")
        {
            commit('setError', message)
            return;
        }

        let params = _.cloneDeep(state.newTalent)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        Object.keys(params).forEach(function (key) {
            if(params[key] !== null)
            {
                formData.append(key, params[key]);
            }
        });
        axios.post("/wp-json/vtm/v1/insert-coupon", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        let v = {
                            modalName: "showAddModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        commit('setSuccess', response.data.message);
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    updateTalent({ commit, state, dispatch }) {

        let message = "";
        if (state.newTalent.avatar == "" || typeof state.newTalent.avatar == "undefined" || state.newTalent.avatar == null)
            message = "You must upload Avatar! \n\r"
        if (state.newTalent.name == "" || typeof state.newTalent.name == "undefined")
            message += "You must type Name of Voice Talent! \n\r"
        if (state.newTalent.status == "" || typeof state.newTalent.status == "undefined")
            message += "You must select Status! \n\r"
        if (state.newTalent.gender == "" || typeof state.newTalent.gender == "undefined")
            message += "You must select Gender! \n\r"
        if (state.newTalent.age == "" || typeof state.newTalent.age == "undefined")
            message += "You must select Age Group! \n\r"
        if (message != "")
        {
            commit('setError', message)
            return;
        }

        let params = _.cloneDeep(state.newTalent)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        Object.keys(params).forEach(function (key) {
            if(params[key] !== null)
            {
                formData.append(key, params[key]);
            }
        });
        axios.post("/wp-json/vtm/v1/update-coupon", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        let v = {
                            modalName: "showEditModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        commit('setSuccess', response.data.message);
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    deleteTalent({ commit, state, dispatch }) {

        let params = _.cloneDeep(state.currentTalent)
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
        let formData = new FormData();
        Object.keys(params).forEach(function (key) {
            if(params[key] !== null)
            {
                formData.append(key, params[key]);
            }
        });
        axios.post("/wp-json/vtm/v1/delete-coupon", formData, config)
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        let v = {
                            modalName: "showDeleteModal",
                            modalValue: false,
                        }
                        commit('setModalVisibility', v)
                        commit('setSuccess', response.data.message);
                        dispatch('fetchData')
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    setModalVisibility({ commit }, value) {
        commit('setModalVisibility', value)
    },
    selectTalent({ commit }, { value1, value2 }) {
        commit('selectTalent', value1)
        let v = {
            modalName: value2,
            modalValue: true,
        }
        commit('setModalVisibility', v)
    },
    selectTalentMedia({ commit }, { value1, value2 }) {

        axios.get("/wp-json/vtm/v1/voice-coupon-media/" + value1.id_voice_coupon)
            .then(
                function(response) {
                    if (response.data.error) {
                        commit('setError', response.data.message)
                    }
                    else
                    {
                        commit('setTalentMedia', response.data.coupon_medias)
                        commit('selectTalent', value1)
                        let v = {
                            modalName: value2,
                            modalValue: true,
                        }
                        commit('setModalVisibility', v)
                        commit('setSuccess', response.data.message);
                    }
                })
            .catch(error => {
                let message = error.data.message || error.message
                commit('setError', message)
                console.log(message)
            })
    },
    changePageNumber({ commit }, value) {
        commit('changePageNumber', value)
    },
    setAvatar({ commit }, value) {
        commit('setAvatar', value)
    },
    setName({ commit }, value) {
        commit('setName', value)
    },
    setGender({ commit }, value) {
        commit('setGender', value)
    },
    setAge({ commit }, value) {
        commit('setAge', value)
    },
    setStatus({ commit }, value) {
        commit('setStatus', value)
    },
    setSearchKey({ commit }, value) {
        commit('setSearchKey', value)
    },
    resetState({ commit }) {
        commit('resetState')
    }
}

const mutations = {
    setAll(state, items) {
        state.coupons = items
        state.couponAll = items
    },
    setTalentMedia(state, item) {
        state.coupon_medias = item
    },
    setAgeGroup(state, items) {
        state.ageGroup = items
    },
    selectTalent(state, value1) {
        state.currentTalent.id      = value1['id_voice_coupon']
        state.currentTalent.name    = value1['coupon_name']
        state.currentTalent.age     = value1['coupon_age']
        state.currentTalent.gender  = value1['coupon_gender']
        state.currentTalent.status  = value1['status']
        state.currentTalent.avatar  = value1['guid']

        state.newTalent.id          = value1['id_voice_coupon']
        state.newTalent.name        = value1['coupon_name']
        state.newTalent.age         = value1['coupon_age']
        state.newTalent.gender      = value1['coupon_gender']
        state.newTalent.status      = value1['status']
        state.newTalent.avatar      = value1['guid']
    },
    setModalVisibility(state, value) {
        let modalName = value['modalName']
        let modalValue = value['modalValue']

        state[modalName] = modalValue
    },
    changePageNumber(state, value) {
        state.currentPage = value
    },
    setAvatar(state, value) {
        state.newTalent.avatar = value
    },
    setName(state, value) {
        state.newTalent.name = value
    },
    setGender(state, value) {
        state.newTalent.gender = value
    },
    setAge(state, value) {
        state.newTalent.age = value
    },
    setStatus(state, value) {
        state.newTalent.status = value
    },
    setSearchKey(state, value) {
        state.key = value

        if (state.couponAll.length != 0)
        {
            state.coupons = state.couponAll.filter(coupon => {
                return coupon.coupon_name.toLowerCase().includes(state.key.toLowerCase());
            });
            state.currentPage = 0
        }
    },
    setSuccess(state, value) {
        state.successMsg = value
    },
    setError(state, value) {
        state.errorMsg = value
    },
    resetState(state) {
        state = Object.assign(state, initialState())
    },
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}