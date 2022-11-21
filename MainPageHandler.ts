export function mainPageHandler(): Promise<Response> {
  return Promise.resolve(
    new Response(indexHTML, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    })
  );
}

const downloadUrl =
  "https://apps.rustore.ru/app/tk.pokatomnik.mrakopediareader2";
const downloadButtonSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="208" height="70" fill="none"><path fill="url(#a)" d="M0 0h208v70H0z"/><defs><pattern id="a" width="1" height="1" patternContentUnits="objectBoundingBox"><use xlink:href="#b" transform="scale(.0024 .00714)"/></pattern><image xlink:href="data:image/png;base64,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" id="b" width="416" height="140"/></defs></svg>`;

export const downloadButtonClass = Math.random().toString(36).slice(2);

export const downloadBarHTML = `
    <div style="display: flex; align-items: center; justify-content: flex-end; background: #000; position: absolute; left: 0; top: 0; right: 0; height: 96px; color: #fff; padding: 0 40px;">
        <a class="${downloadButtonClass}" style="display: inline-block" href="${downloadUrl}" target="_blank">
            ${downloadButtonSVG}
        </a>
    </div>
`.trim();

const indexHTML = `
<!doctype html>
<html lang="ru">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" value="MrakopediaReader2 - приложения для чтения страшных историй">
        <title>MrakopediaReader2</title>
        <style>
            html, body {
                margin: 0;
                padding: 0;
            }
            .background {
                background: url('https://picsum.photos/536/354?hash=${Math.random().toString()}');
                width: 100vw;
                height: 100vh;
                background-size: cover;
                background-repeat: round;
                animation: move 10s infinite, blur 10s infinite;
            }
            .content-wrapper {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            @keyframes move { 
                0% {
                    background-position-x: -100vw;
                }
                
                100% {
                    background-position-x: 100vw;
                }
            }
            @keyframes blur {
                0% {
                    filter: blur(calc(100vw / 5));
                }
                50% {
                    filter: blur(calc(100vw / 10));
                }
                100% {
                    filter: blur(calc(100vw / 5));
                }
            }
            .title {
                font-family: sans-serif;
                color: #fff;
                text-shadow: 0 0 10px #404040;
            }
            .caption {
                font-family: sans-serif;
                color: #fff;
                text-shadow: 0 0 10px #404040;
            }
            .download-wrapper {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                padding: 40px;
            }
            a.download-link {
                display: inline-block;
            }
        </style>
    </head>
    <body>
        <div class="background"></div>
        <div class="content-wrapper">
            <h1 class="title">MrakopediaReader2</h1>
            <p class="caption">Приложение для чтения страшных историй</p>
        </div>
        <div class="download-wrapper">
            <a href="${downloadUrl}" target="_blank" class="download-block">
                ${downloadButtonSVG}
            </a>
        </div>
    </body>
</html>
`.trim();
