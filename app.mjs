import koa from "koa";

import cors from "@koa/cors";

var app = new koa();
app.use(
    cors({
        origin: "*",
    })
);
import axios from "axios";
axios.defaults.responseType = "arraybuffer";
import { koaBody } from "koa-body";
app.use(koaBody());
app.use(async (ctx, next) => {
    const url = ctx.req.url.replace("/?url=", "");
    console.log(ctx.request);
    await next();
    const data = await axios({
        url: url.trim(),
        method: ctx.request.method,
        headers: {
            ...ctx.req.headers,
            overwrite: undefined,
            ...JSON.parse(ctx.req.headers?.overwrite, "{}"),
        },
        data: ctx.request.body,
    }).then((res) => res.data);
    ctx.response.body = data;
});
console.log("开启");
app.listen(3010, () => {
    "http://localhost:3010";
});
