const canvacord = require("canvacord");
const fastify = require("fastify")({
    logger: true
});

const defAvatar = "https://cdn.discordapp.com/embed/avatars/4.png";

fastify.get("/", async (request, reply) => {
    return { hello: "world" }
})

fastify.get("/rank_a", async (request, reply) => {
    const rq = request.query;
    let avatar; if (!rq.avatar) {avatar = defAvatar;} else {avatar = rq.avatar;}
    let xp; if (!rq.xp) {xp = 0;} else {xp = parseInt(rq.xp, 10);}
    let rxp; if (!rq.rxp) {rxp = 0;} else {rxp = parseInt(rq.rxp, 10);}
    let name; if (!rq.name) {name = "User";} else {name = rq.name;}
    let dis; if (!rq.dis) {dis = "1234";} else {dis = rq.dis;}
    let col; if (!rq.col) {col = "#FFFFFF";} else {col = "#" + rq.col;}
    let bg, bgt; if(!rq.bg) {bgt = "COLOR"; bg = "#000000"} else {let url; bg = rq.bg; bgt = "IMAGE"; try {url = new URL(bg);} catch {bgt = "COLOR"; bg = "#" + rq.bg;}}
    let level; if (!rq.level) {level = parseInt(1, 10);} else {level = rq.level;}
    let rank; if (!rq.rank) {rank = parseInt(0, 10);} else {rank = parseInt(rq.rank, 10);}
    const rankCard = new canvacord.Rank()
        .setAvatar(avatar)
        .setCurrentXP(xp)
        .setRequiredXP(rxp)
        .setStatus("dnd")
        .setProgressBar(col, "COLOR")
        .setUsername(name)
        .setDiscriminator(dis)
        .setBackground(bgt, bg)
        .setLevel(Number(level))
        .setRank(rank);
    rankCard.build()
        .then(data => {
            reply.type("image/png");
            reply.send(data);
        });
})


const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()