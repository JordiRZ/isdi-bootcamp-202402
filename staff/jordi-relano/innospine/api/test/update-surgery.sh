curl -X PUT -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjMwYjJlNDhhNTkzMzZlZDliZGRhNDMiLCJpYXQiOjE3MTQ1ODg3NjEsImV4cCI6MTcxNDg4ODc2MX0.Iz82wJCyQ3-5fjfTtEmJCwvI-A4qE5W1Rc_-BHfWXu8" -H "Content-Type: application/json" -d '{
    "author": "66278dec16f309b63752bc2d",
    "products": ["66278dec16f309b63752bc2e"],
    "surgeryDate": "2024/06/08",
    "name": "Lumbar Posterior Artrodesis",
    "type": "Lumbar posterior",
    "hospital": "hospital",
    "note": "we need more implants"
}' http://localhost:8080/663127f45ebd98f69c6760d2 -v