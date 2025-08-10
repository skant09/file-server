# run this
mkdir files
cd files
echo 'Hello from the server!' > sample.txt

```shell
node createfile.js
node server.js //runs server on 6000
node client.js //runs server on 6001
```

go to localhost:6001/get-file

This uses axios for file transfer.
With `responseType: 'stream'`, i am able to transfer 33gb
Else it fails with `Error sending file: Error: write EPIPE` which means there is a broken connection