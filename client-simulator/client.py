from cassandra.cluster import Cluster
import uuid
import json
import requests
import random
print("Connecting!")
cluster = Cluster(['192.168.0.11'])
session = cluster.connect()
session.set_keyspace('product')

custRows = session.execute('select id from product.customers')
randomCustId= custRows[random.randint(0,7984)].id.urn[9:]
print("CustomerID: " + randomCustId)
ProdRows = session.execute('select id from product.inventory')
##TODO: Get random productId
randomProdId = ProdRows[random.randint(0,30)].id.urn[9:]
print("ProductID: " + randomProdId)

entry={'customerId': randomCustId,
'productId': randomProdId,
'productQuantity': random.randint(1,99)}
print(json.dumps(entry))
#r = requests.post('http://localhost:8080/order/create',json=entry)
r = requests.post('http://pipex.127.0.0.1.nip.io/order/create',json=entry)
print(r.status_code)
print(r.json())
