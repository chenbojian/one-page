import { createResource, For, Index } from "solid-js"
import { createStore, produce } from 'solid-js/store'


async function loadData() {
    const watchedItems = await fetch('https://api.internal/api/jd/items/watched').then(res => res.json())
    const items = await fetch('https://api.internal/api/jd/items').then(res => res.json())
    // const watchedItems = JSON.parse('{"100101971398":{"name":"花王（KAO）免刷洗马桶清洁剂洁厕灵500ml*2浴室清洗剂洁厕剂马桶洁厕液除臭","notifyPrice":35},"100027925704":{"name":"三元极致有机纯牛奶整箱200ml*21盒 有机认证 礼盒装","notifyPrice":49},"100085823466":{"name":"花王（KAO）免刷洁厕灵500ml 免刷洗马桶清洁剂洁厕液厕所清洗去污渍除菌净味","notifyPrice":17},"8589412":{"name":"花王（KAO）进口洁厕灵 洁厕剂 厕所马桶清洁剂 洁厕灵除菌液 500ml","notifyPrice":17},"100080127287":{"name":"花王（KAO）免刷洗马桶清洁剂洁厕灵500ml浴室清洗剂洁厕剂马桶洁厕液除臭","notifyPrice":17},"100010592287":{"name":"伊利舒化奶 无乳糖牛奶整箱 全脂型220ml*24盒 礼盒装 低GI认证","notifyPrice":53},"100049553795":{"name":"花王（KAO）洁厕液洁厕灵马桶清洁剂洁厕宝厕所清洁剂泡泡 去1000ml组合装","notifyPrice":34},"100025494126":{"name":"Bio Island佰澳朗德 比奥岛 成人孕妇中老年牛乳钙软胶囊150粒/瓶*2澳大利亚","notifyPrice":180},"2919743":{"name":"Bio Island佰澳朗德比奥岛 成人孕妇中老年牛乳钙软胶囊 150粒/瓶 澳大利亚","notifyPrice":99},"100007494167":{"name":"潮庭优选潮汕牛肉丸150g 潮州特产火锅食材 生鲜关东煮烧烤空气炸锅","notifyPrice":7}}')
    // const items = JSON.parse('{"item_2919743":{"min_price":"99.00","name":"Bio Island佰澳朗德比奥岛 成人孕妇中老年牛乳钙软胶囊 150粒/瓶 澳大利亚","max_price":"106.92","price":"106.92","price_history":{"2025-01-05T14:33:18+00:00":"99.00","2025-01-05T14:39:09+00:00":"99.00","2025-01-11T10:51:47+00:00":"106.92","2025-01-12T10:51:46+00:00":"106.92"}},"item_100007494167":{"name":"潮庭优选潮汕牛肉丸150g 潮州特产火锅食材 生鲜关东煮烧烤空气炸锅","min_price":"23.61","max_price":"28.61","price":"28.61","price_history":{"2025-01-07T02:52:18+00:00":"25.61","2025-01-07T10:52:13+00:00":"25.61","2025-01-08T02:52:23+00:00":"25.61","2025-01-08T10:52:16+00:00":"26.61","2025-01-09T02:52:16+00:00":"23.61","2025-01-09T10:52:13+00:00":"23.61","2025-01-10T02:52:18+00:00":"23.61","2025-01-10T18:55:05+00:00":"26.61","2025-01-11T02:52:46+00:00":"26.61","2025-01-11T10:52:47+00:00":"26.61","2025-01-12T03:02:28+00:00":"28.61","2025-01-12T10:52:42+00:00":"28.61"}},"item_8589412":{"max_price":"20.81","name":"花王（KAO）进口洁厕灵 洁厕剂 厕所马桶清洁剂 洁厕灵除菌液 500ml","min_price":"18.81","price":"20.81","price_history":{"2024-12-31T14:18:34+00:00":"20.81","2024-12-31T14:19:04+00:00":"20.81","2025-01-01T02:51:45+00:00":"20.81","2025-01-01T18:56:39+00:00":"20.81","2025-01-02T02:51:46+00:00":"20.81","2025-01-04T02:56:10+00:00":"20.81","2025-01-04T18:56:35+00:00":"20.81","2025-01-05T03:12:53+00:00":"18.81","2025-01-05T10:51:45+00:00":"18.81","2025-01-05T14:33:20+00:00":"18.81","2025-01-05T14:39:12+00:00":"18.81","2025-01-06T02:54:59+00:00":"20.81","2025-01-06T10:51:49+00:00":"20.81","2025-01-07T02:51:54+00:00":"20.81","2025-01-07T10:51:49+00:00":"20.81","2025-01-08T02:51:53+00:00":"20.81","2025-01-08T10:51:50+00:00":"18.81","2025-01-09T02:51:52+00:00":"18.81","2025-01-09T10:51:49+00:00":"18.81","2025-01-10T02:51:53+00:00":"18.81","2025-01-10T18:54:21+00:00":"18.81","2025-01-12T03:01:43+00:00":"20.81","2025-01-13T02:51:49+00:00":"20.81"}},"item_100101971398":{"name":"花王（KAO）免刷洗马桶清洁剂洁厕灵500ml*2浴室清洗剂洁厕剂马桶洁厕液除臭","max_price":"41.58","min_price":"37.52","price":"37.52","price_history":{"2024-12-31T15:46:48+00:00":"39.60","2025-01-01T02:51:50+00:00":"41.58","2025-01-01T18:56:44+00:00":"41.58","2025-01-02T02:51:48+00:00":"41.58","2025-01-02T18:51:50+00:00":"41.58","2025-01-03T02:56:23+00:00":"41.58","2025-01-03T18:51:51+00:00":"41.58","2025-01-04T02:56:15+00:00":"41.58","2025-01-04T15:17:31+00:00":"41.58","2025-01-04T18:56:40+00:00":"41.58","2025-01-05T03:12:56+00:00":"41.58","2025-01-05T10:51:49+00:00":"41.58","2025-01-05T14:33:23+00:00":"41.58","2025-01-05T14:39:15+00:00":"41.58","2025-01-06T02:55:01+00:00":"41.58","2025-01-06T10:51:51+00:00":"41.58","2025-01-07T02:51:56+00:00":"41.58","2025-01-07T10:51:51+00:00":"37.52","2025-01-08T10:51:53+00:00":"37.52","2025-01-09T02:51:54+00:00":"37.52","2025-01-09T10:51:51+00:00":"37.52","2025-01-10T02:51:55+00:00":"37.52","2025-01-10T18:54:27+00:00":"37.52","2025-01-11T02:52:04+00:00":"37.52","2025-01-11T10:51:59+00:00":"37.52","2025-01-12T03:01:49+00:00":"37.52","2025-01-12T10:52:00+00:00":"37.52","2025-01-13T02:51:52+00:00":"37.52"}},"item_100027925704":{"min_price":"47.41","name":"三元极致有机纯牛奶整箱200ml*21盒 有机认证 礼盒装","max_price":"52.16","price":"47.41","price_history":{"2024-12-31T15:46:52+00:00":"47.41","2025-01-01T02:51:54+00:00":"47.41","2025-01-01T18:56:48+00:00":"47.41","2025-01-02T02:51:50+00:00":"47.41","2025-01-02T18:51:55+00:00":"47.41","2025-01-03T02:56:27+00:00":"47.41","2025-01-03T18:51:58+00:00":"47.41","2025-01-04T02:56:21+00:00":"47.41","2025-01-04T15:17:35+00:00":"47.41","2025-01-04T18:56:44+00:00":"47.41","2025-01-05T03:12:58+00:00":"47.41","2025-01-05T10:51:53+00:00":"47.41","2025-01-05T14:33:25+00:00":"47.41","2025-01-05T14:39:17+00:00":"47.41","2025-01-06T02:55:03+00:00":"52.16","2025-01-06T10:51:53+00:00":"52.16","2025-01-07T02:51:58+00:00":"47.41","2025-01-07T10:51:54+00:00":"47.41","2025-01-08T02:51:58+00:00":"47.41","2025-01-08T10:51:55+00:00":"47.41","2025-01-09T02:51:56+00:00":"47.41","2025-01-09T10:51:54+00:00":"47.41","2025-01-10T02:51:58+00:00":"47.41","2025-01-10T18:54:32+00:00":"47.41","2025-01-11T02:52:10+00:00":"47.41","2025-01-11T10:52:06+00:00":"47.41","2025-01-12T03:01:55+00:00":"47.41","2025-01-12T10:52:07+00:00":"47.41","2025-01-13T02:51:54+00:00":"47.41"}},"item_100085823466":{"max_price":"21.68","name":"花王（KAO）免刷洁厕灵500ml 免刷洗马桶清洁剂洁厕液厕所清洗去污渍除菌净味","min_price":"19.68","price":"21.68","price_history":{"2024-12-31T15:46:55+00:00":"21.68","2025-01-01T02:51:58+00:00":"21.68","2025-01-01T18:56:52+00:00":"21.68","2025-01-02T02:51:52+00:00":"21.68","2025-01-02T18:51:59+00:00":"21.68","2025-01-03T02:56:31+00:00":"21.68","2025-01-03T18:52:05+00:00":"21.68","2025-01-04T02:56:26+00:00":"21.68","2025-01-04T15:17:38+00:00":"21.68","2025-01-04T18:56:50+00:00":"21.68","2025-01-05T03:13:00+00:00":"19.68","2025-01-05T10:51:58+00:00":"19.68","2025-01-05T14:33:27+00:00":"19.68","2025-01-05T14:39:20+00:00":"19.68","2025-01-06T02:55:05+00:00":"21.68","2025-01-06T10:51:56+00:00":"21.68","2025-01-07T02:52:02+00:00":"21.68","2025-01-07T10:51:56+00:00":"21.68","2025-01-08T02:52:00+00:00":"21.68","2025-01-08T10:51:58+00:00":"19.68","2025-01-09T02:51:59+00:00":"19.68","2025-01-09T10:51:56+00:00":"19.68","2025-01-10T02:52:01+00:00":"19.68","2025-01-10T18:54:37+00:00":"19.68","2025-01-11T02:52:17+00:00":"19.68","2025-01-11T10:52:12+00:00":"19.68","2025-01-12T03:02:01+00:00":"21.68","2025-01-12T10:52:12+00:00":"21.68","2025-01-13T02:51:56+00:00":"21.68"}},"item_100080127287":{"min_price":"20.20","name":"花王（KAO）免刷洗马桶清洁剂洁厕灵500ml浴室清洗剂洁厕剂马桶洁厕液除臭","max_price":"22.18","price":"20.30","price_history":{"2024-12-31T15:47:00+00:00":"20.20","2025-01-01T02:52:02+00:00":"22.18","2025-01-01T18:56:56+00:00":"22.18","2025-01-02T02:51:54+00:00":"22.18","2025-01-02T18:52:03+00:00":"22.18","2025-01-03T02:56:37+00:00":"22.18","2025-01-03T18:52:10+00:00":"22.18","2025-01-04T02:56:30+00:00":"22.18","2025-01-04T15:17:41+00:00":"22.18","2025-01-04T18:56:54+00:00":"22.18","2025-01-05T03:13:02+00:00":"22.18","2025-01-05T10:52:03+00:00":"22.18","2025-01-05T14:33:30+00:00":"22.18","2025-01-05T14:39:22+00:00":"22.18","2025-01-06T02:55:08+00:00":"22.18","2025-01-06T10:51:58+00:00":"22.18","2025-01-07T02:52:03+00:00":"22.18","2025-01-07T10:51:59+00:00":"20.30","2025-01-08T02:52:03+00:00":"20.30","2025-01-08T10:52:00+00:00":"20.30","2025-01-09T02:52:02+00:00":"20.30","2025-01-09T10:51:59+00:00":"20.30","2025-01-10T02:52:03+00:00":"20.30","2025-01-10T18:54:43+00:00":"20.30","2025-01-11T02:52:22+00:00":"20.30","2025-01-11T10:52:20+00:00":"20.30","2025-01-12T03:02:07+00:00":"20.30","2025-01-12T10:52:17+00:00":"20.30","2025-01-13T02:51:59+00:00":"20.30"}},"item_100010592287":{"name":"伊利舒化奶 无乳糖牛奶整箱 全脂型220ml*24盒 礼盒装 低GI认证","min_price":"49.38","max_price":"59.76","price":"59.76","price_history":{"2024-12-31T15:47:05+00:00":"54.06","2025-01-01T02:52:06+00:00":"54.06","2025-01-01T18:57:00+00:00":"54.06","2025-01-02T02:51:56+00:00":"54.06","2025-01-02T18:52:07+00:00":"54.06","2025-01-03T02:56:40+00:00":"54.06","2025-01-03T18:52:15+00:00":"54.06","2025-01-04T02:56:35+00:00":"54.06","2025-01-04T15:17:44+00:00":"54.06","2025-01-04T18:56:59+00:00":"54.06","2025-01-05T03:13:04+00:00":"52.06","2025-01-05T10:52:08+00:00":"52.06","2025-01-05T14:33:32+00:00":"52.06","2025-01-05T14:39:25+00:00":"52.06","2025-01-06T02:55:10+00:00":"56.91","2025-01-06T10:52:01+00:00":"56.91","2025-01-07T02:52:06+00:00":"56.91","2025-01-07T10:52:01+00:00":"51.38","2025-01-08T02:52:05+00:00":"51.38","2025-01-08T10:52:03+00:00":"49.38","2025-01-09T02:52:04+00:00":"57.30","2025-01-09T10:52:02+00:00":"57.30","2025-01-10T02:52:06+00:00":"54.91","2025-01-10T18:54:49+00:00":"54.91","2025-01-11T02:52:28+00:00":"54.91","2025-01-11T10:52:26+00:00":"54.91","2025-01-12T03:02:12+00:00":"56.91","2025-01-12T10:52:24+00:00":"56.91","2025-01-12T14:31:39+00:00":"56.91","2025-01-12T14:32:17+00:00":"56.91","2025-01-12T14:32:39+00:00":"56.91","2025-01-12T14:33:11+00:00":"56.91","2025-01-12T14:33:22+00:00":"56.91","2025-01-13T01:41:07+00:00":"59.76","2025-01-13T01:42:36+00:00":"59.76","2025-01-13T02:52:01+00:00":"59.76"}},"item_100049553795":{"max_price":"42.56","name":"花王（KAO）洁厕液洁厕灵马桶清洁剂洁厕宝厕所清洁剂泡泡 去1000ml组合装","min_price":"40.56","price":"42.56","price_history":{"2025-01-01T02:52:12+00:00":"42.56","2025-01-01T18:57:04+00:00":"42.56","2025-01-02T02:51:59+00:00":"42.56","2025-01-02T18:52:12+00:00":"42.56","2025-01-03T02:56:45+00:00":"42.56","2025-01-04T02:56:40+00:00":"42.56","2025-01-04T15:17:50+00:00":"42.56","2025-01-04T18:57:04+00:00":"42.56","2025-01-05T03:13:06+00:00":"40.56","2025-01-05T10:52:13+00:00":"40.56","2025-01-05T14:33:34+00:00":"40.56","2025-01-05T14:39:27+00:00":"40.56","2025-01-05T14:59:50+00:00":"42.56","2025-01-06T02:55:13+00:00":"42.56","2025-01-06T10:52:03+00:00":"42.56","2025-01-07T02:52:09+00:00":"42.56","2025-01-07T10:52:04+00:00":"42.56","2025-01-08T02:52:08+00:00":"42.56","2025-01-08T10:52:05+00:00":"40.56","2025-01-09T02:52:06+00:00":"40.56","2025-01-09T10:52:04+00:00":"40.56","2025-01-10T02:52:08+00:00":"40.56","2025-01-10T18:54:54+00:00":"40.56","2025-01-11T02:52:33+00:00":"40.56","2025-01-11T10:52:33+00:00":"40.56","2025-01-12T03:02:16+00:00":"42.56","2025-01-12T10:52:31+00:00":"42.56","2025-01-13T02:52:04+00:00":"42.56"}},"item_100025494126":{"name":"Bio Island佰澳朗德 比奥岛 成人孕妇中老年牛乳钙软胶囊150粒/瓶*2澳大利亚","min_price":"180.00","max_price":"215.00","price":"215.00","price_history":{"2025-01-05T14:33:39+00:00":"189.00","2025-01-05T14:39:32+00:00":"189.00","2025-01-05T14:56:20+00:00":"189.00","2025-01-06T02:55:20+00:00":"189.00","2025-01-07T02:52:15+00:00":"180.00","2025-01-07T10:52:11+00:00":"180.00","2025-01-09T02:52:12+00:00":"215.00","2025-01-09T10:52:09+00:00":"215.00","2025-01-10T02:52:14+00:00":"215.00","2025-01-10T18:55:00+00:00":"215.00","2025-01-11T02:52:39+00:00":"215.00","2025-01-11T10:52:40+00:00":"215.00","2025-01-12T03:02:23+00:00":"215.00","2025-01-12T10:52:37+00:00":"215.00","2025-01-13T02:52:12+00:00":"215.00"}}}')
    const getUpdatedAt = (item) => {
        if (!item || !item.price_history) return null;
        const dates = Object.keys(item.price_history);
        if (dates.length > 0) {
            const latest = dates.sort().reverse()[0];
            const d = new Date(latest);
            d.setHours(d.getHours() + 8); // convert to UTC+8
            return d.toISOString().slice(0, 16).replace('T', ' ');
        }
        return null;
    }
    return Object.keys(watchedItems)
        .filter(i => i && i !== 'null' && watchedItems[i]) // Filter out null/invalid entries
        .map(i => ({
            id: i,
            name: items['item_' + i]?.name || i, // Get name from items, fallback to id
            notifyPrice: watchedItems[i].notifyPrice,
            price: items['item_' + i]?.price,
            minPrice: items['item_' + i]?.min_price,
            maxPrice: items['item_' + i]?.max_price,
            updatedAt: getUpdatedAt(items['item_' + i]),
            active: watchedItems[i].active
        }))
}



