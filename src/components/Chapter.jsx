import { A, useSearchParams } from "@solidjs/router";
import { useAppState } from "../store";
import { loadChapter } from "../veryim";

export default function Chapter() {
    const [searchParams] = useSearchParams()
    const [ appState] = useAppState()
    if (searchParams.url && searchParams.url.startsWith('https://www.veryim.com')) {
        loadChapter(searchParams.url)
    }

    const getChapter = () => appState.chapters[searchParams.url]

    const getChapterImages = () => getChapter()?.images ?? []

    const getNextChapterUrl = () => {
        if (!getChapter()) {
            return ""
        }

        const chapterUrls = appState.books[getChapter().bookUrl].chapters

        const currentIdx = chapterUrls.indexOf(searchParams.url)

        if (currentIdx === -1 || currentIdx === chapterUrls.length - 1) {
            return ""
        }

        const nextChapterUrl = chapterUrls[currentIdx + 1]

        return "/chapter?url=" + (appState.chapters[nextChapterUrl]?.url ?? "")
    }

    return (
        <>
            <h2>{getChapter()?.name}</h2>
            <For each={getChapterImages()}>
                {(image) => (<img src={image} />)}
            </For>
            <A href={getNextChapterUrl()}>Next Chapter</A>
        </>
    )

}