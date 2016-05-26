# serialservo-server

This module will provide a restful service endpoint to the serialservo module.

## Install

```bash
npm install serialservo-server
```

## Typical Usage

Just add the following and run it.

```javascript
var SerialServoServer = require("serialservo-server");
var sscServer = new SerialServoServer();
sscServer.run();
```

Alternately you can work with options to override defaults.

```javascript
var SerialServoServer = require("serialservo-server");
var configOptions = { 
                        httpPort: 9090, 
                        loggingEnabled: false, 
                        portName: '/dev/ttyUSB1', 
                        serialPortOptions: { 
                            baudRate: 9600
                        }
                    };
var sscServer = new SerialServoServer(configOptions);
sscServer.run();
```

For more information on the serial servo controller review the documentation on the module 'serialservo'.

## License

The MIT License (MIT)

Copyright (c) 2016 Scott Preston

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.