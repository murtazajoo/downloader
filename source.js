   function downloader() {
        var styles = `   /* The Modal (background) */
      .modal {
        position: fixed; /* Stay in place */
        z-index: 9999; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
      }

      /* Modal Content */
      .modal-content {
        background-color: #dddddd;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 50%;
        box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
        border-radius: 20px;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
          rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
          rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
      }

      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .close:hover,
      .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
      .links {
        height: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        max-width: 600px;
        flex-wrap: wrap;
        margin: 0 auto;
      }
      .links div {
        background-color: #00362b;
        padding: 20px;
        margin: 12px;
        border-radius: 10px;
        text-align: center;
        box-shadow: rgb(0 0 0 / 65%) 0px 5px 15px;
        transition: 500ms;
      }
      .links div:hover {
        transform: scale3d(1.05, 1.05, 1.05);
      }

      .links a {
        color: #dddcdc;
        text-transform: uppercase;
        font-family: sans-serif;
        text-decoration: none;
font-size:18px;
      }
      .size {
        text-transform: capitalize;
        font-family: monospace;
        color: #36ff97;
      }
      #title {
        text-align: center;
        font-family: Arial, Helvetica, sans-serif;
font-size:40px;
      }
      #owner {
        font-family: Arial, Helvetica, sans-serif;
      }
`;

        var styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        let main = document.getElementById("watch7-content");

        main.innerHTML += `    
      <div id="main">
      <div id="myModal" class="modal">
        <div class="modal-content" id="content">
          <span class="close">&times;</span>
          <h2 id="title">
          </h2>
  <div class="links" id="link-holder">
  
    </div>
    <small id="owner">&copy; Murtaza JOO</small>
            </div>
            </div>`;

        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
          modal.style.display = "none";
        };

        function formatBytes(bytes, decimals = 2) {
          if (!+bytes) return "0 Bytes";

          const k = 1024;
          const dm = decimals < 0 ? 0 : decimals;
          const sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB",
            "TB",
            "PB",
            "EB",
            "ZB",
            "YB",
          ];

          const i = Math.floor(Math.log(bytes) / Math.log(k));

          return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
            sizes[i]
          }`;
        }

        let linkHolder = document.getElementById("link-holder");

        let z = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "4b7c2aa273mshb1dd4b16c24ce7fp1abcddjsn59b0d6a4bf22",
            "X-RapidAPI-Host": "youtube-video-info.p.rapidapi.com",
          },
        };
        let urlParams = new URLSearchParams(window.location.search);
        let myParam = urlParams.get("v");
        fetch(
          `https://youtube-video-info.p.rapidapi.com/video_formats?video=${myParam}`,
          z
        )
          .then((response) => response.json())
          .then((response) => {
            document.getElementById("title").innerText = response.VideoTitle;
            for (let i = 0; i < response.AllFormats.length; i++) {
              linkHolder.innerHTML += `<div><a target="_blank" href="${
                response.AllFormats[i].Link
              }">${
                response.AllFormats[i].Type +
                '<span class="size"> (' +
                formatBytes(response.AllFormats[i].Size, 2)
              })<span></a></div>`;
            }
          })
          .catch((err) => console.error(err));

        setTimeout(() => {
          modal.remove();
        }, 20000);
      }
