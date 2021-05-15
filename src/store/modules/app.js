export const namespaced = true;

export const state = {
    gallery: [],
    videoGallery: [],

};
export const getters = {
    getGallery(state) {
        return state.gallery
    },
    getVideoGallery(state) {
        return state.videoGallery
    },
};
export const mutations = {

    SET_GALLERY_DATA(state, payload) {
        state.gallery = payload
    },
    SET_VIDEOGALLERY_DATA(state, payload) {
        state.videoGallery = payload
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
    async fetchVideoGalleryData({commit}) {
        try {
            let data = await axios.get('http://localhost:3000/video');
            console.log(data);
            if (data.data) {
                commit('SET_VIDEOGALLERY_DATA', data.data)
            }
        } catch (e) {
            console.log(e)
        }
    },

};
