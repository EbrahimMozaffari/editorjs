<template>
<div>
   <!-- <cropper :src="img" @change="change" /> -->
   <div
    class="modal fade"
    id="cropmodal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="cropmodal"
    aria-hidden="true"
  >
    <!-- <input type="hidden" id="videoUrl" />
    -->
    <input type="hidden" id="cropedImgUrl" /> 
    <input type="hidden" id="cropedImgBase64" />
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-space">
         
          <h5 class="modal-title" id="videoModalLabel">تغییر سایز عکس </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
           
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <!-- <input
          type="text"
          class="searchInput"
          placeholder="جستجو ..."
          v-model="mySearchText"
        /> -->
        
         <!-- <Cropper id="croperwraper" :src="imageCropSrc" @change="change" /> -->
        <div class="modal-body">
          <div class="container">
            <div class="row" id="croperwraper">
            <img id="cropimage" width="100%" src="" >
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-start">
          <button
            type="button"
            class="btn btn-alert"
            data-dismiss="modal"
           
          >
            بستن
          </button>
           <button
            type="button"
            class="btn btn-success"
            data-dismiss="modal"
           
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
 
</template>

<script>
// import { Cropper } from "vue-advanced-cropper";
// import "vue-advanced-cropper/dist/style.css";
// import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
export default {
  components: {
    //Cropper,
  },
  data() {
    return {
      imageCropSrc:"",
      img: "/img/slider.jpg",
    };
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log({ coordinates, canvas });
    },
    mymethod(){
      console.log("dddddddd");
    }
  },
  created() {
   // console.log(coordinates, canvas);

  },
    mounted() {
      //this.change();


    $("#cropmodal").on("show.bs.modal", function (e) {
      //var modal = document.querySelector(".vue-advanced-cropper");
     // modal.setAttribute("width","100%")
      // var mines = document.querySelectorAll(".videotoolblock > input");
      // let len = mines.length;

      // mines[len - 1].value = document.getElementById("videoUrl").value;
      // //mines[len - 1].value = this.imageUrl;
      // mines[len - 1].focus();

      // setTimeout(() => {
      //   document.getElementById("imageUrl").value = "";
      // }, 1500);
    });
  },
};
</script>
<style lang="scss">
 #cropimage{
   width: 100% !important;
 }
  // .cropper-container,.cropper-canvas,.cropper-canvas img,.cropper-view-box, .cropper-view-box img{
  //   width: 100% !important;
  //   // min-height: 350px !important;
  //   // height: initial !important;
  // }

</style>