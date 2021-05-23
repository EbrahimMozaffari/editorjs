// import imageToBase64 from "image-to-base64/browser";
import Cropper from "cropperjs";
export class UploaderImg {
  static get toolbox() {
    return {
      title: "آپلود عکس جدید",
      icon:
        '<svg class="svg-icon" viewBox="0 0 20 20"><path fill="none" d="M16.198,10.896c-0.252,0-0.455,0.203-0.455,0.455v2.396c0,0.626-0.511,1.137-1.138,1.137H5.117c-0.627,0-1.138-0.511-1.138-1.137V7.852c0-0.626,0.511-1.137,1.138-1.137h5.315c0.252,0,0.456-0.203,0.456-0.455c0-0.251-0.204-0.455-0.456-0.455H5.117c-1.129,0-2.049,0.918-2.049,2.047v5.894c0,1.129,0.92,2.048,2.049,2.048h9.488c1.129,0,2.048-0.919,2.048-2.048v-2.396C16.653,11.099,16.45,10.896,16.198,10.896z"></path><path fill="none" d="M14.053,4.279c-0.207-0.135-0.492-0.079-0.63,0.133c-0.137,0.211-0.077,0.493,0.134,0.63l1.65,1.073c-4.115,0.62-5.705,4.891-5.774,5.082c-0.084,0.236,0.038,0.495,0.274,0.581c0.052,0.019,0.103,0.027,0.154,0.027c0.186,0,0.361-0.115,0.429-0.301c0.014-0.042,1.538-4.023,5.238-4.482l-1.172,1.799c-0.137,0.21-0.077,0.492,0.134,0.629c0.076,0.05,0.163,0.074,0.248,0.074c0.148,0,0.294-0.073,0.382-0.207l1.738-2.671c0.066-0.101,0.09-0.224,0.064-0.343c-0.025-0.118-0.096-0.221-0.197-0.287L14.053,4.279z"></path></svg>',
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
    this.cropper = null;
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
        const fileImg = document.createElement("input");
        // const inputTag = document.createElement("input-tag");

        fileImg.setAttribute("type", "file");
        fileImg.classList.add("custom-file-input");
        fileImg.setAttribute("id", "customFile");
        fileImg.setAttribute("accept", "image/*");

        fileImg.disabled = true;
        const label = document.createElement("label");
        label.classList.add("custom-file-label");
        label.setAttribute("for", "customFile");
        label.innerText = "یک فایل انتخاب نمائید";

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
            label1.innerText = " ";
          } else {
            fileImg.disabled = true;
            label1.innerText = "* لطفا موارد زیر را کامل پر نمائید";
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
            label1.innerText = " ";
          } else {
            fileImg.disabled = true;
            label1.innerText = "* لطفا موارد زیر را کامل پر نمائید";
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
            label1.innerText = " ";
          } else {
            fileImg.disabled = true;
            label1.innerText = "* لطفا موارد زیر را کامل پر نمائید";
          }
        });

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

        this.wrapper.appendChild(label);
        this.wrapper.appendChild(fileImg);
        this.wrapper.appendChild(label1);
        this.wrapper.appendChild(title);
        this.wrapper.appendChild(summary);
        this.wrapper.appendChild(inputTags);

        // let funcCreate = this._createImage();
        // let funcHandleImage = this._handleImage();
        // this.wrapper.appendChild(input);
        //this._click(fileImg);
        let wrapper = this.wrapper;
        let globalCropper = null;
        // console.log("myjson",title.value,summary.value,inputTags.value)

        fileImg.addEventListener("change", myfile, true);
        async function myfile() {
          let fileList = this.files;
          let inputsrc = document.querySelector("#cropedImgUrl");

          //let cropimage = document.querySelector("#cropimage");
          let croperwraper = document.querySelector("#croperwraper");
          croperwraper.innerHTML = "";
          let cropimage = document.createElement("img");
          cropimage.src = URL.createObjectURL(fileList[0]);
          cropimage.setAttribute("width", "100%");
          cropimage.setAttribute("id", "cropimage");
          croperwraper.appendChild(cropimage);

          // inputsrc.value = URL.createObjectURL(fileList[0]);
          // console.log("changed", inputsrc.value);

          // document.querySelector("#croperwraper").src = inputsrc.value;
          //const image = document.getElementById("cropimage");

          _click();
          // if(cropper){
          //   cropper.destroy();
          // }
          let maxWidth = window.innerWidth;
          if (maxWidth > 500) {
            maxWidth = 500;
          } else {
            maxWidth = 300;
          }
          //maxWidth = maxWidth/2.5;
          console.log("maxWidth", maxWidth);
          globalCropper = new Cropper(cropimage, {
            aspectRatio: 16 / 9,
            // responsive:true,
            background: false,
            minContainerHeight: 250,
            minContainerWidth: maxWidth,
            crop(event) {},
          });
          // document.querySelector("#cropedImgBase64").value = globalCropper;
        }

        let uploadlistener = document.querySelector("#uploadImg");
        window.removeEventListener("click", uploadlistener);
        uploadlistener.addEventListener("click", async () => {
          
          //uploadTxt.classList.add("d-none");
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

          let uploadSvg = document.getElementById("uploadSvg");
          let uploadTxt = document.getElementById("uploadTxt");
          uploadSvg.classList.remove("d-none");
          //console.log("global", globalCropper);
          let canvas = globalCropper.getCroppedCanvas({
            maxWidth: 4096,
            maxHeight: 4096,
          });
          var dataURL = canvas.toDataURL();
          dataURL = dataURL
            .replace("data:", "")
            .replace("image/png;base64,", "")
            .replace(/^.+,/, "");
          //console.log("dataURL", dataURL);
          var ax_title = title.value;
          var ax_summary = summary.value;
          var ax_keyword = inputTags.value;
          // console.log("ax_title",ax_title,ax_summary,ax_keyword)
          let url = await axios
            .post(
              "https://apiadmin.tebyan.net/Image/CreateImageFullOutput",
              {
                Base64Image: dataURL,
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
                  //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQyMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiI0MjAiLCJzdWIiOiI0MjAiLCJqdGkiOiJlZTIxM2ZjNy1hMDVjLTRkYzYtOTM1My0zNTM3YTUwMWYyMzYiLCJpYXQiOiI1LzIyLzIxIDEwOjI3OjA5IEFNIiwiSWQiOjQyMCwibmJmIjoxNjIxNjYzMDI5LCJleHAiOjE3MDgwNjMwMjksImlzcyI6IlNlbGYiLCJhdWQiOiJBcGlDbGllbnRzIn0.ux95BRPAr5IQmoi-YieLAj08Z8TDYH-Je8HkIUUWA0Q`,
                },
              }
            )
            .then((response) => {
              uploadSvg.classList.add("d-none");
              //uploadTxt.classList.remove("d-none");
              //console.log("SUCCESS!!", response.data);
              //console.log("picture!!", response.data.data.SummaryPic);
              // return response.data.file.url;
              return response.data;
              //funcCreate(response.data.file.url);
            })
            .catch(function(error) {
              console.log("FAILURE!!", error);
            });

          //console.log("url====>" + url);
          //var url111 =false;
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
        });
      }
    }

    function _click() {
      document.getElementById("cropmodalbtn").click();
    
    }
    return this.wrapper;
  }

  // _click(element) {
  //   element.click();
  // }
  _click() {
    document.getElementById("cropmodalbtn").click();
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
  _uploadedImage(data) {
    const image = document.createElement("img");
    const caption = document.createElement("input");
    const alt = document.createElement("input");

    image.alt = data.alt ? data.alt : "";
    image.src = data.url ? data.url : "";
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
    caption.value = data.caption ? data.caption : "";
    alt.value = data.alt ? data.alt : "";
    caption.placeholder = "نوشتن توضیحات برای عکس (اختیاری)";
    alt.placeholder = "نوشتن alt برای عکس (اجباری)";
    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
    this.wrapper.appendChild(alt);
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
