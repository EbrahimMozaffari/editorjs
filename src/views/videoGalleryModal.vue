<template>
  <div
    class="modal fade"
    id="videoModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="videoModal"
    aria-hidden="true"
  >
    <input type="hidden" id="videoUrl" />
    <input type="hidden" id="isvideoUrl" />
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-space">
          <h5 class="modal-title" id="videoModalLabel">گالری ویدئو</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="clearInputVideo"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <input
          type="text"
          class="searchInput"
          placeholder="جستجو ..."
          v-model="mySearchText"
        />
        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div
                class="col-6 col-md-4 d-flex my-1 px-0 border"
                v-for="item in videoGalleryData"
                :key="item.id"
              >
                <img
                  class="imageGallery"
                  :src="`https://img.tebyan.net/${item.MediaPicUrl}`"
                  width="65%"
                  alt=""
                />

                <button
                  type="button"
                  data-dismiss="modal"
                  class="btn btn-primary copyBtn"
                  v-clipboard:copy="
                    `https://mov.tebyan.net/${item.MediaUrl}++https://img.tebyan.net/${item.MediaPicUrl}`
                  "
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  title="افزودن"
                >
                  <svg class="svg-icon" viewBox="0 0 20 20">
                    <path
                      d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="row d-flex justify-content-between">
              <div class="col-12 px-0">
                <button
                  :disabled="nextCount == 0"
                  class="btn btn-primary paginationtn btn-outline-light"
                  @click="next"
                  title="صفحه بعد"
                >
                  <svg class="svg-icon" viewBox="0 0 20 20">
                    <path
                      fill="none"
                      d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"
                    ></path>
                  </svg>
                </button>
                <button
                  class="btn btn-primary paginationtn btn-outline-light"
                  @click="prev"
                  :disabled="prevDisabled"
                  title="صفحه قبل"
                >
                  <svg class="svg-icon" viewBox="0 0 20 20">
                    <path
                      fill="none"
                      d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-start">
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="clearInputVideo"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["videoGalleryData"],
  data() {
    return {
      videoUrl: "",
      searchText: [],
      mySearchText: "",
      searchQuery: "",
      search: null,
      nextCount: 0,
      prevCount: 12,
      prevDisabled: false,
      dialog: false,
    };
  },
  methods: {
    myfunction() {
      console.log("myfunct", this.value);
    },
    clearInputVideo() {
      document.getElementById("videoUrl").value = "";
    },
    onCopy: function (e) {
      //console.log("You just copied: " + e.text);
      //let inputPosition = document.querySelectorAll('focusInput');
      //console.log("inputPosition",inputPosition)
      // let length = inputPosition.length;

      // inputPosition[length-1].focus();
      //this.imageUrl =  e.text;
      document.getElementById("videoUrl").value = e.text;
    },
    onError: function (e) {
      console.log("Failed to copy texts");
    },
    next: function (event) {
      event.preventDefault();
      let totalVideoCount = this.$store.state.app.totalVideoCount;
      // console.log("totalVideoCount--> next", totalVideoCount);
      if (this.nextCount > 0) {
        this.prevCount = this.prevCount - 12;
        this.nextCount = this.nextCount - 12;
      } else {
        // this.prevDisabled = true;
      }
      let skip = this.nextCount;

      let jsondata = {
        Order: "descending",
        Skip: skip,
        Sort: "musicid",
        Take: 12,
      };

      this.$store.dispatch("app/fetchVideoGalleryData", {
        keyword: this.mySearchText,
        sliding: jsondata,
      });
    },
    prev: function (event) {
      event.preventDefault();
      let totalVideoCount = this.$store.state.app.totalVideoCount;

      let skip = this.prevCount;
      // console.log("totalVideoCount --> prev",skip,"--", totalVideoCount);
      let jsondata = {
        Order: "descending",
        Skip: skip,
        Sort: "musicid",
        Take: 12,
      };

      this.$store.dispatch("app/fetchVideoGalleryData", {
        Title: this.mySearchText,
        sliding: jsondata,
      });
      if (totalVideoCount > this.prevCount) {
        this.prevCount = this.prevCount + 12;
        this.nextCount = this.nextCount + 12;
      } else {
        this.prevDisabled = true;
      }
    },
  },
  mounted() {
    $("#videoModal").on("hide.bs.modal", function (e) {
      var mines = document.querySelectorAll(".videotoolblock > input");
      let len = mines.length;

      mines[len - 1].value = document.getElementById("videoUrl").value;
      //mines[len - 1].value = this.imageUrl;
      mines[len - 1].focus();

      setTimeout(() => {
        document.getElementById("videoUrl").value = "";
      }, 1500);
    });
  },
  watch: {
    mySearchText: function () {
      console.log("this is mySearchText", this.mySearchText);
      if (this.mySearchText !== "") {
        this.$store.dispatch("app/fetchVideoGalleryData", {
          Title: this.mySearchText,
        });
      } else {
        this.$store.dispatch("app/fetchVideoGalleryData");
      }
    },
  },
  computed: {
    itemsSearched: function () {
      var self = this;
      //   let data = this.$store.state.app.gallery;
      if (this.searchText == "") {
        //       if (data.length !== 0) {
        //     //console.log("fetch dataaaaa");
        //     this.$store.dispatch("app/fetchGalleryData");
        //     console.log("khali shod");
        //   }
        // return this.items;
        //console.log("khali shod");
      }
      // console.log("ino search kard", this.searchText);
      //   if (data.length !== 0) {
      //   this.$store.dispatch("app/fetchGalleryData",this.searchText);
      //   }
      //   return this.items.filter(function (item) {
      //     return item.indexOf(self.searchText) >= 0;
      //   });
    },
  },
};
</script>

<style >
.btn-primary {
  color: black !important;
  background-color: lightblue !important;
  border: none !important;
  border-radius: 0 !important;
  outline: none !important;
}
#videoModal .paginationtn {
  border-radius: 0 !important;
  outline: none !important;
}
.btn-primary:hover {
  background-color: lightcyan !important;
}

#videoModal .container .d-flex {
  max-height: 55px;
  height: 55px;
}
#videoModal .searchInput {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #d8d8d8;
}
#videoModal .searchInput:focus {
  outline-style: solid;
  outline-color: #d8d8d8;
  /* border-bottom: 1px solid #d8d8d8; */
}
#videoModal .searchInput,
#videoModal .modal-title,
#videoModal .modal-footer .btn {
  font-family: IRANSansWeb-FaNum-Light;
}
#videoModal .searchInput:focus {
  border: none;
}
#videoModal .copyBtn {
  width: 35%;
}
#videoModal .modal-header .close {
  margin: -1rem -1rem -1rem;
  color: red;
  font-size: 2rem;
}
#videoModal .col-6:hover {
  border: solid 1px gray;
}
#videoModal .modal-footer {
  overflow: hidden;
  padding: 20px 25px;
  padding-top: 25px;
  background: #f5f5f5;
  background: #f5f5f5 url(/img/foobg.png) top left repeat-x;
  border-top: none;
}
#videoModal .modal-header {
  background: #ececec;
  border-bottom: solid 4px gray;
}
</style>