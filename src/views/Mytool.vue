<template >
  <v-container>
    <button class="button btn-primary" @click="invokeSave">Save</button>
    <!-- Button trigger modal -->
    <button
      type="button"
      id="mybtn1"
      class="btn btn-primary d-none"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Launch demo modal
    </button>
    <Modal />
    <!-- <input type="text" v-model="message"> -->
    <!-- 
<div class="modal fade show" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container">
      <img :src="message" width="150" alt="">
   
    
    <button type="button"
    class="btn btn-primary"
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">Copy!</button>
  </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> -->

    <div id="home">
      <div class="demo" dir="rtl" style="text-align:right;">
        <h2 style="text-align: center">my tool</h2>
        <h1 style="text-align: center">ویرایشگر</h1>
        <editor ref="editor" :config="config" :initialized="onInitialized" />
        <!-- <button @click="invokeSave">Save</button> -->
      </div>
    </div>
  </v-container>
</template>
<script>
import Header from "@editorjs/header";
// import Header1 from "editorjs-header-with-anchor";
import List from "@editorjs/list";
import CodeTool from "@editorjs/code";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import Warning from "@editorjs/warning";
import RawTool from "@editorjs/raw";
import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import Delimiter from "@editorjs/delimiter";
// import myDelimiter from "@editorjs/myplugin";
// import SimpleImage from "@editorjs/simple-image";
import ImageTool from "@editorjs/image";
//import Paragraph from "editorjs-paragraph-with-alignment";
import InlineImage from "editorjs-inline-image";
// import SimpleImage from "simple-image-editorjs";

//import Embed from "@editorjs/embed";
import { MyTool } from "../classes/imageFromGallery";
import Modal from "./modal";

export default {
  name: "Mytool",
  data() {
    return {
      message:
        "http://ebrahimmozaffari.ir/demo/wp-content/uploads/2019/12/gloabl-tech.jpg",
      dialog: false,
      config: {
        autofocus: true,
        tools: {
          paragraph: {
            class: Paragraph,

            config: {
              placeholder: "نوشتن را شروع کنید...",
            },
          },
          Embed: Embed,
          mine: MyTool,

          image: {
            class: ImageTool,
            // inlineToolbar: true,
            config: {
              endpoints: {
                byFile: "/", // Your backend file uploader endpoint
                //byUrl: "http://localhost:3000/response", // Your endpoint that provides uploading by Url
              },

              field: "image",
              types: "image/*",
            },
          },
          // mytool:{
          //   class:require("../classes/firstplugin"),
          // },

          // delimiter: Delimiter,
        },

        onReady: () => {
          console.log("on ready");
        },
        onChange: (args) => {
          console.log("Now I know that Editor's content changed!");
          //this.changed();
        },
        data: {
          blocks: [
            {
              type: "mine",
              data: {
                url:
                  "http://ebrahimmozaffari.ir/demo/wp-content/uploads/2019/12/gloabl-tech.jpg",
                caption: "sadasd",
              },
            },
            {
              type: "image",
              data: {
                file: {
                  url: "https://codex.so/public/app/img/external/codex2x.png",
                },
                caption: "sadadsd",
                withBorder: false,
                stretched: false,
                withBackground: false,
              },
            },
          ],
        },
      },
    };
  },
  methods: {
    onCopy: function (e) {
      alert("You just copied: " + e.text);
    },
    onError: function (e) {
      alert("Failed to copy texts");
    },
    onInitialized(editor) {
      console.log(editor);
    },
    invokeSave() {
      this.$refs.editor._data.state.editor
        .save()
        .then((data) => {
          // Do what you want with the data here
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {},
  mounted() {
    //console.log("eeee",$('#exampleModal'));
    // $('#exampleModal').on('shown.bs.modal', function (e) {
    //   console.log("baz shod")
    // });
    //http://ebrahimmozaffari.ir/demo/wp-content/uploads/2019/12/gloabl-tech.jpg
    // document.getElementsByClassName('ce-block--focused')[0].children[1].innerHTML = "http://ebrahimmozaffari.ir/demo/wp-content/uploads/2019/12/gloabl-tech.jpg";
    /*  setTimeout(() => {
      document.getElementsByClassName(
        "ce-block--focused"
      )[0].children[0].children[0].innerHTML =
        "http://ebrahimmozaffari.ir/demo/wp-content/uploads/2019/12/gloabl-tech.jpg";
      var a = document.getElementsByClassName("ce-block--focused")[0]
        .children[0].children[0];
      a.addEventListener("blur", (event) => {
        console.log("change");
        const image = document.createElement("img");
        const caption = document.createElement("input");

        image.src = "http://ebrahimmozaffari.ir/demo/wp-content/uploads/2019/12/gloabl-tech.jpg";
        caption.placeholder = "Caption...";

        document.getElementsByClassName(
        "ce-block--focused"
      )[0].children[0].children[0].innerHTML = "";
        document.getElementsByClassName(
        "ce-block--focused"
      )[0].children[0].children[0].appendChild(image);
       document.getElementsByClassName(
        "ce-block--focused"
      )[0].children[0].children[0].appendChild(caption);
      });

    
    }, 2000);
*/
  },
  components: {
    Modal,
  },
};
</script>

<style lang="scss">
/* -----
SVG Icons - svgicons.sparkk.fr
----- */

.svg-icon {
  width: 1.5em;
  height: 1.5em;
}

.svg-icon path,
.svg-icon polygon,
.svg-icon rect {
  fill: #707684;
}

.svg-icon circle {
  stroke: #4691f6;
  stroke-width: 3;
}
.figcaption {
     position: relative; 
     display: block; 
    font-size: .8em;
    line-height: 1.4;
    color: rgba(0,0,0,.6);
    letter-spacing: 0;
    font-style: normal;
    text-align: center;
    padding: 5px 0;
    font-weight: 200;
    margin-top: 5px;
}
.demo {
  padding: 10px 25px;
}
.ce-toolbar__actions {
  left: -30px;
  right: inherit !important;
}
.ce-toolbar__plus {
  right: -34px;
  left: inherit !important;
}
@media (min-width: 651px) {
  .codex-editor--narrow .ce-toolbar__plus {
    right: 5px;
    left: inherit !important;
  }
}
@media (max-width: 650px) {
  .ce-toolbar__actions {
    left: -28px;
    right: inherit !important;
  }
  .ce-settings {
    bottom: -55px;
    right: -94px;
    top: auto;
  }
  .tc-editor {
    max-width: 100%;
  }
  .ct__content {
    display: none;
  }
}
.captionImg {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: solid 1px #c7c4c4;
  margin-top: 5px;
}
@import "@/assets/scss/style";
</style>

