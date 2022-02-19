
# TODO 
# Save server data to DynamoDB
# Eventually move this to Ceramic or something similiar 

import json
import os
from logging import raiseExceptions
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

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
