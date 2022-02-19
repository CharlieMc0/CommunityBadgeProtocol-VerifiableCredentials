
# TODO 
# Interacting with the chain should be decoupled from the discord bot, ideally via SQS or other messaging service
# Add better error handling and logging

import json
import os
from logging import raiseExceptions
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

from typing import SupportsComplex
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://rinkeby.infura.io/v3/ca42c79b2cd64cd59b28c04c06df2a6f'))

abi_file = open('contract-abi.json')
contract_abi = json.load(abi_file)

# For local testing only
# from secrets import wallet_private_key, owner_wallet_address

ssm = boto3.client('ssm')
owner_wallet_address = ssm.get_parameter(Name='/ethdenver-hackathon/eth_wallet_address', WithDecryption=True)
wallet_private_key = ssm.get_parameter(Name='/ethdenver-hackathon/eth_wallet_private_key', WithDecryption=True)
my_contract_address = ssm.get_parameter(Name='/ethdenver-hackathon/contract_address', WithDecryption=True)

# my_contract_address = "0x11660c7bc676E9453C9Aa957eaE55845c9C8D619"
my_contract = w3.eth.contract(address=my_contract_address, abi=contract_abi)
chain_id = 4

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



def wait_for_tx(hash, timeout=120):
    try:
        return w3.eth.wait_for_transaction_receipt(hash, timeout=timeout)
    except Exception as e:
        print(e)

def create_new_token(badge_limit, badge_name, badge_uri):
    ## Create a transaction and sign it 
    transaction = my_contract.functions.createNewBadge(badge_limit, badge_name, badge_uri).buildTransaction({
        'value': 0,
        'chainId': chain_id,
        'gas': 300000,
        'maxFeePerGas': w3.toWei('2', 'gwei'),
        'maxPriorityFeePerGas': w3.toWei('1', 'gwei'),
        'nonce': w3.eth.get_transaction_count(owner_wallet_address),
        })
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=wallet_private_key)
    hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    wait_for_tx(hash)  
    return hash 

def mint(to_address, token_id, amount=1):
    ## Create a transaction and sign it 
    transaction = my_contract.functions.mint(to_address, token_id, amount, '').buildTransaction({
        'value': 0,
        'chainId': chain_id,
        'gas': 300000,
        'maxFeePerGas': w3.toWei('2', 'gwei'),
        'maxPriorityFeePerGas': w3.toWei('1', 'gwei'),
        'nonce': w3.eth.get_transaction_count(owner_wallet_address),
        })
    signed_txn = w3.eth.account.sign_transaction(transaction, private_key=wallet_private_key)
    hash = w3.eth.send_raw_transaction(signed_txn.rawTransaction)
    wait_for_tx(hash)  
    # Do Something to publish the  attributes to IPFS
    return hash 

def publish_metadata():
    pass # TODO - Setup Metadata 


# create_new_token(0, "Super Badge", "s3.com/1.json")
# mint("0x9D60c7529bcB2510e6e059C52b7Ac538dAB8798A", 1)