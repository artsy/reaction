"use strict";
var Relay = require("react-relay");
exports.metaphysicsURL = "https://metaphysics-staging.artsy.net";
function artsyNetworkLayer() {
    return new Relay.DefaultNetworkLayer(exports.metaphysicsURL, {
        headers: {} });

}
exports.artsyNetworkLayer = artsyNetworkLayer;
/*
                                                * For the client.
                                                */
function artsyRelayEnvironment() {
    var env = new Relay.Environment();
    env.injectNetworkLayer(artsyNetworkLayer());
    return env;
}
exports.artsyRelayEnvironment = artsyRelayEnvironment;
//# sourceMappingURL=config.js.map
