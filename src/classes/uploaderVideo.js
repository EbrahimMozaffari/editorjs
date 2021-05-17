import imageToBase64 from "image-to-base64/browser";
export class UploaderVideo {
  static get toolbox() {
    return {
      title: "آپلود ویدئو جدید",
      icon:
        '<svg class="svg-icon" viewBox="0 0 20 20"><path d="M6.634,13.591H2.146c-0.247,0-0.449,0.201-0.449,0.448v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449v-2.692C7.083,13.792,6.881,13.591,6.634,13.591 M6.185,16.283h-3.59v-1.795h3.59V16.283zM6.634,8.205H2.146c-0.247,0-0.449,0.202-0.449,0.449v2.692c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V8.653C7.083,8.407,6.881,8.205,6.634,8.205 M6.185,10.897h-3.59V9.103h3.59V10.897z M6.634,2.819H2.146c-0.247,0-0.449,0.202-0.449,0.449V5.96c0,0.247,0.202,0.449,0.449,0.449h4.488c0.247,0,0.449-0.202,0.449-0.449V3.268C7.083,3.021,6.881,2.819,6.634,2.819 M6.185,5.512h-3.59V3.717h3.59V5.512z M15.933,5.683c-0.175-0.168-0.361-0.33-0.555-0.479l1.677-1.613c0.297-0.281,0.088-0.772-0.31-0.772H9.336c-0.249,0-0.448,0.202-0.448,0.449v7.107c0,0.395,0.471,0.598,0.758,0.326l1.797-1.728c0.054,0.045,0.107,0.094,0.161,0.146c0.802,0.767,1.243,1.786,1.243,2.867c0,1.071-0.435,2.078-1.227,2.837c-0.7,0.671-1.354,1.086-2.345,1.169c-0.482,0.041-0.577,0.733-0.092,0.875c0.687,0.209,1.12,0.314,1.839,0.314c0.932,0,1.838-0.173,2.673-0.505c0.835-0.33,1.603-0.819,2.262-1.449c1.322-1.266,2.346-2.953,2.346-4.751C18.303,8.665,17.272,6.964,15.933,5.683 M15.336,14.578c-1.124,1.077-2.619,1.681-4.217,1.705c0.408-0.221,0.788-0.491,1.122-0.812c0.97-0.929,1.504-2.168,1.504-3.485c0-1.328-0.539-2.578-1.521-3.516c-0.178-0.17-0.357-0.321-0.548-0.456c-0.125-0.089-0.379-0.146-0.569,0.041L9.769,9.327v-5.61h5.861l-1.264,1.216c-0.099,0.094-0.148,0.229-0.137,0.366c0.014,0.134,0.088,0.258,0.202,0.332c0.313,0.204,0.61,0.44,0.882,0.7c1.158,1.111,2.092,2.581,2.092,4.145C17.405,12.026,16.48,13.482,15.336,14.578"></path></svg>',
    };
  }
  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data, api, config, readOnly, block }) {
    this.data = data;
    this.api = api;
    this.readOnly = readOnly;
    this.wrapper = undefined;
    this.posterFile=null;
  }

  render() {
    console.log("readOnly", this.readOnly);
    this.wrapper = document.createElement("DIV");
    this.wrapper.classList.add("uploaderwrap", "custom-file", "my-3");

    if (this.readOnly) {
      this._readOnlyImage(this.data);
    } else {
      if (this.data && this.data.url) {
        //this._createImage(this.data)
        this._uploadedImage(this.data);
      } else {
        //     <input-tag  v-model="tags"></input-tag>
        // <input type="text" v-model="tags"></input>
        //         <div class="custom-file">
        //   <input type="file" class="custom-file-input" id="customFileLang" lang="in">
        //   <label class="custom-file-label" for="customFileLang">pilih file </label>
        // </div>
        const div1 = document.createElement("div");
        div1.classList.add("custom-file");

        const Poster = document.createElement("input");
        Poster.setAttribute("type", "file");
        Poster.classList.add("custom-file-input");
        Poster.setAttribute("id", "poster");
        Poster.setAttribute("accept", "image/*");

        const posterlabel = document.createElement("label");
        posterlabel.classList.add("custom-file-label");
        posterlabel.setAttribute("for", "poster");
        posterlabel.innerText = "پوستر انتخاب نمائید";

        const div2 = document.createElement("div");
        div2.classList.add("custom-file");

        const fileVideo = document.createElement("input");
        fileVideo.setAttribute("type", "file");
        fileVideo.classList.add("custom-file-input");
        fileVideo.setAttribute("id", "fileVideo");
        fileVideo.setAttribute("accept", "video/*");
        fileVideo.disabled = true;

        const label = document.createElement("label");
        label.classList.add("custom-file-label");
        label.setAttribute("for", "fileVideo");
        label.innerText = " فایل ویدئو را انتخاب نمائید";

        /*
        const label1 = document.createElement("label");
        label1.classList.add(
          "text-right",
          "text-danger",
          "col-12",
          "col-md-12"
        );

        label1.innerText = "* لطفا موارد زیر را کامل پر نمائید";

        const inputTags = document.createElement("input");
        inputTags.classList.add(
          "cdx-input",
          "image-tool__caption",
          "col-12",
          "col-md-4"
        );
        inputTags.placeholder = "تگ های خود را با , از هم جدا نمائید";
        inputTags.addEventListener("keyup", () => {
          if (inputTags.value) {
            inputTags.classList.remove("has-error");
          } else {
            inputTags.classList.add("has-error");
          }
          if (title.value && summary.value && inputTags.value) {
            fileImg.disabled = false;
          } else {
            fileImg.disabled = true;
          }
        });
        const summary = document.createElement("input");
        summary.classList.add(
          "cdx-input",
          "image-tool__caption",
          "col-12",
          "col-md-4"
        );
        summary.placeholder = "توضیحات عکس را وارد نمائید";
        summary.addEventListener("keyup", () => {
          if (summary.value) {
            summary.classList.remove("has-error");
          } else {
            summary.classList.add("has-error");
          }
          if (title.value && summary.value && inputTags.value) {
            fileImg.disabled = false;
          } else {
            fileImg.disabled = true;
          }
        });
        const title = document.createElement("input");
        title.classList.add(
          "cdx-input",
          "image-tool__caption",
          "col-12",
          "col-md-4"
        );
        title.placeholder = "عنوان عکس";
        title.addEventListener("keyup", () => {
          if (title.value) {
            title.classList.remove("has-error");
          } else {
            title.classList.add("has-error");
          }
          if (title.value && summary.value && inputTags.value) {
            fileImg.disabled = false;
          } else {
            fileImg.disabled = true;
          }
        });
        */

        // inputTag.setAttribute("v-model", "tags");
        // inputHide.setAttribute("v-model", "tags");
        // inputHide.setAttribute("type", "text");

        // fileImg.setAttribute("for", "validatedCustomFile");

        // caption.classList.add(
        //   "cdx-input",
        //   "image-tool__caption",
        //   "col-12",
        //   "col-md-6"
        // );

        // const input = document.createElement("input");
        // input.placeholder = "آدرس عکس خود را در این قسمت وارد نمائید...";
        // input.value = this.data && this.data.url ? this.data.url : "";
        // input.classList.add("cdx-input", "image-tool__caption","focusInput");
        // input.setAttribute("id", "myInputfocus");

        div1.appendChild(posterlabel);
        div1.appendChild(Poster);
        div2.appendChild(label);
        div2.appendChild(fileVideo);

        this.wrapper.appendChild(div1);
        this.wrapper.appendChild(div2);
        let posterFile = this.posterFile;
        Poster.addEventListener("change", posterFunction, true);
        async function posterFunction() {
          posterFile = this.files;

          posterlabel.innerText = posterFile[0].name;
          if (posterFile) {
            fileVideo.disabled = false;
          }
        }

        // this.wrapper.appendChild(label1);
        // this.wrapper.appendChild(title);
        // this.wrapper.appendChild(summary);
        // this.wrapper.appendChild(inputTags);

        // let funcCreate = this._createImage();
        // let funcHandleImage = this._handleImage();
        // this.wrapper.appendChild(input);
        //this._click(fileImg);
        let wrapper = this.wrapper;
        //console.log("myjson", title.value, summary.value, inputTags.value);
        fileVideo.addEventListener("change", myfile, true);
        async function myfile() {
          console.log("fileName", posterFile[0].name);
          let videoFile = this.files;

          //loading start
          wrapper.innerHTML = "";
          const div = document.createElement("DIV");
          div.classList.add(
            "loading",
            "d-flex",
            "align-items-center",
            "justify-content-center"
          );
          const imgloading = document.createElement("img");
          imgloading.src = "/img/loading.gif";
          div.appendChild(imgloading);
          wrapper.appendChild(div);

          let base64Img = await imageToBase64(URL.createObjectURL(posterFile[0])) // Path to the image
            .then((response) => {
              return response;
            })
            .catch((error) => {
              return error;
            });
            
          /*
         
          var ax_title = title.value;
          var ax_summary = summary.value;
          var ax_keyword = inputTags.value;
          
         

          //let base64Img = await _uploadBase64(fileList[0])

          // const [file] = fileList[0];
          // if (file) {
          //   console.log("fileList[0]", URL.createObjectURL(file));
          // }

          

          let url = await axios
            .post(
              "https://apiadmin.tebyan.net/Image/CreateImageFullOutput",
              {
                Base64Image: base64Img,
                Base64SmallImage: "",
                Keyword: ax_keyword,
                PicId: "",
                Summary: ax_summary,
                Title: ax_title,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  //"Content-Type": "multipart/form-data",
                  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQyMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiI0MjAiLCJzdWIiOiI0MjAiLCJqdGkiOiI5MDQ5Mzc0Ni1jOTg1LTQ5MDgtOWM4My1jZDcyZTZhZDAwYzIiLCJpYXQiOiI1LzE1LzIxIDEyOjMzOjQzIFBNIiwiSWQiOjQyMCwibmJmIjoxNjIxMDY1ODIzLCJleHAiOjE3MDc0NjU4MjMsImlzcyI6IlNlbGYiLCJhdWQiOiJBcGlDbGllbnRzIn0.32Ajhu6yslM-LsaL1-3humdOud0LMAaw-Quac-rGqps`,
                },
              }
            )
            .then((response) => {
              //console.log("SUCCESS!!", response.data);

              return response.data;

            })
            .catch(function(error) {
              console.log("FAILURE!!", error);
            });

      

          if (url) {
            //let res = data.split("++");
            //console.log("url---->",url.data);
            //var  aaa = JSON.stringify(url.data);
            //console.log("aaa---->",aaa.UrlPicID);
            let jsParsed = JSON.parse(url.data);

            //console.log("jsss---->",jsParsed.UrlPicID);
            const image = document.createElement("img");
            const caption = document.createElement("input");
            const alt = document.createElement("input");

            image.alt = "";
            image.src = jsParsed.UrlPicID
              ? `https://img.tebyan.net/${jsParsed.UrlPicID}`
              : "";
            image.setAttribute("width", "100%");
            image.classList.add("image-tool__image");
            caption.classList.add(
              "cdx-input",
              "image-tool__caption",
              "col-12",
              "col-md-6"
            );
            alt.classList.add(
              "cdx-input",
              "image-tool__caption",
              "col-12",
              "col-md-6",
              "validForm"
            );
            alt.setAttribute("required", "true");
            alt.addEventListener("keyup", () => {
              if (alt.value) {
                alt.classList.remove("has-error");
              } else {
                alt.classList.add("has-error");
              }
            });
            caption.value = jsParsed.SummaryPic ? jsParsed.SummaryPic : "";
            alt.value = "";
            caption.placeholder = "نوشتن توضیحات برای عکس (اختیاری)";
            alt.placeholder = "نوشتن alt برای عکس (اجباری)";
            wrapper.innerHTML = "";
            wrapper.appendChild(image);
            wrapper.appendChild(caption);
            wrapper.appendChild(alt);
          }
          */
        }

        // fileImg.addEventListener("selected", (event) => {
        //   console.log("salam change shod",event);
        //   this._changedFile();
        //   // this._createImage(event.clipboardData.getData("text"));
        // });
      }
    }

    // btn.addEventListener("click", (event) => {
    //     //this._createImage(event.clipboardData.getData("text"));
    //     console.log("salam");
    //   });

    return this.wrapper;
  }

  _click(element) {
    element.click();
  }

 

  _createImage(data) {
    if (data) {
      //let res = data.split("++");
      const image = document.createElement("img");
      const caption = document.createElement("input");
      const alt = document.createElement("input");

      image.alt = "";
      image.src = data ? data : "";
      image.setAttribute("width", "100%");
      image.classList.add("image-tool__image");
      alt.classList.add(
        "cdx-input",
        "image-tool__caption",
        "col-12",
        "col-md-6",
        "validForm"
      );
      alt.setAttribute("required", "true");
      alt.addEventListener("keyup", () => {
        if (alt.value) {
          alt.classList.remove("has-error");
        } else {
          alt.classList.add("has-error");
        }
      });
      alt.placeholder = "نوشتن alt برای عکس (اجباری)";
      alt.value = "";
      caption.classList.add(
        "cdx-input",
        "image-tool__caption",
        "col-12",
        "col-md-6"
      );
      caption.value = "";
      caption.placeholder = "نوشتن توضیحات برای عکس (اختیاری)";

      this.wrapper.innerHTML = "";
      this.wrapper.appendChild(image);
      this.wrapper.appendChild(caption);
      this.wrapper.appendChild(alt);
    }
  }
  
  _readOnlyImage(data) {
    const image = document.createElement("img");
    const caption = document.createElement("p");
    image.src = data.url;
    image.setAttribute("alt", data.alt);
    image.setAttribute("title", data.alt);
    image.setAttribute("width", "100%");
    image.classList.add("image-tool__image");
    caption.classList.add("figcaption");
    // caption.classList.add("figcaption");
    caption.innerText = data.caption;
    // caption.placeholder = "توضیحات...";
    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
  }

  _imgToBase64(img) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;

    // I think this won't work inside the function from the console
    img.crossOrigin = "anonymous";

    ctx.drawImage(img, 0, 0);

    return canvas.toDataURL();
  }
  // function setAttributes(el, attrs) {
  //   for (var key in attrs) {
  //     el.setAttribute(key, attrs[key]);
  //   }
  // }

  save(blockContent) {
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelectorAll("input");

    if (image) {
      return {
        url: image.src,
        caption: caption[0].value,
        alt: caption[1].value,
      };
    } else {
      this.wrapper.innerHTML = "";

      // this.wrapper.remove();
    }
  }

  // ... validate
}
