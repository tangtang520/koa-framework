/**
 * Created by tangtang on 16/2/1.
 */
var path = require("path");
var _ = require("lodash");
var env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
var base = {
    app: {
        root: path.normalize(path.join(__dirname, "/..")),
        env: env,
    },
};
var specific = {
  development: {
    debug: true,
    socket: false,
    app: {
      port: 7000,
      name: "dhapi - Dev",
      keys: ["super-secret-hurr-durr"]
    },
    mongo: {
      url: "mongodb://139.224.187.31/yunapi",
      option: {
        db: { native_parser: true },
        server: { poolSize: 5 },
        replset: { rs_name: "yunapi" },
        user: 'yunapi',
        pass: 'dh666666'
      }
    },
    redis: {
      "host": "139.224.187.31",
      "port": 6379,
      options: {
        password: 'dh666666',
        connect_timeout: 10 * 1000,
        db: 0, //连接数据库 默认是0
        auth_pass: 'dh666666'
      }
    }
  },
  production: {
    debug: false,
    socket: false,
    app: {
      port: 7000,
      name: "dhapi"
    },
    "mongo": {
      url: "mongodb://106.14.42.141:27017/yunapi",
      option: {
        db: { native_parser: true },
        server: { poolSize: 5 },
        replset: { rs_name: "dh" },
        user: 'yunapi',
        pass: 'dh666666'
      }
    },
    redis: {
      port: '6379',
      host: '106.14.42.141',
      options: {
        password: 'dh666666',
        connect_timeout: 10 * 1000,
        db: 0, //连接数据库 默认是0
        auth_pass: 'Q5tVjCaUZy3bG'
      }
    }
  },
  testApi: {
    debug: true,
    socket: false,
    app: {
      port: 3000,
      name: "eclapi - Dev",
      keys: ["super-secret-hurr-durr"]
    },
    "mongo": {
      url: "mongodb://127.0.0.1:27017/ecl"
    },
    redis: {
      port: '6379',
      host: '127.0.0.1',
      options: {
        password: 'Q5tVjCaUZy3bG',
        connect_timeout: 10 * 1000,
        db: 0, //连接数据库 默认是0
        auth_pass: 'Q5tVjCaUZy3bG'
      }
    }
  }
};
module.exports = _.merge(base, specific[env]);
