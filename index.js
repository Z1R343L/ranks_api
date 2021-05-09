const canvacord = require("canvacord");
const { Swiftcord } = require("swiftcord");
const fastify = require("fastify")({
    logger: true
});

const defAvatar = "https://cdn.discordapp.com/embed/avatars/4.png";

fastify.get("/", async (request, reply) => {
    const rq = request.query;
    let type; if (!rq.type) {type = 0;} else {type = parseInt(rq.type, 10)}
    let avatar; if (!rq.avatar) {avatar = defAvatar;} else {avatar = rq.avatar;}
    let xp; if (!rq.xp) {xp = 0;} else {xp = parseInt(rq.xp, 10);}
    let rxp; if (!rq.rxp) {rxp = 0;} else {rxp = parseInt(rq.rxp, 10);}
    let name; if (!rq.name) {name = "User";} else {name = rq.name;}
    let dis; if (!rq.dis) {dis = "1234";} else {dis = rq.dis;}
    let col; if (!rq.col) {col = "#FFFFFF";} else {col = "#" + rq.col;}
    let bg, bgt; if(!rq.bg) {bgt = "COLOR"; bg = "#000000";} else {let bgstr = rq.bg; let imgbool = bgstr.includes("http"); if (!imgbool) {bgt = "COLOR"; bg = "#" + rq.bg;} else {bgt = "IMAGE"; bg = rq.bg;}}
    let level; if (!rq.level) {level = parseInt(1, 10);} else {level = rq.level;}
    let rank; if (!rq.rank) {rank = parseInt(0, 10);} else {rank = parseInt(rq.rank, 10);}
    if (type === 0) {
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
            .then((data) => {
                reply.type("image/png");
                reply.send(data);
            });
    } else if (type === 1) {
        const cord = new Swiftcord();
        let image = await cord.rank()
            .setAvatar(avatar)
            .setCurrentXP(xp)
            .setRequiredXP(rxp)
            .setStatus("dnd")
            .setProgressBar(col)
            .setUsername(name)
            .setDiscriminator(dis)
            .setBackground(bgt, bg)
            .setLevel(level)
            .setRank()
            .toAttachment();
        const img = cord.write(image, "rank.png").then((buffer) => {
            reply.type("image/png");
            reply.send(buffer);
        })
    }
})

const start = async () => {try {await fastify.listen(3000);} catch (err) {fastify.log.error(err); process.exit(1);}}
start()