
# TODO
# Move awary from Lambda Proxy and setup an improved API endpoint
# Try to avoid such as big list of if/else statements
# See if the UI/UX within Discord can be improved
# Setup logic for end of voting period
# Better error checking
# Send link to claim badge 
# Connurecy checking to make sure nominate ID is incrementing correctly 

from logging import raiseExceptions
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key
import json
import os
from nacl.signing import VerifyKey
from nacl.exceptions import BadSignatureError
from discord_core import verify_signature, return_message, is_ping
import requests
from chain_functions import mint, create_new_token, publish_metadata

VALID_COMMANDS = ["update_settings", "configure-server", "community-badges",
                  "nominate", "vote", "excellence-award", "create-new-badge"]
PUBLIC_KEY = "dc97e0657388f3d069db1abe14d18d86a0aba728822894ac0c235d80d386b416"

access_token = os.environ['ACCESS_TOKEN']
config_table_name = os.environ['SERVER_CONFIG_TABLE']
votes_table_name = os.environ['VOTE_TABLE']
base_uri = "Uri.com/"

def lambda_handler(event, context):

    print(json.dumps(event))
    # verify the signature
    try:
        verify_signature(event)
        print("SIGNATURE VERIFIED")

    except Exception as e:
        print(e)
        return {
            'statusCode': 401,
            'body': json.dumps("Unable To Verify Signature")
        }

    message_body = json.loads(event['body'])

    # check if message is a ping
    try:
        if is_ping(message_body):
            return {
                'statusCode': 200,
                'body': json.dumps({'type': 1})
            }
    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps("ERROR RESPONDING TO PING")
        }

    # Type 2 is a command
    try:
        if message_body['type'] == 2:

            server_id = message_body['guild_id']
            channel_id = message_body['channel_id']
            command_name = message_body['data']['name']

            print(f"command_name: {command_name}")
            print(f"command_options: {message_body['data']['options']}")

            try:
                validate_command(command_name)
            except ValueError as e:
                return return_message(str(e))

            try:
                server_config = get_server_config(server_id)
            except KeyError as e:
                print("ERROR - Server Settings Not Found")
                return return_message("Server Settings Not Found - Please visit site.xyz and make sure your settings have been configured")
            except Exception as e:
                return return_message(str(e))

            if command_name == "community-badges":
                subcommand = message_body['data']['options'][0]['name']

                print(f"server_config: {server_config}")

                if subcommand == "vote":
                    nominated_user = message_body['data']['options'][0]['options'][0]['value']
                    vote = message_body['data']['options'][0]['options'][1]['value']

                    nomination_id = server_config['NominationId']

                    print(f"nominated_user: {nominated_user}")
                    print(f"vote: {vote}")
                    print(f"user_id: {user_id}")

                    add_vote_to_table(server_id, nomination_id,
                                      nominated_user, user_id, vote)

                    return return_message("Your vote has been cast")

                elif subcommand == "nominate":
                    user_id = message_body['member']['user']['id']
                    nominated_user = message_body['data']['options'][0]['options'][0]['value']
                    badge_name = message_body['data']['options'][0]['options'][1]['value']
                    nomination_reason = message_body['data']['options'][0]['options'][2]['value']
                    nomination_id = server_config['NominationId'] + 1

                    print(f"nominated_user: {nominated_user}")
                    send_nomination_message(
                        nomination_reason, nominated_user, badge_name, user_id)
                    return return_message("Nomination Complete" + nomination_id )

                elif subcommand == "create-new-badge":
                    user_id = message_body['member']['user']['id']
                    badge_name = message_body['data']['options'][0]['options'][0]['value']
                    badge_description = message_body['data']['options'][0]['options'][1]['value']
                    badge_uri = base_uri + server_id + server_config['NominationId']
                    try:
                        badge_limit = message_body['data']['options'][0]['options'][2]['value']
                    except Exception as e:
                        print(e)
                        badge_limit = 0


                    # TODO - Mint Badge
                    create_new_token(badge_limit, badge_name, badge_uri)

                    send_new_badge_message(badge_name, badge_description, user_id, webhook_url=None)

                    return return_message("Badge Creation Complete")

    except Exception as e:
        print(e)
        return {
            'statusCode': 500,
            'body': json.dumps("ERROR PROCESSING COMMAND")
        }


