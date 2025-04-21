//this if for pm2, a node library to help for nodejs production application running on AWS EC2

module.exports = {
  apps: [
    {
      name: "real-estate",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
