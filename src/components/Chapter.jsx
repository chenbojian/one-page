import { A, useSearchParams } from "@solidjs/router";
import { useAppState } from "../store";
import { loadChapter } from "../veryim";
import './Chapter.css'
import { createEffect } from "solid-js";
import { produce } from "solid-js/store";

export default function Chapter() {
    const [searchParams] = useSearchParams()
    const [ appState, setAppState ] = useAppState()

    createEffect(() => {
        if (searchParams.url && searchParams.url.startsWith('https://www.veryim.com')) {
            loadChapter(searchParams.url)
        }
    })

    const getChapter = () => appState.chapters[searchParams.url]

    const getChapterImages = () => getChapter()?.images ?? []

    const getBookUrl = () => {
        return "/book?url=" + (getChapter()?.bookUrl ?? "")
    }

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

    const markChapterFinished = () => {
        setAppState(produce((currentAppState) => {
            currentAppState.chapters[searchParams.url].finished = true
        }))
    }

    return (
        <>
            <div class="back-to-book">
                <A href={getBookUrl()}>Book</A>
            </div>
            <h2>{getChapter()?.name}</h2>
            <For each={getChapterImages()}>
                {(image) => (<img src={image} />)}
            </For>
            <div class="next-chapter">
                <A href={getNextChapterUrl()} onClick={markChapterFinished}>Next Chapter</A>
            </div>
        </>
    )

}