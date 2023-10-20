const Eureka = require('eureka-js-client').Eureka;
const os = require('os'); // Importer le module 'os' pour obtenir l'adresse IP de l'hôte

const eurekaHost = 'localhost'; // Utilisez le nom d'hôte défini dans votre fichier Docker Compose
const eurekaPort = 8761;
const hostName = (process.env.HOSTNAME || 'localhost');
const ipAddr = getIpAddress(); // Obtient l'adresse IP de l'hôte

exports.registerWithEureka = function(appName, PORT) {
    const client = new Eureka({
        instance: {
            app: appName,
            hostName: hostName,
            ipAddr: ipAddr,
            port: {
                '$': PORT,
                '@enabled': 'true',
            },
            vipAddress: appName,
            dataCenterInfo: {
                '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
                name: 'MyOwn',
            },
        },
        eureka: {
            host: eurekaHost,
            port: eurekaPort,
            servicePath: '/eureka',
            maxRetries: 10,
            requestRetryDelay: 2000,
        },
    });

    client.logger.level('debug');

    client.start((error) => {
        console.log(error || "user service registered");
    });

    function exitHandler(options, exitCode) {
        if (options.cleanup) {
            // Perform cleanup if needed
        }
        if (exitCode || exitCode === 0) console.log(exitCode);
        if (options.exit) {
            client.stop();
        }
    }

    client.on('deregistered', () => {
        process.exit();
        console.log('after deregistered');
    });

    client.on('started', () => {
        console.log("Eureka host: " + eurekaHost);
    });

    process.on('SIGINT', exitHandler.bind(null, { exit: true }));
};

function getIpAddress() {
    const networkInterfaces = os.networkInterfaces();
    for (const key in networkInterfaces) {
        const interfaces = networkInterfaces[key];
        for (const intf of interfaces) {
            if (intf.family === 'IPv4' && !intf.internal) {
                return intf.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to a default IP if not found
}
