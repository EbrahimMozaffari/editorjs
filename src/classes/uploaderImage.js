import imageToBase64 from "image-to-base64/browser";
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
        const fileImg = document.createElement("input");
        fileImg.setAttribute("type", "file");
        fileImg.classList.add("custom-file-input");
        // fileImg.setAttribute("for", "validatedCustomFile");
        fileImg.setAttribute("id", "customFile");

        const label = document.createElement("label");
        label.classList.add("custom-file-label");
        label.setAttribute("for", "customFile");
        // label.setAttribute("id", "validatedCustomFile");
        label.innerText = "یک فایل انتخاب نمائید";

        // const input = document.createElement("input");
        // input.placeholder = "آدرس عکس خود را در این قسمت وارد نمائید...";
        // input.value = this.data && this.data.url ? this.data.url : "";
        // input.classList.add("cdx-input", "image-tool__caption","focusInput");
        // input.setAttribute("id", "myInputfocus");
        this.wrapper.appendChild(label);
        this.wrapper.appendChild(fileImg);
        // let funcCreate = this._createImage();
        // let funcHandleImage = this._handleImage();
        // this.wrapper.appendChild(input);
        this._click(fileImg);
        let wrapper = this.wrapper;
        fileImg.addEventListener("change", myfile, true);
        async function myfile() {
          let fileList = this.files;

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

          //let base64Img = await _uploadBase64(fileList[0])

          // const [file] = fileList[0];
          // if (file) {
          //   console.log("fileList[0]", URL.createObjectURL(file));
          // }
     
          let base64Img = await imageToBase64(URL.createObjectURL(fileList[0])) // Path to the image
            .then((response) => {
              //console.log("base64 is : ",response)
              return response;
            })
            .catch((error) => {
              return error;
            });

          // console.log("base64Img",  base64Img);

          //http://ebrahimmozaffari.ir/demo/about-us/
          //let formData = new FormData();
          //formData.append("Base64Image", base64Img);
          //console.log("formData", formData);
          //Param.append('file', file, file.name);
          let url = await axios
            .post(
              "https://apiadmin.tebyan.net/Image/CreateImage",
              {
                Base64Image: base64Img,
                Base64SmallImage: "",
                Keyword: "test",
                PicId: "",
                Summary: "test",
                Title: "test",
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  //"Content-Type": "multipart/form-data",
                  "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQyMCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiI0MjAiLCJzdWIiOiI0MjAiLCJqdGkiOiI5MDQ5Mzc0Ni1jOTg1LTQ5MDgtOWM4My1jZDcyZTZhZDAwYzIiLCJpYXQiOiI1LzE1LzIxIDEyOjMzOjQzIFBNIiwiSWQiOjQyMCwibmJmIjoxNjIxMDY1ODIzLCJleHAiOjE3MDc0NjU4MjMsImlzcyI6IlNlbGYiLCJhdWQiOiJBcGlDbGllbnRzIn0.32Ajhu6yslM-LsaL1-3humdOud0LMAaw-Quac-rGqps`,
                },
              }
            )
            .then((response) => {
              console.log("SUCCESS!!", response.data);
              // return response.data.file.url;
              return response;
              //funcCreate(response.data.file.url);
            })
            .catch(function(error) {
              console.log("FAILURE!!", error);
            });

          //console.log("url====>" + url);

          if (url) {
            //let res = data.split("++");
            const image = document.createElement("img");
            const caption = document.createElement("input");
            const alt = document.createElement("input");

            image.alt = "";
            image.src = url ? url : "";
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
            caption.value = "";
            alt.value = "";
            caption.placeholder = "نوشتن عنوان برای عکس (اختیاری)";
            alt.placeholder = "نوشتن alt برای عکس (اجباری)";
            wrapper.innerHTML = "";
            wrapper.appendChild(image);
            wrapper.appendChild(caption);
            wrapper.appendChild(alt);
          }
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
  async _handleFiles() {
    const fileList = await this.files;
    label.innerText = await fileList[0].name;

    // loading

    let formData = await new FormData();
    await formData.append("image", fileList[0]);
    let imgUrl = await _handleImage(formData);
    await _createImage(imgUrl);

    //await console.log("imgUrl", imgUrl);
    // await axios
    //   .post("http://ebrahimmozaffari.ir/demo/about-us/", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) =>{
    //     console.log("SUCCESS!!",response.data.file.url);
    //     funcCreate(response.data.file.url);

    //   })
    //   .catch(function() {
    //     console.log("FAILURE!!");
    //   });
    /* now you can work with the file list */
  }
  _click(element) {
    element.click();
  }
  _changedFile() {
    console.log("changed!!!");
  }
  async _handleImage(formData) {
    await axios
      .post("http://ebrahimmozaffari.ir/demo/about-us/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("SUCCESS!!", response.data.file.url);
        return response.data.file.url;
        //funcCreate(response.data.file.url);
      })
      .catch(function() {
        console.log("FAILURE!!");
      });
    /* now you can work with the file list */
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
      caption.placeholder = "نوشتن عنوان برای عکس (اختیاری)";

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
    caption.placeholder = "نوشتن عنوان برای عکس (اختیاری)";
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
