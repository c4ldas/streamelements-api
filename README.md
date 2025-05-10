## What is that?

Here's an updated list of Streamelements API endpoints, filling in the missing details and fixing mistakes in the official docs.

The endpoint list is only for `https://api.streamelements.com/kappa/{v2|v3}`, which means `https://kvstore.streamelements.com/` subdomain is not included.

I also added in a separated page some basic info for StreamElements socket.io and event objects for custom widgets `onEventReceived` listener.

## Filling the gaps

I reviewed all Streamelements API endpoints and created my own api.yaml file because the official API documentation is quite outdated.

Some endpoints were updated, added body and response examples, some had the query parameters fixed, and others moved to `wonky - not working` folder. As the name suggests, these are endpoints that don't work as expected or lack enough information to use properly.

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
