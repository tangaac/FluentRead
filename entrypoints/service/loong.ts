import { services } from "../utils/option";
import { method, urls } from "../utils/constant";
import { loongMsgTemplate } from "../utils/template";

async function loong(message: any) {
    let url: string = urls[services.loong]
    const resp = await fetch(url, {
        method: method.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: loongMsgTemplate(message.origin),
    });

    if (resp.ok) {
        let result = (await resp.text()).match(/(?!data:\s)({.*})/g);
        return result?.map(i => JSON.parse(i).content).join("")
    } else {
        console.log(resp)
        throw new Error(`翻译失败: ${resp.status} ${resp.statusText} 请检查 token 是否正确`);
    }
}

export default loong;


//==