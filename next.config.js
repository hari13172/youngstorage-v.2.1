module.exports = {
    // Your other Next.js config options...
    webpack: (config) => {
      // Disable tree shaking for mqtt module
      config.module.rules.push({
        test: /mqtt/,
        sideEffects: true,
      });
  
      return config;
    },
  };
  