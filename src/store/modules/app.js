export const namespaced = true;

export const state = {
  gallery: [],
  videoGallery: [],
  totalImageCount: 0,
  totalVideoCount: 0,
};
export const getters = {
  getGallery(state) {
    return state.gallery;
  },
  getVideoGallery(state) {
    return state.videoGallery;
  },
  getTotalImageCount(state) {
    return state.totalImageCount;
  },
  getTotalVideoCount(state) {
    return state.totalVideoCount;
  },
};
export const mutations = {
  SET_GALLERY_DATA(state, payload) {
    state.gallery = payload;
  },
  SET_VIDEOGALLERY_DATA(state, payload) {
    state.videoGallery = payload;
  },
  SET_TOTALIMAGECOUNT(state, payload) {
    state.totalImageCount = payload;
  },
  SET_TOTALVIDEOCOUNT(state, payload) {
    state.totalVideoCount = payload;
  },
};

export const actions = {
  async fetchGalleryData({ commit }, data) {
    //console.log("dataaa",data)
    var jsondata = {};
    if (data) {
      if (data.sliding) {
        jsondata = {
          keyword: data.keyword,
          SlidingParameters: data.sliding,
        };
      } else {
        jsondata = {
          keyword: data.keyword,
          SlidingParameters: {
            Order: "descending",
            Skip: 0,
            Sort: "picID",
            Take: 12,
          },
        };
      }
    } else {
      jsondata = {
        SlidingParameters: {
          Order: "descending",
          Skip: 0,
          Sort: "picID",
          Take: 12,
        },
      };
    }
    try {
      let data = await axios
        .post("https://apiadmin.tebyan.net/image/SearchImage", jsondata, {
          headers: {
            "Content-Type": "application/json",
            //"Content-Type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQyMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiI0MjAiLCJzdWIiOiI0MjAiLCJqdGkiOiI5MDQ5Mzc0Ni1jOTg1LTQ5MDgtOWM4My1jZDcyZTZhZDAwYzIiLCJpYXQiOiI1LzE1LzIxIDEyOjMzOjQzIFBNIiwiSWQiOjQyMCwibmJmIjoxNjIxMDY1ODIzLCJleHAiOjE3MDc0NjU4MjMsImlzcyI6IlNlbGYiLCJhdWQiOiJBcGlDbGllbnRzIn0.32Ajhu6yslM-LsaL1-3humdOud0LMAaw-Quac-rGqps`,
          },
        })
        .then((response) => {
          console.log("SUCCESS!!", response.data);

          // return response.data.file.url;
          return response.data;
          //funcCreate(response.data.file.url);
        })
        .catch(function(error) {
          console.log("FAILURE!!", error);
        });
      // let data = await axios.get('http://localhost:3000/gallery');
      //console.log(data.data.data);
      commit("SET_TOTALIMAGECOUNT", data.data.total);
      if (data.data.data) {
        commit("SET_GALLERY_DATA", data.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  },
  async fetchVideoGalleryData({ commit }, data) {
    var jsondata = {};
    if (data) {
      if (data.sliding) {
        jsondata = {
            Title: data.Title,
          SlidingParams: data.sliding,
        };
      } else {
        jsondata = {
            Title: data.Title,
          SlidingParams: {
            Order: "descending",
            Skip: 0,
            Sort: "musicid",
            Take: 12,
          },
        };
      }
    } else {
      jsondata = {
        SlidingParams: {
          Order: "descending",
          Skip: 0,
          Sort: "musicid",
          Take: 12,
        },
      };
    }
    try {
      //console.log("jsondata",jsondata);
      let data = await axios
        .post(
          "https://apiadmin.tebyan.net/music/GetFilteredMusicForAdmin",
          jsondata,
          {
            headers: {
              "Content-Type": "application/json",
              //"Content-Type": "multipart/form-data",
              Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQyMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiI0MjAiLCJzdWIiOiI0MjAiLCJqdGkiOiI1NDdhZDI2OS0wZDc0LTQzOTgtYmJhYS1kOWQ3MzdhMTY4MzciLCJpYXQiOiI1LzMwLzIxIDEwOjAyOjA5IEFNIiwiSWQiOjQyMCwibmJmIjoxNjIyMzUyNzI5LCJleHAiOjE3MDg3NTI3MjksImlzcyI6IlNlbGYiLCJhdWQiOiJBcGlDbGllbnRzIn0.veOeATuoXcntvN3HvAL3ede7Bpb6crZ8RqMHS8CFtYs`,
            },
          }
        )
        .then((response) => {
          console.log("SUCCESS!!", response.data);

          // return response.data.file.url;
          return response.data;
          //funcCreate(response.data.file.url);
        })
        .catch(function(error) {
          console.log("FAILURE!!", error);
        });
      // let data = await axios.get('http://localhost:3000/gallery');
      //console.log(data.data.data);
      commit("SET_TOTALVIDEOCOUNT", data.data.total);
      if (data.data.data) {
        commit("SET_VIDEOGALLERY_DATA", data.data.data);
      }
      //   console.log(data);
      //   if (data.data) {
      //     commit("SET_VIDEOGALLERY_DATA", data.data);
      //   }
    } catch (e) {
      console.log(e);
    }
  },
};
