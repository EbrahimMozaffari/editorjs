export class videoFromGallery {
  static get toolbox() {
    return {
      title: "افزودن ویدئو از گالری",
      icon:
        '<svg class="svg-icon" viewBox="0 0 20 20"><path fill="none" d="M18.175,4.142H1.951C1.703,4.142,1.5,4.344,1.5,4.592v10.816c0,0.247,0.203,0.45,0.451,0.45h16.224c0.247,0,0.45-0.203,0.45-0.45V4.592C18.625,4.344,18.422,4.142,18.175,4.142 M4.655,14.957H2.401v-1.803h2.253V14.957zM4.655,12.254H2.401v-1.803h2.253V12.254z M4.655,9.549H2.401V7.747h2.253V9.549z M4.655,6.846H2.401V5.043h2.253V6.846zM14.569,14.957H5.556V5.043h9.013V14.957z M17.724,14.957h-2.253v-1.803h2.253V14.957z M17.724,12.254h-2.253v-1.803h2.253V12.254zM17.724,9.549h-2.253V7.747h2.253V9.549z M17.724,6.846h-2.253V5.043h2.253V6.846z"></path></svg>',
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
    this.wrapper.classList.add("videotoolblock");
    if (this.readOnly) {
      this._readOnlyImage(this.data);
    } else {
      if (this.data && this.data.url) {
        //this._createImage(this.data) 
         this._uploadedImage(this.data);
      } else {
        const input = document.createElement("input");
        input.placeholder = "آدرس ویدئو خود را در این قسمت وارد نمائید...";
        input.value = this.data && this.data.url ? this.data.url : "";
        input.classList.add("cdx-input", "image-tool__caption","videoInputfocus");
        input.setAttribute("id", "videoInputfocus");
        this.wrapper.appendChild(input);
        this._click();
        // this.focusEditor();
        input.addEventListener("paste", (event) => {
          this._createImage(event.clipboardData.getData("text"));
        });
        input.addEventListener('blur', (event) => {
          if(input.value){
            this._createImage(input.value);
          }
          
        });
        // input.addEventListener("change", myfile, true);
        // function myfile() {
        //   console.log("changed input")
        // }
      }
    }


    return this.wrapper;
  }
  focusEditor() {
    this.api.caret.focus(true);
  }
  _click() {
    document.getElementById("videoModalBtn").click();
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
