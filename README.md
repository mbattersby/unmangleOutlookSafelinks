# IMPORTANT

This repo is dead, I neither use nor maintain is any more. For a maintained version of the plugin please see

https://github.com/phavekes/unmangleOutlookSafelinks

# Unmangle Outlook Safelinks

Thunderbird plugin to show unmangled original URLs in place of mangled 'Safe Links' from the Office365 mail server.

Users of Office365 whose company or email provider have enabled 'Safe Links' will receive emails in which all URLs have been modified so as to redirect them via a Microsoft 'safe link' server before opening. This allows Microsoft to (at least potentially) intercept unsafe links after they have been clicked (see [here](https://support.microsoft.com/en-us/office/advanced-outlook-com-security-for-microsoft-365-subscribers-882d2243-eab9-4545-a58a-b36fee4a46e2), but also gives Microsoft the opportunity to log all email clicks, which some users will find undesirable.

For example, with Advanced Threat Protection', a link to
```
http://phishingsite.fake.ru/you/are/hacked.php
```
will be modified to become something like the following
```
https://emea01.safelinks.protection.outlook.com/?url=http%3A%2F%2Fphishingsite.fake.ru%2Fyou%2Fare%2Fhacked.phpdata=02%7C01%7Csender.mail%40domain.tld%7C8177af7905a4406ecae208d5dc1fb7c9%7C87c50b582ef2423da4dbaedde7c84efcfa%7C0%7C0%7C63453351150545403&sdata=Te0O1xGxxxULxdzbxQ%2xxxyql2QjTt4Ken%2F00JB%2BV%2FPUA%3D&reserved=0
```

Although this provides potentially increased safety for users, it greatly worsens the appearance of many emails, especially plaintext emails, since Safe Links links are much longer than the originals, and furthermore it is no longer immediately obvious what site they link to.

If you prefer to only correct the cosmetic issue of the appearance of the link in plaintext email, you can set `prefUnmangle` to `false`. In this case, Safe Links will still be passed through the Microsoft server. If `prefUnmangle` is `true`, links will be unmangled to point to the original URL, which means that the Safe Links functionality is disabled. 

# Thunderbird Plugins

For an overview on writing Thunderbird Plugins, see the [Hello World example](https://developer.thunderbird.net/add-ons/mailextensions/hello-world-add-on) and [MailExtension API documentation](https://webextension-api.thunderbird.net/en/91/browserAction.html).

# How to install

The plugin can be installed from [Thunderbird Add-ons](https://addons.thunderbird.net/en-US/thunderbird/addon/unmangle-outlook-safelinks/)

Source code can be obtained [mbattersby/unmangleOutlookSafelinks](https://github.com/mbattersby/unmangleOutlookSafelinks). To use the source code directly in Thunderbird, see the instructions in the [Hello World example](https://developer.thunderbird.net/add-ons/mailextensions/hello-world-add-on).

# Version history

- Version 3.1.0: implements `prefUnmangle` to allow text to be unmangled while preserving Safe Link targets.
- Version 3.* is compatible with Thunderbird 78+
- Version 2.* is compatible with Thunderbird 68+
- Version 1.* is compatible with Thunderbird 60.*
- Original version by mib@post.com

`vim: ts=4:sw=4:noet:syntax=python `{=comment}
