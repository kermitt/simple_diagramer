import paramiko
pem = "/Users/myusername/.ssh/DevKeyPair.pem"
ip = "123.456.789.0"
user = "myusername"
url = "SOME_URL_HERE.amazonaws.com"

k = paramiko.RSAKey.from_private_key_file(pem)
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
print "connecting"
c.connect( hostname = ip, username = user, pkey = k )
print "connected"

query = "curl -k " + url + "/_search -d '{    \"query\": {\"match\" : {\"message\" : \"wren\"}}}'"
    

def doCommand(command):
    print "Executing '{}'".format(command)
    stdin , stdout, stderr = c.exec_command(command)
    r = stdout.read()
    print r
    if len(stderr.read()) > 0:
        print "Errors..." 
        print "FAILBOT says |{}|".format(len(stderr.read()))

doCommand(query)


c.close()
print "The end"