export default function () {
    const [state, setState] = createStore({
        items: [],
        item: {
            id: null,
            active: true
        }
    })

    function loadAndSortItems() {
        loadData().then(items => {
            // Sort items: active items first, then inactive items
            const sortedItems = items
                .map(item => ({ ...item }))
                .sort((a, b) => {
                    if (a.active && !b.active) return -1;
                    if (!a.active && b.active) return 1;
                    return 0;
                });
            setState('items', sortedItems)
        })
    }

    const init = () => {
        setState({
            items: [],
            item: {
                id: null,
                active: true
            }
        })
        loadAndSortItems()
    }

    init()

    function toggleActive(index) {
        setState('items', index, 'active', !state.items[index].active);
        updateWatchedItem(state.items[index]);
        // Re-sort items: active items first
        setState('items', produce(items => {
            items.sort((a, b) => {
                if (a.active && !b.active) return -1;
                if (!a.active && b.active) return 1;
                return 0;
            });
        }));
    }

    async function updateWatchedItem(item) {
        // Validate required fields
        if (!item.id) {
            console.error('Cannot update: missing required field (id)');
            return;
        }
        
        await fetch('https://api.internal/api/jd/items/watched', {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                [item.id]: {
                    notifyPrice: item.notifyPrice !== null && item.notifyPrice !== undefined 
                        ? parseFloat(item.notifyPrice) 
                        : 99999,
                    active: item.active !== undefined ? item.active : true
                }
            })
        })
    }

    function extractItemId(input) {
        if (!input) return null;
        
        // If it's already just a number, return it
        if (/^\d+$/.test(input.trim())) {
            return input.trim();
        }
        
        // Try to extract ID from JD URL patterns
        // Examples:
        // https://item.jd.com/100084849115.html
        // http://item.jd.com/100084849115.html
        // item.jd.com/100084849115.html
        // item.jd.com/100084849115
        const patterns = [
            /item\.jd\.com\/(\d+)/i,
            /\/item\/jd\.com\/(\d+)/i,
            /(\d+)\.html/i
        ];
        
        for (const pattern of patterns) {
            const match = input.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        
        // If no pattern matches, try to extract any sequence of digits
        const digitMatch = input.match(/(\d{6,})/); // At least 6 digits (JD item IDs are usually long)
        if (digitMatch) {
            return digitMatch[1];
        }
        
        return null;
    }

    function handleIdInput(e) {
        const input = e.target.value;
        setState('item', 'id', input);
    }

    function handleIdBlur(e) {
        const input = e.target.value;
        const extractedId = extractItemId(input);
        if (extractedId) {
            setState('item', 'id', extractedId);
        }
    }

    async function handleAddItem() {
        if (!state.item.id) {
            console.error('Cannot add: missing required field (id)');
            return;
        }
        
        // Extract ID in case user pasted a URL
        const extractedId = extractItemId(state.item.id);
        if (!extractedId) {
            console.error('Cannot add: invalid ID format');
            return;
        }
        
        await updateWatchedItem({ ...state.item, id: extractedId });
        
        // Reload data to show the new item
        loadAndSortItems();
        
        // Clear the form
        setState('item', {
            id: null,
            active: true
        });
    }

    const getPriceStatus = (item) => {
        if (!item.price || !item.notifyPrice) return 'default';
        const price = parseFloat(item.price);
        const notifyPrice = parseFloat(item.notifyPrice);
        if (price <= notifyPrice) return 'good'; // Price is at or below notify price
        return 'default';
    }

    return (
        <div className="w-full h-full bg-gray-50 p-4">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">京东商品价格监控</h1>
                <p className="text-sm text-gray-500">监控商品价格，当价格低于设定值时通知您</p>
            </div>

            {/* Add Item Form */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-3">添加监控商品</h2>
                <div className="flex gap-2">
                    <input 
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                        type="text" 
                        placeholder="输入商品ID或链接 (如: 100084849115 或 https://item.jd.com/100084849115.html)" 
                        value={state.item.id || ''} 
                        onInput={handleIdInput}
                        onBlur={handleIdBlur}
                    />
                    <button 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium shadow-sm hover:shadow-md" 
                        onClick={() => handleAddItem()}
                    >
                        添加
                    </button>
                </div>
            </div>

            {/* Items List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <For each={state.items}>
                {(item, index) => {
                    const priceStatus = getPriceStatus(item);
                    const isGoodPrice = priceStatus === 'good';
                    return (
                        <div className={`bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg ${!item.active ? 'opacity-60' : ''}`}>
                            {/* Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2 flex-1">
                                    <input 
                                        type="checkbox" 
                                        checked={item.active} 
                                        onChange={() => toggleActive(index())}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <h3 className="font-semibold text-gray-800 text-sm leading-tight flex-1 line-clamp-2">
                                        {item.name}
                                    </h3>
                                </div>
                            </div>

                            {/* Price Info */}
                            <div className="space-y-2 mb-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">当前价格</span>
                                    <span className={`text-lg font-bold ${isGoodPrice ? 'text-green-600' : 'text-gray-800'}`}>
                                        ¥{item.price || '--'}
                                    </span>
                                </div>
                                
                                {isGoodPrice && (
                                    <div className="bg-green-50 border border-green-200 rounded px-2 py-1 text-xs text-green-700 font-medium">
                                        ✓ 已达到目标价格
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-500">最低:</span>
                                        <span className="ml-1 font-medium text-gray-700">¥{item.minPrice || '--'}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">最高:</span>
                                        <span className="ml-1 font-medium text-gray-700">¥{item.maxPrice || '--'}</span>
                                    </div>
                                </div>

                                {item.updatedAt && (
                                    <div className="text-xs text-gray-400">
                                        更新: {item.updatedAt}
                                    </div>
                                )}
                            </div>

                            {/* Notify Price Input */}
                            <div className="border-t pt-3">
                                <label className="block text-xs text-gray-500 mb-1">通知价格</label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" 
                                        type="number" 
                                        value={item.notifyPrice || ''} 
                                        placeholder="99999"
                                        onBlur={(e) => {
                                            setState('items', index(), 'notifyPrice', e.target.value);
                                            const updatedItem = { ...state.items[index()], notifyPrice: e.target.value };
                                            updateWatchedItem(updatedItem);
                                        }} 
                                    />
                                    <span className="text-xs text-gray-400">元</span>
                                </div>
                            </div>

                            {/* Item ID */}
                            <div className="mt-2 text-xs text-gray-400">
                                ID: {item.id}
                            </div>
                        </div>
                    );
                }}
                </For>
            </div>

            {/* Empty State */}
            {state.items.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">暂无监控商品</div>
                    <div className="text-gray-400 text-sm">在上方输入商品ID或链接开始监控</div>
                </div>
            )}
        </div>
    )
}