def send_nomination_message(message, nominated_user, badge_name, nominating_user, webhook_url=None):
    print(nominating_user)
    print(nominated_user)
    if webhook_url is None:
        webhook_url = "https://discord.com/api/webhooks/943906356967141467/IKKQLxvW3DKF326oYFACVocith4LhHpPwjbfoUIcmFRMRhEIpvm-ONctIL_ZfQWrQVtL"
    data = {
        "content": f"** {nominated_user} Has Been Nominated For The {badge_name} Badge!**\n They were nominated by <@{nominating_user}> because {message}",
        "embeds": [
            {
                "title": "What's A Community Badge?",
                "description": "Community Badges are ERC1155 tokens that are created and managed by an organization. Your community is responsible for nominating and voting for a person or group to win the award. Specifics regarding the award such as name, description, quantity available, and who's eligible to receive have been configured by your community leaders. \n\nThe voting period is open for 24 hours. After this time the votes will be tallied and an award may be issued.",
                "color": 5814783
            },
            {
                "title": "How to Vote?",
                "description": "To enter your vote us the `/community-badges vote` slash command, tag the nomimanted person, and select `For` if you support their nomination for the award or `Against` if you don't believe they deserve an award.",
                "color": 5814783
            }
        ]
    }

    r = requests.post(webhook_url, data=json.dumps(
        data), headers={'Content-Type': 'application/json'})


def send_new_badge_message(badge_name, badge_description, user_id, webhook_url=None):
    try:
        if webhook_url is None:
            webhook_url = "https://discord.com/api/webhooks/943906356967141467/IKKQLxvW3DKF326oYFACVocith4LhHpPwjbfoUIcmFRMRhEIpvm-ONctIL_ZfQWrQVtL"
        data = {
            "content": f"** A New Badge Has Been Created!**\n <@{user_id}> created the {badge_name} Badge.",
            "embeds": [
                {
                    "title": "The {} Badge".format(badge_name),
                    "description": "{}".format(badge_description),
                    "color": 5814783
                },
                {
                    "title": "What's A Community Badge?",
                    "description": "Community Badges are ERC1155 tokens that are created and managed by an organization. Your community is responsible for nominating and voting for a person or group to win the award. Specifics regarding the award such as name, description, quantity available, and who's eligible to receive have been configured by your community leaders. \n\nThe voting period is open for 24 hours. After this time the votes will be tallied and an award may be issued.",
                    "color": 5814783
                }
            ]
        }

        r = requests.post(webhook_url, data=json.dumps(
            data), headers={'Content-Type': 'application/json'})
    except Exception as e:
        print(e)


