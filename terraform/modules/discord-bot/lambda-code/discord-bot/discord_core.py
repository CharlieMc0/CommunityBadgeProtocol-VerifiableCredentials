from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError
import json
PUBLIC_KEY = "dc97e0657388f3d069db1abe14d18d86a0aba728822894ac0c235d80d386b416"

def verify_signature(event):

    verify_key = VerifyKey(bytes.fromhex(PUBLIC_KEY))
    signature = event['headers']["x-signature-ed25519"]
    timestamp = event['headers']["x-signature-timestamp"]
    body = event['body']

    try:
        verify_key.verify(f'{timestamp}{body}'.encode(),
                          bytes.fromhex(signature))

    except (BadSignatureError) as e:
        raise Exception("BadSignatureError", e)

def is_ping(body):
    if body.get("type") == 1:
        return True
    return False

def return_message(message_text):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'type': 4,
            "data": {
                "tts": False,
                "content": message_text,
                "embeds": [],
                "allowed_mentions": {"parse": []}
            }
        })
    }
