curl -X POST -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjI3OGRlYzE2ZjMwOWI2Mzc1MmJjMmQiLCJpYXQiOjE3MTM5NzAxNDAsImV4cCI6MTcxMzk3MDQ0MH0.42Dyy-0CIDVa29pjGcJekpaKhtsY0D6Xfcp7-ocKIyU" -H "Content-Type: application/json" -d '{ "surgeryDate":"2024/06/08", "name":"Lumbar Posterior Artrodesis", "type":"Lumbar posterior", "hospital":"hospital", "note":"we need more implants", "productId":"<product_id>"}' http://localhost:8080/surgeries -v