def get_server_config(discord_server_id, dynamodb=None, table=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')
    if not table:
        table = dynamodb.Table(config_table_name)

    try:
        response = table.get_item(
            Key={
                'ServerId': discord_server_id,
            }
        )
        return response['Item']

    except KeyError:
        raise KeyError("Server Configuration Settings Not Found")

    except Exception as e:
        raise Exception(e)


def verify_discord_role(message_body, valid_role_id):
    roles = message_body['member']['roles']
    print(roles)
    try:
        roles.index(valid_role_id)
    except ValueError:
        print("INVALID: User Does Not Have The Whitelist Role")
        raise ValueError("INVALID: User Does Not Have The Whitelist Role")
    except Exception as e:
        print(e)
        raise Exception(e)


def validate_command(command):
    try:
        VALID_COMMANDS.index(command)
        return True
    except ValueError:
        raise ValueError("INVALID: Command Not Recognized")


def increment_vote_id(server_id, vote_id, dynamodb=None, table=None):
    try:
        if not dynamodb:
            dynamodb = boto3.resource('dynamodb')
        if not table:
            table = dynamodb.Table(votes_table_name)
        # TODO - Need a safer way to increment the vote id
        vote_id += 1
        response = table.update_item(
            Item={
                'ServerId': server_id,
                'NominationId': vote_id,
            }
        )
        if not response['ResponseMetadata']['HTTPStatusCode'] == 200:
            print(response)
            raise Exception("Unable to Save Item to DynamoDB", response)
        return

    except Exception as e:
        print(response)
        print(e)
        raise Exception(
            "Sorry, something went wrong. Please tag an admin")


def add_vote_to_table(server_id, vote_id, nominated_user_id, voter_id, vote, dynamodb=None, table=None):
    try:
        if not dynamodb:
            dynamodb = boto3.resource('dynamodb')
        if not table:
            table = dynamodb.Table(votes_table_name)

        if vote == "yes":
            YesVote = voter_id
            NoVote = ""
        elif vote == "no":
            NoVote = voter_id
            YesVote = ""
        else:
            raise ValueError("Invalid Vote")

        response = table.put_item(
            Item={
                'ServerId': server_id,
                'NominationId': vote_id,
                'NominatedUserId': nominated_user_id,
                'Votes': {
                    voter_id: vote
                }
            }
        )
        if not response['ResponseMetadata']['HTTPStatusCode'] == 200:
            print(response)
            raise Exception("Unable to Save Item to DynamoDB", response)
        return

    except Exception as e:
        print(e)
        raise Exception("Sorry, something went wrong. Please tag an admin")



#####
def add_wallet_to_db(wallet_address, discord_userid, dynamodb=None, table=None):
    try:
        if not dynamodb:
            dynamodb = boto3.resource('dynamodb')
        if not table:
            table = dynamodb.Table(config_table_name)

        response = table.put_item(
            Item={
                'DiscordUserId': discord_userid,
                'WalletAddress': wallet_address,
                'Processed': "False"
            }
        )
        if not response['ResponseMetadata']['HTTPStatusCode'] == 200:
            print(response)
            raise Exception("Unable to Save Item to DynamoDB", response)
        return

    except Exception as e:
        print(response)
        print(e)
        raise Exception(
            "Sorry, something went wrong. Please tag an admin")


# def get_user_wallet(discord_userid, dynamodb=None, table=None):
#     if not dynamodb:
#         dynamodb = boto3.resource('dynamodb')
#     if not table:
#         table = dynamodb.Table(config_table_name)

#     try:
#         response = table.get_item(
#             Key={
#                 'DiscordUserId': discord_userid,
#             }
#         )
#         return response['Item']['WalletAddress']

#     except KeyError:
#         return None

#     except Exception as e:
#         print(e)
#         return return_message("Sorry, something went wrong. Please tag an admin")


def check_if_user_exists(discord_userid, dynamodb=None, table=None):
    user_wallet = get_user_wallet(discord_userid, dynamodb, table)
    if user_wallet is None:
        print("User Does Not Exist")
        return
    else:
        print("User Does Exists")
        print(user_wallet)
        raise ValueError(
            "Member Already Has A Whitelisted Wallet - Each Member Can Only Whitelist One Wallet Address")


def check_for_duplicate_wallet_addresses(wallet_address, dynamodb=None, table=None):
    try:
        if not dynamodb:
            dynamodb = boto3.resource('dynamodb')
        if not table:
            table = dynamodb.Table(config_table_name)

        response = table.query(
            KeyConditionExpression=Key('WalletAddress').eq(wallet_address),
            IndexName='WalletAddressIndex',
            Select='COUNT'
        )

        if response['Count'] == 0:
            return True
        else:
            raise ValueError("That Wallet Address Has Already Whitelisted")

    except Exception as e:
        raise(e)


def check_item_count():
    try:
        dynamodb = boto3.client('dynamodb')
        table = dynamodb.describe_table(
            TableName=config_table_name
        )
        item_count = table['Table']['ItemCount']

        if item_count >= whitelist_capacity:
            raise ValueError(
                "The whitelist is full. No more addresses can be added.")
        else:
            return

    except Exception as e:
        raise(e)


def white_list_wallet_address(message_body, wallet_address, discord_userid):
    try:
        verify_discord_role(message_body, whitelist_role_id)
    except ValueError as e:
        raise ValueError(
            "You are not eligible to whitelist your wallet yet")
    except Exception as e:
        print(e)
        raise ValueError(
            "You are not eligible to whitelist your wallet yet")

    if not validate_eth(wallet_address):
        raise ValueError(
            "The wallet address you provided is not valid. Did you use an Ethereum address?")

    try:
        check_item_count()
        check_if_user_exists(discord_userid, dynamodb=None, table=None)
        check_for_duplicate_wallet_addresses(
            wallet_address, dynamodb=None, table=None)
        add_wallet_to_db(wallet_address, discord_userid,
                         dynamodb=None, table=None)
        return

    except ValueError as e:
        print(e)
        raise ValueError(e)


def check_status(message_body, discord_userid, dynamodb=None, table=None):

    try:
        verify_discord_role(message_body, whitelist_role_id)
        print("verified role")
    except ValueError as e:
        return "You are not eligible to whitelist your wallet yet"
    except Exception as e:
        print(e)
        return "You are not eligible to whitelist your wallet yet"

    try:
        check_if_user_exists(discord_userid, dynamodb=None, table=None)
        return "You are eligible to whitelist but haven't done so yet. Use \"/whitelist add-wallet\" to do so. "
    except ValueError as e:
        return "Your wallet has already been whitelisted"
