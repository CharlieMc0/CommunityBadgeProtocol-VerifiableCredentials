import requests

url = "https://discord.com/api/v8/applications/934583785473847387/commands"

headers = {
    "Authorization": "Bot OTM0NTgzNzg1NDczODQ3Mzg3.YeyM-g.GiZvswTUMzSzTEOAuS8U9PtRpWQ"
}


def add_command_whitelist():
    # CHAT_INPUT or Slash Command, with a type of 1
    json = {
        "name": "white_list_1",
        "type": 1,
        "description": "Send a random adorable animal photo",
        "options": [
            {
                "name": "wallet_address",
                "description": "The address of your wallet to whitelist",
                "type": 3,
                "required": True,
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


def add_command_group():
    json = {
        "name": "whitelist",
        "description": "Check Status and Whitelist Your Wallet",
        "options": [
            {
                "name": "status",
                "type": 1,
                "description": "Check your whitelist status",
                "options": []
            },
            {
                "name": "add-wallet",
                "type": 1,
                "description": "Add your wallet address to the whitelist",
                "options": [
                    {
                        "name": "wallet_address",
                        "description": "Your Eth Wallet Address",
                        "type": 3,
                        "required": True,
                    }
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

# add_command_group()

# delete_command("935699121757630516")
# delete_command("935698594734952468")
