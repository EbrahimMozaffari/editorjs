<template>
  <div id="home">
    <div class="demo" dir="rtl">
      <h1 style="text-align: center">ویرایشگر</h1>
      <editor ref="editor" :config="config" :initialized="onInitialized" />
      <!-- <button @click="invokeSave">Save</button> -->
    </div>
  </div>
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
import SimpleImage from "simple-image-editorjs";

//import Embed from "@editorjs/embed";

export default {
  name: "Home",
  data() {
    return {
      config: {
        // autofocus: true,
        tools: {
          anyTuneName: {
            class: require("editorjs-text-alignment-blocktune/dist/bundle"),
            config: {
              default: "right",
              blocks: {
                header: "center",
                list: "right",
              },
            },
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
            tunes: ["anyTuneName"],
            config: {
              placeholder: "نوشتن را شروع کنید...",
            },
          },
          header: {
            class: Header,
            inlineToolbar: true,
            tunes: ["anyTuneName"],
            config: {
              placeholder: " عنوان  ",
              levels: [1, 2, 3, 4],
              defaultLevel: 3,
              tunes: ["alignmentSetting"],
            },
          },
          // header1: {
          //   class: Header1,

          // },
          list: {
            class: List,
            inlineToolbar: true,
            tunes: ["anyTuneName"],
          },
          code: {
            class: CodeTool,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
                aparat: true,
                tebyan: true,
                // "tebyan": {
                //   regex: /https?:\/\/film\.tebyan\.net\/film\/([0-9]*)/,
                //   //regex: /https?:\/\/film.tebyan.net\/film\/([^\/\?\&]*)/,
                //   embedUrl:
                //   "https://www.aparat.com/video/video/embed/videohash/hCUGF/vt/frame",

                //   html:
                //     "<iframe height='300' scrolling='no' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'></iframe>",
                //   height: 300,
                //   width: 600,
                //   //id: (groups) => groups.join("/embed/"),
                // },
              },
            },
          },
          // image: SimpleImage,
          //                   //

          table: {
            class: Table,
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
          checklist: {
            class: Checklist,
          },
          Marker: {
            class: Marker,
            shortcut: "CMD+SHIFT+M",
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+W",
            config: {
              titlePlaceholder: "Title",
              messagePlaceholder: "Message",
            },
          },
          raw: RawTool,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+M",
          },

          //   myDelimiter: myDelimiter,
          delimiter: Delimiter,
          image: {
            class: ImageTool,
            inlineToolbar: true,
            config: {
              endpoints: {
                byFile: "http://ebrahimmozaffari.ir/demo/about-us/", // Your backend file uploader endpoint
                //byUrl: "http://localhost:3000/response", // Your endpoint that provides uploading by Url
              },
            //   actions: [
            //   {
            //     name: "new_button",
            //     icon: "<svg>...</svg>",
            //     title: "New Button",
            //     action: (name) => {
            //       alert(`${name} button clicked`);
            //       return false;
            //     },
            //   },
            // ],
              field: "image",
              types: "image/*",
            },
            
          },
          // image: {
          //   class: InlineImage,
          //   inlineToolbar: true,
          //   config: {
          //     unsplash: {
          //       appName: "your_app_name",
          //       clientId: "your_client_id",
          //     },
          //   },
          // },
        },

        i18n: {
          /**
           * @type {I18nDictionary}
           */
          messages: {
            /**
             * Other below: translation of different UI components of the editor.js core
             */
            ui: {
              blockTunes: {
                toggler: {
                  "Click to tune": "ابزار",
                  "or drag to move": "بکشید",
                },
                Delete: "حذف",
              },
              inlineToolbar: {
                converter: {
                  "Convert to": "تبدیل به",
                },
              },
              toolbar: {
                toolbox: {
                  Add: "افزودن",
                },
              },
            },

            /**
             * Section for translation Tool Names: both block and inline tools
             */
            toolNames: {
              Text: "پاراگراف",
              Heading: "عنوان",
              List: "لیست آیتم",
              Warning: "اخطار",
              Checklist: "چک لیست",
              Quote: "نقل قول",
              // "Code": "Код",
              Delimiter: "جدا کننده",
              "Raw HTML": "کد HTML",
              Table: "جدول",
              Link: "لینک",
              Marker: "مارکر",
              Bold: "بولد",
              Italic: "ایتالیک",
              InlineCode: "InlineCode",
              Image: "عکس",
              Embed: "افزودن ویدئو",
            },

            /**
             * Section for passing translations to the external tools classes
             */
            tools: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
               * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
               */
              warning: {
                // <-- 'Warning' tool will accept this dictionary section
                Title: "عنوان",
                Message: "متن",
              },

              /**
               * Link is the internal Inline Tool
               */
              link: {
                "Add a link": "افزودن لینک",
              },
              /**
               * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
               */
              stub: {
                "The block can not be displayed correctly.":
                  "The block can not be displayed correctly.",
              },
            },

            /**
             * Section allows to translate Block Tunes
             */
            blockTunes: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
               * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
               *
               * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
               */
              delete: {
                Delete: "حذف",
              },
              moveUp: {
                "Move up": "بالا",
              },
              moveDown: {
                "Move down": "انتقال به پایین",
              },
            },
          },
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
              type: "header",
              data: {
                text: "",
                level: 2,
              },
            },
          ],
        },
        // data: {
        //   time: 1591362820044,
        //   blocks: [
        //     {
        //       type: "header",
        //       data: {
        //         text: "Editor.js",
        //         level: 2,
        //       },
        //     },
        //     {
        //       type: "paragraph",
        //       data: {
        //         text:
        //           "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
        //       },
        //     },
        //     {
        //       type: "header",
        //       data: {
        //         text: "Key features",
        //         level: 3,
        //       },
        //     },
        //     {
        //       type: "list",
        //       data: {
        //         style: "unordered",
        //         items: [
        //           "It is a block-styled editor",
        //           "It returns clean data output in JSON",
        //           "Designed to be extendable and pluggable with a simple API",
        //         ],
        //       },
        //     },
        //     {
        //       type: "header",
        //       data: {
        //         text: "What does it mean «block-styled editor»",
        //         level: 3,
        //       },
        //     },
        //     {
        //       type: "paragraph",
        //       data: {
        //         text:
        //           'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
        //       },
        //     },
        //     {
        //       type: "paragraph",
        //       data: {
        //         text:
        //           'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
        //       },
        //     },
        //     {
        //       type: "header",
        //       data: {
        //         text: "What does it mean clean data output",
        //         level: 3,
        //       },
        //     },
        //     {
        //       type: "paragraph",
        //       data: {
        //         text:
        //           "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
        //       },
        //     },
        //     {
        //       type: "paragraph",
        //       data: {
        //         text:
        //           'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
        //       },
        //     },
        //     {
        //       type: "paragraph",
        //       data: {
        //         text:
        //           "Clean data is useful to sanitize, validate and process on the backend.",
        //       },
        //     },
        //     {
        //       type: "delimiter",
        //       data: {},
        //     },
        //     {
        //       type: "paragraph",
        //       data: {
        //         text:
        //           "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
        //       },
        //     },
        //     {
        //       type: "image",
        //       data: {
        //         file: {
        //           url: "https://codex.so/public/app/img/external/codex2x.png",
        //         },
        //         caption: "",
        //         withBorder: false,
        //         stretched: false,
        //         withBackground: false,
        //       },
        //     },
        //   ],
        //   version: "2.18.0",
        // },
      },
    };
  },
  methods: {
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
    // changed(editor){
    //     editor
    //         .save()
    //         .then((outputData) => {
    //           console.log("Article data: ", outputData);
    //         })
    //         .catch((error) => {
    //           console.log("Saving failed: ", error);
    //         });
    // }
  },
};
</script>

<style lang="scss">
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
@import "@/assets/scss/style";
</style>

