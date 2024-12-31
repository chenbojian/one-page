import { createResource, For, Index } from "solid-js"
import { createStore, produce } from 'solid-js/store'


async function loadData() {
    const watchedItems = await fetch('https://api.internal/api/jd/items/watched').then(res => res.json())
    const items = await fetch('https://api.internal/api/jd/items').then(res => res.json())
    return Object.keys(watchedItems).map(i => ({
        id: i,
        name: watchedItems[i].name,
        notifyPrice: watchedItems[i].notifyPrice,
        price: items['item_' + i]?.price,
        minPrice: items['item_' + i]?.minPrice,
        maxPrice: items['item_' + i]?.maxPrice
    }))
}



export default function () {
    const [state, setState] = createStore({
        items: [],
        item: {
            id: null,
            name: null,
            notifyPrice: null
        }
    })

    const init = () => {
        setState({
            items: [],
            item: {
                id: null,
                name: null,
                notifyPrice: null
            }
    
        })
        loadData().then(items => {
            setState('items', items)
        })
    }

    init()

    async function updateWatchedItem(item) {
        await fetch('https://api.internal/api/jd/items/watched', {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                [item.id]: {
                    name: item.name,
                    notifyPrice: parseFloat(item.notifyPrice)
                }
            })
        })
        init()
    }



    return (
        <>
            <For each={state.items}>
                {(item, index) => (
                    <div className="text-left mb-3">
                        <strong>{item.name}</strong>
                        <div className="flex justify-between">
                            <span className="flex-1">current: <strong>{item.price}</strong></span>
                            <span className="flex-1">min: {item.minPrice}</span>
                            <span className="flex-1">max: {item.maxPrice}</span>
                            <span className="flex-1 flex">notify: <input className="w-16 border" type="number" value={item.notifyPrice} onInput={(e) => setState('items', index(), 'notifyPrice', e.target.value)}/></span>
                            <button className="bg-slate-300 w-20" onClick={() => updateWatchedItem(item)}>Update</button>
                        </div>
                    </div>
                )}
            </For>
            <div className="flex items-center mt-4">
                <input className="flex-1 mr-1 p-1 border" type="text" placeholder="京东商品ID" value={state.item.id} onInput={(e) => setState('item', 'id', e.target.value)} />
                <input className="flex-1 mr-1 p-1 border" type="text" placeholder="京东商品名称" value={state.item.name} onInput={(e) => setState('item', 'name', e.target.value)} />
                <input className="flex-1 mr-1 p-1 border" type="number" placeholder="notifyPrice" value={state.item.notifyPrice} onInput={(e) => setState('item', 'notifyPrice', e.target.value)} />
                <button className="bg-slate-300 w-20" onClick={() => updateWatchedItem(state.item)}>Update</button>
            </div>

        </>
    )
}