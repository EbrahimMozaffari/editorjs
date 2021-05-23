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
<!-- <img id="cropimage" width="100%" src="" > -->
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-space">
         
          <h5 class="modal-title" id="cropmodalLabel">کراپ   </h5>
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
        
         <!-- <Cropper id="croperwraper" :src="imageCropSrc" @change="change" />modal-body -->
        <div class="">
          <div class="container">
            <div class="row" id="croperwraper">
            
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-start">
          <button
            type="button"
            class="btn btn-danger"
            data-dismiss="modal"   
          >
            بستن
          </button>
           <button
            type="button"
            class="btn btn-success dark" 
            id="uploadImg"
            data-dismiss="modal" 
          >
          <span id="uploadSvg" class="d-none">
            <svg class="svg-icon myCircle" viewBox="0 0 20 20">
							<path fill="none" d="M19.305,9.61c-0.235-0.235-0.615-0.235-0.85,0l-1.339,1.339c0.045-0.311,0.073-0.626,0.073-0.949
								c0-3.812-3.09-6.901-6.901-6.901c-2.213,0-4.177,1.045-5.44,2.664l0.897,0.719c1.053-1.356,2.693-2.232,4.543-2.232
								c3.176,0,5.751,2.574,5.751,5.751c0,0.342-0.037,0.675-0.095,1l-1.746-1.39c-0.234-0.235-0.614-0.235-0.849,0
								c-0.235,0.235-0.235,0.615,0,0.85l2.823,2.25c0.122,0.121,0.282,0.177,0.441,0.172c0.159,0.005,0.32-0.051,0.44-0.172l2.25-2.25
								C19.539,10.225,19.539,9.845,19.305,9.61z M10.288,15.752c-3.177,0-5.751-2.575-5.751-5.752c0-0.276,0.025-0.547,0.062-0.813
								l1.203,1.203c0.235,0.234,0.615,0.234,0.85,0c0.234-0.235,0.234-0.615,0-0.85l-2.25-2.25C4.281,7.169,4.121,7.114,3.961,7.118
								C3.802,7.114,3.642,7.169,3.52,7.291l-2.824,2.25c-0.234,0.235-0.234,0.615,0,0.85c0.235,0.234,0.615,0.234,0.85,0l1.957-1.559
								C3.435,9.212,3.386,9.6,3.386,10c0,3.812,3.09,6.901,6.902,6.901c2.083,0,3.946-0.927,5.212-2.387l-0.898-0.719
								C13.547,14.992,12.008,15.752,10.288,15.752z"></path>
						</svg>
          </span>
          <span id="uploadTxt" class="">آپلود</span>
            
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
    uploadCropped(){

      console.log("uploadCropped");
      //const imgCropped = document.querySelector("#cropedImgBase64");
     // console.log("imgCropped",imgCropped);
    //  var cropper = $image.data('cropper')
var cropper = document.querySelector("#cropedImgBase64").data("cropper");
 console.log("cropper",cropper);
      //  let canvas = cropper.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 });
      //  var dataURL = canvas.toDataURL();
      //  console.log("dataURL",dataURL);

      // let canvas = imgCropped.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 });
      //         var dataURL = canvas.toDataURL();
      //          dataURL.replace("data:", "")
      //           .replace(/^.+,/, "");
      //          console.log("dataURL",dataURL);
              //  document.querySelector("#cropedImgBase64").value = dataURL;
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
#cropmodal .btn-success,#cropmodal .btn-danger {
  // color: black !important;
  // background-color: rgb(252, 54, 54) !important;
  border: none !important;
  border-radius: 2px !important;
  outline: none !important;
}
#cropmodal .paginationtn {
  border-radius: 0 !important;
  outline: none !important;
}
// .btn-primary:hover {
//   background-color: lightcyan !important;
// }

#cropmodal .container .d-flex {
  max-height: 55px;
  height: 55px;
}
#cropmodal .searchInput {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #d8d8d8;
}
#cropmodal .searchInput:focus {
  outline-style: solid;
  outline-color: #d8d8d8;
  /* border-bottom: 1px solid #d8d8d8; */
}
#cropmodal .searchInput,
#cropmodal .modal-title,
#cropmodal .modal-footer .btn {
  font-family: IRANSansWeb-FaNum-Light;
}
#cropmodal .searchInput:focus {
  border: none;
}
#cropmodal .copyBtn {
  width: 35%;
}
#cropmodal .modal-header .close {
  margin: -1rem -1rem -1rem;
  color: red;
  font-size: 2rem;
}
#cropmodal .col-6:hover {
  border: solid 1px gray;
}
#cropmodal .modal-footer {
  overflow: hidden;
  padding: 20px 25px;
  padding-top: 25px;
  background: #f5f5f5;
  background: #f5f5f5 url(/img/foobg.png) top left repeat-x;
  border-top: none;
}
#cropmodal .modal-header {
  background: #ececec;
  border-bottom: solid 4px gray;
}
#cropmodal .myCircle{
    width: 20px;
    height: 20px;
    animation-name: rotate;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    border-radius: 50%;
}
@keyframes rotate{
    from{ transform: rotate(-360deg); }
    to{ transform: rotate(360deg); }
}
</style>