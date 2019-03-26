const config = {
  postgresConnection: {
    host: 'ec2-184-73-216-48.compute-1.amazonaws.com',
    user: 'ywhkdmrsrebjhx',
    database: 'd1jd4rogvm4lvb',
    password: '2518733322d48ae06a507ba0cfd93e90f82d4cb21652a8bba0ab1c52e1e00a56',
    port: '5432',
    ssl: true
  },
  pgSqlOptions : {
    autoQuoteAliasNames: true,
    tableAliasQuoteCharacter: '"',
    fieldAliasQuoteCharacter: '"',
  }
}

// const configMapping = {
//   stg: postgresConnection,
//   // prod: prodConfig,
// };

// const env = process.env.NODE_ENV;
// Object.assign(config, configMapping[env]);


export default config;
