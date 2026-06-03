## GitHub Copilot Chat

- Extension: 0.45.1 (prod)
- VS Code: 1.117.0 (10c8e557c8b9f9ed0a87f61f1c9a44bde731c409)
- OS: win32 10.0.26200 x64
- GitHub Account: Satvikk7

## Network

User Settings:
```json
  "http.systemCertificatesNode": true,
  "github.copilot.advanced.debug.useElectronFetcher": true,
  "github.copilot.advanced.debug.useNodeFetcher": false,
  "github.copilot.advanced.debug.useNodeFetchFetcher": true
```

Connecting to https://api.github.com:
- DNS ipv4 Lookup: Error (10 ms): getaddrinfo ENOTFOUND api.github.com
- DNS ipv6 Lookup: Error (18 ms): getaddrinfo ENOTFOUND api.github.com
- Proxy URL: None (1 ms)
- Electron fetch (configured): Error (167 ms): Error: net::ERR_NAME_NOT_RESOLVED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (16 ms): Error: getaddrinfo ENOTFOUND api.github.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (23 ms): TypeError: fetch failed
	at node:internal/deps/undici/undici:14902:13
	at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
	at async t._fetch (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5307:5229)
	at async t.fetch (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5307:4541)
	at async u (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5339:186)
	at async Eg._executeContributedCommand (file:///c:/Users/Satvik%20Gupta/AppData/Local/Programs/Microsoft%20VS%20Code/10c8e557c8/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:501:48675)
  Error: getaddrinfo ENOTFOUND api.github.com
  	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://api.githubcopilot.com/_ping:
- DNS ipv4 Lookup: Error (4 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- DNS ipv6 Lookup: Error (5 ms): getaddrinfo ENOTFOUND api.githubcopilot.com
- Proxy URL: None (13 ms)
- Electron fetch (configured): Error (181 ms): Error: net::ERR_NAME_NOT_RESOLVED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (36 ms): Error: getaddrinfo ENOTFOUND api.githubcopilot.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (32 ms): TypeError: fetch failed
	at node:internal/deps/undici/undici:14902:13
	at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
	at async t._fetch (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5307:5229)
	at async t.fetch (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5307:4541)
	at async u (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5339:186)
	at async Eg._executeContributedCommand (file:///c:/Users/Satvik%20Gupta/AppData/Local/Programs/Microsoft%20VS%20Code/10c8e557c8/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:501:48675)
  Error: getaddrinfo ENOTFOUND api.githubcopilot.com
  	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://copilot-proxy.githubusercontent.com/_ping:
- DNS ipv4 Lookup: Error (5 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- DNS ipv6 Lookup: Error (4 ms): getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
- Proxy URL: None (18 ms)
- Electron fetch (configured): Error (163 ms): Error: net::ERR_NAME_NOT_RESOLVED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  {"is_request_error":true,"network_process_crashed":false}
- Node.js https: Error (37 ms): Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
- Node.js fetch: Error (37 ms): TypeError: fetch failed
	at node:internal/deps/undici/undici:14902:13
	at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
	at async t._fetch (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5307:5229)
	at async t.fetch (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5307:4541)
	at async u (c:\Users\Satvik Gupta\.vscode\extensions\github.copilot-chat-0.45.1\dist\extension.js:5339:186)
	at async Eg._executeContributedCommand (file:///c:/Users/Satvik%20Gupta/AppData/Local/Programs/Microsoft%20VS%20Code/10c8e557c8/resources/app/out/vs/workbench/api/node/extensionHostProcess.js:501:48675)
  Error: getaddrinfo ENOTFOUND copilot-proxy.githubusercontent.com
  	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Connecting to https://mobile.events.data.microsoft.com: Error (166 ms): Error: net::ERR_NAME_NOT_RESOLVED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://dc.services.visualstudio.com: Error (170 ms): Error: net::ERR_NAME_NOT_RESOLVED
	at SimpleURLLoaderWrapper.<anonymous> (node:electron/js2c/utility_init:2:10684)
	at SimpleURLLoaderWrapper.emit (node:events:519:28)
  {"is_request_error":true,"network_process_crashed":false}
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (38 ms): Error: getaddrinfo ENOTFOUND copilot-telemetry.githubusercontent.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
Connecting to https://copilot-telemetry.githubusercontent.com/_ping: Error (22 ms): Error: getaddrinfo ENOTFOUND copilot-telemetry.githubusercontent.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)
Connecting to https://default.exp-tas.com: Error (19 ms): Error: getaddrinfo ENOTFOUND default.exp-tas.com
	at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26)

Number of system certificates: 74

## Documentation

In corporate networks: [Troubleshooting firewall settings for GitHub Copilot](https://docs.github.com/en/copilot/troubleshooting-github-copilot/troubleshooting-firewall-settings-for-github-copilot).