import { A, useSearchParams } from "@solidjs/router";
import { useAppState } from "../store";
import { loadBook } from "../veryim";

export default function Book() {
    const [searchParams] = useSearchParams()
    const [ appState, setAppState] = useAppState()
    if (searchParams.url && searchParams.url.startsWith('https://www.veryim.com')) {
        loadBook(searchParams.url)
    }

    const getChapters = () => {
        const chapterUrls = appState.books[searchParams.url]?.chapters ?? [];
        return chapterUrls.map(url => appState.chapters[url]).filter(chapter => chapter)
    }

    return (
        <>
            <ul>
            <For each={getChapters()}>
                {(chapter) => (<li>
                    <A href={"/chapter?url=" + chapter.url}>{chapter.name}</A>
                </li>)}
            </For>
            </ul>

        </>
    )

}