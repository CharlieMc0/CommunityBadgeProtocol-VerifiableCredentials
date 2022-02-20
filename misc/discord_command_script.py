## This file is used to add/remove commands to the bot
## You must add a secrets.py file and include the bot token as bot_id 

import requests
from secrets import bot_token

bot_id = "942134461611540480"
url = "https://discord.com/api/v8/applications/"+ bot_id + "/commands"

headers = {
    "Authorization": "Bot " + bot_token
}


def add_command_server_config():
    # CHAT_INPUT or Slash Command, with a type of 1
    json = {
        "name": "configure-server",
        "type": 1,
        "description": "Configure the server",
        "options": [
            {
                "name": "nominating_roles",
                "description":  "List of roles eligible to nominate. If left blank all roles will be eligible",
                "type": 3,
                "required": False,
            },
            {
                "name": "voting_roles",
                "description": "List of roles eligible to vote. If left blank all roles will be eligible",
                "type": 3,
                "required": False,
            },
            {
                "name": "eligible_roles",
                "description": "List of roles eligible for awards. If left blank all roles will be eligible",
                "type": 3,
                "required": False,
            },
            {
                "name": "nomination_time",
                "description": "Length of time voting is open in seconds - default is 3600 seconds (24 hours)",
                "type": 3,
                "required": False,
            },
            {
                "name": "voting_channels",
                "description": "Optional - Is voting restricted to specific channels?",
                "type": 3,
                "required": False,
            }
        ]
    }
    r = requests.post(url, headers=headers, json=json)
    print(r)
    print(r.text)
    print(r.status_code)
    print(r.url)


def add_vote():
    # CHAT_INPUT or Slash Command, with a type of 1
    json = {
        "name": "vote",
        "type": 1,
        "description": "Vote on a nomination",
        "options": [
            {
                "name": "vote",
                "description": "Vote Type",
                "type": 3,
                "required": True,
                "choices": [
                    {
                        "name": "Yes",
                        "value": "yes"
                    },
                    {
                        "name": "No",
                        "value": "no"
                    },
                ]
            }
        ]
    }
    r = requests.post(url, headers=headers, json=json)
    print(r)
    print(r.text)
    print(r.status_code)
    print(r.url)


def add_command_check_status():
    # CHAT_INPUT or Slash Command, with a type of 1
    json = {
        "name": "check_my_whitelist_status",
        "type": 1,
        "description": "Check your whitelist status",
        "options": []
    }
    r = requests.post(url, headers=headers, json=json)
    print(r)
    print(r.text)
    print(r.status_code)
    print(r.url)


# "id": "816437322781949972",

def nominate():
    json = {
        "name": "nominate",
        "type": 1,
        "description": "nominate a user",
        "options": [
            {
                "name": "username",
                "type": 1,
                "description": "Username",
                "options": []
            }
        ]
    }
    r = requests.post(url, headers=headers, json=json)
    print(r)
    print(r.text)
    print(r.status_code)
    print(r.url)


def add_command_group():
    json = {
        "name": "community-badges",
        "description": "Nominate or vote a member for a community badge or award",
        "options": [
            {
                "name": "nominate",
                "type": 1,
                "description": "Nominate a user",
                "options": [{
                        "name": "username",
                        "description": "The username in @username format",
                        "type": 3,
                        "required": True
                    },
                    {
                        "name": "badge-name",
                        "description": "The name of the badge",
                        "type": 3,
                        "required": True
                        },
                    {
                        "name": "reason",
                        "description": "Why are they being nominated for this badge?",
                        "type": 3,
                        "required": True
                        }
                ]
            },
            {
                "name": "vote",
                "description": "Vote on a nomination",
                "type": 1,
                "options": [
                    {
                        "name": "username",
                        "description": "The username in @username format",
                        "type": 3,
                        "required": True,
                    },
                    {
                        "name": "your_vote",
                        "description": "Are you voting in favor or against their nomination?",
                        "type": 3,
                        "required": True,
                        "choices": [
                            {
                                "name": "For",
                                "value": "yes"
                            },
                            {
                                "name": "Against",
                                "value": "no"
                            },
                        ]
                    },
                ]
            },
            {
                "name": "create-new-badge",
                "description": "Create a new badge or award",
                "type": 1,
                "options": [
                    {
                        "name": "badge-name",
                        "description": "The name of the badge",
                        "type": 3,
                        "required": True,
                    },
                    {
                        "name": "badge-description",
                        "description": "Description of the badge in less than 280 characters",
                        "type": 3,
                        "required": True,
                    },
                    {
                        "name": "badge-limit",
                        "description": "Is there a limit of the number of badges that can be issued? (Optional)",
                        "type": 3,
                        "required": False,
                    },
                ]
            }
        ]
    }
    r = requests.post(url, headers=headers, json=json)
    print(r)
    print(r.text)
    print(r.status_code)
    print(r.url)


def delete_command(command_id):

    delete_url = url + "/" + str(command_id)
    r = requests.delete(delete_url, headers=headers,)
    print(r)
    print(r.text)
    print(r.status_code)
    print(r.url)


# add_command_server_config()
# add_vote()
# nominate()
add_command_group()

# delete_command("943266707496140892")
# delete_command("943334738477862923")
