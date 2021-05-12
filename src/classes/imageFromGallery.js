export class MyTool {
  static get toolbox() {
    return {
      title: "افزودن عکس از گالری",
      icon:
        '<svg class="svg-icon" viewBox="0 0 20 20"><path fill="none" d="M9.999,8.472c-1.314,0-2.385,1.069-2.385,2.384c0,1.317,1.07,2.385,2.385,2.385c1.316,0,2.386-1.068,2.386-2.385C12.385,9.541,11.314,8.472,9.999,8.472z M9.999,12.238c-0.76,0-1.38-0.622-1.38-1.382c0-0.761,0.62-1.38,1.38-1.38c0.761,0,1.38,0.62,1.38,1.38C11.379,11.616,10.76,12.238,9.999,12.238z"></path><path fill="none" d="M15.232,5.375H9.398C9.159,4.366,8.247,3.61,7.174,3.61c-1.073,0-1.985,0.756-2.224,1.765H4.769c-1.246,0-2.259,1.012-2.259,2.257v6.499c0,1.247,1.014,2.259,2.259,2.259h10.464c1.244,0,2.258-1.012,2.258-2.259V7.632C17.49,6.387,16.477,5.375,15.232,5.375z M16.486,14.131c0,0.69-0.564,1.256-1.254,1.256H4.769c-0.692,0-1.256-0.565-1.256-1.256V7.632c0-0.691,0.563-1.254,1.256-1.254H5.39c0.275,0,0.499-0.221,0.502-0.495c0.01-0.7,0.585-1.269,1.282-1.269s1.272,0.569,1.282,1.269c0.003,0.274,0.228,0.495,0.502,0.495h6.275c0.689,0,1.254,0.563,1.254,1.254V14.131z"></path></svg>',
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
    this.wrapper.classList.add("mytoolblock");
    if (this.readOnly) {
      this._readOnlyImage(this.data);
    } else {
      if (this.data && this.data.url) {
        //this._createImage(this.data) 
         this._uploadedImage(this.data);
      } else {
        const input = document.createElement("input");
        input.placeholder = "آدرس عکس خود را در این قسمت وارد نمائید...";
        input.value = this.data && this.data.url ? this.data.url : "";
        input.classList.add("cdx-input", "image-tool__caption","focusInput");
        input.setAttribute("id", "myInputfocus");
        this.wrapper.appendChild(input);
        this._click();
        input.addEventListener("paste", (event) => {
          this._createImage(event.clipboardData.getData("text"));
        });
      }
    }

    //  this.wrapper = document.createElement("DIV");
    // this.wrapper.setAttribute("v-model", "false");
    // this.wrapper.setAttribute("width", "500");

    // const vcard = document.createElement("v-card");
    // const vCardTitle = document.createElement("v-card-title");
    // const vCardText = document.createElement("v-card-text");

    //   const btn = document.createElement("button");

    //this.wrapper.classList.add("headline grey lighten-2");
    // vCardTitle.classList.add("headline","grey", "lighten-2");

    // vcard.appendChild(vCardTitle);
    // vcard.appendChild(vCardText);
    //  this.wrapper.innerHTML =`
    //  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //  <div class="modal-dialog">
    //    <div class="modal-content">
    //      <div class="modal-header">
    //        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
    //        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //      </div>
    //      <div class="modal-body">
    //        ...
    //      </div>
    //      <div class="modal-footer">
    //        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    //        <button type="button" class="btn btn-primary">Save changes</button>
    //      </div>
    //    </div>
    //  </div>
    // </div>`;

    // this.wrapper.appendChild(input);

    // btn.setAttribute("type", "button");
    // btn.setAttribute("data-toggle", "modal");
    // btn.setAttribute("data-target", "#exampleModal");

    // btn.classList.add("btn","btn-primary","myBtn");
    // btn.innerText = " click";
    //  btn.style.display = "none";
    // this.wrapper.appendChild(btn);
    // setTimeout(() => {
    // $(".myBtn").trigger('click');
    // }, 1000);

    //  console.log(btn);
    //vCardTitle.class = "headline grey lighten-2";
    // vCardTitle.innerText = "Privacy Policy";

    // vCardText.innerText = "texttttt Policy";

    // input.placeholder = "Paste an image URL...";
    // input.value = this.data && this.data.url ? this.data.url : "";

    // btn.addEventListener("click", (event) => {
    //     //this._createImage(event.clipboardData.getData("text"));
    //     console.log("salam");
    //   });

    return this.wrapper;
  }
  _click() {
    document.getElementById("mybtn1").click();
  }

  _createImage(data) {
    // let res = data.split("++");
    const image = document.createElement("img");
    const caption = document.createElement("input");
    const alt = document.createElement("input");

    image.alt =  "";
    image.src = data ? data : "";
    image.setAttribute("width", "100%");
    image.classList.add("image-tool__image");
    caption.classList.add("cdx-input", "image-tool__caption","col-12","col-md-6");
    alt.classList.add("cdx-input", "image-tool__caption","col-12","col-md-6");

    caption.value=  "";
    alt.value= "";
    caption.placeholder =  "نوشتن عنوان برای عکس (اختیاری)";
    alt.placeholder =  "نوشتن alt برای عکس (اختیاری)";
    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
    this.wrapper.appendChild(alt);

  }
  _uploadedImage(data) {
    
    const image = document.createElement("img");
    const caption = document.createElement("input");
    const alt = document.createElement("input");

    image.alt = data.alt ? data.alt : "";
    image.src = data.url ? data.url : "";
    image.setAttribute("width", "100%");
    image.classList.add("image-tool__image");
    caption.classList.add("cdx-input", "image-tool__caption","col-12","col-md-6");
    alt.classList.add("cdx-input", "image-tool__caption","col-12","col-md-6");

    caption.value= data.caption ? data.caption : "";
    alt.value= data.alt ? data.alt : "";
    caption.placeholder =  "نوشتن عنوان برای عکس (اختیاری)";
    alt.placeholder =  "نوشتن alt برای عکس (اختیاری)";
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

      // function setAttributes(el, attrs) {
    //   for (var key in attrs) {
    //     el.setAttribute(key, attrs[key]);
    //   }
    // }

  save(blockContent) {
    // if()
    //  const mark = blockContent.querySelector('wraper');
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelectorAll("input");
    //const alt = blockContent.querySelector("input");
    // console.log("this.wrapper",this.wrapper);

    if (image) {
      return {
        url: image.src,
        caption: caption[0].value,
        alt:  caption[1].value,
      };
    } else {
      this.wrapper.innerHTML = "";


      // this.wrapper.remove();
    }
  }

  // ... validate
}
