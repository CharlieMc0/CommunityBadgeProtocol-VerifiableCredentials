
# TODO 
# Try to avoid such as big list of if/else statements
# See if the UI/UX within Discord can be improved 
# Setup logic for end of voting period 
import json
import os
from logging import raiseExceptions
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key


# VALID_COMMANDS = ["update_settings", "configure-server", "nominate", "vote", "excellence-award"]
# PUBLIC_KEY = "dc97e0657388f3d069db1abe14d18d86a0aba728822894ac0c235d80d386b416"

# access_token = os.environ['ACCESS_TOKEN']
# config_table_name = os.environ['SERVER_CONFIG_TABLE']
# votes_table_name = os.environ['VOTE_TABLE']

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


def lambda_handler(event, context):

    print(json.dumps(event))
    return {
    'statusCode': 200,
    'body': json.dumps({ 'message': 'Success' })
}
