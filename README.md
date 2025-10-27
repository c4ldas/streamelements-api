## What is that?

Here's an updated list of Streamelements API endpoints, filling in the missing details and fixing mistakes in the official docs.

The endpoint list is only for `https://api.streamelements.com/kappa/{v2|v3}`, which means `https://kvstore.streamelements.com/` subdomain is not included.

I also added in a separated page some basic info for StreamElements socket.io and event objects for custom widgets `onEventReceived` listener.

## Filling the gaps

I reviewed all Streamelements API endpoints and created my own api.yaml file because the official API documentation is quite outdated.

Some endpoints were updated, added body and response examples, some had the query parameters fixed, and others moved to `wonky - not working` folder. As the name suggests, these are endpoints that don't work as expected or lack enough information to use properly. These ones are also marked as `deprecated` for clarity.

Every operation now includes response examples and, where needed, body examples with some explanations to make things clearer.

## Live page

You can check out all the endpoints and even test them on the live page:

**https://c4ldas.github.io/streamelements-api**

If you have suggestions or ideas for improvements, feel free to share them!

## Official documentation

The official Streamelements API documentation is hosted on their [developer site](https://dev.streamelements.com).

Unfortunately, many endpoints are missing, have incorrect body data, or lack sufficient details.

## Improvements

If you spot any errors or think something could be improved, please let me know!
Also, if an endpoint doesn't make sense or isn't clear enough, that's a sign it needs more explanation — don't hesitate to reach out with your questions.

## Notes

Just a heads-up: I don't have access to Streamelements' servers or backend, so I can't fix any issues with the actual endpoint results. This repository is all about documenting the endpoints I've found so far in a way that's easier for everyone to use.

## Preview

![image](https://github.com/user-attachments/assets/12fd5486-a4fc-424f-acca-803ddb81d111)


## Pending list

### Install overlay by overlay sharing id

    `https://api.streamelements.com/kappa/v2/overlays/<DESTINATION_ACCOUNT_ID>/share`

    Method: POST

    Payload:
    ```json
    { 
      "overlayId": "6326954e94138e6d0bcfb5ff" 
    } 
    ```
    **OBS:**

    The original owner must have overlay sharing permissions set in `/channels/me` -> `ab["share-overlay"] = 1`

    It is the same as going to this page:
    `https://streamelements.com/dashboard/overlays/share/<OVERLAY_ID>`


### Request to close account

    `https://api.streamelements.com/kappa/v2/users/close`

    Method: POST

    Payload:
    ```json
    {
      "email": "email@example.com", // account e-mail
      "keepOutreaching": false, // Stay informed about future partnership opportunities?
      "message": "I created the account by mistake", // Reason to close account
      "token": "<JWT_TOKEN>", // JWT token
      "username": "username" // account username
    }
    ```

    Response:
    ```
    PENDING RESPONSE EXAMPLE
    ```

    **OBS:**

    It is the same as going to this page: `https://streamelements.com/dashboard/account/security` -> Close My Account

### Delete media files uploaded to account

    `https://api.streamelements.com/kappa/v2/uploads/<ACCOUNT_ID>/<MEDIA_ID>`
    
    Method: DELETE

    Payload: 
    ```json
    {}
    ```

    Response: 
    ```json
    {
      "message": "Resource was successfully removed",
      "asset": {
        "_id": "6314baca530249c9d5da8fea",
        "deleted": true,
        "channel": "5f2de5dd9a474a2c2aaaaaaa",
        "uuid": "7539c9a2-47e1-4db6-a8cd-42742dd22473.png",
        "name": "img103.png",
        "size": 4055645,
        "url": "https://cdn.streamelements.com/uploads/7539c9a2-47e1-4db6-a8cd-42742dd22473.png",
        "type": "image/png",
        "createdAt": "2022-09-04T14:48:42.220Z",
        "updatedAt": "2025-08-01T17:29:13.116Z"
      }
    }
    ```

### Add new media file to account

    `https://api.streamelements.com/kappa/v2/uploads/<ACCOUNT_ID>`

    Method: POST

    Payload: form data (binary)

    Response:
    ```json
    {
      "channel": "5f2de5dd9a474a2c2aaaaaaa",
      "uuid": "01k1kb5877k429dq4vmm6qvr1t.png",
      "size": 35611,
      "name": "screenshot.png",
      "type": "image/png",
      "url": "https://cdn.streamelements.com/uploads/01k1kb5877k429dq4vmm6qvr1t.png",
      "deleted": false,
      "_id": "688cfa87fe85e796593236c7",
      "createdAt": "2025-08-01T17:33:59.477Z",
      "updatedAt": "2025-08-01T17:33:59.477Z"
    }
    ```

    **OBS:**

    Payload example here: `https://discord.com/channels/141203863863558144/259680142459142144/1154393562398605432`