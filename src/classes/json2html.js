export function json2html(json){
    var html = "";
    json.forEach(function (block) {
              switch (block.type) {
                case "header":
                  html += `<h${block.data.level} class="text-${block.tunes.anyTuneName.alignment}">${block.data.text}</h${block.data.level}>`;
                  break;
                case "paragraph":
                  html += `<p class="text-${block.tunes.anyTuneName.alignment}">${block.data.text}</p>`;
                  break;
                case "delimiter":
                  html += `<p class="text-center">***</p>`;
                  break;
                case "image":
                  html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
                  break;
                case "list":
                  html += "<ul>";
                  block.data.items.forEach(function (li) {
                    html += `<li>${li}</li>`;
                  });
                  html += "</ul>";
                  break;
                case "imgGallery":
                  html += '<div class="uploaderwrap custom-file my-3">';
                  html += `<img class="img-fluid" src="${block.data.url}" alt="${block.data.alt}" title="${block.data.caption}" /><p class="figcaption">${block.data.caption}</p>`;
                  html += "</div>";
                  break;
                case "uploaderImg":
                  html += '<div class="uploaderwrap custom-file my-3">';
                  html += `<img class="img-fluid" src="${block.data.url}" alt="${block.data.alt}" title="${block.data.caption}" /><p class="figcaption">${block.data.caption}</p>`;
                  html += "</div>";
                  break;
                case "videoFromGallery":
                  html += '<div class="videotoolblock"><vue-plyr ref="plyr">';
                  html += `<video id="video" controls="" playsinline="" data-poster="${block.data.poster}" width="100%" ><source size="720" src="${block.data.url}"></video>`;
                  html += "</vue-plyr></div>";
                  break;
                default:
                  console.log("Unknown block type", block.type);
                  console.log(block);
                  break;
              }
            });
    return html;
}