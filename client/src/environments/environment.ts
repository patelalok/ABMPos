// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  loginExpireWithinMinutes: 30, 

  // NEO ACCESSORIES
  // productUrl: 'http://96.73.255.162:5001',
  // userUrl: 'http://96.73.255.162:5001',
  // reportUrl: 'http://96.73.255.162:5001'

      // NEO PARTS
      // productUrl: 'http://96.73.255.162:5002',
      // userUrl: 'http://96.73.255.162:5002',
      // reportUrl: 'http://96.73.255.162:5002'

  productUrl: 'http://localhost:8080',
  userUrl: 'http://localhost:8080',
  reportUrl: 'http://localhost:8080'
  
};
