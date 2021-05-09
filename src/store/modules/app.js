export const namespaced = true;

export const state = {
    gallery: [],

};
export const getters = {
    getGallery(state) {
        return state.gallery
    },
};
export const mutations = {

    SET_GALLERY_DATA(state, payload) {
        state.gallery = payload
    },
    
};

export const actions = {
    async fetchGalleryData({commit}) {
        try {
            let data = await axios.get('http://localhost:3000/gallery');
            console.log(data);
            if (data.data) {
                commit('SET_GALLERY_DATA', data.data)
            }
        } catch (e) {
            console.log(e)
        }
    },

};
