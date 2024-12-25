import { produce } from "solid-js/store";
import { useAppState } from "./store";

const [appState, setAppState] = useAppState();

function proxy(url) {
  return "https://corsproxy.io/?url=" + encodeURIComponent(url);
}

export async function loadBooks() {
  const res = await fetch(proxy("https://www.veryim.com/rank/"));
  const text = await res.text();
  const html = document.createElement("html");
  html.innerHTML = text;
  const links = html.querySelectorAll(
    "div.container div.panel-body div.media-body h4.book-title a"
  );

  return [...links].map((l) => ({
    name: l.textContent,
    url: "https://www.veryim.com" + new URL(l.href).pathname,
  }));
}

export async function loadBook(bookUrl) {
  if (bookUrl in appState.books) {
    return;
  }
  const res = await fetch(proxy(bookUrl), {
    headers: {
      Referer: "https://www.veryim.com",
    },
  });
  const text = await res.text();
  const parser = new DOMParser();
  const html = parser.parseFromString(text, "text/html");

  const title = html.querySelector("div.info2 h1").innerHTML;
  const chapters = [
    ...html.querySelectorAll("div.rowzhangjie div.panel-body ul li a"),
  ].map((a) => {
    return {
      name: a.textContent,
      url: "https://www.veryim.com" + new URL(a.href).pathname,
    };
  });
  chapters.reverse();
  setAppState(
    "books",
    produce((books) => {
      books[bookUrl] = {
        name: title,
        url: bookUrl,
        chapters: chapters.map((chapter) => chapter.url),
      };
    })
  );
  setAppState(
    "chapters",
    produce((currentChapters) => {
      for (const chapter of chapters) {
        if (chapter.url in currentChapters) {
          continue;
        }
        currentChapters[chapter.url] = {
          bookUrl: bookUrl,
          name: chapter.name,
          url: chapter.url,
          images: [],
        };
      }
    })
  );
}

export async function loadChapter(chapterUrl) {
  const bookUrl = getParentPath(chapterUrl);
  if (!(bookUrl in appState.books) || !(chapterUrl in appState.chapters)) {
    await loadBook(bookUrl);
  }

  const res = await fetch(proxy(chapterUrl), {
    headers: {
      Referer: "https://www.veryim.com",
    },
  });
  const text = await res.text();
  const html = document.createElement("html");
  html.innerHTML = text;

  const obj = {};
  eval(html.querySelectorAll("script")[3].innerHTML.replaceAll("var ", "obj."));
  let imgUrls = atob(obj.qTcms_S_m_murl_e).split("$qingtiandy$");

  imgUrls = imgUrls.map((url) => {
    if (url.startsWith("https://cdn1.npdn.top")) {
      return url.replace("https://cdn1.npdn.top", "https://cdn2.npdn.top");
    } else {
      return url;
    }
  });
  setAppState(
    "chapters",
    produce((chapters) => {
      chapters[chapterUrl].images = imgUrls;
    })
  );
}

function getParentPath(url) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const parentPath = pathname.substring(0, pathname.lastIndexOf("/"));
  return `${urlObj.origin}${parentPath}/`;
}
