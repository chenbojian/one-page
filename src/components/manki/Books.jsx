import { A } from "@solidjs/router"
import { loadBooks } from "./veryim"
import { createResource, For } from "solid-js"


export default function Books() {
    const [data, { mutate, refetch }] = createResource(loadBooks)
    return (
        <>
            <div>
                <For each={data()} fallback={<div>Loading...</div>}>
                    {(book) => (
                        <div>
                            <A href={"/book?url=" + book.url}>{book.name}</A>
                        </div>
                    )}
                </For>
            </div>
        </>
    )
}