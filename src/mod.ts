import {container, DependencyContainer} from "tsyringe";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import {ILogger} from "@spt-aki/models/spt/utils/ILogger";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";

class Mod implements IPostDBLoadMod, IPreAkiLoadMod {

    logger;
    ConfigServer;
    modConfig;
    constructor() {}


    public postDBLoad(container: DependencyContainer): void {
        this.modConfig = require("../config/config.json")
        this.ConfigServer = container.resolve<ConfigServer>("ConfigServer");
        this.logger = container.resolve<ILogger>("WinstonLogger");
        if (this.modConfig.Disabled == false) {
        this.logger.log("Loading Fence's Fresh Stock ", "cyan");
        this.ConfigServer.configs["aki-trader"].fence.regenerateAssortsOnRefresh = true;


        if (this.modConfig.crash == true) {
            this.crash()
        }
    }
    }
    public crash() {
        this.logger.error("Intentional crash")
        process.exit(0)
    }
}

module.exports = {
    mod: new Mod()
}
