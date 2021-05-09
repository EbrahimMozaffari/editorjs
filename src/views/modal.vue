<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">گالری تصاویر</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="container">
            <div class="row">
                <div class="col-6 col-md-4 d-flex my-1" v-for="item in dataGallery" :key="item.id">
                <img :src="item.src" width="80%" alt="" />
             
                    <button
                      type="button"
                      class="btn btn-primary"
                      v-clipboard:copy="item.src"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    >
                      <svg class="svg-icon" viewBox="0 0 20 20">
                        <path
                          d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"
                        ></path>
                      </svg>
                    </button>
              
                
            </div>
             
            </div>

            <!-- <table class="table table-hover">
              <tbody>
                <tr v-for="item in dataGallery" :key="item.src">
                  <td><img :src="item.src" width="150" alt="" /></td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary"
                      v-clipboard:copy="item.src"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                    >
                      <svg class="svg-icon" viewBox="0 0 20 20">
                        <path
                          d="M17.391,2.406H7.266c-0.232,0-0.422,0.19-0.422,0.422v3.797H3.047c-0.232,0-0.422,0.19-0.422,0.422v10.125c0,0.232,0.19,0.422,0.422,0.422h10.125c0.231,0,0.422-0.189,0.422-0.422v-3.797h3.797c0.232,0,0.422-0.19,0.422-0.422V2.828C17.812,2.596,17.623,2.406,17.391,2.406 M12.749,16.75h-9.28V7.469h3.375v5.484c0,0.231,0.19,0.422,0.422,0.422h5.483V16.75zM16.969,12.531H7.688V3.25h9.281V12.531z"
                        ></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table> -->

            <!-- <input type="text" v-model="message"> -->
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            بستن
          </button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["dataGallery"],
  data() {
    return {
      message:
        "http://ebrahimmozaffari.ir/demo/wp-content/uploads/2019/12/gloabl-tech.jpg",
      dialog: false,
    };
  },
  methods: {
    onCopy: function (e) {
      console.log("You just copied: " + e.text);
    },
    onError: function (e) {
      console.log("Failed to copy texts");
    },
  },
  mounted() {
    // console.log("modalcreated");
  },
};
</script>

<style>
.btn-primary{
    background-color: lightblue !important;
    border: initial  !important;
    border-radius:0 !important;
}
.btn-primary:hover{
    background-color: lightcyan !important;
}
</style>