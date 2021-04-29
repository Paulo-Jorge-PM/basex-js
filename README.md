# JS library to communicate with BaseX REST API

Instructions:

Download BaseX full version:
https://basex.org/download/

Extract it. You'll need to have Java installed in order to run it.

Inside the BaseX folder you'll have the "webapp" folder, and inside it the "static" folder. Everything that you insert inside the "static" folder will be made public and run in the inner server of BaseX.

Copy the "site" folder to the "static" folder inside BaseX (full path: "basex/webapp/static/site").

Now you just need to run the BaseX server, for that go to the folder "bin" inside BaseX and run "basexhttp" (full path "/basex/bin/basexhttp"). This will launch a terminal, while you leave it open the server will run in the port 8984. To access it in your borwser just visit: http://localhost:8984

To visit the contents of the static folder and the website we created, just go to:
http://localhost:8984/static/site/

(By default it always searches or "index.html" and runs it. You can also make run it explicit: http://localhost:8984/static/site/index.html


